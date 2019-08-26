<template>
    <div class="app-container white-bg list-panel" v-cloak >
        <div class="opertion-box">
            <el-input v-model="searchParam.text" placeholder="指标序号/评价指标/指标分值" clearable class="zy_input" style="width:190px"></el-input>
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">重置</el-button>
            <el-button type="primary" icon="el-icon-upload" size="small" @click="exportExcel()">导入</el-button>
        </div>
        <dragTreeTable
            class="table-box"
            :data="treeData"
            :fixed="true"
            :onDrag="onTreeDataChange"
            :isdraggable="true"
            :height="600">
        </dragTreeTable>
        <el-dialog title="节点修改" :visible.sync="dialogFormVisible" :class="{'dialog_animation_in':dialogFormVisible,'dialog_animation_out':!dialogFormVisible}" width="200">
            <el-form :model="templateForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="指标序号" prop="code">
                    <el-input v-model="templateForm.code" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="评价指标" prop="title">
                    <el-input v-model="templateForm.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="考核内容及评分标准" prop="content">
                    <el-input v-model="templateForm.content" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="指标分值" prop="indexScore">
                    <el-input  type="number" v-model="templateForm.indexScore" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="cancel">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import dragTreeTable from "@/components/treeTable/dragTreeTable.vue";
    import ajax from '@/utils/request';
    import {tool} from '@/utils/common'
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
                isAddFirst:false,// 是否是增加一级节点
                operationType:'',// 操作类型
                templateForm:{
                    code:'',
                    title:'',
                    content:'',
                    indexScore:'',
                },// 弹框内容
                searchParam:[],
                rules: {
                   code: [
                       { required: true, message: '请输入指标序号', trigger: 'blur' },
                   //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '请输入评价指标', trigger: 'blur' },
                    //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    indexScore: [
                        { required: true, message: '请输入指标分值', trigger: 'blur' },
                        //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                },
                tempType:1,
                tempText:'',
                formData:{},
                titleImg:require('@/styles/img/add.png')
            };
        },
        components: {
            dragTreeTable
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
            // 复制节点
            onCopy(data) {
                console.log(data)
                let _this = this
                let str = ''
                this.operationType = 'copy'
                if (data.children&&data.children.length>0) {
                    str = '该节点下有子节点，会统一复制，确定要复制吗？'
                } else {
                    str = '确定要复制该节点吗？'
                }
                this.$confirm(str ,'提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(function() {
                    _this.copyProjectevaluatetemplate(data,_this.treeData.lists)
                }).catch(function() {
                });
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
                this.templateForm = {
                    code:data.code,
                    title:data.title,
                    content:data.content,
                    indexScore:data.indexScore,
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
                    _this.deleteProjectevaluatetemplate(data,_this.treeData.lists)
                }).catch(function() {
                });
            },
            // 清楚弹窗内容以及警告信息
            clearValidate(formName) {
                this.templateForm = {
                    code:'',
                    title:'',
                    content:'',
                    indexScore:'',
                }
                if(this.$refs[formName]) {
                    this.$refs[formName].clearValidate();
                }
            },
            // 确定新增或修改节点
            cancel() {
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        let newChild = this.templateForm
                        newChild.type = this.tempType
                        if(this.operationType === 'add') {
                            // 新增传父级id
                            newChild.parentId = this.isAddFirst?0:this.formData.id
                        } else {
                            // 编辑传id
                            newChild.parentId =this.formData.parentId;
                            newChild.id = this.formData.id
                        }
                        this.addProjectevaluatetemplate(newChild)
                    } else {
                        return false;
                    }
                });
            },
            // 勾选节点
            onCheckChange(data) {
                console.log(data)
            },
            // 获取树形结构
            getTemplateTree() {
                ajax.get('core/projectevaluatetemplate/templateTree/',{
                    type:this.tempType,
                    text:this.tempText
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
            addProjectevaluatetemplate(data) {
                ajax.post('core/projectevaluatetemplate',data).then(rs => {
                    this.getNodeProcessing(data)
                });
            },
            // 删除节点
            deleteProjectevaluatetemplate(data,node) {
                ajax.post('core/projectevaluatetemplate/remove',data).then(rs => {
                    this.getNodeProcessing(data,node)
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                });
            },
            // 复制节点
            copyProjectevaluatetemplate(data,node) {
                ajax.post('core/projectevaluatetemplate/copyTemplateTree',data).then(rs => {
                    this.getNodeProcessing(data,node)
                    this.$message({
                        message: '复制成功',
                        type: 'success'
                    });
                });
            },
            // 前端删除和编辑节点时的处理（可以不用调查询接口），增加需调接口
            getNodeProcessing(data,node) {
                if(this.operationType === 'add' || this.operationType === 'copy') {
                    this.$message({
                        message: this.operationType === 'add'?'新增成功':'复制成功',
                        type: 'success'
                    });
                    this.dialogFormVisible = false
                    this.getTemplateTree()
                } else if(this.operationType === 'delete') {
                    node.forEach((item,index) => {
                        if(item.id === data.id) {
                            node.splice(index, 1);
                        } else {
                            if(item.children&&item.children.length>0) {
                                this.getNodeProcessing(data,item.children)
                            }
                        }
                    });
                    this.getTemplateTree()
                } else {
                    this.$message({
                        message: '编辑成功',
                        type: 'success'
                    });
                    this.dialogFormVisible = false
                    this.getTemplateTree()
                    // 弹窗表单修改的字段需要给formData中对应的字段附值
                    this.formData.code = data.code
                    this.formData.title = data.title
                    this.formData.content = data.content
                    this.formData.indexScore = data.indexScore
                }
            },

            handleCurrentChange(){
                this.tempText =this.searchParam.text;
                this.getTemplateTree();
            }
        },
        mounted() {
             this.tempType = this.$route.query.type
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
                            text: "复制",
                            onclick: this.onCopy,
                            formatter: item => {
                                return "<i>复制 </i>";
                            }
                        },
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
                    ]
                },
                {
                    title: "指标序号",
                    field: "code",
                    width: 200,
                    align: "left",
                },
                {
                    type: "selection",
                    title: "评价指标",
                    img:this.titleImg,
                    field: "title",
                    onclick: this.onAddFirst,
                    width: 300,
                    align: "left",
                },
                {
                    title: "考核内容及评分标准",
                    field: "content",
                    width: 500,
                    align: "left",
                     isCutOut:true
                },
                {
                    title: "指标分值",
                    field: "indexScore",
                    width: 200,
                    align: "center"
                }
            ];
            this.getTemplateTree()

        }
    };
</script>

<style lang="scss">

</style>
