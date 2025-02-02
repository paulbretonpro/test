// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxt/ui",
    "dayjs-nuxt",
  ],
  dayjs: {
    locales: ["fr"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "fr",
    defaultTimezone: "Europe/Paris",
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            darkPrimary: {
              50: "#e6e6e6", // Très clair
              100: "#cccccc",
              200: "#b3b3b3",
              300: "#999999",
              400: "#808080",
              500: "#262626", // Base
              600: "#1f1f1f",
              700: "#191919",
              800: "#121212",
              900: "#0c0c0c",
              950: "#050505",
            },
          },
        },
      },
    },
  }
})
