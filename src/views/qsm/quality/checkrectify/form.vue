<template>
  <div class="form-panel">
    <el-form
      :model="checkrectifyForm"
      :rules="rules"
      ref="checkrectifyForm"
      label-position="top"
      label-width="100px"
      :class="{'register-form': true}"
    >
      <el-collapse v-model="openCollapse">
        <el-collapse-item title="质量检查问题整改单" name="1">
          <div class="flex-panel">
            <el-form-item label="主键id" prop="id">
              <el-input
                v-model="checkrectifyForm.id"
                placeholder="请输入主键id"
                maxlength="30"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="项目id" prop="projectId">
              <el-input
                v-model="checkrectifyForm.projectId"
                placeholder="请输入项目id"
                maxlength="30"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="编号" prop="code">
              <el-input
                v-model="checkrectifyForm.code"
                placeholder="请输入编号"
                maxlength="30"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="整改复查单位" prop="checkCompany">
              <el-input
                v-model="checkrectifyForm.checkCompany"
                placeholder="请输入整改复查单位"
                maxlength="30"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="复查日期" prop="checkDate">
              <el-input
                v-model="checkrectifyForm.checkDate"
                placeholder="请输入复查日期"
                maxlength="30"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="复查人员" prop="checkUserId">
              <el-input
                v-model="checkrectifyForm.checkUserId"
                placeholder="请输入复查人员"
                maxlength="30"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="整改情况说明" prop="description">
              <el-input
                v-model="checkrectifyForm.description"
                placeholder="请输入整改情况说明"
                maxlength="30"
                clearable
              ></el-input>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="left-row">
        <el-button type="primary" @click="submitForm('checkrectifyForm')">保存</el-button>
        <el-button @click="close">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import ajax from "@/utils/request";
import { tool, ruleTool } from "@/utils/common";

export default {
  mixins: [tool, ruleTool],
  components: {},
  data() {
    return {
      checkrectifyForm: {},
      openCollapse: ["1"], //默认打开的面板
      rules: {
        id: [{ required: true, message: "请输入主键id", trigger: ["blur"] }],
        projectId: [
          { required: true, message: "请输入项目id", trigger: ["blur"] }
        ],
        code: [{ required: true, message: "请输入编号", trigger: ["blur"] }],
        checkCompany: [
          { required: true, message: "请输入整改复查单位", trigger: ["blur"] }
        ],
        checkDate: [
          { required: true, message: "请输入复查日期", trigger: ["blur"] }
        ],
        checkUserId: [
          { required: true, message: "请输入复查人员", trigger: ["blur"] }
        ],
        description: [
          { required: true, message: "请输入整改情况说明", trigger: ["blur"] }
        ],
        status: [
          {
            required: true,
            message: "请输入数据状态(0-删除，1-正常)",
            trigger: ["blur"]
          }
        ],
        creater: [
          { required: true, message: "请输入创建人", trigger: ["blur"] }
        ],
        updater: [
          { required: true, message: "请输入修改人", trigger: ["blur"] }
        ],
        createTime: [
          { required: true, message: "请输入创建时间", trigger: ["blur"] }
        ],
        updateTime: [
          { required: true, message: "请输入修改时间", trigger: ["blur"] }
        ]
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
        ajax.get("qsm/quality/checkrectify/" + this.$route.query.id).then(rs => {
          this.checkrectifyForm = rs.data;
          if (null != rs.data.img && rs.data.img.length > 0) {
            this.img = JSON.parse(rs.data.img);
          }
        });
      }
    },

    //保存
    submitForm(form) {
      var data = this.checkrectifyForm;
      this.$refs[form].validate(valid => {
        if (!valid) {
          this.$message.error("校验不通过，请检查输入项");
          return;
        }
        ajax.post("qsm/quality/checkrectify", data).then(rs => {
          if (rs.status == 0) {
            this.$message.success(rs.msg);
            this.close();
          } else {
            this.$message.error(rs.msg);
          }
        });
      });
    }
  }
};
</script>
