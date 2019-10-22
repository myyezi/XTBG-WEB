<template>
  <div class="app-container white-bg list-panel" v-cloak>
    <div class="opertion-box">
        <el-input v-model="searchParam.keyWord" placeholder="请输入项目名称或编号" clearable class="zy_input" style="width:190px"></el-input>
        <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
      <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
      <el-button type="primary" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">重置</el-button>
<!--      <el-button type="primary" icon="el-icon-refresh" size="small" @click="stopUploadShow = true">测试</el-button>-->
    </div>
    <!-- 展开更多查询开始 -->
    <el-collapse-transition>
      <div class="search-box" v-show="isShowMore">
        <div class="form-box">

          <div class="form-group">
            <label class="control-label">项目类型</label>
            <div class="input-group">
                <el-select v-model="searchParam.projectType" clearable placeholder="请选择项目类型">
                    <el-option v-for="item in typeOptions" :key="item.value" :label="item.text" :value="item.value">
                    </el-option>
                </el-select>
            </div>
          </div>
<!--          <div class="form-group">-->
<!--            <label class="control-label">设计阶段</label>-->
<!--            <div class="input-group">-->
<!--                <el-select v-model="searchParam.stage" clearable placeholder="请选择设计阶段">-->
<!--                    <el-option v-for="item in gcjdOptions" :key="item.value" :label="item.text" :value="item.value">-->
<!--                    </el-option>-->
<!--                </el-select>-->
<!--            </div>-->
<!--          </div>-->
          <div class="form-group">
            <label class="control-label">任务依据</label>
            <div class="input-group">
                <el-select v-model="searchParam.source" clearable placeholder="请选择任务依据">
                    <el-option  label="委托书" value="1"></el-option>
                    <el-option  label="招标书" value="2"></el-option>
                    <el-option  label="电话委托" value="3"></el-option>
                    <el-option  label="中标通知书" value="4"></el-option>
                    <el-option  label="合同" value="5"></el-option>
                    <el-option  label="其他" value="6"></el-option>
                </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">项目状态</label>
            <div class="input-group">
                <el-select v-model="searchParam.projectStatus" placeholder="请选择项目状态" clearable>
                    <el-option  label="暂存" :value="1"></el-option>
                    <el-option  label="进行中" :value="2"></el-option>
                    <el-option  label="已暂停" :value="3"></el-option>
                    <el-option  label="已完成" :value="4"></el-option>
                </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">协办部门</label>
            <div class="input-group">
                <el-select v-model="searchParam.coDepartment" clearable placeholder="请选择协办部门">
                 <el-option v-for="item in coDepartmentOptions" :key="item.value" :label="item.text" :value="item.value">
                </el-option>
            </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">项目经理</label>
            <div class="input-group">
              <el-input v-model="searchParam.manager" placeholder="请输入项目经理" clearable></el-input>
            </div>
          </div>
        </div>
      </div>
    </el-collapse-transition>
    <div class="division-line"></div>
    <div class="table-box">
      <el-table :data="list" style="width: 100%">
        <el-table-column fixed label="操作" width="180">
          <template fixed slot-scope="{ row, column, $index }">
            <el-button v-show="showStartBtn" v-if="row.projectStatus==3" @click="operate(row.id)" type="text" size="small">开启</el-button>
            <el-button v-show="showProgressBtn" v-if="row.projectStatus==2 && row.isExtension==0" @click="edit(row.taskId)" type="text" size="small">执行</el-button>
            <el-button v-show="showExtensionBtn"  v-if="row.projectStatus==2 && row.isExtension==0" @click="stop(row)" type="text" size="small">申请延期</el-button>
            <!--<el-button v-show="showExtensionHisBtn" @click="getExtensionHis(row)" type="text" size="small">延期记录</el-button>-->
            <el-button @click="getExtensionHis(row)" type="text" size="small">延期记录</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="code" sortable shonpm w-overflow-tooltip min-width="100" label="项目编号"></el-table-column>
        <el-table-column prop="name" sortable show-overflow-tooltip min-width="180" label="项目名称"></el-table-column>
        <el-table-column prop="typeText" sortable show-overflow-tooltip min-width="100" label="项目类型"></el-table-column>
        <el-table-column prop="managerName" sortable show-overflow-tooltip min-width="100" label="项目经理"></el-table-column>
        <el-table-column prop="startTime" sortable show-overflow-tooltip min-width="80" label="开始时间"></el-table-column>
        <el-table-column prop="endTime" sortable show-overflow-tooltip min-width="80" label="结束时间"></el-table-column>
        <el-table-column prop="projectStatusText" sortable show-overflow-tooltip min-width="80" label="项目状态"></el-table-column>
        <el-table-column prop="approvalStatusText" sortable show-overflow-tooltip min-width="80" label="延期审批状态"></el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="pageSizeSetting" :page-size="pageSize" :layout="pageLayout" :total="listCount">
      </el-pagination>
    </div>
      <el-dialog title="项目延期" :visible.sync="dialogFormVisible" :class="{'dialog_animation_in':dialogFormVisible,'dialog_animation_out':!dialogFormVisible}" width="80">
          <el-form :model="extensionForm" :rules="rules" ref="ruleForm" label-width="100px">
              <el-form-item label="延期日期" prop="extDate">
                  <el-date-picker
                      v-model="extensionForm.extDate"
                      type="date"
                      placeholder="选择延期日期" >
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="延期原因" prop="reason">
                  <el-input type="textarea" class="overall_situation_input" v-model="extensionForm.reason" maxlength=200 show-word-limit  autocomplete="off" ></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="cancel">确 定</el-button>
          </div>
      </el-dialog>
      <el-dialog title="断点上传" :visible.sync="stopUploadShow" :class="{'dialog_animation_in':dialogFormVisible,'dialog_animation_out':!dialogFormVisible}" width="800px">
          <stop-upload></stop-upload>
      </el-dialog>

      <el-dialog width="1200px" :visible.sync="showExtensionHisDialogVisible" :append-to-body="true">
          <el-table ref="multipleTable" :data="showExtensionHisList" tooltip-effect="dark" style="width: 100%">
              <el-table-column prop="extDate" sortable show-overflow-tooltip min-width="100" label="延期日期"></el-table-column>
              <el-table-column prop="reason" sortable show-overflow-tooltip min-width="100" label="延期原因"></el-table-column>
              <el-table-column prop="creater" sortable show-overflow-tooltip min-width="100" label="申请人"></el-table-column>
              <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="100" label="申请时间"></el-table-column>
              <el-table-column prop="approvalStatusText" sortable show-overflow-tooltip min-width="100" label="审批状态"></el-table-column>
              <el-table-column prop="approver" sortable show-overflow-tooltip min-width="100" label="审批人"></el-table-column>
              <el-table-column prop="approvalReason" sortable show-overflow-tooltip min-width="100" label="审批原因"></el-table-column>
              <el-table-column prop="approvalTime" sortable show-overflow-tooltip min-width="100" label="审批时间"></el-table-column>
          </el-table>
      </el-dialog>
  </div>
