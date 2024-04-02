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
        'dark-action': "#096fa3",
        'dark-action-hover': "#0B5286",
        'dark-action-active': "#11578b",
        'dark-action-light': "#707182",
        'dark-accent': "#38a169",
        'dark-accent-red': "#a60808",
        'dark-accent-orange': "#f77f00",
        'dark-accent-yellow': "#fcbf49",
        'dark-accent-wheat': "#eae2b7",
        'dark-bg': "#1f2937",
        'dark-bg-alt': "#111827",
        'dark-content-bg': "#111827",
        'dark-input-bg': "#40455a",
        'dark-zebra-odd': "#1F2937",
        'dark-zebra-even': "#3d445f"
      }
    }
  },
  plugins: [],
}
