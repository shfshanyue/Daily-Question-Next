import React, { useEffect } from 'react'
import Router from 'next/router'
import { Helmet } from 'react-helmet'
import {
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import type { AppProps } from 'next/app'

import { initGA, logPageView } from '../lib/ga'
import '../styles/index.css'
import { queryClient } from '../lib/queryClient'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (process.env.gaId) {
      initGA()
      logPageView()
      Router.events.on('routeChangeComplete', logPageView)
    }
  }, [])

  const meta = [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'referrer',
      content: 'no-referrer'
    }
  ]

  return (
    <QueryClientProvider client={queryClient}>
      <Helmet
        meta={meta}
      >
        <script>
          {
            `window.difyChatbotConfig = {token: 'Sy3lLLLeNComuY39' }`
          }
        </script>
        <script
          src="https://udify.app/embed.min.js"
          id="Sy3lLLLeNComuY39"
          defer>
        </script>
      </Helmet>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
