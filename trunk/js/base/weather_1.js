//显示首页天气
function initWeather(){

	
	//查询是否有设置默认城市，如果没有设置就查询ip所在的城市显示
	
	initWeatherData(echoWeather);
	
	
}

function echoWeather(myCity)
{
	$.log("myCity:"+myCity.length);
	var cityItem = {name:"",woeid:""};
	if(myCity!=null && myCity.length>0){
		cityItem = myCity[0];
	}
	loadCityData(cityItem,function(cityItem,data){
		if(data.current!=null&&data.current.image!="")
		{
			var reg  = new RegExp("[^/\\\\]+$","g"); 
			var image =  reg.exec(data.current.image).toString();
			image = image.replace(".gif",".png");
			
			
			
			$.SetConfigValue("weather_img","images/weather/"+image);
			

			var time = new Date();
			var h = time.getHours();
			var m = time.getMinutes();
			var t = (h>9?h:'0'+h)+':' + (m>9?m:'0'+m);
			var con='';
			con +='<div class="time">'+t+'</div><div class="temperature"></div><div class="city"></div>';
			con += '<img src="'+PAGE_PATH+'images/weather/'+image+'"/>';
			con += '<div class="temperature">'+data.current.temp+'</div>';
			con += '<div class="city">'+cityItem.name+'</div>';
			
			$("#pagewrap").append('<div class="weather_box" id="weatherBox"></div>');
			$('#weatherBox').html(con);
			
			//西班牙天气
			$("#weaImg").attr("src",PAGE_PATH+'images/weather/'+image);
			
		}
	})

}