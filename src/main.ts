import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/normalize.css'
import '@/assets/scss/main.scss'
// import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App).use(router).mount('#app')
