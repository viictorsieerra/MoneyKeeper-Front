import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from "pinia-plugin-persistedstate"
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
import router from './router'

// import './assets/styles/main.scss';

const app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
})
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(vuetify)
app.use(pinia)
app.use(router)

app.mount('#app')
