<script setup>
import { onMounted } from 'vue';
import { useRoute } from '#app';
import { useRuntimeConfig } from '#app'


const config=useRuntimeConfig()
const user=ref({})
const oglasi = ref([])
const omiljeniOglasi = ref([])
const staraSifra=ref("")
const novaSifra=ref("")
const loading = ref(false)
const succesChange=ref(false)
const poruka=ref("")
const errorMessage=ref("")
onMounted(async()=>{
    const route = useRoute()
    const { id } = route.params
    loading.value=true
    try{

    
    const data = await $fetch(`${config.public.apiUrl}/api/getUser/?id=${id}`, {
      method: 'GET',
      headers:{
        Authorization:`Bearer ${localStorage.getItem('access_token')}`
      }
      
     
    })
    
    user.value=data
  }catch(error){
    if(error.status==401){
      loading.value=false
      window.location.href="/login"
    }
  }
    try{
      const oglasiData = await $fetch(`${config.public.apiUrl}/api/getMotocikliByUser/?id=${id}`,{
        method: 'GET',
        headers:{
        Authorization:`Bearer ${localStorage.getItem('access_token')}`
      },
    })
    loading.value=false
    console.log(oglasiData)
    oglasi.value=oglasiData

    }catch(error){
      if(error.status==401){
      loading.value=false
      window.location.href="/login"
    }
    }
    try{
      const favoriteOglasi = await $fetch(`${config.public.apiUrl}/api/omiljeniOglasi/`,{
        method: 'GET',
        headers:{
        Authorization:`Bearer ${localStorage.getItem('access_token')}`
      },
    })
    loading.value=false
    
    omiljeniOglasi.value=favoriteOglasi

    }catch(error){
      if(error.status==401){
      loading.value=false
      window.location.href="/login"
    }
    }
    
})
   

