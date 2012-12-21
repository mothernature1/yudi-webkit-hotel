var config = {
	//webUrl:"http://stb.ipmacro.com:8080/",  //网络验证地址	
    ebUrl:"http://172.10.10.10/knj//",
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
	showErrorLive:true,			//显示错误频道
	showLock:true,			//亲子锁
	showChannelLock:false,		//频道加锁,显示频道加锁
	showRecord:true,			//支持录制功能
	showSpeedTest:true,			//显示速度测试
	showMyChannel:true,			//显示用户自定义频道
	showMusic:true,				//显示在线后台音乐
	supportPY:true,				//是否支持拼音输入
	showPackageList:true,			//显示套餐列表
	showXiamiMusic:true,		//是否显示在线音乐
	showChineseChannel:true,		//是否显中国频道
	showDouban:true,			//是否显示豆瓣电台
	supportLanguage:'',			//支持的语言类型
	adAuto:true,			   //自动调时
	subMoveType:'left',			//滚动字幕移动方式
	hideProgramAuto:true,		//自动隐藏
	shutdownTip:true,			//关机提示
	TZ:'GMT+8',				//时区
	theme:'base',				//样式名称
	index:'index',				//首页名称
	lang:'lang_en',				//语言
	settingPassword:'0000',    //设置密码
	lockPassword:'0000',		//加锁密码
	client:'',				//客户标识
	liveURL:'/channel_resource/live/liveListNew.html',
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



