var textList = false;
var usbRootDir="/tmp/mnt/usb";
var fileInfoList = new Array();
var navList;
var curType = '';
var curRegion='';


$(function(){
	
navList = new NavList({
		id:'navBox',
		onclick:function(type,id){ 
				$('#nav').html('Folder');
				curType = '';
				loadFile(usbRootDir,afterLoadFile);
		},
		moveRight:function(){ textList.setFocus();},
	});
	
textList = new TextList({
		id:'fileList',
		disNum:9,
		splitHeight:477,
		moveLeft:function(){navList.setFocus();},
		formatHtml:function(data,id){
			var con = '';
			if(data.isFolder==true){con += '<div class="_textListNum"><img src="images/localfile_icon01.png"/></div>';}
			else if(isMp3File(data.name)){con += '<div class="_textListNum"><img src="images/music.png"/></div>';}
			else if(isVideoFile(data.name)){con += '<div class="_textListNum"><img src="images/v.png"/></div>';}
			else if(isPicFile(data.name)){con += '<div class="_textListNum"><img src="images/pic.png"/></div>';}
			con += '<div class="name"><a href="#" id="'+this.target+'-a-'+id+'">'+data.name+'</a></div>';	
			return con;	
		},
		onfocus:function(data,id){
			$.log("文件:"+$.toJSON(data));
			var con = '';
			if(data.isFolder==true){con += '<div class="logo2"><img src="images/folder.png"/></div>';}
			else if(isMp3File(data.name)){con += '<div class="logo2"><img src="images/music.png"/></div>';}
			else if(isVideoFile(data.name)){con += '<div class="logo2"><img src="images/video.png"/></div>';}
			else if(isPicFile(data.name)){con += '<div class="logo2"><img src="images/pic.png"/></div>';}
			else if(isAppFile(data.name)){con += '<div class="logo2"><img src="images/app.png"/></div>';}
			con += ' <div class="split">&nbsp;</div>';
			con += '<div class="title">'+data.name+'</div>';
			$('#infoBox').html(con);
		},
		onclick:onclickItem,
		
	});



	dorefresh();
	$('#listBox').show();
	
	curType = '';
	loadFile(usbRootDir,afterLoadFile);
	var list = initNav();
	navList.setDataList(list,true);
	$('#nav').html('Folder');
	navList.click(1);
});


function afterLoadFile(path,list){
	$('#nav').html(path.replace("/tmp/mnt/usb",""));
	$('#nav').attr("path",path);
	if(!list){		//如果返回的false,说明U盘没有插入
		showTipBox();
	}
	fileInfoList.push({path:path});
	$.log(textList.setDataList)
	textList.setDataList(list);
	if(list.length > 0){
		textList.setFocus();
	}else{
	}
}

function showMedia(tar){
	curType = tar;
	
	var bo = $.IsScanningUsb();
	if(bo){
		//正在检索
		var list = new Array();
	}else{
		//已检索
		var  list = $.LoadTypeFile(tar);
		
		if(list.length == 0){
			showGTip(lang.local.noFile,3);
		}
	}
	 
	list = sortList(list);
	//处理蓝光－－－－－－－－－－－－
	formateBD(list);
	
	$('#mediaBox').hide();
	$('#listBox').show();
	//$.log("=========================================list:"+$.toJSON(list));
	textList.setDataList(list,true);
	
	if(tar=="video"){
		$('#nav').html(lang.local.media_video);
		}
	else if(tar=="audio") {
		$('#nav').html(lang.local.media_music);	
		}
	else if(tar=="picture") {
		$('#nav').html(lang.local.media_picture);	
		}	
	$("#scanDiv").show();
	if(bo){
		
		if(!scanningTimer){
			scanningRefresh(tar);
		}
		
	}
	
}



function scanningRefresh(tar){
	var bo = $.IsScanningUsb();
	$.log("==================bo:"+bo);
	if(bo){
		showGTip(lang.local.retrievingFile,10);
		scanningTimer = setTimeout("scanningRefresh('"+tar+"')",10000);
	}else{
		clearTimeout(scanningTimer);
		scanningTimer = null;
		
		showMedia(tar);
	}
}


