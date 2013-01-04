
function play(data){
	var playUrl = data.playUrl;
	
	try {	
		IMPlayer.Play(playUrl,data.mode);
	}catch (e) {
        $.log(e);
	}
}

function OnStateChanged(state, percent,speed){
	myPlayer.state = state;  
	if ("play" == state) {
		hideBackground();
	}else if("buffer" == state){
		
	}else if("end" == state){
		history.go(-1);
	}
}

var hasHideBackground = false;
function hideBackground(){
	if(!hasHideBackground){
		$('#pagewrap').attr("style","background: url();");
		hasHideBackground = true;
	}
}