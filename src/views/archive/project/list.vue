<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <el-input v-model="searchParam.codeOrName" placeholder="请输入项目编号/名称" clearable class="zy_input" style="width:190px"></el-input>
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
                        <label class="control-label">项目编号</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.code" placeholder="请输入项目编号"></el-input>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">项目名称</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.name" placeholder="请输入项目名称"></el-input>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">项目类型</label>
                        <div class="input-group">
                            <el-select v-model="searchParam.type" clearable placeholder="请选择项目类型">
                                <el-option  label="输变电工程" value="1"></el-option>
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
                        <el-button v-show="showEditBtn" @click="edit(row.id)" type="text" size="small">文档管理</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="code" sortable show-overflow-tooltip min-width="100" label="项目编号">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="toDetail(scope.row)">
                            {{scope.row.code}}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="name" sortable show-overflow-tooltip min-width="100" label="项目名称"></el-table-column>
                <el-table-column prop="typeText" sortable show-overflow-tooltip min-width="100" label="项目类型"></el-table-column>
                <el-table-column prop="planStartDate" sortable show-overflow-tooltip min-width="100" label="计划开工日期"></el-table-column>
                <el-table-column prop="planEndDate" sortable show-overflow-tooltip min-width="100" label="计划竣工日期"></el-table-column>
                <el-table-column prop="actualStartDate" sortable show-overflow-tooltip min-width="100" label="实际开工日期"></el-table-column>
                <el-table-column prop="actualEndDate" sortable show-overflow-tooltip min-width="100" label="实际竣工日期"></el-table-column>
                <el-table-column prop="creater" sortable show-overflow-tooltip min-width="100" label="创建人"></el-table-column>
                <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="100" label="创建时间"></el-table-column>
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
    import {tool, ruleTool} from '@/utils/common'
    import ajax from '@/utils/request'

    export default {
        name: 'CoreProject',
        mixins: [tool],
        data() {
            return {
                isShowMore:false,
                listUrl: "core/project",
                showSearch: false,
                showAddBtn: this.getCurrentUserAuthority("/project/add"),
                showEditBtn: this.getCurrentUserAuthority("/project/edit"),
                showDelBtn: this.getCurrentUserAuthority("/project/del")
            }
        },
        mounted() {
            this.getList();
        },
        methods: {




        }
    }
</script>
