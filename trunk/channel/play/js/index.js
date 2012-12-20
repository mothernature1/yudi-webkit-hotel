var curTypeId;
var curItemId;

$(function(){ 
	if(_isAli){
		IMPlayer.CheckConnection ();
		IMPlayer.UpdateStatusSignal.connect(OnStateChanged);
	}
	window.addEventListener("pageshow", pageShown, false);
	window.addEventListener("pagehide", pageHide, false);
	$('#justForPage').focus(function(){
		KEY.CURTYPE = false;
	}).click(function(){
		return false;
	});
});

function pageShown(){  
	curPlayData = false;
	
	initData();
	var typeId=$.getSession('typeId');
	var itemId=$.getSession('itemId');
	curTypeId = parseInt(typeId,10); 
	curItemId = parseInt(itemId,10);
		
	var type = typeList[curTypeId - 1]; 
	data = type.dataList[curItemId - 1];  
	
	play(data);
}

function pageHide(){
	IMPlayer.Stop();
}