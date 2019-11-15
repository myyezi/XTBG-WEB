<template>
  <div class="form-panel">
    <el-form :model="powerprojecttaskForm" label-position="top" label-width="100px">
      <el-collapse v-model="openCollapse">
        <el-collapse-item title="项目计划" name="1">
          <div class="flex-panel">
            <el-form-item label="项目任务书" prop="taskId">
              <el-select v-model="taskId" placeholder="请选择项目任务书" clearable @change="onChangeProjectTask" :disabled="disabledTaskSelect">
                <el-option v-for="e in projectTaskList" :key="e.id" :label="e.name" :value="e.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目类型">
              <el-input v-model="powerprojecttaskForm.typeText" placeholder="请选择项目类型" clearable :disabled="planDisabled"></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
              <el-input v-model="powerprojecttaskForm.name" placeholder="请输入项目名称" clearable :disabled="planDisabled"></el-input>
            </el-form-item>
            <el-form-item label="项目年份">
              <el-input v-model="powerprojecttaskForm.year" placeholder="请输入项目年份" clearable :disabled="planDisabled"></el-input>
            </el-form-item>
            <el-form-item label="建设单位">
              <el-input v-model="powerprojecttaskForm.proprietorName" placeholder="请输入建设单位" clearable :disabled="planDisabled"></el-input>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-model="powerprojecttaskForm.proprietorContactName" placeholder="请输入联系人" clearable :disabled="planDisabled"></el-input>
            </el-form-item>
            <el-form-item label="归属单位">
              <el-input v-model="powerprojecttaskForm.belongCompanyName" placeholder="请输入归属单位" clearable :disabled="planDisabled"></el-input>
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

            <!-- <el-form-item label="签收人">
                  <el-input v-model="powerprojecttaskForm.signer" placeholder="请输入签收人" clearable :disabled="planDisabled"></el-input>
                </el-form-item> -->
            <el-form-item label="设计规模" class="small">
              <el-input type="textarea" v-model="powerprojecttaskForm.designScale" placeholder="请输入设计规模" clearable :disabled="planDisabled"></el-input>
            </el-form-item>
            <!-- <el-form-item label="设计范围" class="small">
                  <el-input type="textarea" v-model="powerprojecttaskForm.designRange" placeholder="请输入设计范围" clearable :disabled="planDisabled"></el-input>
                </el-form-item> -->
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
            <dragTreeTable class="table-box" :data="treeData" :onDrag="onTreeDataChange" :isdraggable="true" :fixed="true" :isopen="isOpen" :height="600">
            </dragTreeTable>
          </template>
        </el-collapse-item>
      </el-collapse>
      <div class="left-row">
        <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" @click="submitForm(2)">提交</el-button>
        <el-button v-show="showSaveDraftBtn" style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" @click="submitForm(1)">保存草稿</el-button>
        <el-button @click="close">返回</el-button>
      </div>
    </el-form>

    <el-dialog title="项目计划信息" v-dialogDrag :visible.sync="dialogVisible" :before-close="beforeClose" width="35%" top="100px">
      <el-form :model="powerprojectplanform" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="工作内容" prop="name">
          <el-input v-show="!showContent" v-model.trim="powerprojectplanform.name" autocomplete="off" maxlength="50" class="overall_situation_input_icon" clearable show-word-limit></el-input>
          <el-select v-show="showContent" v-model="powerprojectplanform.name" placeholder="请选择工作内容" clearable>
            <el-option v-for="e in contentList" :key="e.value" :label="e.text" :value="e.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属阶段" prop="stage">
          <el-select v-model="powerprojectplanform.stage" placeholder="请选择所属阶段" clearable>
            <el-option v-for="e in stageList" :key="e.value" :label="e.text" :value="e.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工期" prop="period" class="projectplan_period">
          <!--<el-input v-model="powerprojectplanform.period" @change="setEndDate"></el-input>-->
          <el-input-number v-model="powerprojectplanform.period" @change="setEndDate()" :min="1" :step="0.5" label="工期"></el-input-number>
        </el-form-item>
        <el-form-item label="开始时间" prop="planStartDate">
          <el-date-picker v-model="powerprojectplanform.planStartDate" clearable type="date" @change="setEndDate" value-format="yyyy-MM-dd" placeholder="选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="planEndDate">
          <el-date-picker v-model="powerprojectplanform.planEndDate" type="date" value-format="yyyy-MM-dd" placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="负责人" prop="principal">
          <el-input v-model="powerprojectplanform.principalText" placeholder="请选择负责人" readonly clearable>
            <el-button slot="append" icon="el-icon-search" @click="showUserSelector = true"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="专业" prop="profession">
          <!--                  <el-input v-model.trim="powerprojectplanform.profession" autocomplete="off" maxlength="50" class="overall_situation_input_icon" clearable show-word-limit></el-input>-->
          <el-select v-model="powerprojectplanform.profession" placeholder="请选择专业" clearable>
            <el-option v-for="e in professionList" :key="e.value" :label="e.text" :value="e.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否审批" prop="isApproval">
          <el-radio v-model="powerprojectplanform.isApproval" :label="1" @change="changeApproval">是</el-radio>
          <el-radio v-model="powerprojectplanform.isApproval" :label="0" @change="changeApproval">否</el-radio>
        </el-form-item>
        <el-form-item label="是否上传文件" prop="isUpload">
          <el-radio v-model="powerprojectplanform.isUpload" :label="1" @change="changeUpload">是</el-radio>
          <el-radio v-model="powerprojectplanform.isUpload" :label="0" @change="changeUpload">否</el-radio>
        </el-form-item>
        <el-form-item label="是否获取位置" prop="isPosition">
          <el-radio v-model="powerprojectplanform.isPosition" :label="1" @change="changePosition">是</el-radio>
          <el-radio v-model="powerprojectplanform.isPosition" :label="0" @change="changePosition">否</el-radio>
        </el-form-item>
        <el-form-item label="备注" class="remark">
          <el-input type="textarea" v-model="powerprojectplanform.remark" placeholder="请输入备注" clearable maxlength="500" class="overall_situation_input_icon" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 用户选择器 -->
    <UserSelect :isShow="showUserSelector" @selectedOnchange="selectedOnchangeHandle"></UserSelect>
  </div>
