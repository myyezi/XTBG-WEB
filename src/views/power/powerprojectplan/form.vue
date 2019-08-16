<template>
  <div class="form-panel">
    <el-form :model="powerprojecttaskForm" :rules="rules" ref="powerprojecttaskForm" label-position="top" label-width="100px" :class="{'register-form': true}">
      <el-collapse v-model="openCollapse">
        <el-collapse-item title="项目计划" name="1">
            <div class="flex-panel">
                <el-form-item label="项目任务书" prop="projectTaskId">
                    <el-select v-model="taskId" placeholder="请选择项目任务书" clearable @change="onChangeProjectTask">
                        <el-option v-for="e in projectTaskList"  :key="e.id" :label="e.name" :value="e.id" ></el-option >
                    </el-select>
                </el-form-item>
                <el-form-item label="项目类型">
                  <el-input v-model="powerprojecttaskForm.typeText" placeholder="请选择项目类型" clearable :disabled="planDisabled"></el-input>
                </el-form-item>
                <el-form-item label="项目名称">
                  <el-input v-model="powerprojecttaskForm.name" placeholder="请输入项目名称" clearable :disabled="planDisabled"></el-input>
                </el-form-item>
                <el-form-item label="建设单位">
                  <el-input v-model="powerprojecttaskForm.proprietorName" placeholder="请输入建设单位" clearable :disabled="planDisabled"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                  <el-input v-model="powerprojecttaskForm.proprietorContactName" placeholder="请输入联系人" clearable :disabled="planDisabled"></el-input>
                </el-form-item>
                <el-form-item label="任务依据">
                  <el-input v-model="powerprojecttaskForm.sourceText" placeholder="请输入任务依据" clearable :disabled="planDisabled"></el-input>
                </el-form-item>
                <el-form-item label="相关设计">
                  <el-input v-model="powerprojecttaskForm.relatedDesignText" placeholder="请输入相关设计" clearable :disabled="planDisabled"></el-input>
                </el-form-item>
                <el-form-item label="协办部门">
                  <el-input v-model="powerprojecttaskForm.coDepartmentText" placeholder="请输入协办部门" clearable :disabled="planDisabled"></el-input>
                </el-form-item>
                <el-form-item label="项目经理">
                  <el-input v-model="powerprojecttaskForm.manager" placeholder="请输入项目经理" clearable :disabled="planDisabled"></el-input>
                </el-form-item>
                <el-form-item label="签收人">
                  <el-input v-model="powerprojecttaskForm.signer" placeholder="请输入签收人" clearable :disabled="planDisabled"></el-input>
                </el-form-item>
                <el-form-item label="设计规模" class="small">
                  <el-input type="textarea" v-model="powerprojecttaskForm.designScale" placeholder="请输入设计规模" clearable :disabled="planDisabled"></el-input>
                </el-form-item>
                <el-form-item label="设计范围" class="small">
                  <el-input type="textarea" v-model="powerprojecttaskForm.designRange" placeholder="请输入设计范围" clearable :disabled="planDisabled"></el-input>
                </el-form-item>
                <el-form-item label="项目进度要求" class="small">
                  <el-input type="textarea" v-model="powerprojecttaskForm.progress" placeholder="请输入项目进度要求" clearable :disabled="planDisabled"></el-input>
                </el-form-item>
                <el-form-item label="备注" class="small">
                  <el-input type="textarea" v-model="powerprojecttaskForm.remark" placeholder="请输入备注" clearable :disabled="planDisabled"></el-input>
                </el-form-item>
            </div>
          </el-collapse-item>
          <el-collapse-item title="计划信息" name="2">

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
        openCollapse: ["1","2"],
        planDisabled : true,
        projectTaskList : [],
        taskId : "",
        rules: {
            id: [
                { required: true, message: '请输入主键id', trigger: ['blur'] }
            ],
        }
    }
  },
  mounted() {
      //this.open();
      this.getTaskList();
  },
  methods: {

    //进入编辑页调用 bean为列表页传入数据
    open() {
        if (this.$route.query.id) {
            ajax.get('project/powerprojectplan/' + this.$route.query.id).then(rs => {
                this.powerprojecttaskForm = rs.data;
                if (null != rs.data.img && rs.data.img.length > 0) {
                    this.img = JSON.parse(rs.data.img);
                }
            });
        }
    },

    getTaskList(){
        ajax.get('power/powerprojecttask/getTaskSelect').then(rs => {
            if (rs.status === 0){
                this.projectTaskList = rs.data;
            }else{
                this.$message({
                    message: rs.msg,
                    type: 'error'
                });
            }
        });
    },

    onChangeProjectTask(){
        if (this.taskId){
            ajax.get('power/powerprojecttask/getOneById/' + this.taskId).then(rs => {
                if (rs.status === 0){
                    this.powerprojecttaskForm = rs.data;
                }else{
                    this.$message({
                        message: rs.msg,
                        type: 'error'
                    });
                }
            });
        }else{
            this.powerprojecttaskForm = [];
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
          ajax.post('project/powerprojectplan', data).then(rs => {
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
