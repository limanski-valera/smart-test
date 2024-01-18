import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '../views/UsersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: UsersView
    },
    {
      path: '/edit/:userId?',
      name: 'user-editor',
      component: () => import('../views/UserEditorView.vue'),
      props: true
    }
  ]
})

export default router
