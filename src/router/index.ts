import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PrivateHomeView from '@/views/PrivateViews/PrivateHomeView.vue'
import Transacciones from '@/views/PrivateViews/TransaccionesView.vue'
import CuentaBancariaView from '@/views/PrivateViews/CuentaBancariaView.vue'
import MetaAhorroView from '@/views/PrivateViews/MetaAhorroView.vue'
import ReciboView from '@/views/PrivateViews/ReciboView.vue'
import SobreNosotrosView from '@/views/SobreNosotrosView.vue'
import ConsejosView from '@/views/ConsejosView.vue'
import PerfilView from '@/views/PerfilView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/private',
      component: PrivateHomeView,
      children: [
        { path: 'transacciones', component: Transacciones },
        { path: 'cuenta-bancaria', component: CuentaBancariaView },
        { path: 'meta-ahorro', component: MetaAhorroView },
        { path: 'recibos', component: ReciboView },
      ],
    },
    {
      path: '/sobre-nosotros',
      component: SobreNosotrosView,
    },
    {
      path: '/consejos',
      component: ConsejosView,
    },
    {
      path: '/profile',
      component: PerfilView
    },
  ],
})

export default router
