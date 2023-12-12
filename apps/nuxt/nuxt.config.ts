// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['./module.ts'],
  devtools: { enabled: true },
  nitro: {
    esbuild: {
      options: {
        target: 'es2022'
      },
    },
    rollupConfig: { 
      external: ['wrangler']
    }
  },
})
