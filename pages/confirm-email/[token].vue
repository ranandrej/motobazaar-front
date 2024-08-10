
<script setup>
import { useRoute } from '#app';
import { useRuntimeConfig } from '#app'


const config=useRuntimeConfig()
const newPassword=ref("")
const errorMessage=ref("")
const changeSuccess=ref(false)
const loading = ref(false)
const confirmEmail=async()=>{
    const route = useRoute()
    const { token } = route.params
    
    
    
    try{

    
    const data = await $fetch(`${config.public.apiUrl}/api/confirmEmail/${token}/`, {
      method: 'POST',
     
      
     
    })
    loading.value=false
    changeSuccess.value=true
    setTimeout(() => {
        window.location.href="/login"
    }, 2000);
  }catch(error){
    loading.value=false
      errorMessage.value="Link za potvrdu je istekao"
      setTimeout(() => {
        window.location.href="/login"
      }, 2000);
      
    
  }
}




</script>

<template>
<Loading v-if="loading"/>
<SuccessAlert v-if="changeSuccess" :message="'Uspesno potvrdjen e-mail'"/>
<section class="p-10 w-full bg-[url('~/assets/bacground1.jpg')] bg-cover">
  <div class="mx-auto w-[80%] md:w-1/3 p-8 bg-slate-800 flex flex-wrap justify-start">
    <h2 class="text-white text-center text-lg m-2 w-full">Potvrdite email</h2>
    <p v-if="errorMessage" class="text-sm w-full text-red-500">{{ errorMessage }}</p>
    <button class="m-2 bg-transparent border-2 w-full border-yellow-500 rounded-md p-2 cursor-pointer hover:bg-yellow-500 text-white" @click="confirmEmail()">Potvrdi</button>
    
    
  </div>
  
</section>
</template>