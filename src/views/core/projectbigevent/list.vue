<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="add()" style="margin-right:10px">创建</el-button>
            <el-input v-model="searchParam.nameOrCode" placeholder="请输入项目编号/名称" clearable class="zy_input" style="width:190px"></el-input>
            <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多条件<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="small" @click="createTime=[];resetList()">重置</el-button>
        </div>
        <!-- 展开更多查询开始 -->
        <el-collapse-transition>
            <div class="search-box" v-show="isShowMore">              
                <div class="form-box">
                    <div class="form-group">
                        <label class="control-label">事件描述</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.description" placeholder="请输入事件描述"></el-input>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">提交人</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.updater" placeholder="请输入修改人"></el-input>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">事件日期</label>
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
                <el-table-column fixed label="操作" width="100">
                    <template fixed slot-scope="{ row, column, $index }">
                        <el-button v-show="showEditBtn" @click="edit(row.id)" type="text" size="small">编辑</el-button>
                        <el-button @click="toDetail(row)" type="text" size="small">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="projectName" sortable show-overflow-tooltip min-width="100" label="项目名称"></el-table-column>
                <el-table-column prop="projectCode" sortable show-overflow-tooltip min-width="100" label="项目编号"></el-table-column>
                <el-table-column prop="projectType" sortable show-overflow-tooltip min-width="100" label="项目类型"></el-table-column>
                <el-table-column prop="description" sortable show-overflow-tooltip min-width="200" label="事件描述"></el-table-column>
                <el-table-column prop="updater" sortable show-overflow-tooltip min-width="100" label="提交人"></el-table-column>
                <el-table-column prop="eventDate" sortable show-overflow-tooltip min-width="100" label="事件日期"></el-table-column>
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
        name: 'CoreProjectBigevent',
        mixins: [tool],
        data() {
            return {
                createTime: [],
                isShowMore:false,
                listUrl: "core/projectbigevent",
                showSearch: false,
                showAddBtn: this.getCurrentUserAuthority("/projectbigevent/add"),
                showEditBtn: this.getCurrentUserAuthority("/projectbigevent/edit")
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            getListBefore(params) {
                if (this.createTime) {
                    params.eventDateStart = this.createTime[0];
                    params.eventDateEnd = this.createTime[1];
                } else {
                    params.eventDateStart = '';
                    params.eventDateEnd = '';
                }
            },
        }
    }
</script>
