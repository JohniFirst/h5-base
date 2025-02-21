<template>
  <div>
    <h1>web3示例页面</h1>
    <nut-button type="primary" @click="createAccount">创建账号</nut-button>
    <nut-button type="primary" @click="usePrivateKey(accountInfo.privateKey)">账号登录</nut-button>
    <nut-button type="primary" @click="getAccountBalance">获取余额</nut-button>

    <p>私钥：{{ accountInfo.privateKey }}</p>
    <p>地址：{{ accountInfo.address }}</p>
    <p>余额：{{ accountInfo.balance }} ETH</p>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Web3 from 'web3'
import { showNotify } from '@nutui/nutui'
import '@nutui/nutui/dist/packages/notify/style'

const accountInfo = reactive({
  privateKey: '0x189f4af93192b1caead1b2b031739c544cd475827f966287a91ecfd57e24f42e',
  address: '',
  balance: '0',
})
const web3 = new Web3(
  Web3.givenProvider || 'wss://mainnet.infura.io/ws/v3/9eb48d21216f436bb0c970685d0014f1',
)

// 创建账号
const createAccount = () => {
  const account = web3.eth.accounts.create()

  accountInfo.privateKey = account.privateKey
  accountInfo.address = account.address
}

// 使用现有privatekey登录
const usePrivateKey = (privateKey: string) => {
  const loginResult = web3.eth.accounts.privateKeyToAccount(privateKey)

  if (loginResult && loginResult.address) {
    accountInfo.address = loginResult.address
    showNotify.text('登录成功')
  }
}

// 获取余额
const getAccountBalance = async () => {
  if (!accountInfo.address) {
    usePrivateKey(accountInfo.privateKey)
  }
  const balance = await web3.eth.getBalance(accountInfo.address)
  accountInfo.balance = web3.utils.fromWei(balance, 'ether')
}
</script>

<style lang="less" scoped></style>
