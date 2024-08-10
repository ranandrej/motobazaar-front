import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'

export const useNotificaionStore = defineStore('notification', () => {
 const notification=ref({
    message:"",
    color:""
 })
 return {notification}
})
