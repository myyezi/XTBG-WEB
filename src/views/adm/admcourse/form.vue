<template>
  <div class="form-panel">
    <el-form
      :model="admcourseForm"
      :rules="rules"
      ref="admcourseForm"
      label-position="top"
      label-width="100px"
      :class="{'register-form': true}"
    >
      <el-collapse v-model="openCollapse">
        <el-collapse-item title="课程管理" name="1">
          <div class="flex-panel">
            <el-form-item label="标题" prop="title">
              <el-input v-model="admcourseForm.title" placeholder="请输入标题" maxlength="30" clearable></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content" class="big">
              <!-- 引入富文本组件 -->
              <Tinymce ref="editor" v-model="admcourseForm.content" :height="400" />
            </el-form-item>
            <el-form-item>
                <el-upload
                  class="upload-demo" style="margin-left: 15px ;margin-top: 15px"
                  :action="uploadUrl"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :on-success="handleChange"
                   multiple
                  :on-exceed="handleExceed"
                  :file-list="admcourseForm.attachments">
                  <el-button size="small" style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF" >上传附件</el-button>
              </el-upload>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="left-row">
        <el-button type="primary" @click="submitForm('admcourseForm')">保存</el-button>
        <el-button @click="close">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import ajax from "@/utils/request";
import { tool, ruleTool } from "@/utils/common";
import Tinymce from '@/components/Tinymce'
export default {
  mixins: [tool, ruleTool],
  components: {Tinymce},
  data() {
    return {
      uploadUrl: process.env.BASE_API + "file/upload/multipart",
      admcourseForm: {attachments:[]},
      openCollapse: ["1"], //默认打开的面板
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: ["blur"] }],
        content: [{ required: true, message: "请输入内容", trigger: ["blur"] }]
      }
    };
  },
  mounted() {
    this.open();
  },
  methods: {
    //进入编辑页调用 bean为列表页传入数据
    open() {
      if (this.$route.query.id) {
        ajax.get("adm/admcourse/" + this.$route.query.id).then(rs => {
          this.admcourseForm = rs.data;
        });
      }
    },

    //保存
    submitForm(form) {
      var data = this.admcourseForm;
      this.$refs[form].validate(valid => {
        if (!valid) {
          this.$message.error("校验不通过，请检查输入项");
          return;
        }
        ajax.post("adm/admcourse", data).then(rs => {
          if (rs.status == 0) {
            this.$message.success(rs.msg);
            this.close();
          } else {
            this.$message.error(rs.msg);
          }
        });
      });
    },

    handleRemove(file, fileList) {
        if(file.id){
            ajax.get("adm/admcourseattachment/delete/"+file.id).then(rs => {
                if (rs.status == 0) {
                    this.$message.success(rs.msg);
                    this.admcourseForm.attachments = fileList;
                } else {
                    this.$message.error(rs.msg);
                }
            });
        }
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
        this.admcourseForm.attachments.push(file)
        console.log(this.admcourseForm.attachments)
    }
  }
};
</script>
