
var curItemId = 1;
var playList = new Array();
var curPlayObj = null;
var srtList = new Array();
var isInitBuffer = false;
$(function(){
	//showBufferTip();
			
	if(_isAli){
		IMPlayer.CheckConnection ();
		IMPlayer.UpdateStatusSignal.connect(OnStateChanged);
		IMPlayer.UpdateSubtitle.connect(OnUpdateSubtitle);
	}
	window.addEventListener("pagehide", pageHide, false);
	
	
	var dataListText = $.getParam("dataList","");
	curItemId = parseInt($.getParam("curId","1"));//当前播放ak
	
	eval('playList = '+ dataListText);
	//如果是蓝光的话，就把文件列表加到playList里
	var playObj = playList[curItemId - 1];
	/*
	if(playObj.name.indexOf(".bdmv")!=-1){
		var path = playObj.path.replace("index.bdmv","STREAM");
		loadFile(path,afterLoadDBFile);
	}else{
		play(playList[curItemId - 1]);	
	}
	*/
	play(playList[curItemId - 1]);	
})

function afterLoadDBFile(path,list){
	list = sortList(list);
	//先添加,后删除
	for(i=0;i<list.length;i++){
		list[i].path = path+"/"+list[i].name;
		playList.splice(curItemId+i,0,list[i]);
		
	}
	playList.splice(curItemId - 1,1);
	
	play(playList[curItemId - 1]);
}

function pageHide(){
	IMPlayer.Stop();
}

function play(obj){ 
	try {	
		if(obj.name.indexOf(".bdmv")!=-1){
			var path = obj.path.replace("index.bdmv","STREAM");
			var maxName =  $.GetMaxFile(path);
			obj.path = path + "/" + maxName;
			//loadFile(path,afterLoadDBFile);
		}
		
		curPlayObj = obj;
		myPlayer.clear();
		myPlayer.disName = obj.name;
		
		showBufferTip();	//显示提示
		
		isInitBuffer = true;
		IMPlayer.Stop();
		IMPlayer.Play(obj.path,4);	
		
	}catch (e) {
        $.log(e);
	}
}


function OnStateChanged(state, percent,speed){ 
	myPlayer.state = state;  
	if ("play" == state) {
		if(isInitBuffer){
			myPlayer.addPlayerSubtitle();
			srtList = new Array();
			var path = curPlayObj.path;
			var lastIndex = path.lastIndexOf('/');
			var folder = path.substring(0,lastIndex);
			var list = $.LoadFile(folder,".srt");
			for(var i = 0;i<list.length;i++){
				var data = list[i];
				if(!data.isFolder){ 
					var nameArr = data.name.split('.'); 
					data.vodName = nameArr[0];
					if( nameArr.length == 2){
						data.srtName = nameArr[0];
					}else{
						data.srtName = nameArr[1];
					}
					data.path = folder+'/'+data.name; 
					srtList.push(data);
				}
			}
			for(var i = 0;i<srtList.length;i++){
				var srt = srtList[i]; $.log(curPlayObj.name.indexOf(srt.vodName+'.'));
				if(curPlayObj.name.indexOf(srt.vodName+'.') == 0){ $.log('123');
					myPlayer.addSubtitle({
						Id:10+i,
						isOut:true,
						path:srt.path,
						Lang:srt.srtName,
					});
				}
			}
			//showGTip('正在播放:'+myPlayer.disName,10,false,30);	//顶部提示
			showVideoTip(myPlayer.disName);
			
			myPlayer.startSubtitle();
			myPlayer.showASTip();
		}
		hideBackground(); 
		isInitBuffer = false;
	}else if("buffer" == state){
		showBufferTip();
	}else if("end" == state){
		curItemId ++;
		if(curItemId > playList.length){
			history.go(-1);
			setTimeout("goIndexPage()",500);	//第一次进入不能返回，要再执行一次
		}else{
			$('#pagewrap').show();	//显示提示信息
			play(playList[curItemId - 1]);
		}
	}else{
		showBufferTip();
	}
}

function goIndexPage(){
	history.go(-1);
}


var hasHideBackground = false;
function hideBackground(){
	//if(!hasHideBackground){
		$('#bufferTip').hide();
		$('#pagewrap').attr("style","background: url();").hide();
		hasHideBackground = true;
	//}
}

function showBufferTip(){
	$('#bufferTip').text(myPlayer.disName+"  "+lang.tip.loading+"......");
	
	$('#bufferTip').show();
}

function OnUpdateSubtitle(text, start, duration){ 
	myPlayer.showSubtitleText(text,duration);
}


function showVideoTip(str){
	$('#bufferTip01 span').text(lang.xiami.playing+"："+str);
	$("#bufferTip01").show();
	setTimeout("hideViedoTip()",10000);
}

function hideViedoTip(){
	$("#bufferTip01").hide();
}