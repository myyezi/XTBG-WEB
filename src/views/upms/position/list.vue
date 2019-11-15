<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="tree-box">
            <div class="top-box">
                <div class="title">职位</div>
            </div>
            <div class="tree-content">
                <tree-panel ref="tree" url="upms/position/tree" :params="params"
                            :showDel="showDel" :showAdd="showAdd" :showEdit="showEdit" @show-form="open" @delete-data="deletePosition"></tree-panel>
            </div>
        </div>

        <el-dialog width="600px" class="full-input" :visible.sync="show" :title="title">
            <el-form :model="editForm" ref="editForm" label-position="top" label-width="100px">

                <el-form-item label="上级职位" prop="parentId" v-if="parentShow" :rules="rules.required('请选择上级职位')">
                    <tree-select v-model="editForm.parentId" placeholder="请选择" type="one" ref="parentTree"
                                 url="upms/position/tree" :disabled-id="parentDisabledArr"
                                 :params="params"></tree-select>

                </el-form-item>

                <el-form-item label="职位名称" prop="name" :rules="rules.required('请输入职位名称')">
                    <el-input ref="nameInput" v-model="editForm.name" placeholder="请输入" maxlength="30"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" @click="save">保存</el-button>
                <el-button @click="close">返回</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import TreePanel from '@/components/TreePanel/index'
    import TreeSelect from '@/components/TreeSelect/index'
    import ajax from '@/utils/request'
    import {tool, ruleTool} from '@/utils/common'

    export default {
        name: 'position',
        mixins: [tool, ruleTool],
        components: {TreePanel, TreeSelect},
        data() {
            return {
                showAdd: this.getCurrentUserAuthority("sys/position/insert"),
                showEdit: this.getCurrentUserAuthority("sys/position/update"),
                showDel: this.getCurrentUserAuthority("sys/position/delete"),

                show: false,
                title: "",
                orgTypes: [{value: "30", text: "所属组织"}],
                params: {},
                editForm: {},
                parentDisabledArr: [],
                parentShow: false
            }
        },
        methods: {
            deletePosition(opt) {
                console.log(opt.id)
                this.$confirm("确认删除吗？").then(_ => {
                    ajax.delete('upms/position/'+ opt.id).then(res => {
                        if(this.checkResponse(res)) {
                            this.showMessage("删除成功", "success");
                            this.show = false;
                            this.$refs.tree.getData();
                        } else {
                            this.showMessage(res.msg, "error");
                        }
                    });
                }).catch(_ => {
                });
            },
            open(opt) {
                console.log(opt)
                if (opt.state == 1) { //编辑
                    this.title = "编辑职位";

                    this.parentShow = true;
                    this.getDetail(opt.data.id);

                    //上级职位禁选
                    setTimeout(function () {
                        that.disabledParentTree(opt.data.id);
                    }, 400);
                } else {
                    this.editForm = {};
                    this.parentShow = false;
                    this.editForm.parentId = opt.data.id;
                    this.title = opt.data.name + " - 新增职位";
                    this.show = true;
                    this.clearValidate();
                }

                let that = this;
                setTimeout(function () {
                    that.$refs.nameInput.focus();
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
            getDetail(id, companyName) {
                ajax.get("upms/position/" + id).then(result => {
                    //if (this.checkResponse(result)) {
                    this.editForm = result.data;
                    this.show = true;
                    this.clearValidate();
                    this.$set(this.editForm, "parentId", [this.editForm.parentId]);
                    //}
                }).catch(e => {
                    console.log(e);
                    this.showMessage("系统异常,请联系系统管理员", "error");
                });
            },
            save() {
                this.$refs["editForm"].validate((valid) => {
                    if (!valid) {
                        this.showMessage('校验不通过，请检查输入项');
                        return false;
                    }

                    let params = Object.assign({}, this.editForm);
                    if(Array.isArray(params.parentId))
                        params.parentId = params.parentId[0];

                    ajax.post('upms/position/', params).then(res => {
                        if(this.checkResponse(res)) {
                            this.showMessage("保存成功", "success");
                            this.show = false;
                            this.$refs.tree.getData();
                        } else {
                            this.showMessage(res.msg, "error");
                        }
                    });
                });
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
        width: 800px;
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
</style>
