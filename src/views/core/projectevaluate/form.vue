<template>
    <div class="app-container white-bg list-panel" v-cloak>

        <div class="opertion-box">
            <span>得分率：<a style="font-size:16px;font-weight:bold">{{scoreLv}}%</a></span>
<!--            <el-button style="margin-left:80%" type="primary" icon="el-icon-search" size="small" @click="save()">保存</el-button>-->
<!--            <el-button type="primary" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">取消</el-button>-->
        </div>

        <dragTreeTable
            class="table-box"
            :data="treeData"
            :fixed="true"
            :height="600">
        </dragTreeTable>
        <el-dialog title="修改评价" :visible.sync="dialogFormVisible" :class="{'dialog_animation_in':dialogFormVisible,'dialog_animation_out':!dialogFormVisible}" width="200">
            <el-form :model="templateForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="指标序号" prop="code">
                    <el-input v-model="templateForm.code" autocomplete="off" disabled ></el-input>
                </el-form-item>
                <el-form-item label="评价指标" prop="title" >
                    <el-input v-model="templateForm.title" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="考核内容及评分标准" prop="content">
                    <el-input v-model="templateForm.content" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="指标分值" prop="indexScore">
                    <el-input v-model="templateForm.indexScore" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="扣分" prop="deductScore">
                    <el-input type="number" v-model="templateForm.deductScore" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="扣分原因" prop="deductReason">
                    <el-input v-model="templateForm.deductReason" autocomplete="off"></el-input>
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
                    deductScore: [
                        { required: true, message: '请输入扣分', trigger: 'blur' },
                        //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    deductReason: [
                        { required: true, message: '请输入扣分原因', trigger: 'blur' },
                       // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                },
                tempType:1,
                projectEvaluateId:'',
                projectId:'',
                formData:{},
                scoreLv:0,
                titleImg:require('@/styles/img/add.png')
            };
        },
        components: {
            dragTreeTable
        },
        methods: {
            save(){
                ajax.post('core/projectevaluatedetail/createProjectevaluatedetail',{
                    type:this.tempType,
                    projectId:this.projectId,
                    projectEvaluateId:this.projectEvaluateId,
                    json:JSON.stringify(this.treeData.lists)
                }).then(rs => {
                    if(rs.status === 0) {
                        if(rs.data) {
                            this.treeData.lists = rs.data
                            this.projectEvaluateId=2
                        }
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
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
                    deductScore:data.deductScore,
                    deductReason:data.deductReason,
                }
                    this.dialogFormVisible = true
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
            // 确定修改节点
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
                            newChild.id = this.formData.id
                        }
                        this.dialogFormVisible = false
                        // 弹窗表单修改的字段需要给formData中对应的字段附值
                       // data = this.newChild;
                        this.formData.code = newChild.code
                        this.formData.title = newChild.title
                        this.formData.content = newChild.content
                        this.formData.indexScore = newChild.indexScore
                        this.formData.deductScore = newChild.deductScore
                        this.formData.deductReason = newChild.deductReason
                        this.updateScore(this.formData);
                    } else {
                        return false;
                    }
                });
            },

            updateScore(data){
                ajax.post('core/projectevaluatedetail',data
                ).then(rs => {
                    if(rs.status === 0) {
                        this.initializaModel();
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                });
            },
            // 获取树形结构
            getTemplateTree() {
                ajax.get('core/projectevaluatetemplate/templateTree',{
                    type:this.tempType,
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
            // 获取树形结构
            getDetailTree() {
                ajax.get('core/projectevaluatedetail/detailTree?projectEvaluateId='+this.projectEvaluateId+''
                ).then(rs => {
                    if(rs.status === 0) {
                        if(rs.data.treeList) {
                            this.treeData.lists = rs.data.treeList
                        }
                        this.scoreLv = rs.data.score;
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                });
            },

                //初始化数据模型
            initializaModel(){
                //判断如果是已评价的则查询评价明细，未评价的则查看模板
                console.log(this.projectEvaluateId+"*******")
                if(this.projectEvaluateId =='null'){
                    ajax.get('core/projectevaluatetemplate/templateTree',{
                        type:this.tempType,
                    }).then(rs => {
                        if(rs.status === 0) {
                            if(rs.data) {
                                this.treeData.lists = rs.data
                                ajax.post('core/projectevaluatedetail/createProjectevaluatedetail',{
                                    type:this.tempType,
                                    projectId:this.projectId,
                                    projectEvaluateId:this.projectEvaluateId,
                                    json:JSON.stringify(this.treeData.lists)
                                }).then(rs => {
                                    if(rs.status === 0) {
                                        if(rs.data) {
                                            this.projectEvaluateId=rs.data
                                            this.getDetailTree();
                                        }
                                    } else {
                                        this.$message({
                                            message: res.msg,
                                            type: 'error'
                                        });
                                    }
                                });
                            }
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    });

                }else{
                    this.getDetailTree();
                }

            }

        },
        mounted() {
            //判断评价类型
            if(~this.$route.fullPath.indexOf("projectevaluatePro")){
                this.tempType =  1;
            }
            if(~this.$route.fullPath.indexOf("projectevaluateSup")){
                this.tempType = 2;
            }
            if(~this.$route.fullPath.indexOf("projectevaluateCon")){
                this.tempType =  3;
            }
            this.projectEvaluateId = this.$route.query.projectEvaluateId;
            this.projectId = this.$route.query.projectId;
            // 自定义树形表格表头 type的值为selection会显示展开收缩图标，为action指操作栏
            // 自定义树形表格表头 align单元格对齐方式left、center、right，默认居左对齐
            // 自定义树形表格表头 field单元格内容取值使用与this.treeData.lists中字段相对应
            this.treeData.columns = [
                {
                    title: "操作",
                    type: "action",
                    width: 100,
                    align: "center",
                    actions: [
                        {
                            text: "编辑",
                            disabledType:1,
                            onclick: this.onEdit,
                            formatter: item => {
                                return "<i>编辑 </i>";
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
                  //  img:this.titleImg,
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
                },
                {
                    title: "扣分",
                    field: "deductScore",
                    width: 200,
                    align: "center"
                },
                {
                    title: "扣分原因",
                    field: "deductReason",
                    width: 200,
                    align: "center"
                }
            ];

            this.initializaModel()

        }
    };
</script>

<style lang="scss">

</style>
