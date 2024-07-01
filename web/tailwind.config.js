/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'light-action': "#8990d9",
        'light-action-hover': "#808cc5",
        'light-action-active': "#6074af",
        'light-accent-red': "#d62828",
        'light-accent-orange': "#f77f00",
        'light-accent-yellow': "#fcbf49",
        'light-accent-wheat': "#eae2b7",
        'light-bg': "#dcdaf3",
        'light-bg-alt': "#fffffd",
        "light-input-bg": "#d0d5ea",
        'light-zebra-odd': "#dFe9f7",
        'light-zebra-even': "#fdf4ff",
        'light-bg-selected': "#70788e",
        'light-health-up-bg': "#55a320",
        'light-health-down-bg': "#c42f4e",
        'dark-action': "#084e83",
        'dark-action-hover': "#02487d",
        'dark-action-active': "#11578b",
        'dark-action-light': "#707182",
        'dark-accent': "#38a169",
        'dark-accent-red': "#a60808",
        'dark-accent-orange': "#f77f00",
        'dark-accent-yellow': "#fcbf49",
        'dark-accent-wheat': "#eae2b7",
        'dark-bg': "#1f2937",
        'dark-bg-alt': "#101726",
        'dark-content-bg': "#111827",
        'dark-input-bg': "#40455a",
        'dark-input-bg-selected': "#70788e",
        'dark-zebra-odd': "#1F2937",
        'dark-zebra-even': "#3d445f",
        'dark-health-up-bg': "#358300",
        'dark-health-down-bg': "#a40f2e"
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
