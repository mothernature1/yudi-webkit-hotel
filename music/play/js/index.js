var obj = null;
var curItemId = 1;
var playList = new Array();
var boxWidth = 451;

$(function(){
	if(_isAli){
		IMPlayer.CheckConnection ();
		IMPlayer.UpdateStatusSignal.connect(OnStateChanged);
	}
	window.addEventListener("pagehide", pageHide, false);
	
	var v = JP.getVolume(); 
	$('#volumeBox').html(v);


	var dataListText = $.getSession("dataList","");
	var curItemId = parseInt($.getSession("curId","1"));//当前播放ak
	//$.log("music list" + dataListText);
	eval('playList = '+ dataListText);

		

	$.log("当前第几个：" + curItemId);
	play(playList[curItemId - 1]);
	$.log($.toJSON(playList))
});

function pageHide(){
	IMPlayer.Stop();
}

