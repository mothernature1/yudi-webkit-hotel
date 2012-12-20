var cityList;
var curItemId = 1;
var curLoadId = 1;
var iconMap;	//天气图标
$(function(){
	
	//使用代理
	if(config.client && config.client=='spain'){
		$.SetProxy();	//youtube代理
	}
	
	//加入到数组
	iconMap={"tornado":0,"tropicalstorm":1,"hurricane":2,"severethunderstorms":3,"thunderstorms":4,"mixedrainandsnow":5,"mixedrainandsleet":6,"mixedsnowandsleet":7,"freezingdrizzle":8,"drizzle":9,"freezingrain":10,"amshowers":11,"showers":11,"pmrain":11,"pmshowers":11,"showers":12,"snowflurries":13,"lightsnowshowers":14,"blowingsnow":15,"snow":16,"hail":17,"sleet":18,"dust":19,"foggy":20,"haze":21,"smoky":22,"blustery":23,"windy":24,"cold":25,"cloudy":26,"mostlycloudy":27,"partlycloudy":29,"clear ":31,"sunny":32,"mostlysunny":36,"fair":33,"mixedrainandhail":35,"hot":36,"isolatedthunderstorms":37,"scatteredthunderstorms":38,"scatteredshowers":40,"heavysnow":41,"scatteredsnowshowers":42,"heavysnow":43,"partlycloudy":44,"thundershowers":45,"snowshowers":46,"isolatedthundershowers":47};
	
	 
	$.template("tool","jst_tool",lang.weather);
	initWeatherData(afterInitData); return ;
	$("#scroll").pislider({
		child:"child",
		slider_bar:"slider_bar",
		scrollTime:500,
		autoScroll:"false",
		autoTime:7000,
		callback:clickBtn,
	});
});

function clickBtn(type){
	$('#cityBox'+curItemId).removeClass('active');
	if(type == 'next'){
		curItemId ++;
		if(curItemId > cityList.length){
			curItemId = 1;
		}
	}else{
		curItemId -- ;
		if(curItemId ==0){
			curItemId = cityList.length
		}
	}
	$('#cityBox'+curItemId).addClass('active');
}

function afterInitData(list){
	cityList = list;
	
	var city,j,cityCon='',con='';
	for(var i = 0;i<cityList.length;i++){
		city = cityList[i];
		j = i + 1;
		city.id=j;
		
		cityCon += '<span id="cityBox'+j+'">'+city.name+'</span>';
		con += '<div class="child" ><div class="box" id="childBox'+j+'"><div class="tip">'+lang.tip.loading+'<div></div></div>';
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
	
	city = cityList[0];
	loadCityData(city,afterLoadData);
}

function afterLoadData(city,data){
	
	var box = $('#childBox' +city.id);
	refreshWeather(box,city,data);
	
	if(curLoadId==1){
		//更新默认城市的天气图片
		if(data.current.image!="")
		{
			var reg  = new RegExp("[^/\\\\]+$","g"); 
			var image =  reg.exec(data.current.image).toString();
			image = 'images/weather/' + image.replace(".gif",".png");
			$.SetConfigValue("weather_img",image);
		}
	}
	
	curLoadId ++;
	if(curLoadId <=cityList.length){
		var city = cityList[curLoadId - 1];
		loadCityData(city,afterLoadData);
	}
}



KEY.KEY_RETURN = function(){
	//取消代理
	if(config.client && config.client=='spain'){
		$.SetNoProxy();	//youtube代理
	}
	$.goIndex();
}

KEY.KEY_LEFT = function(){
	$('#btn_prev').click();
}

KEY.KEY_RIGHT = function(){
	$('#btn_next').click();
}




KEY.KEY_BTN_GREEN = function(){
	$.gotoPage("./addCity.html");
}


KEY.KEY_BTN_RED = function(){
	var activeCity = $(".active").html();
	var weather_city_list = $.GetConfigValue("weather_city_list","");
	if(activeCity!=null && activeCity!="null"){
		eval("var cityList="  + weather_city_list);
		if(cityList.length > 1){
			var curCityList = new Array();
			for(var i=0;i<cityList.length;i++){
				if(cityList[i].name==activeCity){
					curCityList.push({name:cityList[i].name,woeid:cityList[i].woeid});
					cityList.splice(i,1);
					break;
				}
			}
			if(cityList.length>0){
				curCityList = curCityList.concat(cityList.slice(0,cityList.length));
			}
			$.SetConfigValue("weather_city_list",$.toJSON(curCityList));
			$.gotoPage("./index.html"); 
		}
	}
}

KEY.KEY_BTN_YELLOW = function(){
	var activeCity = $(".active").html();
	var weather_city_list = $.GetConfigValue("weather_city_list","");
	if(activeCity!=null)
	{
		eval("var cityList="  + weather_city_list);
		for(var i=0;i<cityList.length;i++){
			if(cityList[i].name==activeCity){
				cityList.splice(i,1);	
				break;
			}
		}
		if(cityList.length>0){
			$.SetConfigValue("weather_city_list",$.toJSON(cityList));
		}else{
			$.SetConfigValue("weather_city_list","");
		}
		
	}
	$.gotoPage("./index.html"); 

}

KEY.KEY_BTN_BLUE = function(){
	
	var weather_unit = $.GetConfigValue("tempUnit","°C");
	if(weather_unit=="°C")
	{
		$.SetConfigValue("tempUnit","°F")
	}
	else
	{
		$.SetConfigValue("tempUnit","°C")
	}
	$.gotoPage("./index.html");
}





