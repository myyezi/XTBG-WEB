<template>
  <div class="app-container white-bg list-panel" v-cloak>
    <div class="opertion-box">
      <el-button v-show="showAddBtn"
        type="primary"
        icon="el-icon-plus"
        size="small"
        @click="add()"
        style="margin-right:10px"
      >创建</el-button>
      <el-input
        v-model="searchParam.zy_input"
        placeholder="请输入"
        clearable
        class="zy_input"
        style="width:190px"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="small"
        @click="handleCurrentChange(1)"
      >查询</el-button>
      <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">
        更多查询
        <i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i>
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-refresh"
        size="small"
        @click="approvalTime=[];resetList()"
      >重置</el-button>
      <el-button type="primary" icon="el-icon-upload" size="small" @click="exportExcel()">导出</el-button>
    </div>
    <!-- 展开更多查询开始 -->
    <el-collapse-transition>
      <div class="search-box" v-show="isShowMore">
        <div class="form-box">
          <div class="form-group">
            <label class="control-label">发布时间</label>
            <div class="input-group">
              <el-input v-model="searchParam.publishTime" placeholder="请输入发布时间"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">阅读量</label>
            <div class="input-group">
              <el-input v-model="searchParam.readCount" placeholder="请输入阅读量"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">课程状态(1-未发布 2-已发布)</label>
            <div class="input-group">
              <el-input v-model="searchParam.courseStatus" placeholder="请输入课程状态(1-未发布 2-已发布)"></el-input>
            </div>
          </div>
        </div>
      </div>
    </el-collapse-transition>
    <div class="division-line"></div>
    <div class="table-box">
      <el-table :data="list" style="width: 100%">
        <el-table-column fixed label="操作" width="180">
          <template fixed slot-scope="{ row, column, $index }">
            <el-button v-show="showPublishBtn && row.courseStatus==1" @click="publishOrUnpublish(row.id, 2)" type="text" size="small">发布</el-button>
            <el-button v-show="showEditBtn && row.courseStatus==1" @click="edit(row.id)" type="text" size="small">编辑</el-button>
            <el-button v-show="showUnpublishBtn && row.courseStatus==2" @click="publishOrUnpublish(row.id, 1)" type="text" size="small">撤销</el-button>
            <el-button v-show="showSelectUserBtn" @click="selectUser(row.id)" type="text" size="small">分配对象</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="title" sortable show-overflow-tooltip min-width="200" label="标题"></el-table-column>
        <el-table-column
          prop="publishTime"
          sortable
          show-overflow-tooltip
          min-width="100"
          label="发布时间"
        ></el-table-column>
        <el-table-column
          prop="readCount"
          sortable
          show-overflow-tooltip
          min-width="100"
          label="阅读量"
        ></el-table-column>
        <el-table-column
          prop="courseStatus"
          sortable
          show-overflow-tooltip
          min-width="100"
          label="课程状态"
        >
          <template slot-scope="scope">
            <span> {{scope.row.courseStatus==1?'未发布':scope.row.courseStatus==2?'已发布':'/'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="creater" sortable show-overflow-tooltip min-width="100" label="创建人"></el-table-column>
        <el-table-column
          prop="createTime"
          sortable
          show-overflow-tooltip
          min-width="100"
          label="申请时间"
        ></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageSizeSetting"
        :page-size="pageSize"
        :layout="pageLayout"
        :total="listCount"
      ></el-pagination>
    </div>
    <!-- 用户选择器 -->
    <EmployeeTreeSelect :isShow="showUserSelector" :seletedKeys="userSelectorList" @beforeClose="handleClose" @selectedOnchange="selectedOnchangeHandle"></EmployeeTreeSelect>
  </div>
</template>

<script>
import ajax from "@/utils/request";
import { tool } from "@/utils/common";
import EmployeeTreeSelect from "@/components/EmployeeTreeSelect"
export default {
  name: "AdmCourse",
  mixins: [tool],
  components: { EmployeeTreeSelect },
  data() {
    return {
      isShowMore: false,
      listUrl: "adm/admcourse",
      showSearch: false,
      showAddBtn: this.getCurrentUserAuthority("/adm/admcourse/add"),
      showEditBtn: this.getCurrentUserAuthority("/adm/admcourse/edit"),
      showPublishBtn: this.getCurrentUserAuthority("/adm/admcourse/publish"),
      showUnpublishBtn: this.getCurrentUserAuthority("/adm/admcourse/unpublish"),
      showSelectUserBtn: this.getCurrentUserAuthority("/adm/admcourse/selectUser"),
      showUserSelector: false,
      userSelectorList:[],
      courseEmployeeData:{}
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    publishOrUnpublish(id, status){
        this.$confirm("确认"+(status==1?"撤销":"发布")+"课程吗？").then(_ => {
            let data = {}
            data.id = id
            data.courseStatus = status
            ajax.post('adm/admcourse/publishOrUnpublish', data).then(rs => {
                if (rs.status == 0) {
                    this.$message.success(rs.msg);
                    this.getList();
                } else {
                    this.$message.error(rs.msg);
                }
            });
        }).catch(_ => {
        });
    },
    selectUser(id){
        this.courseEmployeeData.id=id
        ajax.get('adm/admcourse/getCourseEmployeeIds/'+id).then(rs => {
            if(rs.status === 0) {
                this.userSelectorList = rs.data
                this.courseEmployeeData.employeeIds = this.userSelectorList;
                this.showUserSelector = true;
            }
        });
    },
    handleClose(val) {
      this.showUserSelector = val;
    },
    //选择负责人
    selectedOnchangeHandle(data) {
      this.showUserSelector = false;
      if (data) {
        let employeeIds = [];
        let obj = {}
        for (let v of data) {
            if(employeeIds.indexOf(v.id)==-1){
                employeeIds.push(v.id);
            } 
        }
        this.courseEmployeeData.employeeIds = employeeIds;
        ajax.post('adm/admcourse/saveEmployee', this.courseEmployeeData).then(rs => {
                if (rs.status == 0) {
                    this.$message.success(rs.msg);
                    this.getList();
                } else {
                    this.$message.error(rs.msg);
                }
            });
      }
    },
  }
};
</script>
