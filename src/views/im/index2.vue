<template>
  <div class="chat-wrapper">
      <el-button type="success" icon="el-icon-s-promotion" circle @click="handleOpen"></el-button>
      <el-dialog :visible.sync="chatDialogVisible" :fullscreen="isFullscreen" class="chat-dialog" width="70%"  :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body :modal="false">
          <div class="v-im" :style="{height:isFullscreen?'100%':'600px',width:'100%'}">
              <div class="left-bar" style="-webkit-app-region: drag">
                  <ul>
                      <li class="userPhoto" @click="modal = true">
                          <img src="http://101.200.151.183:8080/img/user (3).png"/>
                      </li>
                      <li @click="isChatBox=true;isUserBox=false;isChatGroupBox=false">
                         <i class="el-icon-chat-round left-bar_icon" :class="{'left-bar_icon_active':isChatBox}" ></i>
                      </li>
                      <li @click="isUserBox=true;isChatBox=false;isChatGroupBox=false">
                         <i class="icon-tongxunlu left-bar_icon" :class="{'left-bar_icon_active':isUserBox}"></i>
                      </li>
                      <!-- <li @click="isChatGroupBox=true;isUserBox=false;isChatBox=false">
                         <i class="icon-qun left-bar_icon" :class="{'left-bar_icon_active':isChatGroupBox}"></i>
                      </li> -->
                  </ul>
              </div>
              <user-Box v-show="isUserBox" class="content"></user-Box>
              <chat-Box v-show="isChatBox" class="content"></chat-Box>
              <chat-GroupBox v-show="isChatGroupBox" class="content"></chat-GroupBox>
          </div>
      </el-dialog>
  </div>
</template>
<script>
  import UserBox from './layout/userBox.vue';
  import ChatBox from './layout/chatBox.vue';
  import ChatGroupBox from './layout/chatGroupBox.vue';
  import {getToken} from '@/utils/cookie' 
  import Bus from "@/utils/eventBus.js";

  export default {
  components:{UserBox,ChatBox,ChatGroupBox},
  data() {
    return {
      modal: false,
      chatDialogVisible: false,
      isFullscreen: false,
      isUserBox:true,
      isChatBox:false,
      isChatGroupBox:false,
    };
  },
  methods: {
    handleOpen() {
        this.chatDialogVisible = !this.chatDialogVisible
        if(this.chatDialogVisible) {
            if (!this.$store.state.im.websocket.clientId) {
                this.$store.dispatch('getWebsocket',{
                    ip:'192.168.10.134',
                    port:'8080',
                    token:getToken()
                })
            }
        }
    },
    handleClose() {
        this.chatDialogVisible = false;
      }
    },
    created: function() {
    },
    mounted: function() {
        Bus.$on("close", data => {
          this.handleClose()
        });
        Bus.$on("max", data => {
          this.isFullscreen = !this.isFullscreen
        });
    }
};
</script>
<style lang="scss">
@import '../../styles/imCss/theme.scss';
@import '../../styles/imCss/v-im.scss';
.chat-wrapper {
  position: fixed;
  z-index: 9999;
  bottom: 20px;
  right: 20px;
}
.chat-dialog {
    .el-dialog {
        .el-dialog__header {
            display: none;
        }
        .el-dialog__body {
            height:100%;
            padding:0;
        }
    }
}
.v-im {
  flex-direction: row;
  .left-bar {
    background-color: #1c2438;
    width: 6rem;
    height: 100%;
    ul {
      margin: 3rem 1.2rem 1.2rem 1.2rem;
      list-style: none;
      li {
        -webkit-app-region: no-drag;
        display: block;
        width: 3.6rem;
        height: 3.6rem;
        text-align: center;
        margin-bottom: 2rem;
        cursor: pointer;
        .left-bar_icon {
          font-size: 2.5rem !important;
          color: $color-default;
          margin: 0.3rem;
          cursor: pointer;
          &:hover {
            color: $color-write;
          }
        }
        .left-bar_icon_active {
          color: $color-write;
        }
      }
      .userPhoto {
        margin-bottom: 2rem;
        img {
          width: 3.6rem;
          height: 3.6rem;
        }
      }
    }
  }
  .content {
    flex: 1;
  }
}
</style>

