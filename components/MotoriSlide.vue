<script setup>
import { ref,defineProps } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

import { Navigation } from 'swiper/modules';
const props=defineProps(['oglasi'])
const formatedDate=(datum)=>{
  let formatDate=ref(new Date(datum).toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}))
return formatDate
}
 // Početna klasa
 const imageClass = ref('');



</script>

<template>
    <Swiper  class="md:max-w-[90%] w-[90%]" style="--swiper-navigation-color: yellow;height: 400px;"
  
    
      :modules="[SwiperController,SwiperFreeMode,SwiperNavigation]"
      :slides-per-view="1"
      :space-between="40"
      :navigation="true"
      :loop="true"
      :free-mode="true"
     
      :autoplay="{
        delay: 4000,
        disableOnInteraction: true,
      }"
      :breakpoints="{
      320: {   // za uređaje širine do 320px
        slidesPerView: 1,
        spaceBetween: 10
      },
      480: {  // za uređaje širine do 480px
        slidesPerView: 2,
        spaceBetween: 20
      },
      640: {  // za uređaje širine do 768px
        slidesPerView: 2,
        spaceBetween: 30
      },
      1024: { // za uređaje širine do 1024px i više
        slidesPerView: 4,
        spaceBetween: 80
      }
    }"
      
    
      
    
      
      
    >
      <SwiperSlide style="height: auto;" v-for="oglas in props.oglasi" class="bg-white shadow-md mb-2 p-0 rounded-md cursor-pointer mt-4  overflow-hidden">
        <NuxtLink :to="`/oglas/motocikli/${oglas.id}`" class="h-full">
              <div class="w-full m-0 h-[60%]">
                <img  :src="oglas.slikaPaths[0]" class="mx-auto w-full h-full">
               

              </div>
              <div class="px-3 flex flex-wrap h-[40%]  bg-gradient-to-r from-yellow-50 to-yellow-200" >
                <h2 class="text-normal md:text-lg text-xl text-black font-semibold w-full">{{ oglas.marka }} {{ oglas.model }}</h2>

                <div class=" h-[65%] space-y-4">
                  <p class="w-full md:text-sm  text-gray-400 font-bold">{{ oglas.godiste }}.god.</p>
                  <p class="w-full md:text-sm text-gray-600"><i class="bi bi-geo-alt-fill"></i> {{ oglas.mesto }}</p>
                  <div class="px-1">
                  <p class="text-black md:text-md text-lg font-semibold">{{ oglas.cena.toLocaleString('de-DE')}}€</p>
                  </div>
                </div>
              </div>
              
            </NuxtLink>

      </SwiperSlide>
    </Swiper>
  </template>
<style scoped>

.swiper-button-next,
.swiper-button-prev {
  color: white; /* Change this to your desired color */
}


</style>