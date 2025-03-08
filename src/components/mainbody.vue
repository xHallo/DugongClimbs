<script setup>
import itemdisplay from "@/components/itemdisplay.vue";
import searchBar from "@/components/searchBar.vue";
import SelectSize from "@/components/SelectSize.vue";
import Search from "./icons/search.vue"
import Cart from "./icons/cart.vue"
import "../assets/base.css";
import Deleteicon from "./icons/delete.vue"
import shirtdetails from "../shirts.json";

import {ref, computed, watchEffect, watch} from "vue";
import { useRouter } from 'vue-router';
import { useCartStore } from '@/store/cart';
const cartStore = useCartStore();
const router = useRouter();

const selectedShirt = ref(null);
const shirtdet = ref(shirtdetails);
const showcart = ref(false);
const cartContainer = ref(null)
const scrollbarHeight = ref(0)
const searchFilter = ref("")
const filteredshirtdet = computed(() => {
  if (searchFilter.value !== "") {
    
    return shirtdet.value.filter(shirt => 
      
      shirt.shirtname.toLowerCase().includes(searchFilter.value.toLowerCase()) || 
      shirt.shirtedition.toLowerCase().includes(searchFilter.value.toLowerCase())
      
    );
  } else {
    return shirtdet.value;
  }
});
function filtersearch(filter){
  searchFilter.value = filter
}
const handleCheckout = () => {
  if (cartStore.cart == ""){
    alert("Nothing in cart!")}
  else{
    const cartData = encodeURIComponent(JSON.stringify(cartStore.cart ?? []));
    router.push({ 
      name: 'Checkout', 
      query: { cart: cartData }  
  });
}
};
// Add scrollbar only if height exceeds threshold
  function updateScrollbarHeight() {
  if (cartContainer.value) {
  
    scrollbarHeight.value = cartContainer.value.scrollHeight;
  }
}

watchEffect(() => {
  updateScrollbarHeight();
});

watch(cartStore.cart, () => {
  updateScrollbarHeight();
}, { deep: true });


const cartClasses = computed(() => {
  return `scrollbarfix ease-in-out duration-300 transition-all block absolute w-95 bg-white max-h-120 h-fit border rounded-xl top-12 right-0 p-3 visible peer-hover:visible z-40 ${
  scrollbarHeight.value >= 440 ? "overflow-y-auto" : "overflow-hidden"}`;});

// Cart functions
function selectSize(shirt){
  selectedShirt.value = shirt;
}

import { toRaw } from "vue";

function confirmSize(size) {
  if (!selectedShirt.value) {
    console.log("No Shirt has been selected!");
    return;
  }

  // Make a copy of the selected shirt to prevent reactivity issues
  const newShirt = {
    ...toRaw(selectedShirt.value), // Convert Proxy object to a normal object
    size: size,
    quantity: 1,
  };

  const index = cartStore.cart.findIndex(
    (shirtItem) =>
      shirtItem.shirtname === newShirt.shirtname &&
      shirtItem.shirtedition === newShirt.shirtedition &&
      shirtItem.size === newShirt.size
  );

  if (index !== -1) {
    cartStore.cart[index].quantity++;
  } else {
    cartStore.cart.push(newShirt);
  }

  calculateCartPrice();
  selectedShirt.value = null; 
}

function plusItem(shirt){
  shirt.quantity++
}

function minusItem(shirt){
  if(shirt.quantity>1)
  {shirt.quantity--}
  else{
    cartStore.cart.splice(shirt,1)
  }
 
}
function deleteFromCart(shirt) {
  const index = cartStore.cart.findIndex(
    (item) =>
      item.shirtname === shirt.shirtname &&
      item.shirtedition === shirt.shirtedition &&
      item.size === shirt.size
  );

  if (index !== -1) {
    cartStore.cart.splice(index, 1);
  }
}

