"use client"

import { ThemeProvider } from '@/components/shared/theme-provider'
import { useTanstackQuery } from '@/lib/tanstack-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'

interface ClientProvidersProps {
  children: ReactNode
}

export const ClientProviders = ({ children }: ClientProvidersProps) => {
  const queryClient = useTanstackQuery()
 
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
