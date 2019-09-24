<template>
  <div class="form-panel">
    <el-form :model="powerprojecttaskForm" label-position="top" label-width="100px">
      <el-collapse v-model="openCollapse">
        <el-collapse-item title="项目计划" name="1">
            <div class="flex-panel">
                <el-form-item label="项目任务书" prop="taskId">
                    <el-select v-model="taskId" placeholder="请选择项目任务书" clearable @change="onChangeProjectTask" :disabled="disabledTaskSelect">
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
              <el-radio-group v-model="isOpen" style="padding:10px 0px 10px;">
                  <el-radio :label="false" @change="changeOpen">收起</el-radio>
                  <el-radio :label="true" @change="changeOpen">展开</el-radio>
              </el-radio-group>
              <template>
                  <div class="app-container white-bg" v-cloak style="padding:10px">
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
        <el-button type="primary" @click="submitForm(2)">提交</el-button>
        <el-button v-show="showSaveDraftBtn" type="primary" @click="submitForm(1)">保存草稿</el-button>
        <el-button @click="close">返回</el-button>
      </div>
    </el-form>

    <el-dialog title="项目计划信息" :visible.sync="dialogVisible" :before-close="beforeClose" width="35%">
          <el-form :model="powerprojectplanform" :rules="rules" ref="ruleForm" label-width="120px">
              <el-form-item label="工作内容" prop="name">
                  <el-input v-show="!showContent" v-model.trim="powerprojectplanform.name" autocomplete="off" maxlength="50" class="overall_situation_input_icon" clearable show-word-limit></el-input>
                  <el-select v-show="showContent" v-model="powerprojectplanform.name" placeholder="请选择工作内容" clearable>
                      <el-option v-for="e in contentList"  :key="e.value" :label="e.text" :value="e.text" ></el-option >
                  </el-select>
              </el-form-item>
              <el-form-item label="所属阶段" prop="stage">
                  <el-select v-model="powerprojectplanform.stage" placeholder="请选择所属阶段" clearable>
                      <el-option v-for="e in stageList"  :key="e.value" :label="e.text" :value="e.value" ></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="工期" prop="period">
                  <!--<el-input v-model="powerprojectplanform.period" @change="setEndDate"></el-input>-->
                  <el-input-number v-model="powerprojectplanform.period" @change="setEndDate()" :min="1" :step="0.5" label="工期"></el-input-number>
              </el-form-item>
              <el-form-item label="开始时间" prop="planStartDate">
                  <el-date-picker
                      v-model="powerprojectplanform.planStartDate"
                      clearable
                      type="date"
                      :picker-options="expireTimeOption"
                      @change="setEndDate"
                      value-format="yyyy-MM-dd"
                      placeholder="选择开始时间">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间" prop="planEndDate">
                  <el-date-picker
                      v-model="powerprojectplanform.planEndDate"
                      disabled
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择结束时间">
                  </el-date-picker>
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
                  <el-radio v-model="powerprojectplanform.isApproval" :label="1" @change="changeApproval">是</el-radio>
                  <el-radio v-model="powerprojectplanform.isApproval" :label="0" @change="changeApproval">否</el-radio>
              </el-form-item>
              <el-form-item label="是否上传文件" prop="isUpload">
                  <el-radio v-model="powerprojectplanform.isUpload" :label="1" @change="changeUpload">是</el-radio>
                  <el-radio v-model="powerprojectplanform.isUpload" :label="0" @change="changeUpload">否</el-radio>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="ok">确 定</el-button>
          </div>
    </el-dialog>
    <!-- 用户选择器 -->
    <UserSelect :isShow="showUserSelector" @selectedOnchange="selectedOnchangeHandle"></UserSelect>
  </div>
</template>

