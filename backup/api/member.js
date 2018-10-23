
function MemberApi()
{
   //发送登录验证码
				
    this.sendloginverifycode = function(request_json,callback){
        $.ajax(dataapi_link+'/member/sendloginverifycode',{
					//提交数据的类型 POST GET
					type:'POST',
					async:true,
					data:request_json,
					beforeSend:apiconfig_beforeSend, //发送请求
					complete:apiconfig_complete,//请求完成
					crossDomain:true,
					datatype: 'json',//xml, html, script, json, jsonp, text
					xhrFields: {  withCredentials: true  },
					//成功返回之后调用的函数             
					success:callback
				 });
    };

   //验证码登录
				
    this.verifycodelogin = function(request_json,callback){
        $.ajax(dataapi_link+'/member/verifycodelogin',{
					//提交数据的类型 POST GET
					type:'POST',
					async:true,
					data:request_json,
					beforeSend:apiconfig_beforeSend, //发送请求
					complete:apiconfig_complete,//请求完成
					crossDomain:true,
					datatype: 'json',//xml, html, script, json, jsonp, text
					xhrFields: {  withCredentials: true  },
					//成功返回之后调用的函数             
					success:callback
				 });
    };


}