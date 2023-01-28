/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'light-action': "#003049",
        'light-action-hover': "#004c75",
        'light-action-active': "#00141f",
        'light-accent-red': "#d62828",
        'light-accent-orange': "#f77f00",
        'light-accent-yellow': "#fcbf49",
        'light-accent-wheat': "#eae2b7",
        'light-bg': "#fcfaf3",
        'light-bg-alt': "#fffffd",
        'dark-action': "#404258",
        'dark-action-hover': "#50577A",
        'dark-action-active': "#50577A",
        'dark-action-light': "#707182",
        'dark-accent': "#404258",
        'dark-accent-red': "#d62828",
        'dark-accent-orange': "#f77f00",
        'dark-accent-yellow': "#fcbf49",
        'dark-accent-wheat': "#eae2b7",
        'dark-bg': "#404258",
        'dark-bg-alt': "#6B728E",
        'dark-content-bg': "#9095aa"
      }
    }
  },
  plugins: [],
}
