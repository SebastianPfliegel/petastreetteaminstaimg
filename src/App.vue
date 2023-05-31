<script setup lang="ts">
import { ref, computed } from 'vue'
import domtoimage from 'dom-to-image'
import InstaImg from './components/InstaImg.vue'
import SunIcon from './components/Icons/SunIcon.vue'
import MoonIcon from './components/Icons/MoonIcon.vue'
import TextInput from './components/Input/TextInput.vue'
import DateInput from './components/Input/DateInput.vue'
import TimeInput from './components/Input/TimeInput.vue'
import data from './data'

const params = new URLSearchParams(window.location.search)

const teams = ref(data.teams)

const sortedTeams = computed(() =>
  [...teams.value].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
)

const enabledTeamSelection = ref(true)
const team = ref(sortedTeams.value[0])

const teamParam = params.get('team')
if (teamParam) {
  const foundTeam = teams.value.find((t) => t.name.toLowerCase() === teamParam.toLowerCase())
  if (foundTeam) {
    team.value = foundTeam
    enabledTeamSelection.value = false
  }
}

const name = ref('')
const date = ref('')
const time = ref('')
const location = ref('')
const instaImg = ref()
const downloadBtn = ref()
const darkMode = ref(getTheme() === 'dark')

const fileName = computed(() => `${date.value}_${team.value.name}_${name.value}.jpg`)
const enabledDownloadBtn = computed(
  () => !!name.value && !!date.value && !!time.value && !!location.value
)
const dateVal = computed(() => new Date(Date.parse(date.value)))

function download() {
  domtoimage.toJpeg(instaImg.value.$el).then((dataUrl) => {
    downloadBtn.value.href = dataUrl
    downloadBtn.value.download = fileName.value
    downloadBtn.value.click()
  })
}

function getTheme(): string {
  const themeInStorage = localStorage.getItem('theme')

  if (
    themeInStorage === 'dark' ||
    (themeInStorage === null && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )
    return 'dark'

  return 'light'
}

function toggleTheme() {
  darkMode.value = !darkMode.value
  localStorage.setItem('theme', darkMode.value ? 'dark' : 'light')
}
</script>

<template>
  <div :class="{ dark: darkMode }">
    <div class="relative h-screen w-screen bg-white dark:bg-stone-800">
      <header
        class="flex items-center justify-between bg-black p-4 text-white selection:bg-peta-blue"
      >
        <h1 class="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
          PETA Streetteam Instagram Image Generator
        </h1>
        <button class="rounded-full p-2 hover:bg-white/20" @click="toggleTheme">
          <SunIcon v-if="darkMode"></SunIcon>
          <MoonIcon v-else></MoonIcon>
        </button>
      </header>
      <main class="flex flex-col items-center">
        <form @submit.prevent="download" class="mt-2 flex w-full max-w-lg flex-col gap-6 p-8">
          <div class="relative">
            <select
              id="team"
              name="team"
              :disabled="!enabledTeamSelection"
              v-model="team"
              class="h-10 w-full border-b-2 border-gray-300 bg-inherit text-gray-900 focus:border-peta-blue focus:outline-none dark:border-white dark:text-white dark:focus:border-peta-blue"
            >
              <option v-for="(t, i) in sortedTeams" :key="i" :value="t">{{ t.name }}</option>
            </select>
            <label
              for="team"
              class="absolute -top-3.5 left-0 text-sm text-gray-600 dark:text-gray-300"
            >
              Streetteam
            </label>
          </div>
          <TextInput field="name" label="Aktionsname" v-model="name" />
          <DateInput field="date" label="Datum" v-model="date" />
          <TimeInput field="time" label="Zeit" v-model="time" />
          <TextInput field="location" label="Ort" v-model="location" />
          <button
            :disabled="!enabledDownloadBtn"
            type="submit"
            class="w-fit bg-black px-5 py-2 text-lg font-bold uppercase text-white shadow-sm transition hover:bg-peta-blue disabled:bg-gray-400 dark:bg-white dark:text-black dark:hover:bg-peta-blue dark:hover:text-white dark:disabled:bg-gray-400 dark:disabled:text-white sm:py-4"
          >
            Bild speichern
          </button>
        </form>
        <a ref="downloadBtn" class="hidden">Download</a>
      </main>
      <div class="absolute left-0 top-0 -translate-x-full -translate-y-full">
        <InstaImg
          ref="instaImg"
          :name="name"
          :date="dateVal"
          :time="time"
          :location="location"
          :img="team.img"
        />
      </div>
    </div>
  </div>
</template>
