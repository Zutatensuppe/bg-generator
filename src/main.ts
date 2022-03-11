import * as Vue from 'vue'
import App from './App.vue'
import "./style.scss"

const run = async () => {
  const app = Vue.createApp(App)
  app.mount('#app')
}

run()
