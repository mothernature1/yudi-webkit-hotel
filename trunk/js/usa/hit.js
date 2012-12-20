var INDEX_DATA_URL = '/channel_resource/gen/indexDataW.html';
function initHitBox(){
	indexBox = new IndexBox({
		id:'hotBox',
		moveDown:function(){ 
			$('#nav-a-' +lastFocusId).focus();
		},
		onclick:function(data,tar){
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

function ajaxLoadIndexData(callback){
	$.ajax({
		url:config.webUrl + INDEX_DATA_URL,
		type:'GET',
		dataType:"jsonp",
        jsonp:"callback",
		jsonpCallback:"jsonpCallBack",
		timeout: 5000,
		success:function(json){//客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数
			var text = $.toJSON(json);
			$.setSession("indexData",text);
			doParseIndexData(text);
		},
		error:function(e){
			doParseIndexData(false);
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
	
	var hitList = new Array();		//热播
	var movieList = new Array();	//电影
	var dramaList = new Array();	//连续剧
	var tvList = new Array();
	
	var hotMovieList = indexObj.hotMovieList;
	if(hotMovieList && hotMovieList.length>0){
		hitList.push(parseMovieToJSON(hotMovieList[0]));
		for(var i =1;i<hotMovieList.length;i++){
			if(i>3) break;
			movieList.push(parseMovieToJSON(hotMovieList[i]));
		}
	}
	var hotDramaList = indexObj.hotDramaList;
	if(hotDramaList && hotDramaList.length>0){
		for(var i =0;i<hotDramaList.length;i++){
			if(i>=2) break;
			dramaList.push(parseMovieToJSON(hotDramaList[i]));
		}
	}
	var hotChannelList = indexObj.hotChannelList;
	if(hotChannelList && hotChannelList.length){
		for(var i =0;i<hotChannelList.length;i++){
			if(i>3) break;
			tvList.push(parseTvToJSON(hotChannelList[i]));
		}
	}
	

	
	indexBox.setData({
		1:{
			tar:'movie',
			list:hitList,
		},
		2:{
			tar:'movie',
			list:movieList,
		},
		3:{
			tar:'tv',
			list:tvList,
		},
		4:{
			tar:'drama',
			list:dramaList,
		}
	});
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