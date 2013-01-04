var isInitBuffer = false;
var  timer = null;
function play(data){
	isInitBuffer = true;
	if(timer){clearInterval(timer);timer = null;}
	
	$('#bufferBox').html("<p>"+lang.music.initialize+"</p>");
	changeInfo(data);
	
	try {	
		IMPlayer.Play(data.path,4);
	}catch (e) {
        $.log(e);
	}
}


function OnStateChanged(state, percent,speed){ 
	 $.log("state:"+state);
	myPlayer.state = state;  
	if ("play" == state) {
		if(isInitBuffer){$.log("isInitBuffer:"+isInitBuffer);
			timer = setInterval("changeTime();",1000);
			isInitBuffer = false;
			$('#bufferBox').html('<p>100%</p>');
		}
	}else if("buffer" == state){
		if(percent >=100) percent = 99;
		$('#bufferBox').html("<p>"+percent+'%</p>');
	}else if("end" == state){
		
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
}

function changeInfo(data){
	var titleBox = document.getElementById('titleBox');
	titleBox.innerHTML = data.name;
	
	
	
	var splitBg = document.getElementById('splitBg');
	splitBg.style.width = 0;
	
}


function changeTime(){
	var cur = JP.getCurTime (); 
	var dur = JP.getDuration(); 
	

	//changeTimeBox(cur,dur);
	var timeBox = document.getElementById('timeBox');
	
	var m = parseInt(dur/60);
	var s = parseInt(dur%60);
	var t = (m>9?m:'0'+m)+':'+(s>9?s:'0'+s);  $.log(t);
	timeBox.innerHTML = t;
	
	var w = cur*boxWidth/dur;
	$('#splitBg').width(w);
}
