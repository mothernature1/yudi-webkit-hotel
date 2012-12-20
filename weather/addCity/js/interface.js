var APPID = 'U1RzIxDV34G8TM1kg6cu_Ub5laUjUdED_MjpZBZznfkZmZsRYihFOOru2schHOoo';
var APPLANG = '';
function initData(){
	var list = new Array();
	list.push({woeid:'24865671',name:lang.weather.asia});
	list.push({woeid:'24865670',name:lang.weather.africa});
	list.push({woeid:'24865672',name:lang.weather.northAmerica});
	list.push({woeid:'24865673',name:lang.weather.southAmerica});
	list.push({woeid:'24865675',name:lang.weather.europe});
	list.push({woeid:'28289417',name:lang.weather.oceania});
	list.push({woeid:'24865716',name:lang.weather.latinAmerica});
	list.push({woeid:'24865707',name:lang.weather.centralAmerica});
	return list;
}

function getChildWoeid(data,callback){
	var url = 'http://where.yahooapis.com/v1/place/'+data.woeid+'/children;start=0;count=100000?format=json&lang='+APPLANG+'&appid='+APPID;
	$.ajax({
		url:url,
		type:'GET',
		dataType:"json",
		success:function(obj){
			var dataList = new Array();
			var list = obj.places.place;
			for(var i =0;i<list.length;i++){
				var d = list[i];
				var code = d['placeTypeName attrs'].code;
				if(code == 12 || code==8 || code==9 || code==10 ){ //7:镇,8，省,9，市，10：县,12：国家
					dataList.push({
						woeid:d.woeid,
						name:d.name,
						code:code,
					});
				}
			}
			dataList.sort(descByAlphabetic);
			callback(dataList);
		},error:function(e){
			var dataList = new Array();
			callback(dataList);
		}
	});
}

function descByAlphabetic(a,b){
	
	return a.name>b.name?1:-1;
}