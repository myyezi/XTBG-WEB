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
            default-expand-all>
        </el-tree>

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
                data: [],
                defaultProps: {
                    isLeaf: 'leaf',
                    children: 'children',
                    label: 'name'
                },
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
            }
        },
        methods: {
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
