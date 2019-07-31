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
        chatGroupListMap: {}
      },
      mutations: {
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
              state.websocket.pubMessage(JSON.stringify({
                target:items.targetId,
                head:0
              }),'GGM');
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
        // 保存聊天信息到内存
        addMessage: function(state, message) {
          console.log(message)
          let getChatList = ChatListUtils.getChatList(state.user.id);
          if(message.conversation.type === 1) {
            if(getChatList[message.conversation.targetId]) {
              getChatList[message.conversation.targetId].push(message);
            } else {
              getChatList[message.conversation.targetId] = []
              getChatList[message.conversation.targetId].push(message);
            }
          } else {
            if(message.fromUserId == state.user.id) {
              if(getChatList[message.conversation.targetId]) {
                getChatList[message.conversation.targetId].push(message);
              } else {
                getChatList[message.conversation.targetId] = []
                getChatList[message.conversation.targetId].push(message);
              }
            } else {
              let chatList = getChatList[message.fromUserId];
              if(chatList&&chatList.length>0) {
                let flag = false
                chatList.forEach((item)=>{
                    if(item.messageId == message.messageId) {
                      flag = true
                    }
                })
                if(!flag) {
                  getChatList[message.fromUserId].push(message);
                }
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
          console.log(session)
          let flag = false;
          let indexs = null;
          let sessionObj = {}
          if(session.conversation) {
            sessionObj = {
              portrait: '', // 接收人头像
              serverTimestamp: session.serverTimestamp, // 发送时间
              targetName:'', //接收人名称
              type: session.conversation.type, //消息类别 0、单聊 1、群聊
              // 发送消息的内容属性
              content: {
                  type:session.content.type, //发送信息类型 1、文本 2、语音 3、图片 4、定位 5、文件 6、视频
                  content:session.content.type==1?session.content.content:session.content.type==3?'图片':'文件'// 发送消息内容
              },
            }
            if(session.conversation.type == 1) {
              let groupList = ChatListUtils.getGroupList(state.user.id);
              groupList.forEach((item)=>{
                  if(item.targetId == session.conversation.targetId) {
                      sessionObj.targetId = item.targetId
                      sessionObj.portrait = item.portrait
                      sessionObj.targetName = item.name
                  }
              })
            } else {
              // let getSessionList = ChatListUtils.getSessionList(state.user.id);
              sessionObj.targetId = session.fromUserId
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
                  item.content.content = sessionObj.content.content;
                  if(sessionObj.serverTimestamp) {
                    item.serverTimestamp = sessionObj.serverTimestamp
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
          state.messageListMap = ChatListUtils.delChat(state.user.id, chat);
        },
        delAllSession : function(state, chat) {
          state.sessionList = ChatListUtils.delAllSession(state.user.id);
        },
        /**
         * 设置未读消息条数
         * @param state state
         * @param message 消息
         */
        setUnReadCount: function(state, message) {
          let tempChatList = [];
          let tempChat = {};
    
          for (let chat of state.chatList) {
            // 给接受消息的聊天室未读数量 +1
            if (String(chat.id) === String(message.fromid) && message.type === MessageTargetType.FRIEND) {
              if (!chat['unReadCount']) {
                chat['unReadCount'] = 0;
              }
              chat['unReadCount'] = chat['unReadCount'] + 1;
              tempChat = chat;
            }
            //群组聊天
            else if (String(chat.id) === String(message.id) && message.type === MessageTargetType.CHAT_GROUP) {
              if (!chat['unReadCount']) {
                chat['unReadCount'] = 0;
              }
              chat['unReadCount'] = chat['unReadCount'] + 1;
              chat.portrait = conf.getHostUrl() + state.chatMap[message.id].portrait;
              tempChat = chat;
            } else {
              tempChatList.push(chat);
            }
          }
          // 聊天列表没有此人的chat
          if (!tempChat.id && message.type === MessageTargetType.FRIEND) {
            tempChat = new Chat(message.fromid, message.username, message.portrait, 1, message.content, state.user.mobile, state.user.email, MessageTargetType.FRIEND);
          } else if (!tempChat.id && message.type === MessageTargetType.CHAT_GROUP) {
            let groupChat = state.chatMap[message.id];
            tempChat = new Chat(message.id, groupChat.name, conf.getHostUrl() + groupChat.portrait, 1, message.content, state.user.mobile, state.user.email, MessageTargetType.CHAT_GROUP);
          }
          // 添加到聊天室列表的第一个
          tempChatList.unshift(tempChat);
          // 重新设置chatList
          state.chatList = tempChatList;
          // 放入缓存
          ChatListUtils.setChatList(state.user.id, tempChatList);
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