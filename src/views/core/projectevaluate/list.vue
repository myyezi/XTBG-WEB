<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <el-input v-model="searchParam.name" placeholder="请输入项目编号/名称" clearable class="zy_input" style="width:190px"></el-input>
            <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多条件<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">重置</el-button>
        </div>
        <!-- 展开更多查询开始 -->
        <el-collapse-transition>
            <div class="search-box" v-show="isShowMore">              
                <div class="form-box">

                    <div class="form-group">
                        <label class="control-label">项目类型</label>
                        <div class="input-group">
                            <el-select v-model="searchParam.projectType" filterable clearable placeholder="请选择项目类型">
                                <el-option label="输变电项目" :value="1"></el-option>
                                <el-option label="输电线路工程" :value="2"></el-option>
                                <el-option label="变电站工程" :value="3"></el-option>
                            </el-select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="control-label">评价时间</label>
                        <div class="input-group">
                            <el-date-picker
                                v-model="createTime"
                                type="daterange"
                                :editable="false"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd">
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
                        <el-button  @click="edit(row.projectEvaluateId,row.id)" type="text" size="small">评价</el-button>
                        <i  v-if="row.projectEvaluateId == null" class="el-icon-warning"></i>
                        <el-button  @click="exportExcel(row.projectEvaluateId)" type="text" size="small">导出</el-button>
                    </template>
                </el-table-column>
                                <el-table-column prop="projectTypeText" sortable show-overflow-tooltip min-width="100" label="项目类型"></el-table-column>
                                <el-table-column prop="code" sortable show-overflow-tooltip min-width="100" label="项目编号"></el-table-column>
                                <el-table-column prop="name" sortable show-overflow-tooltip min-width="100" label="项目名称"></el-table-column>
                                <el-table-column prop="score" sortable show-overflow-tooltip min-width="100" label="得分率（%）"></el-table-column>
                                <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="100" label="评价时间"></el-table-column>
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
    import $ from 'jquery-slim'

    export default {
        name: 'CoreProjectEvaluate',
        mixins: [tool],
        data() {
            return {
                isShowMore:false,
                listUrl: "core/projectevaluate",
                showSearch: false,
                showAddBtn: this.getCurrentUserAuthority("/projectevaluate/save"),
                showEditBtn: this.getCurrentUserAuthority("/projectevaluate/edit"),
                createTime: []
            }
        },
        mounted() {
            //根据路径来判断是哪种类型 :类型（1-业主，2-监理，3-施工）
            if(~this.$route.fullPath.indexOf("projectevaluatePro")){
                this.searchParam.type = 1;
            }
            if(~this.$route.fullPath.indexOf("projectevaluateSup")){
                this.searchParam.type = 2;
            }
            if(~this.$route.fullPath.indexOf("projectevaluateCon")){
                this.searchParam.type = 3;
            }
            this.getList();
        },
        methods: {
            //处理条件查询的时间问题
            getListBefore(params) {
                if (this.createTime) {
                    params.createTimeStart = this.createTime[0];
                    params.createTimeEnd = this.createTime[1];
                } else {
                    params.createTimeStart = '';
                    params.createTimeEnd = '';
                }
            },

            //导出评价明细功能
            exportExcel(projectEvaluateId) {
               this.searchParam.projectEvaluateId = projectEvaluateId;
                window.location = this.exportUrl("core/projectevaluatedetail/exportProjectevaluatedetail?" + $.param(this.searchParam));
            },

            //跳转到自定义编辑页面，需要传参数
            edit(projectEvaluateId,projectId){
                if(~this.$route.fullPath.indexOf("/edit?")){
                    return;
                }
                let url = this.$route.fullPath + '/edit?projectEvaluateId='+projectEvaluateId+'&projectId='+projectId+'';
                this.$router.push({path:url});
            }
        }
    }
</script>
