<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="add()" style="margin-right:10px">创建</el-button>
            <el-input v-model="searchParam.zy_input" placeholder="请输入" clearable class="zy_input" style="width:190px"></el-input>
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询
                <i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
            <el-button type="primary" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">重置</el-button>
            <!--<el-button type="primary" icon="el-icon-upload" size="small" @click="exportExcel()">导出</el-button>-->
        </div>
        <!-- 展开更多查询开始 -->
        <el-collapse-transition>
            <div class="search-box" v-show="isShowMore">              
                <div class="form-box">
                    <div class="form-group">
                        <label class="control-label">项目</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.projectId" placeholder="请输入项目id"></el-input>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">年份</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.year" placeholder="请输入年份"></el-input>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">周报期数</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.period" placeholder="请输入周报期数"></el-input>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">填报日期</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.reportDate" placeholder="请输入填报日期"></el-input>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">创建时间</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.createTime" placeholder="请输入创建时间"></el-input>
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
                        <el-button v-show="showEditBtn" @click="edit(row.id)" type="text" size="small">编辑周报</el-button>
                        <el-button @click="exportWord(row.id)" type="text" size="small">导出</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="projectName" sortable show-overflow-tooltip min-width="120" label="所属项目"></el-table-column>
                <el-table-column prop="year" sortable show-overflow-tooltip min-width="50" label="年份"></el-table-column>
                <el-table-column prop="period" sortable show-overflow-tooltip min-width="50" label="周报期数"></el-table-column>
                <el-table-column prop="startEnd" sortable show-overflow-tooltip min-width="100" label="周起止日期"></el-table-column>
                <el-table-column prop="updater" sortable show-overflow-tooltip min-width="100" label="提交人"></el-table-column>
                <el-table-column prop="updateTime" sortable show-overflow-tooltip min-width="100" label="提交时间"></el-table-column>
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
        name: 'CoreProjectReportWeekly',
        mixins: [tool],
        data() {
            return {
                isShowMore:false,
                listUrl: "core/projectreportweekly",
                showSearch: false,
                showAddBtn: this.getCurrentUserAuthority("/core/projectreportweekly/add"),
                showEditBtn: this.getCurrentUserAuthority("/core/projectreportweekly/edit")
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            exportWord(id) {
                window.location = this.exportUrl("core/projectreportweekly/export?id="+ id);
            }
        }
    }
</script>
