import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ComoFunciona from '@/components/ComoFunciona.vue';
import Transacciones from '@/views/TransaccionesView.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/como-funciona',
      component: ComoFunciona
    },
    {
      path: '/transacciones',
      component: Transacciones
    },
  ],
})

export default router
