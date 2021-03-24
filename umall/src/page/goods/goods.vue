<template>
  <div>
    <el-button type="primary" @click="add()">添加</el-button>
    <v-add :obj='obj' ref="info"></v-add>
    <v-list @edit='edit'></v-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  props: [],
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
        obj:{
            isShow : false,
            isAdd : false
        }
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    add() {
        this.obj.isShow = true
        this.obj.isAdd = true
    },
    edit(id){
        this.obj.isShow = true
        this.obj.isAdd = false
        this.$refs.info.getOne(id)
    }
  },
  mounted() {},
};
</script>

<style scoped>
</style>