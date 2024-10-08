import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 默认引入，不要按需引入，尽量优化白屏时间
import Login from '@/views-default/Login.vue'

const dynamicFiles = import.meta.glob('../views/**/*.vue')

const dynamicRoutes: RouteRecordRaw[] = []

function createRoute(path: string) {
  // 移除路径中的 'views' 和 '.vue'，并将路径转换为小写
  let routePath = path.replace(/(\.\.\/views|\.vue)/g, '').toLowerCase()

  // 分割路径为文件名数组
  const fileNames = routePath.split('/')
  let name = fileNames[fileNames.length - 1]

  // 如果文件名与上一级目录名相同，则移除文件名
  if (fileNames[fileNames.length - 1] === fileNames[fileNames.length - 2]) {
    fileNames.pop()
    routePath = fileNames.join('/')
  }

  // 处理动态路径部分
  const dynamicPartMatches = path.match(/\[([^[\]]+)\]/g)
  if (dynamicPartMatches) {
    name = name.replace(dynamicPartMatches.join(''), '')
    for (const match of dynamicPartMatches) {
      const dynamicValue = match.slice(1, -1)
      routePath = routePath.replace(`[${dynamicValue}]`, `/:${dynamicValue}`)
    }
  }

  // 创建路由对象
  return {
    path: routePath,
    name,
    component: dynamicFiles[path],
  }
}

for (const path in dynamicFiles) {
  if (path.includes('components')) {
    continue
  }

  dynamicRoutes.push(createRoute(path))
}

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Login,
    },
    {
      path: '/dynamic-routes',
      component: () => import('@/layout/layout-com.vue'),
      children: dynamicRoutes,
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views-default/404.vue'),
    },
  ],
})
