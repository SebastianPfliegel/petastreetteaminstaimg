<script setup lang="ts">
import { ref, computed } from 'vue'
import domtoimage from 'dom-to-image'
import InstaImg from './components/InstaImg.vue'

const teams = ref([
  {
    name: 'Rostock',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Lübeck',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Hamburg',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Lüneburg',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Bremen',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Berlin',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Hannover',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Osnabrück',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Kleve',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Dortmund',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Essen',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Düsseldorf',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Wuppertal',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Köln/Bonn',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Siegen',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Göttingen',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Leipzig',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Dresden',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Coburg',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Bamberg',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Nürnberg',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Rosenheim',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Rhein-Main',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Bingen',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Saarbrücken',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Kaiserslautern',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Heidelberg',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Karlsruhe',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Stuttgart',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Tübingen',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Memmingen',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  },
  {
    name: 'Konstanz',
    img: new URL('./assets/templates/nuernberg.jpg', import.meta.url).href
  }
])

const sortedTeams = computed(() =>
  [...teams.value].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
)

const team = ref(sortedTeams.value[0])
const name = ref('')
const date = ref('')
const time = ref('')
const location = ref('')
const instaImg = ref()
const downloadBtn = ref()

const fileName = computed(
  () => `${team.value.name.trim()}_${name.value.trim()}_${date.value.trim()}.jpg`
)
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
          <label for="team" class="font-medium leading-6 text-gray-900">Streetteam:</label>
          <select
            name="team"
            id="team"
            v-model="team"
            class="mt-2 w-full rounded-md border-0 bg-white px-4 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-peta-blue"
          >
            <option v-for="(t, i) in sortedTeams" :key="i" :value="t">{{ t.name }}</option>
          </select>
        </div>
        <div>
          <label for="name" class="font-medium leading-6 text-gray-900">Aktionsname:</label>
          <input
            type="text"
            name="name"
            id="name"
            class="mt-2 w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-peta-blue"
            placeholder="Aktion gegen Pferdemissbrauch"
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
            placeholder="05. Februar 2023"
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
            placeholder="15:00"
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
            placeholder="Arena Nürnberger Versicherung"
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
        :img="team.img"
      ></InstaImg>
    </div>
  </div>
</template>
