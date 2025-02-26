<template>
  <div>
    <h1>web3示例页面</h1>
    <nut-button type="primary" @click="createAccount">创建账号</nut-button>
    <nut-button type="primary" @click="usePrivateKey(web3Store.privateKey)">账号登录</nut-button>
    <nut-button type="primary" @click="getAccountBalance">获取余额</nut-button>

    <p>地址：{{ web3Store.address }}</p>
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
import { useWeb3Store } from '@/store/store'

const web3Store = useWeb3Store()

const accountInfo = reactive({
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

  web3Store.setUserInfo(account.address, account.privateKey)
}

// 使用现有privatekey登录
const usePrivateKey = (privateKey: string) => {
  const loginResult = web3.eth.accounts.privateKeyToAccount(privateKey)

  if (loginResult && loginResult.address) {
    web3Store.setAddress(loginResult.address)
    showNotify.text('登录成功')
  }
}

// 获取余额
const getAccountBalance = async () => {
  const balance = await web3.eth.getBalance(web3Store.address)
  accountInfo.balance = web3.utils.fromWei(balance, 'ether')
}

const startTransaction = async () => {
  try {
    // 从私钥获取发送者的账户
    const senderAccount = web3.eth.accounts.privateKeyToAccount(web3Store.privateKey)
    web3.eth.accounts.wallet.add(senderAccount)

    // 获取当前的gas价格
    const gasPrice = await web3.eth.getGasPrice()

    // 估算转账所需的gas用量
    const gasEstimate = await web3.eth.estimateGas({
      from: senderAccount.address,
      to: target.address,
      value: web3.utils.toWei(target.targetEth, 'ether'),
    })

    // 构建交易对象
    const txObject = {
      from: senderAccount.address,
      to: target.address,
      value: web3.utils.toWei(target.targetEth, 'ether'),
      gas: gasEstimate,
      gasPrice,
    }

    // 签署交易
    const signedTx = await senderAccount.signTransaction(txObject)

    // 发送已签署的结果
    const receipt = web3.eth.sendSignedTransaction(signedTx.rawTransaction)

    // 交易结果
    receipt.on('transactionHash', (txId) => {
      console.log('交易id', txId)
    })

    receipt.on('receipt', (res) => {
      console.log('第一个节点确认', res)
    })

    receipt.on('confirmation', (confirmation) => {
      console.log('第n个节点确认', confirmation)
    })
  } catch (error) {
    throw new Error(error as string)
  }
}
</script>
