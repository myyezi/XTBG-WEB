<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="addRole()" style="margin-right:10px">创建</el-button>
            <el-input v-model="searchParam.name" placeholder="请输入角色名称" clearable class="zy_input" style="width:190px"></el-input>
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-menu" size="small" @click="isShowMore = !isShowMore">更多查询<i :class="[isShowMore ? 'el-icon-caret-bottom' : 'el-icon-caret-top', 'el-icon--right'] "></i></el-button>
            <el-button type="primary" icon="el-icon-refresh" size="small" @click="createTime=[];resetList()">重置</el-button>
            <!-- <el-button type="primary" icon="el-icon-upload" size="small" @click="exportExcel()">导出</el-button> -->
        </div>
        <!-- 展开更多查询开始 -->
        <el-collapse-transition>
            <div class="search-box" v-show="isShowMore">
                <div class="form-box">
<!--                    <div class="form-group">-->
<!--                        <label class="control-label">管理公司</label>-->
<!--                        &lt;!&ndash;<div class="input-group">-->
<!--                            <el-select v-model="roleForm.companyId" clearable>-->
<!--                                <el-option v-for="(item,index) in companys" :key="index"-->
<!--                                           :label="item.name" :value="item.id"></el-option>-->
<!--                            </el-select>-->
<!--                        </div>&ndash;&gt;-->
<!--                        <div class="input-group">-->
<!--                            <el-select v-model="searchParam.companyId" filterable clearable placeholder="请选择">-->
<!--                                <el-option-->
<!--                                    v-for="item in companys"-->
<!--                                    :key="item.value"-->
<!--                                    :label="item.name"-->
<!--                                    :value="item.id">-->
<!--                                </el-option>-->
<!--                            </el-select>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
            </div>
        </el-collapse-transition>
        <div class="division-line"></div>
        <div class="table-box">
            <el-table :data="list" style="width: 100%">
                <el-table-column fixed="left" label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button v-show="showEditBtn" @click="editRole(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button v-show="showAuthorityBtn" @click="assignAuthority(scope.row)" type="text" size="small">分配权限</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="name" sortable label="角色名称" min-width="200" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <a size="mini" @click="assignAuthority(scope.row,false)">{{scope.row.name}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="assignedCount" sortable label="分配人数" min-width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showUserList(scope.row)">{{scope.row.assignedCount}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="companyName" sortable label="所属管理公司" min-width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="creater" sortable label="创建人" min-width="100"></el-table-column>
                <el-table-column prop="createTime" sortable label="创建时间" min-width="150"></el-table-column>
                <el-table-column prop="updater" sortable label="更新人" min-width="100"></el-table-column>
                <el-table-column prop="updateTime" sortable label="更新时间" min-width="150"></el-table-column>
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

        <!-- 新增、编辑角色弹窗-->
        <el-dialog width="600px" :title="title" :visible.sync="addRoleVisible" :append-to-body="true">
            <el-form :model="roleForm" :rules="rules" label-position="top" ref="roleForm" class="full-input">
<!--                <el-form-item label="管理公司" label-width="120px" prop="companyId">-->
<!--                    <el-select v-model="roleForm.companyId">-->
<!--                        <el-option v-for="(item,index) in companys" :key="index"-->
<!--                                   :label="item.name" :value="item.id"></el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
                <el-form-item label="角色名" label-width="120px" prop="name">
                    <el-input ref="nameInput" v-model="roleForm.name" clearable maxlength="50"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close('roleForm')">取 消</el-button>
                <el-button type="primary" @click="submit('roleForm')">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 权限分配、权限详情-->
        <permissionForm ref="form"></permissionForm>

        <el-dialog width="400px" title="分配用户" :visible.sync="userDialogVisible" :append-to-body="true" class="el-dialog__body">
            <el-table ref="multipleTable" :data="userList" tooltip-effect="dark" style="width: 100%">
                <el-table-column prop="name" label="姓名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="phone" label="手机号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="userStatus" label="状态" show-overflow-tooltip></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import permissionForm from '@/views/upms/role/form.vue'
    import ajax from '@/utils/request'
    import {tool, ruleTool} from '@/utils/common'

    export default {
        name: 'role',
        mixins: [tool, ruleTool],
        components: {permissionForm},
        data() {
            return {
                isShowMore:false,
                userDialogVisible: false,
                userList: [],
                showEditBtn: this.getCurrentUserAuthority("role/edit"),
                showAddBtn: this.getCurrentUserAuthority("role/add"),
                showAuthorityBtn: this.getCurrentUserAuthority("role/authority"),
                showEnableBtn: this.getCurrentUserAuthority("role/enable"),
                showDeleteBtn: this.getCurrentUserAuthority("role/delete"),
                listUrl: "upms/role",
                addRoleVisible: false,
                roleForm: {
                    name: "",
                    remark: "",
                    companyId: ""
                },
                title: "",
                companys: [],
                rules: {
                    name: [
                        {required: true, message: '请输入角色名称', trigger: 'blur'},
                    ]
                }
            }
        },
        mounted: function () {
            this.getList();
            this.getCompanys()
        },
        methods: {
            showUserList(row) {
                this.userDialogVisible = true
                ajax.get('upms/user/getUserListByRoleId?roleId='+ row.id).then(rs => {
                    this.userList = rs.data;
                });
            },

            assignAuthority(row, showButton) {
                this.$refs.form.open(row, showButton);
            },
            getCompanys() {
                ajax.get('upms/organization/managerCompany').then(result => {
                    if (this.checkResponse(result)) {
                        this.companys = result.data;
                    } else {
                        this.companys = [];
                    }
                });
            },
            addRole() {
                this.title = "新增角色";
                this.getCompanys();
                this.roleForm = {};
                this.addRoleVisible = true;

                this.focus();
            },
            editRole(row) {
                this.title = "修改角色";
                this.getCompanys();
                ajax.get('upms/role/' + row.id).then(result => {
                    if (this.checkResponse(result)) {
                        this.roleForm = result.data;
                        this.addRoleVisible = true;
                    }
                });

                this.focus();
            },
            focus() {
                let that = this;
                setTimeout(function () {
                    that.$refs.nameInput.focus();
                }, 400);
            },
            deleteRole(row) {
                this.$confirm('是否确认删除 ?').then(_ => {
                    ajax.delete("upms/role/" + row.id).then((result) => {
                        if (this.checkResponse(result)) {
                            this.showMessage('删除成功', 'success');
                            this.getList();
                        }
                    })
                }).catch(_ => {
                    console.info("关闭");
                });
            },
            close(roleForm) {
                this.roleForm = {};
                this.$refs[roleForm].resetFields();
                this.addRoleVisible = false;
            },
            submit(roleForm) {
                this.$refs[roleForm].validate((valid) => {
                    if (valid) {

                        ajax.post("upms/role", this.roleForm).then((res) => {
                            if (this.checkResponse(res)) {
                                this.showMessage('保存成功', 'success');
                                this.addRoleVisible = false;
                                this.getList();
                            }
                        })
                    } else {
                        this.showMessage('校验不通过，请检查输入项');
                        return false;
                    }
                });
            },
            enableRole(row) {
                let data = {id: row.id, enableStatus: row.enableStatus?0:1};
                let label = row.enableStatus == 0 ? '启用' : '禁用';


                this.$confirm('是否确认' + label + '角色').then(_ => {
                    ajax.post("upms/role/enable", data).then((res) => {
                        this.showMessage(label + '成功', 'success');
                        this.getList();
                    })
                }).catch(_ => {
                    console.info("关闭");
                });
            },


        },
    }
</script>
