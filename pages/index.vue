<script setup>
import { onMounted } from 'vue';
import { useRoute } from '#app';
import { useRuntimeConfig } from '#app'
import { useRouter } from 'vue-router'
const config=useRuntimeConfig()

const oglasi = ref([])
const najgledaniji = ref([])
const najomiljeniji=ref([])
const marke=ref([])
const blogPosts=ref([])
const loading = ref(false)
const model=ref("")
const marka=ref("")
const godisteMin=ref("")
const godisteMax=ref("")
const minPrice=ref("")
const maxPrice=ref("")
const cenaError=ref(false)
const godisteError=ref(false)
const poruka=ref("")
const email=ref("")
const mailSuccess=ref(false)
const mailError=ref(false)
const router=useRouter()
const oglasiCount=ref(0)
const registrovan=ref(false)
const prviVlasnik=ref(false)
onMounted(async()=>{
    const route = useRoute()
    const { id } = route.params
    loading.value=true
    const data = await $fetch(`${config.public.apiUrl}/api/getMotocikli/`, {
      method: 'GET',
     
     
    })
  
    loading.value=false
    console.log(data)
    oglasi.value=data
    loading.value=true
    const mostViewed = await $fetch(`${config.public.apiUrl}/api/najgledaniji/`, {
      method: 'GET',
     
     
    })
  
    loading.value=false
    console.log(data)
    najgledaniji.value=mostViewed
    loading.value=true
    const mostLiked = await $fetch(`${config.public.apiUrl}/api/najomiljeniji/`, {
      method: 'GET',
     
     
    })
  
    loading.value=false
    console.log(data)
    najomiljeniji.value=mostLiked
    const marks = await $fetch(`${config.public.apiUrl}/api/getMarke/`, {
      method: 'GET',
     
     
    })
    marke.value=marks
    console.log(marke.value)

    const count = await $fetch(`${config.public.apiUrl}/api/getMotocikliCount/`, {
      method: 'GET',
     
     
    })
    oglasiCount.value=count.count
    

    const blogs = await $fetch(`${config.public.apiUrl}/api/blogposts/`, {
      method: 'GET',
     
     
    })
    blogPosts.value=blogs
})


const clear=()=>{
    marka.value=""
    model.value=""
    godisteMin.value=""
    godisteMax.value=""
    minPrice.value=""
    maxPrice.value=""
}
const search = async () => {
  
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
    }
  })
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
const sendMail=async()=>{
  loading.value = true;
  mailSuccess.value = false; // Reset success state
  mailError.value = null; // Reset error state

  try {
    const mail = await $fetch(`${config.public.apiUrl}/api/sendMail/`, {
      method: 'POST',
      body: {
        naslov: email.value,
        poruka: poruka.value
      }
    });

    loading.value = false;
    mailSuccess.value = true; // Set success state
    email.value = ""; // Clear input fields
    poruka.value = "";

    // Hide success message after 2 seconds
    setTimeout(() => {
      mailSuccess.value = false;
    }, 2000);
  } catch (error) {
    loading.value = false;
    mailError.value = error.message || 'An error occurred while sending the email. Please try again.'; // Set error state
  }
    
}

</script>

<template>
    <Loading v-if="loading"/>
    <div class="w-full mb-5 flex justify-center p-6 bg-[url('~/assets/bacground1.jpg')] bg-cover">
        <div class="md:w-[60%] w-full p-6 rounded-md bg-white bg-opacity-50 border-2 border-yellow-500 flex flex-wrap">
                <h2 class="w-full flex items-center text-xl font-semibold m-2">Pretraga  <span class="text-sm font-bold">- {{ oglasiCount }} oglasa</span></h2>
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
                <button class="bg-yellow-500 flex text-white items-center rounded-md p-2 mx-2" :disabled="cenaError || godisteError" @click="search()"><Icon name="ic:baseline-search"></Icon> Pretraži</button>
                <button class="bg-transparent  bg-gray-400 flex items-center rounded-md p-2 mx-2" @click="clear">Poništi pretragu</button>
               </div>
            </div>
    </div>

    <div class="p-10 w-full bg-gray-100 min-h-full flex flex-wrap justify-center">

       
        <h1 class="w-full text-2xl font-semibold">Poslednje dodati oglasi </h1>
        <div class="flex flex-wrap mx-auto md:justify-start justify-center md:p-6">
            <NuxtLink v-for="oglas in oglasi" :key="oglas.id" :to="`/oglas/motocikli/${oglas.id}`" class="bg-white rounded-md m-3 cursor-pointer md:w-60 w-72 overflow-hidden md:h-72 h-80 shadow-md">
              <div class="w-full m-0 h-2/3">
                <img :src="oglas.slikaPaths[0]" class="w-full h-full">

              </div>
              <div class="px-3 flex flex-wrap h-1/3">
                <h2 class="text-normal text-black font-semibold w-full">{{ oglas.marka }} {{ oglas.model }}</h2>
                <p class="w-full text-sm text-gray-400 font-bold">{{ oglas.godiste }}.god.</p>
                <p class="w-full text-sm text-gray-600"><Icon name="ic:baseline-location-on"/> {{ oglas.mesto }}</p>
                <div class="px-1">
                <p class="text-black text-sm font-semibold">{{ oglas.cena.toLocaleString('de-DE')}}€</p>
              </div>
              </div>
              
            </NuxtLink>

        </div>
    </div>
    <div class="p-10 w-full bg-gray-50 min-h-full flex flex-wrap ">

       
