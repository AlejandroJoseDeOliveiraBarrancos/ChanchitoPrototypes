'use client'

import { useState } from 'react'
import { useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import { useTranslations } from '@/components/providers/I18nProvider'
import { UserIdeasList, UserAnalytics } from '@/components/activity'
import { Button } from '@/components/ui/Button'
import { Sidebar } from '@/components/layout/Sidebar'
import { ArrowLeft } from 'lucide-react'

export default function ActivityPage() {
  const t = useTranslations()
  const router = useRouter()
  const { isAuthenticated, user, profile } = useAppSelector(state => state.auth)
  const [activeTab, setActiveTab] = useState<'ideas' | 'analytics'>('ideas')

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 max-w-md mx-auto p-6">
          <h1 className="text-2xl font-bold text-text-primary">
            {t('auth.sign_in_required')}
          </h1>
          <p className="text-text-secondary">
            Please sign in to view your activity and analytics.
          </p>
          <Button
            onClick={() => router.push('/auth')}
            variant="primary"
            className="mt-4"
          >
            {t('actions.sign_in')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-full overflow-hidden bg-background flex">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="p-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-text-primary">
                  {t('activity.title')}
                </h1>
                <p className="text-text-secondary mt-1">
                  Welcome back, {profile?.full_name || user?.email || 'User'}
                </p>
              </div>
            </div>

            <div className="flex space-x-1 bg-gray-50 p-1 rounded-lg w-fit">
              <button
                onClick={() => setActiveTab('ideas')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'ideas'
                    ? 'bg-gray-100 text-text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {t('activity.my_ideas')}
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'analytics'
                    ? 'bg-gray-100 text-text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Analytics
              </button>
            </div>
          </div>

          <div className="mt-8">
            {activeTab === 'ideas' ? (
              <UserIdeasList key="ideas-list" />
            ) : (
              <UserAnalytics key="analytics" />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
