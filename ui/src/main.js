import { createApp } from "vue"
import { createPinia } from "pinia"
import { createI18n } from 'vue-i18n'
import App from "./App.vue"
import router from "./router"
import api from "./api"
import './assets/tailwind.css'

let messages = {}
let locale = ''

api.post("languageCB", {
  language: true
  }).then((callback) => {
  locale = callback.data.defaultLang
  messages = callback.data.lang

  const i18n = createI18n({
    legacy: false,
    locale: locale,
    messages: messages,
  })

  const pinia = createPinia()
  const app = createApp(App)

  app.use(pinia).use(i18n).use(router).mount("#app")
}).catch((e) => {
  console.error(e.message)
})
