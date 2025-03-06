<script setup>
import topheading from '@/components/logoandheading.vue'
import navbar from '@/components/navbar.vue'
import mainbody from '@/components/mainbody.vue'
import footersection from '@/components/footer.vue'
import {ref} from "vue";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-peach flex flex-col justify-between items-center h-48">
        <topheading />
        <navbar />
    </header>

    <main class="flex-1">
      <router-view></router-view>
    </main>

    <footersection class="mt-auto" />
  </div>
</template>

<style scoped>
</style>
