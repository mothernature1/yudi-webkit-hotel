var _curTypeId;
var _curItemId;

var disNum = 10;
var splitHeight = 540;		//	分割条的高度
var itemHeight = 54;		// 每一条节目的高度

var hasInitChannelBox = false;
var hideProgramWinTimer = null;

var FullEPGMap = null;
function showChannelBox(typeId,itemId){ 
	if(_isAli){
		var listStr = IMPlayer.GetProgramList(); 
		FullEPGMap = new Object();
		if(listStr){
			eval("var elist = " + listStr); $.log(elist.length);
			for(var i = 0;i<elist.length;i++){
				var e = elist[i];
				FullEPGMap[e.Program] = e.EPGInfo;
			}
		}
	}
	
	_curTypeId = typeId;
	_curItemId = itemId;
	
	if(!hasInitChannelBox){
		initChannelBox();
		hasInitChannelBox = true;
	}
	var type = typeList[_curTypeId-1];
	type.curItemId = _curItemId;
	findCurPos(type);
	
	hideEpgBoxAuto();			//隐藏EPg
	
	var mChannelBox = document.getElementById('mChannelBox');
	$('#mChannelBox').show();
	
	initContent(type);
	
	
	if(config.hideProgramAuto){
		var date = new Date();
		KEY.PRESSTIME = date.getTime();		//
		if(hideProgramWinTimer) {clearInterval(hideProgramWinTimer);hideProgramWinTimer = null;}
		hideProgramWinTimer = setInterval( "hideProgramWinAuto()",3*1000);	
	}
}

function hideProgramWinAuto(){
	var date = new Date();
	var curTime = date.getTime();	
	if((curTime - KEY.PRESSTIME) > 5000){
		hideChannelBox();
		if(hideProgramWinTimer) {clearInterval(hideProgramWinTimer);hideProgramWinTimer = null;}
	}
}

function hideChannelBox(){
	KEY.CURTYPE = '';
	$('#justForPage').focus();
	
	if(hideProgramWinTimer) {clearInterval(hideProgramWinTimer);hideProgramWinTimer = null;}
	
	var mChannelBox = document.getElementById('mChannelBox');
	mChannelBox.style.display = 'none';
	
	$('#channelEPGBox').hide();
}

function initContent(type){
	var typeName = document.getElementById('cboxTitle');
	typeName.innerHTML = type.name;
	
	var dataList = type.dataList;
	var channelList = document.getElementById('channelList');
	
	if(dataList.length == 0){
		hideSplit(type);
		channelList.innerHTML = '<a id="item-a-1" href="#" tar="0">&nbsp;</a>';
		return ;
	}
	
	
	var start = type.topItemId;
	var end = start + disNum + 2;
	var length = dataList.length;
	
	var con = '';
	var j,data;
	for(var i = start;i<end;i++){
		j = i;
		
		if(j<1 || j>length){
			con+='<div class="_item0">';
			con+='&nbsp;';
		}else{
			con+='<div class="_item">';
			data = dataList[j-1];
			con+=formatItemHtml(data,j);
		}
		con+='</div>';
	}
	channelList.innerHTML = con;
	showSplit(type);

	
	$('#channelList a').focus(function(e){
		focusItem(this);
	}).blur(function(e){
		blurItem(this)
	}).click(function(e){
		clickItem(this);
		return false;
	});
	
	$('#item-a-'+type.curItemId).focus();
}

//事件
function blurItem(a){
	var par = a.parentNode.parentNode;
	par.className='_item';
}


function focusItem(a){
	KEY.CURTYPE = 'channelBox';
	
	var tar = parseInt(a.getAttribute('tar'));
	var type = typeList[_curTypeId - 1];
	if(type.showSplit){
		moveItem(type,tar);
	}else{
		type.curItemId = tar;
	}
	
	var par = a.parentNode.parentNode;
	par.className='_curItem';
	
	var data = type.dataList[tar - 1];
	

}

//事件
function clickItem(a){
	
	var tar = parseInt(a.getAttribute('tar'));
	if(tar > 0){
		onclickChannel(_curTypeId,tar);
		hideChannelBox();
	}
}

function onclickChannel(typeId,itemId){
	curTypeId = typeId; 
	curItemId = itemId;
	if(curItemId > 0){
		var type = typeList[curTypeId - 1];
		var data = type.dataList[curItemId - 1];
		play(data);
	}else{
		
	}
}

