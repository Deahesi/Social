import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import firebase from 'firebase'
import vuescroll from "vue-scroll"
import scrollTo from 'vue-scrollto'
import Loader from "./components/app/Loader";
import dateFilter from "./filters/date.filter";

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(vuescroll)
Vue.use(scrollTo)
Vue.filter('dateFilter', dateFilter)
Vue.component('Loader', Loader)

const firebaseConfig = {
  apiKey: "AIzaSyBhXZQeeV5JPtwXc8dIR0VkrYHo_NVIXYU",
  authDomain: "socialdeahesi.firebaseapp.com",
  databaseURL: "https://socialdeahesi.firebaseio.com",
  projectId: "socialdeahesi",
  storageBucket: "socialdeahesi.appspot.com",
  messagingSenderId: "690746320271",
  appId: "1:690746320271:web:299bb9b0d9c785736257fa",
  measurementId: "G-6JGF8VJYXN"
}

firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
