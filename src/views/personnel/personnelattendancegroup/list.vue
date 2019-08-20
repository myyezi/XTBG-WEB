<template>
  <div class="app-container white-bg list-panel" v-cloak>
    <div class="opertion-box">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="add()" style="margin-right:10px">创建</el-button>
      <el-input v-model="searchParam.zy_input" placeholder="请输入员工姓名或手机号" clearable class="zy_input" style="width:190px"></el-input>
      <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
      <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
      <el-button type="primary" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">重置</el-button>
    </div>
    <!-- 展开更多查询开始 -->
    <el-collapse-transition>
      <div class="search-box" v-show="isShowMore">
        <div class="form-box">
          <div class="form-group">
            <label class="control-label">管理公司</label>
            <div class="input-group">
                    <el-select v-model="searchParam.companyId" filterable clearable placeholder="请选择管理公司">
                        <el-option
                            v-for="item in companyList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">规则名称</label>
            <div class="input-group">
              <el-input v-model="searchParam.name" placeholder="请输入规则名称"></el-input>
            </div>
          </div>
        </div>
      </div>
    </el-collapse-transition>
    <div class="division-line"></div>
    <div class="table-box">
      <el-table :data="list" style="width: 100%">
        <el-table-column fixed label="操作" width="260">
          <template fixed slot-scope="{ row, column, $index }">
            <el-button v-show="showEditBtn" @click="edit(row.id)" type="text" size="small">编辑</el-button>
            <el-button v-show="showDelBtn" @click="delGroup(row)" type="text" size="small">删除</el-button>
            <el-button v-show="showAddBtn" @click="setGroup(row)" type="text" size="small">考勤对象设置</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" sortable show-overflow-tooltip min-width="100" label="规则名称"></el-table-column>
          <el-table-column  label="组成员" width="260">
          <template  slot-scope="{ row, column, $index }">
              <el-button @click="look(row)" type="text" size="small">查看</el-button>
          </template>
          </el-table-column>
        <el-table-column prop="companyName" sortable show-overflow-tooltip min-width="100" label="所属管理公司"></el-table-column>
        <el-table-column prop="creater" sortable show-overflow-tooltip min-width="100" label="创建人"></el-table-column>
          <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="100" label="创建时间"></el-table-column>
        <el-table-column prop="updater" sortable show-overflow-tooltip min-width="100" label="更新人"></el-table-column>
        <el-table-column prop="updateTime" sortable show-overflow-tooltip min-width="100" label="更新时间"></el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="pageSizeSetting" :page-size="pageSize" :layout="pageLayout" :total="listCount">
      </el-pagination>
    </div>
      <el-dialog title="考勤对象设置" :visible.sync="dialogVisible" width="800px"  v-cloak>
          <el-tabs  type="card" @tab-click="handleClick" v-model="activeName" v-if="dialogVisible">
              <!-- <el-tab-pane label="组织" name="first" >
                  <tree-one url="upms/organization/tree" ref="one"></tree-one>
              </el-tab-pane> -->
              <el-tab-pane label="用户" name="second">  
                <tree-two :url= "`upms/organization/treeNode/${this.companyId}`" ref="two" :selectionAll="selectionAll"></tree-two>
              </el-tab-pane>
              <div style="text-align: center;">
                  <el-button type="primary" @click="submitForm()">保存</el-button>
                  <el-button @click="close">返回</el-button>
              </div>
          </el-tabs>
      </el-dialog>

      <el-dialog title="查看考勤组成员" :visible.sync="dialogFormVisible" width="200"  >
          <div class="app-container white-bg list-panel">
              <div class="division-line"></div>
              <div class="table-box">
                  <el-table :data="memberList" style="width: 100%"   :height="300">
                      <el-table-column prop="name" sortable show-overflow-tooltip min-width="80" label="姓名"></el-table-column>
                      <el-table-column prop="phone" sortable show-overflow-tooltip min-width="80" label="联系方式"></el-table-column>
                      <el-table-column prop="email" sortable show-overflow-tooltip min-width="80" label="邮箱"></el-table-column>
                  </el-table>
              </div>
          </div>
      </el-dialog>
  </div>
</template>

