<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="项目计划" name="1">
                <div class="flex-panel detail-box">
                                      <div class="detail-item">
                      <label class="control-label">主键id</label>
                      <div class="input-group">
                        <span>{{id}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">项目id</label>
                      <div class="input-group">
                        <span>{{projectId}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">节点名称</label>
                      <div class="input-group">
                        <span>{{name}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">节点级别（1- 一级（工作内容），2-二级（单位工程），3-三级（分部工程））</label>
                      <div class="input-group">
                        <span>{{level}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">父节点id</label>
                      <div class="input-group">
                        <span>{{parentId}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">计划开始日期</label>
                      <div class="input-group">
                        <span>{{planStartDate}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">计划结束日期</label>
                      <div class="input-group">
                        <span>{{planEndDate}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">实际开始日期</label>
                      <div class="input-group">
                        <span>{{actualStartDate}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">实际结束日期</label>
                      <div class="input-group">
                        <span>{{actualEndDate}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">是否默认展示（0-否，1-是）</label>
                      <div class="input-group">
                        <span>{{isShow}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">关联节点的id(紧后id)</label>
                      <div class="input-group">
                        <span>{{afterId}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">完成状态（1-未开始，2-进行中，3-已完成）</label>
                      <div class="input-group">
                        <span>{{completionStatus}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">预警状态(0-未预警，1-已预警)</label>
                      <div class="input-group">
                        <span>{{warnStatus}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">排序号</label>
                      <div class="input-group">
                        <span>{{sortNum}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">完成百分比</label>
                      <div class="input-group">
                        <span>{{percent}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">数据状态(0-删除，1-正常)</label>
                      <div class="input-group">
                        <span>{{status}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">创建人</label>
                      <div class="input-group">
                        <span>{{creater}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">修改人</label>
                      <div class="input-group">
                        <span>{{updater}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">创建时间</label>
                      <div class="input-group">
                        <span>{{createTime}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">修改时间</label>
                      <div class="input-group">
                        <span>{{updateTime}}</span>
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
        name: "CoreProjectPlanDetail",
        mixins: [tool],
        data() {
            return {
                newCarForm: {},
                openCollapse: ["1"],//默认打开的面板
            }
        },
        mounted() {
            ajax.get('core/projectplan/' + this.$route.params.id).then(rs => {
                this.projectplanForm = rs.data;

            });
        },
        methods: {},

    }
</script>
