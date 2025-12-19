'use client'

import { useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/layout/Sidebar'
import { Footer } from '@/components/layout/Footer'
import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { motion } from 'framer-motion'
import { clientEnv } from '@/config/env'
import { UI_LABELS } from '@/lib/constants/ui'

export function AdminPanel() {
  const { profile, isAuthenticated, loading } = useAppSelector(
    state => state.auth
  )
  const router = useRouter()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-secondary">{UI_LABELS.LOADING}</div>
      </div>
    )
  }

  if (!isAuthenticated || profile?.email !== clientEnv.adminEmail) {
    router.push('/')
    return null
  }

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-16 md:ml-0">
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AdminDashboard />
          </motion.div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