const showDeleteModal=(motocikl)=>{
    useMainStore().selectedMotocikl=motocikl
    useMainStore().isDeleteModalOpen=true
}
const showRemoveModal=(motocikl)=>{
    useMainStore().selectedMotocikl=motocikl
    useMainStore().isRemoveModalOpen=true
}
const showUpdateModal=(motocikl)=>{
  useMainStore().selectedMotocikl=motocikl
  useMainStore().isUpdateModalOpen=true
}
const changePassword=async()=>{
  errorMessage.value=""
  loading.value=true
  try{
    const response = await $fetch(`${config.public.apiUrl}/api/changePassword/`,{
      method:'PUT',
      headers:{
        Authorization:`Bearer ${localStorage.getItem('access_token')}`
      },
      body:{
        old_password:staraSifra.value,
        new_password:novaSifra.value
      }

    })
    poruka.value=response.message
    loading.value=false
    succesChange.value=true
    
    setTimeout(() => {
      succesChange.value=false
      window.location.href="/login"
    }, 2000);

}catch(error){
 if(error.status==400){
  errorMessage.value = error.response?.data?.message || 'Lozinke se ne podudaraju';

  loading.value=false
 }else{
  errorMessage.value='Doslo je do greske'
  loading.value=false
 }
}
}
</script>
<template>
  <Loading v-if="loading"/>
  <SuccessAlert v-if="succesChange" :message="poruka"/>
        <div class="w-full flex-wrap flex p-4 justify-start bg-[url('~/assets/background3.jpg')] bg-center">
          <h2 class="text-xl flex w-full px-6 py-2 mt-3 font-thin text-white">Informacije <button @click="useMainStore().isUpdateUserModalOpen=true" class="bg-transparent mx-5 text-sm cursor-pointer"><Icon name="ic:baseline-edit"/>Izmeni</button></h2>

          <div class="md:w-1/3 bg-slate-700 bg-opacity-30 border-2 border-yellow-500 p-6 text-white rounded-md m-3 flex flex-wrap">
            <h2 class="w-full text-xl font-semibold">Podaci o korisniku</h2>
              <p class="w-full flex items-center  my-2"><Icon name="ic:outline-email" class="text-yellow-500 mr-1"/>E-mail: {{ user.email }}</p>
              <p class="w-full flex items-center  my-2"><Icon name="ic:baseline-account-circle" class="text-yellow-500 mr-1"/>Ime: {{ user.name }}</p>
              <p class="w-full flex items-center my-2"><Icon name="ic:baseline-phone-android" class="text-yellow-500 mr-1"/>Tel: {{ user.telefon }}</p>
          </div>
          <form @submit.prevent="changePassword()" class="promena border-2 border-yellow-500 bg-opacity-50 p-4 m-4 text-white bg-slate-700 rounded-md shadow-lg flex flex-wrap">
            <h2 class="w-full font-semibold text-xl flex items-center mx-2"><Icon class="mr-1" name="mdi:key-variant"></Icon>Promena lozinke</h2>
            <label class="text-red-500 font-semibold m-3" v-if="errorMessage!=''">{{ errorMessage }}</label>
            <input  type="password" v-model="staraSifra" required placeholder="Unesite staru lozinku" class="text-black p-1 rounded-md m-2 w-full">
            <input type="password" v-model="novaSifra" required placeholder="Unesite novu lozinku" class=" text-black p-1 rounded-md m-2 w-full">
            <button type="submit" class="bg-transparent text-sm  bg-yellow-500 p-1 px-2 mx-2">Promeni lozinku</button>

          </form>
        </div>
    <div class="w-full p-8 bg-gray-300">
      <DeleteModal v-if="useMainStore().isDeleteModalOpen"/>
      <RemoveModal v-if="useMainStore().isRemoveModalOpen"/>
      <UpdateModal v-if="useMainStore().isUpdateModalOpen"/>
      <UpdateUserModal v-if="useMainStore().isUpdateUserModalOpen"/>
       
        <div class="flex flex-wrap justify-start md:p-5 p-2 my-6" v-if="oglasi.length>0">
          <h2 class="text-xl w-full font-thin text-black">Vaši Oglasi</h2>
          <div v-for="oglas in oglasi" :key="oglas.id" class="md:w-[80%] my-4 flex rounded-md bg-gray-200 justify-start max-h-56 md:max-h-64">
            <div class="slika h-full m-0 md:w-1/3 w-[45%]">
              <img :src="oglas.slikaPaths[0]" class="h-full w-full">

            </div>
            <div class="w-2/3 md:p-4 p-2 h-1/2 flex flex-wrap justify-start">
              <div class="w-full flex justify-between text-black md:text-xl">
                <p>{{ oglas.marka }} {{oglas.model}}</p>
                <div class="flex justify-start text-sm text-gray-600">
                 <button class="mx-2 bg-transparent cursor-pointer" @click="showUpdateModal(oglas)"><Icon name="ic:baseline-edit"/> Izmeni</button>
                 <button class="mx-1 bg-transparent cursor-pointer" @click="showDeleteModal(oglas)"><Icon name="ic:baseline-delete"/> Obrisi</button>
                </div>
              </div>
              <p class="w-full text-black font-thin">{{ oglas.godiste }}.god.</p>
              <p class="w-full text-black font-thin">{{ oglas.kilometraza }} km</p>
              <p class="w-full flex items-center text-black font-thin"><Icon class="text-md mr-1 mt-1" name="material-symbols:visibility-outline"/> {{ oglas.pregledi }} pregleda</p>
              <p class="w-full  font-thin flex items-center mt-2 text-gray-600"><Icon name="ic:baseline-location-on"/> {{ oglas.mesto }}</p>
              
              <p class="w-full md:mt-8 mt-2 text-black font-bold">{{ oglas.cena.toLocaleString('de-DE')}}€</p>

            </div>

          </div>

          </div>
          <div v-else class="w-full justify-start p-3">
            <h2 class="text-xl mr-2 mb-3 text-black">Postavite Vaš prvi oglas</h2>
            <NuxtLink to="/noviOglas"
            class="bg-transparent border-2 hover:bg-yellow-500 border-yellow-500 mx-1 text-gray-700 cursor-pointer p-1 mt-4"
            v-if="Object.keys(useMainStore().currentUser).length > 0"
          >
            Postavite Oglas
          </NuxtLink>

          </div>
          <div class="flex flex-wrap justify-start md:p-5 p-2 my-6" v-if="omiljeniOglasi.length>0">
          <h2 class="text-xl w-full font-thin text-black">Oglasi koje ste oznacili kao "omiljeni"</h2>
          <div  v-for="oglas in omiljeniOglasi" :key="oglas.id" class="md:w-[80%] my-4 flex rounded-md bg-gray-200 justify-start max-h-56 md:max-h-64">
            <div class="slika h-full m-0 md:w-1/3 w-[45%]">
              <img :src="oglas.slikaPaths[0]" class="h-full w-full">

            </div>
            <div class="w-2/3 md:p-4 p-2 h-1/2 flex flex-wrap justify-start">
              <div class="w-full flex justify-between text-black md:text-xl">
                <NuxtLink class="hover:text-blue-400" :to="`/oglas/motocikli/${oglas.id}`">{{ oglas.marka }} {{oglas.model}}</NuxtLink>
                <div class="flex justify-start text-sm text-gray-600">
                 <button class="mx-1 bg-transparent cursor-pointer" @click="showRemoveModal(oglas)"><Icon name="ic:baseline-delete"/> Ukloni</button>
                </div>
              </div>
              <p class="w-full text-black font-thin">{{ oglas.godiste }}.god.</p>
              <p class="w-full text-black font-thin">{{ oglas.kilometraza }} km</p>
              <p class="w-full  font-thin flex items-center mt-2 text-gray-600"><Icon name="ic:baseline-location-on"/> {{ oglas.mesto }}</p>
              
              <p class="w-full md:mt-8 mt-2 text-black font-bold">{{ oglas.cena.toLocaleString('de-DE')}}€</p>

            </div>

          </div>

          </div>
    </div>
</template>