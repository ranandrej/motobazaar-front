<script setup>
import { useHead } from 'nuxt/app'

useHead({
  title: 'Oglasi za motocikle | MotoBazaar - Kupujte i Prodajte Polovne Motocikle',
  meta: [
    {
      name: 'description',
      content: 'Pronađite najbolje motocikle, pretražite oglase i kupite svoj savršeni motor na MotoBazaar-u. Bezbedno i jednostavno, povezujemo ljubitelje motocikala sa prodavcima.'
    },
    {
      name: 'keywords',
      content: 'polovan motocikl, motocikli na prodaju, kupovina motora, prodaja motocikala, MotoBazaar, oglasi za motocikle,polovni motocikli'
    }
  ]
})

</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
