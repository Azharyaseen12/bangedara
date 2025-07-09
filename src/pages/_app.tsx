import '../app/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/AuthContext'
import { ToasterProvider } from '../components/Toaster'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToasterProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ToasterProvider>
  )
} 