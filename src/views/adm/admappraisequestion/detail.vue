<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="考核管理_考题" name="1">
                <div class="flex-panel detail-box">
                                      <div class="detail-item">
                      <label class="control-label">主键</label>
                      <div class="input-group">
                        <span>{{id}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">所属管理公司(组织表管理公司id)</label>
                      <div class="input-group">
                        <span>{{companyId}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">考核表ID</label>
                      <div class="input-group">
                        <span>{{appraiseId}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">标题</label>
                      <div class="input-group">
                        <span>{{title}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">类型（1-单选，2-多选）</label>
                      <div class="input-group">
                        <span>{{type}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">正确答案</label>
                      <div class="input-group">
                        <span>{{answer}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">排序</label>
                      <div class="input-group">
                        <span>{{sort}}</span>
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
                      <label class="control-label">申请时间</label>
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
        name: "AdmAppraiseQuestionDetail",
        mixins: [tool],
        data() {
            return {
                newCarForm: {},
                openCollapse: ["1"],//默认打开的面板
            }
        },
        mounted() {
            ajax.get('adm/admappraisequestion/' + this.$route.params.id).then(rs => {
                this.admappraisequestionForm = rs.data;

            });
        },
        methods: {},

    }
</script>
