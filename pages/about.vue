<template>
  <div class="w-full min-h-screen bg-gray-100 py-8">
    <div class="container mx-auto px-4 md:px-8">
      <!-- Hero Section -->
      <div class="relative bg-cover bg-center h-60 bg-[url('~/assets/background2.jpg')]">
        <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 class="text-4xl font-bold text-white text-center">Dobrodošli na Moto|<span class="text-yellow-500">Bazaar</span></h1>
        </div>
      </div>

      <!-- Main Content -->
      <div class="mt-12">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="w-full md:w-1/2 mb-8 md:mb-0">
            <h2 class="text-3xl font-bold mb-4">Ko smo mi?</h2>
            <p class="text-lg text-gray-700 leading-relaxed">
              MotoBazaar je inovativni start-up namenjen svim ljubiteljima motocikala. Naša misija
              je da pružimo jednostavan i brz način za postavljanje oglasa za prodaju 
              motocikala. Bilo da ste u potrazi za novim motorom ili želite da prodate stari, naš
              sajt vam omogućava da brzo i efikasno pronađete ono što tražite.Naša ideja je da stvorimo jedinstvenu platformu isključivo za motocikle,gde će oni biti u prvom planu.
            </p>
          </div>
          <div class="w-full md:w-1/2">
            <img src="~/assets/rezultatibg.jpg" alt="Team" class="w-full rounded-lg shadow-lg">
          </div>
        </div>

        <div class="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-4">Naša Usmerenja</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="p-4 bg-gray-50 rounded-lg shadow-sm">
              <h3 class="text-xl font-semibold mb-2">Postavite Oglas</h3>
              <p class="text-gray-600 mb-3">
                Registrujte se i besplatno podelite svoj oglas sa potencijalnim kupcima. Proces je brz i jednostavan
                - samo unesite informacije o svom motociklu, dodajte slike, i vaš oglas je spreman!
              </p>
              <NuxtLink class=" p-2 bg-transparent border-2 border-yellow-500 cursor-pointer" to="/register">Registruj se</NuxtLink>

            </div>
            <div class="p-4 bg-gray-50 rounded-lg shadow-sm">
              <h3 class="text-xl font-semibold mb-2">Pretražite Oglase</h3>
              <p class="text-gray-600 mb-3">
                Pretražujte oglase koristeći napredne filtere. Nađite motocikl koji savršeno
                odgovara vašim potrebama, od klasičnih modela do najnovijih sportskih mašina.
              </p>
              <NuxtLink class=" p-2 bg-transparent border-2 border-yellow-500 cursor-pointer" to="/">Gledaj Oglase</NuxtLink>

            </div>
          </div>
        </div>

      
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>
