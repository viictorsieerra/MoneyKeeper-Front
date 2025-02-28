import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ComoFunciona from '@/views/ComoFunciona.vue';
import Transacciones from '@/views/TransaccionesView.vue';
import SobreNosotrosView from '@/views/SobreNosotrosView.vue';
import ConsejosView from '@/views/ConsejosView.vue';
import PrivateHomeView from '@/views/PrivateViews/PrivateHomeView.vue';
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
      path: '/sobre-nosotros',
      component: SobreNosotrosView
    },
    {
      path: '/consejos',
      component: ConsejosView
    },
    {
      path: '/zona-privada',
      component: PrivateHomeView
    },
   ,
  ],
})

export default router
