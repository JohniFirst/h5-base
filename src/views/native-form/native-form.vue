<template>
  <h1>原生表单测试</h1>

  <form method="post" action="/submit-form">
    <FormItem name="name" label="姓名" placeholder="测试" />
    <FormItem name="age" label="年龄" type="number" placeholder="测试" />
    <FormItem name="gender" label="性别" placeholder="测试" />

    <div>
      <input type="submit" value="提交" />
    </div>
  </form>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import FormItem from './form-item.vue'

onMounted(() => {
  console.log('原生表单测试')
})
</script>

<style scoped></style>
