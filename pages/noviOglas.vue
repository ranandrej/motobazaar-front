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
         <option value="" >Marka</option>
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
            min="1"
            max="2000"
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
            step="0.1"
            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          />
        </div>
        <!-- Cena -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Cena (€)</label>
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
          <input @input="handleFileInput"
            type="file"
            name="images"
            accept="image/*"
            multiple
            class="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-white hover:file:bg-yellow-600"
          />
          <label for="" class="w-full text-sm font-semibold text-yellow-500" v-if="error">{{ error }}</label>
          <NuxtLink v-if="showLogin" class="mt-1 cursor-pointer text-blue-400 underline" to="/login">Prijavite se</NuxtLink>
          <div v-if="imagePreviews.length > 0" class="my-4 grid md:grid-cols-3 grid-cols-1 gap-4">
      <div v-for="(image, index) in imagePreviews" :key="index" class="relative overflow-y-hidden group">
        <img :src="image.src" :style="{ transform: `rotate(${image.rotation}deg)` }" class="overflow-y-hidden h-52 w-full object-cover" />

        <!-- Rotate button -->
        <button @click.prevent="rotateImage(index)" class="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-80 group-hover:opacity-100">
          Rotate
        </button>
      </div>
    </div>
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
import { ref,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import EXIF from 'exif-js'

const successPost=ref(false)
const fetchWithAuth=useNuxtApp().$fetchWithAuth
const formRef = ref(null)
const config = useRuntimeConfig()
const error=ref("")
const loading = ref(false)
const router=useRouter()
const showLogin=ref(false)
const imagePreviews = ref([])

const handleSubmit = async (event) => {
  
  event.preventDefault();

  error.value = "";
  const form = event.target;
  const formData = new FormData(form);
  const user = JSON.parse(localStorage.getItem('user'));
  let userId = "";

  if (!user) {
    showLogin.value = true;
    error.value = "Prijavite se ili kreirajte nalog da bi postavili oglas!";
    return;
  }
  if (user.id) {
    userId = user.id;
    showLogin.value = false;
  } else {
    error.value = "Invalid user";
    return;
  }

  // Add user ID and other data to FormData
  formData.append('user', userId);
  formData.append('slikaPaths', []);
  formData.append('pregledi', 0);

  // Append images and their rotation metadata
  imagePreviews.value.forEach((preview, index) => {
    // Append file
    formData.append('images[]', preview.file); // Append file to 'images'
    formData.append(`rotation_${index}`, preview.rotation.toString());
  });

  const isFirstOwner = formData.get('prvi_vlasnik') ? true : false;
  const isRegistered = formData.get('registrovan') ? true : false;
  formData.set('prvi_vlasnik', isFirstOwner);
  formData.set('registrovan', isRegistered);

  loading.value = true;

  try {
    const response = await $fetch(`${config.public.apiUrl}/api/postMotocikl/`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${useMainStore().accessToken}`
      }
    });

    successPost.value = true;
    console.log('Oglas uspešno postavljen');
    setTimeout(() => {
      navigateTo(`/profile/user/${userId}`);
    }, 2000);

    loading.value = false;
  } catch (error) {
    if (error.status === 401) {
      window.location.href = "/login";
    } else {
      console.error('Greška pri postavljanju oglasa:', error);
      error.value = "Greška pri postavljanju oglasa";
      loading.value = false;
    }
  }
}
const handleFileInput = () => {
 
  error.value = "";
  const files = event.target.files;
  imagePreviews.value = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = (e) => {
      // Store file and initial rotation in imagePreviews
      imagePreviews.value.push({
        file: file, // Keep the original file reference
        src: e.target.result,
        rotation: 0 // Default rotation
      });
    };

    reader.readAsDataURL(file);
  }
}
const rotateImage = (index) => {
  // Rotate the image by 90 degrees
  imagePreviews.value[index].rotation += 90
  if (imagePreviews.value[index].rotation === 360) {
    imagePreviews.value[index].rotation = 0
  }
}
</script>

  