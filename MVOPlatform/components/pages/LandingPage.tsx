'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/landing/Hero'
import { Process } from '@/components/landing/Process'
import { Pricing } from '@/components/landing/Pricing'
import { ScorecardMockup } from '@/components/landing/ScorecardMockup'
import { Testimonials } from '@/components/landing/Testimonials'
import { FAQ } from '@/components/landing/FAQ'
import { CTA } from '@/components/landing/CTA'

export function LandingPage() {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-16 md:ml-0">
        <main className="flex-1">
          <Hero />
          <Process />
          <ScorecardMockup />
          <Pricing />
          <Testimonials />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  )
}

