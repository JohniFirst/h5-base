<template>
  <h1>Login</h1>

  <nut-form ref="formRef" :model-value="loginForm" label-position="top">
    <nut-form-item label="用户名">
      <nut-input v-model="loginForm.username" type="text" placeholder="请输入用户名" />
    </nut-form-item>
    <nut-form-item label="密码">
      <nut-input v-model="loginForm.password" type="password" placeholder="8-16位字母、数字" />
    </nut-form-item>

    <nut-button type="primary" block @click="handleLogin">登 录</nut-button>
  </nut-form>
</template>

<script lang="ts" setup>
import type { FormInstance } from '@nutui/nutui'
import { useTemplateRef } from 'vue'
import { ref } from 'vue'

// 注意细节，这里没有类型引入语句，使用更方便
const loginForm = ref<LoginForm>({
  username: '',
  password: '',
})

const loginFormRef = useTemplateRef<FormInstance>('formRef')

const handleLogin = () => {
  // @ts-ignore
  loginFormRef.value?.validate().then(({ valid }) => {
    if (valid) {
      // 登录逻辑
      console.log('loginForm', loginForm.value)
    }
  })
}
</script>
