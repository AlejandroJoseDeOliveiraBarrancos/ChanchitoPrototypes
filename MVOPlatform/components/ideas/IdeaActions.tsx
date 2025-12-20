'use client'

import { motion } from 'framer-motion'
import { ArrowUp, MessageSquare, Share2, DollarSign } from 'lucide-react'
import { Idea } from '@/lib/types/idea'
import { useAppSelector } from '@/lib/hooks'

interface IdeaActionsProps {
  idea: Idea
  voted: boolean
  voteCount: number
  liked: boolean
  likeCount: number
  commentCount: number
  onVote: () => void
  onLike: () => void
  onCommentsClick?: () => void
}

export function IdeaActions({
  idea,
  voted,
  voteCount,
  liked,
  likeCount,
  commentCount,
  onVote,
  onLike,
  onCommentsClick,
}: IdeaActionsProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: idea.title,
          text: idea.description,
          url: window.location.href,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="flex items-center gap-4 md:gap-6 mb-8 pb-8 border-b border-border-color">
      {/* Vote Button */}
      <motion.button
        onClick={onVote}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          voted
            ? 'bg-accent text-text-primary'
            : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
        }`}
      >
        <motion.div
          animate={voted ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.div>
        <span className="font-semibold">{voteCount}</span>
        <span className="text-sm hidden md:inline">Votes</span>
      </motion.button>

      {/* I'd Pay For It Button */}
      <motion.button
        onClick={onLike}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          liked
            ? 'bg-accent-alt text-white'
            : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
        }`}
        title="I'd pay for it"
      >
        <DollarSign className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
        <span className="font-semibold">{likeCount}</span>
        <span className="text-sm hidden md:inline">I'd pay</span>
      </motion.button>

      {/* Comments Button */}
      <button
        onClick={onCommentsClick}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-text-secondary hover:bg-gray-200 transition-colors"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="font-semibold">{commentCount}</span>
        <span className="text-sm hidden md:inline">Comments</span>
      </button>

      {/* Share Button */}
      <motion.button
        onClick={handleShare}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-text-secondary hover:bg-gray-200 transition-colors ml-auto"
      >
        <Share2 className="w-5 h-5" />
        <span className="text-sm hidden md:inline">Share</span>
      </motion.button>
    </div>
  )
}
