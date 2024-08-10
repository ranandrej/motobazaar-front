// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon","@pinia/nuxt",'nuxt-swiper'],
  
   
  
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'http://127.0.0.1:8000'
    }
  },
  app: {
    head: {
      title: 'Moto|Bazaar', // Default naslov stranice
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'My Nuxt.js application.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/Logo.png' } ,
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.min.css' }
        // Postavi favicon
      ]
    }
  },
  devServer: {
    host: '0.0.0.0', // Listen on all IPs
    port: 3000       // Use port 3000 or any other open port
  }
  
  
  
 
})