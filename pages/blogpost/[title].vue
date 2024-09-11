<template>
  <Loading v-if="loading"/>
    <section class="w-full h-full bg-[url('~/assets/bacground1.jpg')] bg-cover p-4">
      
      <div class="container md:max-w-[80%] bg-gray-50 mx-auto md:p-8 p-4">
          <hr>
      <div class="flex mb-2 h-11 w-full p-3">
          <NuxtLink class="text-xs text-blue-700 flex items-center" to="/"><i class="bi bi-house"></i> Početna/</NuxtLink>
          <NuxtLink class=" text-xs text-blue-700 flex flex-wrap items-center" to="#">BlogPost/{{blogPost.title}}/</NuxtLink>
      </div>
      
      <hr>
        <!-- Blog Post Header -->
        <div class="mb-6">
          <h1 class="md:text-3xl text-2xl font-bold mb-2">{{ blogPost.title }}</h1>
          <h2 class="md:text-2xl text-lg text-gray-800 mb-4">{{ blogPost.subtitle }}</h2>
          <p class="text-md text-black">Autor:<a class="text-blue-400 cursor-pointer underline" :href="blogPost.autor_social">{{ blogPost.autor }}</a> </p>
          <p class="text-gray-600 text-lg">{{ formattedDate }}</p> 
          <p class="text-sm text-gray-500 flex items-center"><i class="bi bi-eye-fill mx-1 text-lg"></i>{{ blogPost.pregledi }} pregleda</p>
        </div>
        
        <!-- Blog Post Images -->
      
        <!-- Blog Post Content -->
        <div class="prose md:p-6 space-y-4 text-gray-500 mx-auto flex flex-wrap justify-center md:max-w-[80%]">
        
      <article v-html="blogPost.content || 'No content avalible'"></article>
      <img class="w-full" v-if="blogPost.images?.[0]" :src="blogPost.images[0]" alt="Image 1">
      <article class="w-full" v-html="blogPost.content2 || 'No additional content available' "></article>
      <img class="w-full" v-if="blogPost.images?.[1]" :src="blogPost.images[1]" alt="Image 2">
      <article v-html="blogPost.content3 || 'No further content available' "></article>
      <img class="w-full" v-if="blogPost.images?.[2]" :src="blogPost.images[2]" alt="Image 3">
        </div>
        <!-- Share Buttons -->
         <div class="w-full flex justify-between">
           <NuxtLink class="text-blue-400 flex mt-3  items-center" to="/"> <i class="bi bi-arrow-left"></i> Nazad na početnu</NuxtLink>
           <NuxtLink class="text-blue-400 flex mt-3  items-center" to="/blogs">  Čitajte ostale priče <i class="bi bi-arrow-right"></i></NuxtLink>

         </div>
        <h4 class="w-full mt-3">Podeli ovu priču na:</h4>
        <div class="mt-2 flex md:space-x-4 space-x-1">
      
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
      </div>
    </section>
  </template>
  
  <script setup>
  import { onMounted,ref } from 'vue';
import { useRoute } from '#app';

import { useRuntimeConfig } from '#app'

const config=useRuntimeConfig()
const blogPost = ref({})

const loading = ref(false)
 // Praćenje da li je dugme onemogućeno
const formattedDate=ref("")
onMounted(async()=>{
    const route = useRoute()
    const { title } = route.params
    loading.value=true
    const data = await $fetch(`${config.public.apiUrl}/api/blogposts/title/?title=${title}`, {
      method: 'GET',
     
     
    })
    
    loading.value=false
    blogPost.value=data
    formattedDate.value= new Date(blogPost.value.created_at).toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})
const views = await $fetch(`${config.public.apiUrl}/api/updateBlogViews/`, {
      method: 'POST',
     body:{
        title:title
     }
     
    })
    loading.value=false
    
})
  
  // Mock data for blog post (replace with actual data fetching logic)
  

  // Generate share URLs
 const blogPostUrl = useRequestURL().href
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(blogPostUrl)}`;
  const viberShareUrl = `viber://forward?text=${encodeURIComponent(blogPostUrl)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogPostUrl)}`;
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  