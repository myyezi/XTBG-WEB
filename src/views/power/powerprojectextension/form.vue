<template>
  <div class="form-panel">
    <el-form :model="powerprojectextensionForm" :rules="rules" ref="powerprojectextensionForm" label-position="top" label-width="100px" :class="{'register-form': true}">
      <el-collapse v-model="openCollapse">
        <el-collapse-item title="项目延期" name="1">
          <div class="flex-panel">
            <el-form-item label="主键id" prop="id">
              <el-input v-model="powerprojectextensionForm.id" placeholder="请输入主键id" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="项目id" prop="projectId">
              <el-input v-model="powerprojectextensionForm.projectId" placeholder="请输入项目id" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="延期日期" prop="extDate">
              <el-input v-model="powerprojectextensionForm.extDate" placeholder="请输入延期日期" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="延期原因" prop="reason">
              <el-input v-model="powerprojectextensionForm.reason" placeholder="请输入延期原因" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="审批人" prop="approver">
              <el-input v-model="powerprojectextensionForm.approver" placeholder="请输入审批人" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="审批时间" prop="approvalTime">
              <el-input v-model="powerprojectextensionForm.approvalTime" placeholder="请输入审批时间" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="审批状态(1-待审批   2-审批通过   3-审批不通过)" prop="approvalStatus">
              <el-input v-model="powerprojectextensionForm.approvalStatus" placeholder="请输入审批状态(1-待审批   2-审批通过   3-审批不通过)" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="审批原因" prop="approvalReason">
              <el-input v-model="powerprojectextensionForm.approvalReason" placeholder="请输入审批原因" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
              <el-input v-model="powerprojectextensionForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="创建人" prop="creater">
              <el-input v-model="powerprojectextensionForm.creater" placeholder="请输入创建人" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="修改人" prop="updater">
              <el-input v-model="powerprojectextensionForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="createTime">
              <el-input v-model="powerprojectextensionForm.createTime" placeholder="请输入创建时间" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="修改时间" prop="updateTime">
              <el-input v-model="powerprojectextensionForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="left-row">
        <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" @click="submitForm('powerprojectextensionForm')">保存</el-button>
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
      powerprojectextensionForm: {},
      openCollapse: ["1"],//默认打开的面板
      rules: {
        id: [
          { required: true, message: '请输入主键id', trigger: ['blur'] }
        ],
        projectId: [
          { required: true, message: '请输入项目id', trigger: ['blur'] }
        ],
        extDate: [
          { required: true, message: '请输入延期日期', trigger: ['blur'] }
        ],
        reason: [
          { required: true, message: '请输入延期原因', trigger: ['blur'] }
        ],
        approver: [
          { required: true, message: '请输入审批人', trigger: ['blur'] }
        ],
        approvalTime: [
          { required: true, message: '请输入审批时间', trigger: ['blur'] }
        ],
        approvalStatus: [
          { required: true, message: '请输入审批状态(1-待审批   2-审批通过   3-审批不通过)', trigger: ['blur'] }
        ],
        approvalReason: [
          { required: true, message: '请输入审批原因', trigger: ['blur'] }
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
        ajax.get('project/powerprojectextension/' + this.$route.query.id).then(rs => {
          this.powerprojectextensionForm = rs.data;
          if (null != rs.data.img && rs.data.img.length > 0) {
            this.img = JSON.parse(rs.data.img);
          }
        });
      }
    },

    //保存
    submitForm(form) {
      var data = this.powerprojectextensionForm;
      this.$refs[form]
        .validate((valid) => {
          if (!valid) {
            this.$message
              .error('校验不通过，请检查输入项');
            return;
          }
          ajax.post('project/powerprojectextension', data).then(rs => {
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
