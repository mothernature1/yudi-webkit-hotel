//设置
var curRegion='';

KEY.KEY_RETURN = function(){
		history.go(-1);
}

function goIndexPage(){
	history.go(-1);
}


KEY.KEY_FAST_PLAY = playNext;

KEY.KEY_SLOW_PLAY = playPrev;

KEY.KEY_UP = playNext;
KEY.KEY_DOWN = playPrev;



KEY.KEY_PLAY_STOP = function(){ //暂停
	$.log("myPlayer.state:===:"+myPlayer.state);
	if(myPlayer.state  == 'pause'){
		IMPlayer.Resume();
		$('.pause').removeClass('pause').addClass('start');
	}else if(myPlayer.state  == 'play'){
		IMPlayer.Pause();
		$('.start').removeClass('start').addClass('pause');
	}else if(myPlayer.state  == 'stop'){
		//IMPlayer.Play(curPlayData.path,4);
		play(curPlayData);
		$('.pause').removeClass('pause').addClass('start');
	}
}
KEY.KEY_STOP = function(){ //停止
	IMPlayer.Stop();
	$('.splitBg').width(0);
	$('.time').html('00:00');
	//$('#timeBox').html('00:00');
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