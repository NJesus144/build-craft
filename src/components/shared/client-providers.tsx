'use client'

import { ThemeProvider } from '@/components/shared/theme-provider'
import { useTanstackQuery } from '@/lib/tanstack-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { ReactNode, Suspense, useEffect } from 'react'
import { toast, Toaster } from 'sonner'

const CreditsToast = () => {
  const searchParams = useSearchParams()
  const successCheckoutParams = searchParams.get('success')

  useEffect(() => {
    if (successCheckoutParams === 'true') {
      toast.success('Compra realizada com sucesso!')
    }
  }, [successCheckoutParams])

  return null
}

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
        <Suspense>
          <CreditsToast />
        </Suspense>
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
