var refreshTimer = null;
var scanningTimer;

KEY.KEY_BTN_RED = function (){ 

	//重新检索文件
	var bo = $.IsUsbInsert();
	if(bo && scanningTimer==null && curType!=""){
		textList.setFocus();
		$.ScanUsb();
		showMedia(curType);
	}
}

KEY.KEY_RETURN = function(){ $.log(12346798);
	//var type = navList.getData();
	//if(!type){$.goIndex();}
		if(fileInfoList.length>1){
			fileInfoList.pop();
			var fileInfo = fileInfoList[fileInfoList.length -1]; 
			textList.setType(fileInfo.type,true); $.log(fileInfo.path);
			$('#nav').html(fileInfo.path.replace("/tmp/mnt/usb",""));
			$('#nav').attr("path",fileInfo.path);
		}else{		
			$.goIndex();
		}
}
KEY.KEY_DOWN = function(key,keyName,a){

}

KEY.KEY_UP = function(key,keyName,a){

}

KEY.KEY_LEFT = function(key,keyName,a){

}


KEY.TYPE['tipBox'] = function(key,keyName,a){

	return ;
}