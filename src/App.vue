<script setup lang="ts">
import { ref, computed } from 'vue'
import domtoimage from 'dom-to-image'
import InstaImg from './components/InstaImg.vue'

const name = ref('')
const date = ref('')
const time = ref('')
const location = ref('')
const instaImg = ref()
const downloadBtn = ref()

const fileName = computed(() => `${name.value.trim()}_${time.value.trim()}.jpg`)
const enabledDownloadBtn = computed(
  () => !!name.value && !!date.value && !!time.value && !!location.value
)

function download() {
  domtoimage.toJpeg(instaImg.value.$el).then((dataUrl) => {
    downloadBtn.value.href = dataUrl
    downloadBtn.value.download = fileName.value
    downloadBtn.value.click()
  })
}
</script>

<template>
  <div
    class="relative flex h-screen w-screen justify-center overflow-hidden bg-white sm:items-center sm:bg-gray-50"
  >
    <main class="bg-white p-10 sm:rounded-xl sm:shadow-2xl">
      <h1 class="mb-2 text-center text-2xl font-bold underline decoration-peta-blue">
        PETA Streetteam Instagram Image
      </h1>
      <form @submit.prevent="download" class="flex flex-col gap-2">
        <div>
          <label for="name" class="font-medium leading-6 text-gray-900">Aktionsname:</label>
          <input
            type="text"
            name="name"
            id="name"
            class="mt-2 w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-peta-blue"
            placeholder="Ampeldemo"
            v-model="name"
          />
        </div>
        <div>
          <label for="date" class="font-medium leading-6 text-gray-900">Datum:</label>
          <input
            type="text"
            name="date"
            id="date"
            class="mt-2 w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-peta-blue"
            placeholder="18. Mai 2023"
            v-model="date"
          />
        </div>
        <div>
          <label for="time" class="font-medium leading-6 text-gray-900">Zeit:</label>
          <input
            type="text"
            name="time"
            id="time"
            class="mt-2 w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-peta-blue"
            placeholder="14:00 Uhr"
            v-model="time"
          />
        </div>
        <div>
          <label for="location" class="font-medium leading-6 text-gray-900">Ort:</label>
          <input
            type="text"
            name="location"
            id="location"
            class="mt-2 w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-peta-blue"
            placeholder="Stuttgarter Innenstadt"
            v-model="location"
          />
        </div>
        <button
          :disabled="!enabledDownloadBtn"
          type="submit"
          class="mt-2 self-center rounded-md bg-peta-blue px-4 py-2 text-white shadow-sm disabled:bg-gray-400"
        >
          Download
        </button>
      </form>
      <a ref="downloadBtn" class="hidden">Download</a>
    </main>
    <div class="absolute right-0 top-0 translate-x-full">
      <InstaImg
        ref="instaImg"
        :name="name"
        :date="date"
        :time="time"
        :location="location"
      ></InstaImg>
    </div>
  </div>
</template>
