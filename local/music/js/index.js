var obj = null;
var curItemId = 1;
var playList = new Array();
var boxWidth = 706;
var textList = false;

var FOLDER_JPG = 'folder.jpg';
var cover_JPG = 'cover.jpg';
var albumart_JPG = 'albumart.jpg';

var Folder_JPG = 'Folder.jpg';
var Cover_JPG = 'Cover.jpg';
var Albumart_JPG = 'Albumart.jpg';

var parser = new ParserLyrics();		//定义解析器
var num = 0;
$(function(){
	if(_isAli){
		IMPlayer.CheckConnection ();
		IMPlayer.UpdateStatusSignal.connect(OnStateChanged);
	}
	
	window.addEventListener("pagehide", pageHide, false);
	
	var v = JP.getVolume();
	$('.volume').html(v);
	$('#nav').html(lang.local.mymusic);
	
	textList = new TextList({
		id:'songList',
		disNum:10,
		splitHeight:310,
		clickClass:'_textListClickItem',
		formatHtml:function(data,id){
			var con = ''
			var con =  '<div class="num">'+id+'</div><div class="title"><a href="#" id="'+this.target+'-a-'+id+'">'+data.name+'</a></div>';	
			return con;
		},
		onclick:function(data,id){
			curItemId = id;
			//play(data);
			doPlay();
		},
		moveLeft:function(){
			myPlayer.run('left');
		},
		moveRight:function(){
			myPlayer.run('right');
		}
	});
		
	
	var dataListText = $.getParam("dataList","");
	curItemId = parseInt($.getParam("curId","1"));//当前播放ak
	$.log("music list" + dataListText);
	eval('playList = '+ dataListText);
	$.log("当前第几个：" + curItemId);

	textList.setDataList(playList,true	);

	doPlay();
});

function pageHide(){
	IMPlayer.Stop();
}

function pageHide(){
	IMPlayer.Stop();
}


function playNext(){		//下一首
	if(curItemId<playList.length){
		curItemId++
	}else{
		curItemId = 1;
	}
	doPlay();
}

function playPrev(){
	if(curItemId>1){
		curItemId--;  
	}else{
		curItemId = playList.length;
	}
	doPlay();
}

function doPlay(){
	var data = playList[curItemId - 1];
	
	
	var lastIndex = data.path.lastIndexOf('/');
	var folder = data.path.substring(0,lastIndex);  
	
	var isExist = $.IsFileExist(folder+'/'+FOLDER_JPG);  
	var imgPath = "";
	if(isExist){ 
		imgPath = folder+'/'+FOLDER_JPG;
		$('#logoBox').html('<img style="width:160px;" src="'+folder+'/'+FOLDER_JPG+'"/>'); 
	}else if($.IsFileExist(folder+'/'+cover_JPG)){
		imgPath = folder+'/'+cover_JPG;
		$('#logoBox').html('<img style="width:160px;" src="'+folder+'/'+cover_JPG+'"/>');
	}else if($.IsFileExist(folder+'/'+albumart_JPG)){
		imgPath = folder+'/'+albumart_JPG;
		$('#logoBox').html('<img style="width:160px;" src="'+folder+'/'+albumart_JPG+'"/>');
	}else if($.IsFileExist(folder+'/'+Folder_JPG)){
		imgPath = folder+'/'+Folder_JPG;
		$('#logoBox').html('<img style="width:160px;" src="'+folder+'/'+Folder_JPG+'"/>');
	}else if($.IsFileExist(folder+'/'+Cover_JPG)){
		imgPath = folder+'/'+Cover_JPG;
		$('#logoBox').html('<img style="width:160px;" src="'+folder+'/'+Cover_JPG+'"/>');
	}else if($.IsFileExist(folder+'/'+Albumart_JPG)){
		imgPath = folder+'/'+Albumart_JPG;
		$('#logoBox').html('<img style="width:160px;" src="'+folder+'/'+Albumart_JPG+'"/>');
	}else{ 
		imgPath = "images/music.png";
		$('#logoBox').html('<img style="width:160px;" src="images/music.png"/>');
	}
	
	//$.log("============================imgPath:"+imgPath);
	var concise = '<img src="'+imgPath+'">'
	concise +='<h1>&nbsp;</h1>'
	concise +='<p>'+curItemId+'.'+data.name+'</p>';
		
	$('.concise-list').html(concise);


	play(data);
	
	if(textList.curItemId != curItemId && textList.curItemId != textList.focusItemId){
		var oldA = $('#'+textList.target+'-a-'+textList.curItemId);
		oldA.parent().parent().removeClass(textList.clickClass).addClass(textList.normalClass);
	}
	textList.curItemId = curItemId; $.log(textList.curItemId);$.log(textList.focusItemId);
	if(textList.curItemId != textList.focusItemId){
		var a = $('#'+textList.target+'-a-'+textList.curItemId);
		a.parent().parent().removeClass(textList.normalClass).addClass(textList.clickClass);
	}
}

function loadLrc(lrcFile){
	var lastIndex = lrcFile.lastIndexOf('.');
	var folder = lrcFile.substring(0,lastIndex);
	var url = "";
	if($.IsFileExist(folder + ".lrc")){
		url = folder + ".lrc";
	}else{
		url = folder + ".LRC";
	}
	//var url = lrcFile;
	parser.clear();			//清除解析析内容数据，在切换歌词的时候要使用
	$("#p1").html("");
	$("#p2").html("");
	var text = FILE.ReadFile(url);
	
	parser.parse(text);
}

function changeLyrics(time){
	
	
	
	
	var map = parser.change(time);	//根据时间获取当前正在播放歌词,属性：id:第几行，cur:当前歌词，next:下一句 ,
	if(map){
		$.log(map.id);
		if(map.id%2 == 1){
			$('.geci-left').html(map.cur).addClass('geci-cur');
			if(map.next){
				$('.geci-right').html(map.next).removeClass('geci-cur');
			}else{
				$('.geci-right').html('&nbsp;').removeClass('geci-cur');
			}
		}else{
			$('.geci-right').html(map.cur).addClass('geci-cur');
			if(map.next){
				$('.geci-left').html(map.next).removeClass('geci-cur');
			}else{
				$('.geci-left').html('&nbsp;').removeClass('geci-cur');
			}
		}
	}
	
	num++;
}
