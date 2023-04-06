<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  name: String,
  date: String,
  time: String,
  location: String,
  img: String
})
</script>

<template>
  <div class="relative h-1350px w-1080px">
    <img :src="img" />
    <div
      class="absolute right-[44px] top-[475px] flex h-[500px] w-[992px] flex-col items-center justify-center p-[62px] text-white"
    >
      <span class="text-center text-6xl font-medium">{{ name }}</span>
      <span class="mt-12 text-center text-7xl font-bold">{{ date }}</span>
      <span class="mt-3 text-center text-6xl font-medium">um {{ time }} Uhr</span>
      <span class="mt-12 text-center text-6xl font-medium">{{ location }}</span>
    </div>
  </div>
</template>
