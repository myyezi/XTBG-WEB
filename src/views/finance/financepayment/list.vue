<template>
  <div class="app-container white-bg list-panel" v-cloak>
    <div class="opertion-box">
      <el-input v-model="searchParam.zy_input" placeholder="请输入" clearable class="zy_input" style="width:190px"></el-input>
      <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
      <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
    </div>
    <!-- 展开更多查询开始 -->
    <el-collapse-transition>
      <div class="search-box" v-show="isShowMore">
        <div class="form-box">
          <div class="form-group">
            <label class="control-label">组织</label>
            <div class="input-group">
              <el-input v-model="searchParam.companyId" placeholder="选择组织"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">项目信息</label>
            <div class="input-group">
              <el-input v-model="searchParam.projectTaskId" placeholder="请输入项目名称或编号"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">申请人</label>
            <div class="input-group">
              <el-input v-model="searchParam.creater" placeholder="请输入申请人"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">申请状态</label>
            <div class="input-group">
              <el-input v-model="searchParam.approvalStatus" placeholder="请选择申请状态"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">申请时间</label>
            <div class="input-group">
              <el-input v-model="searchParam.createTime" placeholder="请选择申请时间"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">收款单位</label>
            <div class="input-group">
              <el-input v-model="searchParam.payee" placeholder="请输入收款单位名称"></el-input>
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
        <el-table-column prop="projectTaskId" sortable show-overflow-tooltip min-width="100" label="项目名称"></el-table-column>
        <el-table-column prop="amount" sortable show-overflow-tooltip min-width="100" label="付款金额（元）"></el-table-column>
        <el-table-column prop="payee" sortable show-overflow-tooltip min-width="100" label="收款单位"></el-table-column>
        <el-table-column prop="approvalStatus" sortable show-overflow-tooltip min-width="100" label="申请状态"></el-table-column>
        <el-table-column prop="creater" sortable show-overflow-tooltip min-width="100" label="申请人"></el-table-column>
        <el-table-column prop="creater" sortable show-overflow-tooltip min-width="100" label="所属部门"></el-table-column>
        <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="100" label="申请时间"></el-table-column>
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
  name: 'FinancePayment',
  mixins: [tool],
  data() {
    return {
      isShowMore: false,
      listUrl: "finance/financepayment",
      showSearch: false,
      showAddBtn: this.getCurrentUserAuthority("/financepayment/save"),
      showEditBtn: this.getCurrentUserAuthority("/financepayment/edit")
    }
  },
  mounted() {
    this.getList();
  },
  methods: {

  }
}
</script>
