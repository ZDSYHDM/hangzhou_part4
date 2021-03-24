import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const url = [{
  path: 'menu',
  name: '菜单列表',
  component: () => import('../page/menu/menu.vue')
}, {
  path: 'role',
  name: '角色列表',
  component: () => import('../page/role/role.vue')
}, {
  path: 'manage',
  name: '管理员列表',
  component: () => import('../page/manage/manage.vue')
}, {
  path: 'cate',
  name: '商品分类列表',
  component: () => import('../page/cate/cate.vue')
}, {
  path: 'specs',
  name: '商品规格列表',
  component: () => import('../page/specs/specs.vue')
}, {
  path: 'goods',
  name: '商品列表',
  component: () => import('../page/goods/goods.vue')
}, {
  path: 'member',
  name: '会员列表',
  component: () => import('../page/member/member.vue')
}, {
  path: 'banner',
  name: '轮播图列表',
  component: () => import('../page/banner/banner.vue')
}, {
  path: 'seckill',
  name: '秒杀列表',
  component: () => import('../page/seckill/seckill.vue')
}]

let router = new Router({
  routes: [{
    path: '/login',
    component: () => import('../page/login/login.vue')
  }, {
    path: '/',
    component: () => import('../page/index/index.vue'),
    children: [{
      path: '',
      name: '首页',
      component: () => import('../page/home/home.vue')
    },
    ...url
    ]
  }]
})

export default router
