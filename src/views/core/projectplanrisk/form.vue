<template>
  <div class="form-panel">
    <el-form :model="projectplanriskForm" :rules="rules" ref="projectplanriskForm" label-position="top" label-width="100px" :class="{'register-form': true}">
      <el-collapse v-model="openCollapse">
        <el-collapse-item title="项目计划模板风险清册" name="1">
          <div class="flex-panel">
            <el-form-item label="主键id" prop="guidePrice">
              <el-input v-model="projectplanriskForm.id" placeholder="请输入主键id" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="项目计划id" prop="guidePrice">
              <el-input v-model="projectplanriskForm.planId" placeholder="请输入项目计划id" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="风险编号" prop="guidePrice">
              <el-input v-model="projectplanriskForm.code" placeholder="请输入风险编号" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="工序" prop="guidePrice">
              <el-input v-model="projectplanriskForm.process" placeholder="请输入工序" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="风险可能导致后果" prop="guidePrice">
              <el-input v-model="projectplanriskForm.result" placeholder="请输入风险可能导致后果" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="风险级别（1- 一级，2-二级，3-三级，4-四级）" prop="guidePrice">
              <el-input v-model="projectplanriskForm.riskLevel" placeholder="请输入系统风险级别（1- 一级，2-二级，3-三级，4-四级）" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="数据状态(0-删除，1-正常)" prop="guidePrice">
              <el-input v-model="projectplanriskForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="创建人" prop="guidePrice">
              <el-input v-model="projectplanriskForm.creater" placeholder="请输入创建人" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="修改人" prop="guidePrice">
              <el-input v-model="projectplanriskForm.updater" placeholder="请输入修改人" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="guidePrice">
              <el-input v-model="projectplanriskForm.createTime" placeholder="请输入创建时间" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="修改时间" prop="guidePrice">
              <el-input v-model="projectplanriskForm.updateTime" placeholder="请输入修改时间" maxlength=30 clearable></el-input>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="left-row">
        <el-button type="primary" @click="submitForm('projectplanriskForm')">保存</el-button>
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
      projectplanriskForm: {},
      openCollapse: ["1"],//默认打开的面板
      rules: {
        id: [
          { required: true, message: '请输入主键id', trigger: ['blur'] }
        ],
        planId: [
          { required: true, message: '请输入项目计划id', trigger: ['blur'] }
        ],
        code: [
          { required: true, message: '请输入风险编号', trigger: ['blur'] }
        ],
        process: [
          { required: true, message: '请输入工序', trigger: ['blur'] }
        ],
        result: [
          { required: true, message: '请输入风险可能导致后果', trigger: ['blur'] }
        ],
        riskLevel: [
          { required: true, message: '请输入系统风险级别（1- 一级，2-二级，3-三级，4-四级）', trigger: ['blur'] }
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
        ajax.get('core/projectplanrisk/' + this.$route.query.id).then(rs => {
          this.projectplanriskForm = rs.data;
          if (null != rs.data.img && rs.data.img.length > 0) {
            this.img = JSON.parse(rs.data.img);
          }
        });
      }
    },

    //保存
    submitForm(form) {
      var data = this.projectplanriskForm;
      this.$refs[form]
        .validate((valid) => {
          if (!valid) {
            this.$message
              .error('校验不通过，请检查输入项');
            return;
          }
          ajax.post('core/projectplanrisk', data).then(rs => {
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
