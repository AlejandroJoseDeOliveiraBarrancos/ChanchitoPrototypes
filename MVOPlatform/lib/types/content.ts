/**
 * Rich content types for Idea details
 */

export type ContentBlockType = 
  | 'text'
  | 'heading'
  | 'image'
  | 'video'
  | 'carousel'
  | 'button'
  | 'html'
  | 'spacer'

export interface TextContent {
  type: 'text'
  content: string
  size?: 'small' | 'medium' | 'large'
}

export interface HeadingContent {
  type: 'heading'
  level: 1 | 2 | 3 | 4
  text: string
}

export interface ImageContent {
  type: 'image'
  src: string
  alt: string
  caption?: string
}

export interface VideoContent {
  type: 'video'
  src: string
  title?: string
  description?: string
}

export interface CarouselSlide {
  image?: string
  video?: string
  title?: string
  description: string
}

export interface CarouselContent {
  type: 'carousel'
  slides: CarouselSlide[]
}

export interface ButtonContent {
  type: 'button'
  text: string
  href?: string
  onClick?: string
  variant?: 'primary' | 'secondary' | 'outline'
}

export interface HtmlContent {
  type: 'html'
  content: string
}

export interface SpacerContent {
  type: 'spacer'
  height: number
}

export type ContentBlock = 
  | TextContent
  | HeadingContent
  | ImageContent
  | VideoContent
  | CarouselContent
  | ButtonContent
  | HtmlContent
  | SpacerContent

