<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-row justify-between w-full h-4/6">
            <div class="flex items-center justify-center space-x-2 w-1/3 ">
              <img src="" alt="Instagram" class="w-100 h-6">
            </div>
            <div class="flex items-center justify-center space-x-2 w-1/3">
              <img src="" alt="dugong" class="w-100 h-6">
            </div>
            <div class="w-1/3 flex items-center justify-evenly ">
              <p>Contact us:</p>
              <div>
                <p class="font-display">Email: ryanwee@gmail.com</p>
                <p>Phone: +65 999 999 999</p>
              </div>
            </div>
          </div>
</template>

<style scoped>

</style>
