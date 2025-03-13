<script setup>
import { ref } from 'vue';

const suggestion = ref('');

async function submitMessage(){
  try {
    const response = await fetch('http://13.55.226.8:5000/submit-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ suggestion: suggestion.value }),
    });

    const data = await response.json();
    if (data.success) {
      suggestion.value = ""
      alert('Thank you for your suggestion!')

    } else {
      console.error('Failed to submit message');
      alert('Failed to submit suggestion. Please try again.');
    }
  } catch (error) {
    console.error('Error submitting message:', error);
    alert("Too many requests, please try again after 3 minutes");
  }
};

</script>

<template>
  <div class="h-full flex flex-col items-center justify-center font-display  gap-10 text-center text-brown-300 px-15 py-8 xl:px-60">
    <h1 class="text-3xl">Suggestion Box</h1>
    <p class="text-lg">Feel free to let us know about any areas you feel we can improve in! We really appreciate any form of feedback we receive and will strive to improve in said area!</p>
    <textarea  v-model="suggestion" class="border border-gray-400 rounded-lg p-3 h-40 w-full text-lg focus:outline-none focus:ring-2 focus:ring-brown-500 resize-none transition-all duration-200" placeholder="Write your suggestion here...">
    </textarea>
    <button @click="submitMessage" class="bg-brown-300 text-white px-6 py-2 rounded-lg text-lg hover:opacity-90 hover:cursor-pointer transition-all duration-200">
        Submit Suggestion
    </button>
  </div>
</template>

<style scoped>

</style>
