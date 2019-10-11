<template>
    <el-drawer
        class="drawer_setting"
        :title="drawerTitle"
        :visible.sync="drawerShow"
        size="399px">
        <el-tabs v-model="activeName">
            <el-tab-pane label="设置发起人" name="first" v-if="drawerType == 'start'">
                <el-form label-width="100px" class="drawer_form">
                    <el-form-item label="谁可以提交">
                        <el-input v-model="initiatorForm.name"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="设置审批人" name="first" v-if="drawerType == 'approver'">
                <el-form label-width="80px" class="drawer_form">
                    <el-radio-group v-model="approverForm.redio" @change="settingApprover">
                        <el-radio :label="1">指定成员</el-radio>
                        <el-radio :label="2">发起人自选</el-radio>
                        <el-radio :label="3">表单里的联系人</el-radio>
                    </el-radio-group>
                    <div v-if="approverForm.redio==1">
                        <el-button type="primary" icon="el-icon-plus" v-if="approverForm.peopleList.length==0">添加成员</el-button>
                        <el-button type="primary" icon="el-icon-edit" v-else>修改成员</el-button>
                        <span class="add_people_tip">不能超过20人</span>
                    </div>
                    <div v-if="approverForm.redio==2">
                        <el-form-item label="选择方式">
                            <el-select v-model="sponsorAutonomyValue" placeholder="请选择">
                                <el-option
                                    v-for="item in sponsorAutonomyOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="选择范围">
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
                            </div>
                        </el-form-item>
                    </div>
                    <div v-if="approverForm.redio==3">
                        <el-select v-model="formContactsValue" placeholder="请选择">
                            <el-option
                                v-for="item in formContactsOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="设置抄送人" name="first" v-if="drawerType == 'notifier'">
                <el-form label-width="80px" class="drawer_form" label-position="top">
                    <el-form-item label="抄送人">
                        <el-button type="primary" icon="el-icon-plus" v-if="approverForm.peopleList.length==0">添加成员</el-button>
                        <el-button type="primary" icon="el-icon-edit" v-else>修改成员</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
        <div class="drawer_footer">
            <el-button @click="drawerShow = false">取消</el-button>
            <el-button type="primary">保存</el-button>
        </div>
    </el-drawer>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: ['drawerTitle','drawerType'],
    data () {
        return {
            drawerShow:false,
            activeName:'first',
            initiatorForm:{

            },
            approverForm:{
                redio:1,
                peopleList:[]
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
            formContactsValue:'',
            formContactsOptions:[{
                label:'全公司',
                value:1
            },{
                label:'指定成员',
                value:2
            },{
                label:'角色',
                value:3
            }]
        }
    },
    computed: {
        
    },
    created () {
    },
    methods: {
        open () {
            this.drawerShow = true
        },
        settingApprover(data) {
            console.log(data)
        }
    }
}
</script>

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
        }
    }
</style>
