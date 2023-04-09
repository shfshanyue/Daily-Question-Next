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
  }
}

export default bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})(nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})(config))
