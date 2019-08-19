<template>
  <div class="form-panel">
    <el-form :model="powerprojecttaskForm" label-position="top" label-width="100px">
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
              <template>
                  <div class="app-container white-bg list-panel" v-cloak style="height: calc(100vh - 120px);padding:10px">
                      <div class="container clearfix">
                          <gantt-add
                              ref="gantt"
                              class="left-container"
                              v-if="isLoading"
                              :tasks="tasks"
                              :headerTitle="headerTitle">
                          </gantt-add>
                          <!--<div style="margin-top:5px;float:right"><el-button type="primary" size="small">保存</el-button></div>-->
                      </div>
                  </div>
              </template>
          </el-collapse-item>
      </el-collapse>
      <div class="left-row">
        <el-button type="primary" @click="submitForm('powerprojecttaskForm')">保存</el-button>
        <el-button @click="close">返回</el-button>
      </div>
    </el-form>

    <el-dialog title="项目计划信息" :visible.sync="dialogVisible" :class="{'dialog_animation_in':dialogVisible,'dialog_animation_out':!dialogVisible}" width="35%">
          <el-form :model="powerprojectplanform" :rules="rules" ref="ruleForm" label-width="120px">
              <el-form-item label="工作内容" prop="name">
                  <el-input v-show="!showContent" v-model.trim="powerprojectplanform.name" autocomplete="off" maxlength="50" class="overall_situation_input_icon" clearable show-word-limit></el-input>
                  <el-select v-show="showContent" v-model="powerprojectplanform.name" placeholder="请选择工作内容" clearable>
                      <el-option  label="勘察收资" value="勘察收资"></el-option>
                      <el-option  label="卷册设计" value="卷册设计"></el-option>
                      <el-option  label="项目审查" value="项目审查"></el-option>
                      <el-option  label="技术交底" value="技术交底"></el-option>
                      <el-option  label="设计变更" value="设计变更"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="工期" prop="period">
                  <el-input v-model="powerprojectplanform.period"></el-input>
              </el-form-item>
              <el-form-item label="开始时间" prop="planStartDate">
                  <el-date-picker
                      v-model="powerprojectplanform.planStartDate"
                      clearable
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择开始时间">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间" prop="planEndDate">
                  <el-date-picker
                      v-model="powerprojectplanform.planEndDate"
                      clearable
                      value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择结束时间">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="所属阶段" prop="stage">
                  <el-select v-model="powerprojectplanform.stage" placeholder="请选择所属阶段" clearable>
                      <el-option v-for="e in stageList"  :key="e.value" :label="e.text" :value="e.value" ></el-option >
                  </el-select>
              </el-form-item>
              <el-form-item label="负责人" prop="principal">
                  <el-input v-model="powerprojectplanform.principalText" placeholder="请选择负责人" readonly clearable>
                      <el-button slot="append" icon="el-icon-search" @click="showUserSelector = true"></el-button>
                  </el-input>
              </el-form-item>
              <el-form-item label="专业" prop="profession">
                  <el-input v-model.trim="powerprojectplanform.profession" autocomplete="off" maxlength="50" class="overall_situation_input_icon" clearable show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="是否审批" prop="isApproval">
                  <el-radio v-model="powerprojectplanform.isApproval" :label="1">是</el-radio>
                  <el-radio v-model="powerprojectplanform.isApproval" :label="0">否</el-radio>
              </el-form-item>
              <el-form-item label="是否上传文件" prop="indexScore">
                  <el-radio v-model="powerprojectplanform.isUpload" :label="1">是</el-radio>
                  <el-radio v-model="powerprojectplanform.isUpload" :label="0">否</el-radio>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="ok">确 定</el-button>
          </div>
    </el-dialog>
    <!-- 用户选择器 -->
    <UserSelect :isShow="showUserSelector" @selectedOnchange="selectedOnchangeHandle"></UserSelect>
  </div>
</template>

<script>
import ajax from '@/utils/request'
import { tool, ruleTool } from '@/utils/common'
import GanttAdd from '@/components/Gannt/add'
import '@/components/dhtmlx-gantt'
import "@/components/dhtmlx-gantt/codebase/locale/locale_cn"
import Bus from "@/utils/eventBus.js"
import UserSelect from "@/components/UserSelect"

