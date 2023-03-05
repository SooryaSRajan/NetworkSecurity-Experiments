import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueIframe from 'vue-iframes'

createApp(App).use(router).use(VueIframe).mount('#app')
