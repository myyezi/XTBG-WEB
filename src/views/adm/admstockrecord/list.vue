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
                        <label class="control-label">库存ID</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.stockId" placeholder="请输入库存ID"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">采购物品（物品字典表ID）</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.goodsId" placeholder="请输入采购物品（物品字典表ID）"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">库存动作(1-入库，2-出库)</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.actionType" placeholder="请输入库存动作(1-入库，2-出库)"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">执行数量</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.executNum" placeholder="请输入执行数量"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">实时总数</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.num" placeholder="请输入实时总数"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">申请人</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.applyer" placeholder="请输入申请人"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">申请时间</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.applyTime" placeholder="请输入申请时间"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">执行人</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.executor" placeholder="请输入执行人"></el-input>
                        </div>
                    </div>
                                       <div class="form-group">
                        <label class="control-label">执行时间</label>
                        <div class="input-group">
                            <el-input v-model="searchParam.executTime" placeholder="请输入执行时间"></el-input>
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
                                <el-table-column prop="stockId" sortable show-overflow-tooltip min-width="100" label="库存ID"></el-table-column>
                                <el-table-column prop="goodsId" sortable show-overflow-tooltip min-width="100" label="采购物品（物品字典表ID）"></el-table-column>
                                <el-table-column prop="actionType" sortable show-overflow-tooltip min-width="100" label="库存动作(1-入库，2-出库)"></el-table-column>
                                <el-table-column prop="executNum" sortable show-overflow-tooltip min-width="100" label="执行数量"></el-table-column>
                                <el-table-column prop="num" sortable show-overflow-tooltip min-width="100" label="实时总数"></el-table-column>
                                <el-table-column prop="applyer" sortable show-overflow-tooltip min-width="100" label="申请人"></el-table-column>
                                <el-table-column prop="applyTime" sortable show-overflow-tooltip min-width="100" label="申请时间"></el-table-column>
                                <el-table-column prop="executor" sortable show-overflow-tooltip min-width="100" label="执行人"></el-table-column>
                                <el-table-column prop="executTime" sortable show-overflow-tooltip min-width="100" label="执行时间"></el-table-column>
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
        name: 'AdmStockRecord',
        mixins: [tool],
        data() {
            return {
                isShowMore:false,
                listUrl: "adm/admstockrecord",
                showSearch: false,
                showAddBtn: this.getCurrentUserAuthority("/admstockrecord/save"),
                showEditBtn: this.getCurrentUserAuthority("/admstockrecord/edit")
            }
        },
        mounted() {
            this.getList();
        },
        methods: {

        }
    }
</script>
