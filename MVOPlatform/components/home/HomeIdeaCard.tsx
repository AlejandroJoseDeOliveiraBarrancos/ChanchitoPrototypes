'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUp, MessageSquare } from 'lucide-react'
import { formatDate } from '@/lib/utils/date'
import { UI_LABELS } from '@/lib/constants/ui'
import { Idea } from '@/lib/types/idea'
import { useVideoPlayer } from '@/hooks/useVideoPlayer'
import { VoteDistributionBar, getMostVotedType } from '@/components/ui/VoteDistributionBar'

interface HomeIdeaCardProps {
  idea: Idea
}

export function HomeIdeaCard({ idea }: HomeIdeaCardProps) {
  const [voted, setVoted] = useState(false)
  const [voteCount, setVoteCount] = useState(idea.votes)
  const cardRef = useRef<HTMLDivElement>(null)

  // Use reusable video player hook with start time at 10 seconds
  const videoRef = useVideoPlayer({
    videoSrc: idea.video,
    containerRef: cardRef,
    startTime: 10,
  })

  const handleVote = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!voted) {
      setVoted(true)
      setVoteCount(voteCount + 1)
    }
  }

  const handleClick = () => {
    // Save current path and scroll position before navigating
    if (typeof window !== 'undefined') {
      // Find the scrollable container (div inside main with overflow-y-auto)
      const scrollContainer = document.querySelector('main > div.overflow-y-auto') as HTMLElement
      const scrollY = scrollContainer ? scrollContainer.scrollTop : window.scrollY
      
      sessionStorage.setItem('previousPath', window.location.pathname)
      sessionStorage.setItem('previousScrollPosition', scrollY.toString())
    }
  }

  const mostVoted = idea.status_flag === 'validated' ? getMostVotedType(idea.votesByType) : null

  return (
    <div ref={cardRef} className="card-hover overflow-hidden relative">
      <Link href={`/ideas/${idea.id}`} onClick={handleClick}>
        <motion.article
          whileHover={{ y: -2 }}
          className="p-4 flex flex-col"
        >
          {/* Media Section */}
          {(idea.image || idea.video) && (
            <div className="relative w-full aspect-video mb-3 rounded-md overflow-hidden bg-gray-100">
              {idea.video ? (
                <video
                  ref={videoRef}
                  src={idea.video}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  preload="none"
                />
              ) : idea.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={idea.image}
                  alt={idea.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : null}
              
              {/* Validated Overlay - Only over media */}
              {idea.status_flag === 'validated' && mostVoted && (
                <>
                  {/* Darkened overlay */}
                  <div className="absolute inset-0 bg-black/60 z-10" />
                  {/* Most voted color overlay */}
                  <div 
                    className="absolute inset-0 z-20 opacity-40"
                    style={{ backgroundColor: mostVoted.color }}
                  />
                  {/* See Results Label - Centered */}
                  <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                    <div className="px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl">
                      <span className="text-base font-bold text-text-primary tracking-wide">
                        See Results
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Content Section */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0 max-w-[calc(100%-80px)]">
              <h2 className="text-lg font-semibold text-text-primary mb-1 line-clamp-2 break-words">
                {idea.title}
              </h2>
              <p className="text-sm text-text-secondary line-clamp-2 break-words">
                {idea.description}
              </p>
            </div>
            <div className="text-right flex-shrink-0 w-16">
              <div className="text-2xl font-semibold text-accent whitespace-nowrap">
                {idea.score}
              </div>
              <div className="text-xs text-text-secondary whitespace-nowrap">{UI_LABELS.SCORE}</div>
            </div>
          </div>

          {/* Vote Distribution Bar */}
          <div className="mb-3">
            <VoteDistributionBar votes={idea.votesByType} />
          </div>

          {/* Actions and Tags */}
          <div className="flex items-center justify-between gap-2 mb-2 min-h-[32px] overflow-hidden">
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleVote}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all duration-250 text-sm whitespace-nowrap flex-shrink-0 ${
                  voted
                    ? 'bg-accent text-text-primary'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                }`}
              >
                <motion.div
                  animate={voted ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </motion.div>
                <span className="font-medium">{voteCount}</span>
              </button>
              <motion.div 
                className={`flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 ${
                  idea.status_flag === 'active_discussion' 
                    ? 'text-accent' 
                    : 'text-text-secondary'
                }`}
                animate={
                  idea.status_flag === 'active_discussion'
                    ? {
                        opacity: [0.7, 1, 0.7],
                      }
                    : {}
                }
                transition={{
                  duration: 3,
                  repeat: idea.status_flag === 'active_discussion' ? Infinity : 0,
                  ease: 'easeInOut',
                }}
              >
                <MessageSquare className={idea.status_flag === 'active_discussion' ? "w-[15px] h-[15px]" : "w-3.5 h-3.5"} />
                <span className="text-sm">12</span>
              </motion.div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0 overflow-hidden">
              {idea.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="badge-gray text-xs px-2 py-0.5 whitespace-nowrap flex-shrink-0 truncate max-w-[80px]"
                  title={tag}
                >
                  {tag}
                </span>
              ))}
              {idea.tags.length > 2 && (
                <span className="text-xs text-text-secondary whitespace-nowrap flex-shrink-0">+{idea.tags.length - 2}</span>
              )}
            </div>
          </div>

          {/* Author and Date */}
          <div className="flex items-center justify-between text-xs text-text-secondary pt-2 border-t border-background">
            <span>By {idea.author}</span>
            <span>{formatDate(idea.createdAt)}</span>
          </div>
        </motion.article>
      </Link>
    </div>
  )
}

