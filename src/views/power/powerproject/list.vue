<template>
  <div class="app-container white-bg list-panel" v-cloak>
    <div class="opertion-box">
      <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF;margin-right:10px" icon="el-icon-plus" size="small" @click="add()" >创建</el-button>
      <el-input v-model="searchParam.zy_input" placeholder="请输入" clearable class="zy_input" style="width:190px"></el-input>
      <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
      <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
      <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">重置</el-button>
      <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" icon="el-icon-upload" size="small" @click="exportExcel()">导出</el-button>
    </div>
    <!-- 展开更多查询开始 -->
    <el-collapse-transition>
      <div class="search-box" v-show="isShowMore">
        <div class="form-box">
          <div class="form-group">
            <label class="control-label">主键id</label>
            <div class="input-group">
              <el-input v-model="searchParam.id" placeholder="请输入主键id"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">项目任务书id</label>
            <div class="input-group">
              <el-input v-model="searchParam.projectTaskId" placeholder="请输入项目任务书id"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">项目状态（1-暂存 2-进行中 3-已暂停 4-已完成）</label>
            <div class="input-group">
              <el-input v-model="searchParam.projectStatus" placeholder="请输入项目状态（1-暂存  2-进行中  3-已暂停  4-已完成）"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">开始时间</label>
            <div class="input-group">
              <el-input v-model="searchParam.startTime" placeholder="请输入开始时间"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">结束时间</label>
            <div class="input-group">
              <el-input v-model="searchParam.endTime" placeholder="请输入结束时间"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">数据状态(0-删除，1-正常)</label>
            <div class="input-group">
              <el-input v-model="searchParam.status" placeholder="请输入数据状态(0-删除，1-正常)"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">创建人</label>
            <div class="input-group">
              <el-input v-model="searchParam.creater" placeholder="请输入创建人"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">修改人</label>
            <div class="input-group">
              <el-input v-model="searchParam.updater" placeholder="请输入修改人"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">创建时间</label>
            <div class="input-group">
              <el-input v-model="searchParam.createTime" placeholder="请输入创建时间"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">修改时间</label>
            <div class="input-group">
              <el-input v-model="searchParam.updateTime" placeholder="请输入修改时间"></el-input>
            </div>
          </div>
        </div>
      </div>
    </el-collapse-transition>
    <div class="division-line"></div>
    <div class="table-box">
      <el-table :data="list" style="width: 100%">
        <el-table-column fixed label="操作" width="120">
          <template fixed slot-scope="{ row, column, $index }">
            <el-button v-show="showEditBtn" @click="edit(row.id)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="id" sortable show-overflow-tooltip min-width="100" label="主键id"></el-table-column>
        <el-table-column prop="projectTaskId" sortable show-overflow-tooltip min-width="100" label="项目任务书id"></el-table-column>
        <el-table-column prop="projectStatus" sortable show-overflow-tooltip min-width="100" label="项目状态（1-暂存  2-进行中  3-已暂停  4-已完成）"></el-table-column>
        <el-table-column prop="startTime" sortable show-overflow-tooltip min-width="100" label="开始时间"></el-table-column>
        <el-table-column prop="endTime" sortable show-overflow-tooltip min-width="100" label="结束时间"></el-table-column>
        <el-table-column prop="status" sortable show-overflow-tooltip min-width="100" label="数据状态(0-删除，1-正常)"></el-table-column>
        <el-table-column prop="creater" sortable show-overflow-tooltip min-width="100" label="创建人"></el-table-column>
        <el-table-column prop="updater" sortable show-overflow-tooltip min-width="100" label="修改人"></el-table-column>
        <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="100" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" sortable show-overflow-tooltip min-width="100" label="修改时间"></el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="pageSizeSetting" :page-size="pageSize" :layout="pageLayout" :total="listCount">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import ajax from '@/utils/request'
import { tool } from '@/utils/common'

export default {
  name: 'PowerProject',
  mixins: [tool],
  data() {
    return {
      isShowMore: false,
      listUrl: "project/powerproject",
      showSearch: false,
      showAddBtn: this.getCurrentUserAuthority("/powerproject/save"),
      showEditBtn: this.getCurrentUserAuthority("/powerproject/edit")
    }
  },
  mounted() {
    this.getList();
  },
  methods: {

  }
}
</script>
