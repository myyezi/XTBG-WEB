<template>
  <div class="app-container white-bg list-panel" v-cloak>
    <div class="opertion-box">
        <el-input v-model="searchParam.keyWord" placeholder="请输入项目名称或编号" clearable class="zy_input" style="width:190px"></el-input>
        <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
      <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
      <el-button type="primary" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">重置</el-button>
      <el-button type="primary" icon="el-icon-refresh" size="small" @click="stopUploadShow = true">测试</el-button>
    </div>
    <!-- 展开更多查询开始 -->
    <el-collapse-transition>
      <div class="search-box" v-show="isShowMore">
        <div class="form-box">

          <div class="form-group">
            <label class="control-label">组织</label>
            <div class="input-group">
              <el-input v-model="searchParam.projectId" placeholder="请输入项目id"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">项目类型</label>
            <div class="input-group">
                <el-select v-model="searchParam.type" clearable placeholder="请选择项目类型">
                    <el-option v-for="item in typeOptions" :key="item.value" :label="item.text" :value="item.value">
                    </el-option>
                </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">设计阶段</label>
            <div class="input-group">
                <el-select v-model="searchParam.type" clearable placeholder="请选择项目类型">
                    <el-option v-for="item in gcjdOptions" :key="item.value" :label="item.text" :value="item.value">
                    </el-option>
                </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">任务依据</label>
            <div class="input-group">
                <el-select v-model="searchParam.source" clearable placeholder="请选择任务依据">
                    <el-option  label="委托书" value="1"></el-option>
                    <el-option  label="招标书" value="2"></el-option>
                    <el-option  label="电话委托" value="3"></el-option>
                    <el-option  label="其他" value="4"></el-option>
                </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">项目状态</label>
            <div class="input-group">
                <el-select v-model="searchParam.source" clearable placeholder="请选择项目状态">
                    <el-option  label="进行中" value="1"></el-option>
                    <el-option  label="已暂停" value="2"></el-option>
                </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">协办部门</label>
            <div class="input-group">
                <el-select v-model="searchParam.type" clearable placeholder="请选择协办部门">
                 <el-option v-for="item in coDepartmentOptions" :key="item.value" :label="item.text" :value="item.value">
                </el-option>
            </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">项目经理</label>
            <div class="input-group">
              <el-input v-model="searchParam.principal" placeholder="请输入负责人"></el-input>
            </div>
          </div>
        </div>
      </div>
    </el-collapse-transition>
    <div class="division-line"></div>
    <div class="table-box">
      <el-table :data="list" style="width: 100%">
        <el-table-column fixed label="操作" width="120">
          <template fixed slot-scope="{ row, column, $index }">
            <el-button v-show="showStartBtn" v-if="row.projectStatus==3" @click="edit(row.id)" type="text" size="small">开启</el-button>
            <el-button v-show="showProgressBtn" v-if="row.projectStatus==2" @click="edit(row.id)" type="text" size="small">执行</el-button>
            <el-button v-show="showStopBtn"  v-if="row.projectStatus==2" @click="stop(row)" type="text" size="small">申请延期</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="code" sortable show-overflow-tooltip min-width="100" label="项目编号"></el-table-column>
        <el-table-column prop="name" sortable show-overflow-tooltip min-width="100" label="项目名称"></el-table-column>
        <el-table-column prop="typeText" sortable show-overflow-tooltip min-width="100" label="项目类型"></el-table-column>
        <el-table-column prop="sourceText" sortable show-overflow-tooltip min-width="100" label="任务依据"></el-table-column>
        <el-table-column prop="coDepartmentText" sortable show-overflow-tooltip min-width="100" label="协办部门"></el-table-column>
        <el-table-column prop="managerName" sortable show-overflow-tooltip min-width="100" label="项目经理"></el-table-column>
        <el-table-column prop="projectStatusText" sortable show-overflow-tooltip min-width="100" label="项目状态"></el-table-column>
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
      <el-dialog title="断点上传" :visible.sync="stopUploadShow" :class="{'dialog_animation_in':dialogFormVisible,'dialog_animation_out':!dialogFormVisible}" width="80">
          <stop-upload></stop-upload>
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
      stopUploadShow:false,
      extDate:'',
      isShowMore: false,
      listUrl: "power/powerproject",
      showSearch: false,
      showStartBtn: this.getCurrentUserAuthority("/power/powerprojectprogress/start"),
      showStopBtn: this.getCurrentUserAuthority("/power/powerprojectprogress/stop"),
      showProgressBtn: this.getCurrentUserAuthority("/power/powerprojectprogress/progress"),
      typeOptions:[],
      coDepartmentOptions:[],
      gcjdOptions:[],
      dialogFormVisible:false,
      extensionForm:{},
      saveForm:{},
      rules: {
            name: [
                { required: true, message: '请输入文件名称', trigger: 'blur' },
                { min: 0, max: 100, message: '长度在 100个字符内', trigger: 'blur' }
            ],
        },
    }
  },
  mounted() {
      this.getList();
      this.getDict();
  },
  methods: {
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
          data.reason =this.extensionForm.reason;
          data.extDate =this.extensionForm.extDate
          data.projectId =  this.saveForm.id
          data.approver= this.saveForm.manager
          ajax.post('power/powerprojectextension', data).then(rs => {
              if (rs.status == 0) {
                  this.$message
                      .success(rs.msg);
                  this.close();
              } else {
                  this.$message
                      .error(rs.msg);
              }
          });
      }
  }
}
</script>
