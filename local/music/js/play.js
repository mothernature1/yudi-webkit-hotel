var isInitBuffer = false;
var  timer = null;
var curPlayData;
function play(data){
	curPlayData = data;
	
	isInitBuffer = true;
	if(timer){clearInterval(timer);timer = null;}
	
	$('#bufferBox').html(lang.music.initialize);
	changeInfo(data);
	
	try {	
		IMPlayer.Play(data.path,4);
	}catch (e) {
        $.log(e);
	}
	loadLrc(data.path);
}


function OnStateChanged(state, percent,speed){ 
	 $.log("=====================state:"+state);
	myPlayer.state = state;  
	if ("play" == state) {
		if(isInitBuffer){$.log("isInitBuffer:"+isInitBuffer);
			timer = setInterval("changeTime();",1000);
			isInitBuffer = false;
			$('#bufferBox').html('100%');
		}
	}else if("buffer" == state){
		if(percent >=100) percent = 99;
		$('#bufferBox').html(percent+'%');
	}else if("end" == state){
		percent = 100;
		$(".time").html(percent+'%');
		playNext();
		/*
		if(curItemId<playList.length)
		{
			curItemId++;  
		}
		else
		{
			curItemId = 1;
		}
		play(playList[curItemId - 1]);
		*/
	}
}

function changeInfo(data){
	var titleBox = document.getElementById('titleBox');
	titleBox.innerHTML = lang.xiami.playing+'：'+data.name;
	
	
	
	var splitBg = document.getElementById('splitBg');
	splitBg.style.width = 0;
	
}


function changeTime(){
	var cur = JP.getCurTime (); 
	var dur = JP.getDuration(); 
	

	//changeTimeBox(cur,dur);
	//$.log("cur:"+cur);
	//$.log("dur:"+dur);
	changeLyrics(cur*1000);
	
	var m = parseInt(cur/60);
	var s = parseInt(cur%60);
	var t = (m>9?m:'0'+m)+':'+(s>9?s:'0'+s);  $.log(t);
	$.log("t:"+t);
	$(".time").html(t);
	
	var w = cur*boxWidth/dur;
	$.log("w:"+w);
	$('.splitBg').width(w);
}
