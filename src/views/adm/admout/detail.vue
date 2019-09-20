<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="外出管理" name="1">
                <div class="flex-panel detail-box">
                    <div class="detail-item">
                        <label class="control-label">地址</label>
                        <div class="input-group">
                            <span>{{admoutForm.address}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">开始时间</label>
                        <div class="input-group">
                            <span>{{admoutForm.startTime}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">结束时间</label>
                        <div class="input-group">
                            <span>{{admoutForm.endTime}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">外出时长（天）</label>
                        <div class="input-group">
                            <span>{{admoutForm.outTime}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">出行方式</label>
                        <div class="input-group">
                            <span>{{admoutForm.typeText}}</span>
                        </div>
                    </div>

                    <div class="detail-item">
                        <label class="control-label">状态</label>
                        <div class="input-group">
                            <span>{{admoutForm.approvalStatusText}}</span>
                        </div>
                    </div>

                    <div class="detail-item">
                        <label class="control-label">申请人</label>
                        <div class="input-group">
                            <span>{{admoutForm.creater}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">修改人</label>
                        <div class="input-group">
                            <span>{{admoutForm.updater}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">申请时间</label>
                        <div class="input-group">
                            <span>{{admoutForm.createTime}}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <label class="control-label">修改时间</label>
                        <div class="input-group">
                            <span>{{admoutForm.updateTime}}</span>
                        </div>
                    </div>
                    <div class="detail-item big">
                        <label class="control-label">事由</label>
                        <div class="input-group">
                            <span>{{admoutForm.reason}}</span>
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
        name: "AdmOutDetail",
        mixins: [tool],
        data() {
            return {
                admoutForm: {},
                openCollapse: ["1"],//默认打开的面板
            }
        },
        mounted() {
            ajax.get('adm/admout/' + this.$route.params.id).then(rs => {
                this.admoutForm = rs.data;

            });
        },
        methods: {},

    }
</script>
