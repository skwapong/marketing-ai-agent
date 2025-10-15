import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientThemeProvider from '@/contexts/ClientThemeProvider'
import { PersonaProvider } from '@/contexts/PersonaContext'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Marketing Super Agent - TD',
  description: 'AI-powered marketing intelligence platform for CDP data analysis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientThemeProvider>
          <PersonaProvider>
            {children}
          </PersonaProvider>
        </ClientThemeProvider>
      </body>
    </html>
  )
}
