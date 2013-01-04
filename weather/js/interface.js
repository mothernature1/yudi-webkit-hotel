

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
							$.gotoPage("./addCity.html");
						}
						
					},
					error:function(data){
						$.gotoPage("./addCity.html");
					}
				});
				//--------------------yahoo查询城市woeid end-------------------
			}else{
				$.gotoPage("./addCity.html");
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
		var iconMap={"tornado":0,"tropicalstorm":1,"hurricane":2,"severethunderstorms":3,"thunderstorms":4,"mixedrainandsnow":5,"mixedrainandsleet":6,"mixedsnowandsleet":7,"freezingdrizzle":8,"drizzle":9,"freezingrain":10,"amshowers":11,"showers":11,"rain":11,"showers":11,"showers":12,"snowflurries":13,"lightsnowshowers":14,"blowingsnow":15,"snow":16,"hail":17,"sleet":18,"dust":19,"foggy":20,"haze":21,"smoky":22,"blustery":23,"windy":24,"cold":25,"cloudy":26,"clouds":27,"mostlycloudy":27,"clouds":28,"partlycloudy":29,"clear ":31,"sunny":32,"sun":32,"mostlysunny":36,"fair":33,"mixedrainandhail":35,"hot":36,"isolatedthunderstorms":37,"scatteredthunderstorms":38,"scatteredshowers":40,"heavysnow":41,"scatteredsnowshowers":42,"heavysnow":43,"partlycloudy":44,"thundershowers":45,"snowshowers":46,"isolatedthundershowers":47};
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
			var direction = $(dom.find('yweather')[2]).attr("direction");	//风向360度
			var speed = $(dom.find('yweather')[2]).attr("speed");	//风速
			//静风没处理
			if(speed<=2){
				direction = "VAR";
			}else if(direction>=11.26 && direction<=78.75){
				//东北
				direction = "NE";
			}else if(direction>=78.76 && direction<=101.25){
				//东
				direction = "E";
			}else if(direction>=101.26 && direction<=168.75){
				//东南
				direction = "SE";
			}else if(direction>=168.76 && direction<=191.25){
				//南
				direction = "S";
			}else if(direction>=191.26 && direction<=258.75){
				//西南
				direction = "SW";
			}else if(direction>=258.76 && direction<=281.25){
				//西
				direction = "W";
			}else if(direction>=281.26 && direction<=348.75){
				//西北
				direction = "NW";
			}else{
				//北
				direction = "N";
			}
			var humidity = $(dom.find('yweather')[3]).attr("humidity");		//湿度
			var condition = $(dom.find('yweather')[5]).attr("text");		//晴/雨
			var code = $(dom.find('yweather')[5]).attr("code");	//天气代号
			var temp = $(dom.find('yweather')[5]).attr("temp");	//温度
			var day = $(dom.find('yweather')[6]).attr("day");	//星期几
			var low = $(dom.find('yweather')[6]).attr("low");	//低温
			var high = $(dom.find('yweather')[6]).attr("high");	//高温
			var data = {current:{humidity:humidity,condition:condition,temp:tempUnit(temp,weather_unit),
				lowTemp:tempUnit(low,weather_unit),highTemp:tempUnit(high,weather_unit),wind:direction,image:+code+".png",dayOfWeek:day}};
			var forecastUrl = $(dom.find("description").find("a")[0]).attr("href");
			
			//var tomorrow = $(dom.find('yweather')[7]).attr("day");
			var forecastList = new Array();
			//未来4天
			$.log("forecastUrl:"+forecastUrl);
			$.ajax({
				url:forecastUrl,
				type: 'GET',
				dataType:'html', 
				code:'utf-8',
				success:function(text){
					var infoDom = $(text);
					//前三个
					infoDom.find(".forecast-data-list").each(function(i){
						if(i>0 && forecastList.length<5){
							var higtItem = $(this).find("li[class^='"+weatherItem+" high-temp']").text();
							higtItem = higtItem.replace("°","");
							higtItem = higtItem.replace("High","");
							var lowItem = $(this).find("li[class^='"+weatherItem+" low-temp']").text();
							lowItem = lowItem.replace("°","");
							lowItem = lowItem.replace("Low","");
							var iconItem = $(this).find(".icon").text();
							iconItem = iconItem.toLowerCase();
							iconItem = iconItem.replace("am","");
							iconItem = iconItem.replace("pm","");
							iconItem = iconItem.replace("(day)","");
							iconItem = iconItem.replace("(night)","");
							var tempIconItem = iconItem.split("/");
							iconItem = tempIconItem[0];
							iconItem = iconItem.replace(/\s+/g,"");
							iconItem = eval("iconMap."+iconItem)+".png";
							var dayOfWeekItem = $(this).find(".day-name").text();
							
							var forecast = {};
							forecast.dayOfWeek = dayOfWeekItem;
							forecast.lowTemp = tempUnit(lowItem,weather_unit);
							forecast.highTemp = tempUnit(higtItem,weather_unit);
							forecast.image = iconItem;
							forecastList.push(forecast);
						}
						
					});
					data.forecastList  = forecastList;
					//$.log($.toJSON(data));
					callback(city,data);
				},
				error:function(){
					var data = new Object();
					callback(city,data);
				}
			});
			
		},
		error:function(){
			var data = new Object();
			callback(city,data);
		}
	});
	
	//alert(city.woeid);
	/*
	var searchName = city.name.replace(" ","%20");
	var url = 'http://www.google.com/ig/api?weather='+searchName+'&hl=en&ie=utf-8';
	
	
	
			
			
	//var url = 'api.xml';
	$.ajax({
		url:url,
		type: 'GET',
		dataType:'html', 
		code:'utf-8',
		success:function(text){
			
			$.log(text);
			var dom = $(text);

			var data = {
				current:{
					humidity:dom.find("current_conditions").find("humidity").attr("data")==null?"":dom.find("current_conditions").find("humidity").attr("data").replace("Humidity:",""),
					condition:dom.find("current_conditions").find("condition").attr("data")==null?"":dom.find("current_conditions").find("condition").attr("data"),
					temp:tempUnit(dom.find("current_conditions").find("temp_f").length==0?"":dom.find("current_conditions").find("temp_f").attr("data"),weather_unit),
					lowTemp:tempUnit($(dom.find("forecast_conditions")[0]).find("low").attr("data")==null?"":$(dom.find("forecast_conditions")[0]).find("low").attr("data"),weather_unit),
					highTemp:tempUnit($(dom.find("forecast_conditions")[0]).find("high").attr("data")==null?"":$(dom.find("forecast_conditions")[0]).find("high").attr("data"),weather_unit),
					wind:dom.find("current_conditions").find("wind_condition").attr("data")==null?"":dom.find("current_conditions").find("wind_condition").attr("data").replace("Wind: ",""),
					image:dom.find("current_conditions").find("icon").attr("data")==null?"":dom.find("current_conditions").find("icon").attr("data"),
					dayOfWeek:$(dom.find("forecast_conditions")[0]).find("day_of_week").attr("data")==null?"":$(dom.find("forecast_conditions")[0]).find("day_of_week").attr("data")
				}};
			var forecastList = new Array();
			dom.find("forecast_conditions").each(function(){
				var forecast = {};
				forecast.dayOfWeek = $(this).find("day_of_week").attr("data");
				forecast.lowTemp = tempUnit($(this).find("low").attr("data"),weather_unit);
				forecast.highTemp = tempUnit($(this).find("high").attr("data"),weather_unit);
				forecast.image = $(this).find("icon").attr("data");
				forecastList.push(forecast);
			});
			data.forecastList  = forecastList;
			
			$.log($.toJSON(data));
			callback(city,data);
		
		},
		error:function(){
			var data = new Object();
			callback(city,data);
		},
	})
	
	*/
}

