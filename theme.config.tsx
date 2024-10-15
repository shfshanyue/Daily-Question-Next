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
  banner: {
    // key: 'comate',
    // text: (
    //   <a href="https://comate.baidu.com/?inviteCode=hw7jki0p" target="_blank">
    //     Baidu Comate，百度自研集成在 VSCode 中使用的编码辅助工具，目前可免费试用，点击查看 →
    //   </a>
    // ),
    // key: 'tongyi',
    // text: (
    //   <a href="https://developer.aliyun.com/topic/lingma/activities/202403?taskCode=14508&recordId=7a6665535809acb96955e0ddd5179112#/?utm_content=m_fission_1" target="_blank">
    //     通义灵码，阿里开发的 Code Copilot，现在注册可免费领取 AI 盲盒，如iPhone15、机械键盘、双肩包等。点击查看 →
    //   </a>
    // ),
    key: 'marscode',
    text: (
      <a href="https://zjsms.com/iBnEyfxP/" target="_blank">
        点击加入字节豆包 MarsCode 合伙人，免费领京东卡🎁，那万元现金💰，点击查看 → 
      </a>
    )
  },
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
    text: <div className="grid w-full grid-cols-3">
      <div>
        <div className="text-xl">大厂面试每日一题</div>
        <div className="mt-4">勤学如春起之苗，不见其增，日有所长。</div>
        <div className="mt-4">辍学如磨刀之石，不见其损，日有所亏。</div>
      </div>
      <div>
        <div className="text-xl">我的网站</div>
        <ul className="flex flex-col gap-4 mt-4">
          <li>
            <a href="https://geek.shanyue.tech" className="inline-block border-b border-transparent text-primary dark:text-primary-dark hover:text-orange-500">掘金返现平台</a>
          </li>
          <li>
            <a href="https://devtool.tech" className="inline-block border-b border-transparent text-primary dark:text-primary-dark hover:text-orange-500">开发者工具大全</a>
          </li>
          <li>
            <a href="https://cv.devtool.tech" className="inline-block border-b border-transparent text-primary dark:text-primary-dark hover:text-orange-500">一纸简历</a>
          </li>
          <li>
            <a href="https://markdown.devtool.tech" className="inline-block border-b border-transparent text-primary dark:text-primary-dark hover:text-orange-500">码途编辑器</a>
          </li>
        </ul>
        {/* <Cards>
          <Card icon={<FaInfo />} children="" title="掘金返现平台" href="https://geek.shanyue.tech" />
          <Card icon={<FaInfo />} children="" title="开发者工具大全" href="https://devtool.tech" />
          <Card icon={<FaInfo />} children="" title="一纸简历" href="https://cv.devtool.tech" />
          <Card icon={<FaInfo />} children="" title="码途编辑器" href="https://markdown.devtool.tech" />
        </Cards> */}
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
          content="大厂面试每日一题，每天五分钟，准备大厂中"
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