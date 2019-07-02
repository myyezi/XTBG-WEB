<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">
      上传本地图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        :multiple="true"
        name="file"
        accept=".jpg,.jpeg,.png"
        :headers="header"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="uploadSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        :action="serverUrl"
        list-type="picture-card"
      >
        <el-button size="small" type="primary">
          上传图片
        </el-button>
        <div class="el-upload__tip" slot="tip">图片只能上传jpg,jpeg,png格式,最大只能上传10M</div>
      </el-upload>
      <el-button @click="dialogVisible = false">
        取消
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        完成
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'

export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      accept:'.mp4,.avi,.rmvb',
      serverUrl: process.env.BASE_API + "file/upload/multipart",
      header: {
          "Authorization": 'Bearer ' + this.$store.getters.token
      },
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!')
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    uploadSuccess(response, file) {
      console.log(response)
      console.log(file)
      console.log(this.listObj)
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.data.filedomain + response.data.path
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
          const _self = this
          //图片大小限制
          let size = 10 * 1024 * 1024;
          //图片格式显示
          let imageType = ['jpg', 'jpeg', 'png'];
          //验证文件大小和格式
          if (this.uploadType == 'image') {
              if (file.size > size) {
                  this.showMessage('图片太大,最大只能上传10M');
                  return false;
              }
              let type = file.type.split('/')[1];
              if (imageType.indexOf(type) < 0) {
                  this.showMessage('图片格式不对，只支持' + imageType.join(','));
                  return false;
              }
          } else if (this.uploadType == 'video') {
              let videoSize = 100 * 1024 * 1024;
              let videoType = ['avi', 'mp4', 'rmvb'];
              if (file.size > videoSize) {
                  this.showMessage('视频太大,最大只能上传100M');
                  return false;
              }
              let type = file.type.split('/')[1];
              if (videoType.indexOf(type) < 0) {
                  this.showMessage('视频格式不对，只支持' + videoType.join(','));
                  return false;
              }
          }
          const _URL = window.URL || window.webkitURL
          const fileName = file.uid
          this.listObj[fileName] = {}
          if(file.name.indexOf('avi')>0 || file.name.indexOf('mp4')>0 || file.name.indexOf('rmvb')>0) {
              return _self.listObj[fileName] = { hasSuccess: false, uid: file.uid,type:1 }
          } else {
            return new Promise((resolve, reject) => {
              const img = new Image()
              img.src = _URL.createObjectURL(file)
              img.onload = function() {
                _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
              }
              resolve(true)
            })
          }

          // return true;
      },
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
