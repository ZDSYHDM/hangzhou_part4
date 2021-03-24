<template>
  <div>
    <el-table :data="goodsList" style="width: 100%; margin-bottom: 20px" row-key="id" border>
      <el-table-column prop="id" label="商品编号"> </el-table-column>
      <el-table-column prop="goodsname" label="商品名称"> </el-table-column>
      <el-table-column prop="price" label="商品价格"> </el-table-column>
      <el-table-column prop="market_price" label="市场价格"> </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
            <div>
                <img :src="$imgUrl+scope.row.img" alt="">
            </div>
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.isnew == 1">是</el-button>
            <el-button type="info" v-else>否</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.ishot == 1">是</el-button>
            <el-button type="info" v-else>否</el-button>
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
            <el-button type="primary" @click="edit(scope.row.id)">编 辑</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删 除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" @current-change='changePage' :page-size="goodsSize" :total="goodsTotal"></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {successAlert,warningAlert} from '../../../utils/alert'
import {goodsDel} from '../../../utils/request'
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
        goodsList:'goodsList/listArr',
        goodsTotal:'goodsList/total',
        goodsSize:'goodsList/size'
    }),
  },
  methods: {
    ...mapActions({
        reqGoodsList:'goodsList/reqList',
        reqGoodsTotal:'goodsList/reqTotal',
        reqGoodsPage:'goodsList/reqPage'
    }),
    edit(id){
        this.$emit('edit',id)
    },
    del(id){
        goodsDel({id:id}).then(res=>{
            if(res.data.code == 200){
                successAlert(res.data.msg)
                this.reqGoodsList()
            }else{
                warningAlert(res.data.msg)
            }
        })
    },
    changePage(e){
        this.reqGoodsPage(e)
    }
  },
  mounted() {
      this.reqGoodsList()
      this.reqGoodsTotal()
  },
};
</script>

<style scoped>
img{
    width: 100px;
    height: 100px;
}
</style>