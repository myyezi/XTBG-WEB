<template>
  <div class="app-container white-bg list-panel" v-cloak>
    <div class="opertion-box">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="add()" style="margin-right:10px">创建</el-button>
      <el-input v-model="searchParam.projectName" placeholder="请输入项目名称" clearable class="zy_input" style="width:190px"></el-input>
      <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
      <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
      <el-button type="primary" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">重置</el-button>
    </div>
    <!-- 展开更多查询开始 -->
    <el-collapse-transition>
      <div class="search-box" v-show="isShowMore">
        <div class="form-box">
          <div class="form-group">
            <label class="control-label">接收单位</label>
            <div class="input-group">
              <el-input v-model="searchParam.receiveCompany" placeholder="请输入接收单位"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">发布日期</label>
            <div class="input-group">
              <el-input v-model="searchParam.publishDate" placeholder="请输入发布日期"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">作业内容</label>
            <div class="input-group">
              <el-input v-model="searchParam.planRiskId" placeholder="请输入作业内容"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">风险分析</label>
            <div class="input-group">
              <el-input v-model="searchParam.planRiskResult" placeholder="请输入检查范围和简要内容（预警措施）"></el-input>
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
            <el-button type="text" size="small" @click="exportWord(row.id)">导出</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="code" sortable show-overflow-tooltip min-width="100" label="通知单编号"></el-table-column>
        <el-table-column prop="publishCompany" sortable show-overflow-tooltip min-width="100" label="发布单位"></el-table-column>
        <el-table-column prop="publishDate" sortable show-overflow-tooltip min-width="100" label="发布日期"></el-table-column>
        <el-table-column prop="projectName" sortable show-overflow-tooltip min-width="100" label="项目名称"></el-table-column>
        <el-table-column prop="receiveCompany" sortable show-overflow-tooltip min-width="100" label="接收单位"></el-table-column>
        <el-table-column prop="riskProcess" sortable show-overflow-tooltip min-width="100" label="作业内容"></el-table-column>
        <el-table-column prop="riskResult" sortable show-overflow-tooltip min-width="100" label="风险分析"></el-table-column>
        <el-table-column prop="planTime" sortable show-overflow-tooltip min-width="100" label="预警计划时间"></el-table-column>
        <el-table-column prop="relieveTime" sortable show-overflow-tooltip min-width="100" label="预警解除时间"></el-table-column>
        <el-table-column prop="creater" sortable show-overflow-tooltip min-width="100" label="创建人"></el-table-column>
        <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="100" label="创建时间"></el-table-column>
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
  name: 'SafeWarn',
  mixins: [tool],
  data() {
    return {
      isShowMore: false,
      listUrl: "qsm/safe/warn",
      showSearch: false,
      showAddBtn: this.getCurrentUserAuthority("/safe/warn/save"),
      showEditBtn: this.getCurrentUserAuthority("/safe/warn/edit")
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    exportWord(id) {
      window.location = this.exportUrl("qsm/safe/warn/export/" + id);
    }
  }
}
</script>
