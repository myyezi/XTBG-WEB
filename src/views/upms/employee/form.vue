<template>
    <div class="form-panel">
        <el-form :model="employeeForm" :rules="rules" ref="employeeForm" label-position="top" label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="基本信息" name="1">
                    <div class="flex-panel">
                        <el-form-item label="手机号" prop="account">
                            <el-input v-model="employeeForm.account" placeholder="请输入手机号" maxlength=11 show-word-limit
                                      clearable
                                      @change="getUserByPhone()"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="employeeForm.name" placeholder="输入手机号码自动带入" clearable
                                      disabled></el-input>
                        </el-form-item>
                        <el-form-item label="学历" prop="education">
                            <el-select class="overall_situation_input_icon" v-model="employeeForm.education" disabled
                                       placeholder="输入手机号码自动带入">
                                <el-option v-for="item in xlList" :key="item.value" :label="item.text"
                                           :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="职称" prop="qualification">
                            <el-select class="overall_situation_input_icon" v-model="employeeForm.qualification"
                                       disabled placeholder="输入手机号码自动带入">
                                <el-option v-for="item in zcList" :key="item.value" :label="item.text"
                                           :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="employeeForm.email" placeholder="请输入邮箱" maxlength=50 show-word-limit
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="入职日期" prop="entryDate">
                            <el-date-picker
                                v-model="employeeForm.entryDate" type="date" placeholder="请选择入职日期"
                                :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="权限信息" name="2" v-if="employeeForm.employeeStatus != 3">
                    <el-button class="float-btn" type="primary" @click="addItem">新增</el-button>
                    <el-table border :data="employeeForm.list" style="width: 100%">
                        <el-table-column label="组织" min-width="200" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'list.' + $index + '.organizations'"
                                              :rules="rules.required('请选择组织')">
                                    <tree-select v-model="row.organizations" placeholder="请选择" type="one"
                                                 :disabled-id="['1']"
                                                 url="/upms/employee/treeNodeByCompanyId"></tree-select>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="角色" min-width="200" label-class-name="">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'list.' + $index + '.roles'">
                                    <tree-select v-model="row.roles" placeholder="请选择" type="one"
                                                 :url="setUrl('upms/role/findByCompany',row)"></tree-select>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="职位" min-width="200" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'list.' + $index + '.positions'"
                                              :rules="rules.required('请选择职位')">
                                    <tree-select v-model="row.positions" placeholder="请选择" type="one"
                                                 :url="setUrl('upms/position/tree',row)"></tree-select>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" min-width="50">
                            <template slot-scope="{row, $index}">
                                <el-button v-if="employeeForm.list.length>1" type="text" size="small"
                                           @click="delItem($index)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-collapse-item>

                <el-collapse-item title="档案信息" name="3">
                    <div class="flex-panel">
                        <el-divider content-position="left">工作信息</el-divider>
                        <el-form-item label="员工类型" prop="type">
                            <el-select v-model="employeeForm.type" filterable clearable placeholder="请选择员工类型">
                                <el-option v-for="item in typeList" :key="item.value" :label="item.text"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="员工状态" prop="employeeStatus">
                            <el-select v-model="employeeForm.employeeStatus" filterable clearable placeholder="请选择员工状态">
                                <el-option label="试用期" :value="1"></el-option>
                                <el-option label="正式员工" :value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="试用期" prop="probation">
                            <el-select v-model="employeeForm.probation" filterable clearable placeholder="请选择试用期">
                                <el-option v-for="item in probationList" :key="item.value" :label="item.text"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="转正日期" prop="positiveDate">
                            <el-date-picker
                                v-model="employeeForm.positiveDate" type="date" placeholder="请选择转正日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="岗位职级" prop="postLevel">
                            <el-input v-model="employeeForm.postLevel" placeholder="请输入岗位职级" maxlength=20
                                      show-word-limit clearable></el-input>
                        </el-form-item>
                    </div>
                    <div class="flex-panel">
                        <el-divider content-position="left">个人信息</el-divider>
                        <el-form-item label="身份证姓名" prop="idCardName">
                            <el-input v-model="employeeForm.idCardName" placeholder="请输入身份证姓名" maxlength=20
                                      show-word-limit clearable></el-input>
                        </el-form-item>
                        <el-form-item label="证件号码" prop="idCard">
                            <el-input v-model="employeeForm.idCard" placeholder="请输入证件号码" maxlength=18 show-word-limit
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="出生日期" prop="birthday">
                            <el-date-picker
                                v-model="employeeForm.birthday" type="date" placeholder="请选择出生日期"
                                :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-select v-model="employeeForm.gender" placeholder="输入手机号码自动带入" filterable clearable
                                       disabled>
                                <el-option label="男" :value="1"></el-option>
                                <el-option label="女" :value="2"></el-option>
                                <el-option label="其他" :value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="名族" prop="nationality">
                            <el-select v-model="employeeForm.nationality" filterable clearable placeholder="请选择名族">
                                <el-option v-for="item in nationalityList" :key="item.value" :label="item.text"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="身份证地址" prop="idCardAddress">
                            <el-input v-model="employeeForm.idCardAddress" placeholder="请输入身份证地址" maxlength=50
                                      show-word-limit clearable></el-input>
                        </el-form-item>
                        <el-form-item label="证件有效期" prop="idCardValidity">
                            <el-col :span="15">
                                <el-date-picker
                                    v-model="employeeForm.idCardValidity" type="date" placeholder="请选择证件有效期"
                                    style="width: 100%;">
                                </el-date-picker>
                            </el-col>
                            <el-col :span="9" style="float: right;text-align: right;">
                                <span>长期</span>
                                <el-switch v-model="employeeForm.idCardLong"></el-switch>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="户籍类型" prop="householdRegister">
                            <el-select v-model="employeeForm.householdRegister" filterable clearable
                                       placeholder="请选择户籍类型">
                                <el-option v-for="item in householdRegisterList" :key="item.value" :label="item.text"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="住址" prop="address">
                            <el-input v-model="employeeForm.address" placeholder="请输入现住地址" maxlength=50 show-word-limit
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="政治面貌" prop="political">
                            <el-select v-model="employeeForm.political" filterable clearable placeholder="请选择政治面貌">
                                <el-option v-for="item in politicalList" :key="item.value" :label="item.text"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="婚姻状况" prop="marital">
                            <el-select v-model="employeeForm.marital" filterable clearable placeholder="请选择婚姻状况">
                                <el-option v-for="item in maritalList" :key="item.value" :label="item.text"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="首次参加工作日期" prop="workDate">
                            <el-date-picker
                                v-model="employeeForm.workDate" type="date" placeholder="请选择工作日期"
                                :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="社保账号" prop="socialSecurity">
                            <el-input v-model="employeeForm.socialSecurity" placeholder="请输入社保账号" maxlength=20
                                      show-word-limit clearable></el-input>
                        </el-form-item>
                        <el-form-item label="公积金帐号" prop="providentFund">
                            <el-input v-model="employeeForm.providentFund" placeholder="请输入公积金帐号" maxlength=20
                                      show-word-limit clearable></el-input>
                        </el-form-item>
                    </div>
                    <el-divider content-position="left">学历信息</el-divider>
                    <el-button type="primary" @click="addEducationItem" size="small"
                               style="float: right;margin-bottom: 5px">新增
                    </el-button>
                    <el-table border :data="employeeForm.educationList" style="width: 100%">
                        <el-table-column prop="index" label="序号" min-width="50">
                            <template slot-scope="{row,$index}">
                                <span>{{$index+1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="学历" min-width="200">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'educationList.' + $index + '.education'">
                                    <el-select v-model="row.education" filterable clearable placeholder="请选择学历">
                                        <el-option v-for="item in xlList" :key="item.value" :label="item.text"
                                                   :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="毕业院校" min-width="200">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'educationList.' + $index + '.school'">
                                    <el-input v-model="row.school" placeholder="请输入毕业院校" :maxlength=50 show-word-limit
                                              clearable></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="毕业时间" min-width="200">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'educationList.' + $index + '.graduationDate'">
                                    <el-date-picker
                                        v-model="row.graduationDate" type="date" placeholder="请选择毕业时间">
                                    </el-date-picker>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="所学专业" min-width="200">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'educationList.' + $index + '.profession'">
                                    <el-input v-model="row.profession" placeholder="请输入专业" :maxlength=20 show-word-limit
                                              clearable></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" min-width="50">
                            <template slot-scope="{row, $index}">
                                <el-button v-if="employeeForm.educationList.length>1" type="text" size="small"
                                           @click="deleducationItem($index, row)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div class="flex-panel">
                        <el-divider content-position="left">银行卡信息</el-divider>
                        <el-form-item label="银行卡号" prop="bankAccount">
                            <el-input v-model="employeeForm.bankAccount" placeholder="请输入银行卡号" maxlength=20
                                      show-word-limit clearable></el-input>
                        </el-form-item>
                        <el-form-item label="开户行" prop="bank">
                            <el-input v-model="employeeForm.bank" placeholder="请输入开户行" maxlength=30
                                      show-word-limit clearable></el-input>
                        </el-form-item>
                    </div>
                    <div class="flex-panel">
                        <el-divider content-position="left">合同信息</el-divider>
                        <el-form-item label="合同公司" prop="contractCompany">
                            <el-input v-model="employeeForm.contractCompany" placeholder="请输入合同公司" maxlength=30
                                      show-word-limit clearable></el-input>
                        </el-form-item>
                        <el-form-item label="合同类型" prop="contractType">
                            <el-select v-model="employeeForm.contractType" filterable clearable placeholder="请选择合同类型">
                                <el-option v-for="item in contractTypeList" :key="item.value" :label="item.text"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="首次合同起始日" prop="contractStartDate">
                            <el-date-picker
                                v-model="employeeForm.contractStartDate" type="date" placeholder="请选择合同起始日">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="首次合同到期日" prop="contractEndDate">
                            <el-date-picker
                                v-model="employeeForm.contractEndDate" type="date" placeholder="请选择合同到期日">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="现合同起始日" prop="contractCstartDate">
                            <el-date-picker
                                v-model="employeeForm.contractCstartDate" type="date" placeholder="请选择现合同起始日">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="现合同到期日" prop="contractCendDate">
                            <el-date-picker
                                v-model="employeeForm.contractCendDate" type="date" placeholder="请选择现合同到期日">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="合同期限" prop="contractPeriod">
                            <el-select v-model="employeeForm.contractPeriod" filterable clearable placeholder="请选择合同期限">
                                <el-option v-for="item in contractPeriodList" :key="item.value" :label="item.text"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="续签次数" prop="contractCount">
                            <el-input v-model="employeeForm.contractCount" placeholder="请输入续签次数" maxlength=5
                                      show-word-limit clearable></el-input>
                        </el-form-item>
                    </div>
                    <el-divider content-position="left">紧急联系人</el-divider>
                    <el-button type="primary" @click="addContactItem" size="small"
                               style="float: right;margin-bottom: 5px">新增
                    </el-button>
                    <el-table border :data="employeeForm.contactList" style="width: 100%">
                        <el-table-column prop="index" label="序号" min-width="50">
                            <template slot-scope="{row,$index}">
                                <span>{{$index+1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="紧急联系人姓名" min-width="200">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'contactList.' + $index + '.name'">
                                    <el-input v-model="row.name" placeholder="请输入紧急联系人姓名" :maxlength=10 show-word-limit
                                              clearable></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="联系人关系" min-width="200">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'contactList.' + $index + '.relationship'">
                                    <el-select v-model="row.relationship" filterable clearable placeholder="请选择联系人关系">
                                        <el-option v-for="item in relationshipList" :key="item.value" :label="item.text"
                                                   :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="联系人电话" min-width="200">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'contactList.' + $index + '.phone'">
                                    <el-input v-model="row.phone" placeholder="请输入联系人电话" :maxlength=15 show-word-limit
                                              clearable></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" min-width="50">
                            <template slot-scope="{row, $index}">
                                <el-button v-if="employeeForm.contactList.length>1" type="text" size="small"
                                           @click="delContactItem($index, row)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <el-divider content-position="left">个人资料</el-divider>
                    <el-button type="primary" @click="addAttachmentList" size="small"
                               style="float: right;margin-bottom: 5px">新增
                    </el-button>
                    <div v-for="(attachment,i) in employeeForm.attachmentList" :key="i">
                        <span>{{attachment.name}}</span>
                        <img v-if="attachment.path" width="30%" :src="employeeForm.fileDomain+attachment.path" alt="">
                        <el-upload v-else
                                   :multiple="true"
                                   :headers="headers"
                                   :show-file-list="false"
                                   :action="uploadUrl"
                                   :before-upload="uploadBefore"
                                   :on-change="uploadChange"
                                   :on-error="errorCallback"
                                   :on-remove="uploadChange">
                            <i class="el-icon-plus"></i>
                        </el-upload>

                    </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('employeeForm')">保存</el-button>
                <el-button @click="close">返回</el-button>
            </div>

            <el-dialog title="个人资料" v-dialogDrag :visible.sync="dialogVisible" :before-close="beforeClose" width="35%">
                <el-form>
                    <el-form-item label="照片名称" prop="attachmentName">
                        <el-input autocomplete="off" v-model="attachmentName" placeholder="请输入照片名称" :maxlength=10
                                  show-word-limit clearable t></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="ok">确 定</el-button>
                </div>
            </el-dialog>
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
                uploadUrl: process.env.BASE_API + "file/upload/multipart",
                headers: {
                    "Authorization": 'Bearer ' + this.$store.getters.token
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                dialogVisible: false,
                zcList: [],
                typeList: [],
                probationList: [],
                nationalityList: [],
                householdRegisterList: [],
                politicalList: [],
                maritalList: [],
                xlList: [],
                contractTypeList: [],
                contractPeriodList: [],
                relationshipList: [],
                attachmentName: "",
                employeeForm: {
                    fileDomain: process.env.URL_API,
                    list: [{}],
                    educationList: [{}],
                    contactList: [{}],
                    attachmentList: [
                        {name: "身份证正面", path: "", type: 1},
                        {name: "身份证背面", path: "", type: 2},
                        {name: "学历证书", path: "", type: 3},
                        {name: "学位证书", path: "", type: 4},
                        {name: "前公司离职证明", path: "", type: 5},
                        {name: "职称证书", path: "", type: 6},
                        {name: "员工照片", path: "", type: 7}
                    ],
                    userId: '',
                    name: '',
                    account: '',
                    email: '',
                    entryDate: '',
                    type: '',
                    probation: '',
                    positiveDate: '',
                    postLevel: '',
                    idCardName: '',
                    idCard: '',
                    birthday: '',
                    nationality: "",
                    idCardAddress: '',
                    idCardValidity: '',
                    idCardLong: '',
                    householdRegister: '',
                    address: '',
                    political: '',
                    marital: '',
                    workDate: '',
                    socialSecurity: '',
                    providentFund: '',
                    bankAccount: "",
                    bank: "",
                    contractCompany: '',
                    contractType: "",
                    contractStartDate: '',
                    contractEndDate: '',
                    contractCstartDate: '',
                    contractCendDate: '',
                    contractPeriod: '',
                    contractCount: "",

                    education: '',
                    qualification: '',
                    employeeStatus: '',
                    gender: '',
                },
                openCollapse: ["1", "2"],//默认打开的面板
                flag: this.getCurrentUserInfo()['managementCompanyId'] ? '' : 'empty',
                rules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: ['blur', 'change']},
                        {max: 20, message: '姓名不能超过20字符', trigger: ['blur', 'change']}
                    ],
                    account: [
                        {required: true, message: '请输入手机号码', trigger: ['blur', 'change']},
                        {pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/, message: '手机号码格式错误', trigger: ['blur', 'change']}
                    ],
                    email: [
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']},
                        {max: 50, message: '邮箱不能超过50个字符', trigger: ['blur', 'change']}
                    ],
                    entryDate: [
                        {required: true, message: '请选择入职日期', trigger: ['blur', 'change']},
                    ],
                    gender: [
                        {required: true, message: '请选择性别', trigger: ['blur', 'change']},
                    ],
                    employeeStatus: [
                        {required: true, message: '请选择员工状态', trigger: ['blur', 'change']},
                    ],


                },
            }
        },
        methods: {

            // 获取字典
            getDict() {
                let r = 'XL,ZC,YGLX,SYQ,MZ,HJLX,ZZMM,HYZK,HTLX,HTQX,LXRGX';
                ajax.get("upms/dict/allType/" + r).then(rs => {
                    this.xlList = rs.XL;
                    this.zcList = rs.ZC;
                    this.typeList = rs.YGLX;
                    this.probationList = rs.SYQ;
                    this.nationalityList = rs.MZ;
                    this.householdRegisterList = rs.HJLX;
                    this.politicalList = rs.ZZMM;
                    this.maritalList = rs.HYZK;
                    this.contractTypeList = rs.HTLX;
                    this.contractPeriodList = rs.HTQX;
                    this.relationshipList = rs.LXRGX;
                });
            },

            getUserByPhone() {
                this.employeeForm.name = ''
                this.employeeForm.gender = ''
                let account = this.employeeForm.account
                if (account && account.length == 11) {
                    ajax.get('/upms/user/getUserByPhone?phone=' + account).then(rs => {
                        let data = rs.data
                        if (data) {
                            this.employeeForm.userId = data.id
                            this.employeeForm.name = data.name
                            this.employeeForm.gender = data.gender
                            this.employeeForm.education = data.education
                            this.employeeForm.qualification = data.qualification
                        }
                    });
                }
            },
            //进入编辑页调用 bean为列表页传入数据
            open() {
                this.openCollapse = ["1", "2"];
                if (this.$route.query.id) {
                    ajax.get('upms/employee/' + this.$route.query.id).then(rs => {
                        this.employeeForm = Object.assign(this.employeeForm, rs.data);
                    });
                    //加载用户的权限信息
                    ajax.get('upms/user/getUserOrganStructure', {id: this.$route.query.id}).then(rs => {
                        if (this.checkResponse(rs)) {
                            // this.$set(this.employeeForm,'list',rs.data)
                            this.setAuthData(rs.data.rows);

                        }

                    });
                }
            },
            setAuthData(data) {
                this.employeeForm.list = [];
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
                        this.employeeForm.list.push(bean);
                    })
                } else {
                    this.employeeForm.list = [{}];
                }
                this.$set(this.employeeForm, 'list', this.employeeForm.list);

            },
            submitForm(form) {
                var that = this;
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        if (!this.employeeForm.list || this.employeeForm.list.length === 0) {
                            this.showMessage('校验不通过，请检查输入项');
                            return;
                        }
                        let organizations = [];
                        let positions = [];
                        let roles = [];
                        this.employeeForm.list.forEach(item => {
                            organizations.push(item.organizations);
                            positions.push(item.positions);
                            roles.push(item.roles);
                        });
                        const data = Object.assign(this.employeeForm, {
                            organizations: JSON.stringify(organizations),
                            positions: JSON.stringify(positions),
                            roles: JSON.stringify(roles)
                        });

                        if (data.roles.indexOf("null") != -1) {
                            data.roles = "[]"
                        }
                        data.idCardLong = this.employeeForm.idCardLong ? 1 : 0;
                        ajax.post('upms/employee', data).then(rs => {
                            if (rs.status == 0) {
                                that.$message({message: '保存成功！', type: 'success'});
                                that.close();
                            } else {
                                that.$message({message: rs.msg, type: 'error'});
                            }
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
                this.employeeForm.list.push({});
            },
            delItem(i) {
                this.$confirm("确认删除吗？").then(_ => {
                    this.employeeForm.list.splice(i, 1);
                }).catch(_ => {
                });
            },
            addEducationItem() {
                this.employeeForm.educationList.push({});
            },
            deleducationItem(i) {
                this.$confirm("确认删除吗？").then(_ => {
                    this.employeeForm.educationList.splice(i, 1);
                }).catch(_ => {
                });
            },
            addContactItem() {
                this.employeeForm.contactList.push({});
            },
            delContactItem(i) {
                this.$confirm("确认删除吗？").then(_ => {
                    this.employeeForm.contactList.splice(i, 1);
                }).catch(_ => {
                });
            },
            addAttachmentList() {
                this.dialogVisible = true;
                this.attachmentName="";
            },
            cancel(){
                this.dialogVisible = false;
                this.attachmentName="";
            },
            ok(){
                var type=this.employeeForm.attachmentList.size();
                this.employeeForm.attachmentList.push({name: this.attachmentName, path: "", type:type+1 });
                this.dialogVisible = false;
                this.attachmentName="";
            },
            delFile(i) {
                this.employeeForm.attachmentList.splice(i, 1);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            uploadBefore(file) {
                // 限制20M
                if (file.size > 1024 * 1024 * 2) {
                    this.showMessage("请上传2M以下的文件");
                    return false;
                }
                else {
                    this.loading = true;
                    // NProgress.start();
                    return true;
                }
            },
            errorCallback() {
                this.loading = false;
                this.$emit("error");
            },
            uploadChange(file) {
                this.loading = false;
                if (!file.response) {
                    return;
                }
                if (file.response.status == 0) {

                }
                this.$emit("update:employeeForm.attachmentList", this.employeeForm.attachmentList.slice(-this.size));
            },
        },
        mounted() {
            this.open();
            this.getDict();
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