<script>
import ajax from '@/utils/request'
import { tool } from '@/utils/common'
import TreeOne from './compent/tree1.vue'
import TreeTwo from './compent/tree2.vue'
export default {
  name: 'PersonnelAttendanceGroup',
  mixins: [tool],
  components: {TreeOne,TreeTwo},
  data() {
    return {
      companyList:[],
        memberForm:[],
      testList:[],
      isShowMore: false,
      listUrl: "personnel/personnelattendancegroup",
      showSearch: false,
      showAddBtn: this.getCurrentUserAuthority("/personnel/personnelattendancegroup/save"),
      showEditBtn: this.getCurrentUserAuthority("/personnel/personnelattendancegroup/edit"),
      showDelBtn: this.getCurrentUserAuthority("/personnel/personnelattendancegroup/del"),
      member:'查看',
      dialogVisible:false,
      defaultProps: {
          isLeaf: 'leaf',
          children: 'children',
          label: 'name'
      },
      activeName:'second',
      selectData:[],
      saveData:[],
      attendanceGroupId:'',
      organizationList:{},
      selectionAll:[],
      companyId:'',
      groupUserListByCompany:[],
      dialogFormVisible:false,
      memberList:[]
    }
  },
  mounted() {
    this.getList();
    this.getCompanyList();
    this.getTest();
  },
  methods: {
      //获取公司
      getCompanyList() {
          ajax.get('personnel/personnelattendancegroup/getCompanyList').then(rs => {
              this.companyList = rs.data;
          });
      },
      handleClick(tab, event) {
          console.log(tab.name)
          this.activeName = tab.name
      },
      //获取公司
      getTest() {
          ajax.get('upms/organization/tree').then(rs => {
              this.testList = rs.data;
          });
      },
      //关闭窗口
      close(){
          this.dialogVisible =false;
      },
      //删除
      delGroup(row) {
          this.$confirm('是否确认删除 ?').then(_ => {
              ajax.delete("personnel/personnelattendancegroup/" + row.id).then((result) => {
                  if (this.checkResponse(result)) {
                      this.showMessage('删除成功', 'success');
                      this.getList();
                  }
              })
          }).catch(_ => {
              console.info("关闭");
          });
      },
      //设置考情组
      setGroup(row) {
          this.saveData=[],
          this.dialogVisible =true;
          this.attendanceGroupId=row.id
          this.companyId = row.companyId
          this.params =  row.id;
          this.getOrganizationList();
          this.getOrganizationUserList();
         // this.getGroupUserListBycompany();
      },

      //查看
      look(row){
          this.memberList =[];
          this.dialogFormVisible = true ;
          this.attendanceGroupId = row.id;
          ajax.get('personnel/personnelattendancegroupuser/getList/' + this.attendanceGroupId).then(rs => {
              this.memberList = rs;
          });
      },
      getOrganizationList(){
          ajax.get('personnel/personnelattendancegrouporganization/getList/' + this.attendanceGroupId).then(rs => {
              this.organizationList =rs;
          });
      },

      //已经设置考情的人员回显
      getOrganizationUserList(){
          ajax.get('personnel/personnelattendancegroupuser/getList/' + this.attendanceGroupId).then(rs => {
              this.selectionAll = rs;
              console.log(this.selectionAll)
          });
      },

      //查询该公司所有加入考勤人员
      getGroupUserListBycompany(){
          ajax.get('personnel/personnelattendancegroupuser/getListByCompanyId/' + this.companyId).then(rs => {
              this.groupUserListByCompany = rs;
          });
      },

      //提交保存设置
      submitForm(){
          //部门设置
          if(this.activeName=='first'){
              //处理只添加部门设置
              this.selectData = this.$refs.one.selectData
              for (let i = 0; i < this.selectData.length; i++) {
                  if(this.selectData[i].type=='30'){
                    this.save={};
                    this.save.attendanceGroupId = this.attendanceGroupId
                    this.save.organizationId=this.selectData[i].id
                    this.saveData.push(this.save)
                  }
              }
              ajax.post('personnel/personnelattendancegrouporganization', this.saveData).then(rs => {
                  if (rs.status == 0) {
                      this.$message.success(rs.msg);
                      this.dialogVisible =false;
                      this.getList();
                  } else {
                      this.$message
                          .error(rs.msg);
                  }
              });
          }else{
              this.$refs.two.changePageCoreRecordData();
              //处理只添加部门设置
              this.selectData = this.$refs.two.idKeyArr
              console.log( this.selectData )
              this.saveData =[];
              for (let i = 0; i < this.selectData.length; i++) {
                      this.save={};
                      this.save.attendanceGroupId = this.attendanceGroupId
                      this.save.userId=this.selectData[i]
                      this.saveData.push(this.save)
              }
              ajax.post('personnel/personnelattendancegroupuser', this.saveData).then(rs => {
                  if (rs.status == 0) {
                      this.$message.success(rs.msg);
                      this.dialogVisible =false;
                      this.getList();
                  } else {
                      this.$message
                          .error(rs.msg);
                      this.$refs.two.changePageCoreRecordData();
                  }
              });
          }
      }
  }
}
</script>
