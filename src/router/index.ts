import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ComoFunciona from '@/views/ComoFunciona.vue';
import Transacciones from '@/views/TransaccionesView.vue';
import SobreNosotrosView from '@/views/SobreNosotrosView.vue';
import ConsejosView from '@/views/ConsejosView.vue';
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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
