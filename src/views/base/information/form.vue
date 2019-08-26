<template>
    <div class="form-panel">
        <el-form :model="informationForm" :rules="rules" ref="chargeStationForm" label-position="top"
                 label-width="100px"
                 :class="{'register-form': true}">
            <el-collapse v-model="openCollapse">
                <el-collapse-item title="资讯管理" name="1">
                    <div class="flex-panel">
                        <el-form-item label="新闻标题" prop="title">
                            <el-input v-model="informationForm.title" placeholder="请输入新闻标题" maxlength=40
                                      clearable></el-input>
                        </el-form-item>

                        <el-form-item label="新闻来源" prop="source">
                            <el-input v-model="informationForm.source" placeholder="请输入新闻来源"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="新闻作者" prop="author">
                            <el-input v-model="informationForm.author" placeholder="请输入新闻作者"
                                      clearable></el-input>
                        </el-form-item>

                        <el-form-item label="资讯类型" prop="type">
                            <el-select v-model="informationForm.type" clearable placeholder="请选择资讯类型">
                                <el-option label="充电桩" value="1"></el-option>
                                <el-option label="车管家" value="2"></el-option>
                                <el-option label="光伏" value="3"></el-option>
                                <el-option label="储能" value="4"></el-option>
                                <el-option label="电网" value="5"></el-option>
                                <el-option label="水源" value="6"></el-option>
                                <el-option label="天然气" value="7"></el-option>
                                <el-option label="热能" value="11"></el-option>
                                <el-option label="融资" value="12"></el-option>
                                <el-option label="APP首页顶部轮播新闻" value="8"></el-option>
                                <el-option label="APP首页广告一" value="9"></el-option>
                                <el-option label="APP首页广告二" value="10"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="来源URL" prop="url">
                            <el-input v-model="informationForm.url" placeholder="请输入来源URL"
                                      clearable></el-input>
                        </el-form-item>

                        <el-form-item label="新闻封面图片（仅需上传一张）" prop="cover" class="big">
                            <upload-panel :size="1" accept=".jpg,.jpeg,.png,.gif" :file-list.sync="cover"
                                          :show-img="true"></upload-panel>
                        </el-form-item>
                        <el-form-item label="正文" prop="content" class="big">
                            <Tinymce ref="editor" v-model="informationForm.content" :height="400" />
                            <!-- <my-editor v-model="informationForm.content"></my-editor> -->
                        </el-form-item>

                    </div>
                </el-collapse-item>
            </el-collapse>
            <div class="left-row">
                <el-button type="primary" @click="submitForm('chargeStationForm')">保存</el-button>
                <el-button @click="close">返回</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import ajax from '@/utils/request'
    import {tool, ruleTool} from '@/utils/common'
    // import MyEditor from '@/components/QuillEditor/index.vue'
    import UploadPanel from '@/components/UploadPanel/index'
    import Tinymce from '@/components/Tinymce'

    export default {
        mixins: [tool, ruleTool],
        components: {Tinymce,UploadPanel},
        data() {
            return {
                informationForm: {},
                providers: [],
                cover:[],
                openCollapse: ["1"],//默认打开的面板
                rules: {
                    title: [
                        {required: true, message: '请输入新闻标题', trigger: ['blur', 'change']}
                    ],
                    source: [
                        {required: true, message: '请输入新闻来源', trigger: ['blur', 'change']}
                    ],
                    type: [
                        {required: true, message: '请选择新闻类型', trigger: ['change']}
                    ],
                    content: [
                        {required: true, message: '请填写正文', trigger: ['change']}
                    ]
                    // ,
                    // cover: [
                    //     {required: true, message: '请选择图片', trigger: ['change']}
                    // ]
                }
            }
        },
        mounted() {
            this.open();
        },
        methods: {
            //进入编辑页调用 bean为列表页传入数据
            open() {
                if (this.$route.query.id) {
                    ajax.get('base/information/' + this.$route.query.id).then(rs => {
                        rs.data.type = rs.data.type.toString();
                        this.informationForm = rs.data;
                        if (null != rs.data.cover && rs.data.cover.length > 0) {
                            this.cover = JSON.parse(rs.data.cover);
                        }
                    });
                }
            },
            //保存
            submitForm(form) {
                var data = this.informationForm;
                console.log(this.informationForm)
                this.$refs[form].validate((valid) => {
                    if (!valid) {
                        this.$message.error('校验不通过，请检查输入项');
                        return;
                    }
                    if (this.cover && this.cover.length > 0) {
                        data.cover = JSON.stringify(this.cover);
                    }
                    ajax.post('base/information', data).then(rs => {
                        if (rs.status == 0) {
                            this.$message.success(rs.msg);
                            this.close();
                        } else {
                            this.$message.error(rs.msg);
                        }
                    });
                });
            },
        }
    }
</script>
