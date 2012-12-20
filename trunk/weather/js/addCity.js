var provinceList;
var cityList;
var curRegion = 'province';
$(function(){ 

	$.template('pagewrap','jst_addCity',lang.weather);
	
	provinceList = new TextList({id:'provinceList',target:'province',disNum:7,splitHeight:350,formatHtml:formatHtml,onclick:clickProvince});
	cityList = new TextList({id:'cityList',target:'city',disNum:7,splitHeight:350,formatHtml:formatHtml,onclick:clickCity});
	
	$("#provinceBox").show();
	var plist = new Array();
	
	
	
	countryList = new Array();
	for(var i = 0;i<COUNTRYS_DATA.length;i++){
		var country = COUNTRYS_DATA[i].split(',');
		var c = {
			name:country[1],
			code:country[0],
			dataList:false,
		}
		countryList.push(c);
	}
	
	 countryList.sort(function(a,b){
		 if(a.name>b.name)
		 {
			 return 1;
		 }
		 else
		 {
			 return -1;
		 }
	
	});
	

	/*
	for(var i in city){
		var arr = city[i];
		var dataList = new Array();
		for(var j=0;j<arr.length;j++){
			dataList.push({name:arr[j]});
		}
		plist.push({
			name:i,
			dataList:dataList,
		});
	}*/
	provinceList.setDataList(countryList,true);
});

function formatHtml(data,id){
	var con =  '<div class="name"><a href="#" id="'+this.target+'-a-'+id+'">'+data.name+'</a></div>';
	return con;
}

//点击国家事件
function clickProvince(data,id){
	curRegion = 'city';
	$('#cityBox').show();
	
	//获取城市列表
	initCityListData(data.code,function(data){
		if(data==null||data==false)
		{
			showGTip(lang.tip.loadError,2000);
		}
		else
		{
			cityList.setDataList(data.cities,true);
		}
		
		
	});

	$('#provinceBox').hide();
}


//点击城市事件
function clickCity(data,id)
{
	var weather_city_list = $.GetConfigValue("weather_city_list","");
	

	if(weather_city_list.indexOf(data.name)<0)
	{
		if(weather_city_list=="")
		{
			weather_city_list = data.name;
		}
		else if(weather_city_list.split(",").length>=5)
		{
			showGTip(lang.weather.addTip,2000);
			return;
		}
		else
		{
			weather_city_list = weather_city_list + ","+data.name;
		}
	}
	$.SetConfigValue("weather_city_list",weather_city_list);
	$.gotoPage('./index.html');
	
}




//设置
KEY.KEY_RETURN = function(){

	if(curRegion == 'city' ){
		$('#provinceBox').show();
		provinceList.setFocus();
		$('#cityBox').hide();
	}else{
		
		history.go(-1);
		return ;
	}
}