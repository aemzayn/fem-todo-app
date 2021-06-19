module.exports = {
  mode: "jit",
  purge: ["./components/**/*.tsx", "./pages/**/*.tsx"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Josefin Sans", "sans-serif"],
    },
    extend: {
      maxWidth: {
        "90%": "90%",
      },
      backgroundImage: (theme) => ({
        "mobile-light": "url('../../../assets/images/bg-mobile-light.jpg')",
        "mobile-dark": "url('../../../assets/images/bg-mobile-dark.jpg')",
        "desktop-light": "url('../../../assets/images/bg-desktop-light.jpg')",
        "desktop-dark": "url('../../../assets/images/bg-desktop-dark.jpg')",
      }),
    },
  },
};
