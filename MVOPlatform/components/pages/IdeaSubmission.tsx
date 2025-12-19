'use client'

import { useState } from 'react'
import { useAppSelector } from '@/lib/hooks'
import { signInWithGoogle } from '@/lib/slices/authSlice'
import { useAppDispatch } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/layout/Sidebar'
import { Footer } from '@/components/layout/Footer'
import { IdeaForm } from '@/components/forms/IdeaForm'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { UI_LABELS } from '@/lib/constants/ui'

export function IdeaSubmission() {
  const dispatch = useAppDispatch()
  const { isAuthenticated, loading } = useAppSelector(state => state.auth)
  const router = useRouter()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-secondary">{UI_LABELS.LOADING}</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col ml-16 md:ml-0">
          <main className="flex-1 flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-md"
            >
              <h1 className="text-3xl font-semibold text-text-primary mb-4">
                {UI_LABELS.SIGN_IN_REQUIRED}
              </h1>
              <p className="text-base text-text-secondary mb-8">
                {UI_LABELS.SIGN_IN_DESCRIPTION}
              </p>
              <Button onClick={() => dispatch(signInWithGoogle())}>
                {UI_LABELS.SIGN_IN_WITH_GOOGLE}
              </Button>
            </motion.div>
          </main>
          <Footer />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-16 md:ml-0">
        <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-heading-1 mb-4">
              {UI_LABELS.SUBMIT_YOUR_IDEA}
            </h1>
            <p className="text-lg text-text-secondary">
              Fill out the form below to validate your business idea
            </p>
          </motion.div>

          <IdeaForm />
        </main>
        <Footer />
      </div>
    </div>
  )
}
