var typeList = false;
var rowNum = 3;
var curFocusId = false;
var _sn = false;
$(function(){
	if(_isAli){
		$.SetNoProxy();	//取消youtube代理
		IMPlayer.SetNoProxy();
	}
	
	window.addEventListener("pageshow", pageShown, false);
	_sn = $.GetSN();
	$('.sn').html('SN:'+_sn);
	$('.ip').html('IP:'+$.GetIP());
	
	typeList = initData();
	
	var con='',type,j,col,row;
	for(var i = 0;i<typeList.length;i++){
		type = typeList[i];
		j = i + 1;
		row = parseInt(i/rowNum)+1;
		col = i%rowNum + 1;
		con += '<li><img src="'+type.image+'"/><div class="menu-title">'+type.name+'</div><a id="li-a-'+j+'" col="'+col+'" row="'+row+'" href="'+type.url+'"><span class="hover" style="opacity: 0; "></span></a></li>';
	}
	$('.main-menu').html(con);
	
	$('.main-menu a').focus(function(e) {
		curFocusId = this.id;
		showHover(this);
	}).blur(function(e){
		
		stopAnimate(this);
	}).click(function(e){
		var row = parseInt($(this).attr('row'));
		var col = parseInt($(this).attr('col'));
		var id = (row-1)*rowNum + col ;
		var type = typeList[id - 1];
		
		/*
		if(type.tar == 'favorites'){
			return false;
		}
		*/
		stopAnimate(this);
		$(this).find(".hover").stop().fadeTo(0,1);
		clickType(type,id);
		return false;
	});
	$('#li-a-1').focus();
	
	//setTimeout(initWeather,0);
	
});

function pageShown(){  $.log(curFocusId);
	setTimeout(initWeather,0);
	if(curFocusId){
		$('#'+curFocusId).focus();
	}
}


function stopAnimate(obj){
	$(obj).find(".hover").stop().fadeTo(0,0);
}
function showHover(obj){
	$(obj).find(".hover").fadeTo("slow",1,function(){
		hideHover(obj);
	});
}
function hideHover(obj){
	$(obj).find(".hover").fadeTo("slow",0,function(){
		if(obj.id==curFocusId){
			showHover(obj);
		}
	});
}

//单击事件
function clickType(type,tar){
	//type.url = 'play/youku/index.html';
	var aList = new Array();
	
	$.gotoPage(type.url);
}

function initData(){
	var list = new Array();
	
	list.push({name:lang.index.tv,tar:'tv',url:'channel/index.html',image:'images/spain/ico1.png'});
	list.push({name:'Internet TV',tar:'movie',url:'youtube/index.html',image:'images/spain/ico2.png'});
	//list.push({name:'VOD',tar:'drama',url:'movie/index.html?category=1',image:'images/spain/ico3.png'});
	list.push({name:lang.index.weather,tar:'weather',url:'weather/index.html',image:'images/spain/ico4.png'});
	list.push({name:'PVR',tar:'pvr',url:'pvr/index.html',image:'images/spain/ico5.png'});
	//list.push({name:'Favorites',tar:'favorites',url:'favorites/index.html',image:'images/spain/ico6.png'});
	list.push({name:lang.index.file,tar:'files',url:'local/index.html',image:'images/spain/ico7.png'});
	list.push({name:lang.index.setting,tar:'setting',url:'setting/index.html',image:'images/spain/ico8.png'});
	
	return list;
}