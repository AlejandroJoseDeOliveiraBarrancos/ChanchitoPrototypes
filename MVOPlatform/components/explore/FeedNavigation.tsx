'use client'

import { motion } from 'framer-motion'

interface FeedNavigationProps {
  activeTab: 'explore' | 'foryou'
  onTabChange: (tab: 'explore' | 'foryou') => void
}

export function FeedNavigation({ activeTab, onTabChange }: FeedNavigationProps) {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border-color">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-semibold text-text-primary">
          MVO Platform
        </div>
        
        <div className="flex items-center gap-8">
          <button
            onClick={() => onTabChange('explore')}
            className="relative py-2 px-2 text-base font-medium transition-colors"
          >
            <span
              className={`transition-colors ${
                activeTab === 'explore'
                  ? 'text-text-primary'
                  : 'text-text-secondary'
              }`}
            >
              Explore
            </span>
            {activeTab === 'explore' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
          <button
            onClick={() => onTabChange('foryou')}
            className="relative py-2 px-2 text-base font-medium transition-colors"
          >
            <span
              className={`transition-colors ${
                activeTab === 'foryou'
                  ? 'text-text-primary'
                  : 'text-text-secondary'
              }`}
            >
              For You
            </span>
            {activeTab === 'foryou' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

