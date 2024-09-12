<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRuntimeConfig } from '#app'
import { useMainStore } from '~/stores/main'
const email = ref("")
const password = ref("")
const ime=ref("")
const telefon=ref("")
const acceptTerms=ref(false)
const errorMessage = ref("")
const router = useRouter()
const config = useRuntimeConfig()
const loading=ref(false)
const registerSuccess=ref(false)
console.log(useMainStore().currentUser)
async function signUp() {
  errorMessage.value = "" 
  if(acceptTerms.value){

  
  loading.value=true // Resetuje poruku o grešci
  try {
    const data = await $fetch(`${config.public.apiUrl}/api/auth/signup`, {
      method: 'POST',
      body: {
        name:ime.value,
        email: email.value,
        password: password.value,
        telefon: telefon.value,
        confirmed_email:false
      }
    })
    registerSuccess.value=true
    
    
    loading.value=false
   
    
    setTimeout(() => {
      
       navigateTo(`/login`)
    }, 2500)
     // Preusmerava na početnu stranicu
  } catch (error) {
    if (error.response.status === 400) {
      errorMessage.value = "Korisnik sa datim e-mail-om već postoji"
      loading.value=false
    } else {
      errorMessage.value = "Došlo je do greške. Pokušajte ponovo."
      loading.value=false
    }
  }
}else{
  errorMessage.value = "Morate prihvatiti uslove korišćenja"
}
}
</script>

<template>
<Loading v-if="loading"/>
<SuccessAlert v-if="registerSuccess" :message="`E-mail potvrde poslat na ${email}!`"/>

<div class="h-full relative flex items-center justify-center bg-[url(~/assets/background3.jpg)] bg-center py-2 px-4 sm:px-6 lg:px-8">
  <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-0"></div>

  <div class="relative max-w-md w-full space-y-8">
    
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-white">
          Kreirajte nalog
        </h2>
        <p class="mt-2 text-center text-sm text-yellow-500">
          *sva polja obavezna!
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="signUp">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxlength="20"
              v-model="ime"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
              placeholder="Vaše ime"
            />
          </div>
          <div>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="email"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
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
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
              placeholder="Lozinka"
            />
          </div>
          <div>
            <input
              id="phone"
              name="phone"
              type="text"
              required
              maxlength="20"
              v-model="telefon"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
              placeholder="Telefon"
            />
          </div>
        </div>

        <div class="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            v-model="acceptTerms"
            class="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
          />
          <label for="terms" class="ml-2 block text-sm text-gray-300">
            Prihvatam
            <NuxtLink to="/uslovi-koriscenja" class="text-yellow-500 hover:text-yellow-400">
              uslove korišćenja
            </NuxtLink>
          </label>
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
            Registracija
          </button>
        </div>
      </form>
      <div class="flex flex-wrap text-white">
        
        <p class="w-full"><span class="mx-1 text-green-500"><i class="bi bi-check2-circle"></i></span>Jednostavno postavljanje oglasa</p>
        <p class="w-full"><span class="mx-1 text-green-500"><i class="bi bi-check2-circle"></i></span>Brza i laka registracija</p>
        <p class="w-full"><span class="mx-1 text-green-500"><i class="bi bi-check2-circle"></i></span>Mogućnost upravljanja oglasima</p>

      </div>
      <p class="mt-2 text-center text-sm text-gray-300">
        Već imate nalog?
        <NuxtLink to="/login" class="font-medium text-yellow-500 hover:text-yellow-400">
          Ulogujte se
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
