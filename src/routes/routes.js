import { createRouter, createWebHistory } from 'vue-router'

const modules = import.meta.glob('@/views/**/*.vue')

const dynamicRouutes = []
Object.keys(modules).forEach((key) => {
  const path = `${key.replace('/src/views', '').replace('.vue', '')}`
  if (!path.includes('components')) {
    dynamicRouutes.push({
      path,
      name: path.split('/').pop(),
      component: modules[key],
    })
  }
})

console.log(dynamicRouutes)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/layout/Home.vue'),
  },
  ...dynamicRouutes,
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('@/layout/404.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
