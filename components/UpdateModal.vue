<script setup>
import { useMainStore } from '~/stores/main'
import { useRuntimeConfig } from '#app'
import { useRouter } from 'vue-router'


const config = useRuntimeConfig()
const router = useRouter()
const formData=ref({})
const izmenaSuccess=ref(false)
const loading=ref(false)

async function izmena(motocikl) {
   // Resetuje poruku o grešci
   loading.value=true
  try {
    const data = await $fetch(`${config.public.apiUrl}/api/updateMotocikl/`, {
      method: 'PUT',
      headers:{
        Authorization:`Bearer ${localStorage.getItem('access_token')}`
      },
    
    body:motocikl
    })
   
    
    loading.value=false
    izmenaSuccess.value=true
    setTimeout(() => {
      useMainStore().isUpdateModalOpen=false
      navigateTo(`/oglas/motocikli/${useMainStore().selectedMotocikl.id}`)
    }, 2500);
    
     // Preusmerava na početnu stranicu
  } catch (error) {
    if(error.status==401){
        window.location.href="/login"
    }else{
        console.log(error)
        loading.value=false
    }
  }
}

</script>
<template>
    <!-- Overlay -->
     <SuccessAlert v-if="izmenaSuccess" :message="'Uspešno izmenjen oglas'"/>
     <Loading v-if="loading"/>
    <div class="fixed top-0 left-0 p-6 w-full h-full z-40 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div id="crud-modal"   class=" overflow-y-auto overflow-x-hidden fixed mx-auto z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full mx-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Izmena informacija
                </h3>
                <button @click="useMainStore().isUpdateModalOpen=false" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <form @submit.prevent="izmena(useMainStore().selectedMotocikl)" class="p-4 md:p-5">
                <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Marka</label>
                        <select v-model="useMainStore().selectedMotocikl.marka" name="name" id="name" class="bg-gray-50 border w-2/3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required>
                          <option value="Access Motor">Access Motor</option>
                    <option value="Aeon">Aeon</option><option value="Alligator">Alligator</option>
                    <option value="Apollo">Apollo</option><option value="Aprilia">Aprilia</option>
                    <option value="Arctic Cat">Arctic Cat</option><option value="Baotian">Baotian</option>
                    <option value="Barossa">Barossa</option><option value="Bashan">Bashan</option>
                    <option value="Benelli">Benelli</option><option value="Beta">Beta</option>
                    <option value="BMW">BMW</option><option value="Bombardier">Bombardier</option>
                    <option value="Buell">Buell</option><option value="Cagiva">Cagiva</option>
                    <option value="Can-am">Can-am</option><option value="CCM">CCM</option>
                    <option value="CFMOTO">CFMOTO</option><option value="Corvus">Corvus</option>
                    <option value="CPI">CPI</option><option value="Daelim">Daelim</option>
                    <option value="Daytona Motors">Daytona Motors</option>
                    <option value="Derbi">Derbi</option>
                    <option value="Dinli">Dinli</option>
                    <option value="Ducati">Ducati</option>
                    <option value="Dürkopp">Dürkopp</option>
                    <option value="Ellite Moto">Ellite Moto</option>
                    <option value="Factory bike">Factory bike</option>
                    <option value="Falcon">Falcon</option>
                    <option value="Feline">Feline</option>
                    <option value="Gas Gas">Gas Gas</option>
                    <option value="Geely">Geely</option>
                    <option value="Genergia">Genergia</option>
                    <option value="Gilera">Gilera</option>
                    <option value="Goes">Goes</option>
                    <option value="Harley Davidson">Harley Davidson</option>
                    <option value="Hercules">Hercules</option>
                    <option value="Hisun">Hisun</option>
                    <option value="Honda">Honda</option>
                    <option value="Huaihai">Huaihai</option>
                    <option value="Husaberg">Husaberg</option>
                    <option value="Husqvarna">Husqvarna</option>
                    <option value="Hyosung">Hyosung</option>
                    <option value="Indian">Indian</option>
                    <option value="Jawa">Jawa</option>
                    <option value="Jiajue">Jiajue</option>
                    <option value="Jialing">Jialing</option>
                    <option value="Jinlun">Jinlun</option>
                    <option value="JMSTAR">JMSTAR</option>
                    <option value="Jonway">Jonway</option>
                    <option value="K-MOTO">K-MOTO</option>
                    <option value="Kawasaki">Kawasaki</option>
                    <option value="Kayo">Kayo</option>
                    <option value="Keeway">Keeway</option>
                    <option value="Kinroad">Kinroad</option>
                    <option value="KOVE">KOVE</option>
                    <option value="KTM">KTM</option>
                    <option value="KXD">KXD</option>
                    <option value="Kymco">Kymco</option>
                    <option value="Lambretta">Lambretta</option>
                    <option value="Lifan">Lifan</option>
                    <option value="Linhai">Linhai</option>
                    <option value="Loncin">Loncin</option>
                    <option value="Longbo">Longbo</option>
                    <option value="Longjia">Longjia</option>
                    <option value="Malaguti">Malaguti</option>
                    <option value="MBK">MBK</option>
                    <option value="Mondial">Mondial</option>
                    <option value="Motogrini">Motogrini</option>
                    <option value="Moto Guzzi">Moto Guzzi</option>
                    <option value="MotoMania">MotoMania</option>
                    <option value="Moto Morini">Moto Morini</option>
                    <option value="Moto Zeta">Moto Zeta</option>
                    <option value="MV Agusta">MV Agusta</option>
                    <option value="MZ">MZ</option>
                    <option value="Nitro">Nitro</option>
                    <option value="Nitro motors">Nitro motors</option>
                    <option value="NSU">NSU</option>
                    <option value="Odes ATV">Odes ATV</option>
                    <option value="Orion">Orion</option>
                    <option value="Peda">Peda</option>
                    <option value="Peugeot">Peugeot</option>
                    <option value="Piaggio">Piaggio</option>
                    <option value="Polaris">Polaris</option>
                    <option value="Puch">Puch</option>
                    <option value="Qingqi">Qingqi</option>
                    <option value="QJMOTOR">QJMOTOR</option>
                    <option value="Qooder">Qooder</option>
                    <option value="Quick">Quick</option>
                    <option value="Rieju">Rieju</option>
                    <option value="Royal Enfield">Royal Enfield</option>
                    <option value="Russkaja Mekhanika">Russkaja Mekhanika</option>
                    <option value="Sachs">Sachs</option>
                    <option value="Segway">Segway</option>
                    <option value="Sherco">Sherco</option>
                    <option value="Shineray">Shineray</option>
                    <option value="Sky">Sky</option>
                    <option value="SMC">SMC</option>
                    <option value="Sonik">Sonik</option>
                    <option value="Sprint">Sprint</option>
                    <option value="Stels">Stels</option>
                    <option value="Sunra">Sunra</option>
                    <option value="Sunra E-Bike">Sunra E-Bike</option>
                    <option value="Super SOCO">Super SOCO</option>
                    <option value="Suzuki">Suzuki</option><option value="Sym">Sym</option>
                    <option value="Tao Motor">Tao Motor</option><option value="TGB">TGB</option>
                    <option value="Tomos">Tomos</option><option value="Trio">Trio</option><option value="Triumph">Triumph</option><option value="TVS">TVS</option><option value="Vespa">Vespa</option><option value="Victory">Victory</option><option value="Voge">Voge</option><option value="Xinling">Xinling</option><option value="Xtreme Motors">Xtreme Motors</option><option value="Yadea">Yadea</option><option value="Yamaha">Yamaha</option><option value="Yamasaki">Yamasaki</option><option value="Yiben">Yiben</option><option value="Zongshen">Zongshen</option><option value="Zontes">Zontes</option><option value="Ostalo">Ostalo</option></select>
                
          
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="model" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Model</label>
                        <input v-model="useMainStore().selectedMotocikl.model" type="text" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600   w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="godiste" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Godište</label>
                       <input v-model="useMainStore().selectedMotocikl.godiste" type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  required>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="kubikaza" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kubikaža</label>
                       <input v-model="useMainStore().selectedMotocikl.kubikaza" type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  required>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="snaga" class=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Snaga (KW)</label>
                       <input v-model="useMainStore().selectedMotocikl.snaga" type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  required>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="cena" class=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Cena €</label>
                       <input v-model="useMainStore().selectedMotocikl.cena" type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  required>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="mesto" class=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Mesto</label>
                       <input v-model="useMainStore().selectedMotocikl.mesto" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  required>
                    </div>
                    <div class="col-span-2">
                        <label for="description" class=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Dodatna Oprema</label>
                        <textarea id="dodatna_oprema" v-model="useMainStore().selectedMotocikl.dodatna_oprema" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>                    
                    </div>
                    <div class="col-span-2">
                        <label for="description" class=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Opis</label>
                        <textarea id="opis" v-model="useMainStore().selectedMotocikl.opis" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>                    
                    </div>
                </div>
                <button type="submit" class="text-white inline-flex items-center bg-yellow-500  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Izmeni oglas
                </button>
            </form>
        </div>
    </div>
</div> 

      <!-- Modal -->
    </div>
  </template>