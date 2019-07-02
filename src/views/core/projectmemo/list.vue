<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <el-input v-model="searchParam.codeOrName" placeholder="请输入项目编号/名称" clearable class="zy_input" style="width:190px"></el-input>
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
            <el-button type="primary" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">重置</el-button>
        </div>
        <!-- 展开更多查询开始 -->
        <el-collapse-transition>
            <div class="search-box" v-show="isShowMore">
                <div class="form-box">
                    <div class="form-group">
                        <label class="control-label">项目名称</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.name" placeholder="请输入项目名称"></el-input>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">项目编号</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.code" placeholder="请输入项目编号"></el-input>
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
                        <el-button v-show="showEditBtn" @click="edit(row.id)" type="text" size="small">填写备忘录</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="typeText" sortable show-overflow-tooltip min-width="100" label="项目类型"></el-table-column>
                <el-table-column prop="code" sortable show-overflow-tooltip min-width="100" label="项目编号"></el-table-column>
                <el-table-column prop="name" sortable show-overflow-tooltip min-width="100" label="项目名称"></el-table-column>
                <el-table-column prop="planStartDate" sortable show-overflow-tooltip min-width="100" label="计划开工日期"></el-table-column>
                <el-table-column prop="planEndDate" sortable show-overflow-tooltip min-width="100" label="计划完工日期"></el-table-column>
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
        name: 'CoreProjectReportDaily',
        mixins: [tool],
        data() {
            return {
                isShowMore:false,
                listUrl: "core/project",
                showSearch: false,
                showEditBtn: this.getCurrentUserAuthority("/core/projectmemo/add"),
                showEditBtn: this.getCurrentUserAuthority("/core/projectmemo/edit")
            }
        },
        mounted() {
            this.getList();
        },
        methods: {

        }
    }
</script>
