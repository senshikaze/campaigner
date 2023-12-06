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
        'dark-action': "#303248",
        'dark-action-hover': "#354265",
        'dark-action-active': "#474d6c",
        'dark-action-light': "#707182",
        'dark-accent': "#404258",
        'dark-accent-red': "#c61818",
        'dark-accent-orange': "#f77f00",
        'dark-accent-yellow': "#fcbf49",
        'dark-accent-wheat': "#eae2b7",
        'dark-bg': "#404258",
        'dark-bg-alt': "#4d546f",
        'dark-content-bg': "#9095aa",
        'dark-input-bg': "#80859a",
        'dark-zebra-odd': "#5d647f",
        'dark-zebra-even': "#3d445f"
      }
    }
  },
  plugins: [],
}
