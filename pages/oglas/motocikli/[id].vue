<script setup>
import { onMounted,ref } from 'vue';
import { useRoute } from '#app';

import { useRuntimeConfig } from '#app'
import AOS from 'aos';
import 'aos/dist/aos.css';
const config=useRuntimeConfig()
const oglas = ref({})
const prodavac=ref({})
const loading = ref(false)
const telefon = ref("klikni za prikaz")
const mainImagePath=ref("")
const omiljeniSuccess=ref(false)
const poruka=ref("")
const isLikeDisabled = ref(false); // Praćenje da li je dugme onemogućeno
const currentIndex=ref(0)
const lastScrollTop = ref(0);
const isScrollingDown = ref(false);
onMounted(async()=>{
   
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    // Check if scrolling down
    if (scrollTop > lastScrollTop.value) {
      isScrollingDown.value = true;
    } else {
      isScrollingDown.value = false;
    }

    lastScrollTop.value = scrollTop;
  });
 
    const route = useRoute()
    const { id } = route.params
    loading.value=true
    const data = await $fetch(`${config.public.apiUrl}/api/getMotocikl/?id=${id}`, {
      method: 'GET',
     
     
    })
    const views = await $fetch(`${config.public.apiUrl}/api/updateViews/`, {
      method: 'POST',
     body:{
        id:id
     }
     
    })
    loading.value=false
    
    oglas.value=data
    oglas.value.cena=oglas.value.cena.toLocaleString('de-DE')
    const user = await $fetch(`${config.public.apiUrl}/api/getUser/?id=${data.user}`, {
      method: 'GET',
     
     
    })
    prodavac.value=user
    mainImagePath.value=oglas.value.slikaPaths[0]
    currentIndex.value=0
})
const changeMainImage=(img,index)=>{
    mainImagePath.value=img
    currentIndex.value=index
}
const dodajuOmiljene=async()=>{
    loading.value=true
    
    try{
        const data = await $fetch(`${config.public.apiUrl}/api/dodajUOmiljene/`,{
        method:'POST',
        headers:{
            Authorization:`Bearer ${localStorage.getItem('access_token')}`
        },
        body:{
            id:oglas.value.id
        }
       
    })
    isLikeDisabled.value=true
    poruka.value=data.message
    loading.value=false
    omiljeniSuccess.value=true
    if(data.message == 'Motocikl je dodat u omiljene.'){
        oglas.value.broj_omiljenih+=1
    }
    setTimeout(() => {
        omiljeniSuccess.value=false
    }, 3000);
    }catch(error){
        if(error.status == 401){
            window.location.href='/login'
        }
    }
    

}
const showPrijavaModal=(motocikl)=>{
  useMainStore().selectedMotocikl=motocikl
  useMainStore().isPrijavaModalOpen=true
}
const motociklUrl = useRequestURL().href
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(motociklUrl)}`;
  const viberShareUrl = `viber://forward?text=${encodeURIComponent(motociklUrl)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(motociklUrl)}`;

  const changeImage=(direction)=>{
    if(currentIndex.value>0 && direction==='prev'){
        mainImagePath.value=oglas.value.slikaPaths[currentIndex.value-1]
        currentIndex.value-=1

    }else{
       if(currentIndex.value<oglas.value.slikaPaths.length-1){
        mainImagePath.value=oglas.value.slikaPaths[currentIndex.value+1]
        currentIndex.value+=1
       }
    }
  }
</script>

