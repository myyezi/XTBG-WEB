<template>
  <div class="form-panel">
    <el-form :model="powerprojecttaskForm" :rules="rules" ref="powerprojecttaskForm" label-position="top" label-width="100px" :class="{'register-form': true}">
      <el-collapse v-model="openCollapse">
        <el-collapse-item title="项目任务书" name="1">
          <div class="flex-panel">
            <el-form-item label="项目名称" prop="name">
              <el-input v-model="powerprojecttaskForm.name" placeholder="请输入项目名称" maxlength=100 show-word-limit clearable></el-input>
            </el-form-item>
              <el-form-item label="项目类型" prop="type">
                  <el-select v-model="powerprojecttaskForm.type" clearable placeholder="请选择项目类型" @change="chickProjectType(powerprojecttaskForm.type)">
                      <el-option v-for="item in typeOptions" :key="item.value" :label="item.text" :value="item.value" >
                      </el-option>
                  </el-select>
              </el-form-item>
            <el-form-item label="建设单位" prop="proprietorId">
                <el-select v-model="powerprojecttaskForm.proprietorId"  filterable clearable placeholder="请选择建设单位" @change="loadContact">
                    <el-option
                        v-for="item in ProprietorList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="联系人" prop="proprietorContactId">
                <el-select v-model="powerprojecttaskForm.proprietorContactId"  filterable clearable placeholder="请选择联系人">
                    <el-option
                        v-for="item in ContactList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="任务依据" prop="source">
                  <el-select v-model="powerprojecttaskForm.source" clearable placeholder="请选择任务依据">
                      <el-option  label="委托书" value="1"></el-option>
                      <el-option  label="招标书" value="2"></el-option>
                      <el-option  label="电话委托" value="3"></el-option>
                      <el-option  label="中标通知书" value="4"></el-option>
                      <el-option  label="合同" value="5"></el-option>
                      <el-option  label="其他" value="6"></el-option>
                  </el-select>
            </el-form-item>
            <el-form-item label="相关设计" prop="relatedDesign">
                <el-select v-model="powerprojecttaskForm.relatedDesign" multiple filterable default-first-option placeholder="请选择相关设计">
                    <el-option v-for="item in designOptions" :key="item.value" :label="item.text" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="协办部门" prop="coDepartment">
                <el-select v-model="powerprojecttaskForm.coDepartment" multiple filterable default-first-option placeholder="请选择协办部门">
                    <el-option v-for="item in coDepartmentOptions" :key="item.value" :label="item.text" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目经理" prop="manager">
                <el-select v-model="powerprojecttaskForm.manager"  filterable clearable placeholder="请选择项目经理" >
                    <el-option
                        v-for="item in userList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="签收人" prop="signer">
                <el-select v-model="powerprojecttaskForm.signer"  filterable clearable placeholder="请选择签收人" >
                    <el-option
                        v-for="item in userList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
              <div class="flex-panel" style="padding-left: 10px">
                  <el-form-item label="项目位置" prop="adress">
                      <el-input v-model="powerprojecttaskForm.adress" @click.native="showDialogAdress()" readonly>
                          <el-button slot="append" icon="el-icon-search"></el-button>
                      </el-input>
                  </el-form-item>
                  <el-form-item label="经度">
                      <el-input v-model="powerprojecttaskForm.longitude" placeholder="请确认位置"
                                maxlength="10" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="纬度">
                      <el-input v-model="powerprojecttaskForm.latitude" placeholder="请确认位置"
                                maxlength="10" disabled></el-input>
                  </el-form-item>
              </div>
            <el-form-item label="设计规模" prop="designScale" class="big">
              <el-input v-model="powerprojecttaskForm.designScale" placeholder="请输入设计规模" maxlength=200 show-word-limit clearable></el-input>
            </el-form-item>
            <el-form-item label="设计范围" prop="designRange" class="big">
              <el-input v-model="powerprojecttaskForm.designRange" placeholder="请输入设计范围" maxlength=200 show-word-limit clearable></el-input>
            </el-form-item>
            <el-form-item label="项目进度要求" prop="progress" class="big">
              <el-input v-model="powerprojecttaskForm.progress" placeholder="请输入项目进度要求" maxlength=200 show-word-limit clearable></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark"  class="big">
              <el-input v-model="powerprojecttaskForm.remark" placeholder="请输入备注" maxlength=200 show-word-limit clearable></el-input>
            </el-form-item>
              <el-upload
                  class="upload-demo" style="margin-left: 15px ;margin-top: 15px"
                  :action="uploadUrl"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :on-success="handleChange"
                   multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="saveList">
                  <el-button size="small" type="primary" >上传附件</el-button>
<!--                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="left-row">
        <el-button type="primary" @click="submitForm('powerprojecttaskForm')">保存</el-button>
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
import UploadPanel from '@/components/UploadPanel/index'