<script>
import ajax from '@/utils/request'
import { tool, ruleTool ,formRule} from '@/utils/common'
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
        expireTimeOption:{
            disabledDate(time){
                return time.getTime() <= Date.now();
            }
        },
        powerprojecttaskForm : {},
        powerprojectplanform : {
            isApproval : 1,
            isUpload : 1,
        },
        tempplanform : {},
        formData : {
            id : "",
            name : "",
            nameType : "",
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
        isOpen : true,
        planDisabled : true,
        dialogVisible : false,
        showUserSelector : false,
        projectTaskList : [],
        stageList : [],
        contentList : [],
        taskId : "",
        projectId : "",
        disabledTaskSelect : false,
        showContent : "",
        operationType : "",
        dataArr : [],
        idArr : [],
        tempType : "",
        tempArr : [],
        showSaveDraftBtn : false,
        isEdit : false,
        rules: {
            name: [
                { required: true, message: '请输入工作内容', trigger: ['change','blur'] }
            ],
            period: [
                { required: true, message: '请输入工期', trigger: ['blur'] },
                { validator: formRule.money, message: '工期格式不正确', trigger: 'blur' }
            ],
            planStartDate: [
                { required: true, message: '请选择开始时间', trigger: ['change','blur'] }
            ],
            planEndDate: [
                { required: true, message: '请选择结束时间', trigger: ['change','blur'] }
            ],
            stage: [
                { required: true, message: '请选择所属阶段', trigger: ['change','blur'] }
            ],
            principal: [
                { required: true, message: '请选择负责人', trigger: ['change','blur'] }
            ],
            profession: [
                { required: true, message: '请输入专业', trigger: ['blur','blur'] }
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
                width:'120',
                template:function(obj){
                    let str = "";
                    let addStr = "<a style='display:inline-block;width:40px;height:100%;'><img src='"+addImg+"' title='新增' style='vertical-align: middle;'/></a>";
                    let updateStr = "<a style='display:inline-block;width:40px;height:100%;'><img src='"+editImg+"' title='编辑' style='vertical-align: middle;'/></a>"
                    let delStr = "<a style='display:inline-block;width:40px;height:100%;'><img src='"+deletedImg+"' title='删除' style='vertical-align: middle;'/></a>"
                    if (obj.currentStatus != 4 && obj.currentStatus != 6){
                        str = addStr + updateStr + delStr;
                    }else{
                        str = addStr
                    }
                    return str;
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
                template:function(obj){
                    if (!obj.principal){
                        return ""
                    }else {
                        return obj.principalText
                    }
                }
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
            {
                name:'currentStatusText',
                label:'当前状态',
                align: "center",
                width:'75',
                template : function(obj){
                    let str = "";
                    switch(obj.currentStatus) {
                        case 1:
                            str = "未开始";
                            break;
                        case 2:
                            str = "进行中";
                            break;
                        case 3:
                            str = "延期";
                            break;
                        case 4:
                            str = "待审核";
                            break;
                        case 5:
                            str = "不合格";
                            break;
                        case 6:
                            str = "已完成";
                            break;
                        default:
                            str = "";
                    }
                    return str;
                }
            },
        ]
    }
  },
  created() {
       this._getTasksModel();
  },
  mounted() {
      if (this.$route.query.id){
          this.taskId = this.$route.query.id;
          this.onChangeProjectTask();
          this.disabledTaskSelect = true;
      }
      Bus.$on("task-updated", data => {
          let _$this = this;
          let flag = false;
          this.tasks.data.forEach((item)=>{
              if (item.parent && item.parent == data.id){
                  flag = true;
              }
          });
          this.clearValidate('ruleForm');
          if(data.operationType === 'add') {
              this.powerprojectplanform = {
                  isApproval : 1,
                  isUpload : 1
              };
              this.dialogVisible = true;
              this.showContent = true;
              this.operationType = "add";
          }else if (data.operationType === 'inserted'){
              this.powerprojectplanform = {
                  isApproval : 1,
                  isUpload : 1
              };
              this.dialogVisible = true;
              this.showContent = false;
              this.formData.id = data.id;
              this.operationType = "inserted";
          }else if (data.operationType === 'updated'){
              this.operationType = "updated";
              if (this.tasks.data && this.tasks.data.length > 0){
                  this.tasks.data.forEach((item) => {
                      if(data.id == item.id) {
                          this.powerprojectplanform = item;
                          // 解除双向绑定，保留原始对象值
                          this.tempplanform = JSON.parse(JSON.stringify(item));
                      }
                  });
              }
              if (this.powerprojectplanform.parent == "0"){
                  this.showContent = true;
              }else{
                  this.showContent = false;
              }
              this.dialogVisible = true;
          }else if(data.operationType === 'deleted') {
              this.operationType = "deleted";
              let message = flag ? "确定删除该节点及以下节点?" : "确定删除该节点?";
              this.$confirm(message ,'提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
              }).then(function() {
                  _$this.getNodeProcessing(data,_$this.dataArr);
              }).catch(function() {
              });
          }
      });

      this.getTaskList();
      this.getDict();
  },
  methods: {

      // 获取字典
      getDict() {
          let type = 'GCJD,GZNR';
          ajax.get("upms/dict/allType/"+type).then(rs => {
              this.stageList = rs.GCJD;
              this.contentList = rs.GZNR;
          });
      },

    // 获取项目任务书下拉框数据
    getTaskList(){
        ajax.get('power/powerprojecttask/getTaskSelect/' ,{taskId : this.taskId}).then(rs => {
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
            // 获取项目任务书对象
            ajax.get('power/powerprojecttask/getOneById/' + this.taskId).then(rs => {
                if (rs.status === 0){
                    this.powerprojecttaskForm = rs.data;
                    this.projectId = rs.data.projectId;
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
    changeOpen(){
        this._getTasksModel();
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
        if(this.taskId){
            ajax.get('power/powerprojectplan/getPlanTree?taskId='+this.taskId).then(rs => {
                if(rs.status === 0) {
                    if(rs.data) {
                        if (rs.data.length > 0){
                            this.projectId = rs.data[0].projectId;
                            rs.data.forEach((item)=>{
                                item.start_date = item.planStartDate;
                                item.end_date = item.planEndDate;
                                item.text = item.name;
                                item.parent = item.parentId;
                                item.open = this.isOpen;
                            });
                            let obj = {};
                            this.isLoading = true;
                            obj.data = rs.data;
                            this.tasks = obj;
                            this.dataArr = rs.data;
                            this.tempType = "edit";
                            this.showSaveDraftBtn = false;
                        }else{
                            // 根据项目类型复制模板数据到项目计划
                            if (this.powerprojecttaskForm.type){
                                ajax.post('power/powerprojectplan/copyToPlan/',{
                                    projectType : this.powerprojecttaskForm.type,
                                    taskId : this.taskId,
                                }).then(rs => {
                                    if(rs.status === 0) {
                                        if(rs.data) {
                                            this.projectId = rs.data[0].projectId;
                                            rs.data.forEach((item)=>{
                                                item.start_date = item.planStartDate ? item.planStartDate : "";
                                                item.end_date = item.planEndDate ? item.planEndDate : "";
                                                item.text = item.name;
                                                item.parent = item.parentId;
                                                item.open = this.isOpen;
                                            });
                                            let obj = {};
                                            this.isLoading = true;
                                            obj.data = rs.data;
                                            this.tasks = obj;
                                            this.dataArr = rs.data;
                                            this.tempType = "edit";
                                            this.showSaveDraftBtn = false;
                                        }else{
                                            let obj = {};
                                            this.isLoading = true;
                                            obj.data = [];
                                            this.tasks = obj;
                                            this.tempType = "add";
                                            this.showSaveDraftBtn = true;
                                        }
                                    }
                                });
                            }
                        }
                    }
                } else {
                    this.$message({
                        message: rs.msg,
                        type: 'error'
                    });
                }
            });
        }else{
            let obj = {};
            this.isLoading = true;
            obj.data = [];
            this.tasks = obj;
        }
    },
    beforeClose(){
        this.clearValidate('ruleForm');
        this.dialogVisible = false;
    },

      // 清楚弹窗内容以及警告信息
    clearValidate(formName) {
        this.powerprojectplanform = {};
        if(this.$refs[formName]) {
            this.$refs[formName].clearValidate();
        }
    },

    setEndDate(){
        if (this.powerprojectplanform.planStartDate && this.powerprojectplanform.period){
            let sDate = new Date(this.powerprojectplanform.planStartDate).getTime();
            sDate = sDate + 1000*60*60*24*this.powerprojectplanform.period; //加减相差毫秒数
            let eDate = new Date(sDate);
            let preYear = eDate.getFullYear();
            let preMonth = eDate.getMonth() + 1;
            let preDay = eDate.getDate() - 1;
            preMonth = (preMonth < 10) ? ("0" + preMonth) :preMonth;
            preDay = (preDay < 10) ? ("0" + preDay) :preDay;
            let ed = preYear + "-" +  preMonth + "-" + preDay;
            this.$set(this.powerprojectplanform, 'planEndDate', ed);
        }
    },

    changeApproval(){
        if (this.powerprojectplanform.isApproval == 0){
          this.powerprojectplanform.isUpload = 0;
        }
    },
    changeUpload(){
        if (this.powerprojectplanform.isUpload == 1){
          this.powerprojectplanform.isApproval = 1;
        }
    },

    // 弹框“确定”操作
    ok(){
        this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
                let newChild = this.powerprojectplanform;
                newChild.text = this.powerprojectplanform.name;
                newChild.start_date = this.powerprojectplanform.planStartDate;
                newChild.end_date = this.powerprojectplanform.planEndDate;
                if(this.operationType === 'add') {
                    this.isEdit = true;
                    newChild.parent = 0;
                    newChild.parentId = 0;
                    newChild.level = 1;
                    this.contentList.forEach((item) => {
                        if (item.text == this.powerprojectplanform.name){
                            newChild.nameType = item.value;
                        }
                    });
                    newChild.sortNum = this.getSortNum(newChild.parentId);
                } else if (this.operationType === 'inserted'){
                    this.isEdit = true;
                    newChild.parent = this.formData.id;
                    newChild.parentId = this.formData.id;
                    this.dataArr.forEach((item) => {
                        if (item.id == this.formData.id){
                            newChild.nameType = item.nameType;
                            newChild.level = item.level + 1;
                        }
                    });
                    newChild.sortNum = this.getSortNum(newChild.parentId);
                } else {
                    if (this.tasks.data && this.tasks.data.length > 0){
                        this.dataArr.forEach((item) => {
                            if(item.id === this.powerprojectplanform.id) {
                                // 编辑操作，先删除，判断对象的值是否发生变化
                                if (this.tempplanform.name != this.powerprojectplanform.name ||
                                    this.tempplanform.period != this.powerprojectplanform.period ||
                                    this.tempplanform.planStartDate != this.powerprojectplanform.planStartDate ||
                                    this.tempplanform.planEndDate != this.powerprojectplanform.planEndDate ||
                                    this.tempplanform.stage != this.powerprojectplanform.stage ||
                                    this.tempplanform.principal != this.powerprojectplanform.principal ||
                                    this.tempplanform.profession != this.powerprojectplanform.profession ||
                                    this.tempplanform.isApproval != this.powerprojectplanform.isApproval ||
                                    this.tempplanform.isUpload != this.powerprojectplanform.isUpload){
                                    item.name = this.powerprojectplanform.name;
                                    item.period = this.powerprojectplanform.period;
                                    item.planStartDate = this.powerprojectplanform.planStartDate;
                                    item.planEndDate = this.powerprojectplanform.planEndDate;
                                    item.stage = this.powerprojectplanform.stage;
                                    item.principal = this.powerprojectplanform.principal;
                                    item.profession = this.powerprojectplanform.profession;
                                    item.isApproval = this.powerprojectplanform.isApproval;
                                    item.isUpload = this.powerprojectplanform.isUpload;

                                    this.isEdit = true;
                                    // this.dataArr.splice(index, 1);
                                }
                            }
                        });
                    }
                }
                this.getNodeProcessing(newChild);
            } else {
                return false;
            }
        });
    },
    cancel(){
        this.dialogVisible = false;
        this.clearValidate('ruleForm');
    },

    //获取序号
    getSortNum(parentId){
        if (this.dataArr.length == 0){
            return 1;
        }
        let arr = [];
        this.dataArr.forEach((item) => {
          if (item.parentId == parentId){
              arr.push(item.sortNum ? item.sortNum : 0);
          }
        });
        if (arr.length == 0){
          return 1;
        }
        arr.sort(function (a, b) {
          return a-b;
        });
        let maxSortNum = arr[arr.length - 1];
        return maxSortNum + 1;
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
            this.dataArr.push(data);
            let obj = {};
            this.isLoading = true;
            obj.data = this.dataArr;
            this.tasks = obj;
        } else if(this.operationType === 'deleted') {
            this.isEdit = true;
            if (node && node.length > 0){
                node.forEach((item, index) => {
                    if(item && item.id == data.id) {
                        node.splice(index, 1, null);
                    } else {
                        if (item && item.parent && item.parent == data.id) {
                            this.getNodeProcessing(item, node);
                        }
                    }
                });
            }
            let newArray = [];
            this.dataArr.forEach((item) => {
                if (item){
                    newArray.push(item)
                }
            });
            this.dataArr = newArray;
            let obj = {};
            this.isLoading = true;
            obj.data = this.dataArr;
            this.tasks = obj;
        } else {
            this.$message({
                message: '编辑成功',
                type: 'success'
            });
            this.dialogVisible = false;
            //this.dataArr.push(data);
            let obj = {};
            this.isLoading = true;
            obj.data = this.dataArr;
            this.tasks = obj;
        }
    },
      //保存
    submitForm(projectStatus) {
        if (!this.taskId || this.tasks.data.length == 0){
            this.$message.error('数据无效，请检查！');
            return;
        }
        if (this.isEdit){
            let newList = [];
            let obj = {};
            this.tasks.data.forEach((item) => {
                obj = item;
                newList.push(obj);
            });
            ajax.post('power/powerprojectplan', {
                projectStatus : projectStatus,
                tempType : this.tempType,
                taskId : this.taskId,
                projectId : this.projectId,
                treeDataList : newList
            }).then(rs => {
                if (rs.status == 0) {
                    this.$message.success(rs.msg);
                    this._getTasksModel();
                } else {
                    this.$message.error(rs.msg);
                }
            });
        }else{
            // 未做任何修改，只修改暂存状态为“进行中”
            ajax.post('power/powerproject/operate',{projectId : this.projectId, projectStatus : 2}).then(rs => {
                if (rs.status == 0) {
                    this.$message.success(rs.msg);
                    this._getTasksModel();
                } else {
                    this.$message.error(rs.msg);
                }
            });
        }

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
