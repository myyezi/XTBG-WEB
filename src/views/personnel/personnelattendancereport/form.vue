<template>
  <div class="form-panel">
    <el-form :model="personnelattendancereportForm" :rules="rules" ref="personnelattendancereportForm" label-position="top" label-width="100px" :class="{'register-form': true}">
      <el-collapse v-model="openCollapse">
        <el-collapse-item title="考勤统计" name="1">
          <div class="flex-panel">
            <el-form-item label="主键" prop="id">
              <el-input v-model="personnelattendancereportForm.id" placeholder="请输入主键" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="员工id" prop="employeeId">
              <el-input v-model="personnelattendancereportForm.employeeId" placeholder="请输入员工id" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="月份" prop="month">
              <el-input v-model="personnelattendancereportForm.month" placeholder="请输入月份" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="应出勤天数" prop="days">
              <el-input v-model="personnelattendancereportForm.days" placeholder="请输入应出勤天数" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="实际出勤天数" prop="actualDays">
              <el-input v-model="personnelattendancereportForm.actualDays" placeholder="请输入实际出勤天数" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="迟到次数" prop="late">
              <el-input v-model="personnelattendancereportForm.late" placeholder="请输入迟到次数" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="早退次数" prop="early">
              <el-input v-model="personnelattendancereportForm.early" placeholder="请输入早退次数" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="未打卡次数" prop="nopunches">
              <el-input v-model="personnelattendancereportForm.nopunches" placeholder="请输入未打卡次数" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="旷工次数" prop="completion">
              <el-input v-model="personnelattendancereportForm.completion" placeholder="请输入旷工次数" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="加班时长" prop="overtime">
              <el-input v-model="personnelattendancereportForm.overtime" placeholder="请输入加班时长" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
              <el-input v-model="personnelattendancereportForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="left-row">
        <el-button type="primary" @click="submitForm('personnelattendancereportForm')">保存</el-button>
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
      personnelattendancereportForm: {},
      openCollapse: ["1"],//默认打开的面板
      rules: {
        id: [
          { required: true, message: '请输入主键', trigger: ['blur'] }
        ],
        employeeId: [
          { required: true, message: '请输入员工id', trigger: ['blur'] }
        ],
        month: [
          { required: true, message: '请输入月份', trigger: ['blur'] }
        ],
        days: [
          { required: true, message: '请输入应出勤天数', trigger: ['blur'] }
        ],
        actualDays: [
          { required: true, message: '请输入实际出勤天数', trigger: ['blur'] }
        ],
        late: [
          { required: true, message: '请输入迟到次数', trigger: ['blur'] }
        ],
        early: [
          { required: true, message: '请输入早退次数', trigger: ['blur'] }
        ],
        nopunches: [
          { required: true, message: '请输入未打卡次数', trigger: ['blur'] }
        ],
        completion: [
          { required: true, message: '请输入旷工次数', trigger: ['blur'] }
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
        ajax.get('personnel/personnelattendancereport/' + this.$route.query.id).then(rs => {
          this.personnelattendancereportForm = rs.data;
          if (null != rs.data.img && rs.data.img.length > 0) {
            this.img = JSON.parse(rs.data.img);
          }
        });
      }
    },

    //保存
    submitForm(form) {
      var data = this.personnelattendancereportForm;
      this.$refs[form]
        .validate((valid) => {
          if (!valid) {
            this.$message
              .error('校验不通过，请检查输入项');
            return;
          }
          ajax.post('personnel/personnelattendancereport', data).then(rs => {
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
