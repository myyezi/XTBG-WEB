<template>
    <el-drawer
        class="drawer_setting"
        :title="drawerTitle"
        :visible.sync="drawerShow"
        :before-close="handleCloseDrawer"
        size="500px">
        <el-tabs v-model="activeName">
            <el-tab-pane label="设置发起人" name="first" v-if="drawerType == 1">
                <el-form label-width="100px" class="drawer_form">
                    <el-form-item label="谁可以提交">
                        <el-input v-model="initiatorForm.name" @focus="addPeople" placeholder="请选择发起人"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="设置审批人" name="first" v-if="drawerType == 2">
                <el-form label-width="80px" class="drawer_form">
                    <el-radio-group v-model="approverForm.redio" @change="settingApprover">
                        <el-radio :label="1">指定成员</el-radio>
                        <el-radio :label="2">发起人自选</el-radio>
                        <el-radio :label="3">表单里的联系人</el-radio>
                    </el-radio-group>
                    <div v-if="approverForm.redio==1">
                        <el-button type="primary" icon="el-icon-plus" v-if="approverForm.peopleList.length==0" @click="addPeople">添加成员</el-button>
                        <el-button type="primary" icon="el-icon-edit" v-else @click="dialogFormVisible = true">修改成员</el-button>
                        <!-- <span class="add_people_tip">不能超过20人</span> -->
                        <div style="padding:10px 0;">
                            <el-tag
                                style="margin:0 10px 10px 0;"
                                :key="tag"
                                v-for="tag in seleteListName"
                                :disable-transitions="false"
                            >
                                {{tag}}
                            </el-tag>
                        </div>
                    </div>
                    <!-- <div v-if="approverForm.redio==2"> -->
                        <!-- <el-form-item label="选择方式">
                            <el-select v-model="sponsorAutonomyValue" placeholder="请选择">
                                <el-option
                                    v-for="item in sponsorAutonomyOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item> -->
                        <!-- <el-form-item label="选择范围">
                            <el-select v-model="optionalRangeValue" placeholder="请选择">
                                <el-option
                                    v-for="item in optionalRange"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <div v-if="optionalRangeValue==2" style="margin-top:10px">
                                <el-button type="primary" icon="el-icon-plus" v-if="approverForm.peopleList.length==0">添加成员</el-button>
                                <el-button type="primary" icon="el-icon-edit" v-else>修改成员</el-button>
                            </div>
                            <div v-if="optionalRangeValue==3" style="margin-top:10px">
                                <el-button type="primary" icon="el-icon-plus" v-if="approverForm.peopleList.length==0">添加角色</el-button>
                                <el-button type="primary" icon="el-icon-edit" v-else>修改角色</el-button>
                            </div> -->
                        <!-- </el-form-item> -->
                    <!-- </div> -->
                    <!-- <div v-if="approverForm.redio==3">
                        <el-select v-model="formContactsValue" placeholder="请选择">
                            <el-option
                                v-for="item in formContactsOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div> -->
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="设置抄送人" name="first" v-if="drawerType == 3">
                <el-form label-width="80px" class="drawer_form" label-position="top">
                    <el-form-item label="抄送人">
                        <el-button type="primary" icon="el-icon-plus" v-if="approverForm.peopleList.length==0" @click="addPeople">添加成员</el-button>
                        <el-button type="primary" icon="el-icon-edit" v-else @click="dialogFormVisible = true">修改成员</el-button>
                        <div style="padding:10px 0;">
                            <el-tag
                                style="margin:0 10px 10px 0;"
                                :key="tag"
                                v-for="tag in seleteListName"
                                :disable-transitions="false"
                            >
                                {{tag}}
                            </el-tag>
                        </div>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <div v-if="drawerType == 4">
                <el-form label-width="100px" class="drawer_form">
                    <el-form-item label="发起人">
                        <el-input v-model="conditionObj.name" @focus="addPeople" style="width:350px" placeholder="请选择发起人"></el-input>
                    </el-form-item>
                    <el-form-item label="请假类型">
                        <el-checkbox-group v-model="conditionObj.checkList">
                            <el-checkbox :label="item.text" v-for="(item,key) in typeCondition" :key="key"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="时长（天）">
                        <el-select v-model="conditionObj.timeConditionValue" placeholder="请选择">
                            <el-option
                                v-for="(item,key) in timeCondition"
                                :key="key"
                                :label="item.text"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input v-model.number="conditionObj.time" placeholder="请输入时长" type="number"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-tabs>
        <div class="drawer_footer">
            <el-button @click="handleCloseDrawer">取消</el-button>
            <el-button type="primary" @click="saveData">保存</el-button>
        </div>
        <el-dialog title="人员设置" :visible.sync="dialogFormVisible" :append-to-body="true">
            <el-tree
                style="height:500px;overflow: auto;"
                :data="allPeople"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                highlight-current
                :default-checked-keys="defaultChecked"
                :props="defaultProps">
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="seleteData">确 定</el-button>
            </div>
        </el-dialog>
    </el-drawer>
</template>

