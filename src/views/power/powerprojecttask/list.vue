<template>
  <div class="app-container white-bg list-panel" v-cloak>
    <div class="opertion-box">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="add()" style="margin-right:10px">创建</el-button>
      <el-input v-model="searchParam.codeOrName" placeholder="请输入项目名称或编号" clearable class="zy_input" style="width:190px"></el-input>
      <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
      <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
      <el-button type="primary" icon="el-icon-refresh" size="small" @click="resetList()">重置</el-button>
<!--      <el-button type="primary" icon="el-icon-upload" size="small" @click="exportExcel()">导出</el-button>-->
    </div>
    <!-- 展开更多查询开始 -->
    <el-collapse-transition>
      <div class="search-box" v-show="isShowMore">
        <div class="form-box">
          <organization-select ref="organization" @get_seleted_id="getSeletedId"></organization-select>
          <div class="form-group">
            <label class="control-label">下达人</label>
            <div class="input-group">
              <el-input v-model="searchParam.creater" placeholder="请输入员工姓名或手机号"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">签收人</label>
            <div class="input-group">
              <el-input v-model="searchParam.signer" placeholder="请输入员工姓名或手机号"></el-input>
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
            <label class="control-label">协调部门</label>
            <div class="input-group">
                <el-select v-model="searchParam.coDepartment" multiple filterable default-first-option placeholder="请选择协办部门">
                    <el-option v-for="item in coDepartmentOptions" :key="item.value" :label="item.text" :value="item.value">
                    </el-option>
                </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">相关设计</label>
            <div class="input-group">
                <el-select v-model="searchParam.relatedDesign" multiple filterable default-first-option placeholder="请选择相关设计">
                    <el-option v-for="item in designOptions" :key="item.value" :label="item.text" :value="item.value">
                    </el-option>
                </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">签收状态</label>
            <div class="input-group">
                <el-select v-model="searchParam.signStatus" clearable placeholder="请选择签收状态">
                    <el-option  label="未签收" value="1"></el-option>
                    <el-option  label="已签收" value="2"></el-option>
                </el-select>
            </div>
          </div>
            <div class="form-group">
                <label class="control-label">下达时间</label>
                <div class="input-group">
                    <el-date-picker
                        v-model="createTime"
                        type="daterange"
                        :editable="false"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss "
                        >
                    </el-date-picker>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label">签收时间</label>
                <div class="input-group">
                    <el-date-picker
                        v-model="signTime"
                        type="daterange"
                        :editable="false"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss "
                       >
                    </el-date-picker>
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
            <el-button v-show="showEditBtn" @click="edit(row.id)" type="text" size="small">编辑</el-button>
            <el-button v-show="showEditBtn" @click="showDig(row.id)" type="text" size="small">记录</el-button>
          </template>
        </el-table-column>

          <el-table-column prop="code" sortable show-overflow-tooltip min-width="100" label="项目编号">
              <template slot-scope="scope">
                  <el-button type="text" size="small" @click="toDetail(scope.row)">
                      {{scope.row.code}}
                  </el-button>
              </template>
          </el-table-column>
        <el-table-column prop="name" sortable show-overflow-tooltip min-width="100" label="项目名称"></el-table-column>
        <el-table-column prop="typeText" sortable show-overflow-tooltip min-width="100" label="项目类型"></el-table-column>
        <el-table-column prop="sourceText" sortable show-overflow-tooltip min-width="100" label="任务依据"></el-table-column>
        <el-table-column prop="coDepartmentText" sortable show-overflow-tooltip min-width="100" label="协办部门"></el-table-column>
        <el-table-column prop="relatedDesignText" sortable show-overflow-tooltip min-width="100" label="相关设计"></el-table-column>
        <el-table-column prop="signStatusText" sortable show-overflow-tooltip min-width="100" label="签收状态"></el-table-column>
        <el-table-column prop="manager" sortable show-overflow-tooltip min-width="100" label="项目经理"></el-table-column>
        <el-table-column prop="companyText" sortable show-overflow-tooltip min-width="100" label="所属管理公司"></el-table-column>
        <el-table-column prop="signer" sortable show-overflow-tooltip min-width="100" label="签收人"></el-table-column>
        <el-table-column prop="signTime" sortable show-overflow-tooltip min-width="120" label="签收时间"></el-table-column>
        <el-table-column prop="creater" sortable show-overflow-tooltip min-width="100" label="下达人"></el-table-column>
        <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="120" label="下达时间"></el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="pageSizeSetting" :page-size="pageSize" :layout="pageLayout" :total="listCount">
      </el-pagination>
    </div>
      <el-dialog title="项目任务书更改记录" :visible.sync="dialogVisible" width="60%"  v-cloak>
          <div class="app-container white-bg list-panel">
              <div class="division-line"></div>
              <div class="table-box">
                  <el-table :data="detailList" style="width: 100%">
                      <el-table-column prop="name" sortable show-overflow-tooltip min-width="80" label="修改字段名"></el-table-column>
                      <el-table-column prop="beforeValue" sortable show-overflow-tooltip min-width="80" label="修改前值"></el-table-column>
                      <el-table-column prop="afterValue" sortable show-overflow-tooltip min-width="80" label="修改后值"></el-table-column>
                      <el-table-column prop="updater" sortable show-overflow-tooltip min-width="80" label="修改人"></el-table-column>
                      <el-table-column prop="updateTime" sortable show-overflow-tooltip min-width="80" label="修改时间"></el-table-column>
                  </el-table>
                  <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page=pageList.current  :page-size=pageList.size :total=pageList.total>
                  </el-pagination>
              </div>
          </div>
          <span slot="footer" class="dialog-footer">
    </span>
    </el-dialog>
  </div>
