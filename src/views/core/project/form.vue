<template>
    <div class="form-panel">
        <el-form :model="projectForm" :rules="rules" ref="projectForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="项目信息" name="1">
                    <div class="flex-panel">
                        <el-form-item label="项目编号" prop="code">
                            <el-input v-model="projectForm.code" placeholder="请输入编号" maxlength=30 clearable></el-input>
                        </el-form-item>
                        <el-form-item label="项目名称" prop="name">
                            <el-input v-model="projectForm.name" placeholder="请输入名称" maxlength=30 clearable></el-input>
                        </el-form-item>
                        <el-form-item label="项目类型" prop="type">
                            <el-select v-model="projectForm.type" clearable placeholder="请选择项目类型">
                                <el-option  label="输变电工程" :value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="计划开工日期"  prop="planStartDate">
                            <el-date-picker
                                v-model="projectForm.planStartDate"
                                clearable
                                type="date"
                                placeholder="选择计划开工日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="计划竣工日期"  prop="planEndDate">
                            <el-date-picker
                                v-model="projectForm.planEndDate"
                                clearable
                                type="date"
                                placeholder="选择计划竣工日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="实际开工日期" >
                            <el-date-picker
                                v-model="projectForm.actualStartDate"
                                clearable
                                type="date"
                                placeholder="选择实际开工日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="实际竣工日期" >
                            <el-date-picker
                                v-model="projectForm.actualEndDate"
                                clearable
                                type="date"
                                placeholder="选择实际竣工日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="项目状态" prop="projectStatus">
                            <el-select v-model="projectForm.projectStatus" clearable placeholder="请选择项目状态">
                                <el-option  label="工程前期" :value="1"></el-option>
                                <el-option  label="工程建设" :value="2"></el-option>
                                <el-option  label="总结及评价" :value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="联系电话">
                            <el-input v-model="projectForm.contractNum" placeholder="请输入联系电话" maxlength=30 clearable></el-input>
                        </el-form-item>
                        <el-form-item label="传真">
                            <el-input v-model="projectForm.fax" placeholder="请输入传真" maxlength=30 clearable></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <el-input v-model="projectForm.email" placeholder="请输入邮箱" maxlength=30 clearable></el-input>
                        </el-form-item>
                        <el-form-item label="资料是否齐全" prop="isArchiveFull">
                            <el-select v-model="projectForm.isArchiveFull" clearable placeholder="请选择资料是否齐全">
                                <el-option  label="是" :value="1"></el-option>
                                <el-option  label="否" :value="0"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="缺失资料说明">
                            <el-input type="textarea" v-model="projectForm.missArchive" placeholder="请输入缺失资料说明"
                                      maxlength="200" clearable></el-input>
                        </el-form-item>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="项目位置" name="2">
                    <div class="flex-panel">
                        <el-form-item label="项目地址" prop="adress">
                            <el-input v-model="projectForm.adress" @click.native="showDialogAdress()" readonly>
                                <el-button slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="经度">
                            <el-input v-model="projectForm.longitude" placeholder="请确认位置"
                                      maxlength="10" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="纬度">
                            <el-input v-model="projectForm.latitude" placeholder="请确认位置"
                                      maxlength="10" disabled></el-input>
                        </el-form-item>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="项目概况" name="3">
                    <div class="flex-panel">
                        <el-form-item label="项目概况" prop="comment" class="big">
                            <el-input type="textarea" v-model="projectForm.comment" placeholder="请输入项目概况"
                                      maxlength="500" clearable></el-input>
                        </el-form-item>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="子项目信息" name="4">
                    <el-button class="float-btn" type="primary" @click="addSubItem">新增</el-button>
                    <el-table border :data="projectForm.projectSubList" style="width: 100%">
                        <el-table-column prop="index" label="序号" min-width="70">
                            <template slot-scope="{row,$index}">
                                <span>{{$index+1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="项目类型" min-width="150" label-class-name="required">
                            <template slot-scope="{row,$index}" >
                                <el-form-item :prop="'projectSubList.' + $index + '.subType'" >
                                    <el-select v-model="row.subType" placeholder="请选择">
                                        <el-option label="输电线路工程" :value="1"></el-option>
                                        <el-option label="变电站工程" :value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="项目编号" min-width="200" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'projectSubList.' + $index + '.subCode'"
                                              :rules="rules.required('请输入项目编号')">
                                    <el-input v-model="row.subCode" placeholder="请输入项目编号" maxlength=30
                                              clearable></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="项目名称" min-width="200" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'projectSubList.' + $index + '.subName'"
                                              :rules="rules.required('请输入项目名称')">
                                    <el-input v-model="row.subName" placeholder="请输入项目名称" maxlength=30
                                              clearable></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="startDate" label="计划开始日期" min-width="200" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'projectSubList.' + $index + '.startDate'"  :rules="rules.required('请选择计划开始日期')">
                                    <el-date-picker type="date" placeholder="请选择" v-model="row.startDate"
                                                    value-format="yyyy-MM-dd" :picker-options="row.startDate"
                                                    :editable="false"></el-date-picker>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="endDate" label="计划结束日期" min-width="200" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'projectSubList.' + $index + '.endDate'"  :rules="rules.required('请选择计划结束日期')">
                                    <el-date-picker type="date" placeholder="请选择" v-model="row.endDate"
                                                    value-format="yyyy-MM-dd" :picker-options="row.endDate"
                                                    :editable="false"></el-date-picker>
                                </el-form-item>
                            </template>
                        </el-table-column>

                        <el-table-column label="操作" min-width="50">
                            <template slot-scope="{row, $index}">
                                <el-button v-if="projectForm.projectSubList.length>1" type="text"
                                           size="small" @click="delSubItem($index)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-collapse-item>
                <el-collapse-item title="参建单位" name="5">
                    <el-button class="float-btn" type="primary" @click="addCompanyItem">新增</el-button>
                    <el-table border :data="projectForm.projectCompanyList" style="width: 100%">
                        <el-table-column prop="index" label="序号" min-width="70">
                            <template slot-scope="{row,$index}">
                                <span>{{$index+1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="单位名称" min-width="200" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'projectCompanyList.' + $index + '.companyName'"
                                              :rules="rules.required('请输入单位名称')">
                                    <el-input v-model="row.companyName" placeholder="请输入单位名称" maxlength=30
                                              clearable></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="项目部名称" min-width="200" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'projectCompanyList.' + $index + '.deptName'"
                                              :rules="rules.required('请输入项目部名称')">
                                    <el-input v-model="row.deptName" placeholder="请输入项目部名称" maxlength=30
                                              clearable></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="人员姓名" min-width="200" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'projectCompanyList.' + $index + '.personName'"
                                              :rules="rules.required('请输入人员姓名')">
                                    <el-input v-model="row.personName" placeholder="请输入人员姓名" maxlength=20
                                              clearable></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="联系方式" min-width="200" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'projectCompanyList.' + $index + '.companyContactNum'"
                                              :rules="rules.required('请输入联系方式')">
                                    <el-input v-model="row.companyContactNum" placeholder="请输入联系方式" maxlength=20
                                              clearable></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="人员角色" min-width="200" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'projectCompanyList.' + $index + '.position'"
                                              :rules="rules.required('请输入人员角色')">
                                    <el-input v-model="row.position" placeholder="请输入人员角色" maxlength=20
                                              clearable></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="职称" min-width="200" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'projectCompanyList.' + $index + '.profession'"
                                              :rules="rules.required('请输入职称')">
                                    <el-input v-model="row.profession" placeholder="请输入职称" maxlength=20
                                              clearable></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="资格证书编号" min-width="200" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'projectCompanyList.' + $index + '.certNum'"
                                              :rules="rules.required('请输入资格证书编号')">
                                    <el-input v-model="row.certNum" placeholder="请输入资格证书编号" maxlength=20
                                              clearable></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" min-width="50">
                            <template slot-scope="{row, $index}">
                                <el-button v-if="projectForm.projectCompanyList.length>1" type="text"
                                           size="small" @click="delCompanyItem($index)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-collapse-item>
            </el-collapse>

            <div class="left-row">
                <el-button type="primary" @click="submitForm('projectForm')">保存</el-button>
                <el-button @click="close">返回</el-button>
            </div>
        </el-form>
        <el-dialog title="位置" :visible.sync="dialogAdressVisible" :append-to-body="true" width="70%">
            <baidu-map @selectLocation="selectLocation" v-model="adress"></baidu-map>
        </el-dialog>
    </div>
</template>

<script>
    import ajax from '@/utils/request'
    import {tool, ruleTool} from '@/utils/common'
    import BaiduMap from '@/components/BaiduMap/index'

    export default {
        mixins: [tool, ruleTool],
        components: {BaiduMap},
        data() {
            return {
                projectForm: {
                    projectSubList : [],
                    projectCompanyList : []
                },
                openCollapse: ["1","2","3","4","5"],//默认打开的面板
                adress : '',
                dialogAdressVisible : false,
                rules: {
                    code: [
                        {required: true, message: '请输入项目编号', trigger: ['blur']}
                    ],
                    name: [
                        {required: true, message: '请输入项目名称', trigger: ['blur']}
                    ],
                    type: [
                        {required: true, message: '请选择项目类型', trigger: ['change']}
                    ],
                    planStartDate: [
                        {required: true, message: '请输入计划开工日期', trigger: ['blur']}
                    ],
                    planEndDate: [
                        {required: true, message: '请输入计划竣工日期', trigger: ['blur']}
                    ],
                    adress: [
                        {required: true, message: '请选择项目地址', trigger: ['blur']}
                    ],
                    projectStatus: [
                        {required: true, message: '请选择项目状态', trigger: ['change']}
                    ],
                    isArchiveFull: [
                        {required: true, message: '请选择资料是否齐全', trigger: ['change']}
                    ],
                }
            }
        },
        mounted() {
            this.open();
        },
        methods: {

            //进入编辑页调用 bean为列表页传入数据
            open() {
                if (this.$route.query.id) {
                    ajax.get('core/project/' + this.$route.query.id).then(rs => {
                        this.projectForm = rs.data;
                        if (null != rs.data.img && rs.data.img.length > 0) {
                            this.img = JSON.parse(rs.data.img);
                        }
                    });
                }
            },
            showDialogAdress() {
                this.dialogAdressVisible = true;
            },
            selectLocation(location) {
                console.log(location)
                this.projectForm.adress = location.address;
                this.projectForm.longitude = location.lng;
                this.projectForm.latitude = location.lat;
                this.dialogAdressVisible = false;
            },

            //保存
            submitForm(form) {
                var data = this.projectForm;
                this.$refs[form]
                        .validate((valid) => {
                    if (!valid) {
                        this.$message
                                .error('校验不通过，请检查输入项');
                        return;
                    }
                    ajax.post('core/project/save', data).then(rs => {
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
            addSubItem() {
                this.projectForm.projectSubList.push({gunStatus:1});
            },
            delSubItem(i) {
                this.projectForm.projectSubList.splice(i, 1);
            },
            addCompanyItem() {
                this.projectForm.projectCompanyList.push({gunStatus:1});
            },
            delCompanyItem(i) {
                //console.log(this.projectForm.projectCompanyList)
                this.projectForm.projectCompanyList.splice(i, 1);
            },

        },
    }
</script>