function calculateCartPrice(){
  var totalprice = 0
  cartStore.cart.forEach((shirt) => {
    totalprice += shirt.shirtprice * shirt.quantity
  }); 
  return totalprice.toFixed(2);
}
</script>


<template>
  <main class="scrollbarfix bg-peach p-15 h-165 font-display  overflow-y-auto">
    <div class="flex w-full justify-between">
      <h2 class="text-xl w-full lg:text-4xl font-nav ">New Releases</h2>
      <div class="flex justify-between w-95 ">
        <div class="search flex items-center p-1 rounded-xl border-2 ">
          <Search />
          <searchBar @search="filtersearch" />
        </div>
        <div class="relative">
          <button class="peer hover:cursor-pointer pr-1" @click="showcart=!showcart">
            <div v-if="cartStore.cart.length>0" class="rounded-full bg-red-600 h-4 w-4 absolute top-0 right-0 text-xs text-center text-white">{{ cartStore.cart.reduce((total, item) => total + item.quantity, 0) }}</div>
            <Cart />
          </button>
          <div v-if="showcart" ref="cartContainer" :class="cartClasses">
            <h2 class="h-13 text-2xl">My Cart</h2>
            <div class="cart-item h-25 flex " v-for="item in cartStore.cart" :key="item.shirtname">
              <img class="cart-item-img w-2/4" :src="`/images/${item.sampleimg}`">
              <div class="cart-item-details w-5/6 flex flex-col gap-2 pr-4">
                <p class=" text-s">
                  {{item.shirtname}} -- ${{item.shirtprice}}
                </p>
                <div class="flex justify-between">
                  <h4 class="text-xs italic text-gray-700">
                    {{item.shirtedition}}
                  </h4>
                  <h4 class="text-xs italic  text-gray-700">Size: {{ item.size }}</h4>
                </div>
                <div class="quantityAdjustment flex gap-2 items-center justify-start">
                  <button type="button" class="border px-1 hover:cursor-pointer w-5" @click="plusItem(item)">+</button>
                  <p class="w-5 text-center">{{item.quantity}}</p>
                  <button type="button" class="border px-1 hover:cursor-pointer w-5" @click="minusItem(item)">-</button>
                </div>
              </div>
              <button type="delete" class="flex items-center hover:cursor-pointer" @click="deleteFromCart(item)"><Deleteicon /></button>
            </div>
            <div class="h-20 flex justify-center items-center  pb-5" v-if="cartStore.cart.length<1">Your Cart is Empty!</div>
            <div class="flex justify-between border-t border-dashed ">
              <div class="">Subtotal: </div>
              <div> ${{calculateCartPrice()}} </div>
            </div>
            <div class="flex justify-center items-center pt-5">
             <button   @click="handleCheckout" class="bg-black w-2/3 hover:cursor-pointer h-9 rounded-lg text-white" type="Button" >Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    <div class=" relative flex flex-wrap flex-row text-sm justify-start items-center w-full h-fit pt-10 gap-7" >
      <div v-if="filteredshirtdet.length<1" class="flex items-center h-113 text-lg pb-10 opacity-70 w-full justify-center"> No Items Found </div>
      <SelectSize v-if="selectedShirt" :shirtname="selectedShirt.shirtname" :shirtedition = 'selectedShirt.shirtedition' :shirtprice="selectedShirt.shirtprice" :sampleimg="selectedShirt.sampleimg" :backsampleimg="selectedShirt.backsampleimg" @confirmSize = "confirmSize" />
      <div class="z-1" v-for="shirt in filteredshirtdet" :key="shirt.shirtname"  >
        <itemdisplay :shirtname="shirt.shirtname" :shirtedition = 'shirt.shirtedition' :shirtprice="shirt.shirtprice" :sampleimg="shirt.sampleimg" :backsampleimg="shirt.backsampleimg" @additem-Cart="selectSize(shirt)"/>
      </div>
      
    </div>
  </main>
</template>

<style scoped>

</style>
