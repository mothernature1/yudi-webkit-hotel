

function initData(callback){
	var list = new Array();
	list.push({name:lang.index.channel,tar:'channel',url:'channel/index.html',image:'images/base/tv_logo.png'});
	list.push({name:lang.index.movie,tar:'movie',url:'movie/index.html?category=1',image:'images/base/tv_logo.png'});
	list.push({name:lang.index.drama,tar:'drama',url:'movie/index.html?category=2',image:'images/base/tv_logo.png'});
	list.push({name:lang.index.local,tar:'local',url:'local/index.html',image:'images/base/tv_logo.png'});
	list.push({name:lang.index.account,tar:'account',url:'account/index.html',image:'images/base/tv_logo.png'});
	list.push({name:'youtube',tar:'youtube',url:'youtube/index.html',image:'images/base/tv_logo.png'});
	list.push({name:'youtubeVod',tar:'youtubeVod',url:'youtubeVod/index.html',image:'images/base/tv_logo.png'});
	list.push({name:'收音机',tar:'radio',url:'radio/index.html',image:'images/base/tv_logo.png'});
	list.push({name:'天气预报',tar:'radio',url:'weather/index.html',image:'images/base/tv_logo.png'});
	list.push({name:'速度测试',tar:'speedTest',url:'speedTest/index.html',image:'images/base/tv_logo.png'});
	list.push({name:'音乐',tar:'music',url:'music/index.html',image:'images/base/tv_logo.png'});
	list.push({name:lang.index.setting,tar:'setting',url:'setting/index.html',image:'images/base/tv_logo.png'});
	
	callback(list);
}