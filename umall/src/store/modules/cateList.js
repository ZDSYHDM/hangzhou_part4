import {cateList} from '../../utils/request'

const state = {
    listArr:[]
}

const mutations = {
    changeList(state,arr){
        state.listArr = arr
    }
}

const actions = {
    reqList(context){
        cateList().then(res=>{
            context.commit('changeList',res.data.list)
        })
    }
}

const getters = {
    listArr(state){
        return state.listArr
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}