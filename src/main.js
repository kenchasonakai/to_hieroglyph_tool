import { createApp } from 'vue'
import App from './App.vue'
import VueClipboard from 'vue3-clipboard'
const app = createApp({})
app.use(VueClipboard)

createApp(App).mount('#app')
