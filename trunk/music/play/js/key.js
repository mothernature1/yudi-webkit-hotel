//设置
KEY.KEY_RETURN = function(){
	history.go(-1);
}




KEY.KEY_FAST_PLAY = function(){ //快进0x29
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

KEY.KEY_SLOW_PLAY = function(){ //慢进0x27
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

KEY.KEY_UP = KEY.KEY_FAST_PLAY;
KEY.KEY_DOWN = KEY.KEY_SLOW_PLAY;




KEY.KEY_PLAY_STOP = function(){ //暂停
	$.log(myPlayer.state);
	if(myPlayer.state  == 'pause'){
		$('#playBox').removeClass('pause').addClass('play');
		IMPlayer.Resume();
	}else if(myPlayer.state  == 'play'){
		$('#playBox').removeClass('play').addClass('pause');
		IMPlayer.Pause();
	}
}
KEY.KEY_STOP = function(){ //停止
	IMPlayer.Stop();
	$('#splitBg').width(0);
	$('#timeBox').html('00:00');
	return false;
}


KEY.KEY_VOL_A = function(){

	myPlayer.run('right');
}
KEY.KEY_VOL_P = function(){

	myPlayer.run('left');
}

KEY.KEY_LEFT = function(){
	myPlayer.run('left');
}
KEY.KEY_RIGHT = function(){
	myPlayer.run('right');
}

KEY.KEY_MUTE = function(){
	myPlayer.run('mute');
}