KEY.KEY_RETURN = function(){ 
	history.go(-1);
	setTimeout("goIndexPage()",500);	//第一次进入不能返回，要再执行一次
}

KEY.KEY_OK = function (){
	myPlayer.run('ok');
	return ;
}


KEY.KEY_LEFT = function (){
	$.log("音量-");
	myPlayer.run('left');

}

KEY.KEY_RIGHT = function (){
	$.log("音量+");
	myPlayer.run('right');

}

KEY.KEY_VOL_P = KEY.KEY_LEFT;

KEY.KEY_VOL_A = KEY.KEY_RIGHT;

KEY.KEY_MUTE = function(){
	myPlayer.run('mute');
}


KEY.KEY_FAST_PLAY = function(){ //快进0x29
	myPlayer.run('seek');
	$('#seekBoxTip').hide();
}

KEY.KEY_SLOW_PLAY = function(){ //慢进0x27
	myPlayer.run('seek');
	$('#seekBoxTip').hide();
	
}

KEY.KEY_PLAY_STOP = function(){ //暂停
	myPlayer.run('pause');
}
KEY.KEY_VCR = function(){ //停止
	KEY.KEY_RETURN ();

}


KEY.KEY_STOP = function(){ //停止
	KEY.KEY_RETURN ();
}


KEY.KEY_UP  = function(){ //快进0x29
		if(curItemId<playList.length)
		{
			curItemId++;  
		}
		else
		{
			curItemId = 1;
		}
		play(playList[curItemId - 1]);

	
}

KEY.KEY_DOWN = function(){ //慢进0x27
		if(curItemId>1)
		{
			curItemId--;  
		}
		else
		{
			curItemId = playList.length;
		}
		play(playList[curItemId - 1]);
	
}


KEY.KEY_BTN_RED = function(key,keyName,a){ 
	
	myPlayer.run('audio');
}

KEY.KEY_BTN_GREEN =function(key,keyName,a){ 
	
	myPlayer.run('subtitle');
}




