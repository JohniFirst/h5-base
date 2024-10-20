<template>
  <form @submit="handleSubmit">
    <slot></slot>
  </form>
</template>

<script lang="ts" setup>
const emit = defineEmits(['submit'])

const handleSubmit = (e: Event) => {
  e.preventDefault()
  const form = e.target as HTMLFormElement
  const inputs = form.elements as unknown as HTMLInputElement[]
  const formItem: { [v: string]: string } = {}
  for (let i of inputs) {
    if (i.name) {
      formItem[i.name] = i.value
    }
  }
  emit('submit', formItem)
}
</script>
