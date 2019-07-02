<template>
  <el-dialog title="选择项目" :visible.sync="dialogVisible" width="60%" :before-close="handleClose" v-cloak>
    <div class="app-container white-bg list-panel">
      <div class="opertion-box">
        <el-input v-model="searchParam.zy_input" placeholder="请输入" clearable class="zy_input" style="width:190px"></el-input>
        <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
        <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
        <el-button type="primary" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">重置</el-button>
      </div>
      <!-- 展开更多查询开始 -->
      <el-collapse-transition>
        <div class="search-box" v-show="isShowMore">
          <div class="form-box">
            <div class="form-group">
              <label class="control-label">编号</label>
              <div class="input-group">
                <el-input v-model="searchParam.code" placeholder="请输入编号"></el-input>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label">名称</label>
              <div class="input-group">
                <el-input v-model="searchParam.name" placeholder="请输入名称"></el-input>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label">类型</label>
              <div class="input-group">
                <el-input v-model="searchParam.type" placeholder="请输入类型"></el-input>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-transition>
      <div class="division-line"></div>
      <div class="table-box">
        <el-table :data="list" style="width: 100%" @row-dblclick="rowDblclickHandle">
          <el-table-column fixed label="操作" width="120">
            <template fixed slot-scope="{ row, column, $index }">
              <el-button @click="selectedRow(row)" type="text" size="small">选择</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="code" sortable show-overflow-tooltip min-width="100" label="项目编号"></el-table-column>
          <el-table-column prop="name" sortable show-overflow-tooltip min-width="100" label="项目名称"></el-table-column>
          <el-table-column prop="type" sortable show-overflow-tooltip min-width="100" label="项目类型"></el-table-column>
          <el-table-column prop="adress" sortable show-overflow-tooltip min-width="100" label="项目地址"></el-table-column>
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
  name: "ProjectSelect",
  mixins: [tool],
  props: {
    isShow: Boolean
  },
  data() {
    return {
      isShowMore: false,
      listUrl: "core/project",
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
