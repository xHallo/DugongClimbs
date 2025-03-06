<script setup>
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
    type: Number,
    default:"Yet to Release",
  }

});

</script>


<template>
    <div class="group border rounded-3xl p-4 flex flex-col justify-between items-center w-83 h-110 pb-6 hover:shadow-lg hover:cursor-pointer transition-all duration-300">
    <div class="relative h-4/6 w-full flex items-center justify-center">
      <img :src="`/images/${sampleimg}`" :alt="shirtname" class="absolute h-full w-auto object-contain transition-opacity duration-300 group-hover:opacity-0"
      />
      <img :src="`/images/${backsampleimg}`" :alt="shirtname" class="absolute h-full w-auto object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"/>
    </div>

        <div class="flex flex-row border-b-1 border-brown-300 h-/3 w-full pb-3">
          <div class="mt-2 w-1/3 flex justify-start items-end"><p>{{shirtname}} </p></div>
          <div class="mt-2 w-1/3 flex justify-start items-end"><p>{{shirtedition}} </p></div>
          <div class="font-bold w-1/3 flex justify-end items-end"><p >${{shirtprice}}</p></div>
        </div>  
        <button type="button" @click="$emit('additem-Cart')" class="translate-y-10 opacity-0 h-1/10 bg-black text-white w-full group-hover:opacity-100 transition-all group-hover:translate-y-0 cursor-pointer hover:bg-brown-300">ADD TO CART</button>
    </div>
</template>