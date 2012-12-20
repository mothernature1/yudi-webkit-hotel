var LIVE_URL = config.liveURL;
var loadChannelTime = 0;
var channelImgList ;
function initLoadData(){
	
}


$(function(){ 
	initChannelData();
	var hasInitRfppeer = $.getSession("hasInitRfppeer"); 
	if(hasInitRfppeer){
		return false;
	}
	$.ajax({
		url:config.webUrl+'/channel_resource/server/vodServerList.html',
		dataType:'json',
		success:function(list){ $.log($.toJSON(list));
			if(_isAli){
				var fileId = "00000000000000000000000000000000";
				for(var i = 0;i<list.length;i++){
					var data = list[i];
					IMPlayer.AddRfpPeer(fileId,parseInt(data.peerId),data.ip,parseInt(data.port),data.type,false);
				}
			}
			$.setSession("hasInitRfppeer","true");
		},error:function(){
			
		}
	 });
});
function initChannelData(){
	var str = $.getSession("channel_json");
	if(str){
		return ;
	}
	
	loadChannelTime++;
	if(loadChannelTime>10) return ;
	
	$.ajax({
		url:config.webUrl + LIVE_URL,
		dataType:'html',
		success:function(json){//客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数
			
			$.setSession("channel_json",json);
			eval("var jsonData="+json);
			channelImgList = new Array();
			for(var i = 0;i<jsonData.releaseList.length;i++){				//遍历节目,将节目单加载到gDataList
				var logo = jsonData.releaseList[i].logo;
				if(logo){
					var img = $.getImageUrl(logo);
					channelImgList.push(img);
				}
			}
			if(channelImgList.length>0){
				loadChannelImg();
			}
		},
		error:function(e){
			$.log('error:'+e.toString());
			setTimeout("initChannelData()",100);
		}
	});
}

var channelImgId = 0;

function loadChannelImg(){
	return ;
	channelImgId++; $.log(channelImgId);
	if(channelImgId > channelImgList.length){
		return ;
	}
	var logo = channelImgList[channelImgId - 1];
	
	var img  = new Image();
	img.onload = function () {   
        img.onload = null;   
        loadChannelImg();   
    }   
	img.src = logo; 

}