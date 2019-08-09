<template>
  <div class="detail-panel">
    <el-collapse v-model="openCollapse">
      <el-collapse-item title="项目延期" name="1">
        <div class="flex-panel detail-box">
          <div class="detail-item">
            <label class="control-label">主键id</label>
            <div class="input-group">
              <span>{{id}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">项目id</label>
            <div class="input-group">
              <span>{{projectId}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">延期日期</label>
            <div class="input-group">
              <span>{{extDate}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">延期原因</label>
            <div class="input-group">
              <span>{{reason}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">审批人</label>
            <div class="input-group">
              <span>{{approver}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">审批时间</label>
            <div class="input-group">
              <span>{{approvalTime}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">审批状态(1-待审批 2-审批通过 3-审批不通过)</label>
            <div class="input-group">
              <span>{{approvalStatus}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">审批原因</label>
            <div class="input-group">
              <span>{{approvalReason}}</span>
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
  name: "PowerProjectExtensionDetail",
  mixins: [tool],
  data() {
    return {
      newCarForm: {},
      openCollapse: ["1"],//默认打开的面板
    }
  },
  mounted() {
    ajax.get('project/powerprojectextension/' + this.$route.params.id).then(rs => {
      this.powerprojectextensionForm = rs.data;

    });
  },
  methods: {},

}
</script>
