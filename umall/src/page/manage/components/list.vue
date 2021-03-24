<template>
  <div>
    <el-table :data="manageList" border style="width: 100%">
      <el-table-column prop="roleid" label="用户编号"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.status==1">启 用</el-button>
            <el-button type="info" v-else>禁 用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="edit(scope.row.uid)">编 辑</el-button>
            <el-button type="danger" @click="del(scope.row.uid)">删 除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" @current-change="changePage" :page-size="manageSize" :total="manageCount"></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from '../../../utils/alert';
import {manageDel} from '../../../utils/request'
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
        manageList:'manageList/listArr',
        manageCount:'manageList/total',
        manageSize:'manageList/size',
    }),
  },
  methods: {
    ...mapActions({
        reqManageList:'manageList/reqList',
        reqManageCount:'manageList/reqCount',
        reqChangePage:'manageList/reqChangePage'
    }),
    edit(id){
        this.$emit('edit',id)
    },
    del(id){
        manageDel({uid:id}).then(res=>{
            if(res.data.code == 200){
                successAlert(res.data.msg)
                this.reqManageList()
                this.reqManageCount()
            }else{
                warningAlert(res.data.msg)
            }
        })
    },
    changePage(e){
        this.reqChangePage(e)
    }
  },
  mounted() {
      this.reqManageList()
      this.reqManageCount()
  },
};
</script>

<style scoped>
</style>