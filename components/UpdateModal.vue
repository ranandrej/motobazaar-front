<script setup>
import { useMainStore } from '~/stores/main'
import { useRuntimeConfig } from '#app'
import { useRouter } from 'vue-router'


const config = useRuntimeConfig()
const router = useRouter()
const formData=ref({})
async function izmena(motocikl) {
   // Resetuje poruku o grešci
  try {
    const data = await $fetch(`${config.public.apiUrl}/api/updateMotocikl/`, {
      method: 'PUT',
      headers:{
        Authorization:`Bearer ${localStorage.getItem('access_token')}`
      },
    
    body:motocikl
    })
   
    
    useMainStore().isUpdateModalOpen=false
    window.location.reload()
    
     // Preusmerava na početnu stranicu
  } catch (error) {
    if(error.status==401){
        window.location.href="/login"
    }else{
        console.log(error)
        loading.value=false
    }
  }
}

</script>
<template>
    <!-- Overlay -->
    <div class="fixed top-0 left-0 p-6 w-full h-full z-40 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <!-- Modal -->
      <div class="md:w-1/3 rounded-md bg-gray-300 p-8 flex border-2 mt-6 max-h-[700px] border-yellow-500 flex-wrap  overflow-y-scroll">
        <h1 class="text-xl text-gray-700 w-full text-center">Izmena podataka</h1>
        <div class="w-full">
        <label class="block text-sm font-medium text-gray-700">Marka</label>
        <input v-model="useMainStore().selectedMotocikl.marka"
          type="text"
          name="marka"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          required
        />
      </div>

      <!-- Model -->
      <div class="w-full">
        <label class="block text-sm font-medium text-gray-700">Model</label>
        <input v-model="useMainStore().selectedMotocikl.model"
          type="text"
          name="model"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          required
        />
      </div>

      <!-- Godiste -->
      <div class="mr-2">
        <label class="block text-sm font-medium text-gray-700">Godište</label>
        <input v-model="useMainStore().selectedMotocikl.godiste"
          type="number"
          name="godiste"
          min="1900"
          max="2099"
          step="1"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          required
        />
      </div>

      <!-- Cena -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Cena</label>
        <input v-model="useMainStore().selectedMotocikl.cena"
          type="number"
          name="cena"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          required
        />
      </div>

      <!-- Kilometraza -->
      <div class="mr-2">
        <label class="block text-sm font-medium text-gray-700">Kilometraža</label>
        <input v-model="useMainStore().selectedMotocikl.kilometraza"
          type="number"
          name="kilometraza"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          required
        />
      </div>

      <!-- Mesto -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Mesto</label>
        <input v-model="useMainStore().selectedMotocikl.mesto"
          type="text"
          name="mesto"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          required
        />
      </div>
      <div class="mr-2">
        <label class="block text-sm font-medium text-gray-700">Kubikaža</label>
        <input v-model="useMainStore().selectedMotocikl.kubikaza"
          type="text"
          name="kubikaza"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Snaga</label>
        <input v-model="useMainStore().selectedMotocikl.snaga"
          type="text"
          name="snaga"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          required
        />
      </div>

      <!-- Opis -->
      <div class="w-2/3">
        <label class="block text-sm font-medium text-gray-700">Opis</label>
        <textarea v-model="useMainStore().selectedMotocikl.opis"
          name="opis"
          rows="6"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          required
        ></textarea>
      </div>
      <div class="w-2/3">
        <label class="block text-sm font-medium text-gray-700">Dodatna oprema</label>
        <textarea v-model="useMainStore().selectedMotocikl.dodatna_oprema"
          name="dodatna_oprema"
          rows="6"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          required
        ></textarea>
      </div>
     <div class="w-full flex justify-start mt-4">
        <button class="p-2 rounded-md bg-transparent text-gray-700 cursor-pointer border-2 border-yellow-500 mx-2" @click="useMainStore().isUpdateModalOpen=false">Otkaži</button>
        <button class="p-2 rounded-md  cursor-pointer  bg-yellow-500" @click="izmena(useMainStore().selectedMotocikl)">Sačuvaj</button>

     </div>
    </div>
    </div>
  </template>