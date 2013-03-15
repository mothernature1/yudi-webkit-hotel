function initData(callback){
	var list = new Array();
	
	
	list.push({name:lang.index.tv,tar:'tv',disName:lang.index.tvDis,url:'channel/index.html',image:'images/base/tv_logo.png'});
	list.push({name:lang.index.signage,tar:'digitalSignage',disName:lang.index.signageDis,url:'signage/index.html',image:'images/base/setting_logo.png'});
	list.push({name:lang.index.movie,tar:'tv',disName:lang.index.movieDis,url:'movie/index.html',image:'images/base/movies_logo.png'});
	list.push({name:lang.index.music,tar:'music',disName:lang.index.music,url:'music/index.html',image:'images/base/music_logo.png'});
	list.push({name:lang.index.radio,tar:'radio',disName:lang.index.radio,url:'radio/index.html',image:'images/base/fm_logo.png'});
	list.push({name:lang.index.Weather,tar:'weather',disName:lang.index.Weather,url:'weather/index.html',image:'images/base/weather-logo.png'});
	list.push({name:lang.index.file,tar:'signage',disName:lang.index.filesDis,url:'demo/ds/index.html',image:'images/base/local-logo.png'});
	list.push({name:lang.index.setting,tar:'setting',disName:lang.index.settingsDis,url:'setting/index.html',image:'images/base/setting_logo.png'});
	
	return list;
}


