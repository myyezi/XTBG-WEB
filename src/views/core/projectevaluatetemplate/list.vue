<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <el-input v-model="searchParam.name" placeholder="项目编号/名称" clearable class="zy_input" style="width:190px"></el-input>
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">重置</el-button>
        </div>
        <div class="division-line"></div>
        <div class="table-box">
            <el-table :data="list" style="width: 100%">
                <el-table-column fixed label="操作" width="150">
                    <template fixed slot-scope="{ row, column, $index }">
                        <el-button v-show="showEditBtn" @click="editTemplate(row.type)" type="text" size="small">模板设置</el-button>
                    </template>
                </el-table-column>
                                <el-table-column prop="typeText" sortable show-overflow-tooltip min-width="400" label="模板类型"></el-table-column>
                                <el-table-column prop="updater" sortable show-overflow-tooltip min-width="100" label="修改人"></el-table-column>
                                <el-table-column prop="updateTime" sortable show-overflow-tooltip min-width="100" label="修改时间"></el-table-column>
                            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="pageSizeSetting"
                :page-size="pageSize"
                :layout="pageLayout"
                :total="listCount">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import ajax from '@/utils/request'
    import {tool} from '@/utils/common'

    export default {
        name: 'CoreProjectEvaluateTemplate',
        mixins: [tool],
        data() {
            return {
                isShowMore:false,
                listUrl: "core/projectevaluatetemplate/getTemplateListByType",
                showSearch: false,
                showAddBtn: this.getCurrentUserAuthority("/core/projectevaluatetemplate/save"),
                showEditBtn: this.getCurrentUserAuthority("/core/projectevaluatetemplate/edit")
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            editTemplate(id){
                if(~this.$route.fullPath.indexOf("/editTemplent?")){
                    return;
                }
                let url = this.$route.fullPath + '/editTemplent?type='+id+'';
                this.$router.push({path:url});
            }
        }
    }
</script>
