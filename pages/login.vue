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
<section class="md:p-10 py-6 w-full bg-[url('~/assets/bacground1.jpg')] bg-cover">
  <div class="mx-auto w-[80%] md:w-1/3 p-8 bg-slate-800 flex flex-wrap justify-start">
    <h2 class="text-white text-lg m-2 w-full">Ulogujte se</h2>
    <p v-if="errorMessage" class="text-sm w-full text-red-500">{{ errorMessage }}</p>
    <input class="m-2 w-full rounded-md p-1 text-black" type="email" v-model="email" placeholder="E-mail"/>
    <input class="m-2 w-full rounded-md p-1 text-black" type="password" v-model="password" placeholder="Lozinka"/>
    <button class="m-2 bg-transparent border-2 border-yellow-500  p-2 cursor-pointer hover:bg-yellow-500 text-white" @click="logIn()">Prijava</button>
    
    <p class="text-sm w-full text-white">Nemate nalog?<NuxtLink class="text-yellow-500" to="/register">Registrujte se</NuxtLink></p>
    <p v-if="showReset" class="text-sm w-full text-white">Zaboravili ste lozinku?<button class="text-yellow-500 cursor-pointer bg-transparent" @click="resetSifra">Kliknite za reset</button></p>

  </div>
  
</section>

</template>
