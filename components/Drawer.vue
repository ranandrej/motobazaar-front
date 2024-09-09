<script setup>
import { useMainStore } from '~/stores/main'

const store = useMainStore()
const {isMenuOpen}=store
console.log("Menu state:"+isMenuOpen)
</script>
<template>
    <section class="fixed right-0 w-[60%] z-50  bg-slate-800 h-full m-0">
        <div class="flex w-full p-4 justify-start">
         <button @click="useMainStore().isMenuOpen=false" class="bg-transparent text-xl text-gray-500 cursor-pointer">X</button>
        </div>
        <div @click="useMainStore().isMenuOpen=false" class="p-3 m-0 w-full flex flex-wrap justify-start items-center">
                <NuxtLink class="bg-transparent w-full text-white ml-2 my-2 cursor-pointer flex items-center text-lg" to="/"> Početna</NuxtLink>
                <NuxtLink class="bg-transparent w-full text-white ml-2 my-2 cursor-pointer flex items-center text-lg" to="/blogs"> Blog</NuxtLink>
                <NuxtLink class="bg-transparent w-full text-white ml-2 my-2 cursor-pointer flex items-center text-lg" to="/#kontakt"> Kontakt</NuxtLink>
                <NuxtLink class="bg-transparent w-full text-white ml-2 my-2 cursor-pointer flex items-center text-lg" to="/about"> O nama</NuxtLink>


                <NuxtLink v-if="Object.keys(store.currentUser).length == 0" to="/login" class="bg-transparent w-full text-white my-2 cursor-pointer flex items-center text-lg ">     <i class="bi bi-box-arrow-right mx-1"></i> Prijava</NuxtLink>
                <button
            class="bg-transparent text-white cursor-pointer mx-1 flex items-center"
            v-if="Object.keys(store.currentUser).length > 0"
            @click="useMainStore().isLogoutModalOpen=true"
          >
          <i class="bi bi-box-arrow-left m-1"></i>
            Odjava
          </button>
                <NuxtLink to="/register" v-if="Object.keys(store.currentUser).length == 0" class="bg-transparent w-full text-white my-2 cursor-pointer flex items-center text-lg "><i class="bi bi-person-add mx-1"></i> Registracija</NuxtLink>
                <NuxtLink
            v-if="Object.keys(store.currentUser).length > 0"
            :to="`/profile/user/${useMainStore().currentUser.id}`"
            class="text-yellow-500 my-2 mx-2 w-full"
          >
            Moj Profil
          </NuxtLink>
          <NuxtLink to="/noviOglas"
            class="bg-transparent border-2 border-yellow-500 mx-1 text-white cursor-pointer p-2"
            v-if="Object.keys(store.currentUser).length > 0"
          >
            Postavite Oglas
          </NuxtLink>


            </div>

    </section>
</template>