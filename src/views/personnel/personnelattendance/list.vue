<template>
  <div class="app-container white-bg list-panel" v-cloak>
    <div class="opertion-box">
<!--      <el-button type="primary" icon="el-icon-plus" size="small" @click="add()" style="margin-right:10px">创建</el-button>-->
<!--      <el-input v-model="searchParam.zy_input" placeholder="请输入" clearable class="zy_input" style="width:190px"></el-input>-->
<!--      <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>-->
<!--      <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon&#45;&#45;right'] "></i></el-button>-->
<!--      <el-button type="primary" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">重置</el-button>-->
      <el-button type="primary" icon="el-icon-upload" size="small" @click="exportExcel()">导出</el-button>
    </div>
    <div class="division-line"></div>
    <div class="table-box">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="attendanceDate" sortable show-overflow-tooltip min-width="100" label="考勤日期"></el-table-column>
        <el-table-column prop="onduty" sortable show-overflow-tooltip min-width="100" label="上班时间"></el-table-column>
        <el-table-column prop="offduty" sortable show-overflow-tooltip min-width="100" label="下班时间"></el-table-column>
        <el-table-column prop="lateText" sortable show-overflow-tooltip min-width="100" label="迟到"></el-table-column>
        <el-table-column prop="earlyText" sortable show-overflow-tooltip min-width="100" label="早退"></el-table-column>
        <el-table-column prop="ondutyText" sortable show-overflow-tooltip min-width="100" label="上班缺卡"></el-table-column>
        <el-table-column prop="offdutyText" sortable show-overflow-tooltip min-width="100" label="下班缺卡"></el-table-column>
        <el-table-column prop="overtime" sortable show-overflow-tooltip min-width="100" label="加班时长"></el-table-column>
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
      getListBefore(params){
          params.employeeId =  this.$route.query.employeeId;
          params.attendanceDate =  this.$route.query.month;
          params.companyId =  this.$route.query.companyId;
          console.log(params);
      },
  }
}
</script>
