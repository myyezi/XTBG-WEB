<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="请假管理" name="1">
                <div class="flex-panel detail-box">
                    <div class="detail-item">
                      <label class="control-label">请假类型</label>
                      <div class="input-group">
                        <span>{{admleaveForm.type}}</span>
                      </div>
                    </div>
                    <div class="detail-item">
                      <label class="control-label">开始时间</label>
                      <div class="input-group">
                        <span>{{admleaveForm.startTime}}</span>
                      </div>
                    </div>
                    <div class="detail-item">
                      <label class="control-label">结束时间</label>
                      <div class="input-group">
                        <span>{{admleaveForm.endTime}}</span>
                      </div>
                    </div>
                    <div class="detail-item">
                      <label class="control-label">请假时长</label>
                      <div class="input-group">
                        <span>{{admleaveForm.leaveTime}}</span>
                      </div>
                    </div>
                    <div class="detail-item">
                      <label class="control-label">事由</label>
                      <div class="input-group">
                        <span>{{admleaveForm.reason}}</span>
                      </div>
                    </div>
                    <div class="detail-item">
                      <label class="control-label">申请人</label>
                      <div class="input-group">
                        <span>{{admleaveForm.creater}}</span>
                      </div>
                    </div>
                    <div class="detail-item">
                      <label class="control-label">申请时间</label>
                      <div class="input-group">
                        <span>{{admleaveForm.createTime}}</span>
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
        name: "AdmLeaveDetail",
        mixins: [tool],
        data() {
            return {
                admleaveForm: {},
                openCollapse: ["1"],//默认打开的面板
            }
        },
        mounted() {
            ajax.get('adm/admleave/' + this.$route.params.id).then(rs => {
                this.admleaveForm = rs.data;

            });
        },
        methods: {},

    }
</script>
