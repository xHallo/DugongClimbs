<script setup>

</script>


<template>
<input type="search" @input="$emit('search', $event.target.value)" placeholder="Search.." class=" border-none rounded-xl pl-2 w-75 outline-none" >
</template>