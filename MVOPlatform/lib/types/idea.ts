/**
 * Centralized Idea type definition
 * Single source of truth for Idea interface
 */

export interface Idea {
  id: string
  title: string
  description: string
  author: string
  score: number
  votes: number
  tags: string[]
  createdAt: string
  image?: string
  video?: string
}