</template>

<script>
import ajax from '@/utils/request'
import { tool, ruleTool, formRule } from '@/utils/common'
import Bus from "@/utils/eventBus.js"
import UserSelect from "@/components/UserSelect"
import dragTreeTable from "@/components/treeTable/dragTreeTable.vue";

const addImg = require('@/styles/img/icon-img/add.png')
const editImg = require('@/styles/img/icon-img/edit.png')
const deletedImg = require('@/styles/img/icon-img/deleted.png')
export default {
  mixins: [tool, ruleTool],
  components: { UserSelect, dragTreeTable },
  data() {
    let that = this;
    return {
      expireTimeOption: {
        disabledDate(time) {
          return time.getTime() <= Date.now();
        }
      },
      powerprojecttaskForm: {},
      powerprojectplanform: {
        isApproval: 1,
        isUpload: 1,
        isPosition: 1
      },
      tempplanform: {},
      formData: {
        id: "",
        name: "",
        nameType: "",
        period: null,
        planStartDate: "",
        planEndDate: "",
        profession: "",
        stage: null,
        principal: "",
        isApproval: null,
        isUpload: null,
        isPosition: null
      },

      treeData: {
        columns: [],
        lists: [],
        custom_field: {
          id: 'id',
          lists: 'children',
          parent_id: 'parentId',
          order: 'sortNum',
          is_last: 'isLast'
        }
      },
      titleImg: require('@/styles/img/add.png'),
      isAddFirst: false,
      newList: [],

      openCollapse: ["1", "2"],
      isOpen: false,
      planDisabled: true,
      dialogVisible: false,
      showUserSelector: false,
      projectTaskList: [],
      professionList: [],
      stageList: [],
      contentList: [],
      taskId: "",
      projectId: "",
      disabledTaskSelect: false,
      showContent: "",
      operationType: "",
      dataArr: [],
      idArr: [],
      tempType: "",
      tempArr: [],
      showSaveDraftBtn: false,
      isEdit: false,
      addImg: require('@/styles/img/icon-img/add.png'),
      editImg: require('@/styles/img/icon-img/edit.png'),
      deletedImg: require('@/styles/img/icon-img/deleted.png'),
      rules: {
        name: [
          { required: true, message: '请输入工作内容', trigger: ['change', 'blur'] }
        ],
        period: [
          { required: true, message: '请输入工期', trigger: ['blur'] },
          { validator: formRule.money, message: '工期格式不正确', trigger: 'blur' }
        ],
        planStartDate: [
          { required: true, message: '请选择开始时间', trigger: ['change', 'blur'] }
        ],
        planEndDate: [
          { required: true, message: '请选择结束时间', trigger: ['change', 'blur'] }
        ],
        stage: [
          { required: true, message: '请选择所属阶段', trigger: ['change', 'blur'] }
        ],
        // principal: [
        //   { required: true, message: '请选择负责人', trigger: ['change', 'blur'] }
        // ],
        profession: [
          { required: true, message: '请输入专业', trigger: ['blur', 'blur'] }
        ],
      },
      tasks: {
        data: [],
        links: []
      },
      isLoading: false,
    }
  },
  created() {
    this._getTasksModel();
  },
  mounted() {
    this.initTreeTable();
    if (this.$route.query.id) {
      this.taskId = this.$route.query.id;
      this.onChangeProjectTask();
      this.disabledTaskSelect = true;
    }
    this.getTaskList();
    this.getPlanTreeList();
    this.getDict();


  },
  methods: {
    getPlanTreeList() {
      ajax.get('power/powerprojectplan/getPlanTreeList/' + this.taskId).then(rs => {
        if (rs.status === 0) {
          this.treeData.lists = rs.data;
        } else {
          this.$message({
            message: rs.msg,
            type: 'error'
          });
        }
      });
    },
    initTreeTable() {
      this.treeData.columns = [
        {
          title: "操作",
          type: "action",
          width: 200,
          align: "center",
          img: this.titleImg,
          field: "title",
          onclick: this.onAddFirst,
          actions: [
            {
              text: "新增",
              onclick: this.onAddNode,
              formatter: item => {
                if (item.level > 4) {
                  return "";
                }
                return "<img src='" + this.addImg + "' title='新增' style='margin-right:15px;vertical-align: middle;'/>";
              }
            },
            {
              text: "编辑",
              onclick: this.onEditNode,
              formatter: item => {
                return "<img src='" + this.editImg + "' title='编辑' style='margin-right:15px;vertical-align: middle;'/>";
              }
            },
            {
              text: "删除",
              onclick: this.onDeleteNode,
              formatter: item => {
                return "<img src='" + this.deletedImg + "' title='删除' style='margin-right:15px;vertical-align: middle;'/>";
              }
            },
          ]
        },
        {
          type: "selection",
          title: "工作内容",
          field: "name",
          width: 200,
          align: "left"
        },
        {

          title: "工期(天)",
          field: "period",
          width: 150,
          align: "left"
        },
        {
          title: "开始时间",
          field: "planStartDate",
          width: 100,
          align: "left"
        },
        {
          title: "结束时间",
          field: "planEndDate",
          width: 150,
          align: "center"
        },
        {
          title: "所属阶段",
          field: "stage",
          width: 150,
          align: "center",
          isCutOut:true,
            formatter: item => {
                let str = ''
                this.stageList.forEach((data) => {
                    if(data.value==item.stage) {
                        str = data.text
                    }
                })
                return str
            }
        },
        {
          title: "负责人",
          field: "principalText",
          width: 120,
          align: "center"
        },
        {
          title: "专业",
          field: "professionText",
          width: 100,
          align: "center"
        },
        {
          title: "是否审批",
          field: "isApproval",
          width: 100,
          align: "center",
          isCutOut:true,
          formatter: item => {
            return item.isApproval==1?'是':'否'
          }
        },
        {
          title: "是否上传文件",
          field: "isUpload",
          width: 100,
          align: "center",
          isCutOut:true,
          formatter: item => {
            return item.isUpload==1?'是':'否'
          }
        },
        {
          title: "是否获取位置",
          field: "isPosition",
          width: 100,
          align: "center",
          isCutOut:true,
          formatter: item => {
            return item.isPosition==1?'是':'否'
          }
        },
        {
          title: "当前状态",
          field: "currentStatusText",
          width: 100,
          align: "center"
        }
      ];
    },
    // 增加一级节点
    onAddFirst() {
      this.onAddNode(1);
      this.showContent = true;
    },

    // 增加节点
    onAddNode(data) {
      this.showContent = false;
      this.clearValidate('ruleForm')
      this.powerprojectplanform = {
        isApproval: 1,
        isUpload: 1,
        isPosition: 1
      };
      this.isAddFirst = false;
      if (data === 1) {
        this.isAddFirst = true;
      } else {
        this.formData = data;
      }
      this.dialogVisible = true;

      this.operationType = "add";
    },
    // 编辑节点
    onEditNode(data) {
      if (data.parentId == "0"){
          this.showContent = true;
      }
      this.clearValidate('ruleForm');
      this.formData = data;
      this.operationType = 'edit';
      this.powerprojectplanform = {
          id : data.id,
          name : data.name,
          nameType : data.nameType,
          period : data.period,
          profession : data.profession,
          stage : data.stage,
          isApproval : data.isApproval,
          isUpload : data.isUpload,
          isPosition :data.isPosition,
          planStartDate: data.planStartDate,
          planEndDate: data.planEndDate,
          principal: data.principal,
          principalText: data.principalText
      };
      this.dialogVisible = true;
    },
    // 删除节点
    onDeleteNode(data) {
      let _this = this
      let str = ''
      this.operationType = 'delete'
      if (data.children && data.children.length > 0) {
        str = '该节点下有子节点，会统一删除，确定要删除吗？'
      } else {
        str = '确定要删除该节点吗？'
      }
      this.$confirm(str, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(function () {
        _this.isEdit = true;
        _this.processProjectPlanNode(data, _this.treeData.lists)
      }).catch(function () {
      });
    },
    // 前端删除和编辑节点时的处理（可以不用调查询接口），增加需调接口
    processProjectPlanNode(data, node) {
      if (this.operationType === 'add') {
        data.id = new Date().getTime()
        this.$message({
          message: '新增成功',
          type: 'success'
        });
        this.dialogFormVisible = false;
        if (this.isAddFirst) {
          if(!this.treeData.lists){
            this.$set(this.treeData, 'lists', []);
          }
          this.treeData.lists.push(data);
        } else {
          if (!this.formData.children) {
            this.$set(this.formData, 'children', []);
          }
          data.parentId = this.formData.id;
          this.formData.children.push(data);
        }
      } else if (this.operationType === 'delete') {
        node.forEach((item, index) => {
          if (item.id === data.id) {
            node.splice(index, 1);
          } else {
            if (item.children && item.children.length > 0) {
              this.processProjectPlanNode(data, item.children)
            }
          }
        });
      } else {
        this.$message({
          message: '编辑成功',
          type: 'success'
        });
        this.dialogFormVisible = false;
        // 弹窗表单修改的字段需要给formData中对应的字段附值
        this.formData.name = data.name;
        this.formData.nameType = data.nameType;
        this.formData.period = data.period;
        this.formData.profession = data.profession;
        this.formData.planStartDate = data.planStartDate;
        this.formData.planEndDate = data.planEndDate;
        this.formData.principal = data.principal;
        this.formData.principalText = data.principalText;
        this.formData.stage = data.stage;
        this.formData.isApproval = data.isApproval;
        this.formData.isUpload = data.isUpload;
        this.formData.isPosition = data.isPosition;
        this.formData.professionText = data.professionText;
      }
    },

    // 获取字典
    getDict() {
      let type = 'GCJD,GZNR,ZY';
      ajax.get("upms/dict/allType/" + type).then(rs => {
        this.stageList = rs.GCJD;
        this.contentList = rs.GZNR;
        this.professionList = rs.ZY;
      });
    },
    // 获取项目任务书下拉框数据
    getTaskList() {
      ajax.get('power/powerprojecttask/getTaskSelect/', { taskId: this.taskId }).then(rs => {
        if (rs.status === 0) {
          this.projectTaskList = rs.data;
        } else {
          this.$message({
            message: rs.msg,
            type: 'error'
          });
        }
      });
    },
    onTreeDataChange(list, from, to, where) {
      this.treeData.lists = list;
      this.saveTemplate({
        json: JSON.stringify(this.treeData.lists)
      })
      console.log(this.treeData.lists)
    },
    // 改变项目任务书下拉框事件
    onChangeProjectTask() {
      if (this.taskId) {
        this.$set(this.treeData, 'lists', []);
        // 获取项目任务书对象
        ajax.get('power/powerprojecttask/getOneById/' + this.taskId).then(rs => {
          if (rs.status === 0) {
            this.powerprojecttaskForm = rs.data;
            this.projectId = rs.data.projectId;
            this._getTasksModel();
          } else {
            this.$message({
              message: rs.msg,
              type: 'error'
            });
          }
        });
      } else {
        this.powerprojecttaskForm = [];
      }
    },
    // list:更新后的数据源
    // from: 当前被拖拽的行
    // to: 目标拖拽行
    // where: 拖拽的类型，top（上面）、center（里面）、bottom（下面）
    onTreeDataChange(list, from, to, where) {
        this.treeData.lists = list;
        this.isEdit = true;
    },
    changeOpen() {
      // this._getTasksModel();
      if (this.tasks.data && this.tasks.data.length > 0) {
        let dataArr = []
        let obj = {
          data: [],
          links: []
        };
        this.tasks.data.forEach((item) => {
          item.$open = this.isOpen
          item.open = this.isOpen;
          dataArr.push(item)
        });
        obj.data = dataArr
        this.tasks = obj
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
      if (this.taskId) {
        ajax.get('power/powerprojectplan/getPlanTreeList/' + this.taskId).then(rs => {
          if (rs.status === 0) {
            if (rs.data) {
              if (rs.data.length > 0) {
                this.projectId = rs.data[0].projectId;
                this.isLoading = true;
                this.treeData.lists = rs.data;
                this.tempType = "edit";
                this.showSaveDraftBtn = false;
              } else {
                // 根据项目类型复制模板数据到项目计划
                if (this.powerprojecttaskForm.type) {
                  ajax.post('power/powerprojectplan/copyToPlan/', {
                    projectType: this.powerprojecttaskForm.type,
                    taskId: this.taskId,
                  }).then(rs => {
                    if (rs.status === 0) {
                      if (rs.data) {
                        this.projectId = rs.data[0].projectId;
                        this.isLoading = true;
                        this.treeData.lists = rs.data;
                        this.tempType = "edit";
                        this.showSaveDraftBtn = false;
                      } else {
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
      } else {
        let obj = {};
        this.isLoading = true;
        obj.data = [];
        this.tasks = obj;
      }
    },
    beforeClose() {
      this.clearValidate('ruleForm');
      this.dialogVisible = false;
    },

    // 清楚弹窗内容以及警告信息
    clearValidate(formName) {
      this.powerprojectplanform = {};
      if (this.$refs[formName]) {
        this.$refs[formName].clearValidate();
      }
    },

    setEndDate() {
      if (this.powerprojectplanform.planStartDate && this.powerprojectplanform.period) {
        let sDate = new Date(this.powerprojectplanform.planStartDate).getTime();
        sDate = sDate + 1000 * 60 * 60 * 24 * this.powerprojectplanform.period; //加减相差毫秒数
        let eDate = new Date(sDate);
        let preYear = eDate.getFullYear();
        let preMonth = eDate.getMonth() + 1;
        let preDay = eDate.getDate() - 1;
        preMonth = (preMonth < 10) ? ("0" + preMonth) : preMonth;
        preDay = (preDay < 10) ? ("0" + preDay) : preDay;
        let ed = preYear + "-" + preMonth + "-" + preDay;
        // alert(ed)
        this.$set(this.powerprojectplanform, 'planEndDate', ed);
      }
    },

    changeApproval() {
      if (this.powerprojectplanform.isApproval == 0) {
        this.powerprojectplanform.isUpload = 0;
      }
    },
    changeUpload() {
      if (this.powerprojectplanform.isUpload == 1) {
        this.powerprojectplanform.isApproval = 1;
      }
    },
    changePosition() {
      if (this.templateConfigForm.isPosition == 1) {
        this.templateConfigForm.isPosition = 1;
      }
    },

    // 弹框“确定”操作
    sure() {
      let that =  this;
      that.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let newChild = that.powerprojectplanform;
          newChild.text = that.powerprojectplanform.name;
          if (that.operationType === 'add') {
            that.isEdit = true;
            newChild.parent = 0;
            newChild.parentId = 0;
            newChild.level = 1;
            newChild.stage = that.powerprojectplanform.stage;
            newChild.principalText = that.powerprojectplanform.principalText;
            for (let i = 0; i < that.professionList.length; i++) {
              if (that.professionList[i].value == that.powerprojectplanform.profession) {
                that.powerprojectplanform.professionText = that.professionList[i].text;
                break;
              }
            }

            that.contentList.forEach((item) => {
              if (item.text == that.powerprojectplanform.name) {
                newChild.nameType = item.value;
              }
            });
            newChild.isApproval = that.powerprojectplanform.isApproval;
            newChild.isUpload = that.powerprojectplanform.isUpload;
            newChild.isPosition = that.powerprojectplanform.isPosition;
            newChild.sortNum = that.getSortNum(newChild.parentId);
          } else if (that.operationType === 'inserted') {
            that.isEdit = true;
            newChild.parent = that.formData.id;
            newChild.parentId = that.formData.id;
            that.dataArr.forEach((item) => {
              if (item.id == that.formData.id) {
                newChild.nameType = item.nameType;
                newChild.level = item.level + 1;
              }
            });
            newChild.sortNum = that.getSortNum(newChild.parentId);
          } else {
            that.checkPlanNodeChange(that.treeData.lists);
          }
          that.processProjectPlanNode(newChild);
          that.dialogVisible = false;
        } else {
          return false;
        }
      });
    },
    checkPlanNodeChange(treeDataList){
      let that =  this;
      if (treeDataList && treeDataList.length > 0) {
          treeDataList.forEach((item) => {
            if (item.id === that.powerprojectplanform.id) {
              // 编辑操作，先删除，判断对象的值是否发生变化
              if (item.name != that.powerprojectplanform.name ||
                item.period != that.powerprojectplanform.period ||
                item.planStartDate != that.powerprojectplanform.planStartDate ||
                item.planEndDate != that.powerprojectplanform.planEndDate ||
                item.stage != that.powerprojectplanform.stage ||
                item.principal != that.powerprojectplanform.principal ||
                item.profession != that.powerprojectplanform.profession ||
                item.isApproval != that.powerprojectplanform.isApproval ||
                item.isUpload != that.powerprojectplanform.isUpload ||
                item.isPosition != that.powerprojectplanform.isPosition) {
                that.isEdit = true;
                return;
              }
            }else if(item.children){
                that.checkPlanNodeChange(item.children)
            }
          });
        }
    },
    cancel() {
      this.dialogVisible = false;
      this.clearValidate('ruleForm');
    },

    //获取序号
    getSortNum(parentId) {
      if (this.dataArr.length == 0) {
        return 1;
      }
      let arr = [];
      this.dataArr.forEach((item) => {
        if (item.parentId == parentId) {
          arr.push(item.sortNum ? item.sortNum : 0);
        }
      });
      if (arr.length == 0) {
        return 1;
      }
      arr.sort(function (a, b) {
        return a - b;
      });
      let maxSortNum = arr[arr.length - 1];
      return maxSortNum + 1;
    },
    //保存
    submitForm(projectStatus) {
      if (!this.taskId || this.treeData.lists.length == 0) {
        this.$message.error('请制定项目计划信息！');
        return;
      }
     
      if (this.isEdit) {
        this.newList = [];
        this.getNewList(this.treeData.lists);
        ajax.post('power/powerprojectplan', {
          projectStatus: projectStatus,
          tempType: this.tempType,
          taskId: this.taskId,
          projectId: this.projectId,
          treeDataList: this.newList
        }).then(rs => {
          if (rs.status == 0) {
            this.$message.success(rs.msg);
            this._getTasksModel();
          } else {
            this.$message.error(rs.msg);
          }
        });
      } else {
        // 未做任何修改，只修改暂存状态为“进行中”
        ajax.post('power/powerproject/operate', { projectId: this.projectId, projectStatus: 2 }).then(rs => {
          if (rs.status == 0) {
            this.$message.success(rs.msg);
            this._getTasksModel();
          } else {
            this.$message.error(rs.msg);
          }
        });
      }

    },
    getNewList(list) {
      list.forEach((item) => {
        this.newList.push(item);
        if (item.children && item.children.length > 0) {
          this.getNewList(item.children);
        }
      });
    },

  },
}
</script>


<style lang="scss">
html,
body {
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
  z-index: 2;
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
  box-shadow: inset 5px 0 #d69000;
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

.select-task-prompt h2 {
  color: #d9d9d9;
}
.projectplan_period {
  .el-input__inner {
    height: 40px;
    line-height: 40px;
  }
}
</style>
