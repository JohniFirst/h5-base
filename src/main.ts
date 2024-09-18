import 'amfe-flexible'

import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/routes'

const app = createApp(App)

app.use(router).mount('#app')

window.addEventListener('vite:preloadError', () => {
  // window.location.reload() // 例如，刷新页面
  alert('预加载失败，请刷新页面')
})
