<template>
  <div class="app-container white-bg list-panel" v-cloak>
    <div class="opertion-box">
      <el-input v-model="searchParam.keyWord" placeholder="请输入员工姓名或手机号" clearable class="zy_input" style="width:190px"></el-input>
      <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
      <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
      <el-button type="primary" icon="el-icon-refresh" size="small" @click="month=[];resetList()">重置</el-button>
      <el-button type="primary" icon="el-icon-upload" size="small" @click="exportExcel()">导出</el-button>

    </div>
    <!-- 展开更多查询开始 -->
    <el-collapse-transition>
      <div class="search-box" v-show="isShowMore">
        <div class="form-box">
          <div class="form-group">
            <label class="control-label">管理公司</label>
            <div class="input-group">
                    <el-select v-model="searchParam.companyId" filterable clearable placeholder="请选择管理公司">
                        <el-option
                            v-for="item in companyList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">组织</label>
            <div class="input-group">
              <el-input v-model="searchParam.days" placeholder="请选择组织"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">月份</label>
            <div class="input-group">
                <el-date-picker
                    v-model="month"
                    type="monthrange"
                    range-separator="至"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份"  value-format="yyyy-MM" >
                </el-date-picker>
            </div>
          </div>

        </div>
      </div>
    </el-collapse-transition>
    <div class="division-line"></div>
    <div class="table-box">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="employeeName" sortable show-overflow-tooltip min-width="100" label="员工姓名"></el-table-column>
          <el-table-column prop="month" sortable show-overflow-tooltip min-width="100" label="月份">
              <template slot-scope="scope">
                  <el-button type="text" size="small" @click="edits(scope.row)">
                      {{scope.row.month}}
                  </el-button>
              </template>
          </el-table-column>
        <el-table-column prop="days" sortable show-overflow-tooltip min-width="100" label="应出勤天数"></el-table-column>
        <el-table-column prop="actualDays" sortable show-overflow-tooltip min-width="100" label="实际出勤天数"></el-table-column>
        <el-table-column prop="late" sortable show-overflow-tooltip min-width="100" label="迟到次数"></el-table-column>
        <el-table-column prop="early" sortable show-overflow-tooltip min-width="100" label="早退次数"></el-table-column>
        <el-table-column prop="nopunches" sortable show-overflow-tooltip min-width="100" label="未打卡次数"></el-table-column>
        <el-table-column prop="completion" sortable show-overflow-tooltip min-width="100" label="旷工次数"></el-table-column>
        <el-table-column prop="overtime" sortable show-overflow-tooltip min-width="100" label="加班时长"></el-table-column>
        <el-table-column prop="organizationName" sortable show-overflow-tooltip min-width="100" label="组织"></el-table-column>
          <el-table-column prop="companyName" sortable show-overflow-tooltip min-width="150" label="所属管理公司"></el-table-column>
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
  name: 'PersonnelAttendanceReport',
  mixins: [tool],
  data() {
    return {
      isShowMore: false,
      listUrl: "personnel/personnelattendancereport",
      showSearch: false,
      showAddBtn: this.getCurrentUserAuthority("/personnelattendancereport/save"),
      showEditBtn: this.getCurrentUserAuthority("/personnelattendancereport/edit"),
      showTemplateConfigBtn : this.getCurrentUserAuthority("/personnel/personnelattendance"),
      month:[],
      companyList:[]

    }
  },
  mounted() {
    this.getList();
    this.getCompanyList();
  },
  methods: {

      //处理条件查询的时间问题
      getListBefore(params) {
          if (this.month) {
              params.monthStart = this.month[0];
              params.monthEnd = this.month[1];
          } else {
              params.monthStart = '';
              params.monthEnd = '';
          }
      },

      edits(row){
          if(~this.$route.fullPath.indexOf("/detail?")){
              return;
          }
          let url = this.$route.fullPath + '/detail?employeeId='+row.employeeId+'&month='+row.month+'&companyId=30';
          console.log(row)
          this.$router.push({path:url});
      },
      //获取公司
      getCompanyList() {
          ajax.get('personnel/personnelattendancegroup/getCompanyList').then(rs => {
              this.companyList = rs.data;
          });
      },
  }
}
</script>