<template>
<Loading v-if="loading"/>
<SuccessAlert v-if="omiljeniSuccess" :message="poruka"/>
<PrijavaOglasaModal v-if="useMainStore().isPrijavaModalOpen"/>
<div class="w-full flex flex-wrap min-h-screen bg-gray-300 md:p-6 p-1">
  <Baner class="mb-3" :text1="'Posetite naš shop'" :link="'https://motomaxshop.rs/'" :slika="'https://ejcrowqjfiedgnebyxmr.supabase.co/storage/v1/object/public/Baneri/baner%20br1%20final.jpg?t=2024-09-11T16%3A23%3A11.037Z'"/>

    <hr>
    <div class="flex w-full p-3">
        <NuxtLink class="text-blue-700 flex items-center" to="/"><i class="bi bi-house"></i> Početna/Oglasi/</NuxtLink>
        <NuxtLink class="text-blue-700 " to="#">{{oglas.marka}} {{ oglas.model }}/</NuxtLink>
        
    </div>
    <hr>
    <div class="flex flex-wrap w-full md:w-[90%] md:p-4 p-0 mx-auto">
        <h1 class="w-full mb-2 px-2 text-3xl font-semibold">{{ oglas.marka }} {{ oglas.model }} <span class="ml-1 font-bold text-sm text-gray-600">{{ oglas.godiste }}.god.</span></h1>
        <div class="md:w-1/2 w-full">
            <div class="flex  relative">
                <button @click="changeImage('prev')" class="bg-transparent text-yellow-500 font-thin  z-49  md:top-1/2 top-1/2 absolute cursor-pointer"> <i class="bi bi-chevron-left md:text-5xl text-3xl"></i> </button>
                <a class="w-full" :href="mainImagePath"><img :src="mainImagePath" alt="" class="w-full cursor-pointer sm:max-h-96 mr-5"></a>
                <button @click="changeImage('next')" class="bg-transparent text-yellow-500 font-thin right-0 z-49  md:top-1/2 top-1/2 absolute cursor-pointer"> <i class="bi bi-chevron-right md:text-5xl text-3xl"></i> </button>

            </div>
            <div class="flex p-2 w-full justify-start">
               
                <img  v-for="path,index in oglas.slikaPaths" :src="path" alt="" @click="changeMainImage(path,index)" class="md:w-1/4 max-h-16 md:max-h-28 mx-2 rounded-md cursor-pointer">
            </div>
            <div class="flex w-full flex-wrap justify-start">
                <button :disabled="isLikeDisabled" @click="dodajuOmiljene()" class="flex text-sm md:text-lg bg-transparent text-gray-500 items-center md:w-1/3 m-1"><i :class="isLikeDisabled ? 'text-red-500' : 'text-gray-500'" class="bi bi-heart-fill md:text-xl mx-1 text-lg" ></i>{{ oglas.broj_omiljenih }} Dodaj u omiljene</button>
                <button @click="showPrijavaModal(oglas)" class="flex bg-transparent text-sm md:text-lg text-gray-500 items-center md:w-1/3 m-1"><i class="bi bi-flag-fill text-lg mx-1"></i> Prijavi oglas</button>
                <p class="flex items-center w-full text-sm m-1 text-gray-500"><i class="bi bi-eye-fill mx-1 text-lg"></i> {{ oglas.pregledi }} pregleda</p>

            </div>


            <a class="flex justify-center mt-2" href="https://yamahabarel.com/"><img src="https://ejcrowqjfiedgnebyxmr.supabase.co/storage/v1/object/public/Baneri/Baner1.png?t=2024-09-12T09%3A54%3A13.286Z" alt=""></a>

                <div class="bg-white text-gray-800 flex flex-wrap p-6 drop-shadow-lg mt-5 rounded-md">
                    <h1 class="w-full text-xl mb-6 font-semibold">Opšte informacije</h1>
                    <hr class="text-black">
                <div class="flex justify-start text-lg flex-wrap  w-full">

                    <div class="mx-2 md:p-4 space-y-1">
                        <p class="w-full font-semibold"><span class="font-normal">Naziv: </span>{{ oglas.marka }} {{ oglas.model }}</p>
                        <hr>
                        <p class="w-full font-semibold"><span class="font-normal">Godište: </span>{{ oglas.godiste }}</p>
                       <hr>
                        <p class="w-full font-semibold"><span class="font-normal">Kilometraža: </span>{{ oglas.kilometraza}} km</p>
                        <hr>
                        <p class="w-full font-semibold"><span class="font-normal">Mesto: </span>{{ oglas.mesto }}</p>
                        <hr>
                        <p class="w-full font-semibold" v-if="!oglas.registrovan"><span class="font-normal">Registrovan:</span> Ne</p>

                        <p class="w-full font-semibold" v-if="oglas.registrovan"><span class="font-normal">Registrovan:</span> Da</p>
                    </div>
                    <div class="mx-2 md:p-4 space-y-1">
                        <p class="w-full font-semibold"><span class="font-normal">Kubikaža: </span>{{ oglas.kubikaza }} cm3</p>
                        <hr>
                        <p class="w-full font-semibold"><span class="font-normal">Snaga Motora: </span>{{ oglas.snaga }} kW</p>
                        <hr>
                        <p class="w-full font-semibold" v-if="!oglas.prvi_vlasnik"><span class="font-normal">Prvi vlasnik:</span> Ne</p>

                        <p class="w-full font-semibold" v-if="oglas.prvi_vlasnik"><span class="font-normal">Prvi vlasnik:</span> Da</p>
                        <hr>
                        <p class="w-full font-semibold"><span class="font-normal">Dodatna oprema: </span>{{ oglas.dodatna_oprema}}</p>
                        <hr>
                       
                       
                    </div>
                
                </div>
            </div>
            <div class="bg-white flex flex-wrap p-6 drop-shadow-lg mt-5 rounded-md">
                <h1 class="w-full text-xl mb-6 font-semibold">Opis</h1>
               
                <hr>
                 <p class="font-thin">{{ oglas.opis }}</p>
                
            </div>

        </div>
        <div class="p-4 md:w-1/2">
            <h2 class="text-2xl  font-bold">Cena:{{ oglas.cena}}€ <span class="text-sm w-full text-yellow-500">+dodatni troškovi kupovine</span></h2>
            <div class="flex flex-wrap w-full rounded-md drop-shadow border-2 border-yellow-500 p-4">
                <h2 class="font-semibold w-full flex items-center mb-4 text-lg"><i class="bi bi-person-fill mx-1 "></i> Podaci o prodavcu</h2>
                <hr class="text-black">
                <p class="w-full mb-1">Ime:{{ prodavac.name }}</p>
                <p class="w-full mb-1">E-mail:{{ prodavac.email }}</p>
                <button @click="telefon=prodavac.telefon" class="w-full flex justify-start bg-transparent mb-1">Tel:<span  class="text-blue-500 cursor-default"> {{ telefon }}</span></button>

            </div>
            <div class="download-container w-full text-normal md:p-4 py-4">
            <a href="https://ejcrowqjfiedgnebyxmr.supabase.co/storage/v1/object/public/Motocikli/folder/kupoprodajni_ugovor.pdf?t=2024-07-26T14%3A34%3A10.433Z" target="_blank" download="" class="download-button p-2 md:w-[80%] hover:text-blue-500 flex items-center rounded-md border-2 border-gray-500">
                <i class="bi bi-file-earmark-pdf-fill mx-1 text-red-700"></i> Preuzmi PDF Kupoprodajni ugovor
            </a>
