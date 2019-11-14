<template>
  <section class="app-main" :class="{'app-main_default':$store.getters.nomenu}">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
    <!-- <audio ref="mmAudio" src="../../../../../static/audio/msg.mp3"></audio> -->
    <!-- <IMChat></IMChat> -->
    <div class="main_upload" @click="stopUploadShow=true;isShowUploadBut=false">
      <i class="el-icon-upload"></i>
    </div>
    <el-drawer
        class="drawer_setting"
        title="断点上传"
        :visible.sync="stopUploadShow"
        size="900px">
        <stop-upload 
          @func="getResFile" 
          :sourceId = 'dataObj.id' 
          :projectId = 'dataObj.projectId' 
          :nodeName = 'dataObj.projectNodeName' 
          :projectName = 'dataObj.projectName' 
          :isShowUploadBut="isShowUploadBut" 
          style="padding:20px"></stop-upload>
    </el-drawer>
  </section>
</template>

<script>
import ajax from '@/utils/request'
import IMChat from '@/views/im/index2.vue';
import {removeToken} from '@/utils/cookie' // 验权
import Bus from "@/utils/eventBus.js"
import StopUpload from '@/components/StopUpload/index'
export default {
  name: 'AppMain',
  components: { IMChat,StopUpload },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    },
    messageCount() {
      return this.$store.state.im.messageCount;
    },
    loginStaus: {
      get: function() {
        return this.$store.state.im.loginStaus;
      }
    },
  },
  data() {
      return {
          stopUploadShow : false,
          isShowUploadBut: false,
          dataObj:{}
      }
  },
  watch: {
    messageCount: function () {
      // this.aplayAudio()
    },
    loginStaus: function (newvalue,oldvalue) {
      if(!newvalue) {
        removeToken()
        localStorage.clear();
        this.$confirm('你的账号已在其它地方登录！需退出重新登录！！！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          showClose:false,
          showCancelButton:false,
          closeOnClickModal:false
        }).then(() => {
          this.$store.dispatch('LogOut').then(() => {
            localStorage.clear();
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        }).catch(() => {
        });
      }
    }
  },
  mounted() {
    Bus.$on("upload-show", data => {
      this.dataObj = data
      this.stopUploadShow = true
      this.isShowUploadBut = true
    })
  },
  destroyed() {
      // Bus.$off("upload-success")
  },
  methods: {
    // aplayAudio () {
    //   this.$nextTick(() => this.$refs.mmAudio.play())
    // }
    // 上传成功回调
    getResFile(file){
        console.log(file)
        ajax.post('power/powerprojectattachment', {
            sourceId : file.sourceId,
            projectId : file.projectId,
            name : file.name,
            size : file.size,
            path : file.path
        }).then(rs => {
            if (rs.status == 0) {
                this.$message.success(rs.msg);
                Bus.$emit("upload-success");
            } else {
                this.$message.error(rs.msg);
            }
        });
    },
  }
}
</script>
<style lang="scss">
  .main_upload {
        position: fixed;
        cursor: pointer;
        bottom: 30px;
        right: 30px;
    .el-icon-upload {
        font-size:24px;
    }
  }
</style>

