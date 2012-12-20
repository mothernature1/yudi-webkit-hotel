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
			
			
			var con = '';
			$.SetConfigValue("weather_img","images/weather/"+image);
			
			con += '<img src="'+PAGE_PATH+'images/weather/'+image+'"/>';
			con += '<div class="city">'+cityItem.name+'</div>';
			con += ' <div class="info">'+data.current.condition+'</div>';
			con += '<div class="temperature">'+data.current.temp+'</div>';
			$('#temBox').html(con);
			
			weatherImg = PAGE_PATH+'images/weather/'+image;
			//西班牙天气
			$("#weaImg").attr("src",PAGE_PATH+'images/weather/'+image);
		}
	})

}