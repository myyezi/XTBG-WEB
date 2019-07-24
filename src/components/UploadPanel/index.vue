<template>
    <div class="upload-panel">
        <file-detail v-if="!showImg" v-for="(file, i) in fileList" :key="i" :file-name="file.name"
                           :file-url="file.path" :show-download="showDownload"
                           :show-del="!disabled" @del="delFile(i)"></file-detail>
        <div class="img-list" v-if="showImg">
            <div class="img-box" v-for="(file, i) in fileList" :key="i">
                <img :src="file.filedomain+file.path" @click="showBigImg($event)">
                <i class="el-icon-error" @click="delFile(i)" v-if="!disabled"></i>
            </div>
        </div>
        <el-upload
            class="upload"
            v-if="fileList.length < size && !disabled"
            :multiple="true"
            :accept="accept"
            :headers="headers"
            :show-file-list="false"
            :action="uploadUrl"
            :before-upload="uploadBefore"
            :on-change="uploadChange"
            :on-error="errorCallback"
            :on-remove="uploadChange">
            <el-button size="mini" type="success" round v-if="fileList.length < size">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
                <template v-if="!accept">
                    支持：.rar .zip .doc .docx .pdf .jpg .png...
                </template>
                <template v-if="accept">
                    支持：{{accept}} 类型文件
                </template>
                <div v-if="size == 6">最多上传6份文件，每份文件最大不超过2M</div>
                <div v-if="size == 3">最多上传3份文件，每份文件最大不超过2M</div>
                <div v-if="size == 1">最多上传1份文件，每份文件最大不超过2M</div>
            </div>
        </el-upload>
    </div>
</template>

<script>
    import FileDetail from '@/components/FileDetail/index'
    import { tool } from '@/utils/common'

    export default {
        mixins:[tool],
        props:{
            showImg:null,
            accept: String,
            disabled: Boolean,
            fileList: {
                type: Array,
                default: []
            },
            showDownload: {
                type: Boolean,
                default: true
            },
            size: Number
        },
        components:{ FileDetail },
        data() {
            return {
                uploadUrl: process.env.BASE_API + "file/upload/multipart",
                headers:{
                    "Authorization": 'Bearer ' + this.$store.getters.token
                },
                type:''
            };
        },

        methods: {
            delFile(i){
                this.fileList.splice(i, 1);
            },
            uploadBefore(file) {
                // 限制20M
                if(file.size > 1024*1024*2){
                    this.showMessage("请上传2M以下的文件");
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
                if(file.response.status == 0){
                    this.fileList.push(file.response.data);
                }
                this.$emit("update:fileList", this.fileList.slice(-this.size));
                // this.list = fileList.slice(-this.size);
            },
            errorCallback(){
                this.loading = false;
                this.$emit("error");
                // NProgress.done();
            },
        },
        mounted(){

        },
    }
</script>
<style>
    .upload-panel {
        max-width: 100%;
    }
    .upload-panel .upload,
    .upload-panel .el-upload__tip {
        margin-top: 3px;
        line-height: initial;
    }
    .upload-panel .img-list {
        margin: 10px 0;
    }
    .upload-panel .img-list:empty {
        display: none;
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
