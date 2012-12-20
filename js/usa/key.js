
KEY.KEY_LEFT = function(key,keyName,a){
	var idArr = a.id.split('-');
	var type = idArr[0];
	if(type == 'nav'){
		var prevA=$(a).prev();
		if(prevA.length > 0){prevA.focus()}
		else{$('#listBox a').last().focus()}
	}
}

KEY.KEY_RIGHT = function(key,keyName,a){
	var idArr = a.id.split('-');
	var type = idArr[0];
	if(type == 'nav'){
		var	nextA=$(a).next();
		if(nextA.length > 0){nextA.focus()}
		else{$('#listBox a').first().focus();}
	}
}

KEY.KEY_UP = function(key,keyName,a){
	var idArr = a.id.split('-');
	var type = idArr[0];
	if(type == 'nav'){
		
		$('#selBox').hide();
		$('#hotel_picA').focus();
	}
}

KEY.KEY_DOWN = function (key,keyName,a){
	
	if(a.id == 'hotel_picA'){
		$('#nav-a-' +lastFocusId).focus();
	}
}

KEY.KEY_RETURN = function(){ 
	return false;
}







