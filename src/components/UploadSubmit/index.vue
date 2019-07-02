<template>
    <div class="upload-panel" :class="{'disabled':disabled}">
        <el-upload
            class="upload"
            :data="params"
            :disabled="disabled"
            :name="name"
            :accept="accept"
            :headers="headers"
            :show-file-list="false"
            :action="uploadUrl"
            :before-upload="uploadBefore"
            :on-change="uploadChange"
            :on-error="errorCallback"
            :on-remove="uploadChange">
            <el-button size="mini" type="success" :disabled="disabled" round>点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
                <slot></slot>
                <div class="error-text" v-html="importVisibleError"></div>
            </div>
        </el-upload>
    </div>
</template>

<script>
    import { tool } from '@/utils/common'

    export default {
        mixins:[tool],
        props:{
            params:null,
            disabled:null,
            accept: String,
            name:String,
            url:String,
        },
        data() {
            return {
                importVisibleError:"",
                headers:{
                    "Authorization": 'Bearer ' + this.$store.getters.token
                },
                type:''
            };
        },

        computed:{
            uploadUrl(){
                return process.env.BASE_API + this.url;
            }
        },
        methods: {
            init() {
                this.importVisibleError = "";
            },
            uploadBefore(file) {
                // 限制20M
                if(file.size > 1024*1024*20){
                    this.showMessage("请上传20M以下的文件");
                    return false;
                } else if(this.accept && this.accept.toLowerCase().indexOf(file.name.toLowerCase().split(".")[(file.name.toLowerCase().split(".").length - 1)]) == -1) {
                    this.showMessage("请上传 "+this.accept+" 的文件");
                    return false;
                } else {
                    this.loading = true;
                    // NProgress.start();
                    return true;
                }
            },
            uploadChange(file, fileList) {
                // NProgress.done();
                this.loading = false;
                if(!file.response){
                    return;
                }
                this.$emit("upload", file.response);
                let data = file.response;
                if (data.ResultSign == "Warning") {
                    var message = data.MessageKey == null ? data : data.MessageKey;
                    this.importVisibleError = "<span style='font-weight: bold;'>以下数据导入失败：</span><br>"+ message;
                } else if (data.ResultSign == "Error") {
                    var message = data.MessageKey == null ? data : data.MessageKey;
                    this.showMessage(message,"error");
                } else {
                    this.showMessage('导入成功!',"success");
                    this.$emit("load");
                }
            },
            errorCallback(d){
                console.log(d);
                this.loading = false;
                this.$emit("error", d);
                // NProgress.done();
            },
        },
        mounted(){

        },
    }
</script>
<style>
    .upload-panel.disabled .el-button {
        opacity: 0.5;
        cursor: not-allowed;
        margin: 10px 0;
    }
    .upload-panel .el-button {
        margin: 10px 0;
    }
    .upload-panel .error-text {
        font-size: 14px;
    }
    .upload-panel .upload,
    .upload-panel .el-upload__tip {
        margin-top: 3px;
        line-height: initial;
    }
    .upload-panel .img-list {
        margin: 10px 0;
    }
    .upload-panel .img-box {
        width: 80px;
        height: 80px;
        position: relative;
        display: inline-block;
        margin-right: 20px;
        cursor: pointer;
    }
    .upload-panel .img-box .el-icon-error {
        position: absolute;
        right: -7px;
        top: -7px;
        background: #fff;
        border-radius: 50%;
    }
    .upload-panel .img-box img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
    }
</style>
