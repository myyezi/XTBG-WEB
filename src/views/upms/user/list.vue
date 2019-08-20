<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="add()" style="margin-right:10px">创建</el-button>
            <el-input v-model="searchParam.account" placeholder="请输入用户名" clearable class="zy_input" style="width:190px"></el-input>
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
            <el-button type="primary" icon="el-icon-refresh" size="small" @click="resetList()">重置</el-button>
            <!-- <el-button type="primary" icon="el-icon-upload" size="small" @click="exportExcel()">导出</el-button> -->
        </div>
        <!-- 展开更多查询开始 -->
        <el-collapse-transition>
            <div class="search-box" v-show="isShowMore">              
                <div class="form-box">
                    <div class="form-group">
                        <label class="control-label">姓名或手机号</label>
                        <div class="input-group input-groups">
                            <el-input v-model="searchParam.nameOrPhone" placeholder="请输入姓名或手机号"></el-input>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">组织</label>
                        <div class="input-group organ_wrap input-groups">
                            <tree-select v-model="searchParam.organId" placeholder="请选择" type="one"
                                        url="upms/organization/tree"></tree-select>
                            <!--<el-checkbox v-model="searchParam.organCascade">子组织</el-checkbox>-->
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">角色</label>
                        <div class="input-group input-groups">
                            <el-input v-model="searchParam.roleName" placeholder="请输入角色名称"></el-input>
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
                        <label class="control-label">学历</label>
                        <div class="input-group input-groups">
                            <el-select v-model="searchParam.education" filterable clearable>
                                <el-option label="博士" :value="1"></el-option>
                                <el-option label="硕士" :value="2"></el-option>
                                <el-option label="本科" :value="3"></el-option>
                                <el-option label="大专" :value="4"></el-option>
                                <el-option label="高中" :value="5"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">状态</label>
                        <div class="input-group input-groups">
                            <el-select v-model="searchParam.userStatus" placeholder="全部">
                                <el-option label="全部" value="-1"></el-option>
                                <el-option label="正式员工" value="1"></el-option>
                                <el-option label="试用期" value="2"></el-option>
                                <el-option label="离职" value="3"></el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
            </div>
        </el-collapse-transition>
        <div class="division-line"></div>
        <div class="table-box">
            <el-table :data="list" style="width: 100%">
                <el-table-column fixed label="操作" width="170">
                    <template slot-scope="{ row, column, $index }">
                        <el-button v-show="showEditBtn" @click="edit(row.id)" type="text" size="small">编辑</el-button>
                        <el-button v-show="showResetPasswordBtn" @click="openResetPwdForm(row)" type="text" size="small">重置密码
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
                <el-table-column prop="phone" sortable min-width="130" label="手机号"></el-table-column>
                <el-table-column prop="account" sortable show-overflow-tooltip min-width="150" label="用户名"></el-table-column>
                <el-table-column prop="email" sortable show-overflow-tooltip min-width="150" label="邮箱"></el-table-column>
                <el-table-column prop="organizations" sortable show-overflow-tooltip min-width="150" label="组织"></el-table-column>
                <el-table-column prop="roles" sortable show-overflow-tooltip min-width="150" label="角色"></el-table-column>
                <el-table-column prop="positions" sortable show-overflow-tooltip min-width="150" label="职位"></el-table-column>
                <el-table-column prop="positions" sortable show-overflow-tooltip min-width="150" label="所属管理公司"></el-table-column>
                <el-table-column prop="userStatus" sortable min-width="100" label="状态"></el-table-column>
                <el-table-column prop="createTimeStr" sortable min-width="150" label="创建时间"></el-table-column>
                <el-table-column prop="updateTime" sortable min-width="150" label="更新时间"></el-table-column>
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
    import TreeSelect from '@/components/TreeSelect/index'
    import ajax from '@/utils/request'
    import {tool} from '@/utils/common'
    import {startProcessAsync} from '@/utils/index'
    import $ from 'jquery-slim'

    export default {
        name: 'user',
        mixins: [tool],
        components: {TreeSelect},
        data() {
            return {
                listUrl: "/upms/user",
                showSearch: false,
                isShowMore:false,
                showAddBtn: this.getCurrentUserAuthority("/user/save"),
                showDisabledBtn: this.getCurrentUserAuthority('/user/updateState'),
                showEnableBtn: this.getCurrentUserAuthority('/user/updateState'),
                showEditBtn: this.getCurrentUserAuthority('/user/save'),
                showResetPasswordBtn: this.getCurrentUserAuthority('/user/resetPwd')
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            getListBefore(params) {
                params.organCascade = params.organCascade ? 1 : 0;
                if (params.organId)
                    params.organId = params.organId.join(',');
                if (params.posId)
                    params.posId = params.posId.join(',');
            },
            getListAfter() {
                var s = "yyyy-MM-dd hh:mm";
                this.list.forEach(item => {
                    if (item.createTime)
                        item.createTimeStr = new Date(item.createTime).format(s);
                    if (item.updateTime)
                        item.updateTimeStr = new Date(item.updateTime).format(s);
                    if (item.lastLoginTime)
                        item.loginTimeStr = new Date(item.lastLoginTime).format(s);
                });
            },
            updateState(row) {
                let msg = "确认启用？";
                if (row.userStatus) {
                    msg = "确认停用？";
                }
                this.$confirm(msg)
                    .then(_ => {
                        row.userStatus = row.userStatus == 0 ? 1 : 0;
                        ajax.post('upms/user/updateState', {
                            id: row.id,
                            userStatus: row.userStatus
                        }).then(rs => {
                            if (rs.status == 0) {
                                this.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                            }
                        });

                    })
                    .catch(_ => {
                    });
            },
            openResetPwdForm(row) {
                this.$prompt('请输入新密码', '为账号 ' + row.account + ' 重置密码', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^[a-zA-Z\d_]{6,14}$/,
                    inputErrorMessage: '6~14位数字、字母、下划线',
                    inputValue: ''
                }).then(({value}) => {
                    var user = {
                        id: row.id,
                        password: value
                    };
                    ajax.post('upms/user/resetPwd', user).then(rs => {
                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        });
                    });
                }).catch(() => {
                });

            },
        }
    }
</script>

<style scoped lang="scss">
    .organ_wrap {
        display: flex;

        .tree-select-panel {
            width: 100%;
        }

        .el-checkbox {
            display: flex;
            align-items: center;
            margin-left: 10px;
            margin-right: 0;

            /deep/ .el-checkbox__label {
                font-size: 12px;
            }
        }
    }

    .list-panel .search-box .input-groups {
        width: calc(100% - 85px);
    }
</style>
