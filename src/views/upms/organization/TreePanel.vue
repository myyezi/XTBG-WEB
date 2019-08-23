<template>
    <div class="tree-panel" @click.prevent.stop>
        <el-input :placeholder="placeholder" v-model="filterText"></el-input>
        <el-tree
            :data="data"
            :check-strictly="true"
            :show-checkbox="false"
            node-key="id"
            :props="defaultProps"
            :ref="treeName"
            :expand-on-click-node="true"
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
            default-expand-all>
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span class="name-text" :class="{'disabled':data.disabled}" :title="node.label">{{ node.label }}</span>
                <span class="btn-list">
                    <span class="type-text" v-if="data.typeText">【{{ data.typeText }}】</span>
                    <el-button v-if="data.editable == 1" type="text" size="mini" @click.stop="edit(data)"
                               v-show="showEdit">编辑</el-button>
                    <el-button v-if="data.editable == 1" type="text" size="mini" @click.stop="remove(data)"
                               v-show="showDel">删除</el-button>
                    <el-button type="text" size="mini" @click.stop="append(data)"
                               v-show="showAdd">新增下级</el-button>
                </span>
            </span>
        </el-tree>

        <div class="tree_two_count_right">
        <!--<el-dialog width="600px" title="" :visible.sync="userDialogVisible" :append-to-body="true" class="el-dialog__body">-->
            <!--<p v-if="checkData.name" style="width: 2000px">{{checkData.name}}</p>-->
            <span style="color: black;font-size: 16px; text-align: left; display: block;" v-if="checkData.name">{{checkData.name}}
                <el-select v-if="checkData.name" v-model="userStatus" filterable clearable style="width: 200px;" @change="getUserList()">
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
                max-height="360"
            >
                <el-table-column prop="name" label="姓名" width="200"></el-table-column>
                <el-table-column label="联系方式" width="200">
                    <template slot-scope="scope">{{ scope.row.phone }}</template>
                </el-table-column>
                <el-table-column prop="email" label="邮箱" width="200" show-overflow-tooltip></el-table-column>
            </el-table>
<!--        </el-dialog>-->
        </div>
    </div>

</template>

<script>
    import ajax from '@/utils/request'
    import {tool} from '@/utils/common'

    export default {
        name: 'tree-panel',
        mixins: [tool],
        props: {
            showAdd: null,
            showEdit: null,
            showDel: null,
            type: String,
            params: Object,
            url: String,
        },
        data() {
            return {
                treeName: "tree" + new Date().getTime(),
                placeholder: "请输入名称过滤",
                filterText: '',// 搜索关键字
                userStatus: '',// 搜索关键字
                data: [],
                defaultProps: {
                    isLeaf: 'leaf',
                    children: 'children',
                    label: 'name'
                },

                loadings:false,
                isClickNode:false,
                checkData:{},
                tableData: [],
                multipleTable: "",
                userDialogVisible: false,
            };
        },
        watch: {
            url() {
                this.getData();
            },
            params: {
                handler() {
                    this.getData();
                },
                deep: true
            },
            filterText(val) {
                this.$refs[this.treeName].filter(val);
            },
        },
        methods: {
            getUserList() {
                ajax.get('upms/organization/getOrganizationUserList/' + this.checkData.id, {userStatus: this.userStatus}).then(rs => {
                    this.tableData = rs.data;
                    this.loadings = false
                });
            },

            handleNodeClick(data) {
                this.userDialogVisible = true
                this.loadings = true
                this.isClickNode = true
                this.checkData = data
                ajax.get('upms/organization/getOrganizationUserList/' + this.checkData.id).then(rs => {
                    this.tableData = rs.data;
                    this.loadings = false
                });

            },
            // 编辑节点
            edit(data) {
                let opt = {
                    title: "修改" + this.name,
                    state: 1,// 1编辑 2添加
                    data: data
                }
                this.$emit('show-form', opt);
            },
            // 添加节点
            append(data) {
                let opt = {
                    title: "添加" + this.name,
                    state: 2,// 1编辑 2添加
                    data: data
                }
                this.$emit('show-form', opt);
            },
            // 删除节点
            remove(data) {
                this.$emit('delete-data', data);
            },

            getData() {
                if (!this.url) {
                    return;
                }
                ajax.get(this.url, this.params).then((res) => {
                    if (res && res.status === 0) {
                        this.data = res.data;
                        this.$nextTick(_ => {
                            this.$refs[this.treeName].filter(this.filterText);
                        });
                    }
                })
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            // showAddChild(data) {
            //     return ['10', '20'].indexOf(data.id) < 0;
            // }
        },
        mounted() {
            this.getData();
        },
    }
</script>

<style lang="scss" scoped>
    .custom-tree-node {
        display: flex;
        width: calc(100% - 25px);
        justify-content: space-between;
        align-items: center;

        .name-text {
            display: inline-block;
            max-width: calc(100% - 370px);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 2;
        }

        .btn-list {
            width: 350px;
            text-align: right;

            .type-text {
                float: left;
                margin-top: 6px;
            }
        }
    }
</style>
