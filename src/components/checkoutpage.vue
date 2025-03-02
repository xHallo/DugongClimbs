<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  hideCheckoutPage: {
    type: Boolean,
    default: true,
  },
});

const isCheckoutHidden = ref(props.hideCheckoutPage);

watch(() => props.hideCheckoutPage, (newVal) => {
  console.log("hideCheckoutPage changed:", newVal);
  isCheckoutHidden.value = newVal;
});

</script>

<template>
  <div v-if="!isCheckoutHidden" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-2/3 bg-white rounded-xl z-100">
    <button @click="$emit('closeCheckout', true)" class="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded hover:cursor-pointer">Close</button>
  </div>
  
</template>