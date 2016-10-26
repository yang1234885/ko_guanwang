

var isPc=false;
$(function() {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
		console.log("你的手机版地址");
        isPc=false;
}
	else {
        isPc=true;
		console.log("你的电脑版地址");
}
    
    setCookie("ko_userinfo", "", -1);
	$(".btn-menu").click(function(){
		$(this).toggleClass('btn-active');
		$(this).siblings('ul').toggle();
	});
    util.init(function(){
        if(searchObj.unionid!=undefined){
            server.login(2,searchObj.unionid);
        }
    });
});
    
//账号登录
 function logins(){
     var tel=$("#tel").val()+"";
     var pwd=$("#pwd").val()+"";
     if(tel=="" || pwd==""){
         if(tel==""){
             alert("请输入手机号码");
         }else if(pwd==""){
             alert("请输入密码");
         }
         return;
     }
     if(tel.length!=11 || !tel.match(/[0-9]{11}/)){
         alert("手机号码栏为11位纯数字");
         return;
     }
     if(pwd.length<6){
         alert("密码栏至少6位");
         return;
     }
     server.login(1,tel,pwd);
     console.log(tel,pwd);
 }
//微信登录
function wxLogin(){
    if(isPc){
        //网页扫码授权
    location.href="https://open.weixin.qq.com/connect/qrconnect?appid=wxc7bac852b1bc15be&redirect_uri=http://kowebpay.cnstark.com/cgi-bin/kopay_dev.pl&response_type=code&scope=snsapi_login&state=qrcode#wechat_redirect";
    }else{
        //提示授权
    location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa82466adea8eff10&redirect_uri=http://kowebpay.cnstark.com/cgi-bin/kopay.pl&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
    }
    
}