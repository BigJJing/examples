
import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'EasyMarkdownEditor',
    component: () => import('@/views/EasyMarkdownEditor.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/components/TestComponent.vue'),
  },
  {
    path: '/arco',
    name: 'arco',
    component: () => import('@/components/Arco.vue'),
  },
  {
    path: '/monaco',
    name: 'monaco',
    component: () => import('@/components/Monaco.vue'),
  },
  {
    path: '/grid-layout',
    name: 'gridLayout',
    component: () => import('@/components/GridLayout.vue')
  },
  {
    path: '/sort-table',
    name: 'sortTable',
    component: () => import('@/components/SortTable.vue')
  },
  {
    path: '/html-canvas',
    name: 'HtmlCanvas',
    component: () => import('@/components/HtmlCanvas.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
