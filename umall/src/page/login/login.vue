<template>
  <div class="box">
    <div class="page">
      <h2>登录</h2>
      <div class="input">
        <el-input v-model="user.username" class="inp" placeholder="请输入用户名"></el-input>
        <el-input v-model="user.password" class="inp" placeholder="请输入密码"></el-input>
      </div>
      <el-button type="primary" @click="submit()">登录</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {successAlert,warningAlert} from '../../utils/alert'
import {login} from '../../utils/request'
export default {
  props: [],
  components: {},
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      userInfo:'user'
    }),
  },
  methods: {
    ...mapActions({
      reqUser:'reqUser'
    }),
    submit(){
      login(this.user).then(res=>{
        if(res.data.code == 200){
          successAlert(res.data.msg)
          this.reqUser(res.data.list)
          this.$router.push('/')
        }else{
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {},
};
</script>

<style scoped>
.box {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, rgb(85, 52, 68), rgb(48, 61, 96));
}
.page {
  width: 440px;
  height: 260px;
  background: white;
  border-radius: 12px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.input{
    width: 80%;
    margin: 0 auto;
}
.inp{
    margin-bottom: 18px;
}
</style>