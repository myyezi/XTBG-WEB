<template>
    <div class="form-panel">
        <el-form :model="powerproprietorForm" :rules="rules" ref="powerproprietorForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="基本信息" name="1">
                    <div class="flex-panel">
                        <el-form-item label="业主名称" prop="name">
                            <el-input v-model="powerproprietorForm.name" placeholder="请输入业主名称" maxlength=30 clearable></el-input>
                        </el-form-item>
                        <el-form-item label="地区" prop="districtId">
                            <city-select-panel :value.sync="powerproprietorForm.districtId" ref="citySelect"></city-select-panel>
                        </el-form-item>
                        <el-form-item label="详细位置" prop="address">
                            <el-input v-model="powerproprietorForm.address" @click.native="showDialogPosition()" readonly>
                                <el-button slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="经度" prop="longitude">
                            <el-input v-model="powerproprietorForm.longitude" placeholder="请确认位置" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="纬度" prop="latitude">
                            <el-input v-model="powerproprietorForm.latitude" placeholder="请确认位置" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="备注" prop="remark" class="big">
                            <el-input type="textarea" v-model="powerproprietorForm.remark" placeholder="请输入备注" maxlength="200" clearable></el-input>
                        </el-form-item>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="联系人信息" name="2">
                    <el-button class="float-btn" type="primary" @click="addItem">新增</el-button>
                    <el-table border :data="powerproprietorForm.contactList" style="width: 100%">
                        <el-table-column prop="index" label="序号" min-width="50">
                            <template slot-scope="{row,$index}">
                                <span>{{$index+1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="姓名" min-width="200" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'contactList.' + $index + '.name'" :rules="rules.required('请输入姓名')">
                                    <el-input v-model="row.name" placeholder="" :maxlength="15" show-word-limit clearable></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="手机号" min-width="200" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'contactList.' + $index + '.phone'" :rules="rules.required('请输入手机号')">
                                    <el-input v-model="row.phone" placeholder="" :maxlength="11" show-word-limit clearable></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="邮箱" min-width="200" >
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'contactList.' + $index + '.email'" >
                                    <el-input v-model="row.email" placeholder="" :maxlength="50" show-word-limit clearable></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="职务" min-width="200" label-class-name="required">
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'contactList.' + $index + '.post'" :rules="rules.required('请输入职务')">
                                    <el-input v-model="row.post" placeholder="" :maxlength="20" show-word-limit clearable></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="部门" min-width="200" >
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'contactList.' + $index + '.department'" >
                                    <el-input v-model="row.department" placeholder="" :maxlength="20" show-word-limit clearable></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="单位" min-width="200" >
                            <template slot-scope="{row,$index}">
                                <el-form-item :prop="'contactList.' + $index + '.company'" >
                                    <el-input v-model="row.company" placeholder="" :maxlength="50" show-word-limit clearable></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" min-width="50">
                            <template slot-scope="{row, $index}">
                                <el-button v-if="powerproprietorForm.contactList.length>1" type="text" size="small" @click="delItem($index, row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('powerproprietorForm')">保存</el-button>
                <el-button @click="close">返回</el-button>
            </div>
        </el-form>

        <!-- 位置选择弹框----------------------->
        <el-dialog title="站点位置" :visible.sync="dialogPositionVisible" :append-to-body="true" width="70%">
            <baidu-map @selectLocation="selectLocation" v-model="position"></baidu-map>
        </el-dialog>
    </div>
</template>

<script>
    import ajax from '@/utils/request'
    import {tool, ruleTool} from '@/utils/common'
    import CitySelectPanel from '@/components/CitySelect/index'
    import BaiduMap from '@/components/BaiduMap/index'

    export default {
        mixins: [tool, ruleTool],
        components: {CitySelectPanel, BaiduMap},
        data() {
            return {
                powerproprietorForm: {
                    address: '',
                    longitude: '',
                    latitude: '',
                    contactList: [],
                },
                position: '',
                openCollapse: ["1", "2"],//默认打开的面板
                dialogPositionVisible: false,
                rules: {
                    name: [
                        {required: true, message: '请输入业主名称', trigger: ['blur']}
                    ],
                    districtId: [
                        {required: true, message: '请输入地区', trigger: ['blur']}
                    ],
                    address: [
                        {required: true, message: '请输入详细地址', trigger: ['blur']}
                    ],
                    adress: [
                        {required: true, message: '请输入详细地址', trigger: ['blur']}
                    ],
                    longitude: [
                        {required: true, message: '请输入经度', trigger: ['blur']}
                    ],
                    latitude: [
                        {required: true, message: '请输入纬度', trigger: ['blur']}
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
                    ajax.get('upms/powerproprietor/' + this.$route.query.id).then(rs => {
                        this.powerproprietorForm = rs.data;
                        if (rs.data.districtId && rs.data.districtId.length > 0) {
                            this.powerproprietorForm.districtId = rs.data.districtId.split(",");
                        }
                        if (rs.data.address && rs.data.address.length > 0) {
                            this.powerproprietorForm.address = rs.data.address;
                        }
                    });
                } else {
                    this.powerproprietorForm.contactList= [];
                }
            },

            //保存
            submitForm(form) {
                var data = this.powerproprietorForm;
                this.$refs[form].validate((valid) => {
                    if (!valid) {
                        this.$message.error('校验不通过，请检查输入项');
                        return;
                    }
                    if (Array.isArray(this.powerproprietorForm.districtId) && this.powerproprietorForm.districtId.length == 3) {
                        data.districtId = this.powerproprietorForm.districtId[2];
                    }
                    ajax.post('upms/powerproprietor', data).then(rs => {
                        if (rs.status == 0) {
                            this.$message.success(rs.msg);
                            this.close();
                        } else {
                            this.$message.error(rs.msg);
                        }
                    });
                });
            },
            showDialogPosition() {
                this.dialogPositionVisible = true;
            },

            selectLocation(location) {
                console.log(location)
                this.powerproprietorForm.address = location.address;
                this.powerproprietorForm.longitude = location.lng;
                this.powerproprietorForm.latitude = location.lat;
                this.dialogPositionVisible = false;
            },
            addItem() {
                this.powerproprietorForm.contactList.push({

                });
            },
            delItem(i, row) {
                this.$confirm("确认删除吗？").then(_ => {
                    this.powerproprietorForm.contactList.splice(i, 1);
                }).catch(_ => {
                });
            },

        },
    }
</script>
