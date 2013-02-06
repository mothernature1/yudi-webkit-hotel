var WEATHER_TAG = "weather_session_tag";

function ajaxWeatherData(callback){  $.log(config.weatherInfoURL);
	$.ajax({
		url:config.weatherInfoURL,
		dataType:"html",
		success:function(data){ $.log("successd"+data);
			$.setSession(WEATHER_TAG,data);
			callback();
		},error:function(){$.log("error");
			callback();
		}
	});
}