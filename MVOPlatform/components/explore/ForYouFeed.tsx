'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { IdeaCard } from '@/components/ideas/IdeaCard'
import { motion } from 'framer-motion'
import { UI_LABELS } from '@/lib/constants/ui'
import { Idea } from '@/lib/types/idea'
import { ideaService } from '@/lib/services/ideaService'

export function ForYouFeed() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [initialized, setInitialized] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // Load initial ideas
  useEffect(() => {
    if (!initialized) {
      ideaService.getIdeas().then((loadedIdeas) => {
        setIdeas(loadedIdeas)
        setInitialized(true)
      })
    }
  }, [initialized])

  const loadMoreIdeas = useCallback(async () => {
    if (loading || !hasMore) return
    
    setLoading(true)
    const newIdeas = await ideaService.loadMoreIdeas(ideas.length)
    setIdeas((prev) => [...prev, ...newIdeas])
    setLoading(false)
    
    // Stop loading after a certain number of items
    if (ideas.length + newIdeas.length >= 20) {
      setHasMore(false)
    }
  }, [loading, hasMore, ideas.length])

  useEffect(() => {
    // Set up intersection observer for infinite scroll
    const options = {
      root: null,
      rootMargin: '200px',
      threshold: 0.1,
    }

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        loadMoreIdeas()
      }
    }, options)

    const currentRef = loadMoreRef.current
    if (currentRef) {
      observerRef.current.observe(currentRef)
    }

    return () => {
      if (observerRef.current && currentRef) {
        observerRef.current.unobserve(currentRef)
      }
    }
  }, [hasMore, loading, loadMoreIdeas])

  return (
    <div className="min-h-screen bg-background pt-16 pb-8">
      <div className="max-w-4xl mx-auto w-full px-4 md:px-6">
        <div className="space-y-6">
          {ideas.map((idea, index) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
            >
              <IdeaCard idea={idea} />
            </motion.div>
          ))}
        </div>

        <div ref={loadMoreRef} className="mt-8 text-center">
          {loading && (
            <div className="text-text-secondary">{UI_LABELS.LOADING_MORE_IDEAS}</div>
          )}
          {!hasMore && (
            <div className="text-text-secondary">{UI_LABELS.NO_MORE_IDEAS}</div>
          )}
        </div>
      </div>
    </div>
  )
}

