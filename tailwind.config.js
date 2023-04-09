module.exports = {
  content: ['./theme.config.tsx', './components/**/*.{js,ts,jsx,tsx,mdx}', './pages/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '100%',
            a: {
              color: theme('colors.orange.400'),
            },
          },
        },
      }),
    }
  },
  variants: {},
  plugins: [
    // require('@tailwindcss/typography')
  ]
}
