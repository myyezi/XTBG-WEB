<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <el-input v-model="searchParam.keyWord" placeholder="类目号/类目名称/归档文件内容" clearable class="zy_input" style="width:220px"></el-input>
            <el-button type="primary" icon="el-icon-search" size="small" @click="getDragTree">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="small" @click="approvalTime=[];resetList()">重置</el-button>
            <el-button type="primary" icon="el-icon-upload" size="small" @click="importExcel()">导入</el-button>
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
            :isopen= "isopen"
            :height="600">
        </dragTreeTable>
        <el-dialog width="40%" title="节点修改" :visible.sync="dialogFormVisible" :class="{'dialog_animation_in':dialogFormVisible,'dialog_animation_out':!dialogFormVisible}" >
            <el-form :model="projectTemplateForm" :rules="rules" ref="ruleForm" label-width="150px">
                <el-form-item label="上级节点名称" prop="parentName" v-show="parentNameVisible">
                    <el-input v-model="projectTemplateForm.parentName" disabled ></el-input>
                </el-form-item>
                <el-form-item label="类目号" prop="code">
                    <el-input v-model="projectTemplateForm.code" autocomplete="off" maxlength="36"></el-input>
                </el-form-item>
                <el-form-item label="类目名称" prop="name">
                    <el-input v-model="projectTemplateForm.name" autocomplete="off" maxlength="100"></el-input>
                </el-form-item>
                <el-form-item label="归档文件内容" prop="content">
                    <el-input v-model="projectTemplateForm.content" autocomplete="off" maxlength="200"></el-input>
                </el-form-item>
                <el-form-item label="立卷单位" prop="filingCompany">
                    <el-input v-model="projectTemplateForm.filingCompany" autocomplete="off" maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="建设单位保管期限" prop="constructionDeadline">
                    <el-input v-model="projectTemplateForm.constructionDeadline" autocomplete="off" maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="运行单位保管期限" prop="operationDeadline">
                    <el-input v-model="projectTemplateForm.operationDeadline" autocomplete="off" maxlength="50"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="ok">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import dragTreeTable from "@/components/treeTable/dragTreeTable.vue";
    import ajax from '@/utils/request';
    import {tool} from '@/utils/common'

    export default {
        name: 'ArchiveProjectTemplate',
        mixins: [tool],
        data() {
            return {
                searchParam : {},
                treeData: {
                    columns: [],
                    lists: [],
                    custom_field: {
                        id : 'id',
                        lists : 'children',
                        parent_id : 'parentId',
                        order : 'sortNum'
                    }
                },
                dialogFormVisible : false,
                parentNameVisible : false,
                projectTemplateForm : {},
                rules: {
                    code: [
                        { required: true, message: '请输入类目号', trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '请输入类目名称', trigger: 'blur' },
                    ],
                },
                titleImg : require('@/styles/img/add.png'),
                isopen:false,
                isAddRootNode : false,
                operateType : "",
                selectForm :{},
                showSearch: false,
                showAddBtn: this.getCurrentUserAuthority("/archive/projecttemplate/add"),
                showEditBtn: this.getCurrentUserAuthority("/archive/projecttemplate/edit")
            }
        },
        components: {
            dragTreeTable
        },
        mounted() {
            // 自定义树形表格表头 type的值为selection会显示展开收缩图标，为action指操作栏
            // 自定义树形表格表头 align单元格对齐方式left、center、right，默认居左对齐
            // 自定义树形表格表头 field单元格内容取值使用与this.treeData.lists中字段相对应
            this.treeData.columns = [
                {
                    title: "操作",
                    type: "action",
                    width: 300,
                    align: "left",
                    actions: [
                        {
                            text: "复制",
                            onclick: this.copyNode,
                            formatter: item => {
                                return "<i>复制 </i>";
                            }
                        },
                        {
                            text: "新增",
                            onclick: this.addNode,
                            formatter: item => {
                                return "<i>新增 </i>";
                            }
                        },
                        {
                            text: "编辑",
                            onclick: this.editNode,
                            formatter: item => {
                                return "<i>编辑 </i>";
                            }
                        },
                        {
                            text: "删除",
                            onclick: this.deleteNode,
                            formatter: item => {
                                return "<i>删除 </i>";
                            }
                        },
                    ]
                },
                {
                    title: "类目号",
                    field: "code",
                    img : this.titleImg,
                    onclick: this.addRootNode,
                    width: 200,
                    align: "left",
                },
                {
                    type: "selection",
                    title: "类目名称",
                    field: "name",
                    img : this.titleImg,
                    onclick: this.addRootNode,
                    width: 200,
                    align: "left",
                },
                {
                    title: "归档文件内容",
                    field: "content",
                    width: 350,
                    align: "center",
                },
                {
                    title: "立卷单位",
                    field: "filingCompany",
                    width: 200,
                    align: "center",
                    isCutOut:true
                },
                {
                    title: "建设单位保存期限",
                    field: "constructionDeadline",
                    width: 200,
                    align: "center",
                    isCutOut:true
                },
                {
                    title: "运行单位保存期限",
                    field: "operationDeadline",
                    width: 200,
                    align: "center",
                    isCutOut:true
                },

            ];
            this.getDragTree();
        },
        methods: {
            getDragTree() {
                ajax.get('archive/projecttemplate/getArchiveTree/',this.searchParam).then(rs => {
                    if(rs.status === 0) {
                        if(rs.data) {
                            this.treeData.lists = rs.data
                        }
                    } else {
                        this.$message({
                            message: rs.msg,
                            type: 'error'
                        });
                    }
                });
            },
            expand(){
                if (this.isopen == false){
                    this.isopen = true;
                }else{
                    this.isopen = false;
                }
                console.info(this.isopen);
            },
            addRootNode(){
                this.addNode(1);
            },
            addNode(data){
                this.operateType = "add";
                this.isAddRootNode = false;
                this.clearValidate('ruleForm');
                this.dialogFormVisible = true;
                if(data == 1){
                    this.isAddRootNode = true;
                    this.parentNameVisible = false;
                }else{
                    this.selectForm = data;
                    this.parentNameVisible = true;
                    this.projectTemplateForm.parentName = data.name;
                }
            },
            copyNode(data){
                this.operateType = "copy";
                let _$this = this;
                let messageStr = "";
                if (data.children && data.children.length>0) {
                    messageStr = '该节点下有子节点，会统一复制，确定要复制吗？'
                } else {
                    messageStr = '确定要复制该节点吗？'
                }
                this.$confirm(messageStr ,'提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(function() {
                    _$this.copy(data, _$this.treeData.lists);
                }).catch(function() {
                });
            },
            editNode(data){
                console.info(data);
                this.operateType = "edit";
                this.clearValidate('ruleForm');
                this.dialogFormVisible = true;
                if (data.parentId && data.parentId == "0"){
                    this.parentNameVisible = false;
                }else{
                    this.parentNameVisible = true;
                }
                this.selectForm = data;
                this.projectTemplateForm = {
                    code : data.code,
                    name : data.name,
                    parentName : data.parentName,
                    content : data.content,
                    filingCompany : data.filingCompany,
                    constructionDeadline : data.constructionDeadline,
                    operationDeadline : data.operationDeadline,
                    sortNum : data.sortNum,
                }
            },
            deleteNode(data){
                this.operateType = "delete";
                let _$this = this;
                let messageStr = "";
                if (data.children && data.children.length>0) {
                    messageStr = '该节点下有子节点，会统一删除，确定要删除吗？'
                } else {
                    messageStr = '确定要删除该节点吗？'
                }
                this.$confirm(messageStr ,'提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(function() {
                    _$this.delete(data, _$this.treeData.lists);
                }).catch(function() {
                });
            },
            // list:更新后的数据源
            // from: 当前被拖拽的行
            // to: 目标拖拽行
            // where: 拖拽的类型，top（上面）、center（里面）、bottom（下面）
            onTreeDataChange(list, from, to, where) {
                this.treeData.lists = list;
                this.saveTree({
                    json:JSON.stringify(this.treeData.lists)
                })
                console.log(this.treeData.lists)
            },

            // 树形结构整个保存
            saveTree(data) {
                ajax.post('archive/projecttemplate/saveTree',data).then(rs => {
                    console.info(data);
                    if (rs.status == 0){
                        this.$message.success(rs.msg);
                        this.getDragTree();
                    } else {
                        this.$message.error(rs.msg);
                    }
                });
            },

            // 清楚弹窗内容以及警告信息
            clearValidate(form) {
                this.projectTemplateForm = {
                    name:'',
                    period:'',
                    stage:'',
                }
                if(this.$refs[form]) {
                    this.$refs[form].clearValidate();
                }
            },
            ok(){
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        if(this.operateType == 'add') {
                            this.projectTemplateForm.parentId = this.isAddRootNode ? "0" : this.selectForm.id;
                        } else {
                            this.projectTemplateForm.parentId = this.selectForm.parentId;
                            this.projectTemplateForm.id = this.selectForm.id
                        }
                        this.save(this.projectTemplateForm);
                    } else {
                        return false;
                    }
                });
            },
            save(formData){
                ajax.post('archive/projecttemplate',formData).then(rs => {
                    if (rs.status == 0){
                        this.$message .success(rs.msg);
                        this.dialogFormVisible = false;
                        this.getDragTree();
                    } else {
                        this.$message.error(rs.msg);
                    }
                });
            },
            copy(data){
                ajax.post('archive/projecttemplate/copy',data).then(rs => {
                    if (rs.status == 0) {
                        this.$message.success(rs.msg);
                        this.getDragTree();
                    } else {
                        this.$message.error(rs.msg);
                    }
                });
            },
            delete(data){
                ajax.post('archive/projecttemplate/delete', data).then(rs => {
                    if (rs.status == 0) {
                        this.$message.success(rs.msg);
                        this.getDragTree();
                    } else {
                        this.$message.error(rs.msg);
                    }
                });
            },

        }
    }
</script>
