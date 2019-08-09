<template>
  <div class="form-panel">
    <el-form :model="powerprojecttemplateconfigForm" :rules="rules" ref="powerprojecttemplateconfigForm" label-position="top" label-width="100px" :class="{'register-form': true}">
      <el-collapse v-model="openCollapse">
        <el-collapse-item title="项目计划模板设置" name="1">
          <div class="flex-panel">
            <el-form-item label="主键id" prop="id">
              <el-input v-model="powerprojecttemplateconfigForm.id" placeholder="请输入主键id" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="模板id" prop="templateId">
              <el-input v-model="powerprojecttemplateconfigForm.templateId" placeholder="请输入模板id" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="节点名称" prop="name">
              <el-input v-model="powerprojecttemplateconfigForm.name" placeholder="请输入节点名称" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="节点级别（1- 一级，2-二级，3-三级）" prop="level">
              <el-input v-model="powerprojecttemplateconfigForm.level" placeholder="请输入节点级别（1- 一级，2-二级，3-三级）" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="父节点id" prop="parentId">
              <el-input v-model="powerprojecttemplateconfigForm.parentId" placeholder="请输入父节点id" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="工程阶段（关联字典表，取value值）" prop="stage">
              <el-input v-model="powerprojecttemplateconfigForm.stage" placeholder="请输入工程阶段（关联字典表，取value值）" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="工期" prop="period">
              <el-input v-model="powerprojecttemplateconfigForm.period" placeholder="请输入工期" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="profession">
              <el-input v-model="powerprojecttemplateconfigForm.profession" placeholder="请输入专业" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="是否审批（0-否 1-是）" prop="isApproval">
              <el-input v-model="powerprojecttemplateconfigForm.isApproval" placeholder="请输入是否审批（0-否 1-是）" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="是否上传文件（0-否 1-是）" prop="isUpload">
              <el-input v-model="powerprojecttemplateconfigForm.isUpload" placeholder="请输入是否上传文件（0-否 1-是）" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="排序号" prop="sortNum">
              <el-input v-model="powerprojecttemplateconfigForm.sortNum" placeholder="请输入排序号" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
              <el-input v-model="powerprojecttemplateconfigForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="创建人" prop="creater">
              <el-input v-model="powerprojecttemplateconfigForm.creater" placeholder="请输入创建人" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="修改人" prop="updater">
              <el-input v-model="powerprojecttemplateconfigForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="createTime">
              <el-input v-model="powerprojecttemplateconfigForm.createTime" placeholder="请输入创建时间" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="修改时间" prop="updateTime">
              <el-input v-model="powerprojecttemplateconfigForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="left-row">
        <el-button type="primary" @click="submitForm('powerprojecttemplateconfigForm')">保存</el-button>
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
      powerprojecttemplateconfigForm: {},
      openCollapse: ["1"],//默认打开的面板
      rules: {
        id: [
          { required: true, message: '请输入主键id', trigger: ['blur'] }
        ],
        templateId: [
          { required: true, message: '请输入模板id', trigger: ['blur'] }
        ],
        name: [
          { required: true, message: '请输入节点名称', trigger: ['blur'] }
        ],
        level: [
          { required: true, message: '请输入节点级别（1- 一级，2-二级，3-三级）', trigger: ['blur'] }
        ],
        parentId: [
          { required: true, message: '请输入父节点id', trigger: ['blur'] }
        ],
        stage: [
          { required: true, message: '请输入工程阶段（关联字典表，取value值）', trigger: ['blur'] }
        ],
        period: [
          { required: true, message: '请输入工期', trigger: ['blur'] }
        ],
        profession: [
          { required: true, message: '请输入专业', trigger: ['blur'] }
        ],
        isApproval: [
          { required: true, message: '请输入是否审批（0-否 1-是）', trigger: ['blur'] }
        ],
        isUpload: [
          { required: true, message: '请输入是否上传文件（0-否 1-是）', trigger: ['blur'] }
        ],
        sortNum: [
          { required: true, message: '请输入排序号', trigger: ['blur'] }
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
        ajax.get('project/powerprojecttemplateconfig/' + this.$route.query.id).then(rs => {
          this.powerprojecttemplateconfigForm = rs.data;
          if (null != rs.data.img && rs.data.img.length > 0) {
            this.img = JSON.parse(rs.data.img);
          }
        });
      }
    },

    //保存
    submitForm(form) {
      var data = this.powerprojecttemplateconfigForm;
      this.$refs[form]
        .validate((valid) => {
          if (!valid) {
            this.$message
              .error('校验不通过，请检查输入项');
            return;
          }
          ajax.post('project/powerprojecttemplateconfig', data).then(rs => {
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
