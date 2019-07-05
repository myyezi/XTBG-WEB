import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import auth from './modules/auth'
import getters from './getters'
import tagsView from './modules/tagsView'
import im from './modules/im'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    app,
    tagsView,
    user,
    im
  },
  getters
})

export default store