</template>

<script>
import ajax from '@/utils/request'
import { tool } from '@/utils/common'
import StopUpload from '@/components/StopUpload/index'

export default {
  name: 'PowerProjectPlan',
  mixins: [tool],
  components: {StopUpload},
  data() {
    return {
      searchParam: {
      },
      stopUploadShow:false,
        showExtensionHisDialogVisible: false,
        showExtensionHisList: [],
      extDate:'',
      isShowMore: false,
      listUrl: "power/powerproject",
      showSearch: false,
      showStartBtn: this.getCurrentUserAuthority("/power/powerprojectprogress/start"),
      showExtensionBtn: this.getCurrentUserAuthority("/power/powerprojectprogress/extension"),
      showExtensionHisBtn: this.getCurrentUserAuthority("/power/powerprojectprogress/showExtensionHis"),
      showProgressBtn: this.getCurrentUserAuthority("/power/powerprojectprogress/progress"),
      typeOptions:[],
      coDepartmentOptions:[],
      gcjdOptions:[],
      dialogFormVisible:false,
      extensionForm:{},
      saveForm:{},
      rules: {
            reason: [
                { required: true, message: '请输入延期原因', trigger: 'blur' }
            ],
        },
    }
  },
  mounted() {
      this.getList();
      this.getDict();
  },
  methods: {

      getExtensionHis(row) {
          this.showExtensionHisDialogVisible = true
          ajax.get('power/powerprojectextension?projectId='+ row.id).then(rs => {
              this.showExtensionHisList = rs.records;
          });
      },

      getListBefore(params) {
          params.initStatus = 1;
      },
      // 获取字典
      getDict() {
          let r = 'XMLX,GCJD,XBBM';
          ajax.get("upms/dict/allType/"+r).then(rs => {
              this.typeOptions = rs.XMLX;
              this.gcjdOptions = rs.GCJD
              this.coDepartmentOptions = rs.XBBM;
          });
      },
      stop(row){
          this.extDate='';
          this.extensionForm ={},
          this.saveForm=row
          this.dialogFormVisible =true
      },
      //确定
      cancel(){
          var data = {};
          this.$refs['ruleForm'].validate((valid) => {
              if (valid) {
                  data.reason =this.extensionForm.reason;
                  data.extDate =this.extensionForm.extDate;
                  data.projectId =  this.saveForm.id;
                  data.taskId = this.saveForm.taskId;
                  data.approver= this.saveForm.manager;
                  ajax.post('power/powerprojectextension', data).then(rs => {
                      if (rs.status == 0) {
                          this.dialogFormVisible = false;
                          this.$message.success(rs.msg);
                          this.getList();
                      } else {
                          this.$message.error(rs.msg);
                      }
                  });
              } else {
                  return false;
              }
          });
      },
      // 开启项目
      operate(projectId){
          let that = this;
          this.$confirm("确定开启该项目?" ,'提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
          }).then(function() {
              ajax.post('power/powerproject/operate',{projectId : projectId, projectStatus : 2}).then(rs => {
                  if (rs.status == 0) {
                      that.getList();
                      that.$message.success(rs.msg);
                  } else {
                      that.$message.error(rs.msg);
                  }
              });
          }).catch(function() {
          });
      }

  }
}
</script>
