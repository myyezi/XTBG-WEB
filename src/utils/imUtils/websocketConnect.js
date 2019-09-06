import store from '@/store'
import {ChatListUtils,ErrorType} from '@/utils/imUtils/ChatUtils'
let client;
let objData;

const IMTopic = {
    SendMessageTopic: "MS",//发送消息
    NotifyMessageTopic:'MN',//接收通知
    RecallMessageTopic: "MR",//撤回消息
    GetAllUserTopic: "UUI",//获取所有用户信息
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
            id: ChatListUtils.getLastMessageHead(objData.username)?ChatListUtils.getLastMessageHead(objData.username):'0',
            type: ChatListUtils.getLastMessageType(objData.username)?ChatListUtils.getLastMessageType(objData.username):0,
        });
        client.pubMessage(obj1,"MP")

        let obj2 = JSON.stringify({
            requestList: [{
                target:objData.username,
                type:2,
                updateTime:0
            }]
        });
        client.pubMessage(obj2,"GGI")

        let obj3 = JSON.stringify({
            requestList: []
        });
        client.pubMessage(obj3,"UUI")
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
        let msg = JSON.parse(message.payloadString);
        console.log(message.destinationName)
        if (message.destinationName == "MN") {
            console.log(msg)
            let obj = JSON.stringify({
                id: ChatListUtils.getLastMessageHead(objData.username)?ChatListUtils.getLastMessageHead(objData.username):'0',
                type: ChatListUtils.getLastMessageType(objData.username)?ChatListUtils.getLastMessageType(objData.username):0,
            });
            client.pubMessage(obj,"MP")
        } else if (message.destinationName == "MS") {
            console.log(msg)
            store.commit('addMessage', msg);
            store.commit('addSession', msg);
        }else if (message.destinationName == "MP") {
            ChatListUtils.setLastMessageHead(objData.username,msg.head)
            ChatListUtils.setLastMessageType(objData.username,msg.type)
            console.log(msg)
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
                            client.pubMessage(obj,"GGI")
                        }
                        if(item.conversation.topic!='GD') {
                            if(item.conversation.topic!='GQ' || objData.username != item.fromUserId) {
                                store.commit('addMessage', item);
                                store.commit('addSession', item);
                            }
                        }
                    } else {
                        store.commit('addMessage', item);
                        store.commit('addSession', item);
                    }
                }) 
            }
        } else if (message.destinationName == "GC") {

        }  else if (message.destinationName == "UUI") {
            console.log(msg)
            store.commit('setUserFriendObj', msg.resultList);
        }  else if (message.destinationName == "GGI") {
            console.log(msg)
            store.commit('setChatGroupList', msg.infoList);
        } else if (message.destinationName == "GGM") {
            console.log(msg);
            store.commit('setCurrentGroupUser', msg);
        } else if (message.destinationName == "GAM") { 

        } else if (message.destinationName == "GMI") {
            console.log(msg)
        } else if (message.destinationName == "GD") { 
            client.groupOperation({groupId:msg})
        } else if (message.destinationName == "GTG") {

        } else if (message.destinationName == "GQ") { 
            client.groupOperation(msg)
        } else if (message.destinationName == "GKM") { 

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
    // 发送消息成功后回调
    onMessageDelivered: function(message) {
        console.log("pub message" + message.payloadString);
    },
    // 发送消息
    pubMessage(message,subTopic) {
        if(!subTopic) {
            subTopic='MS'
        }
        var message = new Paho.MQTT.Message(message);
        message.destinationName = subTopic;
        message.qos = 1;
        client.send(message);
    }
};

export default websocketConnect;
