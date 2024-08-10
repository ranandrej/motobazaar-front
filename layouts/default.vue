<script setup>
import { useMainStore } from '~/stores/main'
import { onMounted } from 'vue'
const store = useMainStore()
const {isMenuOpen}=store
console.log(useMainStore().currentUser.value)
</script>

   <template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <div class="w-full m-0 min-h-[100px] z-40 sticky top-0 bg-slate-800 flex p-3">
      <div class="flex justify-between w-full items-center">
        <div class="flex">
        <h2 class="m-2 text-xl text-white font-thin">
          MOTO|<span class="text-yellow-500">BAZAAR</span>
        </h2>
        <NuxtLink class="md:flex hidden items-center text-white hover:text-yellow-500 mx-3" to="/"> Početna</NuxtLink>
        <NuxtLink class="md:flex hidden items-center text-white hover:text-yellow-500 mx-3" to="/blogs"> Blog</NuxtLink>
        <NuxtLink class="md:flex hidden items-center text-white hover:text-yellow-500 mx-3" to="/#kontakt"> Kontakt</NuxtLink>
      </div>
        <div class="hidden sm:flex p-4 m-0 justify-start items-center">
          <NuxtLink
            to="/login"
            class="bg-transparent text-white cursor-pointer mx-1 flex items-center p-2"
            v-if="Object.keys(store.currentUser).length == 0"
          >
            <Icon class="m-1 hover:text-yellow-500" size="18" name="ic:baseline-log-in" />
            Prijava
          </NuxtLink>
          <button
            class="bg-transparent text-white cursor-pointer mx-1 flex items-center p-2"
            v-if="Object.keys(store.currentUser).length > 0"
            @click="useMainStore().isLogoutModalOpen=true"
          >
            <Icon class="m-1 hover:text-yellow-500" size="18" name="ic:baseline-log-out" />
            Odjava
          </button>
          <NuxtLink to="/register"
            class="bg-transparent text-white cursor-pointer mx-1 flex items-center p-2"
            v-if="Object.keys(store.currentUser).length == 0"
          >
            <Icon class="m-1 hover:text-yellow-500" size="18" name="ic:sharp-person-add" />
            Registracija
          </NuxtLink>
          <button
            class="bg-transparent text-white cursor-pointer mx-1 flex items-center p-2"
            v-if="Object.keys(store.currentUser).length > 0"
          >
            <Icon class="m-1 hover:text-yellow-500" size="20" name="ic:sharp-person" />
            {{ useMainStore().currentUser.name }}
          </button>
          <NuxtLink
            v-if="Object.keys(store.currentUser).length > 0"
            :to="`/profile/user/${useMainStore().currentUser.id}`"
            class="text-yellow-500 mx-1"
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
        <div class="sm:hidden flex p-2 m-0 justify-start items-center">
          <button
            @click="useMainStore().isMenuOpen=true"
            class="text-yellow-500 font-medium text-2xl cursor-pointer"
          >
            <Icon name="mdi:format-list-bulleted" />
          </button>
        </div>
      </div>
    </div>
    <Drawer class="sm:hidden" v-if="useMainStore().isMenuOpen" />
    <LogoutModal v-if="useMainStore().isLogoutModalOpen" />

    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-slate-800 p-5 w-full shadow dark:bg-gray-900">
      <div class="w-full mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <a
            href=""
            class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            
            <h4
              class="self-center md:text-2xl text-xl whitespace-nowrap text-yellow-500 font-thin"
              ><span class="text-white">MOTO</span>|BAAZAR</h4
            >
          </a>
          <ul
            class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400"
          >
            <li>
              <a href="/about" class="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6"
                >Privacy Policy</a
              >
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
            </li>
            <li>
              <a href="/#kontakt" class="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        <hr
          class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
        />
        <span
          class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
          >© 2024
          <a href="/" class="hover:underline">Moto Baazar™</a
          >. All Rights Reserved.</span
        >
      </div>
    </footer>
  </div>
</template>

