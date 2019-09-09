<template>
  <div class="form-panel">
    <el-form :model="personnelattendancegroupForm" :rules="rules" ref="personnelattendancegroupForm" label-position="top" label-width="100px" :class="{'register-form': true}">
      <el-collapse v-model="openCollapse">
        <el-collapse-item title="考勤组管理" name="1">
          <div class="flex-panel">
<!--              <el-form-item label="管理公司" prop="companyId">-->
<!--                  <el-select v-model="personnelattendancegroupForm.companyId" filterable clearable placeholder="请选择管理公司">-->
<!--                      <el-option-->
<!--                          v-for="item in companyList"-->
<!--                          :key="item.value"-->
<!--                          :label="item.name"-->
<!--                          :value="item.id">-->
<!--                      </el-option>-->
<!--                  </el-select>-->
<!--              </el-form-item>-->
            <el-form-item label="规则名称" prop="name" class="big" >
              <el-input v-model="personnelattendancegroupForm.name" placeholder="请输入规则名称" maxlength=100 show-word-limit clearable   style="width: calc(20% - 20px)" ></el-input>
            </el-form-item>

            <el-form-item label="工作日" prop="checkedCities" class="big">
                <el-checkbox-group
                    v-model="personnelattendancegroupForm.checkedCities">
                    <el-checkbox v-for="(item ,index) in cities" :label="item.value" :key="index">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label="打卡时间" prop="duty">
                <el-time-picker
                    is-range
                    v-model="personnelattendancegroupForm.duty"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围" value-format="HH:mm:ss">
                </el-time-picker>
            </el-form-item>

              <div class="flex-panel" style="padding-left: 10px" v-for="(item,index) in personnelattendancegroupForm.projectList" :key="item.key">
                  <el-form-item
                      :label="'考勤位置' + (index+1)"
                      :prop="'projectList.' + index + '.adress'"
                      :rules="{
                        required: true, message: '请输入考勤位置', trigger: ['blur','change']
                      }">
                      <el-input v-model="item.adress" @click.native="showDialogAdress(item.adress,index)" readonly>
                          <el-button slot="append" icon="el-icon-search"></el-button>
                      </el-input>
                  </el-form-item>
                  <el-form-item label="经度">
                      <el-input v-model="item.longitude" placeholder="请确认位置"
                                maxlength="10" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="纬度">
                      <el-input v-model="item.latitude" placeholder="请确认位置"
                                maxlength="10" disabled></el-input>
                  </el-form-item>
                  <el-form-item class="kaoqin_button">
                      <i class="el-icon-remove-outline" v-if="personnelattendancegroupForm.projectList.length>1" @click="removeAddress(index)"></i>
                      <i class="el-icon-circle-plus-outline" v-if="personnelattendancegroupForm.projectList.length == index+1" @click="addAddress"></i>
                  </el-form-item>
              </div>
            <el-form-item label="打卡范围" prop="attendanceRange">
              <el-input v-model="personnelattendancegroupForm.attendanceRange" placeholder="请输入打卡范围" maxlength=30 clearable type="number"></el-input>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="left-row">
        <el-button type="primary" @click="submitForm('personnelattendancegroupForm')">保存</el-button>
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
import { tool, ruleTool } from '@/utils/common'
import BaiduMap from '@/components/BaiduMap/index'

