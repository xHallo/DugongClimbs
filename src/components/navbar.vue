<script setup>
import { ref } from "vue";

const isOpen = ref(false);
const navbarelements=["Home", "About Us", "Shop", "FAQ", "Suggestion Box"]
</script>


<template>
  <nav class="font-nav my-2 font-display space-x-6 font-bold border-y-4  h-full w-full border-brown-300  text-xl" >
    <div class="lg:px-10 xl:px-30 2xl:px-60 relative flex justify-between items-center h-full w-full ">
        <button @click="isOpen = !isOpen" class="lg:hidden hover:cursor-pointer absolute left-2 top-2">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      <div class="hidden lg:flex space-x-6 w-full flex justify-between items-center">
        <router-link v-for="element in navbarelements" class="text-center hover:underline px-3  hover:opacity-75 hover:-translate-y-0.5 transition-all w-40 " :to="`/${element.replace(/\s*Home\s*|\s+/g,'')}`">{{element}}</router-link>
      </div>
    </div>
    <div v-if="isOpen" class="absolute shadow-md lg:hidden flex flex-col items-center">
      <router-link  v-for="element in navbarelements" class="z-50 hover:underline bg-white w-35 text-center p-1 border" :to="`/${element.replace(/\s*Home\s*|\s+/g,'')}`">{{ element }}</router-link>
    </div>
  </nav>
</template>
