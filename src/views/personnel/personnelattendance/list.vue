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
            <label class="control-label">员工id</label>
            <div class="input-group">
              <el-input v-model="searchParam.employeeId" placeholder="请输入员工id"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">考勤日期</label>
            <div class="input-group">
              <el-input v-model="searchParam.attendanceDate" placeholder="请输入考勤日期"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">考勤时间</label>
            <div class="input-group">
              <el-input v-model="searchParam.attendanceTime" placeholder="请输入考勤时间"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">上班打卡时间</label>
            <div class="input-group">
              <el-input v-model="searchParam.onduty" placeholder="请输入上班打卡时间"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">下班打开时间</label>
            <div class="input-group">
              <el-input v-model="searchParam.offduty" placeholder="请输入下班打开时间"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">是否迟到(0-否，1-是)</label>
            <div class="input-group">
              <el-input v-model="searchParam.isLate" placeholder="请输入是否迟到(0-否，1-是)"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">是否早退(0-否，1-是)</label>
            <div class="input-group">
              <el-input v-model="searchParam.isEarly" placeholder="请输入是否早退(0-否，1-是)"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">缺上班卡(0-否，1-是)</label>
            <div class="input-group">
              <el-input v-model="searchParam.isOnduty" placeholder="请输入缺上班卡(0-否，1-是)"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">缺下班卡(0-否，1-是)</label>
            <div class="input-group">
              <el-input v-model="searchParam.isOffduty" placeholder="请输入缺下班卡(0-否，1-是)"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">是否旷工(0-否，1-是)</label>
            <div class="input-group">
              <el-input v-model="searchParam.isCompletion" placeholder="请输入是否旷工(0-否，1-是)"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">加班时长</label>
            <div class="input-group">
              <el-input v-model="searchParam.overtime" placeholder="请输入加班时长"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">数据状态(0-删除，1-正常)</label>
            <div class="input-group">
              <el-input v-model="searchParam.status" placeholder="请输入数据状态(0-删除，1-正常)"></el-input>
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
        <el-table-column prop="employeeId" sortable show-overflow-tooltip min-width="100" label="员工id"></el-table-column>
        <el-table-column prop="attendanceDate" sortable show-overflow-tooltip min-width="100" label="考勤日期"></el-table-column>
        <el-table-column prop="attendanceTime" sortable show-overflow-tooltip min-width="100" label="考勤时间"></el-table-column>
        <el-table-column prop="onduty" sortable show-overflow-tooltip min-width="100" label="上班打卡时间"></el-table-column>
        <el-table-column prop="offduty" sortable show-overflow-tooltip min-width="100" label="下班打开时间"></el-table-column>
        <el-table-column prop="isLate" sortable show-overflow-tooltip min-width="100" label="是否迟到(0-否，1-是)"></el-table-column>
        <el-table-column prop="isEarly" sortable show-overflow-tooltip min-width="100" label="是否早退(0-否，1-是)"></el-table-column>
        <el-table-column prop="isOnduty" sortable show-overflow-tooltip min-width="100" label="缺上班卡(0-否，1-是)"></el-table-column>
        <el-table-column prop="isOffduty" sortable show-overflow-tooltip min-width="100" label="缺下班卡(0-否，1-是)"></el-table-column>
        <el-table-column prop="isCompletion" sortable show-overflow-tooltip min-width="100" label="是否旷工(0-否，1-是)"></el-table-column>
        <el-table-column prop="overtime" sortable show-overflow-tooltip min-width="100" label="加班时长"></el-table-column>
        <el-table-column prop="status" sortable show-overflow-tooltip min-width="100" label="数据状态(0-删除，1-正常)"></el-table-column>
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
  name: 'PersonnelAttendance',
  mixins: [tool],
  data() {
    return {
      isShowMore: false,
      listUrl: "personnel/personnelattendance",
      showSearch: false,
      showAddBtn: this.getCurrentUserAuthority("/personnelattendance/save"),
      showEditBtn: this.getCurrentUserAuthority("/personnelattendance/edit")
    }
  },
  mounted() {
    this.getList();
  },
  methods: {

  }
}
</script>