function getDisNumberKey(data){return '';
	var dis = data.displayId;
	var a = parseInt(dis/100);
	dis = dis%100;
	var b = parseInt(dis/10);
	var c = dis%10;
	
	return a+''+b+''+c;
}

function formatItemHtml(data,j){
	var con = '';
	
	var img = $.getImageUrl(data.image,'../images/tv_default.png');
	
	con += '<div class="_icon"><img src="'+img+'"/></div>';
	con += '<div class="_num">'+data.id+'</div>';
	con+='<div class="_name"><a href="#" tar="'+j+'" id="item-a-'+j+'">'+data.name+'</a></div>';
	if(data.isPay){	//如果要付费
		con += '<div class="_iconListPay">&nbsp;</div>';
	}
	return con;
}

function findCurPos(type){
	
	var length = type.dataList.length; 
	if(type.showSplit){
		if(type.topItemId >=_curItemId){
			type.topItemId = _curItemId - 1;
		}else if( type.topItemId + disNum + 1 <= _curItemId){
			type.topItemId = _curItemId - disNum;
		}
		
	}else{
		type.curItemId = _curItemId;
		type.topItemId = 0;
	}
}

function initChannelBox(){
	var type,length;
	var typeNum = typeList.length;		
	for(var i = 0;i<typeNum;i++){
		type = typeList[i];
		length = type.dataList.length;
		if(length > disNum){
			type.showSplit = true;
			type.splitAddValue = (splitHeight - 50)/(length  -disNum);
		}else{
			type.showSplit = false;
		}
		type.curItemId = 1;
		type.topItemId = 0;
	}
}

function hideSplit(type){
	var splitBox = document.getElementById('splitBox');
	splitBox.style.display ='none';	
	return false;
}

function showSplit(type){
	var splitBox = document.getElementById('splitBox');
	var splitBar = document.getElementById('splitBar');
	if(type.showSplit){
		splitBox.style.display ='block';
		//splitBar.style.height =type.splitBarHeight+'px';
		changeSplit(type);
		return true;
	}else{
		splitBox.style.display ='none';	
		return false;
	}
}

function changeSplit(type){
	if (type.showSplit) {
		var topItemId = type.topItemId;
		var max = type.dataList.length - disNum;
		if(topItemId>max){
			topItemId = max;
		}			
		var top = topItemId * type.splitAddValue;
		var splitBar = document.getElementById('splitBar');
		splitBar.style.top = top+'px';
	}
}


/**
 * @author 2008
 */

function moveItem(type,tar){
	if (tar != type.curItemId) {
		var listBox = document.getElementById('channelList');
		var childNodes = listBox.childNodes;
		var dataList = type.dataList;
		var totalNum = dataList.length;
		if (tar > type.curItemId) { //向下
			type.curItemId = tar;
			
			var bo = 0;
			if(tar - type.topItemId == disNum && tar != totalNum){		//当焦点不是在最上面的时候
				bo = 1;
			}else if(tar == type.topItemId + disNum + 1){			//当焦点是第一个时
				bo = 2;
			}
			
			if (bo>0) { //
				
				if( childNodes.length  >= disNum + 2){
					listBox.removeChild(childNodes[0]);		//删除第一个节点
				}
				
				var dis = 2;
				if(bo==2){dis =1;};
				
				
				
				
				var nId = tar+dis;
				var div = document.createElement('div');
				
				
				if(nId>totalNum){
					div.setAttribute('class','_item0');
					div.innerHTML = '&nbsp;';
					listBox.appendChild(div);
				}else{
					div.setAttribute('class','_item');
					var data = dataList[nId - 1];
					div.innerHTML = formatItemHtml(data,nId,data.displayId);
					listBox.appendChild(div);
					
					var a = document.getElementById('item-a-'+nId);
					$(a).focus(function(e){
						focusItem(this);
					}).blur(function(e){
						blurItem(this)
					}).click(function(e){
						clickItem(this);
					});
				}
				type.topItemId++;
				changeSplit(type);
			}
		}else{
			type.curItemId = tar;
			var bo = 0;
			if(tar - type.topItemId == 1 && tar!= 1){		//当焦点不是在最上面的时候
				bo = 1;
			}else if(tar == type.topItemId){			//当焦点是第一个时
				bo = 2;
			}
			
			if(bo>0){	
				if( childNodes.length  >= disNum + 2){
					listBox.removeChild(childNodes[childNodes.length - 1]);		//删除最后一个节点
				}
				
				var dis = 2;
				if(bo==2){dis =1;};
				
				var pId = tar-dis;
				var div = document.createElement('div');
				
				
				if(pId<1){
					div.setAttribute('class','_item0');
					div.innerHTML = '&nbsp;';
					listBox.insertBefore(div,childNodes[0]);
				}else{
					div.setAttribute('class','_item');
					var data = dataList[pId - 1];
					div.innerHTML = formatItemHtml(data,pId);
					listBox.insertBefore(div,childNodes[0]);
					
					var a = document.getElementById('item-a-'+pId);
					$(a).focus(function(e){
						focusItem(this);
					}).blur(function(e){
						blurItem(this)
					}).click(function(e){
						clickItem(this);
					});
				}
				
				
				type.topItemId--;
				changeSplit(type);
			}
		}
	}else{
		changeSplit(type);
	}
}


