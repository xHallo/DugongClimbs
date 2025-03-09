<script setup>
import instagramicon from "./icons/instagramicon.vue"
import  phoneicon from "./icons/phone.vue"
</script>

<template>
  <div class="flex flex-row justify-between w-full h-full py-5">
    <div class="lg:flex w-full hidden "></div>
    <div class="relative flex items-center justify-center space-x-2 w-full ">
      <img src="/images/dugonglogo.png" alt="dugong" class=" absolute lg:h-30 h-20   ">
    </div>
    <div class="flex justify-center items-center w-full ">
      <div class="justify-center w-full flex items-center gap-5"> 
        <p class="text-s hidden lg:text-lg lg:flex text-center">Contact us:</p>
        <div>
          <div class="flex items-center space-x-2">
            <a href="https://www.instagram.com/dugongclimbs/" target="_blank">
              <instagramicon />
            </a>
            <p class="font-display text-s lg:text-lg w-full">@dugongclimbs</p>
          </div>
          <div class="flex items-center space-x-2">
            <div>
              <phoneicon />
            </div>
            <p class="font-display text-s lg:text-lg w-full text-gray-600 italic"> Available Soon!</p>
          </div>
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
