import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'

export const useMainStore = defineStore('main', () => {
  const isMenuOpen = ref(false)
  const isLogoutModalOpen = ref(false)
  const isDeleteModalOpen = ref(false)
  const isRemoveModalOpen = ref(false)
  const isUpdateModalOpen = ref(false)
  const isUpdateUserModalOpen = ref(false)
  const isPrijavaModalOpen=ref(false)
  const token = ref("")
  const currentUser = ref({}) 
  const selectedMotocikl= ref({})// Start with an empty object
  const accessToken=ref("")
  // Initialize currentUser from localStorage when the component is mounted
  
  onMounted(() => {
   
    currentUser.value = JSON.parse(localStorage.getItem('user')) || {}
    accessToken.value = localStorage.getItem('access_token') || ""
   
 })
  return { isMenuOpen,isPrijavaModalOpen,currentUser,selectedMotocikl,accessToken, isLogoutModalOpen,isDeleteModalOpen,isUpdateModalOpen, token,isUpdateUserModalOpen,isRemoveModalOpen }
})