export default {
  mixins: [tool, ruleTool],
  components: {BaiduMap,UploadPanel},
  data() {
    return {
      uploadUrl: process.env.BASE_API + "file/upload/multipart",
      saveList: [],
      powerprojecttaskForm: {
          proprietorContactId:'',
          adress:'',
          longitude:'',
          latitude:''
      },
      typeOptions: [],
      designOptions:[],
      ProprietorList:[],
      coDepartmentOptions:[],
      ContactList:[],
      userList:[],
      dialogAdressVisible:false,
      adress : '',
      file: [],
      openCollapse: ["1"],//默认打开的面板
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: ['blur'] }
        ],
        type: [
          { required: true, message: '请选择项目类型', trigger: ['blur'] }
        ],
        proprietorId: [
          { required: true, message: '请选择建设单位', trigger: ['blur'] }
        ],
        // proprietorContactId: [
        //   { required: true, message: '请选择联系人', trigger: ['blur'] }
        // ],
        source: [
          { required: true, message: '请选择任务依据', trigger: ['blur'] }
        ],
        relatedDesign: [
          { required: true, message: '请选择相关设计', trigger: ['blur'] }
        ],
        coDepartment: [
          { required: true, message: '请选择协办部门', trigger: ['blur'] }
        ],
        manager: [
          { required: true, message: '请选择项目经理', trigger: ['blur'] }
        ],
        signer: [
          { required: true, message: '请选择签收人', trigger: ['blur'] }
        ],
        designScale: [
          { required: true, message: '请输入设计规模', trigger: ['blur'] }
        ],
        designRange: [
          { required: true, message: '请输入设计范围', trigger: ['blur'] }
        ],
        progress: [
          { required: true, message: '请输入项目进度要求', trigger: ['blur'] }
        ],
        adress: [
          { required: true, message: '请输入详细地址', trigger: ['blur'] }
        ],
        longitude: [
          { required: true, message: '请输入经度', trigger: ['blur'] }
        ],
        latitude: [
          { required: true, message: '请输入纬度', trigger: ['blur'] }
        ],
        // remark: [
        //   { required: true, message: '请输入备注', trigger: ['blur'] }
        // ],
      }
    }
  },
  mounted() {
    this.getDict();
    this.open();
    this.getProprietor();
    this.getUserList();

  },
  methods: {

    //进入编辑页调用 bean为列表页传入数据
    open() {
      if (this.$route.query.id) {
        ajax.get('power/powerprojecttask/' + this.$route.query.id).then(rs => {
          this.powerprojecttaskForm = rs.data;
          this.powerprojecttaskForm.source =this.powerprojecttaskForm.source.toString();
          this.powerprojecttaskForm.relatedDesign =  this.powerprojecttaskForm.relatedDesign.split(',')
          this.powerprojecttaskForm.coDepartment =  this.powerprojecttaskForm.coDepartment.split(',')
          this.getContact();
          this.getAttachmentList();
          this.getSjDict(rs.data.type);
          if (null != rs.data.img && rs.data.img.length > 0) {
            this.img = JSON.parse(rs.data.img);
          }
        });
      }
    },

      // 获取字典
      getDict() {
       let r = 'XMLX,XBBM';
          ajax.get("upms/dict/allType/"+r).then(rs => {
              this.typeOptions = rs.XMLX;
              // this.designOptions = rs.XGSJ
              this.coDepartmentOptions = rs.XBBM;
          });
      },

      //选择项目类型时初始相关设计
      chickProjectType(type){
          this.powerprojecttaskForm.relatedDesign='';
          let r = 'XGSJ_'+type;
          this.getSjDict(type);
      },

      //获取相关设计数据字典，需要和项目类型联动
      getSjDict(type){
          let r = 'XGSJ_'+type;
          ajax.get("upms/dict/type/"+r).then(rs => {
              this.designOptions = rs
          });
      },
      getUserList(){
          ajax.get("power/powerproprietor/getUser").then(rs => {
              this.userList = rs.data;
          });
      },
      getAttachmentList(){
          ajax.get('power/powerprojectattachment/getAttachmentList/'+this.$route.query.id).then(rs => {
          this.saveList =rs.data;
          });
      },
      //业主列表
      getProprietor(){
          ajax.get("power/powerproprietor/getPowerProprietorList").then(rs => {
              this.ProprietorList = rs.data;
          });
      },

      //加载业主联系人
      getContact() {
          ajax.get('power/powerproprietorcontact/getContactList/'+ this.powerprojecttaskForm.proprietorId).then(rs => {
              this.ContactList = rs.data;
          });
      },

      loadContact(){
          this.powerprojecttaskForm.proprietorContactId ='';
          this.getContact();
      },
      showDialogAdress() {
          this.dialogAdressVisible = true;
      },
      //加载地图
      selectLocation(location) {
          this.powerprojecttaskForm.adress = location.address;
          this.powerprojecttaskForm.longitude = location.lng;
          this.powerprojecttaskForm.latitude = location.lat;
          this.dialogAdressVisible = false;
      },
    //保存
    submitForm(form) {
      var data = this.powerprojecttaskForm;
      this.$refs[form]
        .validate((valid) => {
          if (!valid) {
            this.$message
              .error('校验不通过，请检查输入项');
            return;
          }
          data.coDepartment =  data.coDepartment.join(',');
          data.relatedDesign =  data.relatedDesign.join(',')
          ajax.post('power/powerprojecttask', data).then(rs => {
            if (rs.status == 0) {
              this.$message
                .success(rs.msg);
                this.getResFile(rs.data.id);
                this.close();
            } else {
              this.$message
                .error(rs.msg);
            }
          });
        });
    },

      // 上传成功回调
      getResFile(taskId){
          for (let i = 0; i <this.saveList.length ; i++) {
              this.saveList[i].sourceId = taskId;
          }
          ajax.post('power/powerprojectattachment/saveList/'+taskId, this.saveList).then(rs => {

          });
      },

      handleRemove(file, fileList) {
           this.saveList = fileList;
      },
      handlePreview(file) {
          console.log(file);
      },
      handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
      },

      handleChange(res){
          let file ={};
          file.name = res.data.name;
          file.path = res.data.path;
          this.saveList.push(file)
          console.log(this.saveList)
      }

  },
}
</script>
