<template>
  <div>
    <el-container class="box">
      <el-aside width="200px" class="navLeft">
        <el-row class="tac">
          <el-col :span="24">
            <!-- default-active 当前激活的
                  unique-opened 是否只保持一个子菜单打开
                  background-color  背景颜色
                  text-color  文字颜色
                  active-text-color 激活的那一项文字颜色
                  router  开启路由跳转
             -->
            <el-menu class="el-menu-vertical-demo" default-active="0" unique-opened background-color="rgb(32,34,42)"
              text-color="#fff" active-text-color="#ffd04b" router>

              <el-menu-item index="/">
                <i class="el-icon-s-home"></i>
                <span>首页</span>
              </el-menu-item>

              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-s-tools"></i>
                  <span>系统设置</span>
                </template>
                <el-menu-item index="/menu">菜单管理</el-menu-item>
                <el-menu-item index="/role">角色管理</el-menu-item>
                <el-menu-item index="/manage">管理员管理</el-menu-item>
              </el-submenu>

              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-s-goods"></i>
                  <span>商城管理</span>
                </template>
                <el-menu-item index="/cate">商品分类</el-menu-item>
                <el-menu-item index="/specs">商品规格</el-menu-item>
                <el-menu-item index="/goods">商品管理</el-menu-item>
                <el-menu-item index="/member">会员管理</el-menu-item>
                <el-menu-item index="/banner">轮播图管理</el-menu-item>
                <el-menu-item index="/seckill">秒杀活动</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>头部</el-header>
        <el-main>
          <!-- 面包屑 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex';
  export default {
    props: [],
    components: {},
    data() {
      return {};
    },
    computed: {
      ...mapGetters({}),
    },
    methods: {
      ...mapActions({}),
    },
    mounted() {},
  };

</script>
<style scoped>
  .box {
    width: 100vw;
    height: 100vh;
  }

  .el-header,
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }

  .el-main {
    background-color: #fff;
    color: #333;
  }

  .navLeft {
    background: rgb(32, 34, 42);
  }

</style>