//刷新
function dorefresh(){

	
	hideGPointLoading();
	var bo = $.IsUsbInsert();
	
	$.log("=============bo:"+bo+":date:"+new Date()+refreshTimer);
	
	if(!bo){
		refreshTimer = setTimeout("dorefresh()",10000);
		
	}else{
		$.ScanUsb();
		clearTimeout(refreshTimer);
		refreshTimer = null;
	}
	
}


function onclickItem(data,i){
		if(curType == 'video'){
			var dataList = this.dataList;
			$.setParam("dataList",$.toJSON(dataList));
			$.setParam("curId",i);
			$.gotoPage('./video/index.html');
			return false;
		}else if(curType == 'audio'){
			var dataList = this.dataList;
			$.setParam("dataList",$.toJSON(dataList));
			$.setParam("curId",i);
			$.gotoPage('./music/index.html');
			return false;
		}else if(curType == 'picture' ){
			var dataList = this.dataList;
			$.setParam("dataList",$.toJSON(dataList));
			$.setParam("curId",i);
			$.gotoPage('./pic/index.html');
			return false;
		}
	var path = $("#nav").attr("path")+"/";
	var fileInfo = fileInfoList[fileInfoList.length - 1];
	var type = textList.getType();
	fileInfo.type = type;
	
	
	if(data.isFolder==true)
	{
		var folder = fileInfo.path +'/'+data.name;
		loadFile(folder,afterLoadFile);
	}
	else if(isMp3File(data.name))
	{
		var dataList = new Array();
		for(var i=0;i<textList.dataList.length;i++)
		{
			$.log(textList.dataList[i].name);
			
			if(isMp3File(textList.dataList[i].name))
			{
				
				dataList.push({
					name:textList.dataList[i].name,
					path:path + textList.dataList[i].playName
					});
			}
		}
		
		dataList = sortList(dataList);
		
		for(var i=0;i<dataList.length;i++)
		{
			if(data.name==dataList[i].name)
			{
				$.setParam("curId",i+1);
		
			}
		}
		

		$.log("music list:" + $.toJSON(dataList));
		$.setParam("dataList",$.toJSON(dataList));
		
		$.gotoPage('./music/index.html');
	}
	else if(isVideoFile(data.name))
	{
		var dataList = new Array();
		for(var i=0;i<textList.dataList.length;i++)
		{
			$.log(textList.dataList[i].name);
			
			if(isVideoFile(textList.dataList[i].name))
			{
				
				dataList.push({
					name:textList.dataList[i].name,
					path:path + textList.dataList[i].playName
					});
			}
		}
		for(var i=0;i<dataList.length;i++)
		{
			if(data.name==dataList[i].name)
			{
				$.setParam("curId",i+1);
			}
		}
		$.log("video list:" + $.toJSON(dataList));
		$.setParam("dataList",$.toJSON(dataList));
		$.gotoPage('./video/index.html');
	}
	else if(isPicFile(data.name))
	{	
		var dataList = new Array();
		for(var i=0;i<textList.dataList.length;i++)
		{
			
			if(isPicFile(textList.dataList[i].name))
			{
				
				dataList.push({
					name:textList.dataList[i].name,
					path:path + textList.dataList[i].playName
					});
			}
		}
		for(var i=0;i<dataList.length;i++)
		{
			if(data.name==dataList[i].name)
			{
				$.setParam("curId",i+1);
			}
		}
		
		
		$.log("pic list:" + $.toJSON(dataList));
		$.setParam("dataList",$.toJSON(dataList));
		$.gotoPage('./pic/index.html');
	}
	
	
}



//处理蓝光
function formateBD(dataList){
	for(i=0;i<dataList.length;i++){
		if(dataList[i].name=="index.bdmv"){
			var videoPath = dataList[i].path;
			videoPath = videoPath.replace("/BDMV/index.bdmv","");
			var lastIndex = videoPath.lastIndexOf("/");
			videoPath = videoPath.substring(lastIndex+1) + ".bdmv";
			dataList[i].name = videoPath;
			//$.log("-----------------------------name:"+videoPath);
		}
	}
}


function showTipBox(){
	$('#justForA').focus();
	$('#listBox').hide();
	$('#tipBox').show();
	$.log("提示提示")
	fileInfoList = new Array();
}