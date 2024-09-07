<script setup>
import { useHead } from 'nuxt/app'

useHead({
  title: 'MotoBazaar - Vaša platforma za motocikle',
  meta: [
    {
      name: 'description',
      content: 'Pronađite najbolje motocikle, pretražite oglase i kupite svoj savršeni motor na MotoBazaar-u. Bezbedno i jednostavno, povezujemo ljubitelje motocikala sa prodavcima.'
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
