<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="add()" style="margin-right:10px">创建</el-button>
            <el-input v-model="searchParam.nameOrCode" placeholder="请输入项目编号/名称" clearable class="zy_input" style="width:190px"></el-input>
            <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多条件<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="small" @click="checkDate=[];resetList()">重置</el-button>
        </div>
        <!-- 展开更多查询开始 -->
        <el-collapse-transition>
            <div class="search-box" v-show="isShowMore">              
                <div class="form-box">
                    <div class="form-group">
                        <label class="control-label">被查单位</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.becheckedCompany" placeholder="请输入被查单位"></el-input>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">被查地点</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.checkAddress" placeholder="请输入被查地点"></el-input>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">被查日期</label>
                        <div class="input-group">
                            <el-date-picker
                                v-model="checkDate"
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
                        <el-button v-show="showEditBtn" @click="edit(row.id)" type="text" size="small">编辑</el-button>
                        <el-button @click="edit(row.id)" type="text" size="small">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="code" sortable show-overflow-tooltip min-width="120" label="通知单号"></el-table-column>
                <el-table-column prop="projectName" sortable show-overflow-tooltip min-width="100" label="被查项目"></el-table-column>
                <el-table-column prop="checkCompany" sortable show-overflow-tooltip min-width="100" label="检查组织单位"></el-table-column>
                <el-table-column prop="becheckedCompany" sortable show-overflow-tooltip min-width="100" label="被查单位"></el-table-column>
                <el-table-column prop="checkAddress" sortable show-overflow-tooltip min-width="100" label="被查地点"></el-table-column>
                <el-table-column prop="checkDate" sortable show-overflow-tooltip min-width="100" label="被查日期"></el-table-column>
                <el-table-column prop="checkUserId" sortable show-overflow-tooltip min-width="100" label="检查人员"></el-table-column>
                <el-table-column prop="signUserName" sortable show-overflow-tooltip min-width="100" label="签收人员"></el-table-column>
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
    import {tool} from '@/utils/common'

    export default {
        name: 'SafeCheck',
        mixins: [tool],
        data() {
            return {
                checkDate: [],
                isShowMore:false,
                listUrl: "qsm/safe/check",
                showSearch: false,
                showAddBtn: this.getCurrentUserAuthority("/safe/check/save"),
                showEditBtn: this.getCurrentUserAuthority("/safe/check/edit")
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            getListBefore(params) {
                if (this.checkDate) {
                    params.checkDateStart = this.checkDate[0];
                    params.checkDateEnd = this.checkDate[1];
                } else {
                    params.checkDateStart = '';
                    params.checkDateEnd = '';
                }
            },
        }
    }
</script>
