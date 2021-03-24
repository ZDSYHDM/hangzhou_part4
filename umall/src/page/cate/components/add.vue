<template>
  <div>
    <el-dialog
      :title="obj.isAdd ? '分类添加' : '分类编辑'"
      :visible.sync="obj.isShow"
      width="50%"
      @close="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上级分类">
          <el-select v-model="form.pid">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="updBox">
            <h3>+</h3>
            <input type="file" @change="getInp">
            <img :src="imgUrl" v-if="imgUrl">
          </div>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="submit()" v-if="obj.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="edit()" v-else>编 辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { cateAdd, cateInfo, cateEdit } from "../../../utils/request.js";
import { successAlert, warningAlert } from "../../../utils/alert.js";
export default {
  props: ["obj"],
  components: {},
  data() {
    return {
      form: {
        catename: "",
        pid: 0,
        img:'',
        status: 1,
      },
      imgUrl:''
    };
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
    getInp(e){
      this.form.img = e.target.files[0];
      this.imgUrl = URL.createObjectURL(e.target.files[0])
    },
    submit() {
      cateAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.close();
          this.reqCateList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    edit() {
      cateEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.close();
          this.reqCateList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    empty() {
      this.form = {
        catename: "",
        pid: 0,
        img:'',
        status: 1,
      };
      this.imgUrl = ''
    },
    close() {
      this.obj.isShow = false;
      this.empty();
    },
    getOne(id) {
      cateInfo(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgUrl = this.$imgUrl + res.data.list.img
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.updBox{
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  position: relative;
}
.updBox h3{
  text-align: center;
  line-height: 150px;
  font-size: 36px;
  margin: 0;
}
.updBox input{
  position: absolute;
  left: 0;
  top: 0;
  width: 150px;
  height: 150px;
  z-index: 999;
  outline: none;
  opacity: 0;
}
.updBox img{
  position: absolute;
  left: 0;
  top: 0;
  width: 150px;
  height: 150px;
  z-index: 1;
}
</style>