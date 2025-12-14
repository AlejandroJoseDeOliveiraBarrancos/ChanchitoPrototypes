/**
 * Comment type definition
 */

export interface Comment {
  id: string
  ideaId: string
  author: string
  authorImage?: string
  content: string
  createdAt: string
  likes: number
  liked?: boolean
}

