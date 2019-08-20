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
                        <label class="control-label">主键</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.id" placeholder="请输入主键"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">所属管理公司(组织表管理公司id)</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.companyId" placeholder="请输入所属管理公司(组织表管理公司id)"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">请假类型(（关联字典表)</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.type" placeholder="请输入请假类型(（关联字典表)"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">开始时间</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.startTime" placeholder="请输入开始时间"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">结束时间</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.endTime" placeholder="请输入结束时间"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">请假时长</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.leaveTime" placeholder="请输入请假时长"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">事由</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.reason" placeholder="请输入事由"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">状态(1-审批中，2-已通过  3-已驳回 4-已作废)</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.approvalStatus" placeholder="请输入状态(1-审批中，2-已通过  3-已驳回 4-已作废)"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">数据状态(0-删除，1-正常)</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.status" placeholder="请输入数据状态(0-删除，1-正常)"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">申请人</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.creater" placeholder="请输入申请人"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">修改人</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.updater" placeholder="请输入修改人"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">申请时间</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.createTime" placeholder="请输入申请时间"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">修改时间</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.updateTime" placeholder="请输入修改时间"></el-input>
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
                                <el-table-column prop="id" sortable show-overflow-tooltip min-width="100" label="主键"></el-table-column>
                                <el-table-column prop="companyId" sortable show-overflow-tooltip min-width="100" label="所属管理公司(组织表管理公司id)"></el-table-column>
                                <el-table-column prop="type" sortable show-overflow-tooltip min-width="100" label="请假类型(（关联字典表)"></el-table-column>
                                <el-table-column prop="startTime" sortable show-overflow-tooltip min-width="100" label="开始时间"></el-table-column>
                                <el-table-column prop="endTime" sortable show-overflow-tooltip min-width="100" label="结束时间"></el-table-column>
                                <el-table-column prop="leaveTime" sortable show-overflow-tooltip min-width="100" label="请假时长"></el-table-column>
                                <el-table-column prop="reason" sortable show-overflow-tooltip min-width="100" label="事由"></el-table-column>
                                <el-table-column prop="approvalStatus" sortable show-overflow-tooltip min-width="100" label="状态(1-审批中，2-已通过  3-已驳回 4-已作废)"></el-table-column>
                                <el-table-column prop="status" sortable show-overflow-tooltip min-width="100" label="数据状态(0-删除，1-正常)"></el-table-column>
                                <el-table-column prop="creater" sortable show-overflow-tooltip min-width="100" label="申请人"></el-table-column>
                                <el-table-column prop="updater" sortable show-overflow-tooltip min-width="100" label="修改人"></el-table-column>
                                <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="100" label="申请时间"></el-table-column>
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
        name: 'AdmLeave',
        mixins: [tool],
        data() {
            return {
                isShowMore:false,
                listUrl: "adm/admleave",
                showSearch: false,
                showAddBtn: this.getCurrentUserAuthority("/admleave/save"),
                showEditBtn: this.getCurrentUserAuthority("/admleave/edit")
            }
        },
        mounted() {
            this.getList();
        },
        methods: {

        }
    }
</script>
