KEY.KEY_RETURN = function(){
	if(infoList.length>1){
		infoList.pop();
		var info = infoList[infoList.length -1]; 
		textList.setType(info.type,true); 
		$('#nav').html(info.path);
	}else{
		//取消代理
		if(config.client && config.client=='spain'){
			$.SetNoProxy();	//youtube代理
		}
		$.goIndex();
	}
}