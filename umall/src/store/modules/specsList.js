import {specsList,specsCount} from '../../utils/request'

const state = {
    listArr:[],
    total:0,
    page:1,
    size:3
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
        specsList(context.state.page,context.state.size).then(res=>{
            res.data.list.forEach(item=>{
                item.attrs = JSON.parse(item.attrs)
            })
            const list =res.data.list?res.data.list:[]
            if(list.length == 0&&context.state.page>1){
                context.state.page -=1 
                context.dispatch('reqTotal')
                context.dispatch('reqList')
                return
            }
            context.commit('changeList',list)
             
        })
    },
    reqTotal(context){
        specsCount().then(res=>{
            context.commit('changeTotal',res.data.list[0].total)
        })
    },
    reqPage(context,num){
        context.commit('changePage',num)
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
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}