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
                                <img :src="allUserInfoObj[item.fromUserId]&&allUserInfoObj[item.fromUserId].portrait?allUserInfoObj[item.fromUserId].portrait:defaultPic"/>
                                <cite v-if="item.fromUserId == user.userId"><i v-if="item.serverTimestamp">{{ formatDateTime(new Date(item.serverTimestamp)) }}</i>{{ user.name }}</cite>
                                <cite v-else>{{ allUserInfoObj[item.fromUserId]&&allUserInfoObj[item.fromUserId].name }}<i>{{ formatDateTime(new Date(item.serverTimestamp)) }}</i></cite>
                            </div>
                            <div class="im-chat-text" @contextmenu.prevent="rightEvent(item,$event)">
                                <i class="el-icon-loading" v-if="!item.messageId&&item.netStausType==1"></i>
                                <i class="el-icon-warning" v-if="item.netStausType==2"></i>
                                <img class="message-img" v-if="item.content.type == 3" :src='JSON.parse(item.content.content).filedomain+JSON.parse(item.content.content).path' alt="消息图片不能加载"  @click="openImageProxy(item)">
                                <pre v-html="transform(item.content.content,item.content.type)" v-else></pre>
                            </div>
                            <!-- <div class="im-chat-cxfs" v-if="item.netStausType==2" @click="resendMessage(item)">重新发送</div> -->
                        </li>
                        <li v-else class="group_system_chat">
                          <div v-if="item.content.type==100">
                              <div class="im-chat-user">
                                  <img :src="allUserInfoObj[item.fromUserId]&&allUserInfoObj[item.fromUserId].portrait?allUserInfoObj[item.fromUserId].portrait:defaultPic"/>
                                  <cite v-if="item.fromUserId == user.userId"><i v-if="item.serverTimestamp">{{ formatDateTime(new Date(item.serverTimestamp)) }}</i>{{ user.name }}</cite>
                                  <cite v-else>{{ notifyTypeObj[JSON.parse(item.content.content).notifyType]}}<i>{{ formatDateTime(new Date(item.serverTimestamp)) }}</i></cite>
                              </div>
                              <div class="im-chat-text">
                                <el-card class="box-card">
                                  <div class="job_notifications_title">
                                    {{JSON.parse(item.content.content).title}}
                                  </div>
                                  <div class="job_notifications_time" v-if="JSON.parse(item.content.content).notifyType==1">
                                    {{JSON.parse(item.content.content).workMessageContent.attendanceDate}}
                                  </div>
                                  <div class="job_notifications_name">
                                    <div v-if="JSON.parse(item.content.content).notifyType==1">
                                      <span>班次时间：</span>
                                      {{JSON.parse(item.content.content).workMessageContent.dutyTime + "&nbsp;&nbsp;" + (JSON.parse(item.content.content).workMessageContent.attendanceType==1?"上班":"下班")}}
                                    </div>
                                    <div v-else>
                                      <div v-if="JSON.parse(item.content.content).workMessageContent.projectName">
                                          <span>项目名称：</span>
                                          {{JSON.parse(item.content.content).workMessageContent.projectName}}
                                      </div>
                                      <div v-if="JSON.parse(item.content.content).workMessageContent.projectPlanName">
                                          <span>节点名称：</span>
                                          {{JSON.parse(item.content.content).workMessageContent.projectPlanName}}
                                      </div>
                                    </div>
                                  </div>
                                  <!-- <div class="job_notifications_name" v-if="JSON.parse(item.content.content).notifyType==3">
                                    <div>
                                      <span>审批时间：</span>
                                      {{formatDateTime(new Date(JSON.parse(item.content.content).timestamp))}}
                                    </div>
                                  </div> -->
                                  <div class="job_notifications_count">
                                    <div v-if="JSON.parse(item.content.content).notifyType==1">
                                      <span>打卡地点：</span>
                                      {{JSON.parse(item.content.content).workMessageContent.adress}}
                                    </div>
                                    <div v-else>
                                      <span v-if="JSON.parse(item.content.content).notifyType==2">申请原因：</span>
                                      <span v-else>审批内容：</span>
                                      {{JSON.parse(item.content.content).reason}}
                                    </div>
                                  </div>
                                  <div class="job_notifications_result" v-if="JSON.parse(item.content.content).notifyType==3">审批结果：
                                    <span v-if="JSON.parse(item.content.content).workMessageContent.approvaStatus==2" style="color:#14d41b">同意</span>
                                    <span v-if="JSON.parse(item.content.content).workMessageContent.approvaStatus==3" style="color:#ff0404">不同意</span>
                                  </div>
                                </el-card>
                              </div>
                          </div>
                          <div v-else class="group_system_notifications">
                              <span>{{ formatDateTime(new Date(item.serverTimestamp)) }}</span>
                              <p>{{item.content.content}}</p>
                          </div>
                        </li>
                    </ul>
                </div>
                <ul v-show="visibleBox" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
                  <li @click.stop="withdrawMessage" :style="{color:isTimeOut?'#999':'#333'}">撤回消息<span v-if="isTimeOut">(已超过两分钟)</span></li>
              </ul>
                <div class="im-chat-footer" v-if="chat.type !== 2">
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
                    <textarea v-model="messageContent" class="textarea"  @keyup.enter.exact="mineSend(1)" @keyup.ctrl.enter="lineFeed()" @keyup.alt.enter="lineFeed()" autofocus></textarea>
                    <div class="im-chat-send">
                        <el-button size="mini" @click="mineSend(1)">发送</el-button>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="showHistory" width="600px"  top="calc((100vh - 716px)/2)"  :close-on-press-escape="false" :append-to-body="true" :modal="false" class="im_chat_record_dialog">
              <div slot="title" class="im_chat_record_title clearfix">
                <img :src="chat.portrait?chat.portrait:defaultPic" alt="头像" v-show="!isSetting">
                <span v-show="!isSetting"> {{ chat.targetName }}</span>
                <span v-show="isSetting"> 群设置</span>
              </div>
              <setting :chat="chat" :groupUserList="currentGroupUser"  v-if="showHistory&&isSetting" :allUserInfoObj="allUserInfoObj"></setting>
              <chat-history :chat="chat" :messageList="messageList" :messageImgList="messageImgList" :allUserInfoObj="allUserInfoObj" v-if="showHistory&&!isSetting"></chat-history>
        </el-dialog>
        <!-- 大图预览 -->
        <img-previewer :list="previewerImgList" selector=".message-img" :options="options" @on-close="closePic" ref="previewer"></img-previewer>
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
  import ImgPreviewer from '@/components/ImgPreviewer/index.js'
  const { imageLoad, transform, ChatListUtils } = require('../../../utils/imUtils/ChatUtils');

  export default {
    components: {
      Faces,
      chatHistory,
      Setting,
      ImgPreviewer
      // Button
    },
    name: 'userChat',
    computed: {
      ...mapGetters([
          'user',
      ]),
      userFriendObj: {
        get: function() {
          return this.$store.state.im.userFriendObj
        }
      },
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
      netStaus: {
        get: function() {
          return this.$store.state.im.netStaus;
        }
      }
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
        netStausType:1,//网络状态1为正常2为断开
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
        // fileFormat: "doc,docx,xls,xlsx,pdf,exe,txt,ppt,pptx,zip,rar",
        videoFormat: "mp4,mov",
        audioFormat: "mp3,m4a",
        transform:transform,
        options: {
            shareEl: false,
            closeEl: true,
            fullscreenEl: false
        },
        previewerImgList:[],//预览的图片集合
        messageImgList:[],//所有的图片消息图片的集合
        allUserInfoObj:{}, //所有用户信息
        notifyTypeObj:{
          1:'考勤打卡',
          2:'申请',
          3:'审批'
        }
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
      lineFeed() {
          this.messageContent = this.messageContent + '\n'
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
      // 重新发送消息 
      resendMessage(item) {
        let objArr = {
            obj:item,
            subTopic:'MS'
        }
        this.$store.commit('sendMessage', objArr); 
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
          // 图片
          if (self.imgFormat.indexOf(suffix) >=0){
            type = 3
          }
          // 视频
          else if (self.videoFormat.indexOf(suffix) >=0){
            type = 6
          }
          // 音频
          else if (self.audioFormat.indexOf(suffix) >=0){
            type = 2
          } else {
            type = 5 // 文件
          }
          this.mineSend(type)
        } else {
          this.$Message.error('文件上传错误，请重试');
        }
      },
      handleError: function() {
        this.$Message.error('上传错误！');
      },
      // 附件和图片点击展开
      openImageProxy: function(item) {
        let path = JSON.parse(item.content.content).filedomain+JSON.parse(item.content.content).path
        this.previewerImgList = Object.assign([], this.messageImgList) 
        this.messageImgList.forEach((item,index)=>{
            if(item.src == path) {
                this.$refs.previewer.curIndex = index
            }
        }) 
      },
      // 关闭预览
      closePic () {
          this.$emit && this.$emit("onClose")
      },
      // 本人发送信息
      mineSend(type) {
        let self = this;
        let time = new Date().getTime();
        let content = self.messageContent;
        if (content !== '' && content !== '\n') {
          if (content.length > 2000) {
            self.$Message.error('不能超过2000个字符');
          } else {
            let currentMessage = {
              fromUserId:self.user.userId, //发送人id
              serverTimestamp: '', // 发送时间
              messageTag:time,
              netStausType:self.netStausType,
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
        } else {
          self.messageContent= self.messageContent.replace('\n', "");
        }
      },
      // 发送消息的基础方法
      send(message,session) {
        let self = this;
        let objArr = {
            obj:message,
            subTopic:'MS'
        }
        if(self.netStausType == 1) {
            self.$store.commit('addMessage', message);
            self.$store.commit('sendMessage', objArr);
            self.messageContent = '';
            this.scollBottom()
        } else if(this.netStausType == 2) {
            this.$message.error("网络链接断开！请刷新网络重连成功后发送！！！")
        }
        // self.$store.commit('addSession', session);
      },
      getHistoryMessage() {
        this.isSetting = false
        this.showHistory = true
      },
      // 得到当前点击会话框的聊天信息
      getCurrentMessageList() {
          let self = this;
          let userInfoObj = {}
          let cacheMessagesObj = {}
          let cacheMessages = []
          // self.messageList = [];
          self.messageImgList = []
          self.messageContent = self.chat.draftContent?self.chat.draftContent:'' //获取草稿信息
          // 从内存中取用户信息
          userInfoObj = self.$store.state.im.userFriendObj
          if(JSON.stringify(userInfoObj) == '{}') {
              userInfoObj = ChatListUtils.getUserFriendObj(self.user.userId)
              if(JSON.stringify(userInfoObj) !== '{}') {
                  self.$store.commit('setUserFriendObj', userInfoObj);
              }
          }
          self.allUserInfoObj = userInfoObj
          // 从内存中取聊天信息
          cacheMessagesObj = self.$store.state.im.messageListMap
          if(JSON.stringify(cacheMessagesObj) !== '{}' && cacheMessagesObj[self.chat.targetId]) {
              cacheMessages = cacheMessagesObj[self.chat.targetId]
          }
          if(!cacheMessages||cacheMessages.length===0) {
            // 从缓存中取聊天信息
            cacheMessagesObj = ChatListUtils.getChatList(self.user.userId)
            if(JSON.stringify(cacheMessagesObj) !== '{}') {
                self.$store.commit('setMessageListMap', cacheMessagesObj);
                cacheMessages = cacheMessagesObj[self.chat.targetId];
            }
          }
          if (cacheMessages&&cacheMessages.length>0) {
            let contents = {}
            let path = ''
            self.messageList = cacheMessages;
            // 得到所有是图片消息的图片集合
            cacheMessages.forEach((item)=>{
                if(item.content.type == 3) {
                    contents = JSON.parse(item.content.content)
                    path = contents.filedomain + contents.path
                    self.messageImgList.push({
                      src:path
                    })
                }
                // 网络重新链接或断开时的操作
                if(this.netStausType == 1) {
                    if(item.netStausType == 2) {
                      item.netStausType = 1
                    } 
                } else if(this.netStausType == 2) {
                    if(!item.messageId&&item.netStausType!=2) {
                      item.netStausType = 2
                      this.$store.commit('addMessage', item);
                    } 
                }
            })
          } else {
            if(self.chat.serverTimestamp) {
              let objArr = {
                  obj:{
                    head:'0',
                    count:100,
                    conversation:{
                        line:0,
                        type:self.chat.type,
                        targetId:self.chat.targetId
                    }
                  },
                  subTopic:'LRM'
              }
              self.$store.commit('sendMessage', objArr);
            }
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
      userFriendObj: function(newvalue,oldvalue) {
          this.getCurrentMessageList()
      },
      chat: function(newvalue,oldvalue) {
          if(JSON.stringify(newvalue) !== '{}'&&JSON.stringify(oldvalue) !== '{}') {
              this.$store.commit('addSession', {draft:true,draftContent:this.messageContent,targetId:oldvalue.targetId});
          }
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
                    this.chat.draftContent = item.draftContent
                }
            })
        }
      },
      messageList :function(newvalue,oldvalue) {
        if(newvalue) {
          this.getCurrentMessageList()
        }
        this.scollBottom()
      },
      currentGroupUser :function(newvalue,oldvalue) {
        if(this.isSetting) {
            this.showHistory = true
        }
      },
      netStaus :function(newvalue,oldvalue) {
        this.netStausType = newvalue?2:1
        this.getCurrentMessageList()
      },
    },
    created: function() {
      console.log(this.chat)
      this.netStausType = this.netStaus?2:1
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
        margin-top: 3rem;
        height: calc(100% - 3rem);
        min-height: 0;
    }

    .im-chat-top {
        border-bottom: 1px solid #cccccc;
        color: $color-default;
        padding: 0 0 0 10px;
        font-size: 1.6rem;
        font-weight: bold;
        height: 30px;
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 500px;
          display: inline-block;
        }
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
        height: calc(100% - 30px);

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
            margin-top: 6px;
            cursor: pointer;
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
                              text-overflow:ellipsis;//让超出的用...实现
                              white-space:nowrap;//禁止换行
                              overflow:hidden;//超出的隐藏
                              max-width: 350px;
                            }
                            .el-icon-download {
                                float: left;
                                font-size:20px;
                                margin-top:8px;
                            }
                        }
                    }
                    .im-chat-cxfs{
                        line-height: 20px;
                        height: 20px;
                        width: 100%;
                        color: #999;
                        text-align: right;
                        font-size: 12px;
                        margin-top: 5px;
                        cursor: pointer;
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
                    .el-icon-warning {
                      color:#e22222;
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
              .im-chat-text {
                  width: 25rem;
                  padding: 0;
                  &:after {
                      border-color: #fff transparent transparent;
                  }
                  .job_notifications_title {
                      // text-align: center;
                      font-size: 15px;
                      margin-bottom: 5px;
                      color: #fb9034;
                  }
                  .job_notifications_time {
                      font-size: 12px;
                      margin-bottom: 5px;
                  }
                  .job_notifications_name {
                    span {
                      color:#999
                    }
                  }
                  .job_notifications_count {
                    span {
                      color:#999
                    }
                  }
                  .job_notifications_result {
                    color:#999
                  }
              }
              .group_system_notifications {
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
