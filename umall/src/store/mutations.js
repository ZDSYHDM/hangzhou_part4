export const state = {
    user:{}
}

export const mutations = {
    changeUser(state,obj){
        state.user = obj
        if(obj.token){
            sessionStorage.setItem('user',JSON.stringify(state.user))
        }
    }
}

export const getters = {
    user(state){
        return state.user
    }
}