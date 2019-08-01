<template>
  <div class="app-container white-bg list-panel" v-cloak>
    <div class="opertion-box">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="add()" style="margin-right:10px">创建</el-button>
      <el-input v-model="searchParam.zy_input" placeholder="请输入员工姓名或手机号" clearable class="zy_input" style="width:190px"></el-input>
      <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
      <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
      <el-button type="primary" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">重置</el-button>
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
            <label class="control-label">规则名称</label>
            <div class="input-group">
              <el-input v-model="searchParam.name" placeholder="请输入规则名称"></el-input>
            </div>
          </div>
        </div>
      </div>
    </el-collapse-transition>
    <div class="division-line"></div>
    <div class="table-box">
      <el-table :data="list" style="width: 100%">
        <el-table-column fixed label="操作" width="260">
          <template fixed slot-scope="{ row, column, $index }">
            <el-button v-show="showEditBtn" @click="edit(row.id)" type="text" size="small">编辑</el-button>
            <el-button v-show="showDelBtn" @click="delGroup(row)" type="text" size="small">删除</el-button>
            <el-button v-show="showAddBtn" @click="delGroup(row)" type="text" size="small">考勤对象设置</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" sortable show-overflow-tooltip min-width="100" label="规则名称"></el-table-column>
        <el-table-column  prop="member" sortable show-overflow-tooltip min-width="100" label="组成员"></el-table-column>
        <el-table-column prop="companyName" sortable show-overflow-tooltip min-width="100" label="所属管理公司"></el-table-column>
        <el-table-column prop="creater" sortable show-overflow-tooltip min-width="100" label="创建人"></el-table-column>
          <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="100" label="创建时间"></el-table-column>
        <el-table-column prop="updater" sortable show-overflow-tooltip min-width="100" label="更新人"></el-table-column>
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
  name: 'PersonnelAttendanceGroup',
  mixins: [tool],
  data() {
    return {
      companyList:[],
      isShowMore: false,
      listUrl: "personnel/personnelattendancegroup",
      showSearch: false,
      showAddBtn: this.getCurrentUserAuthority("/personnel/personnelattendancegroup/save"),
      showEditBtn: this.getCurrentUserAuthority("/personnel/personnelattendancegroup/edit"),
      showDelBtn: this.getCurrentUserAuthority("/personnel/personnelattendancegroup/del"),
      member:'查看'
    }
  },
  mounted() {
    this.getList();
    this.getCompanyList();
  },
  methods: {
      //获取公司
      getCompanyList() {
          ajax.get('personnel/personnelattendancegroup/getCompanyList').then(rs => {
              this.companyList = rs.data;
          });
      },

      //删除
      delGroup(row) {
          this.$confirm('是否确认删除 ?').then(_ => {
              ajax.delete("personnel/personnelattendancegroup/" + row.id).then((result) => {
                  if (this.checkResponse(result)) {
                      this.showMessage('删除成功', 'success');
                      this.getList();
                  }
              })
          }).catch(_ => {
              console.info("关闭");
          });
      },
  }
}
</script>