<script>
import {mapGetters} from 'vuex'
import ajax from '@/utils/request'
import Bus from "@/utils/eventBus.js";
export default {
    props: ['drawerTitle','drawerType','drawerId','typeCondition','timeCondition'],
    data () {
        return {
            dialogFormVisible:false,
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            allPeople:[],
            companyId:'',
            seleteUserList:[],
            seleteUserListId:[],
            seleteOrganizationListId:[],
            seleteListName:[],
            defaultChecked:[],
            drawerShow:false,
            activeName:'first',
            initiatorForm:{
                name:''
            },
            approverForm:{
                redio:1,
                peopleList:[]
            },
            conditionObj:{
                name:'',
                checkList:[],
                time:'',
                timeConditionValue:''
            },
            sponsorAutonomyValue:1,
            sponsorAutonomyOptions:[{
                label:'自选一个人',
                value:1
            },{
                label:'自选多个人',
                value:2
            }],
            optionalRangeValue:1,
            optionalRange:[{
                label:'全公司',
                value:1
            },{
                label:'指定成员',
                value:2
            },{
                label:'角色',
                value:3
            }],
            formContactsValue:1,
            formContactsOptions:[{
                label:'工作委托人',
                value:1
            }],
            timeConditionValue: ''
        }
    },
    computed: {
        ...mapGetters([
            'user',
        ]),
    },
    created () {
        this.companyId = localStorage.getItem(this.user.userId+'companyId');
        this.getAllPeople()
    },
    methods: {
        open () {
            this.drawerShow = true
        },
        handleCloseDrawer() {
            this.drawerShow = false
            if(this.$refs.tree) {
                this.$refs.tree.setCheckedKeys([]);
            }
            this.initiatorForm.name = ''
            this.approverForm.peopleList = []
            this.seleteOrganizationListId = []
            this.seleteUserListId = []
            this.seleteListName = []
        },
        settingApprover(data) {
            console.log(this.companyId)
        },
        addPeople() {
            this.dialogFormVisible = true
        },
        getAllPeople() {
            ajax.get('upms/organization/orgUserTree/'+this.companyId).then(rs => {
                if (rs.status === 0) {
                    this.allPeople = rs.data
                } else {
                    
                }
            });
        },
        seleteData() {
            let objArr = this.$refs.tree.getCheckedNodes()
            let seleteUserList = [],seleteListName = [],seleteOrganizationListId = [],seleteUserListId = []
            objArr.forEach((item)=>{
                if(item.type === 1) {
                    seleteUserList.push(item)
                    seleteListName.push(item.name)
                }
                if(item.type === 0) {
                    seleteOrganizationListId.push({sourceId:item.id,sourceType:1})
                }
            })
            seleteUserList.forEach((item)=>{
                let flag = true
                seleteOrganizationListId.forEach((items)=>{
                    if(item.parentId == items.sourceId) {
                        flag = false
                    }
                })
                if(flag) {
                    seleteUserListId.push({sourceId:item.id,sourceType:2})
                }
            })
            if(this.drawerType == 1) {
                this.initiatorForm.name = seleteListName.join()
            } else if(this.drawerType == 2 || this.drawerType == 3) {
                this.approverForm.peopleList = seleteListName
            } else if(this.drawerType == 4) {
                this.conditionObj.name = seleteListName.join()
            }
            this.seleteOrganizationListId = seleteOrganizationListId
            this.seleteUserListId = seleteUserListId
            this.seleteListName = seleteListName
            this.dialogFormVisible = false
        },
        saveData() {
            let obj = {
                nodeType:this.drawerType,
                id:this.drawerId,
                sourceNodes:this.seleteUserListId,
                sourceOrganNodes:this.seleteOrganizationListId,
                conditionNodes:[],
                nodeText:this.seleteListName.join()
            }
            if(this.drawerType==1) {
                obj.sponsor = 1
            } else if(this.drawerType==2) {
                obj.approver = this.approverForm.redio
            } else if(this.drawerType==3) {

            } else if(this.drawerType==4) {
                obj.conditionNodes = []
                if(this.conditionObj.timeConditionValue || this.conditionObj.time) {
                    obj.conditionNodes.push({
                        conditionField:'day',
                        conditionType:this.conditionObj.timeConditionValue,
                        conditionValue:this.conditionObj.time
                    })
                }
                if(this.conditionObj.checkList&&this.conditionObj.checkList.length>0) {
                    obj.conditionNodes.push({
                        conditionField:'type',
                        conditionType:'==',
                        conditionValue:this.conditionObj.checkList.join()
                    })
                }
                console.log(this.conditionObj)
            }
            this.handleCloseDrawer()
            this.$emit('updata_loading')
            ajax.post('workflow/workflowconfignode/updateConfigNodeCacheSource',obj).then(rs => {
                if (rs.status === 0) {
                    this.$emit('updata_working_data',rs.data)
                } else {
                    this.$emit('updata_working_data',1)
                    this.$message.error(rs.msg);
                }
            });
        }
    }
}
</script>{

}

<style lang="scss">
    .drawer_setting {
        .el-tabs__active-bar {
            display:block;
            transform: translateX(0px) !important;
        }
        .el-tabs__item {
            padding: 5px 15px !important;
        }
        .el-tabs__item.is-active {
            color: #409eff;
            background-color: #fff;
        }
        .drawer_form {
            height:calc(100vh - 150px);
            overflow:auto;
            // padding: 20px calc((100% - 210px)/2) 0;
            padding:20px;
            .el-form-item__label {
                line-height: 40px;
            }
            .el-radio-group{
                padding-bottom: 20px;
            }
            .add_people_tip {
                margin-left:15px;
                color: #999;
            }
            .el-select {
                width:150px;
                .el-input {
                    width:150px;
                    display:inline-block !important;
                }
            }
            .el-input {
                width:200px;
            }
        }
    }
</style>
