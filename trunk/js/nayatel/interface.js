function initData(callback){
	var list = new Array();
	
	
	list.push({name:'Live TV',tar:'tv',disName:'Digital and HD channels',url:'channel/index.html',image:'images/nayatel/tv_logo.png'});
	list.push({name:'iVOD',tar:'movies',disName:'HD movies streaming',url:'movie/index.html?category=1',image:'images/nayatel/movies_logo.png'});
	list.push({name:'Series',tar:'drama',disName:'Your favorite TV series and shows',url:'movie/index.html?category=2',image:'images/nayatel/drama-logo.png'});

	list.push({name:'Music',tar:'radio',disName:'Your favorite online music',url:'album/index.html',image:'images/nayatel/fm_logo.png'});

	list.push({name:lang.index.apps,tar:'app',disName:'More Applications',url:'plus/index.html',image:'images/base/app_logo.png'});
	list.push({name:lang.index.file,tar:'files',disName:'Local Files',url:'local/index.html',image:'images/base/local-logo.png'});
	
	list.push({name:lang.index.setting,tar:'setting',disName:'System Settings',url:'setting/index.html',image:'images/base/setting_logo.png'});
	return list;
}


function getAppList(){
	 var appList = new Array();
	if(config.showYoutube ){
		appList.push({name:'Youtube',url:'youtube/index.html',logo:'images/apps/youtube_logo.png',});
	}
	if(config.showYoutubeVod){
		appList.push({name:'Youtube Vod',url:'youtubeVod/index.html',logo:'images/apps/youtube_logo.png',});
	}
	if(config.showRadio ){
		appList.push({name:lang.index.radio,url:'radio/index.html',logo:'images/apps/radio_logo.png',});
	}
	if(config.showMusic ){
	//	appList.push({name:lang.index.music,url:'album/index.html',logo:'images/apps/music.png',});
	}
	if(config.showWeather){
		appList.push({name:lang.index.weather,url:'weather/index.html',logo:'images/apps/weather_logo.png',});
	}
	if(config.showRss){
		appList.push({name:lang.index.News,url:'rss/index.html',logo:'images/apps/news_logo.png',});
	}
	if(config.showSpeedTest){
		appList.push({name:lang.index.Speed,url:'speedTest/index.html',logo:'images/apps/speedx.png',});
	}
	
	if(config.showMyChannel){
		appList.push({name:lang.index.myChannel,url:'myChannel/index.html',logo:'images/apps/miccell_youtube_vod.png',});
	}
	
	if(config.showBalance){
		appList.push({name:lang.index.Account,url:'account/index.html',logo:'images/apps/account_logo.png',});
	}
	
	if(config.showMusic){
		
	}
	
	//appList.push({name:lang.index.Speed,url:'speedTest/index.html',logo:'images/apps/speedx.png',});
	
	return appList;
}