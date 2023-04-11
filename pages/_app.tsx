import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { AppProps } from 'next/app'
import Router from 'next/router'

import { initGA, logPageView } from '../lib/ga'
import '../styles/index.css'


function MyApp({ Component, pageProps }: AppProps) {
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
        htmlAttributes={{ lang: 'en' }}
        title="定制你的 ChatGPT 机器人"
        meta={meta}
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
