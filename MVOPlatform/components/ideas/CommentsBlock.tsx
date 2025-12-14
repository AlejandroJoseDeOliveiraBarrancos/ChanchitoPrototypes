'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Send, User } from 'lucide-react'
import Image from 'next/image'
import { formatDate } from '@/lib/utils/date'
import { Comment } from '@/lib/types/comment'
import { useSession } from 'next-auth/react'

interface CommentsBlockProps {
  ideaId: string
}

// Mock comments service
const getMockComments = (ideaId: string): Comment[] => {
  return [
    {
      id: '1',
      ideaId,
      author: 'john_doe',
      content: 'Esta es una idea increíble! Me encanta cómo aborda el problema desde una perspectiva única.',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      likes: 12,
      liked: false,
    },
    {
      id: '2',
      ideaId,
      author: 'sarah_smith',
      content: '¿Has considerado el impacto en el mercado internacional? Sería interesante explorar esa dimensión.',
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      likes: 8,
      liked: true,
    },
    {
      id: '3',
      ideaId,
      author: 'tech_enthusiast',
      content: 'La implementación técnica parece sólida. ¿Tienes algún prototipo funcionando?',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      likes: 15,
      liked: false,
    },
    {
      id: '4',
      ideaId,
      author: 'business_analyst',
      content: 'El modelo de negocio es prometedor. Creo que hay potencial para escalar esto rápidamente.',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      likes: 6,
      liked: false,
    },
  ]
}

export function CommentsBlock({ ideaId }: CommentsBlockProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()

  useEffect(() => {
    // Simulate loading comments
    setTimeout(() => {
      setComments(getMockComments(ideaId))
      setLoading(false)
    }, 500)
  }, [ideaId])

  const handleLikeComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          const wasLiked = comment.liked
          return {
            ...comment,
            liked: !wasLiked,
            likes: wasLiked ? comment.likes - 1 : comment.likes + 1,
          }
        }
        return comment
      })
    )
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !session) return

    const comment: Comment = {
      id: Date.now().toString(),
      ideaId,
      author: session.user?.name || session.user?.email || 'Anonymous',
      authorImage: session.user?.image || undefined,
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
      liked: false,
    }

    setComments([comment, ...comments])
    setNewComment('')
  }

  return (
    <div className="mt-12">
      <h2 className="text-heading-2 mb-6">Comments</h2>

      {/* Comment Form */}
      {session ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex gap-4">
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full px-4 py-3 bg-gray-100 text-text-primary rounded-lg border border-border-color focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                rows={3}
              />
            </div>
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-6 py-3 bg-accent text-text-primary rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span className="hidden md:inline">Post</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-gray-100 rounded-lg text-text-secondary text-center">
          <p>Please sign in to leave a comment</p>
        </div>
      )}

      {/* Comments List */}
      {loading ? (
        <div className="text-text-secondary">Loading comments...</div>
      ) : comments.length === 0 ? (
        <div className="text-text-secondary text-center py-8">
          No comments yet. Be the first to comment!
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-4 bg-gray-100 rounded-lg"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {comment.authorImage ? (
                    <Image
                      src={comment.authorImage}
                      alt={comment.author}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-text-primary font-semibold">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-text-primary">@{comment.author}</span>
                    <span className="text-text-secondary text-sm">•</span>
                    <span className="text-text-secondary text-sm">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="text-text-secondary mb-3 whitespace-pre-wrap">{comment.content}</p>
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    className={`flex items-center gap-2 text-sm transition-colors ${
                      comment.liked
                        ? 'text-red-500'
                        : 'text-text-secondary hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${comment.liked ? 'fill-current' : ''}`} />
                    <span>{comment.likes}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

