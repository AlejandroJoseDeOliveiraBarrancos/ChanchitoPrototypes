/**
 * Centralized Idea type definition
 * Single source of truth for Idea interface
 */

import { ContentBlock } from './content'

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
  // Rich content for detail page
  content?: ContentBlock[]
  // Categorization for different sections
  featured?: boolean // For carousel
  trending?: boolean // For trending section
  forYou?: boolean // For personalized "For You" section
}

