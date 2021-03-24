<template>
  <div>
    <el-dialog
      :title="obj.isAdd ? '添加角色' : '编辑角色'"
      :visible.sync="obj.isShow"
      width="50%"
      @close="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <el-tree
          :data="menuList"
          show-checkbox
          node-key="id"
          ref="tree"
          highlight-current
          :props="{children:'children', label:'title'}"
        >
        </el-tree>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="submit()" v-if="obj.isAdd">添 加</el-button>
        <el-button type="primary" @click="edit()" v-else>编 辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {roleAdd,roleInfo,roleEdit} from '../../../utils/request.js'
import {successAlert,warningAlert} from "../../../utils/alert"
export default {
  props: ["obj"],
  components: {},
  data() {
    return {
      form: {
        rolename: "",
        menus:'',
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
        menuList:'menuList/listArr',
        roleList:'roleList/listArr'
    }),
  },
  methods: {
    ...mapActions({
        reqMenuList:'menuList/reqList',
        reqRoleList:'roleList/reqList'
    }),
    empty(){
        this.form = {
            rolename: "",
            menus:'',
            status: 1,
        }
    },
    close() {
        this.obj.isShow = false
        this.empty()
        this.$refs.tree.setCheckedKeys([])
    },
    submit(){
        this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
        roleAdd(this.form).then(res=>{
            if(res.data.code == 200){
                successAlert(res.data.msg)
                this.close()
                this.reqRoleList()
            }else{
                warningAlert(res.data.msg)
            }
        })
    },
    getOne(id){
      roleInfo(id).then(res=>{
        this.form = res.data.list
        this.form.id = id
        this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus))
      })
    },
    edit(){
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
      roleEdit(this.form).then(res=>{
        if(res.data.code == 200){
          successAlert(res.data.msg)
          this.close()
          this.reqRoleList()
        }else{
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {
      this.reqMenuList()
  },
};
</script>

<style scoped>
</style>