<template>
    <div class="app-container white-bg list-panel" v-cloak style="height: calc(100vh - 120px);padding:10px">
        <div style="padding:10px 0">
            <span style="font-size: 14px;color: #8C8C8C; font-weight: bold;">项目名称：{{projectName}}</span>
        </div>
        <el-radio-group v-model="isOpen" style="padding:10px 0px 10px;">
            <el-radio :label="false" @change="changeOpen">收起</el-radio>
            <el-radio :label="true" @change="changeOpen">展开</el-radio>
        </el-radio-group>
        <div class="clearfix">
            <gantt-add
                ref="gantt"
                class="left-container"
                v-if="isLoading"
                :tasks="tasks"
                :headerTitle="headerTitle">
            </gantt-add>
        </div>
        <!-- <el-dialog title="文件上传" :visible.sync="uploadShow" :class="{'dialog_animation_in':uploadShow,'dialog_animation_out':!uploadShow}" width="800px">
            <stop-upload @func="getResFile" :sourceId = this.id :projectId = this.projectId :nodeName = projectNodeName ></stop-upload>
        </el-dialog> -->

        <el-dialog title="文件管理" :visible.sync="fileFormVisible" :class="{'dialog_animation_in':fileFormVisible,'dialog_animation_out':!fileFormVisible}" width="200" height="800px">
            <div>
                <el-table :data="attachmentList" style="width: 100%;height: 500px;">
                    <el-table-column fixed label="操作" width="120">
                        <template fixed slot-scope="{ row, column, $index }">
