<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="add()" style="margin-right:10px">创建</el-button>
            <el-input v-model="searchParam.content" placeholder="请输入通知内容" clearable class="zy_input" style="width:190px"></el-input>
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="small" @click="resetList()">重置</el-button>
            <el-button type="primary" icon="el-icon-upload" size="small" @click="exportExcel()">导出</el-button>
        </div>

        <div class="division-line"></div>
        <div class="table-box">
            <el-table :data="list" style="width: 100%">
                <el-table-column fixed label="操作" width="100">
                    <template fixed slot-scope="{ row, column, $index }">
                        <el-button v-show="showEditBtn" @click="edit(row.id)" type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="noticeStatus" sortable show-overflow-tooltip min-width="120" label="是否有效">
                    <template slot-scope="{row}">
                        <el-switch active-text="有效" inactive-text="无效"
                                   v-model="row.noticeStatus" @click.native="updateNoticeStatus(row)"></el-switch>
                    </template>
                </el-table-column>

                <el-table-column prop="content" sortable show-overflow-tooltip min-width="400" label="内容"></el-table-column>
                <el-table-column prop="typeText" sortable show-overflow-tooltip min-width="100" label="通知类型"></el-table-column>
                <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="150" label="创建时间"></el-table-column>
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
        name: 'notice',
        mixins: [tool],
        data() {
            return {
                listUrl: "/upms/notice",
                showExportExcelBtn: this.getCurrentUserAuthority('/notice/export'),
                showAddBtn: this.getCurrentUserAuthority("/notice/save"),
                showEditBtn: this.getCurrentUserAuthority("/notice/edit"),
            }
        },
        mounted() {
            this.getList();
            this.getUserList();
        },
        methods: {
            updateNoticeStatus(row){
                row.noticeStatus = row.noticeStatus == true ? 1 : 2;
                ajax.post('upms/notice/updateNoticeStatus', {
                    id: row.id,
                    noticeStatus : row.noticeStatus
                }).then(rs => {
                    if (rs.status != 0) {
                        this.$message({
                            message: rs.msg,
                            type: 'error'
                        });
                    }
                    this.getList();
                });
            },
            exportExcel() {
                window.location = this.exportUrl("upms/notice/export?" + $.param(this.searchParam));
            },
        }
    }
</script>
