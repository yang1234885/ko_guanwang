
var util={
    init:function(startCall){
        startApiconn();
        // 【初始化和登录 D】 
        apiconn.wsUri = "ws://114.55.100.131:51717/stark";
        apiCallback["server_info"]=function(){
           //这是入口
            console.info("start!!");
            if(startCall){
                startCall();
            }
            //获奖有红点
        }
        apiconn.connect();
    }
}