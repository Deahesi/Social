import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import profile from "./profile"
import friends from "./friends"
import messages from "./messages"
import errors from "./errors"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth, info, profile, friends, messages, errors
  }
})
