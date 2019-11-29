<template>
    <el-dialog title="选择员工" :visible.sync="dialogVisible" width="40%" :before-close="handleClose" v-cloak>
      <div class="dialog-body">
        <el-tree
              :data="employeeList"
              show-checkbox
              default-expand-all
              node-key="id"
              :filter-node-method="filterNode"
              :default-checked-keys = "seletedKeys"
              ref="tree"
              @check-change="handleCheckChange"
              :props="defaultProps">
              <span class="custom-tree-node clearfix" slot-scope="{ node, data }">
                  <span :title="node.label ">{{ node.label }}</span>
              </span>
          </el-tree>
      </div >
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" @click="ok">确定</el-button>
      </div>
    </el-dialog>
</template>
<script>
import ajax from '@/utils/request'
import { tool } from '@/utils/common'

export default {
  name: "EmployeeTreeSelect",
  mixins: [tool],
  props: {
    isShow: Boolean,
    seletedKeys: Array
  },
  data(){
      return {
          dialogVisible: false,
     
          employeeList:[],
          defaultProps:{
              children: 'children',
              label: 'name'
          },
          selectedData:[],
          loading:false,
      }
  },
  watch: {
    isShow(val) {
      this.dialogVisible = val;
      if (val === true) {
        this.getList();
      }
    }
  },
  methods: {
    filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
    },
    getList(){
        this.loading = true;
        ajax.get('/upms/organization/employeeTreeSelect/').then(rs => {
            if(rs.status === 0) {
                this.employeeList = rs.data
                this.loading = false
            }
        });
    },
    handleClose() {
      this.dialogVisible = false;
      this.$emit("beforeClose", this.dialogVisible);
    },
    handleCheckChange(data, checked, indeterminate) {
      let objArr = this.$refs.tree.getCheckedNodes()
      this.selectedData = objArr.filter((item)=> {
         return item.type === 1
      })
    },
    ok(){
        this.handleClose()
        this.emit();
    },
    emit() {
      this.$emit("selectedOnchange", this.selectedData);
    }
  }
}
</script>
<style lang="scss" scoped>
    .dialog-body {
        height: 60vh;
        overflow: auto;
    }
</style>