'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTranslations } from '@/shared/components/providers/I18nProvider'
import { useAppDispatch, useAppSelector } from '@/core/lib/hooks'
import { IdeaForm } from '@/features/ideas/components/forms/IdeaForm'
import { Button } from '@/shared/components/ui/Button'
import { signInWithGoogle } from '@/core/lib/slices/authSlice'

export function IdeaUpload() {
  const t = useTranslations()
  const dispatch = useAppDispatch()
  const { isAuthenticated, loading } = useAppSelector(state => state.auth)
  const router = useRouter()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-secondary">{t('status.loading')}</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <h1 className="text-3xl font-semibold text-text-primary mb-4">
            {t('auth.sign_in_required')}
          </h1>
          <p className="text-base text-text-secondary mb-8">
            {t('auth.sign_in_to_upload')}
          </p>
          <Button onClick={() => dispatch(signInWithGoogle())}>
            {t('auth.sign_in_with_google')}
          </Button>
        </motion.div>
      </div>
    )
  }

  return <IdeaForm />
}
