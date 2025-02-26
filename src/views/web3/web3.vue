<template>
  <div>
    <h1>web3示例页面</h1>
    <nut-button type="primary" @click="createAccount">创建账号</nut-button>
    <nut-button type="primary" @click="usePrivateKey(web3Store.privateKey)">账号登录</nut-button>
    <nut-button type="primary" @click="getAccountBalance">获取余额</nut-button>
    <nut-button type="primary" @click="createMnemonic">使用助记词的方式创建账号</nut-button>
    <nut-button type="primary" @click="generateKeyPair">根据助记词创建密钥对</nut-button>

    <p>地址：{{ web3Store.address }}</p>
    <p>余额：{{ accountInfo.balance }} ETH</p>
    <p>助记词：{{ web3Store.mnemonic }}</p>

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
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import { hdkey } from '@ethereumjs/wallet'

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

// 创建助记词，相当于是另外一种方式创建钱包
const createMnemonic = () => {
  const mnemonic = generateMnemonic()

  web3Store.setMnemonic(mnemonic)
}

// 根据助记词创建密钥对
const generateKeyPair = async () => {
  const seed = await mnemonicToSeed(web3Store.mnemonic)

  const hdWallet = hdkey.EthereumHDKey.fromMasterSeed(seed)

  const keypair = hdWallet.derivePath("m/44'/60'/0'/0/0")

  // 获取钱包
  const wallet = keypair.getWallet()

  // // 获取钱包地址
  // const lowerCaseAddress = wallet.getAddressString()

  // // 获取钱包的校验地址（部分大写）
  // const checkedAddress = wallet.getChecksumAddressString()

  // 获取私钥
  const privateKey = wallet.getPrivateKeyString()

  console.log('获取私钥', privateKey)

  // 导出keyStore
  // 1. 使用web3.js
  web3.eth.accounts.encrypt(privateKey, '11111111').then((keyStore) => {
    console.log('keyStore', JSON.stringify(keyStore))
  })

  // 2. 使用wallet对象
  wallet.toV3('11111111').then((keyStore2) => {
    console.log('keyStore2', JSON.stringify(keyStore2))
  })
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
