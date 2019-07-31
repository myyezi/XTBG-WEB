<template>
  <div class="detail-panel">
    <el-collapse v-model="openCollapse">
      <el-collapse-item title="考勤统计" name="1">
        <div class="flex-panel detail-box">
          <div class="detail-item">
            <label class="control-label">主键</label>
            <div class="input-group">
              <span>{{id}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">员工id</label>
            <div class="input-group">
              <span>{{employeeId}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">月份</label>
            <div class="input-group">
              <span>{{month}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">应出勤天数</label>
            <div class="input-group">
              <span>{{days}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">实际出勤天数</label>
            <div class="input-group">
              <span>{{actualDays}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">迟到次数</label>
            <div class="input-group">
              <span>{{late}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">早退次数</label>
            <div class="input-group">
              <span>{{early}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">未打卡次数</label>
            <div class="input-group">
              <span>{{nopunches}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">旷工次数</label>
            <div class="input-group">
              <span>{{completion}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">加班时长</label>
            <div class="input-group">
              <span>{{overtime}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">数据状态(0-删除，1-正常)</label>
            <div class="input-group">
              <span>{{status}}</span>
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
  name: "PersonnelAttendanceReportDetail",
  mixins: [tool],
  data() {
    return {
      newCarForm: {},
      openCollapse: ["1"],//默认打开的面板
    }
  },
  mounted() {
    ajax.get('personnel/personnelattendancereport/' + this.$route.params.id).then(rs => {
      this.personnelattendancereportForm = rs.data;

    });
  },
  methods: {},

}
</script>
