<template>
  <div class="app-container white-bg list-panel" v-cloak>
    <div class="opertion-box">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="add()" style="margin-right:10px">创建</el-button>
      <el-input v-model="searchParam.zy_input" placeholder="请输入" clearable class="zy_input" style="width:190px"></el-input>
      <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
      <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
      <el-button type="primary" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">重置</el-button>
      <el-button type="primary" icon="el-icon-upload" size="small" @click="exportExcel()">导出</el-button>
    </div>
    <!-- 展开更多查询开始 -->
    <el-collapse-transition>
      <div class="search-box" v-show="isShowMore">
        <div class="form-box">
          <div class="form-group">
            <label class="control-label">主键</label>
            <div class="input-group">
              <el-input v-model="searchParam.id" placeholder="请输入主键"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">名称</label>
            <div class="input-group">
              <el-input v-model="searchParam.name" placeholder="请输入名称"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">联系方式</label>
            <div class="input-group">
              <el-input v-model="searchParam.phone" placeholder="请输入联系方式"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">邮箱</label>
            <div class="input-group">
              <el-input v-model="searchParam.email" placeholder="请输入邮箱"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">职务</label>
            <div class="input-group">
              <el-input v-model="searchParam.post" placeholder="请输入职务"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">部门</label>
            <div class="input-group">
              <el-input v-model="searchParam.department" placeholder="请输入部门"></el-input>
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
            <label class="control-label">更新人</label>
            <div class="input-group">
              <el-input v-model="searchParam.updater" placeholder="请输入更新人"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">创建时间</label>
            <div class="input-group">
              <el-input v-model="searchParam.createTime" placeholder="请输入创建时间"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">更新时间</label>
            <div class="input-group">
              <el-input v-model="searchParam.updateTime" placeholder="请输入更新时间"></el-input>
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
        <el-table-column prop="id" sortable show-overflow-tooltip min-width="100" label="主键"></el-table-column>
        <el-table-column prop="name" sortable show-overflow-tooltip min-width="100" label="名称"></el-table-column>
        <el-table-column prop="phone" sortable show-overflow-tooltip min-width="100" label="联系方式"></el-table-column>
        <el-table-column prop="email" sortable show-overflow-tooltip min-width="100" label="邮箱"></el-table-column>
        <el-table-column prop="post" sortable show-overflow-tooltip min-width="100" label="职务"></el-table-column>
        <el-table-column prop="department" sortable show-overflow-tooltip min-width="100" label="部门"></el-table-column>
        <el-table-column prop="status" sortable show-overflow-tooltip min-width="100" label="数据状态(0-删除，1-正常)"></el-table-column>
        <el-table-column prop="creater" sortable show-overflow-tooltip min-width="100" label="创建人"></el-table-column>
        <el-table-column prop="updater" sortable show-overflow-tooltip min-width="100" label="更新人"></el-table-column>
        <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="100" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" sortable show-overflow-tooltip min-width="100" label="更新时间"></el-table-column>
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
  name: 'PowerProprietorContact',
  mixins: [tool],
  data() {
    return {
      isShowMore: false,
      listUrl: "project/powerproprietorcontact",
      showSearch: false,
      showAddBtn: this.getCurrentUserAuthority("/powerproprietorcontact/save"),
      showEditBtn: this.getCurrentUserAuthority("/powerproprietorcontact/edit")
    }
  },
  mounted() {
    this.getList();
  },
  methods: {

  }
}
</script>