/*
* 刷新城市天气
* box :对应的div
* city : 城市
* data : loadCityData 请求得到的数据
*/
function refreshWeather(box,city,data){
	if(data.current!=null){
		if(data.current.image!="")
		{
			var reg  = new RegExp("[^/\\\\]+$","g"); 
			var image =  reg.exec(data.current.image).toString();
			image = image.replace(".gif",".png");
		}
			
			
		var date = new Date();
		var dateStr = date.format(lang.weather.dataFormat);
		var con = '';
		con += '<div class="air-temperature">';
			con += '<img style="width:148px;height:148px;"  src="'+PAGE_PATH+'images/weather/'+image+'"/>';
			con += '<div class="city-temperature"><span class="city">'+city.name+'</span><span class="temperature">'+data.current.temp+'</span></div>';
			con += '<div class="date-weather"><span class="week-day">'+data.current.dayOfWeek+'</span><span class="date">'+dateStr+'</span><div class="weather">'+data.current.condition+'</div></div>';
		con += '</div>';
		
		con += '<ul class="other">';
			con += '<li class="odd"><span class="item-title">'+lang.weather.humidity+'</span><span class="item-value">'+data.current.humidity+'</span></li>';
			con += '<li class="even"><span class="item-title">'+lang.weather.highTemp+':</span><span class="item-value">'+data.current.highTemp+'</span></li>';
			con += '<li class="odd"><span class="item-title">'+lang.weather.wind+':</span><span class="item-value">'+data.current.wind +'</span></li>';
			con += '<li class="even"><span class="item-title">'+lang.weather.lowTemp+':</span><span class="item-value">'+data.current.lowTemp+'</span></li>';
			
		con += '</ul>';
		
		con += '<div class="next-four-days-weather">';
		
			
			for(var i=0;i<data.forecastList.length;i++)
			{
			var reg  = new RegExp("[^/\\\\]+$","g"); 
			var image =  reg.exec(data.forecastList[i].image).toString();
			image = image.replace(".gif",".png");
			con += '<span class="first"><div class="week-day">'+data.forecastList[i].dayOfWeek+'</div><div class="temperature">'+data.forecastList[i].lowTemp+'-'+data.forecastList[i].highTemp+'</div><img style="height:65px;" src="'+PAGE_PATH+'images/weather/'+image+'"/></span>';
			}
	
		con += '</div>';	
		box.html(con);
	}else{
		box.html(lang.weather.weatherNotFound);
	}

}


	
	
function initCityList(){
	var cityList = new Array();
	
	if(config.weather_city_list){
		var cityList2 = config.weather_city_list.split(',');
		for(var i = 0;i<cityList2.length;i++){
			cityList.push({
				name:cityList2[i],
				tar:'city',
			});
		}
	}
	return cityList;
}

//根据国家加载城市列表
function initCityListData(country,callback){
	
	var url = 'http://www.google.com/ig/cities?output=json&hl=en&country='+country;
	if(country=="US")
	{
		callback(US_CITYS);
	}
	else
	{
		$.ajax({
	
			url:url,
			dataType:"html",
			success:function(data){
				eval("var data="  + data);
				callback(data);
	
			},error:function(e){
				callback(false);
			}
		});
	}
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



                        
                        
							
							
							
													
						
                        
                        
							
							
							
							
							
						
                        
                        
							
							
							
							
						