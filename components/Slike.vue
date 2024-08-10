<script setup>
import { ref,defineProps } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

import { Navigation } from 'swiper/modules';
const props=defineProps(['posts'])
const formatedDate=(datum)=>{
  let formatDate=ref(new Date(datum).toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}))
return formatDate
}
</script>

<template>
    <Swiper class="md:max-w-[90%]" style="--swiper-navigation-color: yellow;"
  
    
      :modules="[SwiperController,SwiperFreeMode,SwiperNavigation]"
      :slides-per-view="1"
      :space-between="80"
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
        slidesPerView: 3,
        spaceBetween: 30
      },
      1024: { // za uređaje širine do 1024px i više
        slidesPerView: 3,
        spaceBetween: 80
      }
    }"
      
    
      
    
      
      
    >
      <SwiperSlide style="height: auto;" v-for="blog in props.posts" class="bg-gray-300 p-0 rounded-md cursor-pointer mt-4  w-80  overflow-hidden  h-80">
        <NuxtLink  :to="`/blogpost/${blog.title}`" class="h-full">
    <div class="w-full h-2/3 m-0 relative">
      <img :src="blog.images[0]" class="w-full h-full">
      <div class="absolute top-0 flex items-center left-0 bg-orange-500 text-white text-xs font-normal px-2 py-1 rounded-br-md">
    Objavljen {{ formatedDate(blog.created_at) }}
  </div>

    </div>
    <div class="px-3 p-6 flex flex-wrap h-1/3">
      <h2 class="text-lg text-black mt-0 mb-1 font-semibold ">{{blog.title}}</h2>
      <p class="w-full text-xs text-black font-normal">{{ blog.subtitle }}</p>
      
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