//上一页
function showPrevPage(type){
	var dataList = type.dataList;
	if(type.topItemId > 0){
		var a = document.getElementById('justForPage');
		a.focus();
		
		var prevPage = type.topItemId - disNum;
		var oldCurItemId = type.curItemId;
		if(prevPage < 0 ){
			prevPage = 0;
		}
		
		type.topItemId = prevPage;
		if(prevPage+disNum >= oldCurItemId){
			type.curItemId = oldCurItemId;
		}else{
			type.curItemId = prevPage+disNum;
		}
		initContent(type);
		var na = document.getElementById('item-a-'+type.curItemId);
		na.focus();
	}else{
		//showGTip(lang.tv.firstPage,3000);
	}
}

//下一页
function showNextPage(type){
	var dataList = type.dataList;
	var nextPage = type.topItemId + disNum;
	if(nextPage <dataList.length){
		var a = document.getElementById('justForPage');
		a.focus();
		
		type.topItemId = nextPage;
		type.curItemId = nextPage + 1;
		initContent(type);
		
		var na = document.getElementById('item-a-'+(nextPage+1));
		na.focus();
	}else{
		//showGTip(lang.tv.lastPage,3000);
	}
}


KEY.TYPE['channelBox'] = keyRecvBox;

function keyRecvBox(key,keyName,a){
	if(keyName == 'KEY_DOWN'){
		var tar = parseInt($(a).attr('tar'));
		tar ++;
		var type = typeList[_curTypeId - 1];
		var len = type.dataList.length;
		if(tar <= len){
			$('#item-a-'+tar).focus();
		}
	}else if(keyName == 'KEY_UP'){
		var tar = parseInt($(a).attr('tar'));
		tar --;
		if(tar > 0 ){
			$('#item-a-'+tar).focus();
		}
	}else if(keyName == 'KEY_LEFT'){
		
		_curTypeId --;
		if(_curTypeId < 1){
			_curTypeId = typeList.length;
		}
		var type = typeList[_curTypeId - 1];
		initContent(type);
		
		return false;
	}else if(keyName == 'KEY_RIGHT'){
		
		_curTypeId ++;
		if(_curTypeId > typeList.length){
			_curTypeId = 1;
		}
		var type = typeList[_curTypeId - 1];
		initContent(type);
	
		return false;
	}else if(keyName == 'PAGE_UP'){		//上一页
		var type = typeList[_curTypeId - 1];
		showPrevPage(type);
		return false;
	}else if(keyName == 'PAGE_DOWN'){		//下一页
		var type = typeList[_curTypeId - 1];
		showNextPage(type);
		return false;
	
	}else if(keyName == 'KEY_RETURN'){
		hideChannelBox();
		return false;
	}
	
	return ;
	
	
	
	if(key == 0x11){		//返回
		hideChannelBox();
		return false;
	}else if(key == 0xD){		//向右
		return ;
		
		
		_curTypeId ++;
		if(_curTypeId > typeList.length){
			_curTypeId = 1;
		}
		var type = typeList[_curTypeId - 1];
		initContent(type);
		//$('#channelList').css('opacity',1);
		return false;
	}else if(key == 0xC){		//向左
	
		_curTypeId --;
		if(_curTypeId < 1){
			_curTypeId = typeList.length;
		}
		var type = typeList[_curTypeId - 1];
		initContent(type);
		return false;
	}else if(keyName == 'PAGE_UP'){		//上一页
		var type = typeList[_curTypeId - 1];
		showPrevPage(type);
		return false;
	}else if(keyName == 'PAGE_DONW'){		//下一页
		var type = typeList[_curTypeId - 1];
		showNextPage(type);
		return false;
	}
	return true;
}