'use client'

import { Suspense, lazy } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'

// Lazy load ForYouFeed for better performance
const ForYouFeed = lazy(() =>
  import('@/components/foryou/ForYouFeed').then(module => ({
    default: module.ForYouFeed,
  }))
)

// Loading fallback for ForYouFeed
const ForYouFeedFallback = () => (
  <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
    {[1, 2, 3, 4, 5].map(i => (
      <div key={`skeleton-${i}`} className="h-screen snap-start snap-mandatory">
        <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg" />
      </div>
    ))}
  </div>
)

export default function ForYouPage() {
  return (
    <div className="h-screen w-full overflow-hidden bg-background flex">
      <Sidebar activeTab="foryou" onTabChange={() => {}} />

      <main className="flex-1 overflow-hidden">
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
      </main>
    </div>
  )
}
