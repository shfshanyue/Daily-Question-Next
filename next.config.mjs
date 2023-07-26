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
