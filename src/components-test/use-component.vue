<template>
  <h2>这是使用组件</h2>

  <ChildType msg="这是子组件" :data="data">
    <template #default="{ item }">
      <span @click="handleClick(item)">{{ item.name }} - {{ item.age }}</span>
    </template>
  </ChildType>
</template>

<script setup lang="ts">
import ChildType from './child-type.vue'

type Item = {
  name: string
  age: number
}

const data = {
  name: '张三',
  age: 18,
  arrTest: [
    { name: '李四', age: 20 },
    { name: '王五', age: 22 },
  ] as Item[],
}

const handleClick = (item: Item) => {
  console.log(item)
}
</script>

<style lang="less" scoped></style>
