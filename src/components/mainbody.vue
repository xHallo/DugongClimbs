<script setup>
import itemdisplay from "@/components/itemdisplay.vue";
import Search from "./icons/search.vue"
import Cart from "./icons/cart.vue"
import Deleteicon from "./icons/delete.vue"
import shirtdetails from "../shirts.json";
import cartdetails from "../cart.json";
import {ref} from "vue";

const shirtdet = ref(shirtdetails);
const cartdet = ref(cartdetails);
const showcart = ref(false);
cartContainer = ref(null)
const cartClasses = computed(() => {
  return `block absolute w-80 bg-white max-h-120 h-fit border rounded-xl top-12 right-0 p-3 visible peer-hover:visible z-40 ${
  scrollbarHeight.value >= 120 ? "overflow-y-scroll" : "overflow-hidden"}`;});

function com[]
function additemCart(shirt){
  const index = cartdet.value.findIndex((shirtitem)=>  shirtitem.shirtname === shirt.shirtname && shirtitem.shirtedition === shirt.shirtedition )
  if (index!=-1) {
    cartdet.value[index].quantity++;
    console.log(cartdet.value[index].quantity)
    
  } else {
    console.log(shirt)
    shirt.quantity = 1
    cartdet.value.push(shirt); // Ensure only valid objects are added
    console.log(cartdet);
  }
  calculateCartPrice(shirt)
}
function plusItem(shirt){
  shirt.quantity++
}

function minusItem(shirt){
  if(shirt.quantity>1)
  {shirt.quantity--}
  else{
    cartdet.value.splice(shirt,1)
  }
 
}
function deleteFromCart(shirt){
  cartdet.value.splice(shirt,1)
}

function calculateCartPrice(){
  var totalprice = 0
  cartdet.value.forEach((shirt) => {
    totalprice += shirt.shirtprice * shirt.quantity
  }); 
  return totalprice.toFixed(2);
}


</script>


<template>
  <main class="bg-peach p-15 h-6/8 font-display">
    <div class="flex w-full justify-between">
      <h2 class="text-4xl font-nav">New Releases</h2>
      <div class="flex justify-between w-95 ">
        <div class="search flex items-center p-1 rounded-xl border-2 ">
          <Search />
          <input type="search" placeholder="Search.." class=" border-none rounded-xl pl-2 w-75 outline-none" >
        </div>
        <div class="relative">
          <button class="peer hover:cursor-pointer" @click="showcart=!showcart"><Cart /></button>
          <div v-if="showcart" ref="cartContainer" :class="cartClasses">
            <h2 class="h-20 text-2xl">My Cart</h2>
            <div class="cart-item h-25 flex" v-for="item in cartdet" :key="item.shirtname">
              <img class="cart-item-img w-1/4" :src="`../images/${item.sampleimg}`">
              <div class="cart-item-details w-5/6 flex flex-col gap-2">
                <p class=" text-lg">
                  {{item.shirtname}} -- ${{item.shirtprice}}
                </p>
                <h4 class="text-xs italic">
                  {{item.shirtedition}}
                </h4>
                <div class="quantityAdjustment flex gap-2 items-center justify-start">
                  <button type="button" class="border px-1 hover:cursor-pointer" @click="plusItem(item)">+</button>
                  <p class="">{{item.quantity}}</p>
                  <button type="button" class="border px-1 hover:cursor-pointer" @click="minusItem(item)">-</button>
                </div>
              </div>
              <button type="delete" class="flex items-center hover:cursor-pointer" @click="deleteFromCart(item)"><Deleteicon /></button>
            </div>
            <div class="h-20 flex justify-center align-centers" v-if="cartdet.length<1">Your Cart is Empty!</div>
            <div class="flex justify-between border-t border-dashed">
              <div class="">Subtotal: </div>
              <div> ${{calculateCartPrice()}} </div>
            </div>
            <div class="flex justify-center items-center pt-5">
             <button class="bg-black w-2/3 hover:cursor-pointer h-9 rounded-lg text-white" type="Button">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    <div class="flex flex-wrap flex-row text-sm justify-evenly items-center w-full h-full pt-10 gap-5 " >
      <div class="z-1" v-for="shirt in shirtdet" :key="shirt.shirtname"  >
        <itemdisplay :shirtname="shirt.shirtname" :shirtedition = 'shirt.shirtedition' :shirtprice="shirt.shirtprice"  @additem-Cart="additemCart(shirt)"/>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>
