import { Directive } from 'vue'

// 权限指令
const permission: Directive = {
  mounted: (el: HTMLElement, { value }) => {
    const authedArray = ['edit', 'test']

    if (value && Array.isArray(value) && value.length > 0) {
      if (!value.some((authKey) => authedArray.includes(authKey))) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['edit', 'test']"`)
    }
  },
}

export default permission
