<template>
  <div class="detail-panel project_task_count">
    <el-collapse v-model="openCollapse">
      <el-collapse-item title="项目任务书" name="1">
        <div class="flex-panel detail-box">
          <div class="detail-item">
            <label class="control-label">项目编号</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.code}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">项目名称</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.name}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">项目类型</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.typeText}}</span>
            </div>
          </div>
          <div class="detail-item ">
            <label class="control-label">建设单位</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.proprietorText}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">任务依据</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.sourceText}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">相关设计</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.relatedDesignText}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">协办部门</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.coDepartmentText}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">联系人</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.proprietorContactText}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">项目经理</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.managerName}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">下达人</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.creater}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">下达时间</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.createTime}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">签收人</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.signerName}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">签收时间</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.signTime}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">项目开始时间</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.startTime}}</span>
            </div>
          </div>
          <div class="detail-item">
            <label class="control-label">项目结束时间</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.endTime}}</span>
            </div>
          </div>
          <div class="detail-item big">
            <label class="control-label">设计规模</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.designScale}}</span>
            </div>
          </div>
          <div class="detail-item big">
            <label class="control-label">设计规范</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.designRange}}</span>
            </div>
          </div>
          <div class="detail-item big">
            <label class="control-label">设计进度要求</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.progress}}</span>
            </div>
          </div>
          <div class="detail-item big">
            <label class="control-label">备注</label>
            <div class="input-group">
              <span>{{powerprojecttaskForm.remark}}</span>
            </div>
          </div>
        </div>
      </el-collapse-item>

        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="计划信息" name="projectPlanInfoTab" >
                    <template>
                        <div class="app-container white-bg list-panel" v-cloak style="height: calc(100vh - 120px);padding:10px">
                            <div class="container clearfix">
                                <gantt-add
                                    ref="gantt"
                                    class="left-container"
                                    v-if="isLoading"
                                    :tasks="tasks"
                                    :headerTitle="headerTitle" style="height: 500px">
                                </gantt-add>
                            </div>
                        </div>
                    </template>

            </el-tab-pane>
            <el-tab-pane label="收资信息" name="projectSzInfoTab">
                <el-table border :data="achmentList" style="width: 100%">
                    <el-table-column prop="name" sortable show-overflow-tooltip min-width="200" label="收资名称"></el-table-column>
                    <el-table-column prop="creater" sortable show-overflow-tooltip min-width="100" label="上传人"></el-table-column>
                    <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="100" label="上传时间"></el-table-column>
                    <el-table-column prop="projectName" sortable show-overflow-tooltip min-width="100" label="审核人"></el-table-column>
                    <el-table-column prop="projectType" sortable show-overflow-tooltip min-width="100" label="审核时间"></el-table-column>
                    <el-table-column prop="description" sortable show-overflow-tooltip min-width="100" label="操作">
                        <template fixed slot-scope="{ row, column, $index }">
                            <el-button  @click="download(row)" type="text" size="small">下载</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="卷册信息" name="projectJcInfoTab">
                <el-table border :data="achmentList" style="width: 100%">
                    <el-table-column prop="name" sortable show-overflow-tooltip min-width="200" label="卷册名称"></el-table-column>
                    <el-table-column prop="creater" sortable show-overflow-tooltip min-width="100" label="上传人"></el-table-column>
                    <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="100" label="上传时间"></el-table-column>
                    <el-table-column prop="projectName" sortable show-overflow-tooltip min-width="100" label="审核人"></el-table-column>
                    <el-table-column prop="projectType" sortable show-overflow-tooltip min-width="100" label="审核时间"></el-table-column>
                    <el-table-column prop="description" sortable show-overflow-tooltip min-width="100" label="操作">
                        <template fixed slot-scope="{ row, column, $index }">
                            <el-button  @click="download(row)" type="text" size="small">下载</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="成品信息" name="projectCpInfoTab">
                <el-table border :data="achmentList" style="width: 100%">
                    <el-table-column prop="name" sortable show-overflow-tooltip min-width="200" label="成品名称"></el-table-column>
                    <el-table-column prop="creater" sortable show-overflow-tooltip min-width="100" label="上传人"></el-table-column>
                    <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="100" label="上传时间"></el-table-column>
                    <el-table-column prop="projectName" sortable show-overflow-tooltip min-width="100" label="审核人"></el-table-column>
                    <el-table-column prop="projectType" sortable show-overflow-tooltip min-width="100" label="审核时间"></el-table-column>
                    <el-table-column prop="description" sortable show-overflow-tooltip min-width="100" label="操作">
                        <template fixed slot-scope="{ row, column, $index }">
                            <el-button  @click="download(row)" type="text" size="small">下载</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="项目任务书" name="projectTaskInfoTab">
                <el-table border :data="attachmentTaskList" style="width: 100%">
                    <el-table-column prop="name" sortable show-overflow-tooltip min-width="200" label="任务书名称"></el-table-column>
                    <el-table-column prop="creater" sortable show-overflow-tooltip min-width="100" label="上传人"></el-table-column>
                    <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="100" label="上传时间"></el-table-column>
                    <el-table-column prop="description" sortable show-overflow-tooltip min-width="100" label="操作">
                        <template fixed slot-scope="{ row, column, $index }">
                            <el-button  @click="download(row)" type="text" size="small">下载</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="项目成员" name="projectMemberInfoTab">
                <el-table border :data="memberList" style="width: 100%">
                    <el-table-column prop="name" sortable show-overflow-tooltip min-width="100" label="成员名称"></el-table-column>
                    <el-table-column prop="account" sortable show-overflow-tooltip min-width="100" label="手机号"></el-table-column>
                    <el-table-column prop="profession" sortable show-overflow-tooltip min-width="300" label="专业"></el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </el-collapse>
  </div>

