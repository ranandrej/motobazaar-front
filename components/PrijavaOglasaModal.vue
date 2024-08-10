<script setup>
import { useMainStore } from '~/stores/main'
import { useRuntimeConfig } from '#app'
import { useRouter } from 'vue-router'

const config = useRuntimeConfig()
const router = useRouter()
const formData=ref({})
const loading=ref(false)
const successPrijava=ref(false)
const poruka=ref("")
const description=ref("")
const odabraniRazlog = ref('')
const razlozi = {
      neprikladan_sadrzaj: 'Neprikladan sadržaj',
      netacne_informacije: 'Netačne informacije',
      dupli_oglas: 'Dupli oglas',
      sumnja_na_prevaru: 'Sumnja na prevaru',
      nije_motocikl: 'Oglašavanje nečega što nije motocikl',
      ostalo: 'Ostalo'
    };
async function prijava(oglasId) {
    loading.value=true
   // Resetuje poruku o grešci
  try {
    const data = await $fetch(`${config.public.apiUrl}/api/prijaviOglas/`, {
      method: 'POST',
      headers:{
        Authorization:`Bearer ${localStorage.getItem('access_token')}`
      },
     
    body:{
        motocikl:oglasId,
        razlog:odabraniRazlog.value,
        opis:description.value
    }
    })
   
    poruka.value=data.message
    loading.value=false
    successPrijava.value=true
    
    setTimeout(() => {
        successPrijava.value=false
        useMainStore().isPrijavaModalOpen=false
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
    <SuccessAlert v-if="successPrijava" :message="poruka"/>
    <!-- Overlay -->
    <div class="fixed top-0 left-0 p-6 w-full h-full z-40 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <!-- Modal -->
      <div  class="md:w-1/3 rounded-md bg-gray-300 p-8 flex border-2 border-yellow-500 flex-wrap">
        <h1 class="text-xl text-gray-700 w-full text-center">Prijava oglasa</h1>

        
        
        <div class="w-full my-4">
        <label class="block text-sm font-medium text-gray-700">Zašto želite da prijavite ovaj oglas?</label>
        <div v-for="(label, value) in razlozi" :key="value" class="flex items-center mt-1">
          <input
            type="radio"
            :id="value"
            :value="value"
            v-model="odabraniRazlog"
            class="mr-2"
          />
          <label :for="value" class="text-gray-700"> *{{ label }}</label>
        </div>
      </div>

      <!-- Opis polje, vidljivo samo ako je odabrano "Ostalo" -->
      <div  class="w-full mb-4">
        <label for="opis" class="block text-sm font-medium text-gray-700">Opis:</label>
        <textarea
          id="opis"
          v-model="description"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          rows="3"
        ></textarea>
      </div>
      <div class="w-full flex justify-start mt-4">
        <button class="p-2 rounded-md bg-transparent text-gray-700 cursor-pointer border-2 border-yellow-500 mx-2" @click="useMainStore().isPrijavaModalOpen=false">Otkaži</button>
        <button class="p-2 rounded-md  cursor-pointer  bg-yellow-500" @click="prijava(useMainStore().selectedMotocikl.id)">Pošalji Prijavu</button>

     </div>
      </div>

      <!-- Model -->
      

     
     
    
    </div>
  </template>