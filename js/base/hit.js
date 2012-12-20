var INDEX_DATA_URL = '/channel_resource/gen/indexData.html';
var DEFAULE_IMAGE = 'images/tv_default.png';
function initHitBox(){
	indexBox = new LatticeBox({
		id:'hotBox',
		defaultImg:DEFAULE_IMAGE,
		moveDown:function(){ 
			$('#nav-a-' +lastFocusId).focus();
		},
		onclick:function(data,tar){
			 if(!planId ){
				showGTip(lang.tip.expiredTip,5);
				return false;
			}
			if(tar == 'movie'){		//如果是电影
				$.setSession('nav',lang.movie.index);
				$.setSession('dataObj',$.toJSON(data));
				$.gotoPage('movie/film/index.html?category='+1);
			}else if(tar == 'drama'){
				$.setSession('nav',lang.movie.index);
				$.setSession('dataObj',$.toJSON(data));
				$.gotoPage('movie/film/index.html?category='+2);
			}else if(tar == 'tv'){
				
				$.setSession('id',data.id);
				$.removeSession("itemId");
				$.log($.toJSON(data));
				$.gotoPage('channel/play/index.html');
			}
		}
	});
	var indexData = $.getSession("indexData"); 
	if(indexData && indexData!=''){
		doParseIndexData(indexData);
	}else{
		ajaxLoadIndexData(doParseIndexData);
	}
}

var ajaxLoadIndexTimes = 0;
function ajaxLoadIndexData(callback){
	$.ajax({
		url:config.webUrl + INDEX_DATA_URL,
		dataType:'html',
		success:function(text){//客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数
			
			$.setSession("indexData",text);
			doParseIndexData(text);
		},
		error:function(e){
			ajaxLoadIndexTimes ++ ; $.log(ajaxLoadIndexTimes);
			if(ajaxLoadIndexTimes > 10){
				doParseIndexData(false); 
			}else{
				ajaxLoadIndexData(doParseIndexData);
			}
		}
	});
}

function doParseIndexData(text){
	if(!text) return ;
	
	try{
			eval("var indexObj = "+text);
	}catch (e){
		return ;
	}
	var list = new Array();
	
	var movieList = new Array();	//电影
	var dramaList = new Array();	//连续剧
	var tvList = new Array();
	
	var hotMovieList = indexObj.hotMovieList;
	if(hotMovieList && hotMovieList.length>0){
		for(var i =0;i<hotMovieList.length;i++){
			if(i>2) break;
			movieList.push(parseMovieToJSON(hotMovieList[i]));
		}
		list.push({
			cls:'img1',
			tar:'movie',
			list:movieList,
		})
		
	}
	var hotDramaList = indexObj.hotDramaList;
	if(hotDramaList && hotDramaList.length>0){
		for(var i =0;i<hotDramaList.length;i++){
			if(i>2) break;
			dramaList.push(parseMovieToJSON(hotDramaList[i]));
		}
		list.push({
			cls:'img1',
			tar:'drama',
			list:dramaList,
		})
	}
	var hotChannelList = indexObj.hotChannelList;
	if(hotChannelList && hotChannelList.length){
		for(var i =0;i<hotChannelList.length;i++){
			if(i>2) break;
			tvList.push(parseTvToJSON(hotChannelList[i]));
		}
		list.push({
			cls:'img2',
			tar:'tv',
			list:tvList,
		})
	}
	
	indexBox.setDataList(list);
	
}


function parseMovieToJSON(program){
	var data = {};
	data.actors = program.actors;
	data.director = program.director;
	data.image = program.logoHighlight; 
	data.region = program.region;
	data.name = program.name;
	data.id = program.id;
	return data;
}

function parseTvToJSON(program){
	var data = {};
	data.image = program.logo;
	data.name = program.name;
	data.id = program.id;
	return data;
}