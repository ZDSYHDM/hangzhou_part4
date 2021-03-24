<template>
  <div>
    <el-dialog :title="obj.isAdd?'添加规格':'编辑规格'" :visible.sync="obj.isShow" width="40%" @close="close()">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label='规格名称'>
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item label='规格属性' v-for="(item,index) in attrArr" :key="index">
            <div class="attr">
                <el-input v-model="item.value"></el-input>
                <el-button type="primary" v-if="index==0" @click="addAttr()">新增规格属性</el-button>
                <el-button type="danger" v-else @click="delAttr(index)">删 除</el-button>
            </div>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" v-if="obj.isAdd" @click="submit()">添加</el-button>
        <el-button type="primary" v-else @click="edit()">编辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {specsAdd,specsInfo,specsEdit} from '../../../utils/request'
import {successAlert,warningAlert} from '../../../utils/alert'
export default {
  props: ["obj"],
  components: {},
  data() {
    return {
        form:{
            specsname:'',
            attrs:'',
            status:1
        },
        attrArr:[{value:''},{value:''}]
    };
  },
  computed: {
    ...mapGetters({
        specsList:'specsList/listArr'
    }),
  },
  methods: {
    ...mapActions({
        reqSpecsList:'specsList/reqList',
        reqSpecsCount:'specsList/reqTotal'
    }),
    // 添加一条属性
    addAttr(){
        this.attrArr.push({value:''})
    },
    // 删除一条属性
    delAttr(index){
        this.attrArr.splice(index,1)
    },
    // 初始化表单数据
    empty(){
        this.form = {
            specsname:'',
            attrs:'',
            status:1
        }
    },
    // 关闭对话框
    close(){
        this.obj.isShow = false
        this.empty()
        this.attrArr = [{value:''},{value:''}]
    },
    // 提交添加信息给后台
    submit(){
        this.form.attrs = JSON.stringify(this.attrArr.map(item=>item.value))
        specsAdd(this.form).then(res=>{
            if(res.data.code == 200){
                // 提交成功时的提示信息
                successAlert(res.data.msg)
                // 关闭对话框并初始化表单数据
                this.close()
                this.reqSpecsList()
                this.reqSpecsCount()
            }else{
                // 提交失败时的提示信息
                warningAlert(res.data.msg)
            }
        })
    },
    // 获取一条信息
    getOne(id){
        specsInfo(id).then(res=>{
            this.form = res.data.list[0]
            this.attrArr = JSON.parse(res.data.list[0].attrs).map(item=>({value:item}))
        })
    },
    // 修改信息
    edit(){
        this.form.attrs = JSON.stringify(this.attrArr.map(item=>item.value))
        specsEdit(this.form).then(res=>{
            if(res.data.code == 200){
                successAlert(res.data.msg)
                this.close()
                this.reqSpecsList()
            }
        })
    }
  },
  mounted() {},
};
</script>

<style scoped>
.attr{
    display: flex;
}
</style>