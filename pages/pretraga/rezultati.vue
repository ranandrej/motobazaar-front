<script setup>
import { useRoute } from '#app';
import { onMounted,ref,watch } from 'vue';
import { useRuntimeConfig } from '#app';
import { useRouter } from '#app';

const config=useRuntimeConfig()
const route=useRoute()
const loading=ref(false)
const oglasi=ref([])
const strane=ref(0)
const currentPage=ref(1)
const marke=ref([])
const model=ref("")
const marka=ref("")
const godisteMin=ref("")
const godisteMax=ref("")
const minPrice=ref("")
const maxPrice=ref("")
const cenaError=ref(false)
const godisteError=ref(false)
const router=useRouter()
const registrovan=ref(false)
const prviVlasnik=ref(false)

const loadResults=async()=>{
    loading.value=true
    const route = useRoute()
    
    const { id } = route.params
    loading.value=true
    const data = await $fetch(`${config.public.apiUrl}/api/searchMotocikli/?marka=${route.query.marka}&model=${route.query.model}&godiste_min=${route.query.godisteMin}&godiste_max=${route.query.godisteMax}&cena_min=${route.query.cena_min}&cena_max=${route.query.cena_max}&registrovan=${route.query.registrovan}&prvi_vlasnik=${route.query.prvi_vlasnik}`, {
      method: 'GET',
     
     
    })
    loading.value=false
    oglasi.value=data.motocikli
    strane.value=data.pages
    const marks = await $fetch(`${config.public.apiUrl}/api/getMarke/`, {
      method: 'GET',
     
     
    })
    marke.value=marks
    console.log(marke.value)
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
     const data = await $fetch(`${config.public.apiUrl}/api/searchMotocikli/?page=${page}&marka=${route.query.marka}&model=${route.query.model}&godiste_min=${route.query.godisteMin}&godiste_max=${route.query.godisteMax}&cena_min=${route.query.cena_min}&cena_max=${route.query.cena_max}&registrovan=${route.query.registrovan}&prvi_vlasnik=${route.query.prvi_vlasnik}`, {

      method: 'GET',
     
     
    })
    loading.value=false
    oglasi.value=data.motocikli

}
const search=async()=>{
    router.push({
    path: '/pretraga/rezultati',
    query: {
      marka: marka.value,
      model: model.value,
      godisteMin: godisteMin.value,
      godisteMax: godisteMax.value,
      cena_min: minPrice.value,
      cena_max: maxPrice.value,
      prvi_vlasnik:prviVlasnik.value ? 'true':"",
      registrovan:registrovan.value ? 'true' : ""
    }})
   
}
const clear=()=>{
    marka.value=""
    model.value=""
    godisteMin.value=""
    godisteMax.value=""
    minPrice.value=""
    maxPrice.value=""
}

const validateInput = (broj) => {
  // Provera da li je unos van granica
  if(broj!=""){
    if(broj<0 || broj>1000000){
    cenaError.value=true
    
 }else{
    cenaError.value=false
 }
  }
 else{
    cenaError.value=false
 }
}
const validateInputGod = (broj) => {
  // Provera da li je unos van granica
 if(broj!=""){
  if(broj<1900 || broj>2025){
    godisteError.value=true
    
 }else[
    godisteError.value=false
 ]
  }
 else{
    godisteError.value=false
 }
}
watch(() => route.query, loadResults, { immediate: true })
</script>

