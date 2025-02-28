import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ComoFunciona from '@/components/ComoFunciona.vue';
import Transacciones from '@/views/PrivateViews/TransaccionesView.vue';
import PrivateHomeView from '@/views/PrivateViews/PrivateHomeView.vue';
import CuentaBancariaView from '@/views/PrivateViews/CuentaBancariaView.vue';
import MetaAhorroView from '@/views/PrivateViews/MetaAhorroView.vue';
import ReciboView from '@/views/PrivateViews/ReciboView.vue';
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
    {
      path: '/PrivateHomeView',
      component: PrivateHomeView
    },
    {
      path: '/cuenta-bancaria',
      component: CuentaBancariaView
    },
    {
      path: '/meta-ahorro',
      component: MetaAhorroView
    },
    {
      path: '/recibos',
      component: ReciboView
    },
  ],
})

export default router
