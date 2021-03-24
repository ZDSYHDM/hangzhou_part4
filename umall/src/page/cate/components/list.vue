<template>
  <div>
    <el-table
      :data="cateList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="分类编号"></el-table-column>
      <el-table-column prop="catename" label="分类名称"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <div>
            <img :src="$imgUrl+scope.row.img" >
          </div>
        </template>
      </el-table-column>
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
import {cateDel} from '../../../utils/request.js'
import { successAlert, warningAlert } from "../../../utils/alert.js";
export default {
  props: [],
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      cateList: "cateList/listArr",
    }),
  },
  methods: {
    ...mapActions({
      reqCateList: "cateList/reqList",
    }),
    edit(id){
      this.$emit('edit',id)
    },
    del(id){
      cateDel({id,id}).then(res=>{
        if(res.data.code == 200){
          successAlert(res.data.msg)
          this.reqCateList()
        }else{
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {
    this.reqCateList()
  },
};
</script>

<style scoped>
img{
  width: 100px;
  height: 100px;
}
</style>