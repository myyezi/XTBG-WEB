<template>
  <div class="app-container white-bg list-panel" v-cloak>
    <div class="opertion-box">
      <el-button v-show="showAddBtn" type="primary" icon="el-icon-plus" size="small" @click="add()" style="margin-right:10px">创建</el-button>
      <el-input v-model="searchParam.keyWords" placeholder="请输入项目名称或者编号" clearable class="zy_input" style="width:190px"></el-input>
      <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
      <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
      <el-button type="primary" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">重置</el-button>
    </div>
    <!-- 展开更多查询开始 -->
    <el-collapse-transition>
      <div class="search-box" v-show="isShowMore">
          <div class="form-box">
              <div class="form-group">
                  <label class="control-label">项目类型</label>
                  <div class="input-group">
                      <el-select v-model="searchParam.projectType" placeholder="请选择项目类型" clearable>
                          <el-option v-for="e in projectTypeList"  :key="e.value" :label="e.text" :value="e.value" ></el-option >
                      </el-select>
                  </div>
              </div>
              <div class="form-group">
                  <label class="control-label">任务依据</label>
                  <div class="input-group">
                      <el-select v-model="searchParam.source" placeholder="请选择任务依据" clearable>
                          <el-option  label="委托书" :value="1"></el-option>
                          <el-option  label="招投标" :value="2"></el-option>
                          <el-option  label="电话委托" :value="3"></el-option>
                          <el-option  label="其他" :value="4"></el-option>
                      </el-select>
                  </div>
              </div>
              <div class="form-group">
                  <label class="control-label">协办部门</label>
                  <div class="input-group">
                      <el-select v-model="searchParam.coDepartment" placeholder="请选择协办部门" clearable>
                          <el-option v-for="e in coDepartmentList" :key="e.value" :label="e.text" :value="e.value">
                          </el-option>
                      </el-select>
                  </div>
              </div>
              <div class="form-group">
                  <label class="control-label">项目经理</label>
                  <div class="input-group">
                      <el-input v-model="searchParam.manager" placeholder="请输入项目经理" clearable></el-input>
                  </div>
              </div>
              <div class="form-group">
                  <label class="control-label">项目状态</label>
                  <div class="input-group">
                      <el-select v-model="searchParam.projectStatus" placeholder="请选择项目状态" clearable>
                          <el-option  label="暂存" :value="1"></el-option>
                          <el-option  label="进行中" :value="2"></el-option>
                          <el-option  label="已暂停" :value="3"></el-option>
                          <el-option  label="已完成" :value="4"></el-option>
                      </el-select>
                  </div>
              </div>
              <div class="form-group">
                  <label class="control-label">开始时间</label>
                  <div class="input-group">
                          <el-date-picker
                              v-model="searchParam.startTime"
                              clearable
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="请选择开始时间">
                          </el-date-picker>
                  </div>
              </div>
              <div class="form-group">
                  <label class="control-label">结束时间</label>
                  <div class="input-group">
                      <el-date-picker
                          v-model="searchParam.endTime"
                          clearable
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择结束时间">
                      </el-date-picker>
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
              <el-button v-if="row.projectStatus == 1 || row.projectStatus == 2" v-show="showEditBtn" @click="edit(row.taskId)" type="text" size="small">编辑</el-button>
              <el-button v-if="row.projectStatus == 2" v-show="showFinishBtn" @click="finish(row.id)" type="text" size="small">完成</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="code" sortable show-overflow-tooltip min-width="100" label="项目编号"></el-table-column>
        <el-table-column prop="name" sortable show-overflow-tooltip min-width="100" label="项目名称"></el-table-column>
        <el-table-column prop="typeText" sortable show-overflow-tooltip min-width="100" label="项目类型"></el-table-column>
        <el-table-column prop="sourceText" sortable show-overflow-tooltip min-width="100" label="任务依据"></el-table-column>
        <el-table-column prop="coDepartmentText" sortable show-overflow-tooltip min-width="100" label="协办部门"></el-table-column>
        <el-table-column prop="managerName" sortable show-overflow-tooltip min-width="100" label="项目经理"></el-table-column>
        <el-table-column prop="projectStatusText" sortable show-overflow-tooltip min-width="100" label="项目状态"></el-table-column>
        <el-table-column prop="startTime" sortable show-overflow-tooltip min-width="100" label="开始时间"></el-table-column>
        <el-table-column prop="endTime" sortable show-overflow-tooltip min-width="100" label="结束时间"></el-table-column>
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
  name: 'PowerProjectPlan',
  mixins: [tool],
  data() {
    return {
        isShowMore: false,
        listUrl: "power/powerproject",
        showSearch: false,
        showAddBtn: this.getCurrentUserAuthority("/power/powerprojectplan/add"),
        showEditBtn: this.getCurrentUserAuthority("/power/powerprojectplan/edit"),
        showFinishBtn: this.getCurrentUserAuthority("/power/powerprojectplan/finish"),
        projectTypeList : [],
        coDepartmentList : [],
    }
  },
  mounted() {
      this.getList();
      this.getDict();
  },
  methods: {
      // 获取字典
      getDict() {
          let types = 'XMLX,XBBM';
          ajax.get("upms/dict/allType/"+types).then(rs => {
              this.projectTypeList = rs.XMLX;
              this.coDepartmentList = rs.XBBM;
          });
      },
      finish(projectId){
          let that = this;
          this.$confirm("确定完成该项目?" ,'提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
          }).then(function() {
              ajax.post('power/powerproject/operate',{projectId : projectId, projectStatus : 4}).then(rs => {
                  if (rs.status == 0) {
                      that.getList();
                      that.$message.success(rs.msg);
                  } else {
                      that.$message.error(rs.msg);
                  }
              });
          }).catch(function() {
          });
      }
  }
}
</script>
