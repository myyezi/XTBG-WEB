<template>
  <div class="detail-panel">
    <el-collapse v-model="openCollapse">
      <el-collapse-item title="考勤组" name="1">
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
            <label class="control-label">规则名称</label>
            <div class="input-group">
              <span>{{name}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">工作日(1-常规工作日 2-含周六 3-含周日 4-含节假日) 多选逗号分隔</label>
            <div class="input-group">
              <span>{{workingDay}}</span>
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
            <label class="control-label">详细地址</label>
            <div class="input-group">
              <span>{{adress}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">经度</label>
            <div class="input-group">
              <span>{{longitude}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">纬度</label>
            <div class="input-group">
              <span>{{latitude}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">打卡范围</label>
            <div class="input-group">
              <span>{{attendanceRange}}</span>
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
  name: "PersonnelAttendanceGroupDetail",
  mixins: [tool],
  data() {
    return {
      newCarForm: {},
      openCollapse: ["1"],//默认打开的面板
    }
  },
  mounted() {
    ajax.get('personnel/personnelattendancegroup/' + this.$route.params.id).then(rs => {
      this.personnelattendancegroupForm = rs.data;

    });
  },
  methods: {},

}
</script>
