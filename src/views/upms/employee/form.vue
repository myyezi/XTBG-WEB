<template>
    <div class="form-panel">
        <el-form :model="userForm" :rules="rules" ref="userForm" label-position="top" label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="基本信息" name="1">
                    <div class="flex-panel">
                        <el-form-item label="手机号" prop="phone">
                            <el-input v-model="userForm.phone" placeholder="请输入手机号" clearable @change="getUserByPhone()"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="userForm.name" placeholder="请输入姓名" clearable disabled></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-select v-model="userForm.gender" filterable clearable disabled>
                                <el-option label="男" :value="1"></el-option>
                                <el-option label="女" :value="2"></el-option>
                                <el-option label="其他" :value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="userForm.email" placeholder="请输入邮箱" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="学历" prop="education">
                            <el-select v-model="userForm.education" filterable clearable disabled>
                                <el-option label="博士" :value="1"></el-option>
                                <el-option label="硕士" :value="2"></el-option>
                                <el-option label="本科" :value="3"></el-option>
                                <el-option label="大专" :value="4"></el-option>
                                <el-option label="高中" :value="5"></el-option>
                            </el-select>
                        </el-form-item>
                        <!--<el-form-item label="职称" prop="qualification">
                            <el-select v-model="userForm.qualification" filterable clearable disabled>
                                <el-option label="试用期" :value="1"></el-option>
                                <el-option label="正式员工" :value="2"></el-option>
                                <el-option label="离职" :value="3"></el-option>
                            </el-select>
                        </el-form-item>-->
                        <el-form-item label="状态" prop="employeeStatus" v-if="userForm.id == null">
                            <el-select v-model="userForm.employeeStatus" filterable clearable>
                                <el-option label="试用期" :value="'1'"></el-option>
                                <el-option label="正式员工" :value="'2'"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="状态" prop="employeeStatus" v-else>
                            <el-select v-model="userForm.employeeStatus" filterable clearable>
                                <el-option label="试用期" :value="'1'"></el-option>
                                <el-option label="正式员工" :value="'2'"></el-option>
                                <el-option label="离职" :value="'3'"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="权限信息" name="2" v-if="userForm.employeeStatus != 3">
                    <el-button class="float-btn" type="primary" @click="addItem">新增</el-button>
                    <el-table border :data="userForm.list" style="width: 100%">
                        <el-table-column label="组织" min-width="200" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'list.' + $index + '.organizations'"
                                              :rules="rules.required('请选择组织')">
                                    <tree-select v-model="row.organizations" placeholder="请选择" type="one"
                                                 :disabled-id="['1']" url="/upms/organization/tree"></tree-select>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="角色" min-width="200" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'list.' + $index + '.roles'"
                                              :rules="rules.required('请选择角色')">
                                    <tree-select v-model="row.roles" placeholder="请选择"
                                                 :url="setUrl('upms/role/findByCompany',row)"></tree-select>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="职位" min-width="200" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'list.' + $index + '.positions'"
                                              :rules="rules.required('请选择职位')">
                                    <tree-select v-model="row.positions" placeholder="请选择"
                                                 :url="setUrl('upms/position/tree',row)"></tree-select>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" min-width="50">
                            <template slot-scope="{row, $index}">
                                <el-button v-if="userForm.list.length>1" type="text" size="small" @click="delItem($index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-form-item label="附件" prop="attachment" class="big">
                        <upload-panel :size="6" accept=".jpg,.jpeg,.png,.gif" :file-list.sync="attachment" :show-img="true"></upload-panel>
                    </el-form-item>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('userForm')">保存</el-button>
                <el-button @click="close">返回</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import TreeSelect from '@/components/TreeSelect/index'
    import ajax from '@/utils/request'
    import {tool, ruleTool} from '@/utils/common'
    import UploadPanel from '@/components/UploadPanel/index'

    export default {
        mixins: [tool, ruleTool],
        components: {TreeSelect, UploadPanel},
        data() {

            return {
                userForm: {
                    list: [{}],
                    userId: '',
                    name: '',
                    phone: '',
                    email: '',
                    education: '',
                    qualification: '',
                    employeeStatus: '',
                    gender: '',
                },
                attachment: [],
                openCollapse: ["1", "2"],//默认打开的面板
                flag: this.getCurrentUserInfo()['managementCompanyId'] ? '' : 'empty',
                rules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: ['blur', 'change']},
                        {max: 20, message: '姓名不能超过20字符', trigger: ['blur', 'change']}
                    ],
                    phone: [
                        {required: true, message: '请输入手机号码', trigger: ['blur', 'change']},
                        {pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/, message: '手机号码格式错误', trigger: ['blur', 'change']}
                    ],
                    email: [
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']},
                        {max: 50, message: '邮箱不能超过50个字符', trigger: ['blur', 'change']}
                    ],
                    gender: [
                        {required: true, message: '请选择性别', trigger: ['blur', 'change']},
                    ],
                    employeeStatus: [
                        {required: true, message: '请选择状态', trigger: ['blur', 'change']},
                    ],
                    education: [
                        {required: true, message: '请选择学历', trigger: ['blur', 'change']},
                    ],
                    qualification: [
                        {required: true, message: '请选择职称', trigger: ['blur', 'change']},
                    ]

                },
            }
        },
        methods: {
            getUserByPhone() {
                let phone = this.userForm.phone
                if(phone && phone.length == 11) {
                    ajax.get('upms/user/getUserByPhone?phone=' + phone).then(rs => {
                        let data = rs.data
                        if(data) {
                            this.userForm.userId = data.id
                            this.userForm.name = data.name
                            this.userForm.gender = data.gender
                            this.userForm.education = data.education
                            this.userForm.qualification = data.qualification
                        }
                    });
                }
            },
            //进入编辑页调用 bean为列表页传入数据
            open() {
                this.openCollapse = ["1", "2"];
                if (this.$route.query.id) {
                    ajax.get('upms/employee/' + this.$route.query.id).then(rs => {
                        //if (this.checkResponse(rs)) {
                        /*rs.data.userType += '';
                        rs.data.employeeStatus += '';*/
                        this.userForm = Object.assign(this.userForm, rs.data);
                        if (null != rs.data.attachment && rs.data.attachment.length > 0) {
                            this.attachment = JSON.parse(rs.data.attachment);
                        }
                        //}
                    });
                    //加载用户的权限信息
                    ajax.get('upms/user/getUserOrganStructure', {id: this.$route.query.id}).then(rs => {
                        if (this.checkResponse(rs)) {
                            // this.$set(this.userForm,'list',rs.data)
                            this.setAuthData(rs.data.rows);

                        }

                    });
                }
            },
            setAuthData(data) {
                // data = [
                //     {
                //         organizations: [],
                //         positions: [],
                //         roles: [],
                //     }
                // ];
                this.userForm.list = [];
                if (data && data.length) {
                    data.forEach(item => {
                        let bean = Object.assign({}, item);
                        bean.organizations = [];
                        item.organizations && item.organizations.forEach(item2 => {
                            bean.organizations.push(item2.id);
                        });
                        bean.positions = [];
                        item.positions && item.positions.forEach(item2 => {
                            bean.positions.push(item2.id);
                        });
                        bean.roles = [];
                        item.roles && item.roles.forEach(item2 => {
                            bean.roles.push(item2.id);
                        });
                        this.userForm.list.push(bean);
                    })
                } else {
                    this.userForm.list = [{}];
                }
                this.$set(this.userForm, 'list', this.userForm.list);

            },
            submitForm(form) {
                var that = this;
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        if (!this.userForm.list || this.userForm.list.length === 0) {
                            this.showMessage('校验不通过，请检查输入项');
                            return;
                        }
                        let organizations = [];
                        let positions = [];
                        let roles = [];
                        this.userForm.list.forEach(item => {
                            organizations.push(item.organizations);
                            positions.push(item.positions);
                            roles.push(item.roles);
                        });
                        const data = Object.assign(this.userForm, {
                            organizations: JSON.stringify(organizations),
                            positions: JSON.stringify(positions),
                            roles: JSON.stringify(roles)
                        });

                        if (this.attachment && this.attachment.length > 0) {
                            data.attachment = JSON.stringify(this.attachment);
                        }
                        data.createTime = ''
                        data.updateTime = ''
                        console.log(data)
                        ajax.post('upms/employee', data).then(rs => {
                            //if (this.checkResponse(rs)) {
                            that.$message({message: '保存成功！', type: 'success'});
                            that.close();
                            //}
                        });
                    } else {
                        this.showMessage('校验不通过，请检查输入项');
                        return false;
                    }
                });
            },
            setUrl(url, data) {
                console.log(data);
                if (this.flag && (!data.organizations || data.organizations.length === 0)) {
                    return "";
                } else {
                    return url + "?managerId=" + (data.organizations ? data.organizations[0] : "")
                }
            },
            addItem() {
                this.userForm.list.push({});
            },
            delItem(i) {
                this.userForm.list.splice(i, 1);
            },
        },
        mounted() {
            this.open();
        }
    }
</script>

<style scoped lang="scss">
    .user-input {
        /deep/ .el-form-item__content {
            display: flex;

            .el-checkbox {
                margin-left: 10px;
                margin-right: 0;
            }
        }
    }
</style>
