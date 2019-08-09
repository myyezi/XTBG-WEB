<template>
  <div class="detail-panel">
    <el-collapse v-model="openCollapse">
      <el-collapse-item title="项目" name="1">
        <div class="flex-panel detail-box">
          <div class="detail-item">
            <label class="control-label">主键id</label>
            <div class="input-group">
              <span>{{id}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">项目任务书id</label>
            <div class="input-group">
              <span>{{projectTaskId}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">项目状态（1-暂存 2-进行中 3-已暂停 4-已完成）</label>
            <div class="input-group">
              <span>{{projectStatus}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">开始时间</label>
            <div class="input-group">
              <span>{{startTime}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">结束时间</label>
            <div class="input-group">
              <span>{{endTime}}</span>
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
  name: "PowerProjectDetail",
  mixins: [tool],
  data() {
    return {
      newCarForm: {},
      openCollapse: ["1"],//默认打开的面板
    }
  },
  mounted() {
    ajax.get('project/powerproject/' + this.$route.params.id).then(rs => {
      this.powerprojectForm = rs.data;

    });
  },
  methods: {},

}
</script>
