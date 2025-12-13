'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { ExploreIdea } from './ExploreIdea'
import { UI_LABELS } from '@/lib/constants/ui'
import { Idea } from '@/lib/types/idea'
import { ideaService } from '@/lib/services/ideaService'

export function ExploreFeed() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [initialized, setInitialized] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Load initial ideas
  useEffect(() => {
    if (!initialized) {
      ideaService.getIdeas(5).then((loadedIdeas) => {
        setIdeas(loadedIdeas)
        setInitialized(true)
      })
    }
  }, [initialized])

  const loadMoreIdeas = useCallback(async () => {
    if (loading) return
    setLoading(true)
    const newIdeas = await ideaService.loadMoreIdeas(ideas.length)
    setIdeas((prev) => [...prev, ...newIdeas])
    setLoading(false)
  }, [loading, ideas.length])

  useEffect(() => {
    // Set up intersection observer for infinite scroll
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0')
          setActiveIndex(index)

          // Load more when near the end
          if (index >= ideas.length - 2) {
            loadMoreIdeas()
          }
        }
      })
    }, options)

    const elements = containerRef.current?.querySelectorAll('[data-index]')
    elements?.forEach((el) => observerRef.current?.observe(el))

    return () => {
      observerRef.current?.disconnect()
    }
  }, [ideas.length, loadMoreIdeas])

  // Handle scroll snap
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const scrollTop = containerRef.current.scrollTop
      const windowHeight = window.innerHeight
      const currentIndex = Math.round(scrollTop / windowHeight)
      setActiveIndex(currentIndex)
    }

    const container = containerRef.current
    container?.addEventListener('scroll', handleScroll)

    return () => {
      container?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      style={{
        scrollSnapType: 'y mandatory',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {ideas.map((idea, index) => (
        <div key={idea.id} data-index={index}>
          <ExploreIdea idea={idea} isActive={index === activeIndex} />
        </div>
      ))}
      {loading && (
        <div className="h-screen snap-start snap-mandatory flex items-center justify-center bg-black">
          <div className="text-white text-lg">{UI_LABELS.LOADING_MORE_IDEAS}</div>
        </div>
      )}
    </div>
  )
}

