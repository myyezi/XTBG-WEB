<template>
  <el-dialog title="选择员工" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" v-cloak>
    <div class="app-container white-bg list-panel">
      <div class="opertion-box">
        <el-input v-model="searchParam.nameOrPhone" placeholder="请输入姓名或手机号" clearable class="zy_input" style="width:190px"></el-input>
        <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
        <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">重置</el-button>
      </div>
      <div class="table-box">
        <el-table :data="list" style="width: 100%" @row-dblclick="rowDblclickHandle">
          <el-table-column fixed label="操作" width="100">
            <template fixed slot-scope="{ row, column, $index }">
              <el-button @click="selectedRow(row)" type="text" size="small">选择</el-button>
            </template>
            </el-table-column>
            <el-table-column prop="name" fixed sortable show-overflow-tooltip min-width="120" label="姓名"></el-table-column>
            <el-table-column prop="account" sortable show-overflow-tooltip min-width="150" label="手机号"> </el-table-column>
            <el-table-column prop="organizations" sortable show-overflow-tooltip min-width="150" label="组织"></el-table-column>
            <el-table-column prop="roles" sortable show-overflow-tooltip min-width="150" label="角色"></el-table-column>
            <el-table-column prop="positions" sortable show-overflow-tooltip min-width="150" label="职位"></el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="pageSizeSetting" :page-size="pageSize" :layout="pageLayout" :total="listCount"></el-pagination>
      </div>
    </div>
  </el-dialog>
</template>
<script>

import ajax from '@/utils/request'
import { tool } from '@/utils/common'

export default {
  name: "UserSelect",
  mixins: [tool],
  props: {
    isShow: Boolean
  },
  data() {
    return {
      isShowMore: false,
      listUrl: "/upms/employee",
      showSearch: false,
      selectedData: {},
      dialogVisible: false,
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
    selectedRow(row) {
      this.selectedData = row;
      this.emit();
    },
    handleClose() {
      this.selectedData = {};
      this.emit();
    },
    rowDblclickHandle(row) {
      this.selectedData = row;
      this.emit();
    },
    emit() {
      this.$emit("selectedOnchange", this.selectedData);
      this.dialogVisible = false;
    }
  }
};
</script>
