import { defineStore } from 'pinia'

/** 保存web3用户信息 */
export const useWeb3Store = defineStore('web3Store', {
  state: () => ({
    // 地址
    address: '',
    // 私钥
    privateKey: import.meta.env.VITE_WEB3_PRIVATEKEY,
  }),
  actions: {
    setAddress(address: string) {
      this.address = address
    },
    setPrivateKey(privateKey: string) {
      this.privateKey = privateKey
    },
    setUserInfo(address: string, privateKey: string) {
      this.address = address
      this.privateKey = privateKey
    },
  },
})
