<template>
  <h1>原生表单测试</h1>

  <NativeForm @submit="submitTest">
    <FormItem name="name" label="姓名" placeholder="测试" />
    <FormItem name="age" label="年龄" type="number" placeholder="测试" />
    <FormItem name="gender" label="性别" placeholder="测试" />

    <div>
      <input type="submit" value="提交" />
    </div>
  </NativeForm>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import NativeForm from '@/components/native-form.vue'
import FormItem from '@/components/form-item.vue'

onMounted(() => {
  console.log('原生表单测试')
})

const submitTest = (form: object) => {
  console.log('form提交结果：', form)
}
</script>

<style scoped></style>
