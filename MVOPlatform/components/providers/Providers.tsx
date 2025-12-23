'use client'

import { Provider } from 'react-redux'
import { ReactNode } from 'react'
import { store } from '@/lib/store'
import { AuthProvider } from './AuthProvider'
import { I18nProvider } from './I18nProvider'

export function Providers({
  children,
  locale,
}: {
  children: ReactNode
  locale?: 'en' | 'es'
}) {
  return (
    <Provider store={store}>
      <I18nProvider locale={locale}>
        <AuthProvider>{children}</AuthProvider>
      </I18nProvider>
    </Provider>
  )
}
