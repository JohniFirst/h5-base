<template>
  <div>
    <label :for="name">{{ label }}:</label>
    <input type="type" :placeholder="placeholder" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

defineProps({
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
})

onMounted(() => {
  console.log('原生表单测试')
})
</script>

<style scoped></style>
