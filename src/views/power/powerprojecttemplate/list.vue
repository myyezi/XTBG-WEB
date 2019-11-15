<template>
  <div class="app-container white-bg list-panel" v-cloak>
      <div class="opertion-box">
        <el-button v-show="showAddBtn" style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF;margin-right:10px" icon="el-icon-plus" size="small" @click="toPlanTemplate('add')" >创建</el-button>
      </div>
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
        <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="100" label="创建时间"></el-table-column>
        <el-table-column prop="updater" sortable show-overflow-tooltip min-width="100" label="修改人"></el-table-column>
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
        },
        methods: {
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
