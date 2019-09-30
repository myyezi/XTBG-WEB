<template>
  <div class="chat-wrapper" :class="{'isShow_chat':isFullscreen}">
      <!-- <el-button type="success" icon="el-icon-s-promotion" circle @click="handleOpen"></el-button> -->
      <el-dialog :visible.sync="chatDialogVisible" :fullscreen="isFullscreen" class="chat-dialog" width="900px"  top="calc((100vh - 600px)/2)" :show-close="false" :close-on-press-escape="false" :append-to-body="true" :modal="false">
          <div class="v-im" :style="{height:isFullscreen?'100%':'600px',width:'100%'}" @click="closeVisibleBox">
              <div class="left-bar" style="-webkit-app-region: drag">
                  <ul>
                    <li class="userPhoto">
                      <el-popover
                        style="height:300px"
                        placement="right"
                        width="200"
                        trigger="click"
                        >
                        <div class="clearfix detail_popover">
                            <div class="detail_name">{{user.name}}</div>
                            <img :src="user.portrait?user.portrait:defaultPic">
                        </div>
                        <img :src="user.portrait?user.portrait:defaultPic" slot="reference"/>
                      </el-popover>
                    </li>
                      <li @click="isChatBox=true;isUserBox=false;isChatGroupBox=false">
                          <i class="el-icon-chat-round left-bar_icon" :class="{'left-bar_icon_active':isChatBox}" ></i>
                          <el-badge class="message_number" :value="unReadNum" v-if="unReadNum>0"/>
                      </li>
                      <li @click="isUserBox=true;isChatBox=false;isChatGroupBox=false;">
                          <i class="icon-tongxunlu left-bar_icon" :class="{'left-bar_icon_active':isUserBox}"></i>
                      </li>
                      <!-- <li @click="isChatGroupBox=true;isUserBox=false;isChatBox=false">
                          <i class="icon-qun left-bar_icon" :class="{'left-bar_icon_active':isChatGroupBox}"></i>
                      </li> -->
                  </ul>
              </div>
              <user-Box v-show="isUserBox" class="content" ref="userBox"></user-Box>
              <chat-Box v-show="isChatBox" class="content" ref="chatBox" :chatDialogVisible="chatDialogVisible"></chat-Box>
              <chat-GroupBox v-show="isChatGroupBox" class="content"></chat-GroupBox>
          </div>
      </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import UserBox from './layout/userBox.vue';
import ChatBox from './layout/chatBox.vue';
import ChatGroupBox from './layout/chatGroupBox.vue';
import { getToken } from '@/utils/cookie'
import Bus from "@/utils/eventBus.js";
import { ChatListUtils, imageLoad } from '@/utils/imUtils/ChatUtils';

export default {
  components: { UserBox, ChatBox, ChatGroupBox },
  computed: {
    ...mapGetters([
      'user',
    ]),
    sessionList: {
        get: function() {
            return this.$store.state.im.sessionList;
        }
    }
  },
  watch:{
      sessionList :function(newvalue,oldvalue) {
          if(newvalue&&newvalue.length>0) {
              this.unReadNum = 0
              newvalue.forEach((item)=>{
                  this.unReadNum += item.unReadCount
              })
          } else {
              this.unReadNum = 0
          }
      },
  },
  data() {
    return {
      defaultPic:require('@/styles/img/morentx.png'),
      modal: false,
      chatDialogVisible: false,
      isFullscreen: false,
      isUserBox: false,
      isChatBox: true,
      isChatGroupBox: false,
      chat:{},
      unReadNum:0,
    };
  },
  methods: {
    closeVisibleBox() {
        this.$refs.chatBox.rightEvent(1)
        Bus.$emit("close-visiblebox"); 
    },
    handleOpen() {
      this.chatDialogVisible = !this.chatDialogVisible
    },
    handleClose() {
      this.chatDialogVisible = false;
    },
    getSessionList(data) {
      let self = this;
      let cacheSession = []
      // 从内存中获取会话记录
      cacheSession = self.$store.state.im.sessionList;
      if(!cacheSession||cacheSession.length === 0) {
        // 从缓存中取会话记录
        cacheSession = ChatListUtils.getSessionList(this.user.userId)
        if(cacheSession&&cacheSession.length>0) {
            self.$store.commit('setSessionList', cacheSession);
        }
      }
      if(cacheSession&&cacheSession.length>0) {
          cacheSession.forEach((item)=>{
              if(data.targetId == item.targetId) {
                  this.chat = item
              }
          })
      }
    }
  },
  created: function () {
  },
  mounted: function () {
    Bus.$on("close", data => {
      this.handleClose()
    });
    Bus.$on("max", data => {
      this.isFullscreen = !this.isFullscreen
    });
    Bus.$on("sessione-updata", data => {
        this.isChatBox=true;
        this.isUserBox=false;
        this.getSessionList(data)
        this.$refs.chatBox.getSessionList();
        this.$refs.chatBox.showChat(this.chat);
    });
  }
};
</script>
<style lang="scss">
@import "../../styles/imCss/theme.scss";
@import "../../styles/imCss/v-im.scss";
.chat-wrapper {
  position: fixed;
  z-index: 9999;
  bottom: 20px;
  right: 20px;
}
.isShow_chat {
  display:none
}
.chat-dialog {
  .el-dialog {
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      height: 100%;
      padding: 0;
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
        .message_number {
            left: 15px;
            top: -25px;
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
.detail_popover {
    .detail_name {
        float:left;
        line-height: 3.6rem;
    }
    img {
        float:right;
        width: 3.6rem;
        height: 3.6rem;
    }
}
</style>

