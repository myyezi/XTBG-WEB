<template>
    <div class="im-chat" v-if="chat&&JSON.stringify(chat) !== '{}'">
        <div class="im-chat-top" v-if="chat">
            <span>{{ chat.targetName }}</span>
            <i class="el-icon-setting" v-if="chat.type === 1" @click="setting()"></i>
        </div>
        <div class="im-chat-main">
            <div class="im-chat-main-left">
                <div class="im-chat-main-box messages" id="message-box">
                    <ul>
                        <li v-for="(item,index) in messageList" :class="{'im-chat-mine': item.fromUserId == user.userId}" :key="index" v-if="(item.conversation.topic=='MS' || !item.conversation.topic)&&item.content.type!=4">
                            <div class="im-chat-user">
                                <img v-if="item.fromUserId == user.userId" :src="user.portrait?user.portrait:defaultPic"/>
                                <img v-else :src="chat.portrait?chat.portrait:defaultPic"/>
                                <cite v-if="item.fromUserId == user.userId"><i v-if="item.serverTimestamp">{{ formatDateTime(new Date(item.serverTimestamp)) }}</i>{{ user.name }}</cite>
                                <cite v-else>{{ chat.name }}<i>{{ formatDateTime(new Date(item.serverTimestamp)) }}</i></cite>
                            </div>
                            <div class="im-chat-text" @contextmenu.prevent="rightEvent(item,$event)">
                                <i class="el-icon-loading" v-if="(item.fromUserId == user.userId)&&!item.messageId"></i>
                                <pre v-html="transform(item.content.content,item.content.type)" v-on:click="openImageProxy($event)" v-if="transform(item.content.content,item.content.type).indexOf('message-img') >=0"></pre>
                                <pre v-html="transform(item.content.content,item.content.type)" v-else></pre>
                            </div>
                        </li>
                        <li v-else class="group_system_chat">
                          <span>{{ formatDateTime(new Date(item.serverTimestamp)) }}</span>
                          <p>{{item.content.content}}</p>
                        </li>
                    </ul>
                </div>
                <ul v-show="visibleBox" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
                  <li @click.stop="withdrawMessage" :style="{color:isTimeOut?'#999':'#333'}">撤回消息<span v-if="isTimeOut">(已超过两分钟)</span></li>
              </ul>
                <div class="im-chat-footer">
                    <div class="im-chat-tool">
                        <el-popover
                          placement="top"
                          trigger="click"
                          v-model="showFace"
                          >
                          <Faces v-show="showFace" class="faces-box"  @insertFace="insertFace"></Faces>
                          <i class="icon-biaoqing" @click.stop="showFaceBox()" slot="reference"></i>
                        </el-popover>
                        <el-upload 
                                :action="uploadUrl"
                                :headers="headers" 
                                class="im-upload"
                                :show-file-list="false"
                                :before-upload="beforeUpload"
                                :on-success="handleSuccess"
                                :on-error="handleError">
                            <i class="el-icon-folder-opened"></i>
                        </el-upload>
                        <el-button size="mini" class="history-message-btn" @click="getHistoryMessage()">聊天记录</el-button>
                    </div>
                    <textarea v-model.trim="messageContent" class="textarea" @keyup.enter="mineSend(1)"></textarea>
                    <div class="im-chat-send">
                        <el-button size="mini" @click="mineSend(1)">发送</el-button>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="showHistory" width="550px"  top="calc((100vh - 716px)/2)"  :close-on-press-escape="false" :append-to-body="true" :modal="false" class="im_chat_record_dialog">
              <div slot="title" class="im_chat_record_title clearfix">
                <img :src="chat.portrait?chat.portrait:defaultPic" alt="头像" v-show="!isSetting">
                <span v-show="!isSetting"> {{ chat.targetName }}</span>
                <span v-show="isSetting"> 群设置</span>
              </div>
              <setting :chat="chat" :groupUserList="currentGroupUser"  v-if="showHistory&&isSetting"></setting>
              <chat-history :chat="chat" :messageList="messageList" v-if="showHistory&&!isSetting"></chat-history>
        </el-dialog>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import conf from '../conf';
  import Faces from './faces.vue';
  import Setting from './setting.vue';
  import {getToken} from '@/utils/cookie' 
  import chatHistory from './chatHistory.vue';
  import Bus from "@/utils/eventBus.js";
  const { imageLoad, transform, ChatListUtils } = require('../../../utils/imUtils/ChatUtils');

  export default {
    components: {
      Faces,
      chatHistory,
      Setting
      // Button
    },
    name: 'userChat',
    computed: {
      ...mapGetters([
          'user',
      ]),
      messageList: {
        get: function() {
          return this.$store.state.im.messageListMap[this.chat.targetId];
        },
        set: function(messageList) {
          this.$store.commit('setMessageList', messageList);
        }
      },
      sessionList: {
        get: function() {
          return this.$store.state.im.sessionList;
        },
        set: function(sessionList) {
          this.$store.commit('setSessionList', sessionList);
        }
      },
      currentGroupUser: {
        get: function() {
          return this.$store.state.im.currentGroupUser;
        },
        set: function(currentGroupUser) {
          this.$store.commit('setCurrentGroupUser', currentGroupUser);
        }
      },
    },
    data() {
      return {
        defaultPic:require('@/styles/img/morentx.png'),
        uploadUrl: process.env.BASE_API + "file/upload/multipart",
        headers:{
            "Authorization": 'Bearer ' + this.$store.getters.token
        },
        showHistory: false,
        isSetting:false,
        visibleBox:false,
        isTimeOut:false,
        top: 0,
        left: 0,
        currentMessageObj:{},
        // 保存各个聊天记录的map
        messageListMap: {},
        chatGroupListMap:{},
        messageContent: '',
        showFace: false,
        groupUserList:[],
        accept:'.jpg,.jpeg,.png,.gif,.doc,.docx,.xls,.xlsx,.pdf,.exe,',
        imgFormat: "jpg,jpeg,png,gif",
        fileFormat: "doc,docx,xls,xlsx,pdf,exe",
        videoFormat: "mp4,mov",
        transform:transform
      };
    },
    props: ['chat','chatDialogVisible'],
    methods: {
      beforeUpload(file) {
          const isLtM = file.size / 1024 / 1024 < 20;
          if (!isLtM) {
            this.$message.error('上传头像文件大小不能超过 20MB!');
          }
          return isLtM;
      },
      // 会话鼠标右键事件
      rightEvent(chat,e) {
        this.showFace = false
        if(chat === 1) {
            this.visibleBox = false
        } else {
            let time = new Date().getTime()
            const offsetLeft = this.$el.getBoundingClientRect().left
            const offsetTop = this.$el.getBoundingClientRect().top
            if(chat.fromUserId == this.user.userId) {
                this.visibleBox = true
                this.currentMessageObj = chat // 右键选中的会话
                this.left = e.clientX - offsetLeft - 50
                this.top = e.clientY - offsetTop + 50
                if(this.currentMessageObj.serverTimestamp) {
                    if((time - this.currentMessageObj.serverTimestamp)/1000>60 * 2) {
                      this.isTimeOut = true
                    } else {
                      this.isTimeOut = false
                    }
                }
            }
        }
      },
      // 撤回消息
      withdrawMessage() {
          let time = new Date().getTime()
          if(this.currentMessageObj.serverTimestamp) {
              if((time - this.currentMessageObj.serverTimestamp)/1000>60 * 2) {
                  
              } else {
                  let obj ={
                      id:this.currentMessageObj.messageId
                  }
                  let objArr = {
                      obj:obj,
                      subTopic:'MR'
                  }
                  console.log(objArr)
                  this.$store.commit('sendMessage', objArr);
              }
          }
      },
      // 错误提示
      openMessage(error) {
        this.$Message.error(error);
      },
      showFaceBox() {
        this.showFace = !this.showFace;
      },
      // 发送表情
      insertFace(obj) {
        this.showFaceBox()
        if(obj.type==2) {
          this.messageContent = this.messageContent + 'face' + obj.item;
          this.mineSend(1)
        } else {
          this.messageContent = this.messageContent + obj.item;
        }
      },
      handleFormatError(file) {
        this.$Message.warning('文件 ' + file.name + ' 格式不正确。');
      },
      handleFileMaxSize(file) {
        this.$Message.warning('文件 ' + file.name + ' 太大，不能超过 10M！');
      },
      handleSuccess(res, file) {
        let self = this;
        let type = null
        if (res.status == 0) {
          // 文件后缀
          let suffix = res.data.suffix;
          this.messageContent = JSON.stringify(res.data)
          // 文件
          if (self.fileFormat.indexOf(suffix) >=0) {
            type = 5
          }
          // 图片
          else if (self.imgFormat.indexOf(suffix) >=0){
            type = 3
          }
          // 视频
          else if (self.videoFormat.indexOf(suffix) >=0){
            type = 6
          }
          // 音频
          // else if (self.videoFormat.indexOf(suffix) >=0){
          //   type = 2
          // }
          this.mineSend(type)
        } else {
          this.$Message.error('文件上传错误，请重试');
        }
      },
      handleError: function() {
        this.$Message.error('上传错误！');
      },
      // 附件和图片点击展开
      openImageProxy: function(event) {
        let self = this;
        event.preventDefault();
        if (event.target.nodeName === 'IMG') {
          window.open(event.target.src);
        } 
      },
      // 本人发送信息
      mineSend(type) {
        let self = this;
        let time = new Date().getTime();
        let content = self.messageContent;
        console.log(content)
        if (content !== '' && content !== '\n') {
          if (content.length > 2000) {
            self.openMessage('不能超过2000个字符');
          } else {
            let currentMessage = {
              fromUserId:self.user.userId, //发送人id
              serverTimestamp: '', // 发送时间
              messageTag:time,
              // 发送消息的内容属性
              content: {
                  type:type, //发送信息类型 1、文本 2、语音 3、图片 4、定位 5、文件 6、视频
                  content:content // 发送消息内容
              },
              // 发送消息的会话属性
              conversation: {
                  targetId: self.chat.targetId, //接收人id
                  type: self.chat.type,//消息类别 0、单聊 1、群聊
              }
            };
            let currentSession = {
              unReadCount:0,
              portrait: self.chat.portrait, // 接收人头像
              serverTimestamp: time, // 发送时间
              targetId: self.chat.targetId, //接收人id
              targetName:self.chat.name, //接收人名称
              type: self.chat.type, //消息类别 0、单聊 1、群聊
              // 发送消息的内容属性
              content: {
                  type:type, //发送信息类型 1、文本 2、语音 3、图片 4、定位 5、文件 6、视频
                  content:type==1?content:type==2?'语音':type==3?'图片':type==4?'定位':type==5?'文件':'视频'// 发送消息内容
              },
            };
            self.send(currentMessage,currentSession);
            self.chat.unReadCount = 0
            this.$store.commit('setReadCount', self.chat);
          }
        }
      },
      // 发送消息的基础方法
      send(message,session) {
        let self = this;
        let objArr = {
            obj:message,
            subTopic:'MS'
        }
        self.$store.commit('addMessage', message);
        self.$store.commit('sendMessage', objArr);
        // self.$store.commit('addSession', session);
        self.messageContent = '';
        this.scollBottom()
      },
      getHistoryMessage() {
        this.isSetting = false
        this.showHistory = true
      },
      // 得到当前点击会话框的聊天信息
      getCurrentMessageList() {
          let self = this;
          let cacheMessagesObj = {}
          let cacheMessages = []
          self.messageList = [];
          // 从内存中取聊天信息
          cacheMessagesObj = self.$store.state.im.messageListMap
          if(JSON.stringify(cacheMessagesObj) !== '{}' && cacheMessagesObj[self.chat.targetId]) {
              cacheMessages = cacheMessagesObj[self.chat.targetId]
          }
          if(!cacheMessages||cacheMessages.length===0) {
            // 从缓存中取聊天信息
            cacheMessagesObj = ChatListUtils.getChatList(this.user.userId)
            if(JSON.stringify(cacheMessagesObj) !== '{}') {
                self.$store.commit('setMessageListMap', cacheMessagesObj);
                cacheMessages = cacheMessagesObj[self.chat.targetId];
            }
          }
          if (cacheMessages) {
            self.messageList = cacheMessages;
          }
          this.scollBottom()
      },
      // 得到当前点击群会话的群成员信息
      setting() {
          let self = this;
          let objArr = {
              obj:{
                target:self.chat.targetId,
                head:0
              },
              subTopic:'GGM'
          }
          self.$store.commit('sendMessage', objArr);
          self.isSetting = true
      },
      // 每次滚动到最底部
      scollBottom() {
        this.$nextTick(() => {
          imageLoad('message-box');
        });
      }
    },
    watch: {
      chat: function(newvalue,oldvalue) {
          this.getCurrentMessageList()
      },
      chatDialogVisible: function(newvalue,oldvalue) {
          if(newvalue) {
              this.scollBottom()
          }
      },
      sessionList :function(newvalue,oldvalue) {
        if(newvalue&&newvalue.length>0) {
            newvalue.forEach((item)=>{
                if(item.targetId == this.chat.targetId) {
                    this.chat.targetName = item.targetName
                    this.chat.owner = item.owner
                    this.chat.portrait = item.portrait
                }
            })
        }
      },
      messageList :function(newvalue,oldvalue) {
        this.scollBottom()
      },
      currentGroupUser :function(newvalue,oldvalue) {
        if(this.isSetting) {
            this.showHistory = true
        }
      }
    },
    created: function() {
      console.log(this.chat)
      if(this.chat&&this.chat.targetId) {
          this.getCurrentMessageList()
      }
    },
    mounted: function() {
      Bus.$on("close-show", data => {
        this.showHistory = false
      });
      Bus.$on("close-visiblebox", data => {
        this.rightEvent(1)
      });
      this.scollBottom()
    }
  };
