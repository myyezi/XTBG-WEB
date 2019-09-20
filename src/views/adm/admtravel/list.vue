<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <el-input v-model="searchParam.keyWord" placeholder="请输入员工姓名或手机号" clearable class="zy_input" style="width:190px"></el-input>
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
            <el-button type="primary" icon="el-icon-refresh" size="small" @click="createTime=[];resetList()">重置</el-button>
            <el-button type="primary" icon="el-icon-upload" size="small" @click="exportExcel()">导出</el-button>
        </div>
        <!-- 展开更多查询开始 -->
        <el-collapse-transition>
            <div class="search-box" v-show="isShowMore">
                <div class="form-box">

                    <div class="form-group">
                        <label class="control-label">审批状态</label>
                        <div class="input-group">
                            <el-select v-model="searchParam.approvalStatus" clearable placeholder="请选择审批状态">
                                <el-option  label="审批中" value="1"></el-option>
                                <el-option  label="已通过" value="2"></el-option>
                                <el-option  label="已驳回" value="3"></el-option>
                                <el-option  label="已作废" value="4"></el-option>
                            </el-select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="control-label">申请时间</label>
                        <div class="input-group">
                            <el-date-picker
                                v-model="createTime"
                                type="daterange"
                                :editable="false"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd HH:mm:ss "
                            >
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
                        <el-button  @click="toDetail(row)" type="text" size="small">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="reason" sortable show-overflow-tooltip min-width="100" label="外出事由"></el-table-column>
                <el-table-column prop="travelTime" sortable show-overflow-tooltip min-width="100" label="出差时长(天)"></el-table-column>
                <el-table-column prop="approvalStatusText" sortable show-overflow-tooltip min-width="100" label="申请状态"></el-table-column>
                <el-table-column prop="creater" sortable show-overflow-tooltip min-width="100" label="申请人"></el-table-column>
                <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="100" label="申请时间"></el-table-column>
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
        name: 'AdmOut',
        mixins: [tool],
        data() {
            return {
                isShowMore:false,
                listUrl: "adm/admtravel",
                showSearch: false,
                createTime:[],
            }
        },
        mounted() {
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
        }
    }
</script>
