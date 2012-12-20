KEY.KEY_RETURN = function(){ 
	
	history.go(-1);
}

KEY.KEY_OK = function (){
	myPlayer.run('ok');
	return ;
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


KEY.KEY_FAST_PLAY = function(){ //快进0x29
	
	myPlayer.run('seek');
	
}

KEY.KEY_SLOW_PLAY = function(){ //慢进0x27
	
	myPlayer.run('seek');
	
}

KEY.KEY_PLAY_STOP = function(){ //暂停
	myPlayer.run('pause');
}
KEY.KEY_VCR = function(){ //停止
	returnFun();
	return false;
}




