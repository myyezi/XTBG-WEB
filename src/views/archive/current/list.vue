<template>
    <div class="app-container white-bg list-panel" v-cloak>

        <div class="opertion-box">
            <el-input v-model="searchParam.name" placeholder="请输入文件名称" clearable class="zy_input" style="width:190px"></el-input>
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">刷新</el-button>
        </div>

        <dragTreeTable
            class="table-box"
            :data="treeData"
            :fixed="true"
            :height="600">
        </dragTreeTable>
        <el-dialog title="文件夹节点新增/编辑" :visible.sync="dialogFormVisible" :class="{'dialog_animation_in':dialogFormVisible,'dialog_animation_out':!dialogFormVisible}" width="200">
            <el-form :model="archivePersonForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="文件夹名称" prop="folderName">
                    <el-input v-model="archivePersonForm.name" autocomplete="off" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="cancel">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="文件新增" :visible.sync="dialogFormVisibleWj" :class="{'dialog_animation_in':dialogFormVisibleWj,'dialog_animation_out':!dialogFormVisibleWj}" width="200">
            <el-form :model="archivePersonWJForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="文件目录" prop="name">
                    <el-input v-model="archivePersonWJForm.name" autocomplete="off"  disabled></el-input>
                </el-form-item>
                <el-form-item label="请选择" prop="img" class="big">
                    <upload-panel :size="1" :file-list.sync="file"></upload-panel>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleWj = false">取 消</el-button>
                <el-button type="primary" @click="save()">确 定</el-button>
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
                dialogFormVisibleWj:false,
                archivePersonForm:{
                    name:'',
                    id:''
                },// 文件夹表单
                archivePersonWJForm:{
                    name:'',
                },// 文件表单
                searchParam:[],
                rules: {
                    // code: [
                    //     { required: true, message: '请输入菜单名称', trigger: 'blur' },
                    //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    // ],
                    // title: [
                    //     { required: true, message: '请输入score', trigger: 'blur' },
                    //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    // ],
                },
                formData:{},
                file: [],
                titleImg:require('@/styles/img/add.png'),
                name:''
            };
        },
        components: {
            dragTreeTable,
            UploadPanel
        },
        methods: {
            // 增加文件夹
            onAddFirst() {
                this.clearValidate('ruleForm')
                this.formData={},
                    this.dialogFormVisible = true
            },
            // 增加文件
            onAdd(data) {
                this.clearValidate('ruleForm')
                this.formData = data
                this.archivePersonWJForm.name =data.folderName;
                this.dialogFormVisibleWj = true
            },

            //查询按钮查询
            handleCurrentChange(){
                this.name =this.searchParam.name;
                this.getArchiveCurrentTree();
            },

            //保存文件
            save(){
                let data ={};
                data.path=this.file[0].path;
                data.size=this.file[0].size;
                data.suffix=this.file[0].suffix;
                data.name=this.file[0].name;
                data.sourceId=this.formData.id;
                ajax.post('archive/person/saveDetail',data).then(rs => {
                    if(rs.status === 0) {
                        this.dialogFormVisibleWj = false
                        this.getArchiveCurrentTree();
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                });
            },
            // 编辑文件
            onEdit(data) {
                this.clearValidate('ruleForm')
                this.formData = data
                console.log(data)
                if(data.isLast===0) {
                    this.archivePersonForm = {
                        name: data.folderName,
                    }
                }else{
                    this.archivePersonForm = {
                        name: data.name,
                    }
                }
                this.dialogFormVisible = true
            },
            // 树形结构添加和编辑节点
            addarchiveCurrent(data) {
                ajax.post('archive/current',data).then(rs => {
                    this.getArchiveCurrentTree();
                });
            },

            // 树形结构添加和编辑节点
            addarchiveCurrentDetail(data) {
                ajax.post('archive/person/saveDetail',data).then(rs => {
                    this.getArchiveCurrentTree();
                });
            },

            // 删除节点
            onDelete(data) {
                let _this = this
                let str = ''
                if (data.isLast===0) {
                    str = '该文件夹下文件会统一删除，确定要删除吗？'
                } else {
                    str = '确定要删除该文件吗？'
                }
                this.$confirm(str ,'提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(function() {
                    _this.deletePersionArchive(data,_this.treeData.lists)
                }).catch(function() {
                });
            },

            // 删除节点
            deletePersionArchive(data,node) {
                ajax.get('archive/current/remove',{
                    id:data.id,
                    type:data.isLast
                }).then(rs => {
                    this.getArchiveCurrentTree();
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                });
            },
            // 清楚弹窗内容以及警告信息
            clearValidate(formName) {
                this.archivePersonForm = {
                    folderName:'',
                    id:'',
                }
                if(this.$refs[formName]) {
                    this.$refs[formName].clearValidate();
                }
            },
            // 确定修改节点
            cancel() {
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        let newChild = this.archivePersonForm
                        console.log(newChild)
                        this.dialogFormVisible = false
                        console.log(this.formData)
                        // 弹窗表单修改的字段需要给formData中对应的字段附值
                        this.formData.name = newChild.name
                        newChild.id = this.formData.id
                        //判断是否为文件
                        if(this.formData.isLast===1){
                            this.addarchiveCurrentDetail(newChild)
                        }else{
                            this.addarchiveCurrent(newChild);
                        }
                    } else {
                        return false;
                    }
                });
            },

            //预览
            onPreview(data) {
                    if(data.suffix==='xls'|| data.suffix==='doc' || data.suffix==='pptx') {
                        window.open('https://view.officeapps.live.com/op/view.aspx?src=https://dev.zdsxc.com/' + data.path)
                    }else{
                        console.log(data)
                        window.open('https://dev.zdsxc.com/'+data.path)
                    }
            },


            //下载
            onDownLoad(data) {
                // window.location.href='https://dev.zdsxc.com/'+data.path;
                ajax.get('archive/person/downLoad'
                ).then(rs => {

                });
            },


            // 获取树形结构
            getArchiveCurrentTree() {
                ajax.get('archive/current/getArchiveCurrentTree',{name:name}
                ).then(rs => {
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

        },
        mounted() {
            // 自定义树形表格表头 type的值为selection会显示展开收缩图标，为action指操作栏
            // 自定义树形表格表头 align单元格对齐方式left、center、right，默认居左对齐
            // 自定义树形表格表头 field单元格内容取值使用与this.treeData.lists中字段相对应
            // disabledType 为 1 只有最后一级能操作，为 2 只有最后一级不能操作
            this.treeData.columns = [
                {
                    title: "操作",
                    type: "action",
                    width: 200,
                    align: "center",
                    actions: [
                        {
                            text: "新增",
                            disabledType:2,
                            onclick: this.onAdd,
                            formatter: item => {
                                return "<i>新增 </i>";
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
                            text: "编辑",
                            onclick: this.onEdit,
                            formatter: item => {
                                return "<i>编辑 </i>";
                            }
                        } ,{
                            text: "预览",
                            disabled:true,
                            disabledType:1,
                            onclick: this.onPreview,
                            formatter: item => {
                                return "<i>预览 </i>";
                            }
                        }, {
                            text: "下载",
                            onclick: this.onDownLoad,
                            formatter: item => {
                                return "<i>下载 </i>";
                            }
                        }
                    ]
                },
                {
                    title: "文件夹名称",
                    img:this.titleImg,
                    type:'selection',
                    onclick: this.onAddFirst,
                    field: "folderName",
                    width: 200,
                    align: "left",
                    formatter: item => {
                        if(item.isLast===0) {
                            return '<img src="static/wjj.png" style="width:16px;height:16px;margin: -2px 5px 0;vertical-align: middle;"/>'+item.folderName;
                        } else {
                            return item.folderName;
                        }
                    }
                },
                {
                    title: "文件名称",
                    field: "name",
                    width: 500,
                    align: "center",
                    isCutOut:true
                },
                {
                    title: "文件类型",
                    field: "suffix",
                    width: 200,
                    align: "center"
                },
                {
                    title: "文件大小",
                    field: "size",
                    width: 200,
                    align: "center"
                },
                {
                    title: "创建人",
                    field: "creater",
                    width: 200,
                    align: "center"
                },
                {
                    title: "创建时间",
                    field: "createTime",
                    width: 200,
                    align: "center"
                }
            ];

            this.getArchiveCurrentTree()

        }
    };
</script>

<style lang="scss">

</style>
