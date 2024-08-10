
<script setup>
import { useNotificaionStore } from '~/stores/notification';
const props = defineProps(['message'])
</script>
<template>
    <div class="w-full fixed top-0 z-50 flex justify-center ites-center p-6 fade-out">
        <div class="p-4 mb-4  text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          <span class="font-medium">{{ props.message }}</span> 
        </div>
    </div>
</template>
<style scoped>
 .fade-out {
            /* Initial styling for the element */
            opacity: 1;
            transition: opacity 2s ease-out; /* Smooth transition over 2 seconds */
            animation: fadeOut 5s forwards; /* Trigger the fade-out animation */
            animation-delay: 3s; /* Start animation after 3 seconds */
        }

        /* Keyframes for fade-out effect */
        @keyframes fadeOut {
            0% {
                opacity: 1; /* Fully visible */
            }
            60% {
                opacity: 1; /* Maintain full visibility before starting fade */
            }
            100% {
                opacity: 0; /* Fully invisible */
            }
        }


</style>