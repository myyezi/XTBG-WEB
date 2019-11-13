<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="基本信息" name="1">
                <div class="flex-panel detail-box">
                    <div class="detail-item">
                        <label class="control-label">姓名</label>
                        <div class="input-group">
                            <span>{{employeeForm.name}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">手机号</label>
                        <div class="input-group">
                            <span>{{employeeForm.account}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">学历</label>
                        <div class="input-group">
                            <span>{{employeeForm.educationText}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">职称</label>
                        <div class="input-group">
                            <span>{{employeeForm.qualificationText}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">邮箱</label>
                        <div class="input-group">
                            <span>{{employeeForm.email}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">入职日期</label>
                        <div class="input-group">
                            <span>{{employeeForm.entryDate}}</span>
                        </div>
                    </div>

                </div>
            </el-collapse-item>
            <el-collapse-item title="权限信息" name="2">
                <div class="flex-panel detail-box">
                    <template v-for="(bean, i) in list">
                        <div class="detail-item">
                            <label class="control-label">组织</label>
                            <div class="input-group">
                                <span v-for="(item,ii) in bean.organizations" :key="ii">{{item.name}}</span>
                            </div>
                        </div>

                        <div class="detail-item">
                            <label class="control-label">角色</label>
                            <div class="input-group">
                                <span v-for="(item,ii) in bean.roles" :key="ii">{{item.name}}</span>
                            </div>
                        </div>

                        <div class="detail-item">
                            <label class="control-label">职位</label>
                            <div class="input-group">
                                <span v-for="(item,ii) in bean.positions" :key="ii">{{item.name}}</span>
                            </div>
                        </div>
                    </template>
                </div>
            </el-collapse-item>

            <el-collapse-item title="档案信息" name="3">
                <el-divider content-position="left">工作信息</el-divider>
                <div class="flex-panel detail-box">
                    <div class="detail-item">
                        <label class="control-label">员工类型</label>
                        <div class="input-group">
                            <span>{{employeeForm.typeText}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">员工状态</label>
                        <div class="input-group">
                            <span>{{employeeForm.employeeStatus == 1 ? "试用期" : employeeForm.employeeStatus == 2 ? "正式员工" : "离职"}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">试用期</label>
                        <div class="input-group">
                            <span>{{employeeForm.probationText}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">转正日期</label>
                        <div class="input-group">
                            <span>{{employeeForm.positiveDate}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">岗位职级</label>
                        <div class="input-group">
                            <span>{{employeeForm.postLevel}}</span>
                        </div>
                    </div>
                </div>
                <el-divider content-position="left">个人信息</el-divider>
                <div class="flex-panel detail-box">
                    <div class="detail-item">
                        <label class="control-label">身份证姓名</label>
                        <div class="input-group">
                            <span>{{employeeForm.idCardName}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">证件号码</label>
                        <div class="input-group">
                            <span>{{employeeForm.idCard}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">出生日期</label>
                        <div class="input-group">
                            <span>{{employeeForm.birthday}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">性别</label>
                        <div class="input-group">
                            <span>{{employeeForm.gender == 1 ? "男" : employeeForm.gender == 2 ? "女" : "其他"}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">名族</label>
                        <div class="input-group">
                            <span>{{employeeForm.nationality}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">身份证地址</label>
                        <div class="input-group">
                            <span>{{employeeForm.idCardAddress}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">证件有效期</label>
                        <div class="input-group">
                            <span>{{employeeForm.idCardValidity}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">户籍类型</label>
                        <div class="input-group">
                            <span>{{employeeForm.householdRegisterText}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">住址</label>
                        <div class="input-group">
                            <span>{{employeeForm.address}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">政治面貌</label>
                        <div class="input-group">
                            <span>{{employeeForm.politicalText}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">婚姻状况</label>
                        <div class="input-group">
                            <span>{{employeeForm.maritalText}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">首次工作日期</label>
                        <div class="input-group">
                            <span>{{employeeForm.workDate}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">社保账号</label>
                        <div class="input-group">
                            <span>{{employeeForm.socialSecurity}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">公积金帐号</label>
                        <div class="input-group">
                            <span>{{employeeForm.providentFund}}</span>
                        </div>
                    </div>
                </div>
                <el-divider content-position="left">学历信息</el-divider>
                <div class="flex-panel detail-box">
                    <template v-for="item in employeeForm.educationList">
                        <div class="detail-item">
                            <label class="control-label">学历</label>
                            <div class="input-group">
                                <span>{{item.educationText}}</span>
                            </div>
                        </div>

                        <div class="detail-item">
                            <label class="control-label">毕业院校</label>
                            <div class="input-group">
                                <span>{{item.school}}</span>
                            </div>
                        </div>

                        <div class="detail-item">
                            <label class="control-label">毕业时间</label>
                            <div class="input-group">
                                <span>{{item.graduationDate}}</span>
                            </div>
                        </div>
                        <div class="detail-item">
                            <label class="control-label">所学专业</label>
                            <div class="input-group">
                                <span>{{item.profession}}</span>
                            </div>
                        </div>
                    </template>
                </div>
                <el-divider content-position="left">银行卡信息</el-divider>
                <div class="flex-panel detail-box">
                    <div class="detail-item">
                        <label class="control-label">银行卡号</label>
                        <div class="input-group">
                            <span>{{employeeForm.bankAccount}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">开户行</label>
                        <div class="input-group">
                            <span>{{employeeForm.bank}}</span>
                        </div>
                    </div>
                </div>
                <el-divider content-position="left">合同信息</el-divider>
                <div class="flex-panel detail-box">
                    <div class="detail-item">
                        <label class="control-label">合同公司</label>
                        <div class="input-group">
                            <span>{{employeeForm.contractCompany}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">合同类型</label>
                        <div class="input-group">
                            <span>{{employeeForm.contractTypeText}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">首次合同起始日</label>
                        <div class="input-group">
                            <span>{{employeeForm.contractStartDate}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">首次合同到期日</label>
                        <div class="input-group">
                            <span>{{employeeForm.contractEndDate}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">现合同起始日</label>
                        <div class="input-group">
                            <span>{{employeeForm.contractCstartDate}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">现合同到期日</label>
                        <div class="input-group">
                            <span>{{employeeForm.contractCendDate}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">合同期限</label>
                        <div class="input-group">
                            <span>{{employeeForm.contractPeriodText}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">续签次数</label>
                        <div class="input-group">
                            <span>{{employeeForm.contractCount}}</span>
                        </div>
                    </div>
                </div>
                <el-divider content-position="left">紧急联系人</el-divider>
                <div class="flex-panel detail-box">
                    <template v-for="item in employeeForm.contactList">
                        <div class="detail-item">
                            <label class="control-label">紧急联系人姓名</label>
                            <div class="input-group">
                                <span>{{item.name}}</span>
                            </div>
                        </div>

                        <div class="detail-item">
                            <label class="control-label">联系人关系</label>
                            <div class="input-group">
                                <span>{{item.relationshipText}}</span>
                            </div>
                        </div>

                        <div class="detail-item">
                            <label class="control-label">联系人电话</label>
                            <div class="input-group">
                                <span>{{item.phone}}</span>
                            </div>
                        </div>
                    </template>
                </div>
                <el-divider content-position="left">个人资料</el-divider>
                <div class="avatar-uploader_count clearfix">
                    <div v-for="(attachment,i) in employeeForm.attachmentList" :key="i"
                         class="avatar-uploader_count_item" @click="attachmentType = i">
                        <span class="avatar-uploader_name">{{attachment.name}}</span>
                        <div  class="avatar_img">
                            <img :src="employeeForm.fileDomain + attachment.path" alt=""
                                 @click="showBigImg($event)">
                        </div>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>

</template>

<script>
    import ajax from '@/utils/request'
    import {tool} from '@/utils/common'
    import UploadPanel from '@/components/UploadPanel/index'

    export default {
        name: "userDetail",
        mixins: [tool],
        components: {UploadPanel},
        data() {
            return {
                employeeForm: {
                },
                openCollapse: ["1", "2"],//默认打开的面板
                show: false,//编辑页显示状态
                list: [],
            }
        },
        mounted() {
            ajax.get('upms/employee/' + this.$route.params.id).then(rs => {
                //if(this.checkResponse(rs)) {
                rs.data.userType += '';
                rs.data.userStatus += '';
                this.employeeForm = rs.data;
                if (null != rs.data.attachment && rs.data.attachment.length > 0) {
                    this.attachment = JSON.parse(rs.data.attachment);
                }
                //}
            });

            //加载用户的权限信息
            ajax.get('upms/user/getUserOrganStructure', {id: this.$route.params.id}).then(rs => {
                //if(this.checkResponse(rs)) {
                this.list = rs.data.rows;
                //}
            });
        },
        methods: {},

    }
</script>

<style lang="scss">
    .user-input {
        /deep/ .el-form-item__content {
            display: flex;

            .el-checkbox {
                margin-left: 10px;
                margin-right: 0;
            }
        }
    }

    .avatar-uploader_count {
        width: calc(100% - 60px);
    }

    .avatar-uploader_count_item {
        float: left;
        margin: 0 36px 10px 0;
        width: calc(33% - 36px);
    }

    .avatar-uploader_count_item:nth-child(3n) {
        margin: 0 0 10px 0;
    }

    .avatar-uploader_name {
        text-align: center;
        display: inline-block;
        width: 100%;
        margin-bottom: 5px;
    }

    .avatar-uploader .el-upload {
        width: 100%;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        // overflow: hidden;
        .el-icon-circle-close {
            position: absolute;
            top: -5px;
            right: -5px;
            cursor: pointer;
        }
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar_img {
        position: relative;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        img {
            height: 178px;
            width: 100%;
            display: block;
        }
        i {
            position: absolute;
            top: -5px;
            right: -5px;
            cursor: pointer;
        }
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }


</style>

