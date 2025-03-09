<script setup>
import {ref} from "vue"
const sizes = ['S', 'M', 'L', 'XL']
const selectedSize = ref("S")

defineProps({
  sampleimg: {
    type: String,
    default:"",
    required: true,
  },
  backsampleimg: {
    type: String,
    default:"",
    required: true,
  },
  shirtname: {
    type:String,
    default:"Yet to Release",
  },
  shirtedition:{
    type:String,
    default:"Yet to Release",
  },
  shirtprice:{
    type:Number,
    default:"Yet to Release",
  }

});
const showFront = ref(true)
function toggleImage(){
  showFront.value = !showFront.value;
};
</script>

<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 w-full h-full ">
    <div class="flex justify-center items-center bg-peach py-1 px-1 rounded-xl shadow-lg max-w-md w-100 h-130 ">
      <div class="rounded-3xl p-4 flex flex-col justify-between items-center w-83 h-full w-full ">
        <div class=" w-full text-left text-lg font-extrabold"><p class="font-black">{{shirtname}} </p></div>
        <div class="relative h-70 w-full flex items-center justify-center">
          <button @click="toggleImage" class="absolute left-0 p-2 w-9 bg-white rounded-full shadow-md hover:bg-gray-300">
            <
          </button>
          <img :src="showFront ? `/images/${sampleimg}` : `/images/${backsampleimg}`" :alt="shirtname"
            class="h-full"
          />
          <button @click="toggleImage" class="absolute w-9 right-0 p-2 bg-white rounded-full shadow-md hover:bg-gray-300">
            >
          </button>
        </div>

        <div class="flex flex-row h-1/3 w-full pb-3">
          <div class="mt-2 w-1/2 flex justify-start items-end italic"><p>{{shirtedition}} Edition </p></div>
          <div class="font-bold w-1/2 flex justify-end items-end"><p >${{shirtprice}}</p></div>
        </div>  
        <select required v-model="selectedSize" class="border p-2  rounded-md bg-gray-100 w-25 mb-5 mt-2s">
          <option  v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
        </select>
        
        
        <button type="button" @click="$emit('confirmSize', selectedSize)"  class="h-32 bg-black text-white w-full cursor-pointer hover:bg-brown-300">
          CONFIRM
        </button>
      </div>
    </div>
  </div>
</template>
