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
<section class="md:p-10 py-6 w-full  bg-[url('~/assets/bacground1.jpg')] bg-cover">
  <form @submit.prevent="signUp()" class="mx-auto w-[80%] md:w-1/3 p-8 bg-slate-800 flex flex-wrap justify-start">
    <h2 class="text-white text-lg m-2 w-full">Kreirajte nalog</h2>
    <p class="text-yellow-500 text-xs">*sva polja obavezna!</p>
    <p v-if="errorMessage" class="text-sm w-full text-red-500">{{ errorMessage }}</p>
    <input class="m-2 w-full rounded-md p-1 text-black" required type="text" maxlength="20" v-model="ime" placeholder="Vaše ime"/>
    <input class="m-2 w-full rounded-md p-1 text-black" required type="email" v-model="email" placeholder="E-mail"/>
    <input class="m-2 w-full rounded-md p-1 text-black" required type="password" v-model="password" placeholder="Lozinka"/>
    <input class="m-2 w-full rounded-md p-1 text-black" required type="text" maxlength="20" v-model="telefon" placeholder="Telefon"/>
    <div class="flex items-center mb-4">
        <input type="checkbox" id="terms" v-model="acceptTerms" class="mr-2"/>
        <label for="terms" class="text-white">Prihvatam <NuxtLink to="/uslovi-koriscenja" class="text-blue-400 underline cursor-pointer">uslove korišćenja</NuxtLink></label>
      </div>
    <button class="m-2 bg-transparent border-2 w-full border-yellow-500 p-2 cursor-pointer hover:bg-yellow-500 text-white" type="submit">Registracija</button>
    
    <p class="text-sm w-full text-white">Već imate nalog?<NuxtLink class="text-yellow-500" to="/login">Ulogujte se</NuxtLink></p>
  </form>
</section>
</template>
