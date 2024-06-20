// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: [
          // automatically imports `defineStore`
          "defineStore",
        ],
      },
    ],
    "@nuxt/ui",
  ],
  runtimeConfig: {
    public: {
      apiBase: import.meta.env.VITE_API_BASE, // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    },
  },
});
