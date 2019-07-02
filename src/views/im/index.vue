<template>
  <div class="chat-wrapper">
    <el-button type="success" icon="el-icon-s-promotion" circle @click="chatDialogVisible = !chatDialogVisible"></el-button>
    <el-dialog :visible.sync="chatDialogVisible" :fullscreen="isFullscreen" class="chat-dialog" :before-close="handleClose" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body :modal="false">
      <div slot="title" class="chat-header">
        <div class="chat-header-search">
          <el-input prefix-icon="el-icon-search" v-model="searchAttr" width="200px" placeholder="请输入内容" clearable></el-input>
        </div>
        <div class="chat-header-tool">
          <el-button-group>
            <el-button size="mini" icon="el-icon-minus" @click="chatDialogVisible=false"></el-button>
            <el-button size="mini" icon="el-icon-plus" @click="isFullscreen = !isFullscreen"></el-button>
            <el-button size="mini" icon="el-icon-close" @click="chatDialogVisible=false"></el-button>
          </el-button-group>
        </div>

      </div>
      <ChatPanel></ChatPanel>
    </el-dialog>
  </div>
</template>
<script>
import ChatPanel from "@/views/im/panel.vue"
export default {
  name: 'IMChat',
  components: { ChatPanel },
  data() {
    return {
      chatDialogVisible: false,
      isFullscreen: false,
      searchAttr: null,
    }
  },
  methods: {
    handleClose() {
      this.chatDialogVisible = false;
    }
  }
}
</script>
<style>
.chat-wrapper {
  position: fixed;
  z-index: 99999;
  bottom: 20px;
  right: 20px;
}
.el-input {
  width: 200px;
}
.chat-wrapper.el-button {
  position: inherit;
}
.chat-dialog .el-dialog {
  min-width: 50%;
  min-height: 500px;
}
.chat-dialog .el-dialog__header {
  padding: 0;
  border: 1px solid #f2f2f2;
  font-weight: 600;
  height: 50px;
}
.chat-dialog .el-dialog__body {
  padding: 0;
}
.chat-dialog .chat-header {
  position: relative;
  padding: 0;
}
.chat-header .chat-header-search {
  position: absolute;
  width: 15rem;
  height: 50px;
  background: #f2f6fc;
}
.chat-header .chat-header-tool {
  position: absolute;
  width: 70%;
  height: 50px;
  right: 0px;
}
.chat-dialog .chat-header .el-input {
  position: absolute;
  top: 6px;
  left: 5px;
}
.chat-dialog .chat-header .el-button-group {
  position: absolute;
  right: 0px;
}
.chat-dialog .chat-header .el-button-group button {
  padding: 5px;
  border: 0;
  border-radius: 0;
}
</style>


