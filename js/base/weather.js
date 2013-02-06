//显示首页天气
var weatherTimer = null;
function initWeather(){
	var d = $.getSession(WEATHER_TAG); $.log('#######'+d);
	if(!d){
		ajaxWeatherData(refreshWeatherContent);
		return;
	}
	refreshWeatherContent();
	
	if(weatherTimer){clearInterval(weatherTimer);}
	weatherTimer = setInterval("doAjaxWeatherData()",300*1000);
}

function doAjaxWeatherData(){
	ajaxWeatherData(refreshWeatherContent);
}

function refreshWeatherContent(){
	var d = $.getSession(WEATHER_TAG);
	if(!d){
		return false;
	}
	eval("var weatherData = "+d);
	var data = weatherData.list[0];
	if(!data) return ;
	
	var con = '';
	con += '<img src="'+data.icon+'"/>';
	con += '<div class="city">'+data.cityName+'</div>';
	con += ' <div class="info">'+data.condition+'</div>';
	con += '<div class="temperature">'+data.temp+'°'+weatherData.unit+'</div>';
	$('#temBox').html(con);
	
	if(weatherData.ntpAddr &&  config.ntpAddr != weatherData.ntpAddr){
		$.setConfigPathValue(config.sysPath,'ntpAddr',weatherData.ntpAddr);
	}
	if(weatherData.timezone &&  config.timezone != weatherData.timezone){
		$.setConfigPathValue(config.configPath,'timezone',weatherData.timezone);
		GLOBAL.setTimeZone(weatherData.timezone);
	}
}

