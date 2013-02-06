var curItemId = 1;
var totalLength = 0;
$(function(){
	
	$.template("tool","jst_tool",lang.weather);
	window.addEventListener("pageshow", pageshow, false);
	
});


function pageshow(){
	var d = $.getSession(WEATHER_TAG);
	if(!d){
		ajaxWeatherData(refreshContent);
		return;
	}
	refreshContent();
}

function refreshContent(){
	var d = $.getSession(WEATHER_TAG);
	if(!d){
		showGTip("Please Refresh Data.");
		return false;
	}
	eval("var weatherData = "+d);
	
	$('#cityList').html('');
	$('#scroll').html('');
	$('#slider_bar').html('');
	
	var dataList = weatherData.list;
	
	totalLength = dataList.length;
	var data,j,cityCon='',con='';
	for(var i = 0;i<dataList.length;i++){
		var data = dataList[i];
		j = i + 1;
		data.id=j;
		
		cityCon += '<span id="cityBox'+j+'">'+data.cityName+'</span>';
		con += '<div class="child" ><div class="box" id="childBox'+j+'">'+refreshItem(data,weatherData)+'</div></div>';
	}
	$('#cityList').html(cityCon);
	$('#scroll').html(con);
	
	$("#scroll").pislider({
		child:"child",
		slider_bar:"slider_bar",
		scrollTime:500,
		autoScroll:"false",
		autoTime:7000,
		callback:clickBtn,
	});
	$('#cityBox'+curItemId).addClass('active');
}

function clickBtn(type){
	$('#cityBox'+curItemId).removeClass('active');
	if(type == 'next'){
		curItemId ++;
		if(curItemId > totalLength){
			curItemId = 1;
		}
	}else{
		curItemId -- ;
		if(curItemId ==0){
			curItemId = totalLength;
		}
	}
	$('#cityBox'+curItemId).addClass('active');
}

function refreshItem(data,weatherData){
	
	var con = '';
	con += '<div class="air-temperature">';
		con += '<img style="width:148px;height:148px;"  src="'+data.icon+'"/>';
		con += '<div class="city-temperature"><span class="city">'+data.cityName+'</span><span class="temperature">'+data.temp+'°'+weatherData.unit+'</span></div>';
		con += '<div class="date-weather"><span class="week-day">'+data.day+'</span><span class="date">'+data.date+'</span><div class="weather">'+data.condition+'</div></div>';
	con += '</div>';
	
	con += '<ul class="other">';
		con += '<li class="odd"><span class="item-title">'+lang.weather.humidity+'</span><span class="item-value">'+data.humidity+'</span></li>';
		con += '<li class="even"><span class="item-title">'+lang.weather.highTemp+':</span><span class="item-value">'+data.highTemp+'°'+weatherData.unit+'</span></li>';
		con += '<li class="odd"><span class="item-title">'+lang.weather.wind+':</span><span class="item-value">'+data.wind +'</span></li>';
		con += '<li class="even"><span class="item-title">'+lang.weather.lowTemp+':</span><span class="item-value">'+data.lowTemp+'°'+weatherData.unit+'</span></li>';
	con += '</ul>';
	
	con += '<div class="next-four-days-weather">';
		for(var i=0;i<data.forecastList.length;i++){
			con += '<span class="first"><div class="week-day">'+data.forecastList[i].dayOfWeek+'</div><div class="temperature">'+data.forecastList[i].lowTemp+'°'+weatherData.unit+'-'+data.forecastList[i].highTemp+'°'+weatherData.unit+'</div><img style="height:65px;" src="'+data.forecastList[i].icon+'"/></span>';
		}
	con += '</div>';
	return con;
}

KEY.KEY_RETURN = function(){
	//取消代理
	history.go(-1);
}

KEY.KEY_LEFT = function(){
	$('#btn_prev').click();
}

KEY.KEY_RIGHT = function(){
	$('#btn_next').click();
}




KEY.KEY_BTN_RED = function(){
	ajaxWeatherData(refreshContent);
}