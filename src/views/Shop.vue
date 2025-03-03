<script setup>
import checkoutpage from '@/components/checkoutpage.vue'
import mainbody from '@/components/mainbody.vue'
import {ref} from "vue";
const hideCheckout = ref(true)
function openCheckout(value){
  hideCheckout.value = value;
}
</script>

<template>
    <checkoutpage :hideCheckoutPage="hideCheckout" @closeCheckout="openCheckout"/>
    <mainbody @openCheckout="openCheckout"/>
</template>

<style scoped>

</style>
