function initData(callback){
	var list = new Array();
	
	
	list.push({name:lang.index.tv,tar:'tv',disName:lang.index.tvDis,url:'channel/index.html',image:'images/base/tv_logo.png'});
	list.push({name:lang.index.movie,tar:'movies',disName:lang.index.movieDis,url:'movie/index.html?category=1',image:'images/base/movies_logo.png'});
	list.push({name:lang.index.drama,tar:'drama',disName:lang.index.dramaDis,url:'movie/index.html?category=2',image:'images/base/drama-logo.png'});

	list.push({name:lang.index.radio,tar:'radio',disName:lang.index.musicDis,url:'radio/index.html',image:'images/base/fm_logo.png'});

	list.push({name:lang.index.apps,tar:'app',disName:lang.index.appsDis,url:'plus/index.html',image:'images/base/app_logo.png'});
	list.push({name:lang.index.file,tar:'files',disName:lang.index.filesDis,url:'local/index.html',image:'images/base/local-logo.png'});
	
	list.push({name:lang.index.setting,tar:'setting',disName:lang.index.settingsDis,url:'setting/index.html',image:'images/base/setting_logo.png'});
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
	if(config.showRadio && false){
		appList.push({name:lang.index.radio,url:'radio/index.html',logo:'images/apps/radio_logo.png',});
	}
	if(config.showMusic ){
		appList.push({name:lang.index.music,url:'album/index.html',logo:'images/apps/music.png',});
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