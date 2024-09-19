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
const kwMin=ref('')
const kwMax=ref('')
const kubikazaMin=ref('')
const kubikazaMax=ref('')
const minPrice=ref("")
const maxPrice=ref("")
const cenaError=ref(false)
const godisteError=ref(false)
const kwError=ref(false)
const kubikazaError=ref(false)
const poruka=ref("")
const email=ref("")
const mailSuccess=ref(false)
const mailError=ref(false)
const router=useRouter()
const oglasiCount=ref(0)
const registrovan=ref(false)
const prviVlasnik=ref(false)
const deteljnaPretragaShow=ref(false)
onMounted(async()=>{
    const route = useRoute()
    const { id } = route.params
    loading.value=true
    const data = await $fetch(`${config.public.apiUrl}/api/getMotocikli/`, {
      method: 'GET',
     
     
    })
  
    loading.value=false
    
    oglasi.value=data
    loading.value=true
    const mostViewed = await $fetch(`${config.public.apiUrl}/api/najgledaniji/`, {
      method: 'GET',
     
     
    })
  
    loading.value=false
    
    najgledaniji.value=mostViewed
    loading.value=true
    const mostLiked = await $fetch(`${config.public.apiUrl}/api/najomiljeniji/`, {
      method: 'GET',
     
     
    })
  
    loading.value=false
    
    najomiljeniji.value=mostLiked
    const marks = await $fetch(`${config.public.apiUrl}/api/getMarke/`, {
      method: 'GET',
     
     
    })
    marke.value=marks

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
    kwMin.value=""
    kwMax.value=""
    kubikazaMin.value=""
    kubikazaMax.value=""
    godisteError.value=false
    kwError.value=false
    kubikazaError.value=false
    cenaError.value=false
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
      registrovan:registrovan.value ? 'true' : "",
      kwMin:kwMin.value,
      kwMax:kwMax.value,
      kubikazaMin:kubikazaMin.value,
      kubikazaMax:kubikazaMax.value
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
  if (broj !== "") {
    if (broj < 1900 || broj > 2025) {
      godisteError.value = true;
    } else {
      godisteError.value = false;
    }
  } else {
    godisteError.value = false;
  }
}
const validateInputKw = (broj) => {
  // Provera da li je unos van granica
 if(broj!=""){
  if(broj<1 || broj>500){
    kwError.value=true
    
 }else{
    kwError.value=false
 }
  }
 else{
    kwError.value=false
 }
}
const validateInputKubikaza = (broj) => {
  // Provera da li je unos van granica
 if(broj!=""){
  if(broj<1 || broj>2000){
    kubikazaError.value=true
    
 }else{
    kubikazaError.value=false
 }
  }
 else{
    kubikazaError.value=false
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
    <a class="flex justify-center" href="https://motobikeshop.rs"><img src="https://ejcrowqjfiedgnebyxmr.supabase.co/storage/v1/object/public/Baneri/banner1.jpg?t=2024-09-12T08%3A46%3A55.784Z" alt=""></a>
    <div class="w-full mb-0 mt-0 flex justify-center md:p-6 py-4 bg-[url('~/assets/bacground1.jpg')] bg-cover">
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
                <div v-if="deteljnaPretragaShow" class="detaljna flex flex-wrap w-full">
                  <input v-model="kwMin" @input="validateInputKw(kwMin)"  min="1900" max="2024" class="bg-white rounded-md m-2 md:w-1/3 w-full p-1" type="number" placeholder="Snaga od (KW)"/>
                    <input v-model="kwMax" @input="validateInputKw(kwMax)"  min="1900" max="2024"  class="bg-white rounded-md m-2 md:w-1/3 w-full p-1" type="number" placeholder="Do"/>
                    <label class="w-full font-semibold text-sm text-yellow-500" v-if="kwError">Kilovati moraju biti izmedju 1 i 500</label>
                    <div class="w-2/3 md:w-full">
                      <input v-model="kubikazaMin" @input="validateInputKubikaza(kubikazaMin)"  min="1900" max="2024" class="bg-white rounded-md m-2 md:w-1/3 w-full p-1" type="number" placeholder="Kubikaža od (ccm)"/>
                      <input v-model="kubikazaMax" @input="validateInputKubikaza(kubikazaMax)"  min="1900" max="2024"  class="bg-white rounded-md m-2 md:w-1/3 w-full p-1" type="number" placeholder="Do"/>
                      <label class="w-full font-semibold text-sm text-yellow-500" v-if="kubikazaError">Kubikaža mora biti izmedju 1 i 2000</label>
                    </div>

                </div>
                </div>
            <button @click="deteljnaPretragaShow=!deteljnaPretragaShow" class="border-2 mt-2 border-gray-600 bg-gray-200 bg-opacity-40 flex text-black items-center rounded-md md:p-2 p-1 px-2 mx-2" > {{ deteljnaPretragaShow ? 'Sakrij detaljnu pretragu' : 'Detaljna pretraga' }}</button>
               <div class="w-full flex justify-start mt-4">
               
                  <button class="bg-yellow-500 flex text-white items-center rounded-md p-2 mx-2" :disabled="cenaError || godisteError || kwError || kubikazaError" @click="search()"><i class="bi bi-search text-sm mx-1"></i> Pretraži</button>
                  <button class="bg-transparent  bg-gray-400 flex items-center rounded-md p-2 mx-2" @click="clear">Poništi pretragu</button>
                  
                <div class="flex"></div>

               </div>
            </div>
    </div>

    <div class="p-2 mb-2 bg-gray-100">
     <Baner :text1="'Moto Max'" :text2="'Sve za vaš motocikl'" :link="'https://motomaxshop.rs'"
     :slika="'https://ejcrowqjfiedgnebyxmr.supabase.co/storage/v1/object/public/Baneri/baner%20br1.jpg?t=2024-09-09T11%3A36%3A22.264Z'"
      alt="Moto max banner"/>
      <h1 class="text-2xl my-2 mx-3 font-semibold">Poslednje dodati oglasi </h1>
      <MotoriSlide :oglasi="oglasi"/>
    </div>
    
    <div class="md:p-10 p-4 w-full bg-gray-50 min-h-full flex flex-wrap justify-center">
  <Baner class=" mb-3" :text1="'Peda Motors'" :text2="'Pogledajte Ponudu'" :link="'https://peda.rs/'" :slika="'https://ejcrowqjfiedgnebyxmr.supabase.co/storage/v1/object/public/Baneri/Baner-728x90.jpg?t=2024-09-11T15%3A27%3A35.646Z'"/>
<h1 class="w-full text-2xl font-semibold">Najgledaniji oglasi </h1>
<div class="flex flex-wrap mx-auto md:justify-start justify-center md:p-6">
    <NuxtLink v-for="oglas in najgledaniji" :key="oglas.id" :to="`/oglas/motocikli/${oglas.id}`" class="bg-white rounded-md m-3 cursor-pointer md:w-60 w-72 overflow-hidden md:h-72 h-80 shadow-md">
      <div class="w-full m-0 h-2/3 relative">
        <img :src="oglas.slikaPaths[0]" class="w-full h-full">
        <div class="absolute top-0 left-0 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-br-md">
          <i class="bi bi-eye-fill mx-1"></i>{{ oglas.pregledi }} pregleda
    </div>

      </div>
      <div class="px-3 flex flex-wrap h-1/3">
        <h2 class="text-normal text-black font-semibold w-full">{{ oglas.marka }} {{ oglas.model }}</h2>
        <p class="w-full text-sm text-gray-400 font-bold">{{ oglas.godiste }}.god.</p>
        <p class="w-full text-sm text-gray-600"><i class="bi bi-geo-alt-fill"></i> {{ oglas.mesto }}</p>
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
          <i class="bi bi-heart-fill mx-1"></i> {{ oglas.broj_omiljenih }} korisnika označilo kao omiljeni
    </div>

      </div>
      <div class="px-3 flex flex-wrap h-1/3">
        <h2 class="text-normal text-black mb-0 font-semibold w-full">{{ oglas.marka }} {{ oglas.model }}</h2>
        <p class="w-full text-xs text-gray-400 font-semibold">{{ oglas.godiste }}.god.</p>
        <p class="w-full text-sm text-gray-600"><i class="bi bi-geo-alt-fill"></i> {{ oglas.mesto }}</p>
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
                <h1 class="w-full flex items-center text-white text-xl font-semibold"><i class="bi bi-person-lines-fill mx-1"></i> Kontaktirajte nas</h1>
                <p class="w-full font-semibold text-md text-yellow-500" v-if="mailSuccess">Uspešno poslat e-mail!</p>
                <p class="w-full font-semibold text-md text-red-500" v-if="mailError">{{ mailError }}</p>
                <input type="email" v-model="email" maxlength="50" class="md:w-1/2 p-1 rounded-md my-3" placeholder="Vaš E-mail"/>
                <textarea maxlength="200" rows="4" v-model="poruka" class="p-3 rounded-md w-full my-2" placeholder="Poruka"></textarea>
                <button type="submit" class="bg-yellow-500 flex items-center justify-center rounded-md cursor-pointer text-white w-1/3 p-2 my-3">Pošalji <i class="bi bi-send mx-1"></i></button>
            </div>
        </form>
        
    </div>
</template>
<style scoped>


.slogan {
  opacity: 0;
  animation: fadeInOut 8s infinite;
  
}

@keyframes moveText {
  0% {
    transform: translateX(-200%) ;
  }
  100% {
    transform: translateX(300%) ;
  }
}


</style>