<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const cartdet = ref(route.params.cartdet || []); 
onMounted(() => {
  console.log('Cart Data in Checkout.vue:', cartdet.value);
});
const name = ref('');
const email = ref('');
const phone = ref('');
const countryCode = ref('+1');


async function submitCheckout(name, email, phone, cart) {
    try {
        const response = await fetch('http://localhost:5000/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, cart}),
        });
        if (response.ok) {
            alert('Purchase request submitted successfully!');
        } else {
            alert('Failed to submit purchase request.');
        }
    } catch (error) {
        console.error('Error submitting purchase request:', error);
    }
}
</script>
<template>
  <div class="fixed inset-0 bg-black/50  flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
      <button @click="$router.push('/shop')" class="absolute top-3 right-3 text-gray-500 hover:text-gray-700">✕</button>
      <h2 class="text-2xl font-semibold mb-4">Checkout</h2>
      
      <!-- Checkout Form -->
      <form @submit.prevent="submitCheckout" class="space-y-4">
        <div class="flex flex-col">
          <label for="name" class="font-medium">Name</label>
          <input v-model="name" id="name" type="text" placeholder="Enter your name" class="border p-2 rounded-md">
        </div>

        <div class="flex flex-col">
          <label for="email" class="font-medium">Email</label>
          <input v-model="email" id="email" type="email" placeholder="Enter your email" class="border p-2 rounded-md">
        </div>

        <div class="flex flex-col">
          <label for="phone" class="font-medium">Phone Number</label>
          <div class="flex">
            <select v-model="countryCode" class="border p-2 rounded-md bg-gray-100 w-25 mr-1">
              <option value="+1">+65 (SG)</option>
            </select>
          <input v-model="phone" id="phone" type="tel" placeholder="Enter your phone number" class="border p-2 rounded-md w-full">
          </div>
        </div>
        <div class="h-50">
          <div v-for="item in cartdet" :key="item.shirtname">
            <div class="flex flex-col items-start">
              <p>{{ item.shirtname }} </p>
              <p>{{ item.shirtedition }} </p>
            </div>
            <p>{{ item.shirtprice * item.quantity }}</p>
          </div>
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Complete Purchase
        </button>
      </form>
      
      <button @click="$router.push('/shop')" class="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300">
        Back to Shop
      </button>
    </div>
  </div>
</template>

