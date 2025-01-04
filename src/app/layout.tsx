import { ThemeProvider } from '@/components/shared/theme-provider'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Nunito, Nunito_Sans } from 'next/font/google'
import { Toaster } from 'sonner'

import { setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const fontSans = Nunito_Sans({ subsets: ['latin'], variable: '--font-sans' })
const fontTitle = Nunito({ subsets: ['latin'], variable: '--font-title' })

export const metadata: Metadata = {
  title: 'BuildCraft',
}

setDefaultOptions({ locale: ptBR })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontTitle.variable,
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
