import type { DocsThemeConfig} from 'nextra-theme-docs';
import { useConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

export default {
  project: {
  },
  primaryHue: 25,
  logo: (
    <>
      <span style={{ marginLeft: '.4em', fontWeight: 800 }}>
        大厂面试每日一题
      </span>
    </>
  ),
  sidebar: {
    titleComponent({ title, type }) {
      if (type === 'separator') {
        return <span className="cursor-default">{title}</span>
      }
      return <>{title}</>
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true
  },
  footer: {
    text: <div>
      <div className="text-xl">大厂面试每日一题</div>
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
        titleTemplate: '%s – 大厂面试每日一题'
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
          content={title ? title + ' – 大厂面试每日一题' : '大厂面试每日一题'}
        />
        <meta name="apple-mobile-web-app-title" content="大厂面试每日一题" />
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
  // search: {
  //   component: false
  // }
} as DocsThemeConfig