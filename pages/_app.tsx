import React, { useEffect } from 'react'
import Router from 'next/router'

import { initGA, logPageView } from '../lib/ga'
import '../styles/index.css'
import { Helmet } from 'react-helmet'
import { AppProps } from 'next/app'

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
    }
  ]

  return (
    <>
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
    </>
  )
}