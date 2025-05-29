<template>
  <h2>这是子组件</h2>

  <ul>
    <li v-for="(item, index) in data.arrTest" :key="index">
      <slot :item="item" :index="index">
        <span>{{ JSON.stringify(item) }}</span>
      </slot>
    </li>
  </ul>
</template>

<script setup lang="ts" generic="T">
export type ChildArr<T> = {
  name: string
  age: number
  arrTest: T[]
}

defineProps<{
  msg: string
  data: ChildArr<T>
}>()
</script>
