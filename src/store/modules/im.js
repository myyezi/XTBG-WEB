import websocketConnect from '@/utils/imUtils/websocketConnect'
import { Chat, ChatListUtils, MessageInfoType, MessageTargetType, transform } from '@/utils/imUtils/ChatUtils';
import conf from '@/views/im/conf';
const im = { 
    state: {
        // 当前的用户
        user: {},
        websocket: {},
        //内存中所有的聊天记录
        messageListMap: {},
        //内存中的会话记录
        sessionList: [],
        // 单个聊天记录
        messageList: [],
        // 当前聊天窗口
        currentChat: {},
        // 所有的聊天窗口
        chatList: [],
        //好友列表
        userFriendList: [],
        //群组列表
        chatGroupList: [],
        //所有的群组成员列表
        chatGroupListMap: {},
        //当前群成员
        currentGroupUser:[],
        // 未读消息
        messageCount:0,
        // 网络状态
        netStaus:''
      },
      mutations: {
        updateNet:function(state, net) {
          state.netStaus = net;
        },
        setCurrentUser: function(state, user) {
          user.id = user.userId
          state.user = user;
        },
        setUserFriendList: function(state, userFriendList) {
          state.userFriendList = userFriendList;
        },
        // 更新群列表
        setChatGroupList: function(state, chatGroupList) {
          if(chatGroupList&&chatGroupList.length>0) {
            let sessionList = ChatListUtils.getSessionList(state.user.id)
            state.chatGroupList = chatGroupList //更新状态管理数据
            // 所有群聊放入缓存
            ChatListUtils.setGroupList(state.user.id, state.chatGroupList);
            chatGroupList.forEach((items)=>{
              sessionList.forEach((item)=>{
                  if(item.targetId == items.targetId) {
                    item.portrait = items.portrait
                    item.targetName = items.name
                    item.owner = items.owner
                  }
              })
            })
            state.sessionList = sessionList //更新状态管理数据
            // 所有会话放入缓存
            ChatListUtils.setSessionList(state.user.id, state.sessionList);
          }  else {
            state.chatGroupList = []
            state.chatGroupListMap = {}
            ChatListUtils.setGroupList(state.user.id, state.chatGroupList);
          }
        },
        // 更新所有群列表成员
        setChatGroupListMap: function(state, chatGroupObj) {
          state.chatGroupListMap[chatGroupObj.groupId] = chatGroupObj.groupMembers;
          // 放入缓存
          ChatListUtils.setChatGroupListMap(state.user.id, state.chatGroupListMap);
        },
        // 更新当前群成员列表
        setCurrentGroupUser: function(state, currentGroupUser) {
          state.currentGroupUser = currentGroupUser.groupMembers
        },
        setChatMap: function(state, chatMap) {
          state.chatMap = chatMap;
        },
        setWebsocket: function(state, websocket) {
          state.websocket = websocket;
        },
        // 发送给服务器
        sendMessage: function(state, message) {
          state.websocket.pubMessage(JSON.stringify(message.obj),message.subTopic);
        },
        resetUnRead: function(state) {
          console.log('state.currentChat', state.currentChat);
          if (typeof state.currentChat == 'string') {
            state.currentChat = {};
          }
          state.currentChat['unReadCount'] = 0;
        },
        recallMessage: function(state, message) {

        },
        // 保存聊天信息到内存
        addMessage: function(state, message) {
          console.log(message)
          message.serverTimestamp = parseInt(message.serverTimestamp)
          // if(message.content.type == 2) {
          //   message.content.content = '收到语音消息，请在手机上查看'
          // } 
          if (message.content.type == 4) {
            message.content.content = '收到定位消息，请在手机上查看'
          } 
          // else if (message.content.type == 6) {
          //   message.content.content = '收到视频消息，请在手机上查看'
          // } 
          let chatList = []
          let getChatList = ChatListUtils.getChatList(state.user.id);
          // 是否是自己发的消息
          if(message.fromUserId == state.user.id) {
            chatList = getChatList[message.conversation.targetId];
            if(message.serverTimestamp) {
              chatList.forEach((item)=>{
                  if(item.messageTag == message.messageTag) {
                    item.serverTimestamp = message.serverTimestamp
                    item.messageId = message.messageId
                    if(item.netStausType) {
                      item.netStausType = 1
                    }
                  }
              })
            } else {
              if(getChatList[message.conversation.targetId]) {
                let flag = false 
                chatList.forEach((item)=>{
                  if(item.messageTag == message.messageTag) {
                    flag = true
                    item.netStausType = message.netStausType
                  }
                })
                if(!flag) {
                  getChatList[message.conversation.targetId].push(message);
                } 
              } else {
                getChatList[message.conversation.targetId] = []
                getChatList[message.conversation.targetId].push(message);
              }
            }
          } else {
            // 0单聊或者1群聊
            if(message.conversation.type === 1) {
              chatList = getChatList[message.conversation.targetId];
            } else {
              chatList = getChatList[message.fromUserId];
            }
            if(chatList&&chatList.length>0) {
              let flag = false
              chatList.forEach((item)=>{
                  if(item.messageId == message.messageId) {
                    flag = true
                  }
              })
              if(!flag) {
                if(message.conversation.type === 1) {
                  getChatList[message.conversation.targetId].push(message);
                } else {
                  getChatList[message.fromUserId].push(message);
                }
              }
            } else {
              if(message.conversation.type === 1) {
                getChatList[message.conversation.targetId] = []
                getChatList[message.conversation.targetId].push(message)
              } else {
                getChatList[message.fromUserId] = []
                getChatList[message.fromUserId].push(message)
              }
            }
          }
          state.messageListMap = getChatList
          // 放入缓存
          ChatListUtils.setChatList(state.user.id, state.messageListMap);
        },
        // 保存会话记录到内存
        addSession: function(state, session) {
          let flag = false;
          let indexs = null;
          let sessionObj = {}
          if(session.conversation) {
            sessionObj = {
              unReadCount:0,
              portrait: '', // 接收人头像
              serverTimestamp: session.serverTimestamp, // 发送时间
              targetName:'', //接收人名称
              targetId:session.conversation.targetId,
              type: session.conversation.type, //消息类别 0、单聊 1、群聊
              // 发送消息的内容属性
              content: {
                  type:session.content.type, //发送信息类型 1、文本 2、语音 3、图片 4、定位 5、文件 6、视频
                  content:session.content.type==1?session.content.content:session.content.type==2?'语音':session.content.type==3?'图片':session.content.type==4?'定位':session.content.type==5?'文件':'视频'// 发送消息内容
              },
            }
            // 是否本人发的消息
            if(state.user.id!= session.fromUserId) {
              if(session.conversation.type == 1) {
                let groupList = ChatListUtils.getGroupList(state.user.id);
                groupList.forEach((item)=>{
                    if(item.targetId == session.conversation.targetId) {
                        sessionObj.portrait = item.portrait
                        sessionObj.targetName = item.name
                    }
                })
              } else {
                sessionObj.targetId = session.fromUserId
              }
            } 
          } else {
            sessionObj = session
          }
          console.log(sessionObj)
          let getSessionList = ChatListUtils.getSessionList(state.user.id);
          if(getSessionList&&getSessionList.length>0) {
              getSessionList.forEach((item,index)=>{
                if(item.targetId == sessionObj.targetId) {
                  flag = true
                  indexs = index
                  if(sessionObj.content.content) {
                    item.content.content = sessionObj.content.content;
                    item.content.type = sessionObj.content.type;
                  }
                  if(sessionObj.serverTimestamp) {
                    item.serverTimestamp = sessionObj.serverTimestamp
                  }
                  if(state.user.id!= session.fromUserId) {
                    item.unReadCount = item.unReadCount + 1
                    state.messageCount += 1
                  }
                }
            })
          }
          if(!flag) {
            getSessionList.unshift(sessionObj)
          } else {
            let obj = getSessionList[indexs]
            getSessionList.splice(indexs,1)
            getSessionList.unshift(obj)
          }
          console.log(getSessionList)
          state.sessionList = getSessionList
          // 放入缓存
          ChatListUtils.setSessionList(state.user.id, state.sessionList);
        },
        setMessageList: function(state, messageList) {
          state.messageList = messageList;
        },
        setMessageListMap: function(state, messageListMap) {
          state.messageListMap = messageListMap;
        },
        setSessionList: function(state, sessionList) {
          state.sessionList = sessionList;
        },
        chatGroupListMap: function(state, chatGroupListMap) {
          state.chatGroupListMap = chatGroupListMap;
        },
        setChatList: function(state, chatList) {
          state.chatList = chatList;
        },
        delSession: function(state, chat) {
          state.sessionList = ChatListUtils.delSession(state.user.id, chat);
          // state.messageListMap = ChatListUtils.delChat(state.user.id, chat);
        },
        delAllSession : function(state, chat) {
          state.sessionList = ChatListUtils.delAllSession(state.user.id);
        },
        // 设置消息已读
        setReadCount: function(state, chat) {
          let getSessionList = ChatListUtils.getSessionList(state.user.id);
          getSessionList.forEach((item)=> { 
            if (item.targetId === chat.targetId) {
              item.unReadCount = chat.unReadCount
            }
          })
          state.sessionList = getSessionList
          // 放入缓存
          ChatListUtils.setSessionList(state.user.id, state.sessionList);
        }
      },
      actions: {
        getWebsocket({commit, state},data) {
          let client = websocketConnect.connect(data)
          console.log(client)
          commit('setWebsocket', client);
          // setInterval(function () {
          //   state.websocket.pubMessage(JSON.stringify({
          //     'heart': true
          //   }))
          // }, 3000)
      
        }
      }
}
export default im