'use client'

import { Provider } from 'react-redux'
import { ReactNode } from 'react'
import { store } from '@/lib/store'
import { AuthProvider } from './AuthProvider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  )
}
