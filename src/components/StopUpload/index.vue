<template>
    <div class="global-uploader">
        <uploader
            ref="uploader"
            :options="options"
            :autoStart="false"
            :file-status-text="fileStatusText"
            @file-added="onFileAdded"
            @file-success="onFileSuccess"
            @file-progress="onFileProgress"
            @file-error="onFileError"
            class="uploader-app">
            <uploader-unsupport></uploader-unsupport>
            <uploader-btn :attrs="attrs">选择文件</uploader-btn>
            <uploader-list>
                <div class="file-panel" slot-scope="props">
                    <div class="file-title">
                        <h2>文件列表</h2>
                    </div>

                    <ul class="file-list">
                        <li v-for="file in props.fileList" :key="file.id">
                            <uploader-file :class="'file_' + file.id" ref="files" :file="file" :list="true"></uploader-file>
                        </li>
                        <div class="no-file" v-if="!props.fileList.length"><i class="iconfont icon-empty-file"></i> 暂无待上传文件</div>
                    </ul>
                </div>
            </uploader-list>
        </uploader>
    </div>
</template>

<script>
//   import FileMd5 from './common/file-md5.js'z
import {getToken} from '@/utils/cookie'
import {ACCEPT_CONFIG} from './common/config';
import FileMd5 from './common/file-md5.js'
export default {
    name: "StopUpload",
    data() {
        return {
            files:[],
            tableData: [],
            uploading: false,
            options: {
                target: process.env.BASE_API+'file/upload/bigFile',
                chunkSize: 2 * 1024 * 1024,
                fileParameterName: 'upfile',
                maxChunkRetries: 3,
                simultaneousUploads:1,
                testChunks: true,   //是否开启服务器分片校验
                // 服务器分片校验函数，秒传及断点续传基础
                checkChunkUploadedByResponse: function (chunk, message) {
                    let objMessage = JSON.parse(message);
                    if (objMessage.status ===0) {
                        if(objMessage.data.uploadStatus == 1) {
                            return true;
                        } else if(objMessage.data.uploadStatus == 2) {
                            return (objMessage.data.chunkNum || []).indexOf(chunk.offset + 1) >= 0
                        } else if(objMessage.data.uploadStatus == 3) {
                            return false;
                        }
                    }
                },
                parseTimeRemaining: function (timeRemaining, parsedTimeRemaining) {
                    return parsedTimeRemaining
                        .replace(/\syears?/, '年')
                        .replace(/\days?/, '天')
                        .replace(/\shours?/, '小时')
                        .replace(/\sminutes?/, '分钟')
                        .replace(/\sseconds?/, '秒')
                },
                headers: {
                    Authorization:"Bearer " + getToken()
                },
                query() {}
            },
            fileStatusText(status, response) {
                console.log(status)
                const statusTextMap = {
                    success: '上传成功',
                    error: '上传失败',
                    uploading: '上传中',
                    paused: '暂停中',
                    waiting: '等待中'
                }
                return statusTextMap[status]
            },
            attrs: {
                // accept: ACCEPT_CONFIG.getAll()
            },
        }
    },
    components: {},
    computed: {
        //Uploader实例
        uploader() {
            return this.$refs.uploader.uploader;
        }
    },
    methods: {
        onFileAdded(file) {
            console.log(file)
            FileMd5(file, (file, md5) => {
                this.computeMD5Success(md5, file)
            });
        },
        onFileProgress(rootFile, file, chunk) {
            console.log(`上传中 ${file.name}，chunk：${chunk.startByte / 1024 / 1024} ~ ${chunk.endByte / 1024 / 1024}`)
        },
        onFileSuccess(rootFile, file, response, chunk) {
            let res = JSON.parse(response);
            // 服务器自定义的错误（即虽返回200，但是是错误的情况），这种错误是Uploader无法拦截的
            if (res.status !== 0) {
                this.$message({ message: res.data.message, type: 'error' });
                return
            }
            // 如果服务端返回需要合并
            if (res.data.needMerge) {
                // 文件状态设为“合并中”
                // api.mergeSimpleUpload({
                //     tempName: res.tempName,
                //     fileName: file.name,
                //     ...this.params,
                // }).then(res => {
                //     // 文件合并成功
                //     Bus.$emit('fileSuccess');
                //     this.statusRemove(file.id);
                // }).catch(e => {});
            // 不需要合并
            } else {
                console.log('文件上传成功')
            }
        },
        onFileError(rootFile, file, response, chunk) {
            console.log(response)
            this.$message({
                message: response,
                type: 'error'
            })
        },
        computeMD5Success(md5, file) {
            // 将自定义参数直接加载uploader实例的opts上
            Object.assign(this.uploader.opts, {
                query: {
                    ...this.params,
                }
            })
            file.uniqueIdentifier = md5;
            file.md5 = md5;
            file.resume();
        },
    }
}
</script>

<style scoped lang="scss">
    .global-uploader {
        .uploader-app {
            .uploader-btn {
                background:#4781fe;
                margin-bottom:10px;
                color:#fff;
                border: none;
            }
        }
        .file-panel {
            background-color: #fff;
            border: 1px solid #e2e2e2;
            .file-title {
                display: flex;
                height: 40px;
                line-height: 40px;
                padding: 0 15px;
                border-bottom: 1px solid #ddd;
                .operate {
                    flex: 1;
                    text-align: right;
                }
            }
            .file-list {
                position: relative;
                height: 240px;
                overflow-x: hidden;
                overflow-y: auto;
                background-color: #fff;
                > li {
                    background-color: #fff;
                }
            }
            &.collapse {
                .file-title {
                    background-color: #E7ECF2;
                }
            }
        }
        .no-file {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 16px;
        }
        /deep/.uploader-file-icon {
            &[icon=image] {
                &:before {
                    content: '' !important;
                }
                background: url(../../styles/img/icon-img/image-icon.png);
            }
            &[icon=video] {
                &:before {
                    content: '' !important;
                }
                background: url(../../styles/img/icon-img/video-icon.png);
            }
            &[icon=document] {
                &:before {
                    content: '' !important;
                }
                background: url(../../styles/img/icon-img/text-icon.png);
            }
        }
        /deep/.uploader-file-actions > span {
            margin-right: 6px;
        }
    }
</style>
