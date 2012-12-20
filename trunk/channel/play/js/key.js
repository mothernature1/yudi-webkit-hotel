KEY.KEY_RETURN = function(){
	history.go(-1);
}



KEY.KEY_OK = function(){ 
	showChannelBox(curTypeId,curItemId);
	return false;
}


KEY.KEY_UP = function(){
	changeChannelByKey("up");
}
KEY.KEY_DOWN = function(){
	changeChannelByKey("down");
}


KEY.KEY_CH_P=function(){
	changeChannelByKey('down');
}
KEY.KEY_CH_A=function(){
	changeChannelByKey('up');
}

function changeChannelByKey(tar){
	
	var type = typeList[curTypeId - 1];
	var dataList = type.dataList;
	if(tar == 'up'){
		curItemId --;
		if(curItemId<1){
			curItemId = dataList.length;
		}
	}else{
		curItemId ++;
		if(curItemId > dataList.length){
			curItemId = 1;
		}
	}
	var data = dataList[curItemId - 1];
	
	play(data);
}


KEY.KEY_LEFT = function (){
	myPlayer.run('left');
	return false;
}

KEY.KEY_RIGHT = function (){
	myPlayer.run('right'); 
	return false;
}

KEY.KEY_VOL_P = function(){ 
	KEY.KEY_LEFT();
}

KEY.KEY_VOL_A = function(){ 
	KEY.KEY_RIGHT();
}

KEY.KEY_MUTE = function(){
	myPlayer.run('mute');
}


KEY.KEY_REFRESH = function(key,keyName,a){
	myPlayer.run('ok');
	
}

