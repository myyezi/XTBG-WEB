<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="项目工程周报" name="1">
                <div class="flex-panel detail-box">
                                      <div class="detail-item">
                      <label class="control-label">主键id</label>
                      <div class="input-group">
                        <span>{{weeklyForm.id}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">项目id</label>
                      <div class="input-group">
                        <span>{{weeklyForm.projectId}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">年份</label>
                      <div class="input-group">
                        <span>{{weeklyForm.year}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">周报期数</label>
                      <div class="input-group">
                        <span>{{weeklyForm.period}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">周起止日期</label>
                      <div class="input-group">
                        <span>{{weeklyForm.startEnd}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">填报日期</label>
                      <div class="input-group">
                        <span>{{weeklyForm.reportDate}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">工程进度情况</label>
                      <div class="input-group">
                        <span>{{weeklyForm.progressContent}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">本周主要完成工作</label>
                      <div class="input-group">
                        <span>{{weeklyForm.thisContent}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">下周工作完成情况</label>
                      <div class="input-group">
                        <span>{{weeklyForm.nextContent}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">主要问题及工作处理情况</label>
                      <div class="input-group">
                        <span>{{weeklyForm.problemContent}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">新增需协调解决问题</label>
                      <div class="input-group">
                        <span>{{weeklyForm.issuesContent}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">创建人</label>
                      <div class="input-group">
                        <span>{{weeklyForm.creater}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">修改人</label>
                      <div class="input-group">
                        <span>{{weeklyForm.updater}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">创建时间</label>
                      <div class="input-group">
                        <span>{{weeklyForm.createTime}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">修改时间</label>
                      <div class="input-group">
                        <span>{{weeklyForm.updateTime}}</span>
                      </div>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>

</template>

<script>
    import ajax from '@/utils/request'
    import {tool} from '@/utils/common'

    export default {
        name: "CoreProjectReportWeeklyDetail",
        mixins: [tool],
        data() {
            return {
                weeklyForm: {},
                openCollapse: ["1"],//默认打开的面板
            }
        },
        mounted() {
            ajax.get('core/projectreportweekly/' + this.$route.params.id).then(rs => {
                this.weeklyForm = rs.data;
            });
        },
        methods: {},

    }
</script>
