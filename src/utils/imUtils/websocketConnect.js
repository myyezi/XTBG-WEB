let client;
let timer;
let objData;
const reconnectTimeout = 2000
const subTopic = 'message'
const websocketConnect = {
    connect:function(data) {
        objData = data
        client = new Paho.MQTT.Client(data.ip, Number(data.port),"/mqtt", data.token);
        client.onConnectionLost = this.onConnectionLost;
        client.onMessageArrived = this.onMessageArrived;
        client.onMessageDelivered = this.onMessageDelivered;
        client.pubMessage = this.pubMessage
        client.connect({
            onSuccess:this.onConnect,
            onFailure: function(message) {
                timer = setTimeout(() => {
                    this.connect(objData)
                }, reconnectTimeout);
            }
        });
        return client
    },
    // 返回链接成功没
    onConnect:function() {
        if(timer) {
            clearTimeout(timer);
        }
        client.subscribe(subTopic);
        console.log("connect success.");
    },
    //连接丢失
    onConnectionLost:function(responseObject) {
        if (responseObject.errorCode !== 0) {
            this.connect(objData)
            console.log("onConnectionLost:"+responseObject.errorMessage);
        }
    },
    // 接受消息
    onMessageArrived:function(message){
        let mes = JSON.parse(message.payloadString).message
        // $(".recMessage").append(txt);
    },
    // 发送消息成功后回调
    onMessageDelivered:function(message){
        console.log("pub message" + message.payloadString)
        // alert("pub message success,message: " + message.payloadString);
    },
    // 发送消息
    pubMessage(message){
        var message = new Paho.MQTT.Message(message);
        message.destinationName = subTopic;
        client.send(message);
    }
}

export default websocketConnect;
