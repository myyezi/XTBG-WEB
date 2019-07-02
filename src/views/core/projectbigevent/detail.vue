<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="大事记" name="1">
                <div class="flex-panel detail-box">
                    <div class="detail-item">
                      <label class="control-label">项目名称</label>
                      <div class="input-group">
                        <span>{{projectbigeventForm.projectId}}</span>
                      </div>
                    </div>
                    <div class="detail-item">
                      <label class="control-label">事件日期</label>
                      <div class="input-group">
                        <span>{{projectbigeventForm.eventDate}}</span>
                      </div>
                    </div>
                    <div class="detail-item big">
                      <label class="control-label">问题描述</label>
                      <div class="input-group">
                        <span>{{projectbigeventForm.description}}</span>
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
        name: "CoreProjectBigeventDetail",
        mixins: [tool],
        data() {
            return {
                projectbigeventForm: {},
                openCollapse: ["1"],//默认打开的面板
            }
        },
        mounted() {
            ajax.get('core/projectbigevent/' + this.$route.params.id).then(rs => {
                this.projectbigeventForm = rs.data;
                if(rs.data.eventDate && rs.data.eventDate.length > 0) {
                    this.projectbigeventForm.eventDate = rs.data.eventDate.substring(0,10)
                }
                if(rs.data.projectId && rs.data.projectId.length > 0) {
                    ajax.get('core/project/' + rs.data.projectId).then(rs => {
                        this.projectbigeventForm.projectId = rs.data.name;
                    });
                }
            });
        },
        methods: {},

    }
</script>
