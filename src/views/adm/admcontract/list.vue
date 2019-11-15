<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF;margin-right:10px" icon="el-icon-plus" size="small" @click="add()" >创建</el-button>
            <el-input v-model="searchParam.name" placeholder="请输入合同名称" clearable class="zy_input" style="width:190px"></el-input>
            <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
            <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
            <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" icon="el-icon-refresh" size="small" @click="signTime=[]; resetList()">重置</el-button>
        </div>
        <!-- 展开更多查询开始 -->
        <el-collapse-transition>
            <div class="search-box" v-show="isShowMore">
                <div class="form-box">
                    <!--<div class="form-group">
                        <label class="control-label">组织</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.companyId" placeholder="请输入所属管理公司(组织表管理公司id)"></el-input>
                        </div>
                    </div>-->

                    <div class="form-group">
                        <label class="control-label">业主</label>
                        <div class="input-group">
                            <el-select v-model="searchParam.proprietorId" filterable clearable placeholder="请选择业主">
                                <el-option
                                    v-for="item in proprietorList"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="control-label">签订日期</label>
                        <div class="input-group">
                            <el-date-picker
                                v-model="signTime"
                                type="daterange"
                                :editable="false"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">项目信息</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.projectNameOrCode" placeholder="请输入项目名称或编号"></el-input>
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
                        <!--<el-button v-show="showEditBtn" @click="edit(row.id)" type="text" size="small">下载</el-button>-->
                    </template>
                </el-table-column>
                <el-table-column prop="name" sortable show-overflow-tooltip min-width="100" label="合同名称"></el-table-column>
                <el-table-column prop="projectTaskName" sortable show-overflow-tooltip min-width="100" label="项目名称"></el-table-column>
                <el-table-column prop="proprietorName" sortable show-overflow-tooltip min-width="100" label="业主"></el-table-column>
                <el-table-column prop="progress" sortable show-overflow-tooltip min-width="100" label="收款进度"></el-table-column>
                <el-table-column prop="signTime" sortable show-overflow-tooltip min-width="100" label="签订时间"></el-table-column>
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
        name: 'AdmContract',
        mixins: [tool],
        data() {
            return {
                proprietorList: [],
                isShowMore:false,
                listUrl: "adm/admcontract",
                showSearch: false,
                showAddBtn: this.getCurrentUserAuthority("/admcontract/add"),
                showEditBtn: this.getCurrentUserAuthority("/admcontract/edit"),
                showEditBtn: this.getCurrentUserAuthority("/admcontract/down"),
                signTime:[],
            }
        },
        mounted() {
            this.getList();
            this.getProprietorList()
        },
        methods: {
            getProprietorList() {
                ajax.get('adm/admcontract/getProprietorList').then(rs => {
                    this.proprietorList = rs.data;
                });
            },
            getListBefore(params) {
                if (this.signTime) {
                    params.signTimeStart = this.signTime[0];
                    params.signTimeEnd = this.signTime[1];
                } else {
                    params.signTimeStart = '';
                    params.signTimeEnd = '';
                }
            },
        }
    }
</script>
