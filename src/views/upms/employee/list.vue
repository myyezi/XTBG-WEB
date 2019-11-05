<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <el-button type="primary" v-show="showAddBtn" icon="el-icon-plus" size="small" @click="add()" style="margin-right:10px">创建
            </el-button>
            <el-input v-model="searchParam.nameOrPhone" placeholder="请输入姓名或手机号" clearable class="zy_input"
                      style="width:190px"></el-input>
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i
                :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
            <el-button type="primary" icon="el-icon-refresh" size="small" @click="resetList()">重置</el-button>
            <el-button type="primary" v-show="showExportBtn" icon="el-icon-upload" size="small" @click="exportExcel()">导出</el-button>
        </div>
        <!-- 展开更多查询开始 -->
        <el-collapse-transition>
            <div class="search-box" v-show="isShowMore">
                <div class="form-box">
                    <div class="form-group">
                        <label class="control-label">组织</label>
                        <div class="input-group">
                            <tree-select v-model="searchParam.organizationId" placeholder="请选择" type="one"
                                         url="/upms/employee/treeNodeByCompanyId"></tree-select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">职位</label>
                        <div class="input-group input-groups">
                            <tree-select v-model="searchParam.posId" placeholder="请选择" type="one"
                                         url="upms/position/tree"></tree-select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">状态</label>
                        <div class="input-group input-groups">
                            <el-select v-model="searchParam.employeeStatus" placeholder="全部">
                                <el-option label="全部" value="-1"></el-option>
                                <el-option label="试用期" value="1"></el-option>
                                <el-option label="正式员工" value="2"></el-option>
                                <el-option label="离职" value="3"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">类型</label>
                        <div class="input-group input-groups">
                            <el-select v-model="searchParam.type" filterable clearable placeholder="请选择员工类型">
                                <el-option v-for="item in typeList" :key="item.value" :label="item.text"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">入职日期</label>
                        <div class="input-group input-groups">
                            <el-date-picker
                                v-model="searchParam.entryDate" type="date" placeholder="请选择入职日期" value-format="yyyy-MM-dd">
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
                    <template slot-scope="{ row, column, $index }">
                        <el-button v-show="showEditBtn" v-if="row.employeeStatus!=3 " @click="edit(row.id)" type="text"
                                   size="small">编辑
                        </el-button>
                        <el-button v-show="showLeaveBtn" v-if="row.employeeStatus!=3" @click="leave(row.id)" type="text"
                                   size="small">离职
                        </el-button>
                    </template>
                </el-table-column>

                <el-table-column prop="name" fixed sortable show-overflow-tooltip min-width="120" label="姓名">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="toDetail(scope.row)">
                            {{scope.row.name}}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="account" sortable min-width="130" label="手机号"></el-table-column>
                <el-table-column prop="email" sortable show-overflow-tooltip min-width="150"
                                 label="邮箱"></el-table-column>
                <el-table-column prop="organizations" sortable show-overflow-tooltip min-width="150"
                                 label="组织"></el-table-column>
                <el-table-column prop="positions" sortable show-overflow-tooltip min-width="150"
                                 label="职位"></el-table-column>
                <el-table-column prop="roles" sortable show-overflow-tooltip min-width="150"
                                 label="角色"></el-table-column>
                <el-table-column prop="employeeStatusText" sortable min-width="100" label="状态">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.employeeStatus == 1" disable-transitions :type="'primary'">
                            {{scope.row.employeeStatusText}}
                        </el-tag>
                        <el-tag v-if="scope.row.employeeStatus == 2" disable-transitions :type="'success'">
                            {{scope.row.employeeStatusText}}
                        </el-tag>
                        <el-tag v-if="scope.row.employeeStatus == 3" disable-transitions :type="'danger'">
                            {{scope.row.employeeStatusText}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="typeText" sortable show-overflow-tooltip min-width="100"
                                 label="类型"></el-table-column>
                <el-table-column prop="entryDate" sortable min-width="150" label="入职时间"></el-table-column>
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

        <el-dialog title="离职信息" v-dialogDrag :visible.sync="dialogVisible" width="35%">
            <el-form :model="leaveForm" :rules="rules" ref="leaveForm">
                <el-form-item label="离职日期" prop="leaveDate">
                    <el-date-picker
                        v-model="leaveForm.leaveDate" type="date" placeholder="请选择离职日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="ok('leaveForm')">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import TreeSelect from '@/components/TreeSelect/index'
    import ajax from '@/utils/request'
    import {tool, ruleTool} from '@/utils/common'
    import {startProcessAsync} from '@/utils/index'
    import $ from 'jquery-slim'

    export default {
        name: 'user',
        mixins: [tool, ruleTool],
        components: {TreeSelect},
        data() {
            return {
                listUrl: "/upms/employee",
                isShowMore: false,
                typeList: [],
                dialogVisible: false,
                showAddBtn: this.getCurrentUserAuthority("/employee/add"),
                showEditBtn: this.getCurrentUserAuthority('/employee/edit'),
                showLeaveBtn: this.getCurrentUserAuthority('/employee/leave'),
                showExportBtn: this.getCurrentUserAuthority('/employee/export'),
                rules: {
                    leaveDate: [
                        {required: true, message: '请选择入职日期', trigger: ['blur', 'change']},
                    ],
                },
                leaveForm: {id: "", leaveDate: ""}
            }
        },
        mounted() {
            this.getList();
            this.getDict();
        },
        methods: {
            // 获取字典
            getDict() {
                let r = 'YGLX';
                ajax.get("upms/dict/allType/" + r).then(rs => {
                    this.typeList = rs.YGLX;
                });
            },
            getListBefore(params) {
                if (params.organizationId)
                    params.organizationId = params.organizationId.join(',');
                if (params.posId)
                    params.posId = params.posId.join(',');
            },
            leave(id) {
                this.leaveForm.id = id;
                this.dialogVisible = true;
            },
            cancel() {
                this.dialogVisible = false;
                this.leaveForm = {id: "", leaveDate: ""};
            },
            ok(form) {
                let that = this;
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        const data = Object.assign(this.leaveForm);
                        ajax.post('upms/employee/leave', data).then(rs => {
                            if (rs.status == 0) {
                                that.$message({message: '操作成功！', type: 'success'});
                                this.dialogVisible = false;
                                this.leaveForm = {id: "", leaveDate: ""};
                                this.getList();
                            } else {
                                that.$message({message: rs.msg, type: 'error'});
                            }
                        });
                    }
                    else {
                        this.showMessage('校验不通过，请检查输入项');
                        return false;
                    }
                })
            },
            exportExcel() {
                window.location = this.exportUrl("upms/employee/export?" + $.param(this.searchParam));
            },
        }
    }
</script>
