<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="项目信息表" name="1">
                <div class="flex-panel detail-box">
                    <div class="detail-item">
                      <label class="control-label">项目编号</label>
                      <div class="input-group">
                        <span>{{projectForm.code}}</span>
                      </div>
                    </div>
                    <div class="detail-item">
                      <label class="control-label">项目名称</label>
                      <div class="input-group">
                        <span>{{projectForm.name}}</span>
                      </div>
                    </div>
                    <div class="detail-item">
                      <label class="control-label">项目类型</label>
                      <div class="input-group">
                        <span>{{projectForm.typeText}}</span>
                      </div>
                    </div>
                    <div class="detail-item">
                      <label class="control-label">计划开工日期</label>
                      <div class="input-group">
                        <span>{{projectForm.planStartDate}}</span>
                      </div>
                    </div>
                    <div class="detail-item">
                      <label class="control-label">计划竣工日期</label>
                      <div class="input-group">
                        <span>{{projectForm.planEndDate}}</span>
                      </div>
                    </div>
                    <div class="detail-item">
                      <label class="control-label">实际开工日期</label>
                      <div class="input-group">
                        <span>{{projectForm.actualStartDate}}</span>
                      </div>
                    </div>
                    <div class="detail-item">
                      <label class="control-label">实际竣工日期</label>
                      <div class="input-group">
                        <span>{{projectForm.actualEndDate}}</span>
                      </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">项目状态</label>
                        <div class="input-group">
                            <span>{{projectForm.projectStatusText}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">联系电话</label>
                        <div class="input-group">
                            <span>{{projectForm.contractNum}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">传真</label>
                        <div class="input-group">
                            <span>{{projectForm.fax}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">邮箱</label>
                        <div class="input-group">
                            <span>{{projectForm.email}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">资料是否齐全</label>
                        <div class="input-group">
                            <span>{{projectForm.isArchiveFullText}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">缺失资料说明</label>
                        <div class="input-group">
                            <span>{{projectForm.missArchive}}</span>
                        </div>
                    </div>
                </div>
            </el-collapse-item>
            <el-collapse-item title="项目位置" name="2">
                <div class="flex-panel detail-box">
                    <div class="detail-item">
                        <label class="control-label">项目地址</label>
                        <div class="input-group">
                            <span>{{projectForm.adress}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">经度</label>
                        <div class="input-group">
                            <span>{{projectForm.longitude}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">纬度</label>
                        <div class="input-group">
                            <span>{{projectForm.latitude}}</span>
                        </div>
                    </div>
                </div>
            </el-collapse-item>
            <el-collapse-item title="项目概况" name="3">
                <div class="flex-panel detail-box">
                    <div class="detail-item">
                        <label class="control-label">项目概况</label>
                        <div class="input-group">
                            <span>{{projectForm.comment}}</span>
                        </div>
                    </div>
                </div>
            </el-collapse-item>
            <el-collapse-item title="子项目信息" name="4">
                <el-table border :data="projectForm.projectSubList" style="width: 100%">
                    <el-table-column prop="subTypeText" sortable show-overflow-tooltip min-width="150" label="项目类型"></el-table-column>
                    <el-table-column prop="subCode" sortable show-overflow-tooltip min-width="150" label="项目编号"></el-table-column>
                    <el-table-column prop="subName" sortable show-overflow-tooltip min-width="150" label="项目名称"></el-table-column>
                    <el-table-column prop="startDate" sortable show-overflow-tooltip min-width="150" label="计划开始日期"></el-table-column>
                    <el-table-column prop="endDate" sortable show-overflow-tooltip min-width="150" label="计划结束日期"></el-table-column>
                </el-table>
            </el-collapse-item>
            <el-collapse-item title="参建单位" name="5">
                <el-table border :data="projectForm.projectCompanyList" style="width: 100%">
                    <el-table-column prop="companyName" sortable show-overflow-tooltip min-width="150" label="单位名称"></el-table-column>
                    <el-table-column prop="deptName" sortable show-overflow-tooltip min-width="150" label="项目部名称"></el-table-column>
                    <el-table-column prop="personName" sortable show-overflow-tooltip min-width="150" label="人员姓名"></el-table-column>
                    <el-table-column prop="companyContactNum" sortable show-overflow-tooltip min-width="150" label="联系方式"></el-table-column>
                    <el-table-column prop="position" sortable show-overflow-tooltip min-width="150" label="人员角色"></el-table-column>
                    <el-table-column prop="profession" sortable show-overflow-tooltip min-width="150" label="职称"></el-table-column>
                    <el-table-column prop="certNum" sortable show-overflow-tooltip min-width="150" label="资格证书编号"></el-table-column>
                </el-table>
            </el-collapse-item>
        </el-collapse>
    </div>

</template>

<script>
    import ajax from '@/utils/request'
    import {tool} from '@/utils/common'

    export default {
        name: "CoreProjectDetail",
        mixins: [tool],
        data() {
            return {
                projectForm: {},
                openCollapse: ["1","2","3","4","5"],
            }
        },
        mounted() {
            ajax.get('core/project/' + this.$route.params.id).then(rs => {
                console.info(rs.data)
                this.projectForm = rs.data;

            });
        },
        methods: {},

    }
</script>
