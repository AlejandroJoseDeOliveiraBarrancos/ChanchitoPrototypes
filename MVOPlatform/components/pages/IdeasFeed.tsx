'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Footer } from '@/components/layout/Footer'
import { IdeaCard } from '@/components/ideas/IdeaCard'
import { motion } from 'framer-motion'
import { UI_LABELS } from '@/lib/constants/ui'
import { Idea } from '@/lib/types/idea'
import { ideaService } from '@/lib/services/ideaService'

interface IdeasFeedProps {
  showHeader?: boolean
  showFooter?: boolean
  isForYou?: boolean
}

export function IdeasFeed({ showHeader = true, showFooter = true, isForYou = false }: IdeasFeedProps) {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)

  // Load initial ideas
  useEffect(() => {
    if (!initialized) {
      setLoading(true)
      ideaService.getIdeas().then((loadedIdeas) => {
        setIdeas(loadedIdeas)
        setLoading(false)
        setInitialized(true)
      })
    }
  }, [initialized])

  const handleLoadMore = async () => {
    if (loading) return
    setLoading(true)
    const newIdeas = await ideaService.loadMoreIdeas(ideas.length)
    setIdeas((prev) => [...prev, ...newIdeas])
    setLoading(false)
  }

  const content = (
    <main className={`flex-1 w-full px-4 md:px-6 py-8 ${isForYou ? 'max-w-7xl mx-auto' : 'max-w-2xl mx-auto'}`}>
        {!isForYou && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-12"
          >
            <h1 className="text-heading-1 mb-4">
              {UI_LABELS.BROWSE_IDEAS}
            </h1>
            <p className="text-body-large">
              {UI_LABELS.DISCOVER_IDEAS}
            </p>
          </motion.div>
        )}

        {isForYou ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {ideas.map((idea, index) => (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
              >
                <IdeaCard idea={idea} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 max-w-2xl mx-auto">
            {ideas.map((idea, index) => (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <IdeaCard idea={idea} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="button-secondary"
          >
            {loading ? UI_LABELS.LOADING : UI_LABELS.LOAD_MORE}
          </button>
        </div>
      </main>
  )

  if (!showHeader && !showFooter) {
    return content
  }

  return (
    <div className="min-h-screen flex bg-background">
      {showHeader && <Sidebar />}
      <div className="flex-1 flex flex-col transition-all duration-300 overflow-x-hidden">
        {content}
        {showFooter && <Footer />}
      </div>
    </div>
  )
}
