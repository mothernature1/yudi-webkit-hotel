var textList;
var infoList;
var mConfirm;
$(function(){ 
	
	//使用代理
	if(config.client && config.client=='spain'){
		$.SetProxy();	//youtube代理
	}

	if(config.lang == 'lang_cn' || config.lang=='lang_tw'){
		APPLANG = 'zh-CN';
	}else{
		APPLANG = 'en-US';
	}
	
	mConfirm = new Confirm({
		title:'Add City',
		click:function(bo){
			if(bo){				//按了确定按钮
				var data = textList.getData(); $.log($.toJSON(data));
				var cityList= new Array();
				var weather_city_list = $.GetConfigValue("weather_city_list","");
				
				//检查是否有相同的woeid,有就不重复加
				if(weather_city_list.indexOf(data.woeid)<0)
				{
					if(weather_city_list=="")
					{
						cityList.push({name:data.name,woeid:data.woeid});
					}
					else
					{
						eval("cityList="  + weather_city_list);
						if(cityList.length>=5){
							showGTip(lang.weather.addTip,2000);
							return;
						}else{
							cityList.push({name:data.name,woeid:data.woeid});
						}
						
					}
					$.SetConfigValue("weather_city_list",$.toJSON(cityList));
				}
				$.gotoPage('./index.html');
				
				//showGTip("选择的地区:"+data.name+" woeid:"+data.woeid);
			}
		},
	});
	
	textList = new TextList({			//初始化右边导航
		id:'listBox',
		disNum:8,
		splitHeight:416,
		formatHtml:function(data,id){
			var con = '';
			var con =  '<div class="_textListNum">'+id+'</div><div class="_textListName"><a href="#" id="'+this.target+'-a-'+id+'">'+data.name+'</a></div>';
			return con;
		},
		onfocus:function(data,id){
			$.log('on focus item');
		}, 
		onclick:function(data,id){  $.log(data.woeid);
			if(data.code == 10){
				mConfirm.show(lang.weather.tip+':'+data.name);
				
			}else{
				var info = infoList[infoList.length - 1];
				var type = textList.getType();
				info.type = type;			//保存状态
				
				$.ShowLoading(true);
				getChildWoeid(data,afterGetWoeid);
			}
		}
	}); 
	infoList = new Array();
	infoList.push({path:''});
	
	var list = initData();
	textList.setDataList(list,true);
	
	
});


function afterGetWoeid(list){ 
	$.HideLoading(false);	
	if(list.length > 0){
		var data = textList.getData(); 
		var info = infoList[infoList.length - 1];
		var path = info.path;
		var newPath = '';
		if(path){
			newPath=path+'>'+data.name;
		}else{
			newPath = data.name;
		}
		$('#nav').html(newPath);
		infoList.push({path:newPath});
		textList.setDataList(list,true);
	}else{
		var data = textList.getData();
		mConfirm.show(lang.weather.tip+':'+data.name);
	}
}


var feedMain ="http://query.yahooapis.com/v1/public/yql?q=";
var feedEnv="&env=" + encodeURIComponent("http://datatables.org/alltables.env") + "&format=json";
function showWeathe(woeid){
	var query = "select * from weather.woeid where w = '" + woeid + "' ";	
	var encodedQuery = encodeURIComponent(query.toLowerCase());
	
	var  url = feedMain+ encodedQuery + feedEnv;
	$.log(url);
}