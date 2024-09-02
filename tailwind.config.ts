import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      height: {
        86: '22rem'
      },
      gridTemplateColumns: {
        gallery_md: 'repeat(auto-fill, minmax(200px, 1fr))',
        gallery: 'repeat(auto-fill, minmax(125px, 1fr))'
      },
      gridTemplateRows: {
        gallery_md: 'repeat(auto-fit, 200px)',
        gallery: 'repeat(auto-fit, 125px)'
      },
      colors: {
        primary: '#000',
        secodary: '#121212',
        tertiary: '#E91052'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      boxShadow: {
        search: '0px 0px 8px rgb(233, 16, 82)'
      }
    }
  },
  plugins: []
}
export default config
