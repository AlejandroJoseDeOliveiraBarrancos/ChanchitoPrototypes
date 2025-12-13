'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUp, MessageSquare } from 'lucide-react'
import { formatDate } from '@/lib/utils/date'
import { UI_LABELS } from '@/lib/constants/ui'
import { Idea } from '@/lib/types/idea'

interface IdeaCardProps {
  idea: Idea
}

export function IdeaCard({ idea }: IdeaCardProps) {
  const [voted, setVoted] = useState(false)
  const [voteCount, setVoteCount] = useState(idea.votes)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!idea.video || !cardRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = videoRef.current
          if (!video) return

          if (entry.isIntersecting) {
            // Use requestAnimationFrame to avoid state updates during render
            requestAnimationFrame(() => {
              video.play().catch(() => {
                // Auto-play failed, user interaction required
              })
              setIsVideoPlaying(true)
            })
          } else {
            requestAnimationFrame(() => {
              video.pause()
              setIsVideoPlaying(false)
            })
          }
        })
      },
      { threshold: 0.5 }
    )

    const currentCard = cardRef.current
    observer.observe(currentCard)

    return () => {
      observer.disconnect()
      const video = videoRef.current
      if (video) {
        video.pause()
      }
    }
  }, [idea.video])

  const handleVote = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!voted) {
      setVoted(true)
      setVoteCount(voteCount + 1)
    }
  }

  return (
    <div ref={cardRef} className="card-hover overflow-hidden">
      <Link href={`/ideas/${idea.id}`}>
        <motion.article
          whileHover={{ y: -2 }}
          className="p-4"
        >
          {/* Media Section */}
          {(idea.image || idea.video) && (
            <div className="relative w-full aspect-video mb-3 rounded-md overflow-hidden bg-gray-200">
              {idea.video ? (
                <video
                  ref={videoRef}
                  src={idea.video}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                />
              ) : idea.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={idea.image}
                  alt={idea.title}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
          )}

          {/* Content Section */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-text-primary mb-1 line-clamp-2">
                {idea.title}
              </h2>
              <p className="text-sm text-text-secondary line-clamp-2 mb-2">
                {idea.description}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-semibold text-accent">
                {idea.score}
              </div>
              <div className="text-xs text-text-secondary">{UI_LABELS.SCORE}</div>
            </div>
          </div>

          {/* Actions and Tags */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleVote}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all duration-250 text-sm ${
                  voted
                    ? 'bg-accent text-text-primary'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                }`}
              >
                <motion.div
                  animate={voted ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </motion.div>
                <span className="font-medium">{voteCount}</span>
              </button>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="text-sm">12</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {idea.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="badge-gray text-xs px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
              {idea.tags.length > 2 && (
                <span className="text-xs text-text-secondary">+{idea.tags.length - 2}</span>
              )}
            </div>
          </div>

          {/* Author and Date */}
          <div className="flex items-center justify-between text-xs text-text-secondary pt-2 border-t border-border-color">
            <span>By {idea.author}</span>
            <span>{formatDate(idea.createdAt)}</span>
          </div>
        </motion.article>
      </Link>
    </div>
  )
}

