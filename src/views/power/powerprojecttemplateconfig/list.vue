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
            <label class="control-label">模板id</label>
            <div class="input-group">
              <el-input v-model="searchParam.templateId" placeholder="请输入模板id"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">节点名称</label>
            <div class="input-group">
              <el-input v-model="searchParam.name" placeholder="请输入节点名称"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">节点级别（1- 一级，2-二级，3-三级）</label>
            <div class="input-group">
              <el-input v-model="searchParam.level" placeholder="请输入节点级别（1- 一级，2-二级，3-三级）"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">父节点id</label>
            <div class="input-group">
              <el-input v-model="searchParam.parentId" placeholder="请输入父节点id"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">工程阶段（关联字典表，取value值）</label>
            <div class="input-group">
              <el-input v-model="searchParam.stage" placeholder="请输入工程阶段（关联字典表，取value值）"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">工期</label>
            <div class="input-group">
              <el-input v-model="searchParam.period" placeholder="请输入工期"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">专业</label>
            <div class="input-group">
              <el-input v-model="searchParam.profession" placeholder="请输入专业"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">是否审批（0-否 1-是）</label>
            <div class="input-group">
              <el-input v-model="searchParam.isApproval" placeholder="请输入是否审批（0-否 1-是）"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">是否上传文件（0-否 1-是）</label>
            <div class="input-group">
              <el-input v-model="searchParam.isUpload" placeholder="请输入是否上传文件（0-否 1-是）"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">排序号</label>
            <div class="input-group">
              <el-input v-model="searchParam.sortNum" placeholder="请输入排序号"></el-input>
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
        <el-table-column prop="templateId" sortable show-overflow-tooltip min-width="100" label="模板id"></el-table-column>
        <el-table-column prop="name" sortable show-overflow-tooltip min-width="100" label="节点名称"></el-table-column>
        <el-table-column prop="level" sortable show-overflow-tooltip min-width="100" label="节点级别（1- 一级，2-二级，3-三级）"></el-table-column>
        <el-table-column prop="parentId" sortable show-overflow-tooltip min-width="100" label="父节点id"></el-table-column>
        <el-table-column prop="stage" sortable show-overflow-tooltip min-width="100" label="工程阶段（关联字典表，取value值）"></el-table-column>
        <el-table-column prop="period" sortable show-overflow-tooltip min-width="100" label="工期"></el-table-column>
        <el-table-column prop="profession" sortable show-overflow-tooltip min-width="100" label="专业"></el-table-column>
        <el-table-column prop="isApproval" sortable show-overflow-tooltip min-width="100" label="是否审批（0-否 1-是）"></el-table-column>
        <el-table-column prop="isUpload" sortable show-overflow-tooltip min-width="100" label="是否上传文件（0-否 1-是）"></el-table-column>
        <el-table-column prop="sortNum" sortable show-overflow-tooltip min-width="100" label="排序号"></el-table-column>
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
  name: 'PowerProjectTemplateConfig',
  mixins: [tool],
  data() {
    return {
      isShowMore: false,
      listUrl: "project/powerprojecttemplateconfig",
      showSearch: false,
      showAddBtn: this.getCurrentUserAuthority("/powerprojecttemplateconfig/save"),
      showEditBtn: this.getCurrentUserAuthority("/powerprojecttemplateconfig/edit")
    }
  },
  mounted() {
    this.getList();
  },
  methods: {

  }
}
</script>
