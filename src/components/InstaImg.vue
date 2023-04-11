<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  name: String,
  date: Date,
  time: String,
  location: String,
  img: String
})

const months = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember'
]

const formattedDate = computed(() => {
  const { date } = props

  if (!date) return 'Ungültiges Datum'

  let day = '0' + date.getDate().toString()
  day = day.substring(day.length - 2)
  const month = months[date.getMonth()]
  const year = date.getFullYear().toString()

  return `${day}. ${month} ${year}`
})
</script>

<template>
  <div class="relative h-1350px w-1080px">
    <img :src="props.img" />
    <div
      class="absolute right-[44px] top-[475px] flex h-[500px] w-[992px] flex-col items-center justify-center p-[62px] text-white"
    >
      <span class="text-center text-6xl font-medium">{{ props.name }}</span>
      <span class="mt-12 text-center text-7xl font-bold">{{ formattedDate }}</span>
      <span class="mt-3 text-center text-6xl font-medium">um {{ props.time }} Uhr</span>
      <span class="mt-12 text-center text-6xl font-medium">{{ props.location }}</span>
    </div>
  </div>
</template>
