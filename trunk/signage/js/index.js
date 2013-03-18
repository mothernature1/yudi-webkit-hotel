var channelData = {};	//首页直播
var startx=45;
var starty=35;
var xlength=720;
var ylength=576;

$(function(){ 
	
	if(_isAli){
		IMPlayer.CheckConnection ();
		IMPlayer.UpdateStatusSignal.connect(OnStateChanged);
	}
	
	var con='',j;
	
	for(var i=0;i<3;i++){
		var img = "images/right"+(i+1)+".jpg";
		j = i+1;
		con+='<a href="#" id="lattice-a-'+j+'"><img class="img1" src="'+img+'"></a>'
		$('#hotBox').html(con);
	}
	
	channelData = {id:1,typeId:1,name:'CH 1',url:'rtmp://108.163.144.15/vod/media/mp4:hd2/fareha/fareha_22.mp4',image:'images/transtv.png',mode:4};
	play(channelData);

	window.addEventListener("pagehide", pagehide, false);
});

function pagehide(){
	IMPlayer.Stop();
	FB.SetTop(0);
	FB.SetVideoWin(0,0,1280,720);
}