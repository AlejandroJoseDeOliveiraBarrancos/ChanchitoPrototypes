'use client'

import Link from 'next/link'
import { useAppSelector } from '@/lib/hooks'
import { Button } from '@/components/ui/Button'
import { signInWithGoogle, signOut } from '@/lib/slices/authSlice'
import { useAppDispatch } from '@/lib/hooks'
import { clientEnv } from '@/config/env'
import { UI_LABELS } from '@/lib/constants/ui'

export function Header() {
  const dispatch = useAppDispatch()
  const { isAuthenticated, profile } = useAppSelector(state => state.auth)

  const handleSignIn = () => {
    dispatch(signInWithGoogle())
  }

  const handleSignOut = () => {
    dispatch(signOut())
  }

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border-color">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-text-primary">
          {UI_LABELS.BRAND_NAME}
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/ideas" className="nav-link">
            {UI_LABELS.EXPLORE}
          </Link>
          <Link href="/upload" className="nav-link">
            {UI_LABELS.SUBMIT_IDEA}
          </Link>

          {isAuthenticated ? (
            <>
              {profile?.email === clientEnv.adminEmail && (
                <Link href="/admin" className="nav-link">
                  {UI_LABELS.ADMIN}
                </Link>
              )}
              <div className="flex items-center gap-4">
                <span className="text-text-primary">
                  Welcome, {profile?.full_name || 'User'}
                </span>
                <Button onClick={handleSignOut} variant="secondary">
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button onClick={handleSignIn} variant="outline">
                Login
              </Button>
              <Button onClick={handleSignIn} variant="primary">
                Register
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