<template>
    <Loading v-if="loading"/>
    <div class="w-full mb-5 flex justify-center md:p-6 py-4 bg-[url('~/assets/bacground1.jpg')] bg-cover">
        <div class="md:w-[60%] w-full p-6 rounded-md bg-white bg-opacity-50 border-2 border-yellow-500 flex flex-wrap">
                <h2 class="w-full flex items-center text-xl font-semibold m-2">Pretraga</h2>
                <div class="w-full flex flex-wrap justify-start">
                    <select v-model="marka" name="marka" class="bg-white rounded-md m-2 md:w-1/3 w-full p-1">
                        <option value="" disabled>Marka</option>
                        <option v-for="m in marke" :value="m">{{ m }}</option>
                    </select>
                    <input v-model="model" maxlength="15" class="bg-white rounded-md m-2 md:w-1/3 w-full p-1"  type="text" placeholder="Model"/>
                </div>
                <div class="w-full flex flex-wrap justify-start mt-4">
                    <input v-model="godisteMin" @input="validateInputGod(godisteMin)" maxlength="4" min="1900" max="2024" class="bg-white rounded-md m-2 md:w-1/3 w-full p-1" type="number" placeholder="Godište od"/>
                    <input v-model="godisteMax" @input="validateInputGod(godisteMax)" maxlength="4" min="1900" max="2024"  class="bg-white rounded-md m-2 md:w-1/3 w-full p-1" type="number" placeholder="Do"/>
                    <label class="w-full font-semibold text-sm text-yellow-500" v-if="godisteError">Godište mora biti izmedju 1900 i 2025</label>
                <div class="md:w-2/3 w-full">
                    <input v-model="minPrice" @input="validateInput(minPrice)" maxlength="7" min="0" class="bg-white rounded-md m-2  p-1" type="number" placeholder="Cena od"/>
                    <input v-model="maxPrice" @input="validateInput(maxPrice)" maxlength="7"  max="1000000" class="bg-white rounded-md m-2  p-1" type="number" placeholder="Do"/>€
        
                </div>
                <label class="w-full font-semibold text-sm text-yellow-500" v-if="cenaError">Cena mora biti izmedju 0 i 100000</label>
                <div class="md:w-2/3 w-full flex p-3">
                  <label class="flex mx-4 items-center">
                    <input v-model="registrovan"
                      type="checkbox"
                      name="registrovan"
                      class="form-checkbox h-4 w-4 text-yellow-500 transition duration-150 ease-in-out"
                      />
                    <span class="ml-2 text-sm text-gray-700">Registrovana vozila</span>
                </label>
                <label class="flex items-center">
                    <input v-model="prviVlasnik"
                      type="checkbox"
                      name="prvi_vlasnik"
                      class="form-checkbox h-4 w-4 text-yellow-500 transition duration-150 ease-in-out"
                      />
                    <span class="ml-2 text-sm text-gray-700">Prvi vlasnik</span>
                </label>
                </div>
                </div>
               <div class="w-full flex justify-start mt-4">
                <button class="bg-yellow-500 flex text-white items-center rounded-md p-2 mx-2" :disabled="cenaError || godisteError" @click="search()"><i class="bi bi-search text-sm mx-1"></i> Pretraži</button>
                <button class="bg-transparent  bg-gray-400 flex items-center rounded-md p-2 mx-2" @click="clear">Poništi pretragu</button>
               </div>
            </div>
    </div>

    <div class="relative w-full flex flex-wrap h-full md:p-8 p-1  bg-[url('~/assets/rezultatibg.jpg')] bg-cover" >
      <div class="absolute inset-0 bg-white opacity-20"></div>
      <hr>
    <div class="relative z-10">
      <div class="flex h-11 w-full p-3">
          <NuxtLink class="text-blue-700 flex items-center" to="/"><i class="bi bi-house mx-1 text-lg"></i> Početna/</NuxtLink>
          <NuxtLink class="text-blue-700 flex items-center" to="#">Pretraga/Rezultat/</NuxtLink>
      </div>
      
      <hr>
      <div class="flex flex-wrap w-full justify-start md:p-3 p-0 my-2 " v-if="oglasi.length>0">
      
          <h2 class="text-xl w-full font-semibold text-black">Rezultati pretrage</h2>
            <NuxtLink v-for="oglas in oglasi" :key="oglas.id" :to="`/oglas/motocikli/${oglas.id}`" class="md:w-2/3 cursor-pointer md:mx-2  my-4 flex rounded-md bg-gray-100 justify-start md:h-52 h-48">
              <div class="slika h-full m-0 md:w-1/3 w-[70%]">
                <img :src="oglas.slikaPaths[0]" class="h-full w-full">
              </div>
              <div class="w-2/3 md:p-4 px-3 py-1 h-1/2 flex flex-wrap justify-start">
                <div class="w-full flex justify-between text-black font-semibold md:text-xl text-lg">
                  <p>{{ oglas.marka }} {{oglas.model}}</p>
      
                </div>
                <p class="w-full md:text-normal text-black  font-thin">{{ oglas.godiste }}.god.</p>
                <p class="w-full md:text-normal text-sm text-black font-thin">{{ oglas.kilometraza }} km</p>
                <p class="w-full  font-thin flex items-center md:mt-2 text-gray-600"><i class="bi bi-geo-alt"></i> {{ oglas.mesto }}</p>
                <p v-if="oglas.registrovan" class="bg-green-500 mt-1 p-1 text-white text-sm">Registrovan</p>
                <p v-if="oglas.prvi_vlasnik" class="bg-orange-500 mt-1 p-1 text-white text-sm">Prvi vlasnik</p>
                <p class="w-full md:mt-5 mt-1 mb-2 text-black md:text-xl text-lg font-semibold">{{ oglas.cena.toLocaleString('de-DE')}}€ <span class="text-yellow-500 text-xs">+dodatni troškovi kupovine</span></p>
              </div>
            </NuxtLink>
      
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
    </div>
</template>