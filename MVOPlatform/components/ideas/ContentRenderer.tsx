'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ContentBlock } from '@/lib/types/content'
import { useVideoPlayer } from '@/hooks/useVideoPlayer'
import { useRef } from 'react'

interface ContentRendererProps {
  content: ContentBlock[]
}

export function ContentRenderer({ content }: ContentRendererProps) {
  return (
    <div className="space-y-8">
      {content.map((block, index) => (
        <ContentBlockRenderer key={index} block={block} index={index} />
      ))}
    </div>
  )
}

function ContentBlockRenderer({ block, index }: { block: ContentBlock; index: number }) {
  switch (block.type) {
    case 'text':
      const textSize = block.size || 'medium'
      const textSizeClasses = {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
      }
      return (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`${textSizeClasses[textSize]} text-text-secondary leading-relaxed whitespace-pre-line`}
        >
          {block.content}
        </motion.p>
      )

    case 'heading':
      const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements
      const headingClasses = {
        1: 'text-4xl md:text-5xl font-bold',
        2: 'text-3xl md:text-4xl font-bold',
        3: 'text-2xl md:text-3xl font-semibold',
        4: 'text-xl md:text-2xl font-semibold',
      }
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <HeadingTag className={`${headingClasses[block.level]} text-text-primary mb-4`}>
            {block.text}
          </HeadingTag>
        </motion.div>
      )

    case 'image':
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100"
        >
          <Image
            src={block.src}
            alt={block.alt}
            fill
            className="object-cover"
          />
          {block.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 text-sm">
              {block.caption}
            </div>
          )}
        </motion.div>
      )

    case 'video':
      return <VideoBlock video={block} index={index} />

    case 'carousel':
      return <CarouselBlock carousel={block} index={index} />

    case 'button':
      return <ButtonBlock button={block} index={index} />

    case 'html':
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      )

    case 'spacer':
      return <div style={{ height: `${block.height}px` }} />

    default:
      return null
  }
}

function VideoBlock({ video, index }: { video: { type: 'video'; src: string; title?: string; description?: string }; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useVideoPlayer({
    videoSrc: video.src,
    containerRef: containerRef,
    startTime: 0,
    threshold: 0.1,
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="space-y-4"
    >
      {video.title && (
        <h3 className="text-2xl font-semibold text-text-primary">{video.title}</h3>
      )}
      <div ref={containerRef} className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={video.src}
          className="w-full h-full object-cover pointer-events-none"
          loop
          muted
          playsInline
          autoPlay
          onPause={(e) => {
            e.preventDefault()
            const videoEl = e.currentTarget
            if (videoEl.paused) {
              videoEl.play().catch(() => {})
            }
          }}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
      {video.description && (
        <p className="text-text-secondary text-sm">{video.description}</p>
      )}
    </motion.div>
  )
}

function CarouselBlock({ carousel, index }: { carousel: { type: 'carousel'; slides: Array<{ image?: string; video?: string; title?: string; description: string }> }; index: number }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carousel.slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carousel.slides.length) % carousel.slides.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative w-full"
    >
      <div ref={containerRef} className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          {carousel.slides.map((slide, slideIndex) => {
            if (slideIndex !== currentSlide) return null

            return (
              <motion.div
                key={slideIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                {slide.video ? (
                  <VideoSlide src={slide.video} />
                ) : slide.image ? (
                  <Image
                    src={slide.image}
                    alt={slide.title || `Slide ${slideIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-accent/20 via-background to-accent/10 flex items-center justify-center">
                    <div className="text-center px-6 max-w-2xl">
                      <h3 className="text-3xl font-bold text-text-primary mb-4">{slide.title}</h3>
                      <p className="text-lg text-text-secondary">{slide.description}</p>
                    </div>
                  </div>
                )}
                {/* Overlay with description */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{slide.title}</h3>
                  <p className="text-white/90">{slide.description}</p>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Navigation buttons */}
        {carousel.slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slide indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {carousel.slides.map((_, slideIndex) => (
                <button
                  key={slideIndex}
                  onClick={() => setCurrentSlide(slideIndex)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    slideIndex === currentSlide
                      ? 'bg-accent w-8'
                      : 'w-2 h-2 bg-[#FFFFFF]/30 rounded-full hover:bg-[#66D3FF]/50'
                  }`}
                  aria-label={`Go to slide ${slideIndex + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}

function VideoSlide({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useVideoPlayer({
    videoSrc: src,
    containerRef: containerRef,
    startTime: 0,
    threshold: 0.1,
  })

  return (
    <div ref={containerRef} className="w-full h-full">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover pointer-events-none"
        loop
        muted
        playsInline
        autoPlay
        onPause={(e) => {
          e.preventDefault()
          const videoEl = e.currentTarget
          if (videoEl.paused) {
            videoEl.play().catch(() => {})
          }
        }}
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  )
}

function ButtonBlock({ button, index }: { button: { type: 'button'; text: string; href?: string; onClick?: string; variant?: 'primary' | 'secondary' | 'outline' }; index: number }) {
  const variantClasses = {
    primary: 'bg-accent text-text-primary hover:bg-accent/90',
    secondary: 'bg-gray-100 text-text-secondary hover:bg-gray-200',
    outline: 'border-2 border-accent text-accent hover:bg-accent/10',
  }

  const className = `inline-block px-6 py-3 rounded-lg font-semibold transition-colors ${variantClasses[button.variant || 'primary']}`

  const handleClick = () => {
    if (button.onClick) {
      // Execute JavaScript if provided (for demo purposes)
      try {
        eval(button.onClick)
      } catch (error) {
        console.error('Error executing button onClick:', error)
      }
    }
  }

  if (button.href) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Link href={button.href} className={className}>
          {button.text}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={handleClick}
      className={className}
    >
      {button.text}
    </motion.button>
  )
}

