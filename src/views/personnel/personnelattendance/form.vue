<template>
  <div class="form-panel">
    <el-form :model="personnelattendanceForm" :rules="rules" ref="personnelattendanceForm" label-position="top" label-width="100px" :class="{'register-form': true}">
      <el-collapse v-model="openCollapse">
        <el-collapse-item title="考勤" name="1">
          <div class="flex-panel">
            <el-form-item label="主键" prop="id">
              <el-input v-model="personnelattendanceForm.id" placeholder="请输入主键" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="所属管理公司(组织表管理公司id)" prop="companyId">
              <el-input v-model="personnelattendanceForm.companyId" placeholder="请输入所属管理公司(组织表管理公司id)" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="员工id" prop="employeeId">
              <el-input v-model="personnelattendanceForm.employeeId" placeholder="请输入员工id" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="考勤日期" prop="attendanceDate">
              <el-input v-model="personnelattendanceForm.attendanceDate" placeholder="请输入考勤日期" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="考勤时间" prop="attendanceTime">
              <el-input v-model="personnelattendanceForm.attendanceTime" placeholder="请输入考勤时间" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="上班打卡时间" prop="onduty">
              <el-input v-model="personnelattendanceForm.onduty" placeholder="请输入上班打卡时间" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="下班打开时间" prop="offduty">
              <el-input v-model="personnelattendanceForm.offduty" placeholder="请输入下班打开时间" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="是否迟到(0-否，1-是)" prop="isLate">
              <el-input v-model="personnelattendanceForm.isLate" placeholder="请输入是否迟到(0-否，1-是)" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="是否早退(0-否，1-是)" prop="isEarly">
              <el-input v-model="personnelattendanceForm.isEarly" placeholder="请输入是否早退(0-否，1-是)" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="缺上班卡(0-否，1-是)" prop="isOnduty">
              <el-input v-model="personnelattendanceForm.isOnduty" placeholder="请输入缺上班卡(0-否，1-是)" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="缺下班卡(0-否，1-是)" prop="isOffduty">
              <el-input v-model="personnelattendanceForm.isOffduty" placeholder="请输入缺下班卡(0-否，1-是)" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="是否旷工(0-否，1-是)" prop="isCompletion">
              <el-input v-model="personnelattendanceForm.isCompletion" placeholder="请输入是否旷工(0-否，1-是)" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="加班时长" prop="overtime">
              <el-input v-model="personnelattendanceForm.overtime" placeholder="请输入加班时长" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
              <el-input v-model="personnelattendanceForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="left-row">
        <el-button type="primary" @click="submitForm('personnelattendanceForm')">保存</el-button>
        <el-button @click="close">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import ajax from '@/utils/request'
import { tool, ruleTool } from '@/utils/common'

export default {
  mixins: [tool, ruleTool],
  components: {},
  data() {
    return {
      personnelattendanceForm: {},
      openCollapse: ["1"],//默认打开的面板
      rules: {
        id: [
          { required: true, message: '请输入主键', trigger: ['blur'] }
        ],
        companyId: [
          { required: true, message: '请输入所属管理公司(组织表管理公司id)', trigger: ['blur'] }
        ],
        employeeId: [
          { required: true, message: '请输入员工id', trigger: ['blur'] }
        ],
        attendanceDate: [
          { required: true, message: '请输入考勤日期', trigger: ['blur'] }
        ],
        attendanceTime: [
          { required: true, message: '请输入考勤时间', trigger: ['blur'] }
        ],
        onduty: [
          { required: true, message: '请输入上班打卡时间', trigger: ['blur'] }
        ],
        offduty: [
          { required: true, message: '请输入下班打开时间', trigger: ['blur'] }
        ],
        isLate: [
          { required: true, message: '请输入是否迟到(0-否，1-是)', trigger: ['blur'] }
        ],
        isEarly: [
          { required: true, message: '请输入是否早退(0-否，1-是)', trigger: ['blur'] }
        ],
        isOnduty: [
          { required: true, message: '请输入缺上班卡(0-否，1-是)', trigger: ['blur'] }
        ],
        isOffduty: [
          { required: true, message: '请输入缺下班卡(0-否，1-是)', trigger: ['blur'] }
        ],
        isCompletion: [
          { required: true, message: '请输入是否旷工(0-否，1-是)', trigger: ['blur'] }
        ],
        overtime: [
          { required: true, message: '请输入加班时长', trigger: ['blur'] }
        ],
        status: [
          { required: true, message: '请输入数据状态(0-删除，1-正常)', trigger: ['blur'] }
        ],
      }
    }
  },
  mounted() {
    this.open();
  },
  methods: {

    //进入编辑页调用 bean为列表页传入数据
    open() {
      if (this.$route.query.id) {
        ajax.get('personnel/personnelattendance/' + this.$route.query.id).then(rs => {
          this.personnelattendanceForm = rs.data;
          if (null != rs.data.img && rs.data.img.length > 0) {
            this.img = JSON.parse(rs.data.img);
          }
        });
      }
    },

    //保存
    submitForm(form) {
      var data = this.personnelattendanceForm;
      this.$refs[form]
        .validate((valid) => {
          if (!valid) {
            this.$message
              .error('校验不通过，请检查输入项');
            return;
          }
          ajax.post('personnel/personnelattendance', data).then(rs => {
            if (rs.status == 0) {
              this.$message
                .success(rs.msg);
              this.close();
            } else {
              this.$message
                .error(rs.msg);
            }
          });
        });
    },

  },
}
</script>
