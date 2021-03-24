import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import actions from './actions.js'
import {state,mutations,getters} from './mutations.js'
import menuList from './modules/menuList.js'
import roleList from './modules/roleList.js'
import manageList from './modules/manageList.js'
import cateList from './modules/cateList.js'
import specsList from './modules/specsList.js'
import goodsList from './modules/goodsList.js'

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        menuList,
        roleList,
        manageList,
        cateList,
        specsList,
        goodsList,
    }
})