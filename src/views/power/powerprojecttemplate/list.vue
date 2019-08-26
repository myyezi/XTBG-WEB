<template>
  <div class="app-container white-bg list-panel" v-cloak>
      <div class="opertion-box">
        <el-button v-show="showAddBtn" type="primary" icon="el-icon-plus" size="small" @click="toPlanTemplate('add')" style="margin-right:10px">创建</el-button>
        <el-select v-model="searchParam.type" placeholder="请选择项目类型" clearable style="width:190px">
            <el-option v-for="e in projectTypeList"  :key="e.value" :label="e.text" :value="e.value" ></el-option >
        </el-select>
        <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
        <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
        <el-button type="primary" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">重置</el-button>
      </div>
      <!-- 展开更多查询开始 -->
      <el-collapse-transition>
          <div class="search-box" v-show="isShowMore">
              <div class="form-box">
                  <div class="form-group">
                      <label class="control-label">组织</label>
                      <div class="input-group">
                          <el-select v-model="searchParam.companyId" filterable clearable placeholder="请选择组织">
                              <el-option
                                  v-for="item in companyList"
                                  :key="item.value"
                                  :label="item.name"
                                  :value="item.id">
                              </el-option>
                          </el-select>
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
            <el-button v-show="showEditBtn" @click="toPlanTemplate('edit',row.type,row.id)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="typeText" sortable show-overflow-tooltip min-width="100" label="项目类型"></el-table-column>
        <el-table-column prop="creater" sortable show-overflow-tooltip min-width="100" label="创建人"></el-table-column>
        <el-table-column prop="updater" sortable show-overflow-tooltip min-width="100" label="修改人"></el-table-column>
        <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="100" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" sortable show-overflow-tooltip min-width="100" label="修改时间"></el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="pageSizeSetting" :page-size="pageSize" :layout="pageLayout" :total="listCount">
      </el-pagination>
    </div>

  </div>
</template>

<script>
    import {tool} from '@/utils/common'
    import ajax from '@/utils/request'

    export default {
        name: 'PowerProjectTemplate',
        mixins: [tool],
        data() {
            return {
                isShowMore: false,
                listUrl: "power/powerprojecttemplate",
                showSearch: false,
                showAddBtn: this.getCurrentUserAuthority("/power/powerprojecttemplateconfig/add"),
                showEditBtn: this.getCurrentUserAuthority("/power/powerprojecttemplateconfig/edit"),
                projectTypeList: [],
                companyList : [],
            }
        },
        mounted() {
            this.getList();
            this.getProjectType();
        },
        methods: {
            getProjectType() {
                let type = "XMLX";
                ajax.get('upms/dict/type/'+type).then(rs => {
                    if (rs.length > 0) {
                        this.projectTypeList = rs;
                    }
                });
            },
            //获取公司
            getCompanyList() {
                ajax.get('personnel/personnelattendancegroup/getCompanyList').then(rs => {
                    this.companyList = rs.data;
                });
            },
            toPlanTemplate(operateType, projectType, templateId){
                let url = "";
                if (operateType == "add"){
                    url = "/power/powerprojecttemplateconfig/edit?operateType="+operateType;
                }else {
                    url = "/power/powerprojecttemplateconfig/edit?projectType="+projectType+"&operateType="+operateType+"&templateId="+templateId;
                }
                this.toPage(url)
            }
        }
}
</script>
