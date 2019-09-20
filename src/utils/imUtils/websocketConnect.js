import store from '@/store'
import {ChatListUtils,ErrorType,popNotice} from '@/utils/imUtils/ChatUtils'
let client;
let objData;

const IMTopic = {
    SendMessageTopic: "MS",//发送消息
    NotifyMessageTopic:'MN',//接收通知
    RecallMessageTopic: "MR",//撤回消息
    GetAllUserTopic: "UUI",//获取所有用户信息
    DelUserChatTopic: "UDC",//删除会话
    GetUserChatTopic: "UGC",//获取会话
    LoadRemoteMessagesTopic:"LRM",//获取初始化消息
    CreateGroupTopic: "GC",//创建群组
    GetGroupInfoTopic: "GGI",//获取群组
    GetGroupMemberTopic: "GGM",//获取群组成员
    AddGroupMemberTopic: "GAM",// 添加群成员
    KickoffGroupMemberTopic: "GKM",// 移除群成员
    ModifyGroupInfoTopic : "GMI",// 修改群信息
    TransferGroupTopic : "GTG",// 转移群
    DismissGroupTopic : "GD",// 解散群
    QuitGroupTopic : "GQ",// 退出群
};

const websocketConnect = {
    connect: function(data) {
        objData = data;
        client = new Paho.MQTT.Client(data.ip,Number(data.port),process.env.BASE_MQQT,process.env.BASE_PCIM+data.username);
        client.onConnectionLost = this.onConnectionLost;
        client.onMessageArrived = this.onMessageArrived;
        client.onMessageDelivered = this.onMessageDelivered;
        client.pubMessage = this.pubMessage;
        client.groupOperation = this.groupOperation
        client.messageOperation = this.messageOperation
        client.connect({
            userName: data.username,
            password: data.token,
            timeout: 5,  
            keepAliveInterval: 50,  
            cleanSession: false, 
            useSSL:true,
            onSuccess: this.onConnect,
            onFailure: function(message) {
                console.log("onConnectionLost:failure");
                store.commit('updateNet', ErrorType.NET_ERROR);
                // client.connect(objData);
            }
        });
        return client;
    },
    // 返回链接成功没
    onConnect: function() {
        store.commit('updateNet', '');
        Object.keys(IMTopic).map(v => {
            console.log("subscribeTopic:", IMTopic[v]);
            client.subscribe(IMTopic[v], { qos: 1 });
        });
        let obj1 = JSON.stringify({
            requestList: [{
                target:objData.username,
                type:2,
                updateTime:0
            }]
        });
        client.pubMessage(obj1,IMTopic.GetGroupInfoTopic)

        let obj2 = JSON.stringify({
            requestList: []
        });
        client.pubMessage(obj2,IMTopic.GetAllUserTopic)

        let obj3 = JSON.stringify({
            userId: objData.username,
        });
        client.pubMessage(obj3,IMTopic.GetUserChatTopic)
        console.log("connect success.");
    },
    //连接丢失
    onConnectionLost: function(responseObject) {
        if (responseObject.errorCode !== 0) {
            store.commit('updateNet', ErrorType.NET_ERROR);
            console.log("onConnectionLost:")
            console.log(responseObject);
        }
    },
    // 接受消息
    onMessageArrived: function(message) {
        if(message.destinationName==IMTopic.DelUserChatTopic) {
            return
        } 
        let msg = JSON.parse(message.payloadString);
        console.log(msg);
        console.log(message.destinationName)
        if (message.destinationName == IMTopic.NotifyMessageTopic) {
            ChatListUtils.setLastMessageHead(objData.username,ChatListUtils.getLastMessageHead(objData.username)?ChatListUtils.getLastMessageHead(objData.username):(parseInt(msg.head)-1)+'')
            ChatListUtils.setLastMessageType(objData.username,ChatListUtils.getLastMessageType(objData.username)?ChatListUtils.getLastMessageType(objData.username):msg.type)
            let obj = JSON.stringify({
                id: ChatListUtils.getLastMessageHead(objData.username)?ChatListUtils.getLastMessageHead(objData.username):'0',
                type: ChatListUtils.getLastMessageType(objData.username)?ChatListUtils.getLastMessageType(objData.username):0,
            });
            console.log(obj)
            client.pubMessage(obj,"MP")
        } else if (message.destinationName == IMTopic.SendMessageTopic) {
            store.commit('addMessage', msg);
            store.commit('addSession', msg);
        }else if (message.destinationName == "MP") {
            ChatListUtils.setLastMessageHead(objData.username,msg.head)
            ChatListUtils.setLastMessageType(objData.username,msg.type)
            if(msg.messages.length>0) {
                msg.messages.forEach((item,index)=> {
                    if(item.conversation.type==1) {
                        if(index == 0) {
                            let obj = JSON.stringify({
                                requestList: [{
                                    target:objData.username,
                                    type:2,
                                    updateTime:0
                                }]
                            });
                            client.pubMessage(obj,IMTopic.GetGroupInfoTopic)
                        }
                        if(item.conversation.topic==IMTopic.DismissGroupTopic && objData.username == item.fromUserId) {

                        } else {
                            if(item.conversation.topic==IMTopic.QuitGroupTopic && objData.username == item.fromUserId) {
                                
                            } else {
                                store.commit('addMessage', item);
                                store.commit('addSession', item);
                            }
                        }
                    } else {
                        store.commit('addMessage', item);
                        store.commit('addSession', item);
                    }
                    // 首先，让我们检查我们是否有权限发出通知
                    // 如果没有，我们就请求获得权限
                    // if (window.Notification && window.Notification.permission !== "granted") {
                    //     window.Notification.requestPermission(function (status) {
                    //         if (window.Notification.permission !== status) {
                    //             window.Notification.permission = status;
                    //         }
                    //         popNotice(item);
                    //     });
                    // } else if (window.Notification.permission === "granted") {
                    //     popNotice(item);
                    // }
                }) 
            }
        } else if (message.destinationName == IMTopic.CreateGroupTopic) {
            let obj = JSON.stringify({
                requestList: [{
                    target:objData.username,
                    type:2,
                    updateTime:0
                }]
            });
            client.pubMessage(obj,IMTopic.GetGroupInfoTopic)
            let obj1 = JSON.stringify({
                userId: objData.username,
            });
            client.pubMessage(obj1,IMTopic.GetUserChatTopic)
        }  else if (message.destinationName == IMTopic.GetAllUserTopic) {
            store.commit('setUserFriendObj', msg.resultList);
        }  else if (message.destinationName == IMTopic.GetGroupInfoTopic) {
            store.commit('setChatGroupList', msg.infoList);
        } else if (message.destinationName == IMTopic.GetGroupMemberTopic) {
            store.commit('setCurrentGroupUser', msg);
        } else if (message.destinationName == IMTopic.AddGroupMemberTopic) { 
            client.messageOperation(msg,IMTopic.AddGroupMemberTopic)
        } else if (message.destinationName == IMTopic.ModifyGroupInfoTopic) {
            client.messageOperation(msg,IMTopic.ModifyGroupInfoTopic)
        } else if (message.destinationName == IMTopic.DismissGroupTopic) { 
            client.groupOperation({groupId:msg})
        } else if (message.destinationName == IMTopic.TransferGroupTopic) {
            client.messageOperation(msg,IMTopic.TransferGroupTopic)
        } else if (message.destinationName == IMTopic.QuitGroupTopic) { 
            client.groupOperation(msg)
        } else if (message.destinationName == IMTopic.KickoffGroupMemberTopic) { 
            client.messageOperation(msg,IMTopic.KickoffGroupMemberTopic)
        } else if (message.destinationName == IMTopic.LoadRemoteMessagesTopic) { 
            if(msg.messages.length>0) {
                msg.messages.forEach((item,index)=> {
                    if(item.conversation.type==1) {
                        if(item.conversation.topic==IMTopic.DismissGroupTopic && objData.username == item.fromUserId) {

                        } else {
                            if(item.conversation.topic==IMTopic.QuitGroupTopic && objData.username == item.fromUserId) {
                                
                            } else {
                                store.commit('addMessage', item);
                            }
                        }
                    } else {
                        store.commit('addMessage', item);
                    }
                }) 
            }
        } else if (message.destinationName == IMTopic.GetUserChatTopic) { 
            if(msg.userChatInfoList && msg.userChatInfoList.length>0) {
                let sessionList = []
                msg.userChatInfoList.forEach((item)=>{
                    sessionList.push({
                        unReadCount:item.unreadMessageCount,
                        portrait: item.portrait?item.portrait:'', // 接收人头像
                        serverTimestamp: item.updateTime, // 发送时间
                        targetName:item.name?item.name:'', //接收人名称
                        targetId:item.target,
                        owner:item.owner,
                        type: item.type, //消息类别 0、单聊 1、群聊
                        // 发送消息的内容属性
                        content: {
                            type:'', //发送信息类型 1、文本 2、语音 3、图片 4、定位 5、文件 6、视频
                            content:item.lastMessage
                        },
                    })
                })
                store.commit('setSessionList', sessionList);
            }
        } else if (message.destinationName == IMTopic.DelUserChatTopic) { 

        }
    },
    // 群处理 
    groupOperation: function(msg) {
        console.log(msg)
        let groupList = ChatListUtils.getGroupList(objData.username)
        let arr = []
        groupList.forEach((item)=>{
            let flag = false
            if(msg.groupId == item.targetId) {
                flag = true
            }
            if(!flag) {
                arr.push(item)
            }
        })
        store.commit('delSession', {targetId:msg.groupId});
        store.commit('setChatGroupList', arr);
    },
    // 会话和消息处理
    messageOperation: function(msg,topic) {
        console.log(msg)
        let obj = JSON.stringify({
            userId: objData.username,
        });
        client.pubMessage(obj,IMTopic.GetUserChatTopic)
        let currentMessage = {
            fromUserId:objData.username, //发送人id
            serverTimestamp: new Date().getTime(), // 发送时间
            // 发送消息的内容属性
            content: {
                type:1, //发送信息类型 1、文本 2、语音 3、图片 4、定位 5、文件 6、视频
                content:msg.notifyContent.content // 发送消息内容
            },
            // 发送消息的会话属性
            conversation: {
                targetId: msg.groupId, //接收人id
                type: msg.notifyContent.type,//消息类别 0、单聊 1、群聊
                topic: topic
            }
        };
        store.commit('addMessage', currentMessage);
    },
    // 发送消息成功后回调
    onMessageDelivered: function(message) {
        console.log("pub message" + message.payloadString);
    },
    // 发送消息
    pubMessage(message,subTopic) {
        if(!subTopic) {
            subTopic=IMTopic.SendMessageTopic
        }
        var message = new Paho.MQTT.Message(message);
        message.destinationName = subTopic;
        message.qos = 1;
        client.send(message);
    }
};

export default websocketConnect;
