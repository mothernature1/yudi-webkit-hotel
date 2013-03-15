
function play(data){

	var playUrl = data.url;
	
	if(playUrl.indexOf('igmp') >-1){
		playUrl ='udp'+playUrl.substring(4);
	}$.log(playUrl);
	try {	
		FB.SetTop(1);
		FB.SetVideoWin(startx, starty, xlength, ylength);
		IMPlayer.Play(playUrl,data.mode);
	}catch (e) {
        $.log(e);
	}
}

function OnStateChanged(state, percent,speed){
	myPlayer.state = state;  
	if ("play" == state) {
		$("#daoshiID").html(channelData.name + " "+lang.live.playing);
	}else if("buffer" == state){
		if(percent>100){percent = 100;}
		$("#daoshiID").html(channelData.name + " "+lang.live.buffering+" "+percent+"%");
	}
}



KEY.KEY_VOL_P = function(){ 
	myPlayer.run('left');
}

KEY.KEY_VOL_A = function(){ 
	myPlayer.run('right');
}

KEY.KEY_MUTE = function(){
	myPlayer.run('mute');
}

KEY.KEY_RETURN = function(){
	history.go(-1);
}