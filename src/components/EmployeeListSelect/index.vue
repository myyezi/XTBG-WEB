<template>
  <el-dialog title="选择员工" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" v-cloak>
    <div class="app-container white-bg list-panel">
      <div class="opertion-box">
        <el-input v-model="searchParam.nameOrPhone" placeholder="请输入姓名或手机号" clearable class="zy_input" style="width:190px"></el-input>
        <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">重置</el-button>
      </div>
      <div class="table-box">
        <el-table :data="list" style="width: 100%" ref="multipleTable">
            <el-table-column fixed label="操作" type="selection" width="55"></el-table-column>
            <el-table-column prop="name" fixed sortable show-overflow-tooltip min-width="120" label="姓名"></el-table-column>
            <el-table-column prop="account" sortable show-overflow-tooltip min-width="150" label="手机号"> </el-table-column>
            <el-table-column prop="organizations" sortable show-overflow-tooltip min-width="150" label="组织"></el-table-column>
            <el-table-column prop="roles" sortable show-overflow-tooltip min-width="150" label="角色"></el-table-column>
            <el-table-column prop="positions" sortable show-overflow-tooltip min-width="150" label="职位"></el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="pageSizeSetting" :page-size="pageSize" :layout="pageLayout" :total="listCount"></el-pagination>
        <div style="margin-top: 20px">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button @click="ok">确定</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>

import ajax from '@/utils/request'
import { tool } from '@/utils/common'

export default {
  name: "ProjectSelect",
  mixins: [tool],
  props: {
    isShow: Boolean
  },
  data() {
    return {
      isShowMore: false,
      listUrl: "/upms/employee",
      showSearch: false,
      selectedData: [],
      dialogVisible: false,
      multipleSelection:[],
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
  mounted() {
    //this.getList();
  },
  methods: {
    handleClose() {
      this.selectedData = [];
      this.emit();
    },
    ok(){
        this.selectedData = this.$refs.multipleTable.selection;
        this.emit();
    },
    emit() {
      this.$emit("selectedOnchange", this.selectedData);
      this.dialogVisible = false;
    }
  }
};
</script>
