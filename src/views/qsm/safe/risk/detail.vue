<template>
  <div class="detail-panel">
    <el-collapse v-model="openCollapse">
      <el-collapse-item title="安全风险库" name="1">
        <div class="flex-panel detail-box">
          <div class="detail-item">
            <label class="control-label">主键id</label>
            <div class="input-group">
              <span>{{id}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">父节点id</label>
            <div class="input-group">
              <span>{{parentId}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">风险编号</label>
            <div class="input-group">
              <span>{{code}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">工序</label>
            <div class="input-group">
              <span>{{process}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">风险可能导致后果</label>
            <div class="input-group">
              <span>{{result}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">固定风险级别（1- 一级，2-二级，3-三级，4-四级）</label>
            <div class="input-group">
              <span>{{fixedLevel}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">系统风险级别（1- 一级，2-二级，3-三级，4-四级）</label>
            <div class="input-group">
              <span>{{riskLevel}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">预控措施</label>
            <div class="input-group">
              <span>{{measure}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">数据状态(0-删除，1-正常)</label>
            <div class="input-group">
              <span>{{status}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">创建人</label>
            <div class="input-group">
              <span>{{creater}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">修改人</label>
            <div class="input-group">
              <span>{{updater}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">创建时间</label>
            <div class="input-group">
              <span>{{createTime}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">修改时间</label>
            <div class="input-group">
              <span>{{updateTime}}</span>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>

</template>

<script>
import ajax from '@/utils/request'
import { tool } from '@/utils/common'

export default {
  name: "SafeRiskDetail",
  mixins: [tool],
  data() {
    return {
      newCarForm: {},
      openCollapse: ["1"],//默认打开的面板
    }
  },
  mounted() {
    ajax.get('qsm/safe/risk/' + this.$route.params.id).then(rs => {
      this.riskForm = rs.data;

    });
  },
  methods: {},

}
</script>
