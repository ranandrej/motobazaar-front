<script setup>
import { useMainStore } from '~/stores/main'
import { useRuntimeConfig } from '#app'
import { useRouter } from 'vue-router'


const config = useRuntimeConfig()
const router = useRouter()
const loading=ref(false)
const removeSuccess=ref(false)
const uklanjanje = async (motociklId) => {
    loading.value=true
    try {
        const response = await $fetch(`${config.public.apiUrl}/api/omiljeniOglasi/ukloni/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: motociklId }),
        });
        loading.value=false
        removeSuccess.value=true
        setTimeout(() => {
            removeSuccess.value=false
            window.location.reload()
        }, 2000);
        useMainStore().isRemoveModalOpen=false
        
        if (response.message) {
            // Održavajte uspeh poruke ili ažurirajte UI
            console.log(response.message);
        }
    } catch (error) {
        if (error.status === 401) {
            window.location.href = '/login';
        } else {
            // Rukovanje greškama
            console.error('Greška:', error);
        }
    }
}

</script>
<template>
    <SuccessAlert v-if="removeSuccess" :message="'Oglas uklonjen iz omiljenih'"/>
    <!-- Overlay -->
    <div class="fixed top-0 left-0 w-full h-full z-40 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <!-- Modal -->
      <Loading v-if="loading"/>
      <div class="md:w-1/3 rounded-md bg-slate-800 p-8">
        <h2 class="w-full text-white text-lg m-2">Da li sigurno želite da uklonite ovaj oglas iz omiljenih?</h2>
        <div class="w-full flex justify-center items-center mt-4">
          <button class="bg-red-500 cursor-pointer p-2 rounded-md text-white mx-2" @click="uklanjanje(useMainStore().selectedMotocikl.id)">Da</button>
          <button @click="useMainStore().isRemoveModalOpen=false" class="bg-transparent border border-yellow-500 cursor-pointer p-2 rounded-md text-white mx-2">Otkaži</button>
        </div>
      </div>
    </div>
  </template>