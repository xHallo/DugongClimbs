<script setup>
import topheading from '@/components/logoandheading.vue'
import navbar from '@/components/navbar.vue'
import mainbody from '@/components/mainbody.vue'
import footersection from '@/components/footer.vue'

</script>

<template>

  <body>
      <header class="bg-peach flex flex-col justify-between items-center h-48">
          <topheading />
          <navbar />
      </header>
      <mainbody />
      <footersection />
  </body>
</template>

<style scoped>

</style>
