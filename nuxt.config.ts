// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindTypography from '@tailwindcss/typography';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon","@pinia/nuxt",'nuxt-swiper','@nuxtjs/sitemap'],
  sitemap: {
    hostname: 'https://motobazaar-front.onrender.com',
    routes: [
      // List your dynamic routes or let Nuxt auto-discover them
    ],
  },
   
  
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'http://127.0.0.1:8000'
    }
  },
  app: {
    head: {
      title: 'Moto|Bazaar - Oglasi za polovne motocikle', // Default naslov stranice
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Prvi oglasi isključivo za motocikle u Srbiji. Pronađite savršeni motocikl ili besplatno oglasite prodaju svog uz MotoBazaar!' },
        { property: 'og:title', content: 'MotoBazaar - Oglasi za polovne motocikle' },
        { property: 'og:description', content: 'Najbolje mesto za kupovinu i prodaju motocikala u Srbiji.' },
        { property: 'og:image', content: 'https://example.com/path-do-defaultne-slike.jpg' },
        { property: 'og:url', content: 'https://motobazaar.com' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/Logo.png' } ,
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.min.css' }
        // Postavi favicon
      ]
    }
  },
  tailwindcss: {
    config: {
        plugins: [tailwindTypography],
    }
},
  devServer: {
    host: '0.0.0.0', // Listen on all IPs
    port: 3000       // Use port 3000 or any other open port
  }
  
  
  
 
})