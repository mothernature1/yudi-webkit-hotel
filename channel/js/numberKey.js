var hasInitNumberBox = false;
var gNumberValue = '';
var gNumberList ;
var numberTextList;
var lastNumberKeyA;
var disNumber = 8;
var numAddValue = 0;
var numSplitHeight = 432;
var numTopId = 0;
var numFocusId = 1;
var numItemHeight = 54;
var gDataList;
function pressKey(num){ 
	if(!hasInitNumberBox){
		initNumberBox();
		gDataList = chList.ch;
	}
	lastNumberKeyA = document.activeElement;
	
	gNumberValue = ''+num;
	$('#numberBox').show();
	changeNumberValue();
	$('#gBody').hide();
	
	var date = new Date();
	KEY.PRESSTIME = date.getTime();		//
	if(this.hideNumberKeyTimer) {clearInterval(this.hideNumberKeyTimer);this.hideNumberKeyTimer = null;}
	this.hideNumberKeyTimer = setInterval( "hideNumberKeyAuto()",1*1000);	
}

function initNumberBox(){
	$('#numberKeyA').focus(function(e) {
        KEY.CURTYPE = 'numberKey';
    }).click(function(e) {
		if(gNumberList.length >0){
			onclickNumberItem(gNumberList[0]);
		}
        return false;
    });
}

function hideNumberKeyAuto(){
	var date = new Date();
	var curTime = date.getTime();	
	if((curTime - KEY.PRESSTIME) >= 5000){
		if(this.hideNumberKeyTimer) {clearInterval(this.hideNumberKeyTimer);this.hideNumberKeyTimer = null;}
		hideNumberKeyBox();
		if(gNumberList.length == 1){
			onclickNumberItem(gNumberList[0]);
		}
	}
}

 
function hideNumberKeyBox(){
	KEY.CURTYPE= false;
	$('#gBody').show(); 
	if(lastNumberKeyA){
		lastNumberKeyA.focus();
	}
	$('#numberBox').hide();
	
	if(this.hideNumberKeyTimer) {clearInterval(this.hideNumberKeyTimer);this.hideNumberKeyTimer = null;}
}

function delNumberValue(){
	if(gNumberValue.length > 0){
		gNumberValue = gNumberValue.substring(0,gNumberValue.length - 1);
		changeNumberValue();
	}
}

function addNumberValue(key){
	gNumberValue+=''+key;
	changeNumberValue();
}

function changeNumberValue(){
	$('#numberKeyA').focus();

	gNumberList = findNumberList(); 
	
	if(gNumberList.length == 1){
		hideNumberKeyBox();
		onclickNumberItem(gNumberList[0],1);
		return false;
	}
	
	
	numTopId = 0;
	numFocusId = 1;
	var con = '',data,j;
	for(var i = 0;i<gNumberList.length;i++){
		j = i + 1;
		data = gNumberList[i];
		con += '<a href="#" id="num-a-'+j+'"><span class="num">'+getSearchNumberKey(data)+'</span><span class="text">'+data.name+'</span></a>';
	}
	$('#numList').css('top','0').html(con);
	
	if(gNumberList.length > 0){
		data = gNumberList[0];
		$('#numberKeyA').html('<span class="num">'+gNumberValue+'</span><span class="text">'+data.name+'</span>');
	}else{
		$('#numberKeyA').html('<span class="num">'+gNumberValue+'</span><span class="text"></span>');
	}
	
	$('#numList a').focus(function(e) {
		KEY.CURTYPE = 'numberKey';
		var idArr = this.id.split('-');
		var tar = parseInt(idArr[2]); 
        if(tar == numFocusId){
			changeNumSplit();
		}else if(tar >  numFocusId){		//向下
			if(tar - numTopId == disNumber  && tar != gNumberList.length ){	
				numTopId++;
				$('#numList').css('top',0-numTopId*numItemHeight);
				changeNumSplit();
			}
		}else if(tar < numFocusId){
			if(tar ==  numTopId+  1 && numTopId>0){
				numTopId --;
				$('#numList').css('top',0-numTopId*numItemHeight);
				changeNumSplit();
			}
		}
		numFocusId = tar;
		
    }).click(function(e) {
        var idArr = this.id.split('-');
		var tar = parseInt(idArr[2]);
		onclickNumberItem(gNumberList[tar - 1]);
		return false;
    });
	showNumSplitBox();
	return ;
	
}

function showNumSplitBox(){
	if(gNumberList.length > disNumber){
		$('#numSplitBar').parent().show();
		$('#numSplitBar').css('top',0);
		numAddValue = (numSplitHeight-56)/(gNumberList.length - disNumber)
	}else {
		$('#numSplitBar').parent().hide();
	}
}

function changeNumSplit(){
	if(gNumberList.length > disNumber){
		var top = numAddValue*numTopId;
		$('#numSplitBar').css('top',top);
	}
}

function findNumberList(){ $.log("gNumberValue:"+gDataList.length);
	var list = new Array();
	
	if(gNumberValue){
		for(var i = 0;i<gDataList.length;i++){
			var data = gDataList[i];
			var dis = getSearchNumberKey(data);  $.log(dis+';');
			if(dis.indexOf(gNumberValue) >= 0){
				list.push(data);
			}
			if(list.length >= 10){
				break;
			}
		}
	}
	list.sort(descByNumber );
	return list;
}

function getSearchNumberKey(data){
	var dis = data.id;
	var a = parseInt(dis/100);
	dis = dis%100;
	var b = parseInt(dis/10);
	var c = dis%10;
	
	return a+''+b+''+c;
}

KEY.TYPE['numberKey'] = function(key,keyName,a){
	var id = a.id;
	var idArray = id.split('-');
	var tar = parseInt(idArray[2]); 
	if(keyName == 'KEY_RETURN'){
		hideNumberKeyBox();
		return false;
	}else if(keyName == 'KEY_UP'){		//left
		if(idArray[0] == 'num'){		//如果是在列表项
			tar --;
			if(tar > 0){
				$('#num-a-'+tar).focus();
			}else{
				$('#numberKeyA').focus();
			}
		}
		return false;
	}else if(keyName == 'KEY_DOWN'){	 $.log("keyName:"+id);
		if(idArray[0] == 'num'){		//如果是在列表项
			tar ++;
			$('#num-a-'+tar).focus();
		}else if(id == 'numberKeyA'){
			$('#num-a-'+1).focus();
		}
	}else if(keyName == 'KEY_LEFT' || keyName == 'PAGE_UP'){
		delNumberValue();
	}else if(key>=48 && key<= 57){
		addNumberValue(key - 48);
	}
	return true;	
}

function onclickNumberItem(data,tar){
	hideNumberKeyBox();
	gotoPlayPage(data,data.typeArrayId,data.arrayId);
}