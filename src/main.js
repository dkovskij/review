import Vue from 'vue'
import App from './App.vue'
// очевидно в таком приложении в vuex нет смысла, также не используется axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
