var boxWidth = 1280;
KEY.KEY_RETURN = function(){
	history.go(-1);
	//$.go(config.project+'/local/index.html','../index.html');
	setTimeout("goIndexPage()",500);	//第一次进入不能返回，要再执行一次
}

function goIndexPage(){
	history.go(-1);
}

KEY.KEY_LEFT = function(){
	if($('#imgList').is(":animated")){
		return ;
	}
	
	curItemId --;
	
	if(curItemId<1){curItemId = dataList.length;}
	$('#imgList div').last().remove();
	
	var prev= curItemId - 1;
	if(prev<1){prev = dataList.length;}
	$('#imgList').css('left',-2*boxWidth);
	
	if(dataList[prev-1].show){
		if(dataList[prev-1].show=="true"){
			$('#imgList').prepend('<div><img  src="'+dataList[prev-1].path+'"/></div>');
		}else{
			$('#imgList').prepend('<div>图片太大，无法显示</div>');
		}
	}else{
		var picRect = FILE.GetPicRect(dataList[prev-1].path);
		if(picRect!=""){
			var picItem = picRect.split(",");
			if(parseInt(picItem[0])>=2000 || parseInt(picItem[1])>=2000){
				dataList[prev-1].show = "false";
				$('#imgList').prepend('<div>图片太大，无法显示</div>');
			}else{
				dataList[prev-1].show = "true";
				$('#imgList').prepend('<div><img  src="'+dataList[prev-1].path+'"/></div>');
			}
		}else{
			dataList[prev-1].show = "true";
			$('#imgList').prepend('<div><img  src="'+dataList[prev-1].path+'"/></div>');
		}
	}
	//$.log("--------------------------------");
	$.log($('#imgList').html());
	$('#imgList').animate({left:-boxWidth});
}

KEY.KEY_RIGHT = function(){
	if($('#imgList').is(":animated")){
		return ;
	}
	
	curItemId ++;
	
	if(curItemId>dataList.length){curItemId = 1;}
	$('#imgList div').first().remove();
	
	var next= curItemId + 1;
	if(next>dataList.length){next = 1;}
	$('#imgList').css('left',0);
	
	if(dataList[next-1].show){
		if(dataList[next-1].show=="true"){
			$('#imgList').append('<div><img  src="'+dataList[next-1].path+'"/></div>');
		}else{
			$('#imgList').append('<div>图片太大，无法显示</div>');
		}
	}else{
		var picRect = FILE.GetPicRect(dataList[next-1].path);
		if(picRect!=""){
			var picItem = picRect.split(",");
			if(parseInt(picItem[0])>=2000 || parseInt(picItem[1])>=2000){
				dataList[next-1].show = "false";
				$('#imgList').append('<div>图片太大，无法显示</div>'); ///tmp/mnt/usb/DISK_b/pic/1308462340445.jpg
			}else{
				dataList[next-1].show = "true";
				$('#imgList').append('<div><img  src="'+dataList[next-1].path+'"/></div>');
			}
		}else{
			dataList[next-1].show = "true";
			$('#imgList').append('<div><img  src="'+dataList[next-1].path+'"/></div>');
		}
	}

	//$.log("==============================");
	$.log($('#imgList').html());
	$('#imgList').animate({left:-boxWidth});
}