</template>

<script>
import ajax from '@/utils/request'
import { tool } from '@/utils/common'
import OrganizationSelect from '@/components/OrganizationSelect'
export default {
  name: 'PowerProjectTask',
    components: {OrganizationSelect},
    mixins: [tool],
  data() {
    return {
        typeOptions: [],
        designOptions: [],
        ProprietorList: [],
        coDepartmentOptions: [],
        ContactList: [],
        companyList:[],
        userList: [],
        createTime:[],
        signTime:[],
        detailList:[],
        pageList:[],
        isShowMore: false,
        listUrl: "power/powerprojecttask",
        showSearch: false,
        showAddBtn: this.getCurrentUserAuthority("/power/powerprojecttask/save"),
        showEditBtn: this.getCurrentUserAuthority("/power/powerprojecttask/edit"),
        dialogVisible:false,
        pageC :1,
        pageS :10,
        projectTaskId:''
    }
  },
  mounted() {
    this.getList();
      this.getDict();
      this.getProprietor();
      this.getUserList();
      this.getCompanyList();
  },
  methods: {
      getSeletedId(obj) {
          this.searchParam.companyId =obj.id;
      },
      //处理条件查询的时间问题
      getListBefore(params) {
          console.log(66666666666)
          console.log(this.$refs.organization)
          if (this.searchParam.relatedDesign) {
              params.relatedDesign = this.searchParam.relatedDesign.join(',');
          }
          if (this.searchParam.coDepartment) {
              params.coDepartment =  this.searchParam.coDepartment.join(',');
          }
          if (this.createTime) {
              params.createTimeStart = this.createTime[0];
              params.createTimeEnd = this.createTime[1];
          } else {
              params.createTimeStart = '';
              params.createTimeEnd = '';
          }
          if (this.signTime) {
              params.signTimeStart = this.signTime[0];
              params.signTimeEnd = this.signTime[1];
          } else {
              params.signTimeStart = '';
              params.signTimeEnd = '';
          }
      },
      // 获取字典
      getDict() {
          let r = 'FXDJ,XMLX,XGSJ,XBBM';
          ajax.get("upms/dict/allType/"+r).then(rs => {
              this.typeOptions = rs.XMLX;
              this.designOptions = rs.XGSJ
              this.coDepartmentOptions = rs.XBBM;
          });
      },

      //重置筛选
      resetList() {
          this.createTime =[];
          this.signTime =[];
          this.searchParam = {};
          this.handleCurrentChange(1);
      },

      getUserList(){
          ajax.get("power/powerproprietor/getUser").then(rs => {
              this.userList = rs.data;
          });
      },
      //业主列表
      getProprietor(){
          ajax.get("power/powerproprietor/getPowerProprietorList").then(rs => {
              this.ProprietorList = rs.data;
          });
      },

      //查看修改记录
      showDig(projectTaskId){
          this.dialogVisible =true;
          this.projectTaskId = projectTaskId;
          this.pageC  = 1,
          this.pageS  = 10,
          this.getChangeList();
      },

      getChangeList(){
          ajax.get('power/powerprojecttaskchange',{projectTaskId:this.projectTaskId,current:this.pageC,size:this.pageS}).then(rs => {
              this.detailList = rs.records;
              this.pageList =rs;
          });
      },
      //加载业主联系人
      getContact() {
          ajax.get('power/powerproprietorcontact/getContactList/'+ this.powerprojecttaskForm.proprietorId).then(rs => {
              this.ContactList = rs.data;
          });
      },
      //获取公司
      getCompanyList() {
          ajax.get('personnel/personnelattendancegroup/getCompanyList').then(rs => {
              this.companyList = rs.data;
          });
      },


      //切换页容量
      handleSizeChange2(val) {
          this.pageSize = val;
          this.pageC = 1;
          this.getChangeList();
      },
      //翻页
      handleCurrentChange2(val) {
          this.pageC = val;
          this.getChangeList();
      },

  }
}
</script>
