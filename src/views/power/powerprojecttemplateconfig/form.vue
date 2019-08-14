<template>
    <div class="app-container white-bg list-panel" v-cloak>
        <div class="opertion-box">
            <label class="control-label">项目类型</label>
            <el-select v-model="searchParam.type" placeholder="请选择项目类型" clearable style="width:190px">
                <el-option v-for="e in projectTypeList"  :key="e.value" :label="e.text" :value="e.value" ></el-option >
            </el-select>
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

        <el-dialog title="项目计划模板" :visible.sync="dialogFormVisible" width="35%">
            <el-form :model="templateConfigForm" :rules="rules" ref="ruleForm" label-width="120px">
                <el-form-item label="工作内容" prop="name">
                    <el-input v-model.trim="templateConfigForm.name" autocomplete="off" maxlength="50" class="overall_situation_input_icon" clearable show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="工期" prop="period">
                    <el-input v-model="templateConfigForm.period" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="专业" prop="profession">
                    <el-input v-model.trim="templateConfigForm.profession" autocomplete="off" maxlength="50" class="overall_situation_input_icon" clearable show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="工程阶段" prop="stage">
                    <el-select v-model="templateConfigForm.stage" placeholder="请选择项目类型" clearable>
                        <el-option v-for="e in stageList"  :key="e.value" :label="e.text" :value="e.value" ></el-option >
                    </el-select>
                </el-form-item>
                <el-form-item label="是否审批" prop="isApproval">
                    <el-radio v-model="templateConfigForm.isApproval" :label="1">是</el-radio>
                    <el-radio v-model="templateConfigForm.isApproval" :label="0">否</el-radio>
                </el-form-item>
                <el-form-item label="是否上传文件" prop="indexScore">
                    <el-radio v-model="templateConfigForm.isUpload" :label="1">是</el-radio>
                    <el-radio v-model="templateConfigForm.isUpload" :label="0">否</el-radio>
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
import ajax from '@/utils/request'
import { tool, ruleTool } from '@/utils/common'
import dragTreeTable from "@/components/treeTable/dragTreeTable.vue";

