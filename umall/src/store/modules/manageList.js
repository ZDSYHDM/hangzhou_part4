import {manageList,manageCount} from '../../utils/request'

const state ={
    listArr:[],
    total:0,
    size:2,
    page:1
}

const mutations = {
    changeList(state,arr){
        state.listArr = arr
    },
    changeTotal(state,num){
        state.total = num
    },
    changePage(state,num){
        state.page = num
    }
}

const actions = {
    reqList(context){
        manageList(context.state.size,context.state.page).then(res=>{
            const list = res.data.list?res.data.list:[]
            if(list.length == 0&&context.state.page>1){
                context.commit('changePage',context.state.page-1)
                context.dispatch("reqList")
                return
            }
            context.commit('changeList',res.data.list)
        })
    },
    reqCount(context){
        manageCount().then(res=>{
            context.commit('changeTotal',res.data.list[0].total)
        })
    },
    reqChangePage(context,num){
        context.commit('changePage',num),
        context.dispatch('reqList')
    }
}

const getters = {
    listArr(state){
        return state.listArr
    },
    total(state){
        return state.total
    },
    size(state){
        return state.size
    },
    page(state){
        return state.page
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}