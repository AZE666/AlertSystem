
function ObjApi()
{
   //查看企业的事件
				
    this.event = function(request_json,callback){
        $.ajax(dataapi_link+'/obj/event',{
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

   //监控企业的时间列表
				
    this.eventlist = function(request_json,callback){
        $.ajax(dataapi_link+'/obj/eventlist',{
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

   //监控单位的列表
				
    this.list = function(request_json,callback){
        $.ajax(dataapi_link+'/obj/list',{
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

   //对企业进行排序
				
    this.rank = function(request_json,callback){
        $.ajax(dataapi_link+'/obj/rank',{
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