<template>
  <div class="form-panel">
    <el-form :model="warnForm" :rules="rules" ref="warnForm" label-position="top" label-width="100px" :class="{'register-form': true}">
      <el-collapse v-model="openCollapse">
        <el-collapse-item title="安全风险预警通知单" name="1">
          <div class="flex-panel">
            <el-form-item v-show="!isCreate" label="编号" prop="code">
              <el-input v-model="warnForm.code" placeholder="请输入编号" disabled maxlength="30" clearable></el-input>
            </el-form-item>
            <el-form-item label="发布单位" prop="publishCompany">
              <el-input v-model="warnForm.publishCompany" placeholder="请输入发布单位" maxlength="30" clearable></el-input>
            </el-form-item>
            <el-form-item v-show="!isCreate" label="发布日期" prop="publishDate">
              <el-input v-model="warnForm.publishDate" placeholder="请输入发布日期" disabled maxlength="30" clearable></el-input>
            </el-form-item>
            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="warnForm.projectName" placeholder="项目名称" readonly clearable>
                <el-button slot="append" icon="el-icon-search" @click="showProjectSelector = true"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="风险等级" prop="riskLevel">
              <el-select v-model="warnForm.riskLevel" placeholder="请选择风险等级" @change="riskSelectParam={riskLevel:warnForm.riskLevel}">
                <el-option v-for="item in riskLevelOptions" :key="item.value" :label="item.text" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="接收单位" prop="receiveCompany" class="big">
              <el-select v-model="warnForm.receiveCompany" multiple filterable default-first-option placeholder="请选择接收单位">
                <el-option v-for="item in projectCompanyOptions" :key="item.id" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作业内容" prop="riskProcess" class="big">
              <el-input v-model="warnForm.riskProcess" placeholder="作业内容" readonly clearable>
                <el-button slot="append" icon="el-icon-search" @click="showRiskSelector=true"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="风险分析" prop="riskResult" class="big">
              <el-input v-model="warnForm.riskResult" placeholder="请输入风险分析" readonly clearable></el-input>
            </el-form-item>
            <el-form-item label="预警计划时间" prop="planTime">
              <el-date-picker v-model="warnForm.planTime" type="datetime" placeholder="请选择预警计划时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="预警解除时间" prop="relieveTime">
              <el-date-picker v-model="warnForm.relieveTime" type="datetime" placeholder="请选择预警解除时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="签收单位" prop="issuingCompany">
              <el-select v-model="warnForm.issuingCompany" multiple filterable allow-create default-first-option placeholder="请选择签收单位">
                <el-option v-for="item in projectCompanyOptions" :key="item.id" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="检查范围和简要内容" prop="description" class="big">
              <my-editor v-model="warnForm.description" placeholder="请输入检查范围和简要内容" maxlength="2000"></my-editor>
            </el-form-item>
            <el-form-item label="编制" prop="organizationCompany">
              <el-input v-model="warnForm.organizationCompany" placeholder="请输入编制" maxlength="30" clearable></el-input>
            </el-form-item>
            <el-form-item label="签发单位" prop="signforCompany">
              <el-input v-model="warnForm.signforCompany" placeholder="请输入签发单位" maxlength="30" clearable></el-input>
            </el-form-item>
            <el-form-item label="报送单位" prop="submissionCompany">
              <el-input v-model="warnForm.submissionCompany" placeholder="请输入报送单位" maxlength="30" clearable></el-input>
            </el-form-item>
            <el-form-item label="签发人" prop="signforPerson">
              <el-input v-model="warnForm.signforPerson" placeholder="请输入签发人" maxlength="30" clearable></el-input>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="left-row">
        <el-button type="primary" @click="submitForm('warnForm')">保存</el-button>
        <el-button @click="close">返回</el-button>
      </div>
    </el-form>
    <!-- 项目选择器 -->
    <ProjectSelect :isShow="showProjectSelector" @selectedOnchange="selectedOnchangeHandle"></ProjectSelect>
    <!-- 项目风险清册选择器 -->
    <RiskSelect :isShow="showRiskSelector" :params="riskSelectParam" @selectedOnchange="riskSelectOnchangeHandle"></RiskSelect>
  </div>
</template>

<script>
import ajax from "@/utils/request";
import { tool, ruleTool } from "@/utils/common";
import MyEditor from '@/components/QuillEditor/index.vue'
import ProjectSelect from "@/components/ProjectSelect";
import RiskSelect from "@/components/RiskSelect";
const default_description = "\
  <p>1、施工方案复核：施工单位作业前组织现场勘察，编写专项施工方案，严格执行编审批流程。\
    监理和建设方严格审查施工方案的安全措施，作业前通知监理旁站。</p>\
  <p>2、控制作业面人数：作业前工作负责人审核作业人数是否足够，作业人员状况是否符合相关管理要求，是否满足作业层配置要求。\
    施工单位做好防护隔离及设置警示标识，防治无关人员进入危险区域。\
    合理分工，减少作业面人数，严谨无关作业人员在危险区域滞留。</p>\
  <p>3、到岗到位：落实重大风险作业挂牌督查，各级管理人员需按要求到岗到位。施工项目部经理、安全总监、业主项目部经理需监督现场作业过程，\
    对控制措施执行情况进行检查，并签字确认；施工单位副总工程师以上的管理人员、建管单位有关人员到现场检查四级风险作业情况，\
    符合要求的在施工作业B票的附件《每日站班会及风险控制措施检查记录表》中签字，检查中发现的问题另行下达问题整改通知单。\
    每天作业前施工项目部组织全体作业人员进行安全技术交底。作业人员应熟悉作业方案，清楚作业内容和分工，了解现场危险点及防范措施，\
    检查个人安全防护用品，逐一确认现场安全措施。施工项目部按《国家电网公司输变电工程安全风险识别、评估及预控措施管理办法》要求安全稳妥地组织施工作业。\
    监理项目部总监、安全监理现场全程旁站监督。业主项目部经理或安全管理专责应在现场监督检查。</p>\
  <p>4、协调配合：作业前施工单位按规定办理施工作业B票。待监理、施工项目部同进同出管理人员到岗后方可开展作业。</p>\
  <p>5、监督检查：施工单位安全生产管理人员不定期进行现场检查。建设管理部门协同安全监督部门采取“四不两直”方式对施工作业现场开展安全检查。</p>\
  <p>6、应急准备：制定执行施工现场事故应急预案，并做好现场人员应急培训工作。现场设立应急救援路线图和应急值班人员、联系电话。</p>\
  <p>7、重要安全技术措施要求：</p>";
