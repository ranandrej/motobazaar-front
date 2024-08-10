<script setup>
import { useMainStore } from '~/stores/main'
import { useRuntimeConfig } from '#app'
import { useRouter } from 'vue-router'


const config = useRuntimeConfig()
const router = useRouter()
const loading=ref(false)
async function brisanje(id) {
   // Resetuje poruku o grešci
   loading.value=true
  try {
    const data = await $fetch(`${config.public.apiUrl}/api/deleteMotocikl/?id=${id}`, {
      method: 'DELETE',
      headers:{
        Authorization:`Bearer ${localStorage.getItem('access_token')}`
      }
    })
   
    loading.value=false
    useMainStore().isDeleteModalOpen=false
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
    <div class="fixed top-0 left-0 w-full h-full z-40 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <!-- Modal -->
      <Loading v-if="loading"/>
      <div class="md:w-1/3 rounded-md bg-slate-800 p-8">
        <h2 class="w-full text-white text-lg m-2">Da li sigurno želite da obrisete ovaj oglas?</h2>
        <div class="w-full flex justify-center items-center mt-4">
          <button class="bg-red-500 cursor-pointer p-2 rounded-md text-white mx-2" @click="brisanje(useMainStore().selectedMotocikl.id)">Da</button>
          <button @click="useMainStore().isDeleteModalOpen=false" class="bg-transparent border border-yellow-500 cursor-pointer p-2 rounded-md text-white mx-2">Otkaži</button>
        </div>
      </div>
    </div>
  </template>