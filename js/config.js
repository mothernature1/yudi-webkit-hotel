var config = {
	//webUrl:"http://stb.ipmacro.com:8080/",  //网络验证地址	
    WebUrl:"http://192.168.0.117/knj/",
	webUrlBackup:false,
	configPath:"/usr/data/stb.conf",  
	sysPath:"/usr/data/sys.conf",
	project:'itv',
	display_scaler:12 , 		//视频窗口缩放百分比  0-24
	display_brightness:50 , 		//显示亮度  0 - 100
	display_contrast:75,		//显示对比度    0 - 100
	display_saturation:75,		//设置饱和度	0-100
	display_sharpness:50,		//设置清晰度 0 - 100 
	display_hue:50,		//设置饱色深  0-100 
	display_position_x:0,		//水平位置
	display_position_y:0,     //垂直位置
	
	display_scaler_play:12 , 		//视频窗口缩放百分比  0-24
	display_brightness_play:50 , 		//显示亮度  0 - 100
	display_contrast_play:35,		//显示对比度    0 - 100
	display_saturation_play:43,		//设置饱和度	0-100
	display_sharpness_play:50,		//设置清晰度 0 - 100 
	display_hue_play:50,		//设置饱色深  0-100 
	aspectMode:3,					//ali模式
	display_out_mode :"AUTO",			//输出制式
	display_aspectMode_mode:'PILLBOX',
	display_aspectMode_aspect:'TV_AUTO',
	display_aspectMode_style:'FULLSCREEN',
	
	weather_default_city:'',	//默认的天气预报
	weather_city_list:'Lahore,Tokyo,London,New York',
	indexUrl:'',			///首页地址
	showYoutube:true,					//显示youtube
	showYoutubeVod:true,			//显示youtube vod
	youtubeVodName:'Youtube Vod',	//youtube vod的名称
	showRadio:true,						//显示收音机
	showWeather:true,				//显示天气
	showRss:true,					//显示新闻
	showBalance:true,				//客户信息
	showPayChannel:false,			//显示付费频道
	
	TZ:'GMT+8',				//时区
	theme:'base',				//样式名称
	index:'index',				//首页名称
	lang:'lang_en',				//语言
	settingPassword:'0000',    //设置密码
	lockPassword:'0000',		//加锁密码
	client:'',				//客户标识
	liveURL:'/channel_resource/live/liveListNew.html',
	ntpAddr:'time.windows.com',
	timezone:'GMT+8',
	weatherInfoURL:'http://192.168.1.243:8080/gyudi/js/weather_info.js',
	
}

if(typeof(FILE)== 'object'){
	//获取stb.conf的值
	var _configCon = FILE.ReadFile(config.configPath); LOG.INFO(_configCon);
	var _configConArray = _configCon.split('\n');
	for(var i = 0 ;i<_configConArray.length;i++){
		var _configValueArray = _configConArray[i].split('=');
		if(_configValueArray.length == 2){
			if(config.hasOwnProperty(_configValueArray[0]) && _configValueArray[1]!=''){
				if(_configValueArray[1] == 'true' || _configValueArray[1] =='false'){
					config[_configValueArray[0]] =(_configValueArray[1] == 'true');
				}else{
					config[_configValueArray[0]] = _configValueArray[1];
				}
			}
		}
	}
	
	//获取sys.conf的值
	var _configCon = FILE.ReadFile(config.sysPath);
	var _configConArray = _configCon.split('\n');
	for(var i = 0 ;i<_configConArray.length;i++){	
		var _configValueArray = _configConArray[i].split('=');
		if(_configValueArray.length == 2){
			if(config.hasOwnProperty(_configValueArray[0]) && _configValueArray[1]!=''){
				if(_configValueArray[1] == 'true' || _configValueArray[1] =='false'){
					config[_configValueArray[0]] =(_configValueArray[1] == 'true');
				}else{
					config[_configValueArray[0]] = _configValueArray[1];
				}
			}
		}
	}

}else{
	for(var i in config){
		var v = window.localStorage.getItem("config_"+i);
		if(v){
			if(v == 'true' || v=='false'){
				v = v == 'true';
			}
			config[i] = v;
		}
	}
}


/*
if(config.indexUrl){
	config.webUrl = config.indexUrl;
}else{
	config.indexUrl = config.webUrl;
}
*/



