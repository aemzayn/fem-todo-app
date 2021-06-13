module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Josefin Sans', 'sans-serif'],
    },
    extend: {
      maxWidth: {
        '90%': '90%',
      },
      backgroundImage: theme => ({
        'mobile-light': "url('../../src/assets/images/bg-mobile-light.jpg')",
        'mobile-dark': "url('../../src/assets/images/bg-mobile-dark.jpg')",
        'desktop-light': "url('../../src/assets/images/bg-desktop-light.jpg')",
        'desktop-dark': "url('../../src/assets/images/bg-desktop-dark.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
