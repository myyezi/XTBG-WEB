<template>
  <div class="form-panel">
    <el-form :model="powerprojectForm" :rules="rules" ref="powerprojectForm" label-position="top" label-width="100px" :class="{'register-form': true}">
      <el-collapse v-model="openCollapse">
        <el-collapse-item title="项目" name="1">
          <div class="flex-panel">
            <el-form-item label="主键id" prop="id">
              <el-input v-model="powerprojectForm.id" placeholder="请输入主键id" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="项目任务书id" prop="projectTaskId">
              <el-input v-model="powerprojectForm.projectTaskId" placeholder="请输入项目任务书id" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="项目状态（1-暂存  2-进行中  3-已暂停  4-已完成）" prop="projectStatus">
              <el-input v-model="powerprojectForm.projectStatus" placeholder="请输入项目状态（1-暂存  2-进行中  3-已暂停  4-已完成）" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="开始时间" prop="startTime">
              <el-input v-model="powerprojectForm.startTime" placeholder="请输入开始时间" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="结束时间" prop="endTime">
              <el-input v-model="powerprojectForm.endTime" placeholder="请输入结束时间" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
              <el-input v-model="powerprojectForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="创建人" prop="creater">
              <el-input v-model="powerprojectForm.creater" placeholder="请输入创建人" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="修改人" prop="updater">
              <el-input v-model="powerprojectForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="createTime">
              <el-input v-model="powerprojectForm.createTime" placeholder="请输入创建时间" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="修改时间" prop="updateTime">
              <el-input v-model="powerprojectForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="left-row">
        <el-button type="primary" @click="submitForm('powerprojectForm')">保存</el-button>
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
      powerprojectForm: {},
      openCollapse: ["1"],//默认打开的面板
      rules: {
        id: [
          { required: true, message: '请输入主键id', trigger: ['blur'] }
        ],
        projectTaskId: [
          { required: true, message: '请输入项目任务书id', trigger: ['blur'] }
        ],
        projectStatus: [
          { required: true, message: '请输入项目状态（1-暂存  2-进行中  3-已暂停  4-已完成）', trigger: ['blur'] }
        ],
        startTime: [
          { required: true, message: '请输入开始时间', trigger: ['blur'] }
        ],
        endTime: [
          { required: true, message: '请输入结束时间', trigger: ['blur'] }
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
        ajax.get('project/powerproject/' + this.$route.query.id).then(rs => {
          this.powerprojectForm = rs.data;
          if (null != rs.data.img && rs.data.img.length > 0) {
            this.img = JSON.parse(rs.data.img);
          }
        });
      }
    },

    //保存
    submitForm(form) {
      var data = this.powerprojectForm;
      this.$refs[form]
        .validate((valid) => {
          if (!valid) {
            this.$message
              .error('校验不通过，请检查输入项');
            return;
          }
          ajax.post('project/powerproject', data).then(rs => {
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
