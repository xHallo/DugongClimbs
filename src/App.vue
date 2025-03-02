<script setup>
import topheading from '@/components/logoandheading.vue'
import navbar from '@/components/navbar.vue'
import checkoutpage from '@/components/checkoutpage.vue'
import mainbody from '@/components/mainbody.vue'
import footersection from '@/components/footer.vue'
import {ref} from "vue";
const hideCheckout = ref(true)
function openCheckout(value){
  hideCheckout.value = value;
}
</script>

<template>
  <div class="">
    <header class="bg-peach flex flex-col justify-between items-center h-48">
        <topheading />
        <navbar />
    </header>
    <checkoutpage :hideCheckoutPage="hideCheckout" @closeCheckout="openCheckout"/>
    <mainbody @openCheckout="openCheckout"/>
    <footersection />
  </div>
</template>

<style scoped>

</style>
