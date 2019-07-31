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
            <label class="control-label">所属管理公司(组织表管理公司id)</label>
            <div class="input-group">
              <el-input v-model="searchParam.companyId" placeholder="请输入所属管理公司(组织表管理公司id)"></el-input>
            </div>
          </div>
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
            <label class="control-label">项目类型（关联字典表，取value值）</label>
            <div class="input-group">
              <el-input v-model="searchParam.type" placeholder="请输入项目类型（关联字典表，取value值）"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">建设单位(关联业主表)</label>
            <div class="input-group">
              <el-input v-model="searchParam.proprietorId" placeholder="请输入建设单位(关联业主表)"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">联系人(关联业主联系人表)</label>
            <div class="input-group">
              <el-input v-model="searchParam.proprietorContactId" placeholder="请输入联系人(关联业主联系人表)"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">任务依据（1-委托书 2-招投标 3-电话委托 4-其他）</label>
            <div class="input-group">
              <el-input v-model="searchParam.source" placeholder="请输入任务依据（1-委托书  2-招投标  3-电话委托  4-其他）"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">相关设（关联字典表，取value值,多个逗号隔开）</label>
            <div class="input-group">
              <el-input v-model="searchParam.relatedDesign" placeholder="请输入相关设（关联字典表，取value值,多个逗号隔开）"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">协办部门(关联字典表，取value值,多个逗号隔开)</label>
            <div class="input-group">
              <el-input v-model="searchParam.coDepartment" placeholder="请输入协办部门(关联字典表，取value值,多个逗号隔开)"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">项目经理(关联用户表)</label>
            <div class="input-group">
              <el-input v-model="searchParam.manager" placeholder="请输入项目经理(关联用户表)"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">签收状态(1-未签收 2-已签收)</label>
            <div class="input-group">
              <el-input v-model="searchParam.signStatus" placeholder="请输入签收状态(1-未签收  2-已签收)"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">签收人(关联用户表)</label>
            <div class="input-group">
              <el-input v-model="searchParam.signer" placeholder="请输入签收人(关联用户表)"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">签收时间</label>
            <div class="input-group">
              <el-input v-model="searchParam.signTime" placeholder="请输入签收时间"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">设计规模</label>
            <div class="input-group">
              <el-input v-model="searchParam.designScale" placeholder="请输入设计规模"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">设计范围</label>
            <div class="input-group">
              <el-input v-model="searchParam.designRange" placeholder="请输入设计范围"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">项目进度要求</label>
            <div class="input-group">
              <el-input v-model="searchParam.progress" placeholder="请输入项目进度要求"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">详细地址</label>
            <div class="input-group">
              <el-input v-model="searchParam.adress" placeholder="请输入详细地址"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">经度</label>
            <div class="input-group">
              <el-input v-model="searchParam.longitude" placeholder="请输入经度"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">纬度</label>
            <div class="input-group">
              <el-input v-model="searchParam.latitude" placeholder="请输入纬度"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">备注</label>
            <div class="input-group">
              <el-input v-model="searchParam.remark" placeholder="请输入备注"></el-input>
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
        <el-table-column prop="companyId" sortable show-overflow-tooltip min-width="100" label="所属管理公司(组织表管理公司id)"></el-table-column>
        <el-table-column prop="code" sortable show-overflow-tooltip min-width="100" label="编号"></el-table-column>
        <el-table-column prop="name" sortable show-overflow-tooltip min-width="100" label="名称"></el-table-column>
        <el-table-column prop="type" sortable show-overflow-tooltip min-width="100" label="项目类型（关联字典表，取value值）"></el-table-column>
        <el-table-column prop="proprietorId" sortable show-overflow-tooltip min-width="100" label="建设单位(关联业主表)"></el-table-column>
        <el-table-column prop="proprietorContactId" sortable show-overflow-tooltip min-width="100" label="联系人(关联业主联系人表)"></el-table-column>
        <el-table-column prop="source" sortable show-overflow-tooltip min-width="100" label="任务依据（1-委托书  2-招投标  3-电话委托  4-其他）"></el-table-column>
        <el-table-column prop="relatedDesign" sortable show-overflow-tooltip min-width="100" label="相关设（关联字典表，取value值,多个逗号隔开）"></el-table-column>
        <el-table-column prop="coDepartment" sortable show-overflow-tooltip min-width="100" label="协办部门(关联字典表，取value值,多个逗号隔开)"></el-table-column>
        <el-table-column prop="manager" sortable show-overflow-tooltip min-width="100" label="项目经理(关联用户表)"></el-table-column>
        <el-table-column prop="signStatus" sortable show-overflow-tooltip min-width="100" label="签收状态(1-未签收  2-已签收)"></el-table-column>
        <el-table-column prop="signer" sortable show-overflow-tooltip min-width="100" label="签收人(关联用户表)"></el-table-column>
        <el-table-column prop="signTime" sortable show-overflow-tooltip min-width="100" label="签收时间"></el-table-column>
        <el-table-column prop="designScale" sortable show-overflow-tooltip min-width="100" label="设计规模"></el-table-column>
        <el-table-column prop="designRange" sortable show-overflow-tooltip min-width="100" label="设计范围"></el-table-column>
        <el-table-column prop="progress" sortable show-overflow-tooltip min-width="100" label="项目进度要求"></el-table-column>
        <el-table-column prop="adress" sortable show-overflow-tooltip min-width="100" label="详细地址"></el-table-column>
        <el-table-column prop="longitude" sortable show-overflow-tooltip min-width="100" label="经度"></el-table-column>
        <el-table-column prop="latitude" sortable show-overflow-tooltip min-width="100" label="纬度"></el-table-column>
        <el-table-column prop="remark" sortable show-overflow-tooltip min-width="100" label="备注"></el-table-column>
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
  name: 'PowerProjectTask',
  mixins: [tool],
  data() {
    return {
      isShowMore: false,
      listUrl: "project/powerprojecttask",
      showSearch: false,
      showAddBtn: this.getCurrentUserAuthority("/powerprojecttask/save"),
      showEditBtn: this.getCurrentUserAuthority("/powerprojecttask/edit")
    }
  },
  mounted() {
    this.getList();
  },
  methods: {

  }
}
</script>
