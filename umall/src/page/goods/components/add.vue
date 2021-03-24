<template>
  <div>
    <el-dialog :title="obj.isAdd?'添加商品':'商品编辑'" :visible.sync="obj.isShow" width="40%" @close="close">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="一级分类">
          <el-select
            v-model="form.first_cateid"
            @change="getsec"
            placeholder="请选择一级分类"
          >
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" placeholder="请选择二级分类">
            <el-option v-for="item in cateArr.children" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="pic">
            <h3>+</h3>
            <input type="file" @change="getPic" />
            <img :src="imgUrl" v-if="imgUrl" />
          </div>
        </el-form-item>
        <el-form-item label="商品规格">
          <el-select v-model="form.specsid" @change="getspe" placeholder="请选择商品规格">
            <el-option v-for="item in specsList" :key="item.id" :label="item.specsname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性">
          <el-select v-model="form.specsattr" multiple placeholder="请选择">
            <el-option v-for="item in specsArr" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品">
          <el-radio-group v-model="form.isnew">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否热卖">
          <el-radio-group v-model="form.ishot">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item label="商品描述">
          <textarea v-model="form.description" cols="30" rows="10"></textarea>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" v-if="obj.isAdd" @click="submit()">添 加</el-button>
        <el-button type="primary" v-else @click="edit()">编 辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {successAlert,warningAlert} from '../../../utils/alert'
import {goodsAdd,goodsInfo,goodsEdit} from '../../../utils/request'
export default {
  props: ["obj"],
  components: {},
  data() {
    return {
      cateArr: [],
      specsArr:[],
      imgUrl: "",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cateList/listArr",
      specsList:"specsList/listArr",
      goodsList:'goodsList/listArr'
    }),
  },
  methods: {
    ...mapActions({
      reqCateList: "cateList/reqList",
      reqSpecsList:'specsList/reqList',
      reqGoodsList:'goodsList/reqList',
      reqGoodsTotal:'goodsList/reqTotal'
    }),
    getsec() {
        this.cateArr = this.cateList.find(item=>item.id == this.form.first_cateid)
        this.form.second_cateid = ''
    },
    getspe(){
        this.specsArr = this.specsList.find(item=>item.id == this.form.specsid).attrs
        this.form.specsattr = ''
    },
    getPic(e){
        this.form.img = e.target.files[0]
        this.imgUrl = URL.createObjectURL(e.target.files[0])
    },
    empty(){
        this.form = {
            first_cateid: "",
            second_cateid: "",
            goodsname: "",
            price: "",
            market_price: "",
            img: "",
            description: "",
            specsid: "",
            specsattr: [],
            isnew: 1,
            ishot: 1,
            status: 1,
        }
        this.imgUrl = ''
    },
    close(){
        this.obj.isShow = false
        this.empty()
    },
    submit(){
        this.form.specsattr = JSON.stringify(this.form.specsattr)
        goodsAdd(this.form).then(res=>{
            if(res.data.code == 200){
                successAlert(res.data.msg)
                this.close()
                this.reqGoodsList()
                this.reqGoodsTotal()
            }else{
                warningAlert(res.data.msg)
            }
        })
    },
    getOne(id){
        goodsInfo(id).then(res=>{
            this.form = res.data.list
            this.cateArr = this.cateList.find(item=>item.id == this.form.first_cateid)
            this.specsArr = JSON.parse(res.data.list.specsattr)
            this.form.specsattr = this.specsArr
            this.imgUrl = this.$imgUrl+res.data.list.img
            this.form.id = id
        })
    },
    edit(){
        this.form.specsattr = JSON.stringify(this.form.specsattr)
        console.log(this.form);
        goodsEdit(this.form).then(res=>{
            if(res.data.code == 200){
                successAlert(res.data.msg)
                this.close()
                this.reqGoodsList()
            }else{
                warningAlert(res.data.msg)
            }
        })
    }
  },
  mounted() {
    this.reqCateList();
    this.reqSpecsList()
  },
};
</script>

<style scoped>
.pic {
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  position: relative;
  text-align: center;
}
.pic h3 {
  font-size: 36px;
  line-height: 150px;
  margin: 0;
}
.pic input {
  width: 150px;
  height: 150px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  z-index: 999;
}
.pic img {
  width: 150px;
  height: 150px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
</style>