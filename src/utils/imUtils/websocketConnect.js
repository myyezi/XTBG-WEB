let client;
let timer;
let objData;
const reconnectTimeout = 2000;
const subTopic = "MS";

const IMTopic = {
    SendMessageTopic: "MS",
    RecallMessageTopic: "MR"
};

const websocketConnect = {
    connect: function(data) {
        objData = data;
        client = new Paho.MQTT.Client(
            data.ip,
            Number(data.port),
            "/mqtt",
            data.token
        );
        client.onConnectionLost = this.onConnectionLost;
        client.onMessageArrived = this.onMessageArrived;
        client.onMessageDelivered = this.onMessageDelivered;
        client.pubMessage = this.pubMessage;
        console.log(data);
        client.connect({
            userName: data.username,
            password: data.token,
            onSuccess: this.onConnect,
            onFailure: function(message) {
                timer = setTimeout(() => {
                    this.connect(objData);
                }, reconnectTimeout);
            }
        });
        return client;
    },
    // 返回链接成功没
    onConnect: function() {
        if (timer) {
            clearTimeout(timer);
        }
        Object.keys(IMTopic).map(v => {
            console.log("subscribeTopic:", IMTopic[v]);
            client.subscribe(IMTopic[v], { qos: 1 });
        });
        console.log("connect success.");
    },
    //连接丢失
    onConnectionLost: function(responseObject) {
        if (responseObject.errorCode !== 0) {
            this.connect(objData);
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
    },
    // 接受消息
    onMessageArrived: function(message) {
        let msg = JSON.parse(message.payloadString);
        console.log(message.destinationName, msg);
        // $(".recMessage").append(txt);
    },
    // 发送消息成功后回调
    onMessageDelivered: function(message) {
        console.log("pub message" + message.payloadString);
        // alert("pub message success,message: " + message.payloadString);
    },
    // 发送消息
    pubMessage(message) {
        var message = new Paho.MQTT.Message(message);
        message.destinationName = subTopic;
        message.qos = 1;
        client.send(message);
    }
};

export default websocketConnect;
