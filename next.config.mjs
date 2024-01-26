import bundleAnalyzer from '@next/bundle-analyzer'
import nextra from 'nextra'

// TODO
// import { compose } from 'midash'

// ({
//   enabled: process.env.ANALYZE === 'true'
// })

const config = {
  swcMinify: true,
  env: {
    gaId: 'UA-',
    OPENAI_API_BASEURL: 'api.nextapi.fun'
  },
  webpack(config) {
    return config
  },
  async redirects() {
    return [
      {
        source: '/engineering/:number.html',
        destination: '/engineering/e:number', // Matched parameters can be used in the destination
        permanent: false
      },
      {
        source: '/fe/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/:slug*',
        destination: '/fe/engineering/:slug*', // Matched parameters can be used in the destination
        permanent: false
      },
      {
        source: '/:slug*.html',
        destination: '/:slug*', // Matched parameters can be used in the destination
        permanent: true
      },
    ]
  },
}

export default bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})(nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})(config))
