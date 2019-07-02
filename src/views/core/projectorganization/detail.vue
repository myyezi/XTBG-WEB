<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="项目参建单位表" name="1">
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
                      <label class="control-label">用户id</label>
                      <div class="input-group">
                        <span>{{userId}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">管理岗位</label>
                      <div class="input-group">
                        <span>{{positionId}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">单位</label>
                      <div class="input-group">
                        <span>{{deptId}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">联系方式</label>
                      <div class="input-group">
                        <span>{{contactNum}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">职称/资格证书</label>
                      <div class="input-group">
                        <span>{{position}}</span>
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
        name: "CoreProjectOrganizationDetail",
        mixins: [tool],
        data() {
            return {
                newCarForm: {},
                openCollapse: ["1"],//默认打开的面板
            }
        },
        mounted() {
            ajax.get('core/projectorganization/' + this.$route.params.id).then(rs => {
                this.projectorganizationForm = rs.data;

            });
        },
        methods: {},

    }
</script>
