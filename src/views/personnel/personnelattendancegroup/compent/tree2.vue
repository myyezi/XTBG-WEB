<template>
    <div class="tree-panel"  style="padding:20px 0">
        <el-input :placeholder="placeholder" v-model="filterText" style="padding-bottom:10px"></el-input>
        <div class="tree_two_count">
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
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        width="30">
                    </el-table-column>
                    <el-table-column
                        label="日期"
                        width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="地址"
                        show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </div>
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
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                multipleSelection: []
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
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleNodeClick(data) {
                this.isClickNode = true
                this.checkData = data
                console.log(data);
            },
            getData() {
                if (!this.url) {
                    return;
                }
                ajax.get(this.url, this.params).then((res) => {
                    if (res && res.status === 0) {
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