export default {
  mixins: [tool, ruleTool],
  components: {BaiduMap},
  data() {
    return {
      companyList:[],
      duty:[],
      cities: [{name :'常规工作日',value:'1'},{name :'含周六',value:'2'},{name :'含周日',value:'3'},{name :'含节假日',value:'4'}],
      personnelattendancegroupForm: {
        checkedCities:[],
        attendanceRange:'',
        projectList:[{
          adress:'',
          longitude:'',
          latitude:''
        }]
      },
      openCollapse: ["1"],//默认打开的面板
      adress : '',
      adressIndex:null,
      dialogAdressVisible : false,
      rules: {
        // id: [
        //   { required: true, message: '请输入主键', trigger: ['blur'] }
        // ],
        // companyId: [
        //   { required: true, message: '请选择管理公司', trigger: ['blur'] }
        // ],
        name: [
          { required: true, message: '请输入规则名称', trigger: ['blur'] }
        ],
        checkedCities: [
          { required: true, message: '请输入工作日', trigger: ['blur','change'] }
        ],
        duty: [
          { required: true, message: '请输入上班打卡时间', trigger: ['blur','change'] }
        ],
        attendanceRange: [
          { required: true, message: '请输入打卡范围', trigger: ['blur'] },
          {pattern: /^[+]{0,1}(\d+)$/, message: '请输入大于0的正整数', trigger: ['blur', 'change']}
        ],
      }
    }
  },
  mounted() {
      this.open();
  //  this.getCompanyList();
  },
  methods: {
    //进入编辑页调用 bean为列表页传入数据
    open() {
      if (this.$route.query.id) {
        ajax.get('personnel/personnelattendancegroup/' + this.$route.query.id).then(rs => {
            rs.data.projectList = this.personnelattendancegroupForm.projectList;
          this.personnelattendancegroupForm = rs.data;
            if (rs.data.onduty && rs.data.offduty.length > 0) {
                let duty = [];
                duty.push(rs.data.onduty);
                duty.push(rs.data.offduty);
                this.$set(this.personnelattendancegroupForm,'duty',duty)
            }
            if (rs.data.workingDay) {
                this.$set(this.personnelattendancegroupForm,'checkedCities',rs.data.workingDay.split(","))
            }
          if (null != rs.data.img && rs.data.img.length > 0) {
            this.img = JSON.parse(rs.data.img);
          }
          if (null != rs.data.adress && rs.data.adress.length > 0) {
                this.personnelattendancegroupForm.projectList = JSON.parse(rs.data.adress);
            }
        });
      }else{
          this.personnelattendancegroupForm.attendanceRange =200;
      }
    },
    showDialogAdress(adress,index) {
        this.adress = adress
        this.adressIndex = index
        this.dialogAdressVisible = true;
    },
    //加载地图
    selectLocation(location) {
        this.$set(this.personnelattendancegroupForm.projectList[this.adressIndex],'adress',location.address);
        this.$set(this.personnelattendancegroupForm.projectList[this.adressIndex],'longitude',location.lng);
        this.$set(this.personnelattendancegroupForm.projectList[this.adressIndex],'latitude',location.lat);
        this.dialogAdressVisible = false;
    },
    //获取项目
    getCompanyList() {
        ajax.get('personnel/personnelattendancegroup/getCompanyList').then(rs => {
            this.companyList = rs.data;
        });
    },
    //保存
    submitForm(form) {
      console.log(this.personnelattendancegroupForm)
      var data = this.personnelattendancegroupForm;
      this.$refs[form].validate((valid) => {
          if (!valid) {
            this.$message.error('校验不通过，请检查输入项');
            return;
          }
          if (this.personnelattendancegroupForm.duty && this.personnelattendancegroupForm.duty.length > 0) {
              data.onduty = this.personnelattendancegroupForm.duty[0];
              data.offduty = this.personnelattendancegroupForm.duty[1];
          }
          if (this.personnelattendancegroupForm.checkedCities && this.personnelattendancegroupForm.checkedCities.length > 0) {
              data.workingDay = this.personnelattendancegroupForm.checkedCities.join();
          }
          data.adress = JSON.stringify(data.projectList)
          ajax.post('personnel/personnelattendancegroup', data).then(rs => {
            if (rs.status == 0) {
              this.$message.success(rs.msg);
              this.close();
            } else {
              this.$message.error(rs.msg);
            }
          });
        });
    },
    // 增加考勤地址
    addAddress() {
        this.personnelattendancegroupForm.projectList.push({
            adress:'',
            longitude:'',
            latitude:'',
            key: Date.now()
        })
        this.$forceUpdate()
    },
    // 删除考勤地址
    removeAddress(index) {
        let _this = this
        this.$confirm('是否删除该考勤地址' ,'提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(function() {
            // 删除成功数据处理
            _this.personnelattendancegroupForm.projectList.splice(index, 1)
            _this.$forceUpdate()
        }).catch(function() {
        });
    },
  },
}
</script>
<style lang="scss">
  .kaoqin_button {
    padding-top:40px;
    i {
      font-size:28px;
      color:#999;
      margin-top: 3px;
      cursor: pointer;
    }
  }
</style>

