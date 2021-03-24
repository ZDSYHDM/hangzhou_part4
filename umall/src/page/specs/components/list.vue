<template>
  <div>
    <el-table :data="specsList" border style="width: 100%">
      <el-table-column prop="id" label="规格编号"> </el-table-column>
      <el-table-column prop="specsname" label="规格名称"> </el-table-column>
      <el-table-column label="规格属性">
        <template slot-scope="scope">
          <div>
            <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.status == 1">启 用</el-button>
            <el-button type="info" v-else>禁 用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="edit(scope.row.id)"
              >编 辑</el-button
            >
            <el-button type="danger" @click="del(scope.row.id)"
              >删 除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" @current-change='changePage' :page-size="specsSize" :total="specsTotal">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { specsDel } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      specsList: "specsList/listArr",
      specsTotal:'specsList/total',
      specsSize:'specsList/size'
    }),
  },
  methods: {
    ...mapActions({
      reqSpecsList: "specsList/reqList",
      reqSpecsCount:'specsList/reqTotal',
      reqSpecsPage:'specsList/reqPage'
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      specsDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqSpecsList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    changePage(e){
        this.reqSpecsPage(e)
    }
  },
  mounted() {
    this.reqSpecsList();
    this.reqSpecsCount()
  },
};
</script>

<style scoped>
</style>