<template>
  <div>
    <label :for="name">{{ label }}:</label>
    <input :name="name" :type="type" :placeholder="placeholder" />
  </div>
</template>

<script lang="ts" setup>
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
</script>