export default {
  mixins: [tool, ruleTool],
  components: {},
  data() {
    return {
        templateConfigForm : {
            isApproval : 1,
            isUpload : 1,
        },
        formData : {
            name : "",
            period : null,
            profession : "",
            stage : null,
            isApproval : null,
            isUpload : null
        },
        projectTypeList : [],
        stageList : [],
        treeData: {
            columns: [],
            lists: [],
            custom_field: {
                id: 'id',
                lists: 'children',
                parent_id: 'parentId',
                order : 'sortNum'
            }
        },
        isopen : false,
        addImg : require('@/styles/img/icon-img/add.png'),
        editImg : require('@/styles/img/icon-img/edit.png'),
        deletedImg : require('@/styles/img/icon-img/deleted.png'),
        operateType : "",
        projectType : "",
        dialogFormVisible : false,
        rules: {
            name: [
              { required: true, message: '请输入工作内容', trigger: ['blur'] }
            ],
            stage: [
              { required: true, message: '请选择工程阶段', trigger: ['change'] }
            ],
            period: [
              { required: true, message: '请输入工期', trigger: ['blur'] }
            ],
            profession: [
              { required: true, message: '请输入专业', trigger: ['blur'] }
            ],
        }
    }
  },
  components: {
      dragTreeTable,
  },

mounted() {
    this.projectType = this.$route.query.projectType;
    this.operateType = this.$route.query.operateType;
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
                    onclick: this.addNode,
                    formatter: item => {
                        return "<img src='" + this.addImg + "' title='新增' style='margin-right:15px;vertical-align: middle;'/>";
                    }
                },
                {
                    text: "删除",
                    onclick: this.deleteNode,
                    formatter: item => {
                        return "<img src='" + this.deletedImg + "' title='删除' style='margin-right:15px;vertical-align: middle;'/>";
                    }
                },
            ]
        },
        {
            title: "工作内容",
            field: "name",
            img : this.addImg,
            onclick: this.onAddFirst,
            width: 340,
            align: "left",
        },
        {
            title: "工期",
            field: "period",
            width: 120,
            align: "left",
        },
        {
            title: "专业",
            field: "profession",
            width: 180,
            align: "center",
        },
        {
            title: "所属阶段",
            field: "stage",
            width: 180,
            align: "center",
            isCutOut:true,
            formatter: item => {
                let str = ''
                this.stageList.forEach((data) => {
                    if(data.value==item.stage) {
                        str = data.text
                    }
                })
                return str
            }
        },
        {
            title: "是否审批",
            field: "isApproval",
            width: 120,
            align: "left",
            isCutOut:true,
            formatter: item => {
                return item.isApproval==1?'是':'否'
            }
        },
        {
            title: "是否上传文件",
            field: "isUpload",
            width: 120,
            align: "left",
            isCutOut:true,
            formatter: item => {
                return item.isUpload==1?'是':'否'
            }
        },
    ];
    this.getDragTree();
    this.getProjectType();
    this.getStageList();
},
methods: {
    getProjectType() {
        let type = "XMLX";
        ajax.get('upms/dict/type/'+type).then(rs => {
            if (rs.length > 0) {
                this.projectTypeList = rs;
            }
        });
    },
    getStageList() {
        let type = "GCJD";
        ajax.get('upms/dict/type/'+type).then(rs => {
            if (rs.length > 0) {
                this.stageList = rs;
            }
        });
    },
    getDragTree(data) {
        ajax.get('power/powerprojecttemplateconfig/templateConfigTree/',{
            templateId : this.templateId,
            type : this.searchParam.type,
        }).then(rs => {
            if(rs.status === 0) {
                if(rs.data) {
                    this.treeData.lists = rs.data;
                    if (data == 0){
                        this.isopen = true;
                    }
                }
            } else {
                this.$message({
                    message: rs.msg,
                    type: 'error'
                });
            }
        });
    },

    //进入编辑页调用 bean为列表页传入数据
    open() {
        if (this.$route.query.id) {
            ajax.get('project/powerprojecttemplateconfig/' + this.$route.query.id).then(rs => {
                this.powerprojecttemplateconfigForm = rs.data;
                if (null != rs.data.img && rs.data.img.length > 0) {
                    this.img = JSON.parse(rs.data.img);
                }
            });
        }
    },

    // 增加一级节点
    onAddFirst() {
        this.onAdd(1)
    },
    // 增加节点
    onAdd(data) {
        this.formData = {};
        this.isAddFirst = false;
        if(data === 1) {
            this.isAddFirst = true;
        } else {
            this.formData = data;
        }
        this.clearValidate('ruleForm')
        this.operationType = 'add';
        this.dialogFormVisible = true;
    },
    // 编辑节点
    onEdit(data) {
        this.clearValidate('ruleForm');
        this.formData = data;
        this.operationType = 'edit';
        this.templateConfigForm = {
            name : data.name,
            period : data.period,
            profession : data.profession,
            stage : data.stage,
            isApproval : data.isApproval,
            isUpload : data.isUpload,
        }
        this.dialogFormVisible = true;
        console.log("编辑", data);
    },
    // 删除节点
    onDelete(data) {
        let _this = this;
        let str = ''
        this.operationType = 'delete';
        if (data.children&&data.children.length>0) {
            str = '该节点下有子节点，会统一删除，确定要删除吗？';
        } else {
            str = '确定要删除该节点吗？';
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
    // 点击单元格事件
    onClickCell(data) {
        console.log(data)
    },
    // 清楚弹窗内容以及警告信息
    clearValidate(formName) {
        this.templateConfigForm = {
            name : "",
            period : null,
            profession : "",
            stage : null,
            isApproval : 1,
            isUpload : 1
        }
        if(this.$refs[formName]) {
            this.$refs[formName].clearValidate();
        }
    },
    // 确定新增或修改节点
    ok() {
        this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
                let newChild = this.templateConfigForm;
                newChild.type = this.tempType;
                if(this.operationType === 'add') {
                    // 新增传父级id
                    newChild.parentId = this.isAddFirst?0:this.formData.id
                } else {
                    // 编辑传id
                    newChild.id = this.formData.id
                }
                this.getNodeProcessing(newChild);
            } else {
                return false;
            }
        });
    },
    // 树形结构添加和编辑节点
    addTemplateConfig(data) {
        ajax.post('core/projectevaluatetemplate',data).then(rs => {
            this.getNodeProcessing(data)
        });
    },
    // 删除节点
    deleteProjectevaluatetemplate(data,node) {
        ajax.delete('core/projectevaluatetemplate/'+ data.id).then(rs => {
            this.getNodeProcessing(data,node)
            this.$message({
                message: '删除成功',
                type: 'success'
            });
        });
    },
    // 树形结构整个保存
    saveTemplate(data) {
        ajax.post('core/projectevaluatetemplate/saveTemplate',data).then(rs => {
            // this.getNodeProcessing(data)
        });
    },
    // 前端删除和编辑节点时的处理（可以不用调查询接口），增加需调接口
    getNodeProcessing(data,node) {
        console.log(data)
        if(this.operationType === 'add') {
            data.id=new Date().getTime()
            this.$message({
                message: '新增成功',
                type: 'success'
            });
            this.dialogFormVisible = false;
            if(this.isAddFirst) {
                this.treeData.lists.push(data);
            } else {
                if (!this.formData.children) {
                    this.$set(this.formData, 'children', []);
                }
                this.formData.children.push(data);
            }
        } else if(this.operationType === 'delete') {
            node.forEach((item,index) => {
                if(item.id === data.id) {
                    node.splice(index, 1);
                } else {
                    if (item.children && item.children.length>0) {
                        this.getNodeProcessing(data,item.children)
                    }
                }
            });
        } else {
            this.$message({
                message: '编辑成功',
                type: 'success'
            });
            this.dialogFormVisible = false;
            // 弹窗表单修改的字段需要给formData中对应的字段附值
            this.formData.name = data.name;
            this.formData.period = data.period;
            this.formData.profession = data.profession;
            this.formData.stage = data.stage;
            this.formData.isApproval = data.isApproval;
            this.formData.isUpload = data.isUpload;
        }
    },
//保存
submitForm(form) {
    var data = this.powerprojecttemplateconfigForm;
    this.$refs[form]
    .validate((valid) => {
        if (!valid) {
        this.$message
            .error('校验不通过，请检查输入项');
        return;
        }
        ajax.post('project/powerprojecttemplateconfig', data).then(rs => {
        if (rs.status == 0) {
            this.$message
            .success(rs.msg);
            this.close();
        } else {
            this.$message
            .error(rs.msg);
        }
        });
    });
},

},
}
</script>
