<script setup>
import { useRoute } from "vue-router";
import topheading from '@/components/logoandheading.vue'
import navbar from '@/components/navbar.vue'
import footersection from '@/components/footer.vue'

const route = useRoute();
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header v-if="route.path !== '/'"  class="bg-peach flex flex-col justify-between items-center h-48">
        <topheading />
        <navbar />
    </header>

    <main class="flex-1">
      <router-view></router-view>
    </main>

    <footersection v-if="route.path !== '/'"  class="mt-auto" />
  </div>
</template>

<style scoped>
</style>
