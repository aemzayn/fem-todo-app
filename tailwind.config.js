module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Josefin Sans', 'sans-serif'],
    },
    extend: {
      maxWidth: {
        '90%': '90%',
      },
      backgroundImage: theme => ({
        'mobile-light': "url('../../images/bg-mobile-light.jpg')",
        'mobile-dark': "url('../../images/bg-mobile-dark.jpg')",
        'desktop-light': "url('../../images/bg-desktop-light.jpg')",
        'desktop-dark': "url('../../images/bg-desktop-dark.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
