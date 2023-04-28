<script setup lang="ts">
const props = defineProps({
  field: String,
  label: String,
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement
  if (target) emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="relative">
    <input
      :id="field"
      :name="field"
      :value="props.modelValue"
      @input="updateValue($event)"
      type="text"
      class="peer h-10 w-full border-b-2 border-gray-300 bg-inherit text-gray-900 placeholder-transparent focus:border-peta-blue focus:outline-none"
      :placeholder="label"
    />
    <label
      :for="field"
      class="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
      >{{ label }}</label
    >
  </div>
</template>
