<template>
  <div class="flex flex-col items-center p-6 space-y-6">
    <h2 class="text-2xl font-semibold">Checkout</h2>

    <!-- Cart Items Display -->
    <div class="w-full bg-white p-4 rounded-lg shadow-md">
      <h3 class="text-lg font-semibold">Items in Your Cart</h3>
      <div class="space-y-4 mt-4">
        <!-- Loop through cart items and display them -->
        <div v-for="(item, index) in cartItems" :key="index" class="flex justify-between border-b pb-2">
          <span>{{ item.name }} (x{{ item.quantity }})</span>
          <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
        </div>
      </div>
    </div>

    <!-- Subtotal Display -->
    <div class="w-full bg-white p-4 rounded-lg shadow-md mt-6">
      <div class="flex justify-between font-semibold">
        <span>Subtotal</span>
        <span>${{ subtotal.toFixed(2) }}</span>
      </div>
    </div>

    <!-- Payment Form (You can add a payment form here) -->
    <form @submit.prevent="submitCheckout" class="w-full bg-white p-4 rounded-lg shadow-md mt-6">
      <h3 class="font-semibold">Enter Payment Information</h3>
      <!-- Add your form fields here -->
      <button type="submit" class="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
        Pay Now
      </button>
    </form>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Define props to receive data from the parent component
const props = defineProps({
  cartItems: {
    type: Array,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
});

const submitCheckout = () => {
  alert('Payment processed successfully! 🎉');
  // Implement your payment submission logic here
};
</script>
