<template>
  <div>
    <el-table
      :data="menuList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="菜单编号"></el-table-column>
      <el-table-column prop="title" label="菜单名称"></el-table-column>
      <el-table-column label="菜单图标">
        <template slot-scope="scope">
          <div>
            <i :class="scope.row.icon"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.status == 1"
              >启 用</el-button
            >
            <el-button type="info" v-else>禁 用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="edit(scope.row.id)">编 辑</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删 除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {menuDel} from '../../../utils/request.js'
import { successAlert, warningAlert } from "../../../utils/alert.js";
export default {
  props: [],
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      menuList: "menuList/listArr",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "menuList/reqList",
    }),
    edit(id){
      this.$emit('edit',id)
    },
    del(id){
      menuDel({id,id}).then(res=>{
        if(res.data.code == 200){
          successAlert(res.data.msg)
          this.reqList()
        }else{
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {
    this.reqList();
  },
};
</script>

<style scoped>
</style>