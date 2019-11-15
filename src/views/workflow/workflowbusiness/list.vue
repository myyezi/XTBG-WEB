<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <el-input v-model="searchParam.name" placeholder="请输入审批名称" clearable class="zy_input" style="width:190px"></el-input>
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
            <el-button type="primary" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">重置</el-button>
        </div>
        <!-- 展开更多查询开始 -->
        <el-collapse-transition>
            <div class="search-box" v-show="isShowMore">
                <div class="form-box">
                    <div class="form-group">
                        <label class="control-label">数据状态</label>
                        <div class="input-group">
                            <el-select v-model="searchParam.enabledStatus" filterable clearable>
                                <el-option label="禁用" :value="0"></el-option>
                                <el-option label="启用" :value="1"></el-option>
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
                        <el-button v-show="showEditBtn" @click="editWorking(row.configId)" type="text" size="small">编辑</el-button>
                        <el-button v-if="row.enabledStatus == 1" v-show="showStartBtn" @click="onStart(row,0)" type="text" size="small">禁用</el-button>
                        <el-button v-else v-show="showStartBtn" @click="onStart(row,1)" type="text" size="small">启用</el-button>
                    </template>
                </el-table-column>
                                <el-table-column prop="name" sortable show-overflow-tooltip min-width="100" label="审批名称"></el-table-column>
                                <el-table-column prop="enabledStatusText" sortable show-overflow-tooltip min-width="100" label="状态"></el-table-column>
                                <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="100" label="创建时间"></el-table-column>
                                <el-table-column prop="updateTime" sortable show-overflow-tooltip min-width="100" label="更新时间"></el-table-column>
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
        <el-dialog title="流程设置" :visible.sync="workDialogVisible"  :fullscreen="true"  :destroy-on-close="true" >
            <work-flow :workFlowData="workFlowData[0]" v-if="workDialogVisible"></work-flow>
        </el-dialog>
    </div>
</template>

<script>
    import ajax from '@/utils/request'
    import {tool} from '@/utils/common'
    import workFlow from '@/components/workCompent/work'

    export default {
        name: 'WorkflowBusiness',
        mixins: [tool],
        data() {
            return {
                workDialogVisible:false,
                workFlowData:[],
                isShowMore:false,
                listUrl: "workflow/workflowbusiness",
                showSearch: false,
                showStartBtn: this.getCurrentUserAuthority("/workflow/workflowbusiness/start"),
                showEditBtn: this.getCurrentUserAuthority("/workflow/workflowbusiness/edit")
            }
        },
        components: {workFlow},
        mounted() {
            this.getList();
        },
        methods: {
            editWorking(id) {
                ajax.get('workflow/workflowconfignode/selectConfigNodeTree' ,{
                    configId:id
                }).then(rs => {
                    if (rs.status === 0) {
                        this.workFlowData = rs.data
                        this.workDialogVisible = true
                    }
                });
            },
            // 启用禁用节点
            onStart(row,type) {
                let _this = this;
                let str = ''
                this.operationType = 'delete';
                if (type === 1) {
                    str = '确定启用该流程配置吗？';
                } else {
                    str = '确定禁用该流程配置吗？';
                }
                this.$confirm(str ,'提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(function() {
                    _this.updateStatus(row,type)
                }).catch(function() {
                });
            },

            //（启用/禁用）流程配置
            updateStatus(row,type){
                var data ={};
                data.id = row.configId;
                data.enabledStatus = type;
                data.businessId = row.id;
                data.detail = row.name;
                ajax.post('workflow/workflowconfig/updateStatus', data).then(rs => {
                    if (rs.status == 0) {
                        this.$message
                            .success(rs.msg);
                         this.getList();
                    } else {
                        this.$message
                            .error(rs.msg);
                    }
                });
            }
        }
    }
</script>