<!--                            状态为待审批转态不能删除-->
                            <el-button v-show="currentStatus!=4" @click="delFile(row)" type="text" size="small">删除</el-button>
                            <el-button v-show="true" @click="downloadFile(row)" type="text" size="small">下载</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="序号" width="70px">
                        <template slot-scope="scope">
                            {{scope.$index+1}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" sortable show-overflow-tooltip min-width="100" label="文件名称">
                        <template fixed slot-scope="{ row, column, $index }">
                            <doc-icon-type :iconType="row.suffix"></doc-icon-type>
                            <span>{{row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="size" sortable show-overflow-tooltip min-width="100" label="文件大小">
                        <template slot-scope="scope">
                            {{bytesToSize(scope.row.size)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="creater" sortable show-overflow-tooltip min-width="100" label="上传人"></el-table-column>
                    <el-table-column prop="createTime" sortable show-overflow-tooltip min-width="100" label="上传时间"></el-table-column>
                </el-table>
            </div>
        </el-dialog>

        <el-dialog title="位置列表" :visible.sync="positionListFormVisible" :class="{'dialog_animation_in':positionListFormVisible,'dialog_animation_out':!positionListFormVisible}" width="800px" style="height:600px" >
            <dragTreeTable
                class="table-box"
                :data="treeData"
                :fixed="true"
                :onDrag="onTreeDataChange"
                :isdraggable="true"
                :height="250">
            </dragTreeTable>
        </el-dialog>

        <el-dialog title="申请完成" :visible.sync="finishFormVisible" :class="{'dialog_animation_in':finishFormVisible,'dialog_animation_out':!finishFormVisible}" width="80">
            <el-form :model="approvalFinishForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="审批人" prop="name">
                    <el-input v-model="approvalFinishForm.name" placeholder="请选择审批人">
                        <el-button slot="append" icon="el-icon-search" @click="showEmployeeSelector = true"></el-button>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="finishFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="ok">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加位置" :visible.sync="positionFormVisible" :class="{'dialog_animation_in':positionFormVisible,'dialog_animation_out':!positionFormVisible}" width="400px" height="800px">
            <el-form :model="positionForm" :rules="rules" ref="ruleForm" label-width="80px">
            <div class="flex-panel" style="padding-left: 10px">
                <el-form-item label="位置名称" prop="positionName">
                    <el-input v-model="positionForm.positionName" placeholder="请输入位置名称">
                    </el-input>
                </el-form-item>
                <el-form-item label="位置详情 " prop="adress">
                    <el-input v-model="positionForm.adress" @click.native="showDialogAdress()" readonly  placeholder="请输入位置详情">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-form-item>
                    <el-input v-model="positionForm.longitude" placeholder="请确认位置"
                              maxlength="10" type="hidden"></el-input>

                    <el-input v-model="positionForm.latitude" placeholder="请确认位置"
                              maxlength="10" type="hidden"></el-input>
            </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="finishFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addPosition">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="断点上传" :visible.sync="stopUploadShow" :class="{'dialog_animation_in':dialogFormVisible,'dialog_animation_out':!dialogFormVisible}" width="800px">
            <stop-upload></stop-upload>
        </el-dialog>
        <!-- 用户选择器 -->
        <EmployeeListSelect :isShow="showEmployeeSelector" @selectedOnchange="selectedOnchangeHandle"></EmployeeListSelect>
        <el-dialog title="位置" :visible.sync="dialogAdressVisible" :append-to-body="true" width="70%">
            <baidu-map @selectLocation="selectLocation" v-model="adress"></baidu-map>
        </el-dialog>
    </div>
</template>

<script>
    import ajax from '@/utils/request'
    import { tool, ruleTool ,formRule} from '@/utils/common'
    import GanttAdd from '@/components/Gannt/add'
    import '@/components/dhtmlx-gantt'
    import "@/components/dhtmlx-gantt/codebase/locale/locale_cn"
    import Bus from "@/utils/eventBus.js"
    import StopUpload from '@/components/StopUpload/index'
    import EmployeeListSelect from "@/components/EmployeeListSelect"
    import BaiduMap from '@/components/BaiduMap/index'
    import dragTreeTable from "@/components/treeTable/dragTreeTable.vue";
    import DocIconType from '@/components/DocIconType'

    export default {
        mixins: [tool, ruleTool],
        components: {GanttAdd, StopUpload, EmployeeListSelect,BaiduMap,dragTreeTable,DocIconType},
        data() {
            let that = this;
            return {
                dialogVisible : false,
                dialogFormVisible : false,
                fileFormVisible : false,
                finishFormVisible : false,
                positionFormVisible : false,
                dialogAdressVisible:false,
                positionListFormVisible :false,
                projectTaskList : [],
                stageList : [],
                attachmentList : [],
                approvalFinishForm : {},
                positionForm :{
                    adress:'',
                    longitude:'',
                    latitude:'',
                    positionName:''
                },
                id : "",
                taskId : "",
                projectId : "",
                projectName : "",
                projectNodeName:"",
                adress : '',
                tempArr : [],
                treeData: {
                    columns: [],
                    lists: [],
                    custom_field: {
                        id: 'id',
                        parent_id: 'parentId',
                        order : 'sortNum'
                    }
                },
                isOpen : true,
                uploadShow : false,
                stopUploadShow : false,
                showEmployeeSelector : false,
                currentStatus:'',
                rules: {
                    name: [
                        { required: true, message: '请选择审批人', trigger: ['change','blur'] }
                    ],
                    positionName: [
                        { required: true, message: '请输入位置名称', trigger: ['change','blur'] }
                    ],
                    adress: [
                        { required: true, message: '请输入位置详情', trigger: ['change','blur'] }
                    ],
                },
                tasks: {
                    data: [],
                    links: []
                },
                isLoading: false,
                headerTitle:[
                    {
                        name:"action",
                        label:'关联文件',
                        align: "center",
                        width:'120',
                        template:function(obj){
                            let operateStr = "";
                            this.currentStatus = obj.currentStatus;
                            let uploadStr = "<a style='display:inline-block;width:50px;height:100%;color: #4781fe;'>上传</a>";
                            let viewStr = "<a style='display:inline-block;width:50px;height:100%;color: #4781fe;'>查看</a>";
                            if (obj.isUpload == 1 && obj.currentStatus != 4){
                                operateStr += uploadStr;
                            }
                            if (obj.fileNum > 0){
                                operateStr += viewStr;
                            }
                            return operateStr;
                        }
                    },
                    {
                        name:"action",
                        label:'执行操作',
                        align: "center",
                        width:'120',
                        template:function(obj){
                            let operateStr = "";
                            let approvelStr = "<a style='display:inline-block;width:50px;height:100%;color: #4781fe;'>申请完成</a>";
                            let finishStr = "<a style='display:inline-block;width:50px;height:100%;color: #4781fe;' title='完 成'>完成</a>";
                            let hasApprovalStr = "<a style='display:inline-block;width:50px;height:100%;color: #999999;'>已申请</a>";
                            if (obj.currentStatus!=6 ){
                                if ((obj.isApproval == 1 && obj.fileNum > 0 && obj.currentStatus!=4) || (obj.isApproval == 1 && obj.isUpload == 0 && obj.currentStatus!=4)){
                                    operateStr += approvelStr;
                                }
                                if (obj.currentStatus == 4){
                                    operateStr += hasApprovalStr;
                                }
                                if (obj.isApproval == 0){
                                    operateStr += finishStr;
                                }
                            }
                            return operateStr;
                        }
                    },
                    {
                        name:"action",
                        label:'获取位置',
                        align: "center",
                        width:'120',
                        template:function(obj){
                            let operateStr = "";
                            this.currentStatus = obj.currentStatus;
                            let positionStr = "<a style='display:inline-block;width:50px;height:100%;color: #4781fe;'>位置</a>";
                            let viewStr = "<a style='display:inline-block;width:50px;height:100%;color: #4781fe;'>列表</a>";
                            if (obj.isPosition == 1){
                                operateStr += positionStr;
                                operateStr += viewStr;
                            }
                            return operateStr;
                        }
                    },
                    {
                        name:'text',
                        label:'工作内容',
                        tree:true,
                        align: "left",
                        width:'250',
                    },
                    {
                        name:'period',
                        label:'工期(天)',
                        align: "center",
                        width:'75',
                    },
                    {
                        name:'start_date',
                        label:'开始时间',
                        align: "center",
                        width:'100',
                    },
                    {
                        name:'end_date',
                        label:'结束时间',
                        align: "center",
                        width:'100',
                    },
                    {
                        name:'stage',
                        label:'所属阶段',
                        align: "center",
                        width:'75',
                        template : function(obj){
                            let str = '';
                            that.stageList.forEach((data) => {
                                if(data.value == obj.stage) {
                                    str = data.text;
                                }
                            });
                            return str;
                        }
                    },
                    {
                        name:'principalText',
                        label:'负责人',
                        align: "center",
                        width:'100',
                        template:function(obj){
                            if (!obj.principal){
                                return ""
                            }else {
                                return obj.principalText
                            }
                        }
                    },
                    {
                        name:'profession',
                        label:'专业',
                        align: "center",
                        width:'75',
                    },
                    {
                        name:'currentStatusText',
                        label:'当前状态',
                        align: "center",
                        width:'75',
                        template : function(obj){
                            let str = "";
                            switch(obj.currentStatus) {
                                case 1:
                                    str = "未开始";
                                    break;
                                case 2:
                                    str = "进行中";
                                    break;
                                case 3:
                                    str = "延期";
                                    break;
                                case 4:
                                    str = "待审核";
                                    break;
                                case 5:
                                    str = "不合格";
                                    break;
                                case 6:
                                    str = "已完成";
                                    break;
                                default:
                                    str = "";
                            }
                            return str;
                        }
                    },
                ]
            }
        },
        created() {
            this._getTasksModel();
        },
        mounted() {
            if (this.$route.query.id){
                this.taskId = this.$route.query.id;
            }
            Bus.$on("task-updated", data => {
                if(data.operationType === 'upload') {
                    this.id = data.id;
                    this.getProjectNodeName();
                }else if (data.operationType === 'view'){
                    this.fileFormVisible = true;
                    this.getProjectPlanStatus(data.id);
                    // 获取项目文件
                    this.getAttachmentList(data.id);
                }else if (data.operationType === 'approvefinish'){
                    this.finishFormVisible = true;
                    this.id = data.id;
                }else if(data.operationType === 'position'){
                    this.positionForm ={ adress:'',
                                         longitude:'',
                                         latitude:'',
                                         positionName:''
                                      };
                    this.positionFormVisible = true;
                    this.id = data.id;
                }else if(data.operationType === 'selectPosition'){
                    this.positionListFormVisible = true
                    this.id = data.id;
                    this.getPositionList(data.id);
                }
                else if(data.operationType === 'finish') {
                    let that = this;
                    this.$confirm("确定完成该计划节点?" ,'提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }).then(function() {
                        ajax.post('power/powerprojectplan/finish', {
                            planId : data.id,
                        }).then(rs => {
                            if (rs.status == 0) {
                                that.$message.success(rs.msg);
                                that._getTasksModel();
                            } else {
                                that.$message.error(rs.msg);
                            }
                        });
                    }).catch(function() {
                    });
                }
            });
            Bus.$on("upload-success", data => {
                this.updateCurrentStatus();
                this._getTasksModel();
            })
            this.getProjectTask();
            this.getStageList();
            this.treeData.columns = [
                {
                    title: "操作",
                    type: "action",
                    width: 200,
                    align: "left",
                    actions: [
                        {
                            text: "编辑",
                            onclick: this.onEdit,
                            formatter: item => {
                                return "<span style='margin-right:15px'>编辑</span>";
                            }
                        },
                        {
                            text: "删除",
                            onclick: this.onDelete,
                            formatter: item => {
                                return "<span style='margin-right:15px'>删除</span>";
                            }
                        },
                    ]
                },
                {
                    type: "selection",
                    title: "位置名称",
                    field: "name",
                    img : this.addImg,
                    onclick: this.onAddFirst,
                    width: 340,
                    align: "left",
                },
                {
                    title: "位置详情",
                    field: "adress",
                    width: 120,
                    align: "center",
                }

            ];
        },
        methods: {
            getAttachmentList(id){
                ajax.get('power/powerprojectattachment/',{sourceId : id, projectId : this.projectId}).then(rs => {
                    if (rs.status === 0){
                        this.attachmentList = rs.data;
                    }else{
                        this.$message({
                            message: rs.msg,
                            type: 'error'
                        });
                    }
                });
            },
            // // 上传成功回调
            // getResFile(file){
            //     console.log(file)
            //     ajax.post('power/powerprojectattachment', {
            //         sourceId : file.sourceId,
            //         projectId : file.projectId,
            //         name : file.name,
            //         size : file.size,
            //         path : file.path
            //     }).then(rs => {
            //         if (rs.status == 0) {
            //             this.$message.success(rs.msg);
            //             this.updateCurrentStatus();
            //             this._getTasksModel();
            //         } else {
            //             this.$message.error(rs.msg);
            //         }
            //     });
            // },

           //修改项目节点状态
            updateCurrentStatus(){
                ajax.post('power/powerprojectplan/loading/'+ this.id
                ).then(rs => {
                    this._getTasksModel();
                });
            },

            //修改项目节点状态
            getProjectNodeName(){
                ajax.get('power/powerprojectplan/'+ this.id
                ).then(rs => {
                    // this.uploadShow = true;
                    if(rs.data && rs.data.name) {
                        this.projectNodeName = rs.data.name;
                        // this._getTasksModel();
                        Bus.$emit("upload-show",{id:this.id,projectId:this.projectId,projectNodeName:this.projectNodeName,projectName:this.projectName});
                    }
                });
            },


            //获取项目节点当前状态
            getProjectPlanStatus(id){
                ajax.get('power/powerprojectplan/'+ id).then(rs => {
                    if(rs.data ) {
                        this.currentStatus = rs.data.currentStatus;
                        this._getTasksModel();
                    }
                });
            },

            bytesToSize(bytes) {
                if (bytes === 0) return '0 B';
                var k = 1000, // or 1024
                    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                    i = Math.floor(Math.log(bytes) / Math.log(k));
                return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
            },

            delFile(data){
                let that = this;
                this.$confirm('确定删除该文件?' ,'提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(function() {
                    ajax.delete('power/powerprojectattachment/'+data.id).then(rs => {
                        if (rs.status == 0) {
                            that.$message.success(rs.msg);
                            that.getAttachmentList(data.sourceId);
                            that._getTasksModel();
                        } else {
                            that.$message.error(rs.msg);
                        }
                    });
                }).catch(function() {
                });

            },

            downloadFile(data){
                // window.open(process.env.URL_API+data.path);
                let fileName = data.name;
                let filePath = data.path;
                let param = "fileName=" + fileName + "&" + "filePath=" +filePath;
                location.href = encodeURI(this.exportUrl("power/powerprojectplan/downLoadFile?" + param));
            },
            selectedOnchangeHandle(data){
                this.approvalFinishForm = {};
                this.showEmployeeSelector = false;
                if (data) {
                    let { idArr = [],nameArr = [] } = {};
                    data.map(item => {
                        idArr.push(item.id);
                        nameArr.push(item.name);
                    });
                    this.approvalFinishForm.id = idArr.join(",");
                    this.approvalFinishForm.name = nameArr.join(",");
                }
            },
            changeOpen(){
                this._getTasksModel();
            },
            // 工程阶段字典
            getStageList() {
                let type = "GCJD";
                ajax.get('upms/dict/type/'+type).then(rs => {
                    if (rs.length > 0) {
                        this.stageList = rs;
                    }
                });
            },
            showDialogAdress() {
                this.dialogAdressVisible = true;
            },
            //加载地图
            selectLocation(location) {
                this.positionForm.adress = location.address;
                this.positionForm.longitude = location.lng;
                this.positionForm.latitude = location.lat;
                this.dialogAdressVisible = false;
            },
            // 项目任务书信息
           getProjectTask(){
                if (this.taskId){
                    // 获取项目任务书对象
                    ajax.get('power/powerprojecttask/getOneById/' + this.taskId).then(rs => {
                        if (rs.status === 0){
                            this.projectId = rs.data.projectId;
                            this.projectName = rs.data.name;
                        }else{
                            this.$message({
                                message: rs.msg,
                                type: 'error'
                            });
                        }
                    });
                }
            },

            // 项目计划列表
            _getTasksModel() {
                if(this.$route.query.id){
                    ajax.get('power/powerprojectplan/getPlanTree?taskId='+this.$route.query.id).then(rs => {
                        if(rs.status === 0) {
                            if(rs.data) {
                                if (rs.data.length > 0){
                                    let obj = {};
                                    this.isLoading = true;
                                    rs.data.forEach((item)=>{
                                        item.start_date = item.planStartDate;
                                        item.end_date = item.planEndDate;
                                        item.text = item.name;
                                        item.parent = item.parentId;
                                        item.open = this.isOpen;
                                    });
                                    obj.data = rs.data;
                                    this.tasks = obj;
                                }
                            }
                        } else {
                            this.$message({
                                message: rs.msg,
                                type: 'error'
                            });
                        }
                    });
                }
            },

            // 清楚弹窗内容以及警告信息
            clearValidate(formName) {
                if(this.$refs[formName]) {
                    this.$refs[formName].clearValidate();
                }
            },

            // 弹框“确定”操作
            ok(){
                this.$refs['ruleForm'].validate((valid) => {
                    if (!this.approvalFinishForm.id){
                        this.$message.error("请选择正确的审批人");
                        return;
                    }
                    let arrIds = this.approvalFinishForm.id.split(",");
                    if (arrIds.length > 5){
                        this.$message.error("最多支持选择5个审批人");
                        return;
                    }
                    if (!valid) {
                        this.$message.error("校验不通过，请检查输入项");
                        return;
                    }else{
                        ajax.post('power/powerprojectplan/approvalFinish', {
                            planId : this.id,
                            approvalEmployeeId : this.approvalFinishForm.id,
                            taskId : this.taskId
                        }).then(rs => {
                            if (rs.status == 0) {
                                this.$message.success(rs.msg);
                                this.finishFormVisible = false;
                                this._getTasksModel();
                            } else {
                                this.$message.error(rs.msg);
                            }
                        });
                    }
                });
            },

            //添加位置
            addPosition(){
                this.$refs['ruleForm']
                    .validate((valid) => {
                            if (!valid) {
                                this.$message
                                    .error('校验不通过，请检查输入项');
                                return;
                            }
                let data = this.positionForm;
                data.projectId = this.projectId;
                data.projectPlanId = this.id;
                ajax.post('power/powerprojectposition/savePosition',data).then(rs => {
                    if (rs.status == 0) {
                        this.$message.success(rs.msg);
                        this.positionFormVisible = false;
                        this.getPositionList();
                    } else {
                        this.$message.error(rs.msg);
                    }
                });
                    });
            },
            getPositionList(id){
                // 获取项目节点定位
                ajax.get('power/powerprojectposition/selectList/' ,{projectId:this.projectId,projectPlanId:this.id}).then(rs => {
                        this.treeData.lists = rs;
                });

            },
            onTreeDataChange(list, from, to, where) {
                this.treeData.lists = list;
                this.updateNo(list)
            },
            //保存
            submitForm() {
                this.newList = [];
                this.getNewList(this.treeData.lists);
                console.log(this.newList)
            },

            getNewList(list){
                list.forEach((item) => {
                    this.newList.push(item);
                    if (item.children && item.children.length>0) {
                        this.getNewList(item.children);
                    }
                });
            },
            //移动批量修改编号
            updateNo(data){
                let _this =  this;
                ajax.post('power/powerprojectposition/updateNoAll',data).then(rs => {
                    if (rs.status == 0) {
                        _this.$message.success(rs.msg);
                        _this.getPositionList();
                    } else {
                        _this.$message.error(rs.msg);
                    }
                });
            },

            // 编辑节点
            onEdit(data) {
                this.positionFormVisible = true;
                this.clearValidate('ruleForm');
                this.positionForm  ={
                        adress:data.adress,
                        longitude : data.longitude,
                        latitude:data.latitude,
                        positionName: data.name,
                        id :data.id,
                        no: data.no
                };
            },

            // 删除位置列表
            onDelete(data) {
                let _this =  this;
                this.$confirm('确定删除吗' ,'提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(function() {
                    ajax.delete('power/powerprojectposition/'+data.id).then(rs => {
                        if (rs.status == 0) {
                            _this.$message.success(rs.msg);
                            _this.getPositionList();
                        } else {
                            _this.$message.error(rs.msg);
                        }
                    });
                }).catch(function() {
                });
            },
        },
    }
</script>


<style>
    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
    }

    .container {
        height: 100%;
        width: 100%;
    }

    .left-container {
        overflow: hidden;
        position: relative;
        height: calc(100% - 32px);
    }

    .right-container {
        border-right: 1px solid #cecece;
        float: right;
        height: 100%;
        width: 300px;
        box-shadow: 0 0 5px 2px #aaa;
        position: relative;
        z-index:2;
    }

    .gantt-messages {
        list-style-type: none;
        height: 50%;
        margin: 0;
        overflow-x: hidden;
        overflow-y: auto;
        padding-left: 5px;
    }

    .gantt-messages > .gantt-message {
        background-color: #f4f4f4;
        box-shadow:inset 5px 0 #d69000;
        font-family: Geneva, Arial, Helvetica, sans-serif;
        font-size: 14px;
        margin: 5px 0;
        padding: 8px 0 8px 10px;
    }

    .gantt-selected-info {
        border-bottom: 1px solid #cecece;
        box-sizing: border-box;
        font-family: Geneva, Arial, Helvetica, sans-serif;
        height: 50%;
        line-height: 28px;
        padding: 10px;
    }

    .gantt-selected-info h2 {
        border-bottom: 1px solid #cecece;
    }

    .select-task-prompt h2{
        color: #d9d9d9;
    }
</style>
