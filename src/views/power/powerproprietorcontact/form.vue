<template>
  <div class="form-panel">
    <el-form :model="powerproprietorcontactForm" :rules="rules" ref="powerproprietorcontactForm" label-position="top" label-width="100px" :class="{'register-form': true}">
      <el-collapse v-model="openCollapse">
        <el-collapse-item title="业主-联系人" name="1">
          <div class="flex-panel">
            <el-form-item label="主键" prop="id">
              <el-input v-model="powerproprietorcontactForm.id" placeholder="请输入主键" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="name">
              <el-input v-model="powerproprietorcontactForm.name" placeholder="请输入名称" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="phone">
              <el-input v-model="powerproprietorcontactForm.phone" placeholder="请输入联系方式" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="powerproprietorcontactForm.email" placeholder="请输入邮箱" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="职务" prop="post">
              <el-input v-model="powerproprietorcontactForm.post" placeholder="请输入职务" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="部门" prop="department">
              <el-input v-model="powerproprietorcontactForm.department" placeholder="请输入部门" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
              <el-input v-model="powerproprietorcontactForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="创建人" prop="creater">
              <el-input v-model="powerproprietorcontactForm.creater" placeholder="请输入创建人" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="更新人" prop="updater">
              <el-input v-model="powerproprietorcontactForm.updater" placeholder="请输入更新人" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="createTime">
              <el-input v-model="powerproprietorcontactForm.createTime" placeholder="请输入创建时间" maxlength=30 clearable></el-input>
            </el-form-item>
            <el-form-item label="更新时间" prop="updateTime">
              <el-input v-model="powerproprietorcontactForm.updateTime" placeholder="请输入更新时间" maxlength=30 clearable></el-input>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="left-row">
        <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" @click="submitForm('powerproprietorcontactForm')">保存</el-button>
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
      powerproprietorcontactForm: {},
      openCollapse: ["1"],//默认打开的面板
      rules: {
        id: [
          { required: true, message: '请输入主键', trigger: ['blur'] }
        ],
        name: [
          { required: true, message: '请输入名称', trigger: ['blur'] }
        ],
        phone: [
          { required: true, message: '请输入联系方式', trigger: ['blur'] }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: ['blur'] }
        ],
        post: [
          { required: true, message: '请输入职务', trigger: ['blur'] }
        ],
        department: [
          { required: true, message: '请输入部门', trigger: ['blur'] }
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
        ajax.get('project/powerproprietorcontact/' + this.$route.query.id).then(rs => {
          this.powerproprietorcontactForm = rs.data;
          if (null != rs.data.img && rs.data.img.length > 0) {
            this.img = JSON.parse(rs.data.img);
          }
        });
      }
    },

    //保存
    submitForm(form) {
      var data = this.powerproprietorcontactForm;
      this.$refs[form]
        .validate((valid) => {
          if (!valid) {
            this.$message
              .error('校验不通过，请检查输入项');
            return;
          }
          ajax.post('project/powerproprietorcontact', data).then(rs => {
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
