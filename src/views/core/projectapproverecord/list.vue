<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="add()" style="margin-right:10px">创建</el-button>
            <el-input v-model="searchParam.zy_input" placeholder="请输入" clearable class="zy_input" style="width:190px"></el-input>
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
            <el-button type="primary" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">重置</el-button>
            <el-button type="primary" icon="el-icon-upload" size="small" @click="exportExcel()">导出</el-button>
        </div>
        <!-- 展开更多查询开始 -->
        <el-collapse-transition>
            <div class="search-box" v-show="isShowMore">              
                <div class="form-box">
                                       <div class="form-group">
                        <label class="control-label">主键id</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.id" placeholder="请输入主键id"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">周报id</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.reportId" placeholder="请输入周报id"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">审批状态(2-一级审批人审批通过，3-一级审批人驳回，4-二级审批人审批通过，5-二级审批人驳回)</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.approveStatus" placeholder="请输入审批状态(2-一级审批人审批通过，3-一级审批人驳回，4-二级审批人审批通过，5-二级审批人驳回)"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">审批人</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.approver" placeholder="请输入审批人"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">审批时间</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.approveTime" placeholder="请输入审批时间"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">数据状态(0-删除，1-正常)</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.status" placeholder="请输入数据状态(0-删除，1-正常)"></el-input>
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
                    </template>
                </el-table-column>
                                <el-table-column prop="id" sortable show-overflow-tooltip min-width="100" label="主键id"></el-table-column>
                                <el-table-column prop="reportId" sortable show-overflow-tooltip min-width="100" label="周报id"></el-table-column>
                                <el-table-column prop="approveStatus" sortable show-overflow-tooltip min-width="100" label="审批状态(2-一级审批人审批通过，3-一级审批人驳回，4-二级审批人审批通过，5-二级审批人驳回)"></el-table-column>
                                <el-table-column prop="approver" sortable show-overflow-tooltip min-width="100" label="审批人"></el-table-column>
                                <el-table-column prop="approveTime" sortable show-overflow-tooltip min-width="100" label="审批时间"></el-table-column>
                                <el-table-column prop="status" sortable show-overflow-tooltip min-width="100" label="数据状态(0-删除，1-正常)"></el-table-column>
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
        name: 'CoreProjectApproveRecord',
        mixins: [tool],
        data() {
            return {
                isShowMore:false,
                listUrl: "core/projectapproverecord",
                showSearch: false,
                showAddBtn: this.getCurrentUserAuthority("/projectapproverecord/save"),
                showEditBtn: this.getCurrentUserAuthority("/projectapproverecord/edit")
            }
        },
        mounted() {
            this.getList();
        },
        methods: {

        }
    }
</script>
