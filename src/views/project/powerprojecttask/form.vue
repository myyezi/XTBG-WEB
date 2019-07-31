<template>
  <div class="form-panel">
    <el-form :model="powerprojecttaskForm" :rules="rules" ref="powerprojecttaskForm" label-position="top" label-width="100px" :class="{'register-form': true}">
      <el-collapse v-model="openCollapse">
        <el-collapse-item title="项目任务书" name="1">
          <div class="flex-panel">
            <el-form-item label="主键" prop="id">
              <el-input v-model="powerprojecttaskForm.id" placeholder="请输入主键" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="所属管理公司(组织表管理公司id)" prop="companyId">
              <el-input v-model="powerprojecttaskForm.companyId" placeholder="请输入所属管理公司(组织表管理公司id)" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="编号" prop="code">
              <el-input v-model="powerprojecttaskForm.code" placeholder="请输入编号" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="name">
              <el-input v-model="powerprojecttaskForm.name" placeholder="请输入名称" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="项目类型（关联字典表，取value值）" prop="type">
              <el-input v-model="powerprojecttaskForm.type" placeholder="请输入项目类型（关联字典表，取value值）" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="建设单位(关联业主表)" prop="proprietorId">
              <el-input v-model="powerprojecttaskForm.proprietorId" placeholder="请输入建设单位(关联业主表)" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="联系人(关联业主联系人表)" prop="proprietorContactId">
              <el-input v-model="powerprojecttaskForm.proprietorContactId" placeholder="请输入联系人(关联业主联系人表)" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="任务依据（1-委托书  2-招投标  3-电话委托  4-其他）" prop="source">
              <el-input v-model="powerprojecttaskForm.source" placeholder="请输入任务依据（1-委托书  2-招投标  3-电话委托  4-其他）" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="相关设（关联字典表，取value值,多个逗号隔开）" prop="relatedDesign">
              <el-input v-model="powerprojecttaskForm.relatedDesign" placeholder="请输入相关设（关联字典表，取value值,多个逗号隔开）" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="协办部门(关联字典表，取value值,多个逗号隔开)" prop="coDepartment">
              <el-input v-model="powerprojecttaskForm.coDepartment" placeholder="请输入协办部门(关联字典表，取value值,多个逗号隔开)" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="项目经理(关联用户表)" prop="manager">
              <el-input v-model="powerprojecttaskForm.manager" placeholder="请输入项目经理(关联用户表)" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="签收状态(1-未签收  2-已签收)" prop="signStatus">
              <el-input v-model="powerprojecttaskForm.signStatus" placeholder="请输入签收状态(1-未签收  2-已签收)" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="签收人(关联用户表)" prop="signer">
              <el-input v-model="powerprojecttaskForm.signer" placeholder="请输入签收人(关联用户表)" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="签收时间" prop="signTime">
              <el-input v-model="powerprojecttaskForm.signTime" placeholder="请输入签收时间" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="设计规模" prop="designScale">
              <el-input v-model="powerprojecttaskForm.designScale" placeholder="请输入设计规模" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="设计范围" prop="designRange">
              <el-input v-model="powerprojecttaskForm.designRange" placeholder="请输入设计范围" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="项目进度要求" prop="progress">
              <el-input v-model="powerprojecttaskForm.progress" placeholder="请输入项目进度要求" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="详细地址" prop="adress">
              <el-input v-model="powerprojecttaskForm.adress" placeholder="请输入详细地址" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="经度" prop="longitude">
              <el-input v-model="powerprojecttaskForm.longitude" placeholder="请输入经度" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="纬度" prop="latitude">
              <el-input v-model="powerprojecttaskForm.latitude" placeholder="请输入纬度" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="powerprojecttaskForm.remark" placeholder="请输入备注" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
              <el-input v-model="powerprojecttaskForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="创建人" prop="creater">
              <el-input v-model="powerprojecttaskForm.creater" placeholder="请输入创建人" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="更新人" prop="updater">
              <el-input v-model="powerprojecttaskForm.updater" placeholder="请输入更新人" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="createTime">
              <el-input v-model="powerprojecttaskForm.createTime" placeholder="请输入创建时间" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="更新时间" prop="updateTime">
              <el-input v-model="powerprojecttaskForm.updateTime" placeholder="请输入更新时间" maxlength=30 clearable></el-input>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="left-row">
        <el-button type="primary" @click="submitForm('powerprojecttaskForm')">保存</el-button>
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
      powerprojecttaskForm: {},
      openCollapse: ["1"],//默认打开的面板
      rules: {
        id: [
          { required: true, message: '请输入主键', trigger: ['blur'] }
        ],
        companyId: [
          { required: true, message: '请输入所属管理公司(组织表管理公司id)', trigger: ['blur'] }
        ],
        code: [
          { required: true, message: '请输入编号', trigger: ['blur'] }
        ],
        name: [
          { required: true, message: '请输入名称', trigger: ['blur'] }
        ],
        type: [
          { required: true, message: '请输入项目类型（关联字典表，取value值）', trigger: ['blur'] }
        ],
        proprietorId: [
          { required: true, message: '请输入建设单位(关联业主表)', trigger: ['blur'] }
        ],
        proprietorContactId: [
          { required: true, message: '请输入联系人(关联业主联系人表)', trigger: ['blur'] }
        ],
        source: [
          { required: true, message: '请输入任务依据（1-委托书  2-招投标  3-电话委托  4-其他）', trigger: ['blur'] }
        ],
        relatedDesign: [
          { required: true, message: '请输入相关设（关联字典表，取value值,多个逗号隔开）', trigger: ['blur'] }
        ],
        coDepartment: [
          { required: true, message: '请输入协办部门(关联字典表，取value值,多个逗号隔开)', trigger: ['blur'] }
        ],
        manager: [
          { required: true, message: '请输入项目经理(关联用户表)', trigger: ['blur'] }
        ],
        signStatus: [
          { required: true, message: '请输入签收状态(1-未签收  2-已签收)', trigger: ['blur'] }
        ],
        signer: [
          { required: true, message: '请输入签收人(关联用户表)', trigger: ['blur'] }
        ],
        signTime: [
          { required: true, message: '请输入签收时间', trigger: ['blur'] }
        ],
        designScale: [
          { required: true, message: '请输入设计规模', trigger: ['blur'] }
        ],
        designRange: [
          { required: true, message: '请输入设计范围', trigger: ['blur'] }
        ],
        progress: [
          { required: true, message: '请输入项目进度要求', trigger: ['blur'] }
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
        remark: [
          { required: true, message: '请输入备注', trigger: ['blur'] }
        ],
        status: [
          { required: true, message: '请输入数据状态(0-删除，1-正常)', trigger: ['blur'] }
        ],
        creater: [
          { required: true, message: '请输入创建人', trigger: ['blur'] }
        ],
        updater: [
          { required: true, message: '请输入更新人', trigger: ['blur'] }
        ],
        createTime: [
          { required: true, message: '请输入创建时间', trigger: ['blur'] }
        ],
        updateTime: [
          { required: true, message: '请输入更新时间', trigger: ['blur'] }
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
        ajax.get('project/powerprojecttask/' + this.$route.query.id).then(rs => {
          this.powerprojecttaskForm = rs.data;
          if (null != rs.data.img && rs.data.img.length > 0) {
            this.img = JSON.parse(rs.data.img);
          }
        });
      }
    },

    //保存
    submitForm(form) {
      var data = this.powerprojecttaskForm;
      this.$refs[form]
        .validate((valid) => {
          if (!valid) {
            this.$message
              .error('校验不通过，请检查输入项');
            return;
          }
          ajax.post('project/powerprojecttask', data).then(rs => {
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
