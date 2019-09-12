<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="流程业务表" name="1">
                <div class="flex-panel detail-box">
                                      <div class="detail-item">
                      <label class="control-label">主键ID</label>
                      <div class="input-group">
                        <span>{{id}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">类型（1-请假  2-外出 3-出差  4-用车 5-用印  6-开票  7-宴请  8-费用报销 9-借支  10-差旅 11-付款）</label>
                      <div class="input-group">
                        <span>{{type}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">名称</label>
                      <div class="input-group">
                        <span>{{name}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">流程实例key</label>
                      <div class="input-group">
                        <span>{{processKey}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">数据状态（0-删除，1-正常）</label>
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
                      <label class="control-label">创建时间</label>
                      <div class="input-group">
                        <span>{{createTime}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">修改人</label>
                      <div class="input-group">
                        <span>{{updater}}</span>
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
        name: "WorkflowBusinessDetail",
        mixins: [tool],
        data() {
            return {
                newCarForm: {},
                openCollapse: ["1"],//默认打开的面板
            }
        },
        mounted() {
            ajax.get('workflow/workflowbusiness/' + this.$route.params.id).then(rs => {
                this.workflowbusinessForm = rs.data;

            });
        },
        methods: {},

    }
</script>
