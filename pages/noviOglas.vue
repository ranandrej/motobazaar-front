<template>
  <SuccessAlert v-if="successPost" :message="'Uspesno postavljen oglas'" />
   <Loading v-if="loading"/>
  <div class="w-full h-full p-6 bg-[url('~/assets/bacground1.jpg')] bg-cover">
    <div class="md:w-[60%] pt-4 mx-auto  bg-gray-100 rounded-lg h-max shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Postavite Novi Oglas</h2>
      <form id="motociklForm" @submit.prevent="handleSubmit" class="max-h-100 p-5">
        <!-- Marka -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Marka</label>
         <select required class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" id="brand" name="marka" placeholder="Sve marke" tabindex="-1">
          <option value=""></option><option value="access-motor">Access Motor</option>
          <option value="aeon">Aeon</option><option value="alligator">Alligator</option>
          <option value="apollo">Apollo</option><option value="aprilia">Aprilia</option>
          <option value="arctic-cat">Arctic Cat</option><option value="baotian">Baotian</option>
          <option value="barossa">Barossa</option><option value="bashan">Bashan</option>
          <option value="benelli">Benelli</option><option value="beta">Beta</option>
          <option value="bmw">BMW</option><option value="bombardier">Bombardier</option>
          <option value="buell">Buell</option><option value="cagiva">Cagiva</option>
          <option value="can-am">Can-am</option><option value="ccm">CCM</option>
          <option value="cfmoto">CFMOTO</option><option value="corvus">Corvus</option>
          <option value="cpi">CPI</option><option value="daelim">Daelim</option>
          <option value="daytona-motors">Daytona Motors</option>
          <option value="derbi">Derbi</option>
          <option value="dinli">Dinli</option>
          <option value="ducati">Ducati</option>
          <option value="drkopp">Dürkopp</option>
          <option value="ellite-moto">Ellite Moto</option>
          <option value="factory-bike">Factory bike</option>
          <option value="falcon">Falcon</option>
          <option value="feline">Feline</option>
          <option value="gas-gas">Gas Gas</option>
          <option value="geely">Geely</option>
          <option value="genergia">Genergia</option>
          <option value="gilera">Gilera</option>
          <option value="goes">Goes</option>
          <option value="harley-davidson">Harley Davidson</option>
          <option value="hercules">Hercules</option>
          <option value="hisun">Hisun</option>
          <option value="honda">Honda</option>
          <option value="huaihai">Huaihai</option>
          <option value="husaberg">Husaberg</option>
          <option value="husqvarna">Husqvarna</option>
          <option value="hyosung">Hyosung</option>
          <option value="indian">Indian</option>
          <option value="jawa">Jawa</option>
          <option value="jiajue">Jiajue</option>
          <option value="jialing">Jialing</option>
          <option value="jinlun">Jinlun</option>
          <option value="jmstar">JMSTAR</option>
          <option value="jonway">Jonway</option>
          <option value="k-moto">K-MOTO</option>
          <option value="kawasaki">Kawasaki</option>
          <option value="kayo">Kayo</option>
          <option value="keeway">Keeway</option>
          <option value="kinroad">Kinroad</option>
          <option value="kove">KOVE</option>
          <option value="ktm">KTM</option>
          <option value="kxd">KXD</option>
          <option value="kymco">Kymco</option>
          <option value="lambretta">Lambretta</option>
          <option value="lifan">Lifan</option>
          <option value="linhai">Linhai</option>
          <option value="loncin">Loncin</option>
          <option value="longbo">Longbo</option>
          <option value="longjia">Longjia</option>
          <option value="malaguti">Malaguti</option>
          <option value="mbk">MBK</option>
          <option value="mondial">Mondial</option>
          <option value="motogrini">Motogrini</option>
          <option value="moto-guzzi">Moto Guzzi</option>
          <option value="motomania">MotoMania</option>
          <option value="moto-morini">Moto Morini</option>
          <option value="moto-zeta">Moto Zeta</option>
          <option value="mv-agusta">MV Agusta</option>
          <option value="mz">MZ</option>
          <option value="nitro">Nitro</option>
          <option value="nitro-motors">Nitro motors</option>
          <option value="nsu">NSU</option>
          <option value="odes-atv">Odes ATV</option>
          <option value="orion">Orion</option>
          <option value="peda">Peda</option>
          <option value="peugeot">Peugeot</option>
          <option value="piaggio">Piaggio</option>
          <option value="polaris">Polaris</option>
          <option value="puch">Puch</option>
          <option value="qingqi">Qingqi</option>
          <option value="qjmotor">QJMOTOR</option>
          <option value="qooder">Qooder</option>
          <option value="quick">Quick</option>
          <option value="rieju">Rieju</option>
          <option value="royal-enfield">Royal Enfield</option>
          <option value="russkaja-mekhanika">Russkaja Mekhanika</option>
          <option value="sachs">Sachs</option>
          <option value="segway">Segway</option>
          <option value="sherco">Sherco</option>
          <option value="shineray">Shineray</option>
          <option value="sky">Sky</option>
          <option value="smc">SMC</option>
          <option value="sonik">Sonik</option>
          <option value="sprint">Sprint</option>
          <option value="stels">Stels</option>
          <option value="sunra">Sunra</option>
          <option value="sunra-e-bike">Sunra E-Bike</option>
          <option value="super-soco">Super SOCO</option>
          <option value="suzuki">Suzuki</option><option value="sym">Sym</option>
          <option value="tao-motor">Tao Motor</option><option value="tgb">TGB</option>
          <option value="tomos">Tomos</option><option value="trio">Trio</option><option value="triumph">Triumph</option><option value="tvs">TVS</option><option value="vespa">Vespa</option><option value="victory">Victory</option><option value="voge">Voge</option><option value="xinling">Xinling</option><option value="xtreme-motors">Xtreme Motors</option><option value="yadea">Yadea</option><option value="yamaha">Yamaha</option><option value="yamasaki">Yamasaki</option><option value="yiben">Yiben</option><option value="zongshen">Zongshen</option><option value="zontes">Zontes</option><option value="ostalo">Ostalo</option></select>
        </div>
        <!-- Model -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Model</label>
          <input
            type="text"
            name="model"
            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
            maxlength="25"
          />
        </div>
        <!-- Godiste -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Godište</label>
          <input
            type="number"
            name="godiste"
            min="1900"
            max="2025"
            step="1"
            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Kubikaža</label>
          <input
            type="number"
            name="kubikaza"
            min="100"
            max="1500"
            step="1"
            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Snaga (kW)</label>
          <input
            type="number"
            name="snaga"
            min="1"
            max="1000"
            step="1"
            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          />
        </div>
        <!-- Cena -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Cena</label>
          <input
            type="number"
            name="cena"
            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
            min="1"
            max="1000000"
          />
        </div>
        <!-- Kilometraza -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Kilometraža</label>
          <input
            type="number"
            name="kilometraza"
            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
            min="0"
            max="1000000"
          />
        </div>
        <!-- Mesto -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Mesto</label>
          <input
            type="text"
            name="mesto"
            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
            maxlength="30"
          />
        </div>
        <div class="my-4">
          <label class="flex items-center">
            <input
              type="checkbox"
              name="prvi_vlasnik"
              class="form-checkbox h-4 w-4 text-yellow-500 transition duration-150 ease-in-out"
            />
            <span class="ml-2 text-sm text-gray-700">Da li ste prvi vlasnik?</span>
          </label>
        </div>
        <div class="my-4">
          <label class="flex items-center">
            <input
              type="checkbox"
              name="registrovan"
              class="form-checkbox h-4 w-4 text-yellow-500 transition duration-150 ease-in-out"
            />
            <span class="ml-2 text-sm text-gray-700">Da li je vozilo registrovano?</span>
          </label>
        </div>
        <!-- Opis -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Dodatna oprema</label>
          <textarea
            name="dodatna_oprema"
            rows="4"
            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Opis</label>
          <textarea
            name="opis"
            rows="4"
            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          ></textarea>
        </div>
        <!-- Slika -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Slike (Max. 4 slike)</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            class="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-white hover:file:bg-yellow-600"
          />
          <label for="" class="w-full text-sm font-semibold text-yellow-500" v-if="error">{{ error }}</label>
        </div>
        <!-- Submit Button -->
        <div class="flex justify-end">
          <button
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Postavi Oglas
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRuntimeConfig } from '#app'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const successPost=ref(false)
const fetchWithAuth=useNuxtApp().$fetchWithAuth
const formRef = ref(null)
const config = useRuntimeConfig()
const error=ref("")
const loading = ref(false)
const router=useRouter()
const handleSubmit = async (event) => {
  event.preventDefault()
  
  const form = event.target
  const formData = new FormData(form)
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user.id
   
  // Add user ID to FormData
  
    formData.append('user', userId)
    formData.append('slikaPaths',[])
    formData.append('pregledi',0)
    const files = formData.getAll('images')  // Get all selected files

  // Check if the number of files exceeds 4
  if (files.length > 4) {
    error.value = 'Možete postaviti maksimalno 4 slike.'
    return
  }
  const isFirstOwner = formData.get('prvi_vlasnik') ? true : false
  const isRegistered = formData.get('registrovan') ? true : false
  formData.set('prvi_vlasnik', isFirstOwner)
  formData.set('registrovan', isRegistered)
  loading.value=true
  try {
    const response = await $fetch(`${config.public.apiUrl}/api/postMotocikl/`, {
      method: 'POST',
      body: formData,
      headers:{
        Authorization:`Bearer ${useMainStore().accessToken}`
      }
    })

      successPost.value=true
      console.log('Oglas uspešno postavljen')
      setTimeout(() => {
     
       navigateTo(`/profile/user/${userId}`)
    }, 2000)
      
  
    loading.value=false
  } catch (error) {
    if(error.status==401){
      window.location.href="/login"
    }else{
      console.error('Greška pri postavljanju oglasa:', error)
      loading.value=false
    }
    
  }
}
</script>

  