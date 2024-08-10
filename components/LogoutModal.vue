<script setup>
import { useMainStore } from '~/stores/main'
import { useRuntimeConfig } from '#app'
import { useRouter } from 'vue-router'

const config = useRuntimeConfig()
const router = useRouter()

async function odjava() {
   // Resetuje poruku o grešci
  useMainStore().accessToken=""
  useMainStore().currentUser=""
  localStorage.removeItem('access_token')
  localStorage.removeItem('user')
  window.location.href="/"
}

</script>
<template>
    <!-- Overlay -->
    <div class="fixed top-0 left-0 w-full h-full z-40 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <!-- Modal -->
      <div class="md:w-1/3 rounded-md bg-slate-800 p-8">
        <h2 class="w-full text-white text-lg m-2">Da li želite da se odjavite?</h2>
        <div class="w-full flex justify-center items-center mt-4">
          <button class="bg-red-500 cursor-pointer p-2 px-4 rounded-md text-white mx-2" @click="odjava()">Da</button>
          <button @click="useMainStore().isLogoutModalOpen=false" class="bg-transparent border border-yellow-500 cursor-pointer p-2 rounded-md text-white mx-2">Otkaži</button>
        </div>
      </div>
    </div>
  </template>