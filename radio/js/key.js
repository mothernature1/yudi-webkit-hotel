KEY.KEY_RETURN = function(){

	$.goIndex();	

}


KEY.KEY_VOL_A = function(){
	myPlayer.run('right');
}
KEY.KEY_VOL_P = function(){
	myPlayer.run('left');
}


//静音
KEY.KEY_MUTE = function(){
	myPlayer.run('mute');
}


KEY.KEY_STOP = function(){ //停止
	IMPlayer.Stop();
	return false;
}


KEY.KEY_PLAY_STOP = function(){ //暂停
	if(myPlayer.state  == 'play'){
		IMPlayer.Stop();
		$('.play').removeClass('play').addClass('pause');
	}else if(myPlayer.state  == 'stop'){
		IMPlayer.Play(curPlayData.path,curPlayData.mode);
		$('.pause').removeClass('pause').addClass('play');
	}
}