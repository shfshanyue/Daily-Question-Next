import type { DocsThemeConfig} from 'nextra-theme-docs';
import { useConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

export default {
  project: {
  },
  logo: (
    <>
      {/* <svg width="30" height="30" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="600" height="600" rx="50" fill="#FB923C"/>
        <circle cx="157" cy="234" r="71" fill="#FFF7ED"/>
        <circle cx="444" cy="234" r="71" fill="#FFF7ED"/>
        <line x1="146" y1="427" x2="455" y2="427" stroke="#FFF7ED" stroke-width="20" stroke-linecap="round"/>
      </svg> */}
      <span style={{ marginLeft: '.4em', fontWeight: 800 }}>
        🤖 AI 机器人管家
      </span>
    </>
  ),
  footer: {
    text: <div>
      <div className="text-xl">AI 机器人管家</div>
      <div className="mt-4">让你的工作更加简单，让你的沟通更加高效。</div>
    </div>,
  },
  feedback: {
    content: null
  },
  editLink: {
    text: null
  },
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – AI 机器人管家'
      }
    }
  },
  head: function useHead() {
    const { title } = useConfig()
    const { route } = useRouter()

    return (
      <>
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="description"
          content="Make beautiful websites with Next.js & MDX."
        />
        <meta
          name="og:title"
          content={title ? title + ' – AI 机器人管家' : 'AI 机器人管家'}
        />
        <meta name="apple-mobile-web-app-title" content="AI 机器人管家" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        {/* <link
          rel="icon"
          href="/favicon-dark.svg"
          type="image/svg+xml"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          href="/favicon-dark.png"
          type="image/png"
          media="(prefers-color-scheme: dark)"
        /> */}
      </>
    )
  },
} as DocsThemeConfig