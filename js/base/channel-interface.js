var LIVE_URL = config.liveURL;
var lockDB = new DB({name:'channel_lock',});		//加锁db
var db = new DB({name:'channel_fav',});
var EPG_URL = '/channel_resource/live/program.html';

function initChannelData(callback){ 
	var str = $.getSession("channel_json");  
	if(str){
		eval("var jsonData="+str);
		var bo = initParseData(jsonData);
		if(callback)callback();
	}else{
		refreshPage(callback);
	}
	return ;
	
}

function refreshPage(callback){  
	$.ClearPageInMemory ();				//清除页面缓存
	$.ajax({
		url:config.webUrl + LIVE_URL,
		dataType:'html',
		success:function(json){//客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数

			$.setSession("channel_json",json);   
			eval("var jsonData="+json);
			var bo = initParseData(jsonData); 
			if(callback)callback(bo);
		},
		error:function(e){
			$.log('error:'+e.toString());
		
		}
	});
}



var refreshEpgTimer = null;
var refreshEpgTime = 60*1000;
var refreshEpgIntervalTime = 10*60*1000;
var refreshEpgStartTime = 0;
var EPGMap = new Object();
function refreshEpg(){
	refreshEpgInterface();
	refreshEpgTimer = setInterval("refreshEpgInterface()",refreshEpgTime);
}

function refreshEpgInterface(){
	$.ajax({
		url:config.webUrl + EPG_URL,
		dataType:"html",
		timeout: 5000,
		success:function(str){//客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数
			EPGMap = null;
			EPGMap = new Object();
			eval("var json="+str);
			var list = json.releaseList;
			var data;
			for(var i = 0;i<list.length;i++){
				data = list[i];
				EPGMap['p_'+data.id] = data.propMap.program; 
			}
			$.setSession("epgMap",$.toJSON(EPGMap));
		},
		error:function(e){
			$.log('error:::::'+e.state);
		}
	});
}

var refreshChannelTimer = null;
var refreshChannelTime = 5 * 60 * 1000;
var CHANNELMap = new Object();
function refreshChannel(){
	if(refreshChannelTimer){clearInterval(refreshChannelTimer);}
	refreshChannelTimer = setInterval("refreshChannelTimeInterface()",refreshChannelTime);
}
function refreshChannelTimeInterface(){
	$.ajax({
		url:config.webUrl + LIVE_URL,
		dataType:'html',
		success:function(json){//客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数
			$.setSession("channel_json",json);   
			eval("var jsonData="+json);
			CHANNELMap = refreshChannelData(jsonData); 
		},
		error:function(e){
			
		}
	});
}


function refreshDataInfo(data){
	var newData = CHANNELMap[data.id];
	if(newData){
		data.fileId = newData.fileId;
		data.peerId = newData.peerId;
		data.ip = newData.ip;
		data.port = newData.port;
	}
}

