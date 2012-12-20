

//初始化城市
function initWeatherData(callback){
	var cityList = new Array();
	
	//"Guangzhou"
	//get_woeid("Guangzhou");

	var weather_city_list = $.GetConfigValue("weather_city_list","");
	//$.SetConfigValue("weather_city_list","");
	//alert(weather_city_list);
	if(weather_city_list!=null&&weather_city_list!=""&&weather_city_list.indexOf('woeid')!=-1)
	{
		//alert(weather_city_list);
		eval("cityList="  + weather_city_list);
		callback(cityList);
	}
	else
	{
		$.ajax({

		url:"http://j.maxmind.com/app/geoip.js",
		dataType:"html",
		success:function(data){
			
			$("body").append('<script>'+data+'<\/script>');
			var city = geoip_city()==""?geoip_country_name():geoip_city();
			//city = "Guangzhou";
			if(city!=""){
				//--------------------yahoo查询城市woeid start------------------
				var feedMain ="http://query.yahooapis.com/v1/public/yql?q=";
				var feedEnv="&env=" + encodeURIComponent("http://datatables.org/alltables.env") + "&format=json&callback=?";

				var query = "select woeid from geo.places where text= '" + city + "' ";
				if (!query) {
					throw new Error('$.YQL(): Parameters may be undefined');
				}
				var encodedQuery = encodeURIComponent(query.toLowerCase()),
				url = feedMain+ encodedQuery + feedEnv;
				url = url.replace("callback=?","callback=");
				var woeid = "";
				$.ajax({
					url:url,
					dataType:'html', 
					success:function(data){
						//$.log(data);
						data = data.replace("?","");
						eval("var cityItem ="  + data);
						if(cityItem.query.results.place.constructor == Array){
							woeid = cityItem.query.results.place[0].woeid;
						}else{
							woeid = cityItem.query.results.place.woeid;
						}
						
						if(woeid!=""){
							var cityItem = [{name:city,woeid:woeid}];
							$.SetConfigValue("weather_city_list",$.toJSON(cityItem));
							initWeatherData(callback);
							//callback(cityList);
						}else{
							//$.gotoPage("./addCity.html");
						}
						
					},
					error:function(data){
						//$.gotoPage("./addCity.html");
					}
				});
				//--------------------yahoo查询城市woeid end-------------------
			}else{
				//$.gotoPage("./addCity.html");
			}
			
			return;
			
		},error:function(e){
			callback(false);
			return;
		}});
		
	}
	
	
}

//加载城市数据
function loadCityData(city,callback){
	
	//首页天气显示用到-------
	if(iconMap){
		
	}else{
		var iconMap={"tornado":0,"tropicalstorm":1,"hurricane":2,"severethunderstorms":3,"thunderstorms":4,"mixedrainandsnow":5,"mixedrainandsleet":6,"mixedsnowandsleet":7,"freezingdrizzle":8,"drizzle":9,"freezingrain":10,"amshowers":11,"showers":11,"pmrain":11,"pmshowers":11,"showers":12,"snowflurries":13,"lightsnowshowers":14,"blowingsnow":15,"snow":16,"hail":17,"sleet":18,"dust":19,"foggy":20,"haze":21,"smoky":22,"blustery":23,"windy":24,"cold":25,"cloudy":26,"mostlycloudy":27,"partlycloudy":29,"clear ":31,"sunny":32,"mostlysunny":36,"fair":33,"mixedrainandhail":35,"hot":36,"isolatedthunderstorms":37,"scatteredthunderstorms":38,"scatteredshowers":40,"heavysnow":41,"scatteredsnowshowers":42,"heavysnow":43,"partlycloudy":44,"thundershowers":45,"snowshowers":46,"isolatedthundershowers":47};
	}
	//首页天气显示用到--end-----
	
	
	var weather_unit = $.GetConfigValue("tempUnit","°C");
	if(weather_unit!="°C"&&weather_unit!="°F")
	{
		weather_unit = "°C";
	}
	
	
	var date = new Date();
	var dateStr = date.format(lang.weather.dataFormat);
	
	var url = '';
	var weatherItem = 'temp-c';
	if(weather_unit=="°C"){
		url = 'http://weather.yahooapis.com/forecastrss?w='+city.woeid+'&u=c';
		weatherItem = 'temp-c';
	}else{
		url = 'http://weather.yahooapis.com/forecastrss?w='+city.woeid+'&u=f';
		weatherItem = 'temp-f';
	}
	$.log(url)
	$.ajax({
		url:url,
		type: 'GET',
		dataType:'html', 
		code:'utf-8',
		success:function(text){
			text = text.replace(new RegExp("yweather:","gm"),"yweather ");
			//$.log(text);
			var dom = $(text);
			var title = dom.find("title").text();
			if(title.indexOf("City not found")!=-1){
				var data = new Object();
				callback(city,data);
				return;
			}
			
			var direction = "";
			var humidity = "";
			var low = "";
			var high = "";
			
			//var humidity = $(dom.find('yweather')[3]).attr("humidity");		//湿度
			var condition = $(dom.find('yweather')[5]).attr("text");		//晴/雨
			var code = $(dom.find('yweather')[5]).attr("code");	//天气代号
			var temp = $(dom.find('yweather')[5]).attr("temp");	//温度
			var day = $(dom.find('yweather')[6]).attr("day");	//星期几
			//var low = $(dom.find('yweather')[6]).attr("low");	//低温
			//var high = $(dom.find('yweather')[6]).attr("high");	//高温
			var data = {current:{humidity:humidity,condition:condition,temp:tempUnit(temp,weather_unit),
				lowTemp:tempUnit(low,weather_unit),highTemp:tempUnit(high,weather_unit),wind:direction,image:+code+".png",dayOfWeek:day}};
			
			callback(city,data);
		},
		error:function(){
			var data = new Object();
			callback(city,data);
		}
	});

}



//格式化温度单位
function tempUnit(value,unit)
{
	//$.log("温度值"+value);
	//$.log("单位"+unit);
	if(unit=="°C")
	{
		//var value = parseInt((value - 32) * 5 / 9 )
		return value + unit;
	}
	else if(unit=="°F")
	{

		return value + unit;
	}
}



                        
                        
							
							
							
													
						
                        
                        
							
							
							
							
							
						
                        
                        
							
							
							
							
						