
function StataApi()
{
   //综合数据显示
				
    this.dashboard = function(request_json,callback){
        $.getJSON(dataapi_link+'/stata/dashboard',function(data){
			if(callback!=undefined){
				callback(data);
			}
		});
    };


}