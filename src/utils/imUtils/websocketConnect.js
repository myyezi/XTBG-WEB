import store from '@/store'
let client;
let objData;

const IMTopic = {
    SendMessageTopic: "MS",//发送消息
    NotifyMessageTopic:'MN',//接收通知
    RecallMessageTopic: "MR",//
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
        client = new Paho.MQTT.Client(data.ip,Number(data.port),"/mqtt",data.token);
        client.onConnectionLost = this.onConnectionLost;
        client.onMessageArrived = this.onMessageArrived;
        client.onMessageDelivered = this.onMessageDelivered;
        client.pubMessage = this.pubMessage;
        client.connect({
            userName: data.username,
            password: data.token,
            onSuccess: this.onConnect,
            onFailure: function(message) {
                client.connect(objData);
            }
        });
        return client;
    },
    // 返回链接成功没
    onConnect: function() {
        Object.keys(IMTopic).map(v => {
            console.log("subscribeTopic:", IMTopic[v]);
            client.subscribe(IMTopic[v], { qos: 1 });
        });
        
        let obj1 = JSON.stringify({
            id: localStorage.getItem('head_last_message')?localStorage.getItem('head_last_message'):'0',
            type: localStorage.getItem('type_last_message')?localStorage.getItem('type_last_message'):0
        });
        client.pubMessage(obj1,"MP")

        let obj = JSON.stringify({
            requestList: [{
                target:objData.username,
                type:2,
                updateTime:0
            }]
        });
        client.pubMessage(obj,"GGI")
        console.log("connect success.");
    },
    //连接丢失
    onConnectionLost: function(responseObject) {
        if (responseObject.errorCode !== 0) {
            client.connect(objData);
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
    },
    // 接受消息
    onMessageArrived: function(message) {
        let msg = JSON.parse(message.payloadString);
        console.log(message.destinationName)
        if (message.destinationName == "MN") {
            console.log(msg)
            let obj = JSON.stringify({
                id: msg.head+'',
                type: msg.type
            });
            client.pubMessage(obj,"MP")
            localStorage.setItem('head_last_message',msg.head+'')
            localStorage.setItem('type_last_message',msg.type)
        } else if (message.destinationName == "MP") {
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
                    } else {

                    }
                    store.commit('addMessage', item);
                    store.commit('addSession', item);
                }) 
            }
        } else if (message.destinationName == "GC") {
            // this.$message({
            //     message: '创建成功',
            //     type: 'success'
            // });
        } else if (message.destinationName == "GGI") {
            console.log(msg)
            store.commit('setChatGroupList', msg.infoList);
        } else if (message.destinationName == "GGM") {
            store.commit('setChatGroupListMap', msg);
            console.log(msg);
        } else if (message.destinationName == "GAM") { 
        } else if (message.destinationName == "GMI") {
            console.log(msg)
        } else if (message.destinationName == "GD") { 
        } else if (message.destinationName == "GTG") {
            
        } else if (message.destinationName == "GQ") { 
            console.log(msg)
        } else if (message.destinationName == "GKM") { 
        }
        // $(".recMessage").append(txt);
    },
    // 发送消息成功后回调
    onMessageDelivered: function(message) {
        console.log("pub message" + message.payloadString);
        // alert("pub message success,message: " + message.payloadString);
    },
    // 发送消息
    pubMessage(message,subTopic) {
        if(!subTopic) {
            subTopic='MS'
        }
        var message = new Paho.MQTT.Message(message);
        message.destinationName = subTopic;
        message.qos = 1;
        console.log(message)
        client.send(message);
    }
};

export default websocketConnect;