<h1 class="w-full text-2xl font-semibold">Najgledaniji oglasi </h1>
<div class="flex flex-wrap mx-auto md:justify-start justify-center md:p-6">
    <NuxtLink v-for="oglas in najgledaniji" :key="oglas.id" :to="`/oglas/motocikli/${oglas.id}`" class="bg-white rounded-md m-3 cursor-pointer md:w-60 w-72 overflow-hidden md:h-72 h-80 shadow-md">
      <div class="w-full m-0 h-2/3 relative">
        <img :src="oglas.slikaPaths[0]" class="w-full h-full">
        <div class="absolute top-0 left-0 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-br-md">
      {{ oglas.pregledi }} pregleda
    </div>

      </div>
      <div class="px-3 flex flex-wrap h-1/3">
        <h2 class="text-normal text-black font-semibold w-full">{{ oglas.marka }} {{ oglas.model }}</h2>
        <p class="w-full text-sm text-gray-400 font-bold">{{ oglas.godiste }}.god.</p>
        <p class="w-full text-sm text-gray-600"><Icon name="ic:baseline-location-on"/> {{ oglas.mesto }}</p>
        <div class="px-1">
        <p class="text-black text-sm font-semibold">{{ oglas.cena.toLocaleString('de-DE')}}€</p>
      </div>
      </div>
      
    </NuxtLink>

</div>
</div>
<div class="p-10 w-full bg-[url('~/assets/background3.jpg')] bg-center min-h-full flex flex-wrap justify-center">

       
  <h2 class="m-2  text-xl text-white w-full text-center font-light">
          MOTO|<span class="text-yellow-500">BAZAAR</span> korisnici su izdvojili
        </h2>
<div class="flex flex-wrap mx-auto md:justify-start justify-center md:p-6">
    <NuxtLink v-for="oglas in najomiljeniji" :key="oglas.id" :to="`/oglas/motocikli/${oglas.id}`" :class="oglas.registrovan?`bg-gradient-to-r from-green-200 to-green-500`:`bg-white`" class=" rounded-md m-3 cursor-pointer md:w-72 w-72 overflow-hidden md:h-80 h-80">
      <div class="w-full m-0 h-2/3 relative">
        <img :src="oglas.slikaPaths[0]" class="w-full h-full">
        <div class="absolute top-0 flex items-center left-0 bg-orange-500 text-white text-xs font-normal px-2 py-1 rounded-br-md">
      <Icon class="mx-1" name="material-symbols:favorite"></Icon> {{ oglas.broj_omiljenih }} korisnika označilo kao omiljeni
    </div>

      </div>
      <div class="px-3 flex flex-wrap h-1/3">
        <h2 class="text-normal text-black mb-0 font-semibold w-full">{{ oglas.marka }} {{ oglas.model }}</h2>
        <p class="w-full text-xs text-gray-400 font-semibold">{{ oglas.godiste }}.god.</p>
        <p class="w-full text-sm text-gray-600"><Icon name="ic:baseline-location-on"/> {{ oglas.mesto }}</p>
        <p v-if="oglas.registrovan" class="text-sm bg-green-500 text-white px-2">Registrovan</p>
        <div class="px-1 w-full">
        <p class="text-black w-full text-sm font-semibold">{{ oglas.cena.toLocaleString('de-DE')}}€</p>
      </div>
      </div>
      
    </NuxtLink>

</div>
</div>

<div class="w-full  p-6 bg-slate-700 mx-auto md:p-8">
  <h2 class="m-2 mb-2 text-xl text-white w-full text-center font-thin">
        MOTO|<span class="text-yellow-500">BAZAAR</span> Blog 
      </h2>
  <Slike :posts="blogPosts"/>
</div>

    <div id="kontakt"  class="w-full p-8 flex justify-center bg-[url('~/assets/bacground1.jpg')] bg-cover">
        <form id="contact" @submit.prevent="sendMail()">
            <div class="rounded-md p-6 flex flex-wrap border-2 border-yellow-500 bg-slate-700 bg-opacity-20">
                <h1 class="w-full flex items-center text-white text-xl font-semibold"><Icon class="mt-2 text-2xl" name="material-symbols:contract-edit-outline-rounded"/> Kontaktirajte nas</h1>
                <p class="w-full font-semibold text-md text-yellow-500" v-if="mailSuccess">Uspešno poslat e-mail!</p>
                <p class="w-full font-semibold text-md text-red-500" v-if="mailError">{{ mailError }}</p>
                <input type="email" v-model="email" maxlength="50" class="w-1/2 p-1 rounded-md my-3" placeholder="Vaš E-mail"/>
                <textarea maxlength="200" rows="4" v-model="poruka" class="p-3 rounded-md w-full my-2" placeholder="Poruka"></textarea>
                <button type="submit" class="bg-yellow-500 flex items-center justify-center rounded-md cursor-pointer text-white w-1/3 p-2 my-3">Pošalji <Icon class="mx-1 my-1" name="material-symbols:send"/></button>
            </div>
        </form>
        
    </div>
</template>