</template>

<script>
import ajax from '@/utils/request'
import { tool } from '@/utils/common'
import GanttAdd from '@/components/Gannt/add'
import '@/components/dhtmlx-gantt'
import "@/components/dhtmlx-gantt/codebase/locale/locale_cn"

export default {
  name: "PowerProjectTaskDetail",
  mixins: [tool],
  components: {GanttAdd},
  data() {
    let that = this;
    return {
      newCarForm: {},
      activeName: 'projectPlanInfoTab',
      openCollapse: ["1"],//默认打开的面板
      powerprojecttaskForm:[],
      attachmentTaskList:[],
      stageList:[],
      achmentList:[],
      memberList:[],
      isLoading: true,
        tasks: {
            data: [],
            links: []
        },
        headerTitle:[
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
        ],
        taskId:''
    }
  },
  mounted() {
     ajax.get('power/powerprojecttask/' + this.$route.params.id).then(rs => {
      this.powerprojecttaskForm = rs.data;
    });
      this._getTasksModel();
      this.getStageList();
  },
  methods: {
      handleClick(tab, event) {
          console.log(tab, event);
          if(tab.name == 'projectMemberInfoTab') {
              this.getMemberList()
          } else if (tab.name == 'projectSzInfoTab') {
              this.getProjectAttachmentList(1)
          } else if(tab.name == 'projectJcInfoTab') {
              this.getProjectAttachmentList(2)
          }else if(tab.name == 'projectCpInfoTab') {
              this.getProjectAttachmentList(4)
          }else if(tab.name =='projectTaskInfoTab'){
              this.getAttachmentList();
          }
      },

      // 项目计划列表
      _getTasksModel() {
          this.taskId =this.$route.params.id;
          if(this.taskId){
              ajax.get('power/powerprojectplan/getPlanTree?taskId='+this.taskId).then(rs => {
                  if(rs.status === 0) {
                      if(rs.data) {
                          if (rs.data.length > 0){
                              rs.data.forEach((item)=>{
                                  item.start_date = item.planStartDate;
                                  item.end_date = item.planEndDate;
                                  item.text = item.name;
                                  item.parent = item.parentId;
                                  item.open = true;
                              });
                              let obj = {};
                              this.isLoading = true;
                              obj.data = rs.data;
                              this.tasks = obj;
                              this.dataArr = rs.data;
                              this.tempType = "edit";
                              this.showSaveDraftBtn = false;
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
      // 工程阶段字典
      getStageList() {
          let type = "GCJD";
          ajax.get('upms/dict/type/'+type).then(rs => {
              if (rs.length > 0) {
                  this.stageList = rs;
              }
          });
      },
      getMemberList() {
          ajax.get('power/powerprojecttask/getProjectMemberList/'+ this.$route.params.id).then(rs => {
              this.memberList = rs.data
          });
      },
      getProjectAttachmentList(type){
          ajax.get('power/powerprojecttask/getProjectAttachmentList?taskId='+ this.$route.params.id+"&type="+type).then(rs => {
              this.achmentList = rs.data
          });
      },
      getAttachmentList(){
          ajax.get('power/powerprojectattachment/getAttachmentList/'+this.$route.params.id).then(rs => {
              this.attachmentTaskList =rs.data;
          });
      },

      download(data){
          //下载
              let fileName = data.name;
              let filePath = data.path;
              let param = "fileName=" + fileName + "&" + "filePath=" +filePath;
              location.href = encodeURI(this.exportUrl("file/download/downloadFile?" + param));
      }
  },

}
</script>
<style lang="scss">
  .project_task_count {
    .el-tabs__nav {
        margin-left: 20px;
    }
    .el-tabs__item {
        border-radius: 15px;
        margin: 13px 0;
    }
  }
</style>