export default {
  mixins: [tool, ruleTool],
  components: { MyEditor, ProjectSelect, RiskSelect },
  data() {
    return {
      warnForm: {},
      openCollapse: ["1"], //默认打开的面板
      rules: {
        publishCompany: [
          { required: true, message: "请输入发布单位", trigger: ["blur"] }
        ],
        receiveCompany: [
          { required: true, message: "请输入接收单位", trigger: ["blur"] }
        ],
        projectName: [
          { required: true, message: "请选择项目名称", trigger: ["blur"] }
        ],
        riskLevel: [
          { required: true, message: "请选择风险级别", trigger: ["blur", 'change'] }
        ],
        riskProcess: [
          { required: true, message: "请选择作业内容", trigger: ["blur"] }
        ],
        planTime: [
          { required: true, message: "请选择预警计划时间", trigger: ["blur"] }
        ],
        relieveTime: [
          { required: true, message: "请选择预警解除时间", trigger: ["blur"] }
        ],
        issuingCompany: [
          { required: true, message: "请输入签收单位", trigger: ["blur"] }
        ],
        organizationCompany: [
          { required: true, message: "请输入编制", trigger: ["blur"] }
        ],
        signforCompany: [
          { required: true, message: "请输入签发单位", trigger: ["blur"] }
        ],
        submissionCompany: [
          { required: true, message: "请输入报送单位", trigger: ["blur"] }
        ],
        signforPerson: [
          { required: true, message: "请输入签发人", trigger: ["blur"] }
        ]
      },
      riskLevelOptions: [],
      projectCompanyOptions: [],
      showProjectSelector: false,
      showRiskSelector: false,
      riskSelectParam: {},
      isCreate: false
    };
  },
  mounted() {
    this.getRiskrLevels();
    this.open();
  },
  methods: {
    //进入编辑页调用 bean为列表页传入数据
    open() {
      if (this.$route.query.id) {
        this.isCreate = false;
        ajax.get("qsm/safe/warn/" + this.$route.query.id).then(rs => {
          this.warnForm = rs.data;
          let receiveCompany = this.warnForm.receiveCompany;
          let issuingCompany = this.warnForm.issuingCompany;
          this.warnForm.riskLevel = this.warnForm.riskLevel + "";
          this.warnForm.receiveCompany = receiveCompany.split(",");
          this.warnForm.issuingCompany = issuingCompany.split(",");
          this.getProjectCompanys(this.warnForm.projectId);
        });
      } else {
        this.isCreate = true;
        this.warnForm.publishCompany = '国网宜昌供电公司项目管理中心';
        this.warnForm.signforCompany = '国网宜昌供电公司项目管理中心';
        this.warnForm.submissionCompany = '国网宜昌供电公司建设部、国网宜昌供电公司安质部';
        this.warnForm.description = default_description;
      }
    },
    //选择项目
    selectedOnchangeHandle(data) {
      this.showProjectSelector = false;
      if (data) {
        this.warnForm.projectId = data.id;
        this.warnForm.projectName = data.name;
        this.getProjectCompanys(data.id);
      }
    },
    resetForm() {

    },
    //选择项目风险清册
    riskSelectOnchangeHandle(data) {
      this.showRiskSelector = false;
      if (data) {
        let { idArr = [], processArr = [], resultArr = [] } = {};
        data.map(item => {
          idArr.push(item.id);
          processArr.push(item.process);
          resultArr.push(item.result);
        });
        this.warnForm.planRiskId = idArr.join(",");
        this.warnForm.planRiskProcess = processArr.join(",");
        this.warnForm.planRiskResult = resultArr.join(",");
      }
    },
    //获取项目参见单位
    getProjectCompanys(projectId) {
      ajax.get("core/projectcompany/getProjectCompanySelectorList/" + projectId).then(rs => {
        this.projectCompanyOptions = rs;
      });
    },
    //保存
    submitForm(form) {
      var data = this.warnForm;
      this.$refs[form].validate(valid => {
        if (!valid) {
          this.$message.error("校验不通过，请检查输入项");
          return;
        }
        ajax.post("qsm/safe/warn", data).then(rs => {
          if (rs.status == 0) {
            this.$message.success(rs.msg);
            this.close();
          } else {
            this.$message.error(rs.msg);
          }
        });
      });
    },
    // 获取风险等级
    getRiskrLevels() {
      ajax.get("upms/dict/type/FXDJ").then(rs => {
        this.riskLevelOptions = rs;
      });
    }
  }
};
</script>
