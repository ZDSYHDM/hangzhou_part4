<template>
  <div>
    <el-dialog :title="obj.isAdd?'添加管理员':'编辑管理员'" :visible.sync="obj.isShow" @close="close">
      <el-form :model="form"  label-width="80px">
        <el-form-item label="所属角色" >
          <el-select v-model="form.roleid" placeholder="-请选择-">
            <el-option v-for="item in roleList" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" >
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2" ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="submit()" v-if="obj.isAdd">添加</el-button>
        <el-button type="primary" v-else @click="edit()">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {manageAdd,manageInfo,manageEdit} from '../../../utils/request'
import {successAlert,warningAlert} from '../../../utils/alert'
export default {
  props: ['obj'],
  components: {},
  data() {
    return {
      form: {
        roleid:'',
        username:'',
        password:'',
        status:1
      },
    };
  },
  computed: {
    ...mapGetters({
        roleList:'roleList/listArr',
        manageList:'manageList/listArr'
    }),
  },
  methods: {
    ...mapActions({
        reqRoleList:'roleList/reqList',
        reqManageList:'manageList/reqList',
        reqManageCount:'manageList/reqCount'
    }),
    empty(){
        this.form = {
            roleid:'',
            username:'',
            password:'',
            status:1
        }
    },
    close(){
        this.obj.isShow = false
        this.empty()
    },
    submit(){
        manageAdd(this.form).then(res=>{
            if(res.data.code == 200){
                successAlert(res.data.msg)
                this.close()
                this.reqManageList()
                this.reqManageCount()
            }else{
                warningAlert(res.data.msg)
            }
        })
    },
    getOne(id){
        manageInfo(id).then(res=>{
            this.form = res.data.list
            this.form.password = ''
        })
    },
    edit(){
        manageEdit(this.form).then(res=>{
            if(res.data.code == 200){
                successAlert(res.data.msg)
                this.close()
                this.reqManageList()
            }else{
                warningAlert(res.data.msg)
            }
        })
    }
  },
  mounted() {
      this.reqRoleList()
  },
};
</script>

<style scoped>
</style>