<script setup>
import { defineProps,onMounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';
const {link,slika,text1,text2}=defineProps(['link','slika','text1','text2'])

const redirectToExternalSite = () => {
  window.location.href = link
}
onMounted(async()=>{
    AOS.init({
        once: false, // Ponovo animiraj svaki put kada se element pojavi
      offset: 200, // Offset u pikselima pre nego što se animacija pokrene
      duration: 1500, // Trajanje animacije u milisekundama
      easing: 'ease' // trajanje animacije u milisekundama
     // vrsta efekta animacije
     // animacija će se pokrenuti samo jednom
  });
})
</script>

<template>
     <div 
    @click="redirectToExternalSite"
    class="relative mx-auto md:h-48 md:w-[80%] w-full h-28 cursor-pointer overflow-hidden"
  >
    <!-- Slika -->
    <img 
      :src="slika"
      class="absolute inset-0  w-full h-full"
    />

    <!-- Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-20"></div>

    <!-- Tekst -->
    <div class="relative z-10 h-full flex flex-col justify-center items-center">
      <div data-aos="fade-right" class="motomax-text md:text-5xl text-2xl font-bold text-white">
        {{text1}}
        <div data-aos="fade-right" class=" text-lg text-white mt-2 ">
        {{ text2 }}
      </div>
      </div>
     
    </div>
  </div>
</template>

<style scoped>



</style>