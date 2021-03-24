import axios from 'axios'
import qs from 'qs'
import Vue from 'vue';

axios.interceptors.response.use((res)=>{
    console.log('=====响应之前=====');
    console.log(res);
    console.log('=====响应之后=====');

    return res
})

//开发环境
let baseUrl = '/api'
Vue.prototype.$imgUrl = 'http://localhost:3000'

//上线环境
// let baseUrl = ''
// Vue.prototype.$imgUrl = ''



/* ===========菜单管理============= */

// 添加
export const menuAdd = (form)=>{
    return axios({
        url:baseUrl+'/api/menuadd',
        method:'post',
        data:qs.stringify(form)
    })
}

// 获取列表
export const menuList = ()=>{
    return axios({
        url:baseUrl+'/api/menulist',
        method:'get',
        params:{
            istree:true
        }
    })
}

// 获取一条数据
export const menuInfo = (id)=>{
    return axios({
        url:baseUrl+'/api/menuinfo',
        method:'get',
        params:{id}
    })
}

//修改
export const menuEdit = (form)=>{
    return axios({
        url:baseUrl+'/api/menuedit',
        method:'post',
        data:qs.stringify(form)
    })
}

//删除
export const menuDel = (form)=>{
    return axios({
        url:baseUrl+'/api/menudelete',
        method:'post',
        data:qs.stringify(form)
    })
}


/* ===========角色管理============= */

// 添加
export const roleAdd = (form)=>{
    return axios({
        url:baseUrl+'/api/roleadd',
        method:'post',
        data:qs.stringify(form)
    })
}

// 获取角色列表
export const roleList = ()=>{
    return axios({
        url:baseUrl+'/api/rolelist',
        method:'get'
    })
}

//获取一条信息
export const roleInfo = (id)=>{
    return axios({
        url:baseUrl+'/api/roleinfo',
        method:'get',
        params:{id}
    })
}

//修改
export const roleEdit = (form)=>{
    return axios({
        url:baseUrl+'/api/roleedit',
        method:'post',
        data:qs.stringify(form)
    })
}

//删除
export const roleDel = (form)=>{
    return axios({
        url:baseUrl+'/api/roledelete',
        method:'post',
        data:qs.stringify(form)
    })
}


/* ===========管理员管理============= */

// 添加
export const manageAdd = (form)=>{
    return axios({
        url:baseUrl+'/api/useradd',
        method:'post',
        data:qs.stringify(form)
    })
}

//获取管理员列表
export const manageList = (size,page)=>{
    return axios({
        url:baseUrl+'/api/userlist',
        method:'get',
        params:{
            size,
            page
        }
    })
}

//获取一条信息
export const manageInfo = (uid)=>{
    return axios({
        url:baseUrl+'/api/userinfo',
        method:'get',
        params:{uid}
    })
}

//修改
export const manageEdit = (form)=>{
    return axios({
        url:baseUrl+'/api/useredit',
        method:'post',
        data:qs.stringify(form)
    })
}

//删除
export const manageDel = (form)=>{
    return axios({
        url:baseUrl+'/api/userdelete',
        method:'post',
        data:qs.stringify(form)
    })
}

//请求总数
export const manageCount = ()=>{
    return axios({
        url:baseUrl+'/api/usercount',
        method:'get'
    })
}

// 管理员登录
export const login = (form)=>{
    return axios({
        url:baseUrl+'/api/userlogin',
        method:'post',
        data:qs.stringify(form)
    })
}


/* ===========商品分类管理============= */

// 添加
export const cateAdd = (form)=>{
    let obj = new FormData()
    for(let key in form){
        obj.append(key,form[key])
    }
    return axios({
        url:baseUrl+'/api/cateadd',
        method:'post',
        data:obj
    })
}

//获取商品分类列表
export const cateList = ()=>{
    return axios({
        url:baseUrl+'/api/catelist',
        method:'get',
        params:{
           istree:true
        }
    })
}

//获取一条信息
export const cateInfo = (id)=>{
    return axios({
        url:baseUrl+'/api/cateinfo',
        method:'get',
        params:{id}
    })
}

//修改
export const cateEdit = (form)=>{
    let obj = new FormData()
    for(let key in form){
        obj.append(key,form[key])
    }
    return axios({
        url:baseUrl+'/api/cateedit',
        method:'post',
        data:obj
    })
}

//删除
export const cateDel = (form)=>{
    return axios({
        url:baseUrl+'/api/catedelete',
        method:'post',
        data:qs.stringify(form)
    })
}


/* ===========商品规格管理============= */

// 添加
export const specsAdd = (form)=>{
    return axios({
        url:baseUrl+'/api/specsadd',
        method:'post',
        data:qs.stringify(form)
    })
}

// 获取商品属性列表
export const specsList = (page,size)=>{
    return axios({
        url:baseUrl+'/api/specslist',
        method:'get',
        params:{page,size}
    })
}

// 获取一条信息
export const specsInfo = (id)=>{
    return axios({
        url:baseUrl+'/api/specsinfo',
        method:'get',
        params:{id}
    })
}

// 修改
export const specsEdit = (form)=>{
    return axios({
        url:baseUrl+'/api/specsedit',
        method:'post',
        data:qs.stringify(form)
    })
}

// 删除
export const specsDel = (form)=>{
    return axios({
        url:baseUrl+'/api/specsdelete',
        method:'post',
        data:qs.stringify(form)
    })
}

// 获取总数
export const specsCount = ()=>{
    return axios({
        url:baseUrl+'/api/specscount',
        method:'get'
    })
}


/* ===========商品管理============= */

// 添加
export const goodsAdd = (form)=>{
    let obj = new FormData()
    for(let key in form){
        obj.append(key,form[key])
    }
    return axios({
        url:baseUrl+'/api/goodsadd',
        method:'post',
        data:obj
    })
}

// 获取商品列表
export const goodsList = (size,page)=>{
    return axios({
        url:baseUrl+'/api/goodslist',
        method:'get',
        params:{size,page}
    })
}

// 获取一条信息
export const goodsInfo = (id)=>{
    return axios({
        url:baseUrl+'/api/goodsinfo',
        method:'get',
        params:{id}
    })
}

// 修改
export const goodsEdit = (form)=>{
    let obj = new FormData()
    for(let key in form){
        obj.append(key,form[key])
    }
    return axios({
        url:baseUrl+'/api/goodsedit',
        method:'post',
        data:obj
    })
}

// 删除
export const goodsDel = (form)=>{
    return axios({
        url:baseUrl+'/api/goodsdelete',
        method:'post',
        data:qs.stringify(form)
    })
}

// 获取总数
export const goodsCount = ()=>{
    return axios({
        url:baseUrl+'/api/goodscount',
        method:'get'
    })
}