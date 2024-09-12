<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRuntimeConfig } from '#app'
import { useMainStore } from '~/stores/main'
const email = ref("")
const password = ref("")
const errorMessage = ref("")
const router = useRouter()
const loading=ref(false)
const config = useRuntimeConfig()
const resetSifraSuccess=ref(false)
const showReset=ref(false)
async function logIn() {
  errorMessage.value = ""
  loading.value=true  // Resetuje poruku o grešci
  try {
    const data = await $fetch(`${config.public.apiUrl}/api/auth/login`, {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    })
    useMainStore().accessToken=data.access_token
    useMainStore().currentUser=data.user 
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('user', JSON.stringify(data.user))
    
    
    loading.value=false
    router.push('/')
     // Preusmerava na početnu stranicu
  } catch (error) {
    loading.value=false

if (error.data) { // Check if error has data
  errorMessage.value = error.data.error || 'Greška pri prijavi.'
  showReset.value=true
} else {
  errorMessage.value = 'Greška pri prijavi.'
}

  }
}
const resetSifra=async()=>{
  errorMessage.value=""
  loading.value=true  // Resetuje poruku o grešci
  try {
    const data = await $fetch(`${config.public.apiUrl}/api/reset-password-email/`, {
      method: 'POST',
      body: {
        email: email.value,
        
      }
    })
    resetSifraSuccess.value=true
    loading.value=false
    setTimeout(() => {
      router.push('/')
    }, 2000);
    
     // Preusmerava na početnu stranicu
  } catch (error) {
    loading.value=false
    if (error.status === 400) {
      errorMessage.value = "Unesite E-mail za reset lozinke"
    
  }

  }
}
</script>

<template>
<Loading v-if="loading"/>
<SuccessAlert v-if="resetSifraSuccess" :message="`Link sa promenu sifre poslat na e-mail ${email}`"/>
<section class="h-full flex items-center justify-center bg-[url('~/assets/bacground1.jpg')] bg-cover py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-slate-800 p-8 rounded-lg shadow-xl">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-white">
          Ulogujte se
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="logIn">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="email"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
              placeholder="E-mail"
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="password"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
              placeholder="Lozinka"
            />
          </div>
        </div>

        <div v-if="errorMessage" class="flex items-center text-red-500 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Prijava
          </button>
        </div>
      </form>

      <div class="flex items-center justify-between">
        <div class="text-sm">
          <p class="text-gray-300">
            Nemate nalog?
            <NuxtLink to="/register" class="font-medium text-yellow-500 hover:text-yellow-400">
              Registrujte se
            </NuxtLink>
          </p>
        </div>
        <div class="text-sm">
          <button 
            v-if="showReset"
            @click="resetSifra"
            class="font-medium text-yellow-500 hover:text-yellow-400"
          >
            Zaboravili ste lozinku?
          </button>
        </div>
      </div>
    </div>
  </section>

</template>
