<template>
  <div>
    <el-dialog
      :title="obj.isAdd ? '菜单添加' : '菜单编辑'"
      :visible.sync="obj.isShow"
      width="50%"
      @close="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.pid" @change="changePid()">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in listArr"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" v-if="form.type == 1">
          <el-select v-model="form.icon">
            <el-option v-for="item in iconArr" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" v-else>
          <el-select v-model="form.url">
            <el-option
              v-for="item in url"
              :key="item.path"
              :label="item.name"
              :value="'/' + item.path"
            ></el-option>
          </el-select>
        </el-form-item>
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
import { url } from "../../../router/index.js";
import { menuAdd, menuInfo, menuEdit } from "../../../utils/request.js";
import { successAlert, warningAlert } from "../../../utils/alert.js";
export default {
  props: ["obj"],
  components: {},
  data() {
    return {
      iconArr: [
        "el-icon-delete-solid",
        "el-icon-s-tools",
        "el-icon-star-on",
        "el-icon-question",
        "el-icon-upload",
      ],
      url,
      form: {
        title: "",
        pid: 0,
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      listArr: "menuList/listArr",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "menuList/reqList",
    }),
    changePid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
        this.form.url = "";
      } else {
        this.form.type = 2;
        this.form.icon = "";
      }
    },
    submit() {
      menuAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.close();
          this.reqList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    edit() {
      menuEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.close();
          this.reqList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    empty() {
      this.form = {
        title: "",
        pid: 0,
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    close() {
      this.obj.isShow = false;
      this.empty();
    },
    getOne(id) {
      menuInfo(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
</style>