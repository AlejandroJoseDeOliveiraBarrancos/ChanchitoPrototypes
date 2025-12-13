'use client'

import { useState } from 'react'
import { ExploreFeed } from '@/components/explore/ExploreFeed'
import { IdeasFeed } from '@/components/pages/IdeasFeed'
import { Sidebar } from '@/components/layout/Sidebar'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'explore' | 'foryou'>('foryou')

  return (
    <div className="h-screen w-full overflow-hidden bg-background flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 overflow-hidden">
        {activeTab === 'explore' ? (
          <div className="h-full overflow-hidden">
            {/* Desktop: Center and respect aspect ratio like TikTok */}
            <div className="hidden md:flex h-full items-center justify-center bg-black">
              <div className="w-full max-w-md h-full mx-auto">
                <ExploreFeed />
              </div>
            </div>
            
            {/* Mobile: Full screen */}
            <div className="md:hidden h-full w-full">
              <ExploreFeed />
            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            <IdeasFeed showHeader={false} showFooter={false} isForYou={true} />
          </div>
        )}
      </main>
    </div>
  )
}
