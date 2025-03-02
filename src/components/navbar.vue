<script setup>


const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')
</script>

<template>
  <nav class="font-nav flex font-display justify-between items-center space-x-6 font-bold border-y-4  w-full border-brown-300 h-2/7 text-xl" >
              <div ></div>
              <a href="#" class="hover:underline">Home</a>
              <a href="#" class="hover:underline">Shop</a>
              <a href="#" class="hover:underline">Members</a>
              <a href="#" class="hover:underline">Join Us!</a>
              <a href="#" class="hover:underline">Blog</a>
              <div></div>
          </nav>
</template>
