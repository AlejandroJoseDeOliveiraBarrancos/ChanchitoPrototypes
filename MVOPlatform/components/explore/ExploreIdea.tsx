'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, MessageSquare, Share2, Heart } from 'lucide-react'
import Image from 'next/image'
import { formatDate } from '@/lib/utils/date'
import { UI_LABELS } from '@/lib/constants/ui'
import { Idea } from '@/lib/types/idea'

interface ExploreIdeaProps {
  idea: Idea
  isActive: boolean
}

export function ExploreIdea({ idea, isActive }: ExploreIdeaProps) {
  const [voted, setVoted] = useState(false)
  const [voteCount, setVoteCount] = useState(idea.votes)
  const [liked, setLiked] = useState(false)
  const videoRef = useRef<HTMLDivElement>(null)

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!voted) {
      setVoted(true)
      setVoteCount(voteCount + 1)
    }
  }

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLiked(!liked)
  }

  return (
    <div
      ref={videoRef}
      className="relative w-full h-screen snap-start snap-mandatory flex items-center justify-center bg-black"
    >
      {/* Background image/video area */}
      <div className="absolute inset-0 flex items-center justify-center">
        {idea.image ? (
          <Image
            src={idea.image}
            alt={idea.title}
            fill
            className="object-cover"
            priority={isActive}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent/20 via-background to-accent/10 flex items-center justify-center">
            <div className="text-center px-6 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                {idea.title}
              </h2>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                {idea.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Content overlay */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-4 md:p-6">
        {/* Top section - Score and tags */}
        <div className="flex items-start justify-between">
          <div className="flex flex-wrap gap-2">
            {idea.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium text-white bg-black/50 backdrop-blur-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="text-right">
            <div className="text-4xl md:text-5xl font-bold text-accent drop-shadow-lg">
              {idea.score}
            </div>
            <div className="text-xs text-white/80 drop-shadow-md">{UI_LABELS.SCORE}</div>
          </div>
        </div>

        {/* Bottom section - Title, description, and actions */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-4">
          {/* Left side - Text content */}
          <div className="flex-1 text-white">
            <h3 className="text-xl md:text-2xl font-bold mb-2 drop-shadow-lg">
              {idea.title}
            </h3>
            <p className="text-sm md:text-base text-white/90 mb-2 line-clamp-2 drop-shadow-md">
              {idea.description}
            </p>
            <div className="flex items-center gap-3 text-sm text-white/80">
              <span>@{idea.author}</span>
              <span>•</span>
              <span>{formatDate(idea.createdAt)}</span>
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex flex-col items-center gap-4">
            <motion.button
              onClick={handleVote}
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center gap-1 p-3 rounded-full transition-colors ${
                voted
                  ? 'bg-accent text-text-primary'
                  : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
              }`}
            >
              <ArrowUp className="w-6 h-6" />
              <span className="text-xs font-semibold">{voteCount}</span>
            </motion.button>

            <motion.button
              onClick={handleLike}
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center gap-1 p-3 rounded-full transition-colors ${
                liked
                  ? 'bg-red-500 text-white'
                  : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
              }`}
            >
              <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
            </motion.button>

            <button className="flex flex-col items-center gap-1 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors">
              <MessageSquare className="w-6 h-6" />
              <span className="text-xs font-semibold">12</span>
            </button>

            <button className="flex flex-col items-center gap-1 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

