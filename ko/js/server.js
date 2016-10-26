function getData(attr,callback){
    //attr.person_id=person_id;
    console.info("send:",JSON.stringify(attr));
    //发送信息 
    apiCallback[attr.obj+"_"+attr.act]=function(data){
        //console.log("获取信息:",data);
        if(callback){
            callback(data);
        }
    }
    apiconn.send_obj(attr);
}


function setCookie(c_name,value,expiredays)
{
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

//取回cookie
function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
	{ 
	c_start=c_start + c_name.length+1 
	c_end=document.cookie.indexOf(";",c_start)
	if (c_end==-1) c_end=document.cookie.length
	return unescape(document.cookie.substring(c_start,c_end))
	} 
  }
return "";
}

var server={
    //登录
    login:function(type,account,code){

        apiCallback["person_login"]=function(data){
            if(data.status=="success"){
                var user_info={
                    "display_name":data.user_info.display_name,
                    "gold":data.user_info.gold,
                    "_id":data.user_info._id,
                    "openid":""
                }
                if(searchObj.openid!=undefined){
                    user_info.openid=searchObj.openid;
                }
                setCookie("ko_userinfo",JSON.stringify(user_info),365);
                //正常进来
                location.href="recharge.html";
            }else{
                alert(data.ustr);
            }
            //这是入口
            console.info("login回调!!",data);
        }
        
        
        if(type==1){
            var attr={
                "ctype": "normal",
                "login_name":account,
                "login_passwd":code,
                "steps":0,
                "login_type": "official",
                "city":"",
                "devicetoken":""
            }
            apiconn.credentialx(attr);
            apiconn.connect();
        }else{
            var attr={
                "ctype": "weixin", //微信第三方登录
                "openid": "",
                "access_token":"",
                "unionid":account,
                "steps":0,
                "login_type": "official",
                "city":"",
                "devicetoken":""
            }
            apiconn.credentialx(attr);
            apiconn.connect();
        }
    },
    order_recharge:function(order_id,buy_num,call){
        //获取进行中的
        var person_id=ko_userinfo._id;
        //获取夺宝列表
        var attr={
            "obj":"order",
            "act":"recharge",
            "person_id":person_id,
            order_id:order_id,
            rmb:buy_num,
            "pay_type":"official"//"wechat"微信，"alipay"支付宝， "apple"苹果支付， "official"官网（微信公众号）支付
        }
        if(isPc){
            attr.qrcode="true";
        }
  
        getData(attr,function(data){
            if(call){
                call(data);
            }
        });
    },
    get_gold:function(call){
        //获取金币
        var person_id=ko_userinfo._id;
        var attr={
            "obj":"person",
            "act":"gold",
            "person_id":person_id
        }
        getData(attr,function(data){
            if(call){
                call(data);
            }
        });
    },
    order_getdetail:function(order_id,call){
        //获取金币
        var person_id=ko_userinfo._id;
        var attr={
            "obj":"order",
            "act":"getdetail",
            "order_id":order_id
        }
        getData(attr,function(data){
            if(call){
                call(data);
            }
        });
    }
}