<template>
  <div class="detail-panel">
    <el-collapse v-model="openCollapse">
      <el-collapse-item title="考勤" name="1">
        <div class="flex-panel detail-box">
          <div class="detail-item">
            <label class="control-label">主键</label>
            <div class="input-group">
              <span>{{id}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">所属管理公司(组织表管理公司id)</label>
            <div class="input-group">
              <span>{{companyId}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">员工id</label>
            <div class="input-group">
              <span>{{employeeId}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">考勤日期</label>
            <div class="input-group">
              <span>{{attendanceDate}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">考勤时间</label>
            <div class="input-group">
              <span>{{attendanceTime}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">上班打卡时间</label>
            <div class="input-group">
              <span>{{onduty}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">下班打开时间</label>
            <div class="input-group">
              <span>{{offduty}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">是否迟到(0-否，1-是)</label>
            <div class="input-group">
              <span>{{isLate}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">是否早退(0-否，1-是)</label>
            <div class="input-group">
              <span>{{isEarly}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">缺上班卡(0-否，1-是)</label>
            <div class="input-group">
              <span>{{isOnduty}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">缺下班卡(0-否，1-是)</label>
            <div class="input-group">
              <span>{{isOffduty}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">是否旷工(0-否，1-是)</label>
            <div class="input-group">
              <span>{{isCompletion}}</span>
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
  name: "PersonnelAttendanceDetail",
  mixins: [tool],
  data() {
    return {
      newCarForm: {},
      openCollapse: ["1"],//默认打开的面板
    }
  },
  mounted() {
    ajax.get('personnel/personnelattendance/' + this.$route.params.id).then(rs => {
      this.personnelattendanceForm = rs.data;

    });
  },
  methods: {},

}
</script>
