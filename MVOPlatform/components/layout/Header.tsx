'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { UserMenu } from '@/components/ui/UserMenu'
import { clientEnv } from '@/config/env'
import { UI_LABELS } from '@/lib/constants/ui'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border-color">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-text-primary">
          {UI_LABELS.BRAND_NAME}
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/ideas"
            className="nav-link"
          >
            {UI_LABELS.EXPLORE}
          </Link>
          <Link
            href="/submit"
            className="nav-link"
          >
            {UI_LABELS.SUBMIT_IDEA}
          </Link>

          {session ? (
            <>
              {session.user?.email === clientEnv.adminEmail && (
                <Link
                  href="/admin"
                  className="nav-link"
                >
                  {UI_LABELS.ADMIN}
                </Link>
              )}
              <UserMenu user={session.user} onSignOut={() => signOut()} />
            </>
          ) : (
            <Button onClick={() => signIn('google')} variant="primary">
              {UI_LABELS.SIGN_IN}
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}

