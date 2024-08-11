<script setup>
import { useMainStore } from '~/stores/main'
import { useRuntimeConfig } from '#app'
import { useRouter } from 'vue-router'

const config = useRuntimeConfig()
const router = useRouter()
const formData=ref({})
const loading=ref(false)
const successChange=ref(false)
async function izmena(user) {
    loading.value=true
   // Resetuje poruku o grešci
  try {
    const data = await $fetch(`${config.public.apiUrl}/api/updateUser/`, {
      method: 'PUT',
      headers:{
        Authorization:`Bearer ${localStorage.getItem('access_token')}`
      },
     
    body:user
    })
   
    localStorage.setItem('user', JSON.stringify(user))
    loading.value=false
    successChange.value=true
    useMainStore().isUpdateModalOpen=false
    setTimeout(() => {
        window.location.reload()
    }, 2000)
    
    
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
    <Loading v-if="loading"/>
    <SuccessAlert v-if="successChange" :message="'Uspesno promenjen korisnik'"/>
    <!-- Overlay -->
    <div class="fixed top-0 left-0 p-6 w-full h-full z-40 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <!-- Modal -->
      <div  class="md:w-1/3 rounded-md bg-white p-8 flex border-2 border-yellow-500 flex-wrap">
        <h1 class="text-xl text-gray-700 w-full text-center">Izmena podataka</h1>
        <hr>
        <div class="w-full">
        <label class="block text-sm font-medium text-gray-700">Ime</label>
        <input v-model="useMainStore().currentUser.name"
          type="text"
          name="marka"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          required
        />
      </div>

      <!-- Model -->
      <div class="w-full">
        <label class="block text-sm font-medium text-gray-700">Telefon</label>
        <input v-model="useMainStore().currentUser.telefon"
          type="text"
          name="model"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          required
        />
      </div>

     
     <div class="w-full flex justify-start mt-4">
      <button class="text-white inline-flex items-center bg-yellow-500  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center" @click="izmena(useMainStore().currentUser)">Sačuvaj</button>

        <button class="p-2 rounded-md bg-transparent text-gray-700 cursor-pointer border-2 border-yellow-500 mx-2" @click="useMainStore().isUpdateUserModalOpen=false">Otkaži</button>

     </div>
    </div>
    </div>
  </template>