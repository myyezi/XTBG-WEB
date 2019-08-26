<template>
    <div class="detail-panel">
        <el-collapse v-model="openCollapse">
            <el-collapse-item title="项目文档模板" name="1">
                <div class="flex-panel detail-box">
                                      <div class="detail-item">
                      <label class="control-label">主键id</label>
                      <div class="input-group">
                        <span>{{id}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">父节点id</label>
                      <div class="input-group">
                        <span>{{parentId}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">类目号</label>
                      <div class="input-group">
                        <span>{{code}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">类目名称</label>
                      <div class="input-group">
                        <span>{{name}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">归档文件内容</label>
                      <div class="input-group">
                        <span>{{content}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">立卷单位</label>
                      <div class="input-group">
                        <span>{{filingCompany}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">建设单位保存期限</label>
                      <div class="input-group">
                        <span>{{constructionDeadline}}</span>
                      </div>
                    </div>
                                      <div class="detail-item">
                      <label class="control-label">运行单位保存期限</label>
                      <div class="input-group">
                        <span>{{operationDeadline}}</span>
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
        name: "ArchiveProjectTemplateDetail",
        mixins: [tool],
        data() {
            return {
                newCarForm: {},
                openCollapse: ["1"],//默认打开的面板
            }
        },
        mounted() {
            ajax.get('archive/projecttemplate/' + this.$route.params.id).then(rs => {
                this.projecttemplateForm = rs.data;

            });
        },
        methods: {},

    }
</script>
