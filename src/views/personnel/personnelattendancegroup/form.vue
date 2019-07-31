<template>
  <div class="form-panel">
    <el-form :model="personnelattendancegroupForm" :rules="rules" ref="personnelattendancegroupForm" label-position="top" label-width="100px" :class="{'register-form': true}">
      <el-collapse v-model="openCollapse">
        <el-collapse-item title="考勤组" name="1">
          <div class="flex-panel">
            <el-form-item label="主键" prop="id">
              <el-input v-model="personnelattendancegroupForm.id" placeholder="请输入主键" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="所属管理公司(组织表管理公司id)" prop="companyId">
              <el-input v-model="personnelattendancegroupForm.companyId" placeholder="请输入所属管理公司(组织表管理公司id)" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="规则名称" prop="name">
              <el-input v-model="personnelattendancegroupForm.name" placeholder="请输入规则名称" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="工作日(1-常规工作日  2-含周六  3-含周日  4-含节假日)  多选逗号分隔" prop="workingDay">
              <el-input v-model="personnelattendancegroupForm.workingDay" placeholder="请输入工作日(1-常规工作日  2-含周六  3-含周日  4-含节假日)  多选逗号分隔" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="上班打卡时间" prop="onduty">
              <el-input v-model="personnelattendancegroupForm.onduty" placeholder="请输入上班打卡时间" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="下班打开时间" prop="offduty">
              <el-input v-model="personnelattendancegroupForm.offduty" placeholder="请输入下班打开时间" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="详细地址" prop="adress">
              <el-input v-model="personnelattendancegroupForm.adress" placeholder="请输入详细地址" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="经度" prop="longitude">
              <el-input v-model="personnelattendancegroupForm.longitude" placeholder="请输入经度" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="纬度" prop="latitude">
              <el-input v-model="personnelattendancegroupForm.latitude" placeholder="请输入纬度" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="打卡范围" prop="attendanceRange">
              <el-input v-model="personnelattendancegroupForm.attendanceRange" placeholder="请输入打卡范围" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
              <el-input v-model="personnelattendancegroupForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="创建人" prop="creater">
              <el-input v-model="personnelattendancegroupForm.creater" placeholder="请输入创建人" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="修改人" prop="updater">
              <el-input v-model="personnelattendancegroupForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="createTime">
              <el-input v-model="personnelattendancegroupForm.createTime" placeholder="请输入创建时间" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="修改时间" prop="updateTime">
              <el-input v-model="personnelattendancegroupForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="left-row">
        <el-button type="primary" @click="submitForm('personnelattendancegroupForm')">保存</el-button>
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
      personnelattendancegroupForm: {},
      openCollapse: ["1"],//默认打开的面板
      rules: {
        id: [
          { required: true, message: '请输入主键', trigger: ['blur'] }
        ],
        companyId: [
          { required: true, message: '请输入所属管理公司(组织表管理公司id)', trigger: ['blur'] }
        ],
        name: [
          { required: true, message: '请输入规则名称', trigger: ['blur'] }
        ],
        workingDay: [
          { required: true, message: '请输入工作日(1-常规工作日  2-含周六  3-含周日  4-含节假日)  多选逗号分隔', trigger: ['blur'] }
        ],
        onduty: [
          { required: true, message: '请输入上班打卡时间', trigger: ['blur'] }
        ],
        offduty: [
          { required: true, message: '请输入下班打开时间', trigger: ['blur'] }
        ],
        adress: [
          { required: true, message: '请输入详细地址', trigger: ['blur'] }
        ],
        longitude: [
          { required: true, message: '请输入经度', trigger: ['blur'] }
        ],
        latitude: [
          { required: true, message: '请输入纬度', trigger: ['blur'] }
        ],
        attendanceRange: [
          { required: true, message: '请输入打卡范围', trigger: ['blur'] }
        ],
        status: [
          { required: true, message: '请输入数据状态(0-删除，1-正常)', trigger: ['blur'] }
        ],
        creater: [
          { required: true, message: '请输入创建人', trigger: ['blur'] }
        ],
        updater: [
          { required: true, message: '请输入修改人', trigger: ['blur'] }
        ],
        createTime: [
          { required: true, message: '请输入创建时间', trigger: ['blur'] }
        ],
        updateTime: [
          { required: true, message: '请输入修改时间', trigger: ['blur'] }
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
        ajax.get('personnel/personnelattendancegroup/' + this.$route.query.id).then(rs => {
          this.personnelattendancegroupForm = rs.data;
          if (null != rs.data.img && rs.data.img.length > 0) {
            this.img = JSON.parse(rs.data.img);
          }
        });
      }
    },

    //保存
    submitForm(form) {
      var data = this.personnelattendancegroupForm;
      this.$refs[form]
        .validate((valid) => {
          if (!valid) {
            this.$message
              .error('校验不通过，请检查输入项');
            return;
          }
          ajax.post('personnel/personnelattendancegroup', data).then(rs => {
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
