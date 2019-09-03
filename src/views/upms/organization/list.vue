<template>
    <div class="app-container white-bg list-panel" v-cloak style="display:flex;overflow: auto;">
        <div class="tree-box">
            <div class="top-box">
                <div class="title">组织设置</div>
            </div>
            <div class="tree-content">
                <tree-panel ref="tree" url="upms/organization/treeNode"
                            :showAdd="showAdd" :showEdit="showEdit" @show-form="open" @show-table="showTable">

                </tree-panel>
            </div>
        </div>
        <div class="tree_two_count_right" v-loading="isLoading">
            <span style="font-size: 16px; display: block;margin:25px 0 10px;" v-if="checkData.name">{{checkData.name}}
                <el-select v-if="checkData.name" v-model="userStatus" filterable clearable style="width: 200px; left: 200px" @change="getUserList()">
                    <el-option label="试用期" :value="1"></el-option>
                    <el-option label="正式员工" :value="2"></el-option>
                    <el-option label="离职" :value="3"></el-option>
                </el-select>
            </span>
            <el-table
                v-if="isClickNode"
                ref="multipleTable"
                :data="tableData"
                style="width: 100%"
                max-height="860"
            >
                <el-table-column prop="name" label="姓名" width="100"></el-table-column>
                <el-table-column label="联系方式" width="200">
                    <template slot-scope="scope">{{ scope.row.account }}</template>
                </el-table-column>
                <el-table-column prop="email" label="邮箱" width="200" show-overflow-tooltip></el-table-column>
            </el-table>
        </div>
        <el-dialog width="600px" class="full-input" :visible.sync="show" :title="title">
            <el-form :model="editForm" ref="editForm" label-position="top" label-width="100px">
                <el-form-item label="上级组织" prop="parentId" v-if="parentShow" :rules="rules.required('请选择上级组织')">
                    <tree-select v-model="editForm.parentId" placeholder="请选择" type="one" ref="parentTree"
                                 url="upms/organization/tree" :disabled-id="parentDisabledArr" :params="params"></tree-select>

                </el-form-item>
                <el-form-item label="组织名称" prop="name" :rules="rules.required('请输入组织名称')">
                    <el-input v-model="editForm.name" placeholder="请输入" maxlength="30"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="add">保存</el-button>
                <el-button @click="close">返回</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import TreePanel from './TreePanel.vue'
    import TreeSelect from '@/components/TreeSelect/index'
    import ajax from '@/utils/request'
    import {tool, ruleTool} from '@/utils/common'

    export default {
        name: 'organization',
        mixins: [tool, ruleTool],
        components: {TreePanel, TreeSelect},
        data() {
            return {
                showAdd: this.getCurrentUserAuthority("sys/organization/insert"),
                showEdit: this.getCurrentUserAuthority("sys/organization/update"),
                showDel: this.getCurrentUserAuthority("sys/organization/delete"),
                show: false,
                parentShow: false,
                title: "",
                params: {},
                editForm: {},
                disabledArray: [],
                parentDisabledArr: [],

                selectionAll:[],
                companyId: 30,
                activeName:'second',
                isLoading:false,
                isClickNode: false,
                tableData:[],
                checkData:{},
                userStatus: '',// 搜索关键字
            }
        },
        methods: {
            showTable(data) {
                this.isLoading = true
                this.checkData = data
                this.isClickNode = true
                ajax.get('upms/organization/getOrganizationUserList/' + data.id).then(rs => {
                    this.tableData = rs.data;
                    this.isLoading = false
                });
            },
            getUserList() {
                ajax.get('upms/organization/getOrganizationUserList/' + this.checkData.id, {userStatus: this.userStatus}).then(rs => {
                    this.tableData = rs.data;
                });
            },
            open(opt) {
                this.disabledArray = [];
                let isEdit = false;
                if (opt.state == 1) {
                    this.title = "编辑组织";
                    this.parentShow = true;
                    this.getOrganizationDetail(opt.data.id);
                    isEdit = true;

                    //this.parentDisabledArr = [];
                    //this.parentDisabledArr.push(opt.data.id);

                    //上级组织禁选
                    setTimeout(function () {
                        that.disabledParentTree(opt.data.id);
                    }, 400);
                } else {
                    this.title = [opt.data.name] + " - 新增下级";
                    this.parentShow = false;
                    this.$set(this.editForm, "parentId", [opt.data.id]);
                    this.$set(this.editForm, "type", '');

                    this.show = true;
                    this.clearValidate();
                }

                //禁用不能选择的 type 层级
                let that = this;
                setTimeout(function () {
                    that.disabledTypeTree(opt.data.type);
                }, 400);
            },
            close() {
                this.show = false;
                this.editForm = {};
            },
            clearValidate() {
                this.$nextTick(_ => {
                    if (this.$refs["editForm"]) {
                        this.$refs["editForm"].clearValidate();
                    }
                });
            },
            getOrganizationDetail(id) {
                //this.show = true;
                ajax.get("upms/organization/" + id).then(result => {
                    if (this.checkResponse(result)) {
                        this.editForm = result.data;
                        this.$set(this.editForm, "name", result.data.name);
                        this.$set(this.editForm, "parentId", [result.data.parentId]);
                        this.$set(this.editForm, "type", [result.data.type]);
                        this.show = true;
                        this.clearValidate();
                    }
                }).catch(e => {
                    console.log(e);
                    this.showMessage("系统异常,请联系系统管理员", "error");
                });
            },
            //新增
            add() {
                this.$refs["editForm"].validate((valid) => {
                    if (!valid) {
                        this.showMessage('校验不通过，请检查输入项');
                        return false;
                    }


                    let params = Object.assign({}, this.editForm);
                    if (Array.isArray(params.parentId)) {
                        params.parentId = params.parentId[0];
                    }

                    if (Array.isArray(params.type)) {
                        params.type = params.type[0];
                    }

                    ajax.post('/upms/organization', params).then(rs => {
                        this.showMessage("保存成功", "success");

                        this.show = false;
                        this.$refs.tree.getData();
                    });
                });
            },
            disabledTypeTree(type) {
                let data = this.$refs.typeTree.data[0];

                let disabledArray = [];
                let other = [];
                let current;
                if (data.id == type)
                    current = data;


                let f = function (parent, set) {

                    if (!parent.children)
                        return;

                    let node;
                    for (let i = 0, len = parent.children.length; i < len; i++) {
                        node = parent.children[i];

                        set.push(node.id);

                        if (node.id == type)
                            current = node;

                        if (Array.isArray(node.children))
                            f(node, set);
                    }
                };

                //要禁用的
                f(data, disabledArray);

                //可选的
                f(current, other);
                //if (isEdit)
                other.push(current.id);

                other.forEach(id => {
                    disabledArray.splice(disabledArray.indexOf(id), 1);
                });

                disabledArray.push(data.id);
                disabledArray.push("10");
                disabledArray.push("20");

                this.disabledArray = disabledArray;
            },
            disabledParentTree(cId){
                let data = this.$refs.parentTree.data[0];

                let disabledArray = [];
                let other = [];
                let current;
                if (data.id == cId)
                    current = data;

                let f = function (parent, set) {

                    if (!parent.children)
                        return;

                    let node;
                    for (let i = 0, len = parent.children.length; i < len; i++) {
                        node = parent.children[i];

                        set.push(node.id);

                        if (node.id == cId)
                            current = node;

                        if (Array.isArray(node.children))
                            f(node, set);
                    }
                };


                //可选的
                f(data, other);

                //要禁用的
                f(current, disabledArray);
                //if (isEdit)
                //other.push(current.id);

                /*other.forEach(id => {
                    disabledArray.splice(disabledArray.indexOf(id), 1);
                });*/

                disabledArray.push(cId);
                this.parentDisabledArr = disabledArray;
            }
        }
    }
</script>
<style scoped lang="scss">
    .app-container {
        padding: 20px;
        height: calc(100% - 20px);
    }

    .tree-box {
        max-width: calc(100% - 570px);
        min-width: 700px;
        height: 100%;

        .top-box {
            width: 100%;
            display: inline-flex;
            align-items: center;

            .title {
                font-size: 18px;
                font-weight: bold;
            }
        }

        /deep/ .el-tree {
            margin-top: 10px;
        }
    }

    .tree-content {
        margin-top: 10px;
        width: 100%;
        height: calc(100% - 60px);
        border-radius: 5px;
        border: 1px solid #eee;
        padding: 20px;
        overflow: auto;
    }
    .tree_two_count_right {
        width:520px;
        margin-left: 50px;
        padding-right: 20px;
    }
</style>
