<script setup>
import { useRoute } from "vue-router";
import topheading from '@/components/logoandheading.vue'
import navbar from '@/components/navbar.vue'
import footersection from '@/components/footer.vue'

const route = useRoute();
</script>

<template>
  <div class="flex flex-col min-h-screen min-w-screen w-screen">
    <header v-if="route.path !== '/'"  class="bg-peach flex flex-col justify-between items-center h-48 min-w-screen">
        <topheading />
        <navbar />
    </header>

    <main class="flex flex-col flex-grow justify-center">
      <router-view></router-view>
    </main>

    <footersection v-if="route.path !== '/'"  class="h-fit" />
  </div>
</template>

<style scoped>
</style>