</div>
<h4 class=" mt-3">Podeli ovaj oglas:</h4>
        <div class="mt-2 flex  md:space-x-2 space-x-1 w-full">
      
          <a :href="whatsappShareUrl" target="_blank" class="flex items-center md:px-4 px-2 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600">
            <span class="mr-2"><i class="bi bi-whatsapp"></i></span>
            <p>Whatsapp</p>
      
          </a>
          <a :href="viberShareUrl" target="_blank" class="flex items-center md:px-4 px-2 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-blue-700">
            <span class="mr-2"><i class="bi bi-telephone-fill"></i></span>
            <p>Viber</p>
          </a>
          <a :href="facebookShareUrl" target="_blank" class="flex items-center md:px-4 px-2 py-2 bg-blue-800 text-white rounded-lg shadow hover:bg-blue-900">
            <span class="mr-2"><i class="bi bi-facebook"></i></span>
            <p>Facebook</p>
          </a>
        </div>
        <div class="w-full md:p-0 p-6">
          <Baner class="my-3"  :link="'https://motobikeshop.rs/'" :slika="'https://ejcrowqjfiedgnebyxmr.supabase.co/storage/v1/object/public/Baneri/banner3.jpg?t=2024-09-11T16%3A13%3A47.975Z'"/>
        </div>

        </div>

    </div>


</div>
<div class="relative">
    <!-- Ostatak stranice -->

    <!-- Sticky dugme -->
    <div class="fixed bottom-0 left-0 w-full p-4 bg-gray-300 md:hidden transition-transform duration-1000 ease-in-out" :class="{ 'translate-y-full': isScrollingDown }"
   >
         <a
        :href="'tel:' + prodavac.telefon"
        class="flex items-center justify-center w-full text-gray-500 bg-yellow-500 font-bold py-3 "
      >
      <i class="bi bi-telephone-fill mx-1"></i> Pozovi oglašivača
      </a>
      <a
        :href="'sms:' + prodavac.telefon"
        class="flex items-center justify-center w-full mt-2 text-gray-500 font-bold py-3 bg-gray-200"
      >
      <i class="bi bi-chat-dots-fill mx-1"></i> Pošalji poruku
      </a>
    </div>
  </div>

</template>

<style scoped>
.translate-y-full {
  transform: translateY(100%);
}
.fade-in {
  opacity: 0;
  animation: fadeIn 0.5s forwards; /* 0.5s trajanje animacije */
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style>