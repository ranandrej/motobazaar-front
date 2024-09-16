
<script setup>
import { useRoute } from '#app';
import { onMounted,ref,watch } from 'vue';
import { useRuntimeConfig } from '#app';
import { useRouter } from '#app';

const config=useRuntimeConfig()
const route=useRoute()
const loading=ref(false)
const blogovi=ref([])
const strane=ref(0)
const currentPage=ref(1)
const loadResults=async()=>{
    loading.value=true
   
    const data = await $fetch(`${config.public.apiUrl}/api/getblogovi/`, {
      method: 'GET',
     
     
    })
    loading.value=false
    blogovi.value=data.blogovi
    strane.value=data.pages
   
}
onMounted(async()=>{
    loadResults()
})
const fetchPage=async(page)=>{
    currentPage.value=page
    loading.value=true
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
     })
     const data = await $fetch(`${config.public.apiUrl}/api/getblogovi/?page=${page}`, {

      method: 'GET',
     
     
    })
    loading.value=false
    blogovi.value=data.blogovi

}

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
  <Loading v-if="loading"/>
    <div class="w-full flex flex-wrap  h-full bg-gray-300 md:p-8 p-2">
    <hr>
    <div class="flex h-11 w-full p-3">
        <NuxtLink class="text-blue-700 flex items-center" to="/"><i class="bi bi-house mx-1 text-lg"></i> Početna/</NuxtLink>
        <NuxtLink class="text-blue-700 flex items-center" to="#">Blogovi/Svi-Blogovi/</NuxtLink>
    </div>
    
    <hr>
    <div class="flex flex-wrap w-full justify-start md:p-3 my-2" v-if="blogovi.length>0">
          
       <h2 class="w-full md:text-2xl text-xl mx-3">Svi Blogovi i Vesti</h2>
          <div v-for="oglas in blogovi" :key="oglas.id"  class="md:w-[45%] cursor-pointer md:mx-4  my-4 flex rounded-md bg-gray-200 justify-start md:h-52 h-40">
            <div class="slika h-full m-0  w-[60%]">
              <img :src="oglas.images[0]" class="h-full w-full">

            </div>
            <div class="w-2/3 p-4 h-1/2 flex flex-wrap justify-start">
              <div class="w-full flex justify-between text-black font-semibold md:text-xl">
                <p class="md:line-clamp-4 line-clamp-2">{{ oglas.title }}</p>
                
              </div>
              <p class="w-full text-black md:text-md text-xs font-thin overflow-hidden md:line-clamp-4 line-clamp-2">{{ oglas.subtitle }}</p>
              <p class="w-full md:text-normal text-xs text-black font-thin">Objavljen: {{ formatedDate(oglas.created_at) }}</p>
              <NuxtLink class="text-blue-400 flex items-center font-thin underline mt-1 md:mt-6" :to="`/blogpost/${oglas.title}`">Saznaj Više <Icon class="mt-1" name="material-symbols:arrow-right-alt"></Icon></NuxtLink>
              
            </div>

        </div>
         
          </div>
          <div class="flex flex-wrap mx-auto justify-center my-4">
      <button
        v-for="page in strane"
        :key="page"
        @click="fetchPage(page)"
        :class="['px-4 py-2 mx-1 rounded cursor-pointer', { 'bg-yellow-500 text-white': currentPage === page, 'bg-gray-300': currentPage !== page }]"
      >
        {{ page }}
      </button>
      <h3 class="text-md font-normal w-full text-center">Strana {{ currentPage }} od {{ strane }}</h3>
    </div>
    </div>
</template>