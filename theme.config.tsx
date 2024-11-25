import type { DocsThemeConfig} from 'nextra-theme-docs';
import { useConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

const config: DocsThemeConfig = {
  project: {
  },
  color: {
    hue: 25
  },
  logo: (
    <>
      <span style={{ marginLeft: '.4em', fontWeight: 800 }}>
        大厂面试每日一题
      </span>
    </>
  ),
  banner: {
    key: 'cvdevtool.templates',
    content: (
      <a href="https://cv.devtool.tech/templates" target="_blank">
        一纸简历更新更多的简历模板，如应届生模板与三年前端模板，点击查看 →
      </a>
    )
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true
  },
  footer: {
    content: <div className="grid w-full grid-cols-3">
      <div>
        <div className="text-xl">大厂面试每日一题</div>
        <div className="mt-4">勤学如春起之苗，不见其增，日有所长。</div>
        <div className="mt-4">辍学如磨刀之石，不见其损，日有所亏。</div>
      </div>
      <div>
        <div className="text-xl">我的网站</div>
        <ul className="flex flex-col gap-2 mt-4">
          <li>
            <a href="https://cv.devtool.tech/docs/resume" target="_blank" className="inline-block border-b border-transparent text-primary dark:text-primary-dark hover:text-orange-500">简历编写指南</a>
          </li>
          <li>
            <a href="https://cv.devtool.tech/templates" target="_blank" className="inline-block border-b border-transparent text-primary dark:text-primary-dark hover:text-orange-500">简历模板</a>
          </li>
          <li>
            <a href="https://cv.devtool.tech" target="_blank" className="inline-block border-b border-transparent text-primary dark:text-primary-dark hover:text-orange-500">一纸简历</a>
          </li>
          <li>
            <a href="https://devtool.tech" target="_blank" className="inline-block border-b border-transparent text-primary dark:text-primary-dark hover:text-orange-500">开发者工具大全</a>
          </li>
          <li>
            <a href="https://markdown.devtool.tech" target="_blank" className="inline-block border-b border-transparent text-primary dark:text-primary-dark hover:text-orange-500">码途编辑器</a>
          </li>
          <li>
            <a href="https://blog.shanyue.tech" target="_blank" className="inline-block border-b border-transparent text-primary dark:text-primary-dark hover:text-orange-500">山月的新博客</a>
          </li>
          <li>
            <a href="https://weekly.shanyue.tech" target="_blank" className="inline-block border-b border-transparent text-primary dark:text-primary-dark hover:text-orange-500">
              前端开发者周刊
            </a>
          </li>
          <li>
            <a href="https://geek.shanyue.tech" target="_blank" className="inline-block border-b border-transparent text-primary dark:text-primary-dark hover:text-orange-500">掘金返现平台</a>
          </li>
        </ul>
      </div>
      <div>
        <div className="text-xl">二维码</div>
        <div className="mt-4">
          关注公众号《互联网大厂面试》，每日推送一篇大厂面试题！
        </div>
        <img className="mt-4 rounded w-[180px] shadow" src="https://static.shanyue.tech/images/23-09-07/qrcode_for_gh_5f162937a2ad_258.6cc370.webp" />
      </div>
    </div>,
  },
  feedback: {
    content: null
  },
  editLink: {
    component: null
  },
  head: function useHead() {
    const { title, frontMatter } = useConfig()
    const { route } = useRouter()
    
    const description = frontMatter.description || "大厂面试每日一题，每天五分钟，准备大厂中"
    const baseUrl = 'https://q.shanyue.tech'
    const canonicalUrl = `${baseUrl}${route}`

    return (
      <>
        <title>{title ? title + ' – 大厂面试每日一题' : '大厂面试每日一题'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="zh" />
        <meta name="description" content={description} />
        
        {/* OpenGraph tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="大厂面试每日一题" />
        <meta property="og:title" content={title ? title + ' – 大厂面试每日一题' : '大厂面试每日一题'} />
        <meta property="og:description" content={description} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title ? title + ' – 大厂面试每日一题' : '大厂面试每日一题'} />
        <meta name="twitter:description" content={description} />
        
        <meta name="apple-mobile-web-app-title" content="大厂面试每日一题" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* OpenGraph URL */}
        <meta property="og:url" content={canonicalUrl} />
        
        {/* Twitter URL */}
        <meta name="twitter:url" content={canonicalUrl} />
      </>
    )
  },
}

export default config