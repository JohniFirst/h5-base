<template>
  <div>
    <h1>web3示例页面</h1>
    <nut-button type="primary" @click="createAccount">创建账号</nut-button>
    <nut-button type="primary" @click="usePrivateKey(accountInfo.privateKey)">账号登录</nut-button>
    <nut-button type="primary" @click="getAccountBalance">获取余额</nut-button>

    <p>私钥：{{ accountInfo.privateKey }}</p>
    <p>地址：{{ accountInfo.address }}</p>
    <p>余额：{{ accountInfo.balance }} ETH</p>

    <nut-input v-model="target.address" placeholder="请输入地址"></nut-input>
    <nut-input v-model="target.targetEth" placeholder="请输入转账金额"></nut-input>

    <nut-button type="primary" block @click="startTransaction">开始转账</nut-button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Web3 from 'web3'
import { showNotify } from '@nutui/nutui'

const accountInfo = reactive({
  privateKey: '0x189f4af93192b1caead1b2b031739c544cd475827f966287a91ecfd57e24f42e',
  address: '',
  balance: '0',
})
const target = reactive({
  address: '',
  targetEth: '',
})
const web3 = new Web3(Web3.givenProvider || import.meta.env.VITE_WEB3_ENDPOINTS)

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

const startTransaction = async () => {
  // 获取转账次数
  // const nonce = await web3.eth.getTransactionCount(accountInfo.address)

  // 获取转账的gas价格
  const gasPrice = await web3.eth.getGasPrice()
  console.log('gasPrice', gasPrice)

  // 转账金额
  // const value = web3.utils.toWei(target.targetEth, 'ether')

  // 构建转账参数
  // const rawTx = {
  //   from: accountInfo.address,
  //   to: target.address,
  //   value,
  //   nonce,
  //   gasPrice,
  //   data: '0x0000',
  // }
}
</script>

<style lang="less" scoped></style>
