'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Footer } from '@/components/layout/Footer'
import { HomeIdeaCard } from '@/components/home/HomeIdeaCard'
import { Button } from '@/components/ui/Button'
import { teamService, SpaceWithTeam } from '@/lib/services/teamService'
import { ideaService } from '@/lib/services/ideaService'
import { Idea } from '@/lib/types/idea'
import { useAppSelector } from '@/lib/hooks'
import { useTranslations, useLocale } from '@/components/providers/I18nProvider'
import { Plus, Loader2, Users, Lock, Globe } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { IdeaForm } from '@/components/forms/IdeaForm'

interface SpaceDetailPageProps {
  spaceId: string
}

export function SpaceDetailPage({ spaceId }: SpaceDetailPageProps) {
  const t = useTranslations()
  const { locale } = useLocale()
  const router = useRouter()
  const { user } = useAppSelector(state => state.auth)
  const [space, setSpace] = useState<SpaceWithTeam | null>(null)
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)

  useEffect(() => {
    const loadSpace = async () => {
      try {
        setLoading(true)
        const spaceData = await teamService.getSpaceById(spaceId)
        if (!spaceData) {
          router.push(`/${locale}/spaces`)
          return
        }
        setSpace(spaceData)

        // Check if user is admin
        if (user?.id) {
          const admin = await teamService.isSpaceAdmin(spaceId, user.id)
          setIsAdmin(admin)
        }

        // Load ideas
        const spaceIdeas = await ideaService.getIdeasBySpace(spaceId)
        setIdeas(spaceIdeas)
      } catch (error) {
        console.error('Error loading space:', error)
        router.push(`/${locale}/spaces`)
      } finally {
        setLoading(false)
      }
    }

    loadSpace()
  }, [spaceId, user?.id, locale, router])

  const handleIdeaCreated = async () => {
    setShowCreateForm(false)
    // Reload ideas
    const spaceIdeas = await ideaService.getIdeasBySpace(spaceId)
    setIdeas(spaceIdeas)
  }

  if (loading) {
    return (
      <div className="h-screen w-full overflow-hidden bg-background flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      </div>
    )
  }

  if (!space) {
    return null
  }

  const visibilityIcons = {
    public: Globe,
    private: Lock,
  }

  const VisibilityIcon = visibilityIcons[space.visibility] || Globe

  const visibilityLabels = {
    public: t('spaces.public'),
    private: t('spaces.private'),
  }

  const headerMedia =
    space.settings?.header_image || space.settings?.header_video

  if (showCreateForm) {
    return (
      <div className="h-screen w-full overflow-hidden bg-background flex">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
              <Button
                onClick={() => setShowCreateForm(false)}
                variant="outline"
                className="mb-4"
              >
                ← {t('actions.cancel')}
              </Button>
              <IdeaForm
                defaultSpaceId={spaceId}
                onSuccess={handleIdeaCreated}
                onCancel={() => setShowCreateForm(false)}
              />
            </div>
            <Footer />
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-full overflow-hidden bg-background flex">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {/* Space Header */}
          <div className="relative w-full aspect-video bg-gradient-to-br from-accent/20 via-background to-accent/10">
            {headerMedia ? (
              space.settings?.header_video ? (
                <video
                  src={space.settings.header_video}
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: space.settings?.header_crop
                      ? `${space.settings.header_crop.x}% ${space.settings.header_crop.y}%`
                      : 'center',
                    transform: space.settings?.header_crop
                      ? `scale(${space.settings.header_crop.scale || 1})`
                      : 'scale(1)',
                    transformOrigin: space.settings?.header_crop
                      ? `${space.settings.header_crop.x}% ${space.settings.header_crop.y}%`
                      : 'center',
                  }}
                  loop
                  muted
                  playsInline
                  autoPlay
                />
              ) : space.settings?.header_image ? (
                <Image
                  src={space.settings.header_image}
                  alt={space.name}
                  fill
                  className="object-cover"
                  style={{
                    objectPosition: space.settings?.header_crop
                      ? `${space.settings.header_crop.x}% ${space.settings.header_crop.y}%`
                      : 'center',
                    transform: space.settings?.header_crop
                      ? `scale(${space.settings.header_crop.scale || 1})`
                      : 'scale(1)',
                    transformOrigin: space.settings?.header_crop
                      ? `${space.settings.header_crop.x}% ${space.settings.header_crop.y}%`
                      : 'center',
                  }}
                />
              ) : null
            ) : null}

            {/* Overlay Content */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 md:p-12">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-2 mb-4">
                  <VisibilityIcon
                    className={`w-5 h-5 ${
                      space.visibility === 'public'
                        ? 'text-green-400'
                        : space.visibility === 'private'
                          ? 'text-gray-400'
                          : 'text-blue-400'
                    }`}
                  />
                  <span className="text-white/80 text-sm">
                    {visibilityLabels[space.visibility]}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                  {space.name}
                </h1>
                {space.team && (
                  <p className="text-white/80 text-lg mb-4">{space.team.name}</p>
                )}
                <div className="flex items-center gap-4 text-white/80 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>
                      {space.member_count || 0} {t('spaces.members')}
                    </span>
                  </div>
                  <span>•</span>
                  <span>
                    {space.idea_count || 0} {t('spaces.ideas')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
              {/* Actions */}
              {isAdmin && (
                <div className="mb-8">
                  <Button
                    onClick={() => setShowCreateForm(true)}
                    variant="primary"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {t('form.create_idea')}
                  </Button>
                </div>
              )}

              {/* Ideas Grid */}
              {ideas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                  {ideas.map(idea => (
                    <HomeIdeaCard key={idea.id} idea={idea} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-text-secondary text-lg mb-4">
                    {t('messages.no_ideas')}
                  </p>
                  {isAdmin && (
                    <Button
                      onClick={() => setShowCreateForm(true)}
                      variant="primary"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {t('form.create_idea')}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}