const addImg = require('@/styles/img/icon-img/add.png')
const editImg = require('@/styles/img/icon-img/edit.png')
const deletedImg = require('@/styles/img/icon-img/deleted.png')
export default {
  mixins: [tool, ruleTool],
  components: {GanttAdd, UserSelect},
  data() {
    let that = this;
    return {
        powerprojecttaskForm : {},
        powerprojectplanform : {
            isApproval : 1,
            isUpload : 1,
        },
        formData : {
            name : "",
            period : null,
            planStartDate : "",
            planEndDate : "",
            profession : "",
            stage : null,
            principal : "",
            isApproval : null,
            isUpload : null
        },
        openCollapse: ["1","2"],
        planDisabled : true,
        dialogVisible : false,
        showUserSelector : false,
        projectTaskList : [],
        stageList : [],
        taskId : "",
        showContent : "",
        operationType : "",
        rules: {
            projectTaskId: [
                { required: true, message: '请选择项目任务书', trigger: ['blur'] }
            ],
        },
        tasks: {
            data: [],
            links: []
        },
        isLoading: false,
        headerTitle:[
            {
                name:"action",
                label:'操作<img src="static/add.png" style="width:16px;height:16px;margin: -2px 5px 0;vertical-align: middle;cursor: pointer;" data-column-id="addNode"/>',
                align: "center",
                width:'150',
                template:function(obj){
                    return "<a style='display:inline-block;width:50px;height:100%;'><img src='"+addImg+"' title='新增' style='vertical-align: middle;'/></a>"+
                        "<a style='display:inline-block;width:50px;height:100%;'><img src='"+editImg+"' title='编辑' style='vertical-align: middle;'/></a>"+
                        "<a style='display:inline-block;width:50px;height:100%;'><img src='"+deletedImg+"' title='删除' style='vertical-align: middle;'/></a>"
                }
            },
            {
                name:'text',
                label:'工作内容',
                tree:true,
                align: "left",
                width:'250',
            },
            {
                name:'period',
                label:'工期(天)',
                align: "center",
                width:'75',
            },
            {
                name:'start_date',
                label:'开始时间',
                align: "center",
                width:'100',
            },
            {
                name:'end_date',
                label:'结束时间',
                align: "center",
                width:'100',
            },
            {
                name:'stage',
                label:'所属阶段',
                align: "center",
                width:'75',
                template : function(obj){
                    let str = '';
                    that.stageList.forEach((data) => {
                        if(data.value == obj.stage) {
                            str = data.text;
                        }
                    });
                    return str;
                }
            },
            {
                name:'principalText',
                label:'负责人',
                align: "center",
                width:'100',
            },
            {
                name:'profession',
                label:'专业',
                align: "center",
                width:'75',
            },
            {
                name:'isApproval',
                label:'是否审批',
                align: "center",
                width:'75',
                template : function(obj){
                    return obj.isApproval == 1 ? '是':'否'
                }
            },
            {
                name:'isUpload',
                label:'是否上传文件',
                align: "center",
                width:'75',
                template : function(obj){
                    return obj.isUpload == 1 ? '是':'否'
                }
            },
        ]
    }
  },
  created() {
       this._getTasksModel();
  },
  mounted() {
      //gantt.config.drag_links = true;
      this.projectId = this.$route.query.id;
      Bus.$on("task-updated", data => {
          let _$this = this;
          let flag = false;
          this.tasks.data.forEach((item)=>{
              if (item.parent == data.id){
                  flag = true;
              }
          });
          if(data.operationType === 'add') {
              this.dialogVisible = true;
              this.showContent = true;
              this.operationType = "add";
          }else if (data.operationType === 'inserted'){
              this.dialogVisible = true;
              this.showContent = false;
              this.operationType = "inserted";
          }else if (data.operationType === 'updated'){
              this.operationType = "updated";
              if (data.parentId == "0"){
                  this.showContent = true;
              }
          }else if(data.operationType === 'deleted') {
              let message = flag ? "确定删除该节点及以下节点?" : "确定删除该节点?";
              this.$confirm(message ,'提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
              }).then(function() {
                  _$this.delete(data.id);
              }).catch(function() {
              });
          }
      });

      this.getTaskList();
      this.getStageList();
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

    // 工程阶段字典
    getStageList() {
        let type = "GCJD";
        ajax.get('upms/dict/type/'+type).then(rs => {
            if (rs.length > 0) {
                this.stageList = rs;
            }
        });
     },

    // 获取项目任务书下拉框数据
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

    // 改变项目任务书下拉框事件
    onChangeProjectTask(){
        if (this.taskId){
            ajax.get('power/powerprojecttask/getOneById/' + this.taskId).then(rs => {
                if (rs.status === 0){
                    this.powerprojecttaskForm = rs.data;
                    this._getTasksModel();
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

    //选择负责人
    selectedOnchangeHandle(data) {
        this.showUserSelector = false;
        if (data) {
            this.powerprojectplanform.principal = data.id;
            this.powerprojectplanform.principalText = data.name;
        }
    },

    // 项目计划列表
    _getTasksModel() {
        ajax.get('power/powerprojectplan/getPlanTree?taskId='+this.taskId).then(rs => {
            if(rs.status === 0) {
                if(rs.data) {
                    rs.data.forEach((item)=>{
                        item.start_date = item.planStartDate;
                        item.end_date = item.planEndDate;
                        item.open = true;
                    });
                    let obj = {};
                    this.isLoading = true;
                    obj.data = rs.data;
                    this.tasks = obj;
                }
            } else {
                this.$message({
                    message: rs.msg,
                    type: 'error'
                });
            }
        });

    },
    ok(){
        this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
                let newChild = this.powerprojectplanform;
                newChild.text = this.powerprojectplanform.name;
                newChild.start_date = this.powerprojectplanform.planStartDate;
                newChild.end_date = this.powerprojectplanform.planEndDate;
                if(this.operationType === 'add') {
                    // 新增传父级id
                    newChild.parentId = 0;
                    newChild.level = 1;
                } else if (this.operationType === 'inserted'){
                    newChild.parentId = this.formData.id;
                    newChild.level = this.formData.level + 1;
                } else {
                    // 编辑传id
                    newChild.id = this.formData.id
                }
                //newChild.sortNum = this.getSortNum(newChild.parentId);
                this.getNodeProcessing(newChild);
            } else {
                return false;
            }
        });
    },

      // 前端删除和编辑节点时的处理（可以不用调查询接口），增加需调接口
    getNodeProcessing(data,node) {
        if(this.operationType === 'add' || this.operationType === 'inserted') {
            data.id = new Date().getTime()
            this.$message({
                message: '新增成功',
                type: 'success'
            });
            this.dialogVisible = false;
            if(this.operationType === 'add') {
                console.info("111111111",data);
                let dataArr = [];
                dataArr.push(data);
                //this.tasks.data.push(data);
                let obj = {};
                this.isLoading = true;
                obj.data = dataArr;
                obj.links = [];
                this.tasks = obj;
                console.info("2222222",this.tasks);
            } else {
                if (!this.formData.children) {
                    this.$set(this.formData, 'children', []);
                }
                this.formData.children.push(data);
            }
        } else if(this.operationType === 'delete') {
            node.forEach((item,index) => {
                if(item.id === data.id) {
                    node.splice(index, 1);
                } else {
                    if (item.children && item.children.length>0) {
                        this.getNodeProcessing(data,item.children)
                    }
                }
            });
        } else {
            this.$message({
                message: '编辑成功',
                type: 'success'
            });
            this.dialogVisible = false;
            // 弹窗表单修改的字段需要给formData中对应的字段附值
            this.formData.name = data.name;
            this.formData.period = data.period;
            this.formData.profession = data.profession;
            this.formData.stage = data.stage;
            this.formData.isApproval = data.isApproval;
            this.formData.isUpload = data.isUpload;
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


<style>
    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
    }

    .container {
        height: 100%;
        width: 100%;
    }

    .left-container {
        overflow: hidden;
        position: relative;
        height: calc(100% - 32px);
    }

    .right-container {
        border-right: 1px solid #cecece;
        float: right;
        height: 100%;
        width: 300px;
        box-shadow: 0 0 5px 2px #aaa;
        position: relative;
        z-index:2;
    }

    .gantt-messages {
        list-style-type: none;
        height: 50%;
        margin: 0;
        overflow-x: hidden;
        overflow-y: auto;
        padding-left: 5px;
    }

    .gantt-messages > .gantt-message {
        background-color: #f4f4f4;
        box-shadow:inset 5px 0 #d69000;
        font-family: Geneva, Arial, Helvetica, sans-serif;
        font-size: 14px;
        margin: 5px 0;
        padding: 8px 0 8px 10px;
    }

    .gantt-selected-info {
        border-bottom: 1px solid #cecece;
        box-sizing: border-box;
        font-family: Geneva, Arial, Helvetica, sans-serif;
        height: 50%;
        line-height: 28px;
        padding: 10px;
    }

    .gantt-selected-info h2 {
        border-bottom: 1px solid #cecece;
    }

    .select-task-prompt h2{
        color: #d9d9d9;
    }
</style>
