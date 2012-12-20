var curData;

$(function(){
	if(_isAli){
		IMPlayer.CheckConnection ();
		IMPlayer.UpdateStatusSignal.connect(OnStateChanged);
	}
	window.addEventListener("pagehide", pageHide, false);
	
	eval("curData = "+$.getSession("dataObj"));		//获取电影信息
	play(curData);
});

function pageHide(){
	IMPlayer.Stop();
}