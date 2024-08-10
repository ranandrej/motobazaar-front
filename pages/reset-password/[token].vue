
<script setup>
import { useRoute } from '#app';
import { useRuntimeConfig } from '#app'


const config=useRuntimeConfig()
const newPassword=ref("")
const errorMessage=ref("")
const changeSuccess=ref(false)
const loading = ref(false)
const changePassword=async()=>{
    const route = useRoute()
    const { token } = route.params
    
    if(newPassword.value.length>5){
    loading.value=true
    
    try{

    
    const data = await $fetch(`${config.public.apiUrl}/api/reset-password/${token}/`, {
      method: 'POST',
     body:{
        password:newPassword.value,
        token:token
     }
      
     
    })
    loading.value=false
    changeSuccess.value=true
    setTimeout(() => {
        window.location.href="/login"
    }, 2000);
  }catch(error){
    loading.value=false
      errorMessage.value="Link za promenu je istekao"
      setTimeout(() => {
        window.location.href="/login"
      }, 6000);
      
    
  }
}else{
    errorMessage.value="Lozinka mora imati minimum 5 karaktera"
  }
}




</script>

<template>
<Loading v-if="loading"/>
<SuccessAlert v-if="changeSuccess" :message="'Uspesno promenjena lozinka'"/>
<section class="p-10 w-full bg-[url('~/assets/bacground1.jpg')] bg-cover">
  <div class="mx-auto w-[80%] md:w-1/3 p-8 bg-slate-800 flex flex-wrap justify-start">
    <h2 class="text-white text-lg m-2 w-full">Unesite novu lozinku</h2>
    <p v-if="errorMessage" class="text-sm w-full text-red-500">{{ errorMessage }}</p>
    <input class="m-2 w-full rounded-md p-1 text-black" type="password" v-model="newPassword" placeholder="Nova Lozinka"/>
    <button class="m-2 bg-transparent border-2 border-yellow-500 rounded-md p-2 cursor-pointer hover:bg-yellow-500 text-white" @click="changePassword()">Potvrdi</button>
    
    
  </div>
  
</section>
</template>