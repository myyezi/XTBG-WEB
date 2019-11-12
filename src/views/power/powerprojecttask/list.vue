<template>
  <div class="app-container white-bg list-panel" v-cloak>
    <div class="opertion-box">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="add()" style="margin-right:10px">创建</el-button>
      <el-input v-model="searchParam.codeOrName" placeholder="请输入项目名称或编号" clearable class="zy_input" style="width:190px"></el-input>
      <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
      <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
      <el-button type="primary" icon="el-icon-refresh" size="small" @click="resetList()">重置</el-button>
     <el-button type="primary" icon="el-icon-s-operation" size="small" @click="swtichData()">切换</el-button>
    </div>
    <!-- 展开更多查询开始 -->
    <el-collapse-transition>
      <div class="search-box" v-show="isShowMore">
        <div class="form-box">
          <!--<organization-select ref="organization" @get_seleted_id="getSeletedId"></organization-select>-->
          <div class="form-group">
            <label class="control-label">下达人</label>
            <div class="input-group">
              <el-input v-model="searchParam.creater" placeholder="请输入员工姓名或手机号" clearable></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">签收人</label>
            <div class="input-group">
              <el-input v-model="searchParam.signer" placeholder="请输入员工姓名或手机号" clearable></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">项目类型</label>
            <div class="input-group">
                <el-select v-model="searchParam.type" clearable placeholder="请选择项目类型" @change="chickProjectType(searchParam.type)">
                    <el-option v-for="item in typeOptions" :key="item.value" :label="item.text" :value="item.value" >
                    </el-option>
                </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">项目年份</label>
            <div class="input-group">
                <el-date-picker
                  v-model="searchParam.year"
                  type="year"
                  value-format="yyyy"
                  placeholder="请选择项目年份">
                </el-date-picker>
            </div>
          </div>
          <div class="form-group">
                  <label class="control-label">地区</label>
                  <div class="input-group">
                          <city-select-panel :value.sync="citySelectArr" ref="citySelect" @change="citySelectOnchange"></city-select-panel>
                  </div>
              </div>
          <div class="form-group">
            <label class="control-label">归属单位</label>
            <div class="input-group">
                <el-select v-model="searchParam.belongCompany"  filterable clearable placeholder="请选择归属单位" >
                    <el-option
                        v-for="item in belongCompanyList"
                         :key="item.value" :label="item.text" :value="item.value" >
                    </el-option>
                </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">任务依据</label>
            <div class="input-group">
                <el-select v-model="searchParam.source"  placeholder="请选择任务依据">
                    <el-option v-for="item in sourceOptions" :key="item.value" :label="item.text" :value="item.value">
                    </el-option>
                </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">协办部门</label>
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
    <div class="table-box" v-show="!tableShow">
      <el-table :data="list" style="width: 100%">
        <el-table-column fixed label="操作" width="120">
          <template fixed slot-scope="{ row, column, $index }">
            <el-button v-show="showEditBtn" @click="edit(row.id)" type="text" size="small">编辑</el-button>
            <el-button v-show="showEditBtn" @click="showDig(row.id)" type="text" size="small">记录</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="code" sortable show-overflow-tooltip min-width="80" label="项目编号">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="toDetail(scope.row)">
                    {{scope.row.code}}
                </el-button>
            </template>
        </el-table-column>
        <el-table-column prop="name" sortable show-overflow-tooltip min-width="180" label="项目名称"></el-table-column>
        <el-table-column prop="typeText" sortable show-overflow-tooltip min-width="80" label="项目类型"></el-table-column>
        <el-table-column prop="year" sortable show-overflow-tooltip min-width="60" label="项目年份"></el-table-column>
        <el-table-column prop="manager" sortable show-overflow-tooltip min-width="80" label="项目经理"></el-table-column>
        <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="120" label="下达时间"></el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="pageSizeSetting" :page-size="pageSize" :layout="pageLayout" :total="listCount">
      </el-pagination>
    </div>
    <div class="table-box" v-show="tableShow">
      <ul class="project_table_statistics clearfix">
        <li v-for="(item,index) in list" :key="index" class="clearfix">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <p>
                        <img :src="imgList[0]" alt="" v-if="item.typeText=='配电'">
                        <img :src="imgList[1]" alt="" v-else-if="item.typeText=='配网'">
                        <img :src="imgList[2]" alt="" v-else-if="item.typeText=='输电'">
                        <img :src="imgList[3]" alt="" v-else-if="item.typeText=='变电'">
                        <img :src="imgList[4]" alt="" v-else-if="item.typeText=='配电'">
                        <img :src="imgList[5]" alt="" v-else>
                    </p>
                    <p>
                        <span>{{item.name}}</span>
                        <span>{{item.code}}</span>
                    </p>
                </div>
                <div>
                    <div class="text">{{'年份： ' +  item.year}}</div>
                    <div class="text">{{'类型： ' + item.typeText}}</div>
                    <div class="text">项目经理：  {{item.manager?item.manager:''}}</div>
                    <div style="text-align: right;">
                        <el-button size="small" round @click="edit(item.id)">编辑</el-button>
                        <el-button size="small" round @click="showDig(item.id)">记录</el-button>
                    </div>
                </div>
            </el-card>
        </li>
    </ul>
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
import CitySelectPanel from '@/components/CitySelect/index2'
import OrganizationSelect from '@/components/OrganizationSelect'
export default {
  name: 'PowerProjectTask',
    components: {CitySelectPanel, OrganizationSelect},
    mixins: [tool],
  data() {
    return {
        tableShow:true,
        imgList:[require('@/styles/img/zodiac/peidian.png'),require('@/styles/img/zodiac/peiwang.png'),require('@/styles/img/zodiac/shudian.png'),require('@/styles/img/zodiac/biandian.png'),require('@/styles/img/zodiac/xitongguihua.png'),require('@/styles/img/zodiac/qita.png')],
        typeOptions: [],
        designOptions: [],
        ProprietorList: [],
        coDepartmentOptions: [],
        sourceOptions:[],
        ContactList: [],
        companyList:[],
        userList: [],
        belongCompanyList:[],
        createTime:[],
        signTime:[],
        detailList:[],
        pageList:[],
        isShowMore: false,
        citySelectArr:[],
        listUrl: "power/powerprojecttask",
        showSearch: false,
        showAddBtn: this.getCurrentUserAuthority("/power/powerprojecttask/save"),
        showEditBtn: this.getCurrentUserAuthority("/power/powerprojecttask/edit"),
        dialogVisible:false,
        pageC :1,
        pageS :10,
        pageSize:20,
        page:1,
        projectTaskId:''
    }
  },
  mounted() {
    this.getList();
      this.getDict();
      this.getProprietor();
      this.getUserList();
      window.addEventListener('scroll', this.scrollDs, true)
  },
  methods: {
    scrollDs() {
        let div = document.getElementsByClassName('app-main');
        let clientHeight = div[0].clientHeight
        let scrollHeight = div[0].scrollHeight
        let scrollTop = div[0].scrollTop
        if (scrollTop + clientHeight >=scrollHeight) {
            div[0].scrollTop = div[0].scrollTop-5;
            console.log('到底了')
        }
        
    },
      swtichData() {
          this.tableShow = !this.tableShow
      },
      /*getSeletedId(obj) {
          this.searchParam.companyId =obj.id;
      },*/
      //处理条件查询的时间问题
      getListBefore(params) {
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
      citySelectOnchange(){
          this.searchParam.province = "";
          this.searchParam.city = "";
          this.searchParam.district = "";
          if(this.citySelectArr.length>0){
            this.searchParam.province = this.citySelectArr[0];
            if(this.citySelectArr.length>1){
                this.searchParam.city = this.citySelectArr[1];
            }
            if(this.citySelectArr.length>2){
                this.searchParam.district = this.citySelectArr[2];
            }
          }
          
      },
      // 获取字典
      getDict() {
          let r = 'XMLX,XBBM,RWYJ,GSDW';
          ajax.get("upms/dict/allType/"+r).then(rs => {
              this.typeOptions = rs.XMLX;
              this.coDepartmentOptions = rs.XBBM;
              this.sourceOptions = rs.RWYJ;
              this.belongCompanyList = rs.GSDW;
          });
      },

      test(){
        alert(888)
      },
      //重置筛选
      resetList() {
          this.createTime =[];
          this.signTime =[];
          this.searchParam = {};
          this.citySelectArr = [];
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
      //选择项目类型时初始相关设计
      chickProjectType(type){
          this.searchParam.relatedDesign='';
          let r = 'XGSJ_'+type;
          this.getSjDict(type);
      },

      //获取相关设计数据字典，需要和项目类型联动
      getSjDict(type){
          let r = 'XGSJ_'+type;
          ajax.get("upms/dict/type/"+r).then(rs => {
              this.designOptions = rs
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
<style lang="scss">
    .project_table_statistics {
        width:100%;
        li {
            position: relative;
            width: 23%;
            float: left;
            margin: 0 1% 20px; 
            .el-card__header {
                padding:12px 15px;
            }
            .text {
                font-size:14px;
                color:#666;
                margin-bottom: 14px;
            }
            .el-button {
                border: 1px solid #29c9bb;
                color: #29c9bb;
            }
            p:nth-child(1) {
                float: left;
                margin-right:15px;
                img {
                    width:44px;
                    height:44px;
                }
            }
            p:nth-child(2) {
                float: left;
                height: 100%;
                width: calc(100% - 65px);
                span {
                    display: block;
                    height: 25px;
                    line-height:25px;
                    color:#333;
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                span:nth-child(1) {
                    font-size:16px;
                }
                span:nth-child(2) {
                    font-size:12px;
                }
            }
        }
    }
</style>

