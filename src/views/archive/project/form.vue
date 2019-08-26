<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <el-input v-model="searchParam.text" placeholder="指标序号/评价指标/指标分值" clearable class="zy_input" style="width:190px"></el-input>
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">重置</el-button>
            <el-button type="primary" icon="el-icon-upload" size="small" @click="exportExcel()">导入</el-button>
        </div>
        <el-radio-group v-model="isopen" style="padding:20px 20px 0">
            <el-radio :label="false">收起</el-radio>
            <el-radio :label="true">展开</el-radio>
        </el-radio-group>
        <dragTreeTable
            class="table-box"
            :data="treeData"
            :fixed="true"
            :onDrag="onTreeDataChange"
            :isdraggable="true"
            :isopen="isopen"
            :height="600">
        </dragTreeTable>
        <el-dialog title="节点新增/修改" :visible.sync="dialogFormVisible" :class="{'dialog_animation_in':dialogFormVisible,'dialog_animation_out':!dialogFormVisible}" width="200">
            <el-form :model="projectForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="类目号" prop="code">
                    <el-input v-model="projectForm.code" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类目名称" prop="name">
                    <el-input v-model="projectForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="归档文件内容" prop="content">
                    <el-input v-model="projectForm.content" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="立卷单位" prop="filingCompany">
                    <el-input v-model="projectForm.filingCompany" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="建设单位" prop="constructionDeadline">
                    <el-input v-model="projectForm.constructionDeadline" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="运行单位" prop="operationDeadline">
                    <el-input v-model="projectForm.operationDeadline" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="cancel">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="文件管理" :visible.sync="projectVisible" :class="{'dialog_animation_in':projectVisible,'dialog_animation_out':!projectVisible}" width="200" height="800px">
            <el-form :model="projectForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="归档文件" prop="code">
                    {{projectForm.id}}
                </el-form-item>
                <el-form-item label="请选择" prop="file" class="big">
                    <upload-panel :size="1" :file-list.sync="file"></upload-panel>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="cancel">确 定</el-button>
            </div>
            <div class="table-box">
                <el-table :data="Attlist" style="width: 100%">
                    <el-table-column fixed label="操作" width="120">
                        <template fixed slot-scope="{ row, column, $index }">
                            <el-button v-show="true" @click="edit(row.id)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="序号"
                        width="70px">
                        <template slot-scope="scope">
                            {{scope.$index+1}}
                        </template>
                    </el-table-column>

                    <el-table-column prop="name" sortable show-overflow-tooltip min-width="100" label="文件名称"></el-table-column>
                    <el-table-column prop="size" sortable show-overflow-tooltip min-width="100" label="文件大小"></el-table-column>
                    <el-table-column prop="creater" sortable show-overflow-tooltip min-width="100" label="上传人"></el-table-column>
                    <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="100" label="上传时间"></el-table-column>
                </el-table>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import dragTreeTable from "@/components/treeTable/dragTreeTable.vue";
    import ajax from '@/utils/request';
    import {tool} from '@/utils/common';
    import UploadPanel from '@/components/UploadPanel/index'
    export default {
        name: "treeTable",
        mixins: [tool],
        data() {
            return {
                treeData: {
                    columns: [],
                    lists: [],
                    custom_field: {
                        id: 'id',
                        lists: 'children',
                        parent_id: 'parentId'
                    }
                },
                dialogFormVisible:false,
                Attlist:[],
                projectVisible:false,
                isAddFirst:false,// 是否是增加一级节点
                operationType:'',// 操作类型
                searchParam:[],
                projectForm:{},
                file:[],
                rules: {
                    // code: [
                    //    { required: true, message: '请输入菜单名称', trigger: 'blur' },
                    //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    // ],
                    // title: [
                    //     { required: true, message: '请输入score', trigger: 'blur' },
                    //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    // ],
                },
                projectId:'',
                formData:{},
                titleImg:require('@/styles/img/add.png'),
                isopen:false,
            };
        },
        components: {
            dragTreeTable,
            UploadPanel
        },
        methods: {
            // 增加一级节点
            onAddFirst() {
                this.onAdd(1)
            },
            // 增加节点
            onAdd(data) {
                this.formData = {}
                this.isAddFirst = false
                if(data === 1) {
                    // 新增一级节点
                    this.isAddFirst = true
                } else {
                    this.formData = data
                }
                this.clearValidate('ruleForm')
                this.operationType = 'add'
                this.dialogFormVisible = true
                console.log("新增", data);
            },

            // list:更新后的数据源
            // from: 当前被拖拽的行
            // to: 目标拖拽行
            // where: 拖拽的类型，top（上面）、center（里面）、bottom（下面）
            onTreeDataChange(list, from, to, where) {
                this.treeData.lists = list;
                this.saveTemplate({
                    json:JSON.stringify(this.treeData.lists)
                })
                console.log(this.treeData.lists)
            },
            // 树形结构整个保存
            saveTemplate(data) {
                ajax.post('core/projectevaluatetemplate/saveTemplate',data).then(rs => {
                    // this.getNodeProcessing(data)
                });
            },
            // 编辑节点
            onEdit(data) {
                this.clearValidate('ruleForm')
                this.formData = data
                this.operationType = 'edit'
                this.projectForm = {
                    code:data.code,
                    name:data.name,
                    content:data.content,
                    filingCompany:data.filingCompany,
                    constructionDeadline:data.constructionDeadline,
                    operationDeadline:data.operationDeadline,
                }
                this.dialogFormVisible = true
                console.log("编辑", data);
            },
            // 删除节点
            onDelete(data) {
                let _this = this
                let str = ''
                this.operationType = 'delete'
                if (data.children&&data.children.length>0) {
                    str = '该节点下有子节点，会统一删除，确定要删除吗？'
                } else {
                    str = '确定要删除该节点吗？'
                }
                this.$confirm(str ,'提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(function() {
                    _this.deleteProject(data,_this.treeData.lists)
                }).catch(function() {
                });
            },
            onFile(data){
                this.projectVisible = true
                ajax.get('archive/project/queryAttachment/'+data.id+'').then(rs => {
                    if(rs.status === 0) {
                        if(rs.data) {
                            this.Attlist= rs.data
                        }
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                });
            },
            // 清楚弹窗内容以及警告信息
            clearValidate(formName) {
                this.projectForm = {
                    code:'',
                    name:'',
                    content:'',
                    filingCompany:'',
                    content:'',
                    operationDeadline:'',
                    constructionDeadline:'',

                }
                if(this.$refs[formName]) {
                    this.$refs[formName].clearValidate();
                }
            },
            // 确定新增或修改节点
            cancel() {
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        let newChild = this.projectForm
                        newChild.projectId=this.projectId
                        if(this.operationType === 'add') {
                            // 新增传父级id
                            newChild.parentId = this.isAddFirst?0:this.formData.id
                        } else {
                            // 编辑传id
                            newChild.parentId =this.formData.parentId;
                            newChild.id = this.formData.id
                        }
                        this.addProjectTree(newChild)
                    } else {
                        return false;
                    }
                });
            },

            // 获取树形结构
            getArchiveProjectTree() {
                ajax.get('archive/project/projectTree/',{
                    projectId:this.projectId
                }).then(rs => {
                    if(rs.status === 0) {
                        if(rs.data) {
                            this.treeData.lists = rs.data
                        }
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                });
            },
            // 树形结构添加和编辑节点
            addProjectTree(data) {
                ajax.post('archive/project',data).then(rs => {
                    if(rs.status===0){
                        this.dialogFormVisible = false
                        this.getArchiveProjectTree();
                    }
                });
            },
            // 删除节点
            deleteProject(data,node) {
                ajax.get('archive/project/remove',{id:data.id,projectId:this.projectId}).then(rs => {
                    if(rs.status===0){
                        this.getArchiveProjectTree();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: '删除异常',
                            type: 'fail'
                        });
                    }

                });
            },
        },
        mounted() {
            this.projectId = this.$route.query.id
            // 自定义树形表格表头 type的值为selection会显示展开收缩图标，为action指操作栏
            // 自定义树形表格表头 align单元格对齐方式left、center、right，默认居左对齐
            // 自定义树形表格表头 field单元格内容取值使用与this.treeData.lists中字段相对应
            this.treeData.columns = [
                {
                    title: "操作",
                    type: "action",
                    width: 200,
                    align: "left",
                    actions: [

                        {
                            text: "新增",
                            onclick: this.onAdd,
                            formatter: item => {
                                return "<i>新增 </i>";
                            }
                        },
                        {
                            text: "编辑",
                            onclick: this.onEdit,
                            formatter: item => {
                                return "<i>编辑 </i>";
                            }
                        },
                        {
                            text: "删除",
                            onclick: this.onDelete,
                            formatter: item => {
                                return "<i>删除 </i>";
                            }
                        },
                        {
                            text: "文件管理",
                            onclick: this.onFile,
                            disabledType:'1',
                            formatter: item => {
                                return "<i>文件管理 </i>";
                            }
                        }
                    ]
                },
                {
                    title: "类目号",
                    field: "code",
                    width: 200,
                    align: "center",
                },
                {
                    type: "selection",
                    title: "类目名称",
                    img:this.titleImg,
                    field: "name",
                    onclick: this.onAddFirst,
                    width: 300,
                    align: "left",
                },
                {
                    title: "归档文件内容",
                    field: "content",
                    width: 500,
                    align: "left",
                    isCutOut:true
                },
                {
                    title: "立卷单位",
                    field: "filingCompany",
                    width: 200,
                    align: "center"
                },
                {
                    title: "建设单位",
                    field: "constructionDeadline",
                    width: 200,
                    align: "center"
                },
                {
                    title: "运行单位",
                    field: "operationDeadline",
                    width: 200,
                    align: "center"
                },
                {
                    title: "已归档资料",
                    field: "indexScore",
                    width: 200,
                    align: "center"
                }
            ];
            this.getArchiveProjectTree()

        }
    };
</script>

<style lang="scss">

</style>
