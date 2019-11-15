<template>
  <el-dialog title="选择项目风险清册" :visible.sync="dialogVisible" width="60%" :before-close="handleClose" v-cloak>
    <div class="app-container white-bg list-panel">
      <div class="opertion-box">
        <el-input v-model="searchParam.measure" placeholder="请输入预控措施" clearable class="zy_input" style="width:190px"></el-input>
        <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
        <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
        <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">重置</el-button>
      </div>
      <!-- 展开更多查询开始 -->
      <el-collapse-transition>
        <div class="search-box" v-show="isShowMore">
          <div class="form-box">
            <div class="form-group">
              <label class="control-label">风险编号</label>
              <div class="input-group">
                <el-input v-model="searchParam.code" placeholder="请输入风险编号"></el-input>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label">工序</label>
              <div class="input-group">
                <el-input v-model="searchParam.process" placeholder="请输入工序"></el-input>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label">风险可能导致后果</label>
              <div class="input-group">
                <el-input v-model="searchParam.result" placeholder="请输入风险可能导致后果"></el-input>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-transition>
      <div class="division-line"></div>
      <div class="table-box">
        <el-table :data="list" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="code" sortable show-overflow-tooltip min-width="100" label="风险编号"></el-table-column>
          <el-table-column prop="process" sortable show-overflow-tooltip min-width="100" label="工序"></el-table-column>
          <el-table-column prop="result" sortable show-overflow-tooltip min-width="100" label="风险可能导致后果"></el-table-column>
          <el-table-column prop="riskLevel" sortable show-overflow-tooltip min-width="100" label="系统风险级别"></el-table-column>
          <el-table-column prop="measure" sortable show-overflow-tooltip min-width="100" label="预控措施"></el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="pageSizeSetting" :page-size="pageSize" :layout="pageLayout" :total="listCount">
        </el-pagination>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" @click="sure">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import ajax from '@/utils/request'
import { tool } from '@/utils/common'

export default {
  name: 'RiskSelect',
  mixins: [tool],
  props: {
    isShow: Boolean,
  },
  data() {
    return {
      isShowMore: false,
      listUrl: "core/projectplanrisk",
      showSearch: false,
      dialogVisible: false,
      selectedData: []
    }
  },
  watch: {
    isShow(val) {
      this.dialogVisible = val;
      if (val === true) {
        this.getList();
      }
    }
  },
  mounted() {

  },
  methods: {
    getListBefore(param) {
      param = this.params;
    },
    cancel() {
      this.selectedData = [];
      this.emit();
    },
    sure() {
      this.emit();
    },
    handleClose() {
      this.selectedData = [];
      this.emit();
    },
    handleSelectionChange(val) {
      this.selectedData = val;
    },
    emit() {
      this.$emit("selectedOnchange", this.selectedData);
      this.dialogVisible = false;
    }
  }
}
</script>
