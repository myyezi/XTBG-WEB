<template>
    <div class="tree-panel"  style="padding:20px 0">
        <el-input :placeholder="placeholder" v-model="filterText" style="padding-bottom:10px"></el-input>
        <div class="tree_two_count" v-loading="loadings">
            <el-tree
                class="tree_two_count_left"
                :data="data"
                node-key="id"
                :props="defaultProps"
                ref="treeNameTwo"
                :expand-on-click-node="true"
                :filter-node-method="filterNode"
                @node-click="handleNodeClick"
                default-expand-all>
            </el-tree>
            <div class="tree_two_count_right">
                <p v-if="checkData.name">{{checkData.name}}</p>
                <el-table
                    v-if="isClickNode"
                    ref="multipleTable"
                    :data="tableData"
                    style="width: 100%"
                    max-height="360"
                    :row-class-name="tableRowClassName"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        :selectable="checkSelectable"
                        width="30">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        label="联系方式"
                        width="120">
                        <template slot-scope="scope">{{ scope.row.account }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="email"
                        label="员工状态"
                        show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<style>
    .el-table .warning-row {
        background: #CCCCCC;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
</style>

<script>
    import ajax from '@/utils/request'
    import {tool} from '@/utils/common'

    export default {
        name: 'tree-panel',
        mixins: [tool],
        props: ['selectionAll','url','attendanceGroupId','selectionAllDisable'],
        data() {
            return {
                placeholder: "请输入名称过滤",
                filterText: '',// 搜索关键字
                data: [],
                isClickNode:false,
                checkData:{},
                defaultProps: {
                    isLeaf: 'leaf',
                    children: 'children',
                    label: 'name'
                },
                loadings:false,
                tableData: [],
                multipleSelection: [],
                multipleSelectionAll:[],
                idKeyArr: [], //最后需要保存的id
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
                this.$refs.treeNameTwo.filter(val);
            },
            selectionAll(val){
                this.multipleSelectionAll =val;
            }
        },
        methods: {
            checkSelectable(row){
                for (let i = 0; i <this.selectionAllDisable.length ; i++) {
                    if (this.selectionAllDisable[i].employeeId == row.employeeId) {
                        if (this.attendanceGroupId != this.selectionAllDisable[i].attendanceGroupId) {
                            return false;
                        }
                    }
                }
                return true;
            },

            tableRowClassName({row, rowIndex}) {
                for (let i = 0; i <this.selectionAllDisable.length ; i++) {
                    if (this.selectionAllDisable[i].employeeId == row.employeeId) {
                        if (this.attendanceGroupId != this.selectionAllDisable[i].attendanceGroupId) {
                            return 'warning-row';
                        }
                    }
                }
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            handleNodeClick(data) {
                this.changePageCoreRecordData()
                this.loadings = true
                this.isClickNode = true
                this.checkData = data
                ajax.get('upms/organization/getOrganizationUserList/' + this.checkData.id).then(rs => {
                    this.tableData = rs.data;
                    this.loadings = false
                    setTimeout(() => {
                        this.setSelectRow();
                    }, 0);
                });

            },
            // 设置选中的方法
            setSelectRow() {
                if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
                    return;
                }
                // 标识当前行的唯一键的名称
                let idKey = 'employeeId';
                // 所有勾选唯一键的集合
                let selectAllIds = [];
                this.multipleSelectionAll.forEach(row => {
                    selectAllIds.push(row[idKey]);
                });
                // 先清除所有的勾选
                this.$refs.multipleTable.clearSelection();
                // 循环去判断当前页是否有勾选的数据并勾选有的
                for (var i = 0; i < this.tableData.length; i++) {
                    if (selectAllIds.indexOf(this.tableData[i][idKey]) >= 0) {
                        // 设置选中，记住table组件需要使用ref="multipleTable"
                        this.$refs.multipleTable.toggleRowSelection(
                            this.tableData[i]
                        );
                    }
                }
            },
            // 记忆选择
            changePageCoreRecordData() {
                console.log(this.multipleSelectionAll)
                // 标识当前行的唯一键的名称
                let idKey = 'employeeId';
                // 如果总记忆中还没有选择的数据，那么就直接取当前table选中的数据，不需要后面一系列计算
                if (this.multipleSelectionAll.length <= 0) {
                    this.multipleSelectionAll = this.multipleSelection;
                    // 所有勾选数据的唯一键
                    this.idKeyArr = [];
                    this.multipleSelectionAll.forEach(row => {
                        this.idKeyArr.push(row[idKey]);
                    });
                    return;
                }
                // 所有勾选唯一键的集合
                let selectAllIds = [];
                this.multipleSelectionAll.forEach(row => {
                    selectAllIds.push(row[idKey]);
                });
                // 获取当前table选中的唯一键
                let selectIds = [];
                this.multipleSelection.forEach(row => {
                    selectIds.push(row[idKey]);
                    // 如果总选择里面不包含当前table选中的数据，那么就加入到总选择集合里
                    if (selectAllIds.indexOf(row[idKey]) < 0) {
                        this.multipleSelectionAll.push(row);
                    }
                });
                // 得到当前table没有选中的唯一键
                let noSelectIds = [];
                this.tableData.forEach(row => {
                    if (selectIds.indexOf(row[idKey]) < 0) {
                        noSelectIds.push(row[idKey]);
                    }
                });
                noSelectIds.forEach(id => {
                    if (selectAllIds.indexOf(id) >= 0) {
                    for (let i = 0; i < this.multipleSelectionAll.length; i++) {
                        if (this.multipleSelectionAll[i][idKey] == id) {
                            // 如果总选择中有未被选中的，那么就删除这条
                            this.multipleSelectionAll.splice(i, 1);
                            break;
                        }
                    }
                    }
                });
                // 所有勾选数据的userId
                this.idKeyArr = [];
                this.multipleSelectionAll.forEach(row => {
                    this.idKeyArr.push(row[idKey]);
                });
                console.log(this.idKeyArr);
            },


            getData() {
                if (!this.url) {
                    return;
                }
                ajax.get(this.url, this.params).then((res) => {
                    if (res && res.status === 0) {
                        console.log(res.data.children)
                        this.data = res.data;
                    }
                })
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },

        },
        mounted() {
            console.log(this.selectionAll)
            this.getData();
        },
    }
</script>

<style lang="scss" scoped>
    .tree_two_count {
        display: flex;
        .tree_two_count_left {
            max-height: 360px;
            overflow: auto;
            margin-right:20px;
            width:300px;
        }
        .tree_two_count_right {
            flex-grow: 1;
            p {
                height:30px;
                line-height: 30px;
            }
        }
    }
</style>
