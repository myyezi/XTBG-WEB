<template>
  <div class="form-panel">
    <el-form :model="riskForm" :rules="rules" ref="riskForm" label-position="top" label-width="100px" :class="{'register-form': true}">
      <el-collapse v-model="openCollapse">
        <el-collapse-item title="安全风险库" name="1">
          <div class="flex-panel">
            <el-form-item label="主键id" prop="id">
              <el-input v-model="riskForm.id" placeholder="请输入主键id" maxlength="30" clearable></el-input>
            </el-form-item>
            <el-form-item label="父节点id" prop="parentId">
              <el-input v-model="riskForm.parentId" placeholder="请输入父节点id" maxlength="30" clearable></el-input>
            </el-form-item>
            <el-form-item label="风险编号" prop="code">
              <el-input v-model="riskForm.code" placeholder="请输入风险编号" maxlength="30" clearable></el-input>
            </el-form-item>
            <el-form-item label="工序" prop="process">
              <el-input v-model="riskForm.process" placeholder="请输入工序" maxlength="30" clearable></el-input>
            </el-form-item>
            <el-form-item label="风险可能导致后果" prop="result">
              <el-input v-model="riskForm.result" placeholder="请输入风险可能导致后果" maxlength="30" clearable></el-input>
            </el-form-item>
            <el-form-item label="固定风险级别（1- 一级，2-二级，3-三级，4-四级）" prop="fixedLevel">
              <el-input v-model="riskForm.fixedLevel" placeholder="请输入固定风险级别（1- 一级，2-二级，3-三级，4-四级）" maxlength="30" clearable></el-input>
            </el-form-item>
            <el-form-item label="风险级别（1- 一级，2-二级，3-三级，4-四级）" prop="riskLevel">
              <el-input v-model="riskForm.riskLevel" placeholder="请输入风险级别（1- 一级，2-二级，3-三级，4-四级）" maxlength="30" clearable></el-input>
            </el-form-item>
            <el-form-item label="预控措施" prop="measure">
              <el-input v-model="riskForm.measure" placeholder="请输入预控措施" maxlength="30" clearable></el-input>
            </el-form-item>
            <el-form-item label="数据状态(0-删除，1-正常)" prop="status">
              <el-input v-model="riskForm.status" placeholder="请输入数据状态(0-删除，1-正常)" maxlength="30" clearable></el-input>
            </el-form-item>
            <el-form-item label="创建人" prop="creater">
              <el-input v-model="riskForm.creater" placeholder="请输入创建人" maxlength="30" clearable></el-input>
            </el-form-item>
            <el-form-item label="修改人" prop="updater">
              <el-input v-model="riskForm.updater" placeholder="请输入修改人" maxlength="30" clearable></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="createTime">
              <el-input v-model="riskForm.createTime" placeholder="请输入创建时间" maxlength="30" clearable></el-input>
            </el-form-item>
            <el-form-item label="修改时间" prop="updateTime">
              <el-input v-model="riskForm.updateTime" placeholder="请输入修改时间" maxlength="30" clearable></el-input>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="left-row">
        <el-button type="primary" @click="submitForm('riskForm')">保存</el-button>
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
      riskForm: {},
      openCollapse: ["1"], //默认打开的面板
      rules: {
        id: [{ required: true, message: "请输入主键id", trigger: ["blur"] }],
        parentId: [
          { required: true, message: "请输入父节点id", trigger: ["blur"] }
        ],
        code: [
          { required: true, message: "请输入风险编号", trigger: ["blur"] }
        ],
        process: [{ required: true, message: "请输入工序", trigger: ["blur"] }],
        result: [
          {
            required: true,
            message: "请输入风险可能导致后果",
            trigger: ["blur"]
          }
        ],
        fixedLevel: [
          {
            required: true,
            message: "请输入固定风险级别（1- 一级，2-二级，3-三级，4-四级）",
            trigger: ["blur"]
          }
        ],
        riskLevel: [
          {
            required: true,
            message: "请输入系统风险级别（1- 一级，2-二级，3-三级，4-四级）",
            trigger: ["blur"]
          }
        ],
        measure: [
          { required: true, message: "请输入预控措施", trigger: ["blur"] }
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
        ajax.get("qsm/safe/risk/" + this.$route.query.id).then(rs => {
          this.riskForm = rs.data;
          if (null != rs.data.img && rs.data.img.length > 0) {
            this.img = JSON.parse(rs.data.img);
          }
        });
      }
    },

    //保存
    submitForm(form) {
      var data = this.riskForm;
      this.$refs[form].validate(valid => {
        if (!valid) {
          this.$message.error("校验不通过，请检查输入项");
          return;
        }
        ajax.post("qsm/safe/risk", data).then(rs => {
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
