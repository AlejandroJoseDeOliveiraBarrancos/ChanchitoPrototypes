'use client'

import { useState, useEffect, Suspense, lazy } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { HeroCarousel } from '@/components/carousel/HeroCarousel'
import { HomeFeed } from '@/components/home/HomeFeed'
import { ExploreIdeaSkeleton } from '@/components/ui/Skeleton'

// Lazy load only ForYouFeed for better performance
const ForYouFeed = lazy(() => 
  import('@/components/foryou/ForYouFeed').then(module => ({ default: module.ForYouFeed }))
)

// Loading fallback for ForYouFeed
const ForYouFeedFallback = () => (
  <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={`skeleton-${i}`} className="h-screen snap-start snap-mandatory">
        <ExploreIdeaSkeleton />
      </div>
    ))}
  </div>
)

export default function Home() {
  const [activeTab, setActiveTab] = useState<'home' | 'foryou'>('home')

  // Load active tab from localStorage on mount
  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab') as 'home' | 'foryou' | null
    if (savedTab) {
      setActiveTab(savedTab)
    }
  }, [])

  // Save active tab to localStorage when it changes
  const handleTabChange = (tab: 'home' | 'foryou') => {
    setActiveTab(tab)
    localStorage.setItem('activeTab', tab)
  }

  // Restore scroll position on mount
  useEffect(() => {
    const restoreScroll = () => {
      if (typeof window === 'undefined') return false
      
      // Check if we should restore scroll from navigation back
      const shouldRestore = sessionStorage.getItem('shouldRestoreScroll')
      const restorePath = sessionStorage.getItem('restoreScrollPath')
      const restorePosition = sessionStorage.getItem('restoreScrollPosition')
      
      let scrollY: number | null = null
      
      if (shouldRestore === 'true' && restorePath === window.location.pathname && restorePosition) {
        // Use the position from sessionStorage (more reliable for back navigation)
        scrollY = parseInt(restorePosition, 10)
        // Clear the flag
        sessionStorage.removeItem('shouldRestoreScroll')
        sessionStorage.removeItem('restoreScrollPath')
        sessionStorage.removeItem('restoreScrollPosition')
      } else {
        // Otherwise try to restore from localStorage
        const savedScroll = localStorage.getItem(`scrollPosition_${window.location.pathname}`)
        if (savedScroll) {
          scrollY = parseInt(savedScroll, 10)
        }
      }
      
      if (scrollY !== null && !isNaN(scrollY) && scrollY > 0) {
        // Find the scrollable container (div inside main with overflow-y-auto)
        const scrollContainer = document.querySelector('main > div.overflow-y-auto') as HTMLElement
        
        if (scrollContainer) {
          // Scroll the container
          requestAnimationFrame(() => {
            scrollContainer.scrollTo({ top: scrollY!, behavior: 'instant' })
          })
        } else {
          // Fallback to window scroll
          requestAnimationFrame(() => {
            window.scrollTo({ top: scrollY!, behavior: 'instant' })
          })
        }
        return true
      }
      return false
    }

    // Try immediately
    let restored = restoreScroll()
    
    // If not restored, try after delays to handle async content loading
    const timeouts: NodeJS.Timeout[] = []
    
    if (!restored) {
      timeouts.push(
        setTimeout(() => {
          restored = restoreScroll() || restored
        }, 100),
        setTimeout(() => {
          restored = restoreScroll() || restored
        }, 300),
        setTimeout(() => {
          restored = restoreScroll() || restored
        }, 600),
        setTimeout(() => {
          restoreScroll()
        }, 1000)
      )
    }
    
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout))
    }
  }, [])

  // Save scroll position before navigating away
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return
      
      // Find the scrollable container (main element with overflow-y-auto)
      const scrollContainer = document.querySelector('main.overflow-y-auto') as HTMLElement
      const scrollY = scrollContainer ? scrollContainer.scrollTop : window.scrollY
      const pathname = window.location.pathname
      
      // Save to both sessionStorage (for immediate back navigation) and localStorage (for persistence)
      sessionStorage.setItem(`scrollPosition_${pathname}`, scrollY.toString())
      localStorage.setItem(`scrollPosition_${pathname}`, scrollY.toString())
    }

    // Throttle scroll events for better performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    // Listen to scroll on both window and scrollable container
    const scrollContainer = document.querySelector('main.overflow-y-auto') as HTMLElement
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', throttledScroll, { passive: true })
    }
    window.addEventListener('scroll', throttledScroll, { passive: true })

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', throttledScroll)
      }
      window.removeEventListener('scroll', throttledScroll)
    }
  }, [])

  return (
    <div className="h-screen w-full overflow-hidden bg-background flex">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      
      <main className="flex-1 overflow-hidden">
        {activeTab === 'foryou' ? (
          <div className="h-full overflow-hidden">
            {/* Desktop: Center and respect aspect ratio like TikTok */}
            <div className="hidden md:flex h-full items-center justify-center bg-black">
              <div className="w-full max-w-md h-full mx-auto">
                <Suspense fallback={<ForYouFeedFallback />}>
                  <ForYouFeed />
                </Suspense>
              </div>
            </div>
            
            {/* Mobile: Full screen */}
            <div className="md:hidden h-full w-full">
              <Suspense fallback={<ForYouFeedFallback />}>
                <ForYouFeed />
              </Suspense>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            {/* Hero Carousel at the top */}
            <HeroCarousel />
            {/* Home Feed below - loaded directly, not lazy */}
            <HomeFeed showHeader={false} showFooter={false} />
          </div>
        )}
      </main>
    </div>
  )
}
