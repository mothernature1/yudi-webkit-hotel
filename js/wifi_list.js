var _wifiList = false;
var _wifiTimes = 0;
var _wifiMaxTimes = 1;
var _wifiTimer = null;
var _wifiCallBack = false;
function GetWifiList(callback){
	_wifiTimes = 0;
	_wifiCallBack = callback;
	_wifiList = new Array();
	
	if(_wifiTimer){clearInterval(_wifiTimer);_wifiTimer = null;}
	if(_isAli){
		_wifiTimer = setInterval("RefreshWifiList()",300);
	}else{
		for(var i =0 ;i<10;i++){
			_wifiList.push({
				name:'wifi'+i,
				encryptionKey: 'atp',
				type:i%2==1,
				password:'',
				signal:i*19%100,
			});
		}
		_wifiCallBack(_wifiList);
	}
}

function RefreshWifiList(){
	var wifiList = WIFI.getIwlist();	 
	for(var i = 0; i < wifiList.length; i++) {
		
		var info = WIFI.getIwProperty(wifiList[i]); 
		var name = info["essid"];  $.log('name:'+name);
		var bo = false;
		for(var j = 0;j<_wifiList.length;j++){
			var data = _wifiList[j];
			if(data.name == name){
				bo = true;
				break;
			}
		}
		$.log(info["type"]);$.log(info["encryptionmode"]);$.log(info["signal"]);
		if(!bo){
			_wifiList.push({
				name:name,
				encryptionKey: info["encryptionmode"],
				type:info["type"],
				password:'',
				signal:parseInt(info["signal"]),
			});
		}
	}
	

	_wifiTimes ++; $.log(_wifiTimes +':'+_wifiMaxTimes);
	if(_wifiTimes > _wifiMaxTimes){
		if(_wifiTimer){clearInterval(_wifiTimer);_wifiTimer = null;}
		_wifiCallBack(_wifiList);
	}
}