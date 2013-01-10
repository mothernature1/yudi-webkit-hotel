var curPlayData = null;			//记录当前播放的dat
var epgTimer = null;

function play(data){
	if(data == curPlayData ){			//如果是当前正在播放的
		return ;
	}
	curPlayData = data;
	showEpgBox(data);
	
	var playUrl = data.url;
	
	if(playUrl.indexOf('igmp') >-1){
		playUrl ='udp'+playUrl.substring(4);
	}$.log(playUrl);
	try {	
		IMPlayer.Play(playUrl,data.mode);
	}catch (e) {
        $.log(e);
	}
}

function OnStateChanged(state, percent,speed){
	myPlayer.state = state;  
	if ("play" == state) {
		hideEpgBox();
		hideBackground();
	}else if("buffer" == state){
		
	}
}


var hasHideBackground = false;
function hideBackground(){
	if(!hasHideBackground){
		$('#pagewrap').attr("style","background: url();");
		hasHideBackground = true;
	}
}


function showEpgBox(data){ 
	if(epgTimer){clearTimeout(epgTimer);epgTimer = null;}
	if(epgTimer){clearTimeout(epgTimer);epgTimer = null;}
	var img = $.getImageUrl(data.image,'../images/tv_default.png');
	var iconBox = document.getElementById('iconBox');
	iconBox.innerHTML = '<img src="'+img+'"/>';
	
	var epgBoxMidTitle = document.getElementById('epgBoxMidTitle');
	epgBoxMidTitle.innerHTML = '.&nbsp;'+data.name;
	
	var epgBox = document.getElementById('epgBox');
	epgBox.style.display = 'block';
	hideEpgBox()
}


function hideEpgBox(){
	epgTimer = setTimeout("hideEpgBoxAuto()",3000);
}

function hideEpgBoxAuto(){
	
	var epgBox = document.getElementById('epgBox');
	epgBox.style.display = 'none';
	
}