<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="质量检查整改单明细" name="1">
                <div class="flex-panel detail-box">
                                      <div class="detail-item">
                      <label class="control-label">主键id</label>
                      <div class="input-group">
                        <span>{{id}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">整改单id</label>
                      <div class="input-group">
                        <span>{{checkRectifyId}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">问题单明细id</label>
                      <div class="input-group">
                        <span>{{checkDetailId}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">问题</label>
                      <div class="input-group">
                        <span>{{title}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">责任单位</label>
                      <div class="input-group">
                        <span>{{responsibleCompany}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">要求整改日期</label>
                      <div class="input-group">
                        <span>{{rectifyDate}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">整改情况</label>
                      <div class="input-group">
                        <span>{{rectifySituation}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">整改单位</label>
                      <div class="input-group">
                        <span>{{rectifyCompany}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">整改负责人</label>
                      <div class="input-group">
                        <span>{{rectifyPerson}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">整改时间</label>
                      <div class="input-group">
                        <span>{{rectifyTime}}</span>
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
        name: "QualityCheckRectifyDetailDetail",
        mixins: [tool],
        data() {
            return {
                newCarForm: {},
                openCollapse: ["1"],//默认打开的面板
            }
        },
        mounted() {
            ajax.get('qsm/checkrectifydetail/' + this.$route.params.id).then(rs => {
                this.checkrectifydetailForm = rs.data;

            });
        },
        methods: {},

    }
</script>
