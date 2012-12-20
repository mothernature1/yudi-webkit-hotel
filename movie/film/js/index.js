var CATEGORY = 2;
var curData = null;
var DEFAULT_IMG = '../images/default_m.png';
var mIconList;
var gObj;
var favDB = false;
var recentDB = false;
var isRecentWatch = false;
var watchDB = false;

$(function(){
	
	$("#watchA").html(lang.movie.watch)
	$('#nav').html($.getSession('nav'));
	var json = $.getSession("dataObj"); 
	eval("curData = "+json);
	
	$('#watchA').click(function(e) {
        onclickIcon(false,1);
		isRecentWatch = false;
		return false;
    });
	initContent()
	$('#watchA').focus();
	

})




function initContent(){
	$.log($.toJSON(curData))
	$('.content .top').html(curData.name);
	

	var img = $.getImageUrl(curData.image,DEFAULT_IMG);
	$('.content .icon').html('<img src="'+img+'"/>');
	
	var con = '';
	
	con += '<div>'+lang.movie.area+':'+curData.region+'</div><div>'+lang.movie.director+':'+curData.director+'</div>';

	con += '<div class="split">&nbsp;</div>';
	
	con += '<div>'+lang.movie.actor+':</div>';
	con += '<div >'+curData.actors+':</div>';
	con += '<div class="split">&nbsp;</div>';
	
	con += '<div>'+lang.movie.quote+':</div>';
	con += '<div class="des"  id="desInfoBox">'+curData.introduction+'</div>';
	con += '<div class="split">&nbsp;</div>';
	
	$('.content .info').html(con);
}

function afterLoadDataInfo(obj){
	if(!obj){return ;}
	$('#desInfoBox').html(obj.description.substring(0,90));
}

function onclickIcon(data,tar){

	$.setSession('playObj',$.toJSON(gObj)); 	
	$.gotoPage('../play/index.html');
}