</script>

<style lang="scss">
    @import '../../../styles/imCss/theme';

    .im-chat {
        flex: 1;
        // display: flex;
        // flex-direction: column;
        margin-top: 4rem;
        height: calc(100% - 4rem);
    }

    .im-chat-top {
        border-bottom: 1px solid #cccccc;
        color: $color-default;
        padding: 0 0 0 10px;
        font-size: 1.6rem;
        font-weight: bold;
        height: 40px;
        .menu {
            color: $color-default;
            display: inline-block;
            padding: 0 10px;
        }
        i {
          float:right;
          font-size: 24px;
          margin-right:10px;
          cursor: pointer;
        }
    }

    .user-model {
        .user-model-img {
            padding: 30px;
            text-align: center;

            img {
                border-radius: 50%;
            }
        }

        .user-model-item {
            display: flex;
            padding: 5px 0;

            label {
                flex: 2;
                font-weight: bold;
                text-align: right;
            }

            span {
                flex: 3;
            }
        }
    }

    .im-chat-main {
        flex: 1;
        display: flex;
        flex-direction: row;
        height: calc(100% - 40px);

        .im-chat-main-left {
            flex: 4;
            display: flex;
            flex-direction: column;

            .im-chat-main-box {
                flex: 1;
                padding-top: 1rem;
                overflow-x: hidden;
                overflow-y: auto;
            }
        }

        .message-img {
            max-width: 20rem;
        }

        .im-chat-users {
            flex: 1;
            border-left: 1px solid #cccccc;
            overflow-y: scroll;
        }

        .messages {
            width: 100%;
            height: calc(100% - 3rem);
            overflow-y: scroll;

            ul {
                width: 100%;

                li {
                    position: relative;
                    font-size: 0;
                    margin-bottom: 10px;
                    padding-left: 60px;
                    min-height: 68px;
                    padding-right: 10px;
                    margin-bottom: 12px;
                    .im-chat-text {
                        position: relative;
                        line-height: 22px;
                        margin-top: 25px;
                        padding: 0.8rem 1.5rem;
                        background-color: #e2e2e2;
                        border-radius: 3px;
                        color: #333;
                        word-break: break-all;
                        display: inline-block;
                        vertical-align: top;
                        font-size: 14px;

                        &:after {
                            content: '';
                            position: absolute;
                            left: -10px;
                            top: 13px;
                            width: 0;
                            height: 0;
                            border-style: solid dashed dashed;
                            border-color: #e2e2e2 transparent transparent;
                            overflow: hidden;
                            border-width: 10px;
                        }

                        pre {
                            width: 100%;
                            white-space: pre-wrap;
                            word-break: break-all;
                            .el-icon-document {
                                float: left;
                                font-size:36px;
                            }
                            span {
                              float: left;
                              margin:7px 10px 0 5px;
                            }
                            .el-icon-download {
                                float: left;
                                font-size:20px;
                                margin-top:8px;
                            }
                        }
                    }
                }
            }

            .im-chat-user {
                width: 4rem;
                height: 4rem;
                position: absolute;
                display: inline-block;
                vertical-align: top;
                font-size: 14px;
                left: 3px;
                right: auto;

                cite {
                    position: absolute;
                    left: 60px;
                    top: -2px;
                    width: 500px;
                    line-height: 24px;
                    font-size: 12px;
                    white-space: nowrap;
                    color: #999;
                    text-align: left;
                    font-style: normal;

                    i {
                        font-style: normal;
                        padding-left: 15px;
                    }
                }

                img {
                    width: 4rem;
                    height: 4rem;
                    border-radius: 100%;
                }
            }

            .im-chat-mine {
                text-align: right;
                padding-left: 30px;
                padding-right: 60px;

                .im-chat-text {
                    margin-left: 0;
                    text-align: left;
                    background-color: $color-message-bg;
                    color: #fff;
                    display: inline-block;
                    vertical-align: top;
                    font-size: 14px;
                    position: relative;
                    .el-icon-loading {
                      color:#333;
                      position: absolute;
                      left:-20px;
                      top: 12px;
                    }
                    &:after {
                        left: auto;
                        right: -10px;
                        border-top-color: $color-message-bg;
                    }
                }

                .im-chat-user {
                    left: auto;
                    right: 3px;

                    cite {
                        left: auto;
                        right: 60px;
                        text-align: right;

                        i {
                            padding-left: 0;
                            padding-right: 15px;
                        }
                    }
                }
            }
            .group_system_chat {
                text-align: center;
                span {
                    font-size:12px;
                    color:#999;
                }
                p {
                    font-size: 14px;
                    margin-top: 5px;
                    color: #333;
                }
            }
        }

        .contextmenu {
            margin: 0;
            background: #fff;
            z-index: 100;
            position: absolute;
            list-style-type: none;
            padding: 5px 0;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 400;
            color: #333;
            box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
            li {
                margin: 0;
                padding: 7px 16px;
                cursor: pointer;
                &:hover {
                    background: #eee;
                }
            }
        }
    }

    .im-chat-footer {
        border-top: 1px solid $color-gray;
        height: 15rem;
        display: flex;
        flex-direction: column;

        .im-chat-tool {
            padding: 0.5rem 1rem;
            height: 3.4rem;
            position: relative;
            .im-upload {
              display:inline-block;
            }
            i {
                font-size: 2.4rem;
                cursor: pointer;
                margin-left: 1rem;
            }
            .faces-box {
                position: absolute;
                bottom: 3.8rem;
            }

            .history-message-btn {
                float: right;
            }


        }

        textarea {
            border: 0;
            padding: 0.5rem;
            width: 100%;
            flex: 1;
            resize: none;
            background-color: $color-box-bg !important;
            &:focus {
                border: 0;
            }
        }

        .im-chat-send {
            height: 4rem;
            text-align: right;
            padding: 0 1rem 1rem 0;
        }
    }

    .ivu-scroll-wrapper {
        margin: 0 !important;
    }

    .ivu-scroll-container {
        padding: 15px 15px 5px;
        overflow-y: visible !important;
    }

    /* 重新覆盖iview 里面的 model 小于768px 时候 宽度变100% 的问题 */
    @media (max-width: 768px) {
        .user-model {
            .ivu-modal {
                width: 30rem !important;
                margin: 0 auto;
            }
        }
    }

    .history-message {
        width: 80%;
        height: calc(100% - 30px);
    }

    .page {
        position: fixed;
        bottom: 0;
        width: 100%;
        margin: 0.5rem;
    }

    .ivu-drawer-body {
        padding: 0 !important;

        .messages {
            height: calc(100% - 3rem);
        }
    }

    .chat-user-list {
        list-style: none;
        margin: 0;
        padding: 1rem;

        & > li {
            margin-bottom: 1rem;
            cursor: pointer;

            & > .im-chat-avatar {
                width: 3.2rem;
                height: 3.2rem;
                display: inline-block;
                vertical-align: middle;

                & > img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>
