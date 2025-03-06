<script setup>
import { ref } from 'vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/store/cart.js';

const router = useRouter();

const cartStore = useCartStore();
const props = defineProps({
  cart: {
    type: Array,
    default: () => []
  }
});
const checkoutCart = computed(() => {
  const grouped = {};

  props.cart.forEach((item) => {
    const key = `${item.shirtname}-${item.shirtedition}`;

    if (!grouped[key]) {
      grouped[key] = {
        ...item,
        sizes: {},
        totalPrice: 0,
      };
    }
    if (!grouped[key].sizes[item.size]) {
      grouped[key].sizes[item.size] = 0;
    }
    grouped[key].sizes[item.size] += item.quantity;
    console.log("this is the sizes", Object.entries(grouped[key].sizes))
    grouped[key].totalPrice += parseFloat((item.quantity * item.shirtprice).toFixed(2));
  });
  console.log("thisi s my groupsed objects", Object.values(grouped))
  
  return Object.values(grouped);
});

function calculateCheckoutPrice(){
  var checkoutprice = 0
  for (const item of props.cart){
    checkoutprice += item.shirtprice *item.quantity;
  }
  return checkoutprice.toFixed(2)
}
const name = ref('');
const email = ref('');
const phone = ref('');
const countryCode = ref('+65');




async function submitCheckout() {
  const numberreg = /^[0-9]{8}$/
  if (!name.value || !email.value || !phone.value || !numberreg.test(phone.value)) {
        alert('Please fill in all fields correctly before submitting.');
        return; 
    }

    try {
        const response = await fetch('http://localhost:5000/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                phone: phone.value,
                cart: checkoutCart.value,
            }),
        });

        if (response.ok) {
            alert('Purchase request submitted successfully!');
            cartStore.clearCart()
            router.push('/shop')
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
      <button @click="$router.push('/shop')" class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 hover:cursor-pointer">✕</button>
      <h2 class="text-2xl font-semibold mb-4">Checkout</h2>
      
      <form @submit.prevent="submitCheckout" class="space-y-4">
        <div class="flex flex-col">
          <label for="name" class="font-medium">Name</label>
          <input v-model="name" required id="name" type="text" placeholder="Enter your name" class="border p-2 rounded-md">
        </div>

        <div class="flex flex-col">
          <label for="email" class="font-medium">Email</label>
          <input v-model="email" required id="email" type="email" placeholder="Enter your email" class="border p-2 rounded-md">
        </div>

        <div class="flex flex-col">
          <label for="phone" class="font-medium">Phone Number</label>
          <div class="flex">
            <select required v-model="countryCode" class="border p-2 rounded-md bg-gray-100 w-25 mr-1">
              <option value="+1">+65 (SG)</option>
            </select>
          <input v-model="phone" id="phone" type="tel" placeholder="Enter your phone number" class="border p-2 rounded-md w-full">
          </div>
        </div>
        <div class="h-fit">
          <div class="cart-item h-25 flex items-center" v-for="item in checkoutCart" :key="item.shirtname">
              <img class="cart-item-img w-1/4" :src="`/images/${item.sampleimg}`">
              <div class="cart-item-details w-5/6 flex flex-col gap-2">
                <p class=" text-m">
                  {{item.shirtname}}
                </p>
                <div class="flex justify-start gap-2 ">
                  <h4 class="text-xs italic text-gray-700">
                    {{item.shirtedition}}
                  </h4>
                  <div class="sizes flex gap-1 items-center flex-wrap">
                    <p class="text-xs italic text-gray-700">Sizes:</p>
                    <div v-for="(quantity, size) in item.sizes" :key="size" class="text-xs italic ">
                      {{ quantity }} x {{ size }}
                    </div>
                  </div>
                <div class="quantityAdjustment flex gap-3 items-center justify-start">
                </div>
              </div>
              <div>${{item.totalPrice}}</div>
            </div>
          </div>
          <div class="text-right mt-2 mb-2">Subtotal: ${{calculateCheckoutPrice()}}</div> 
        
      </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Submit Order
        </button>
      </form>
      
      <button @click="$router.push('/shop')" class="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300">
        Back to Shop
      </button>
    </div>
  </div>
</template>

