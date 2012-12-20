var gDataList = false;		//全局数据的列表
var gRecordDataList = false;//全局可录制的列表
var gLockList = false;		//全局锁住列表
var typeList = false;		//全局分类函数
var CHANNLE_LOCK_PATH = "live_channel_lock";
var CHANNLE_FAV_PATH = "live_channel_fav";
//初始化数据
function initParseData(jsonData){
	gDataList = new Array();
	gRecordDataList = new Array();
	typeList = new Array();
	
	var liveChannelIds = $.getLoginInfo('liveChannelIds');
	var channelList = null;
	if(liveChannelIds){
		channelList = liveChannelIds.split(",");
	}
	
	//var isVoole = $.getConfigPathValue(config.sysPath,"isVoole","false");
	//config.isVoole = isVoole=="true";
	
	var TVLive = jsonData;
	var j = 0;
	var tv,dataObj,typeId;
	
	for(var i = 0;i<jsonData.releaseList.length;i++){				//遍历节目,将节目单加载到gDataList
		tv = TVLive.releaseList[i];
		var canWatch = findTvCanWatch(tv,channelList);				//判断该节目是否可以查看
		
		var addData = false;
		if(canWatch || config.showPayChannel){
			dataObj = changeTvToData(tv); $.log(canWatch+":"+dataObj.name);
			dataObj.isPay = !canWatch;
			if(config.showErrorLive ){			//判断是否隐藏不可以播的界面
				var canPlayLive = canPlay(dataObj);
				if(!canPlayLive){
					continue;		//如果不能播放,跳出这次循环
				}
			}
			
			addData = addVlive(dataObj);
			
			if(addData){
				j++;
				dataObj.arrayId = j;
				
				if(jsonData.isShowChannelNo != true){
					dataObj.displayId = j;
				}
				
				dataObj.lock = false;
				dataObj.typeName = '';
				gDataList.push(dataObj);
				
				//如果是可以看的就加入到录制列表
				if(canWatch){
					gRecordDataList.push(dataObj);
				}
			}
		}
	}
	if(config.sortType =='number'){
		gDataList.sort(descByNumber );
		gRecordDataList.sort(descByNumber );
	}else if(config.sortType == 'alphabetic'){
		gDataList.sort(descByAlphabetic);
		gRecordDataList.sort(descByAlphabetic);
	}
	
	if(config.showLock){	//分类加锁,去掉,使用频道加锁
		formatLockDataList();
	}
	
	var lockList = new Array();
	if(config.showLock || config.showChannelLock){		//去掉加锁数据
		for(var i = 0;i<gDataList.length;i++){
			var data = gDataList[i];
			if(data.isLock){
				gDataList.splice(i--, 1);
				lockList.push(data);
			}
		}
		gLockList　=　lockList;
		//gRecordDataList
		for(var i = 0;i<gRecordDataList.length;i++){
			var data = gRecordDataList[i];
			if(data.isLock){
				gRecordDataList.splice(i--, 1);
			}
		}
	}
	
	
	for(var i = 0;i<gDataList.length;i++){
		gDataList[i].arrayId = i+1;
	}
	for(var i = 0;i<gRecordDataList.length;i++){
		gRecordDataList[i].arrayId = i+1;
	}
	//gDataList = new Array();
	
	//初始化数据分类
	var tvTypeMap={},type;
	if(jsonData.typeList){
		for(var i = 0;i<jsonData.typeList.length;i++){
			var jsonType = jsonData.typeList[i];
			type = {};
			type.id = jsonType.id;
			type.name = jsonType.name;
			type.isLock = jsonType.isLock;
			type.imagePath = jsonType.imagePath;
			type.dataList = new Array();
			type.lock = false;
			typeList.push(type);
			tvTypeMap['type-'+jsonType.id] = typeList.length - 1;
		}
	}
	
	var typeIdList = null;
	//将数据放到各自的分类中
	for(var i = 0;i<gDataList.length;i++){
		dataObj = gDataList[i];
		typeIdList = new Array();
		if(dataObj.typeIdList && dataObj.typeIdList.length > 0){
			typeIdList = dataObj.typeIdList;
		}else{
			typeIdList.push(dataObj.typeId);
		}
		for(var j = 0;j<typeIdList.length;j++){
			typeId = parseInt(typeIdList[j]);
			if(typeId > 0 && !isNaN(tvTypeMap['type-'+typeId])){
				type=typeList[tvTypeMap['type-'+typeId]];
				dataObj.typeName = type.name;
				
				if(type.isLock) dataObj.lockType = true;
				
				dataObj.typeArrayId = type.dataList.length + 1;			//记录数据在分类中的顺序
				type.dataList.push(dataObj);
			}
		}
	}
	
	for(var i =0;i<typeList.length;i++){
		if(typeList[i].dataList.length == 0){
			typeList.splice(i--, 1);			//去除
		}
	}
	
	if(config.showLock || config.showChannelLock){		//去掉加锁数据
		type = {};
		type.id = -2;
		type.tar = 'lock';
		type.refresh = false;
		type.name = lang.live.lockTip;
		type.dataList = lockList;
		type.imageUrl = 'images/fav-logo.png';
		typeList.unshift(type);			//将加锁的数据添加到TYPE分类的第一项
	}
	
	//初始化收藏
	var collectList = initDataCollect(gDataList,config.showLock);
	type = {};
	type.id = -1;
	type.tar = 'favorite';
	type.refresh = false;
	type.name = lang.live.favorite_title;
	type.dataList = collectList;
	type.imageUrl = 'images/fav-logo.png';
	typeList.unshift(type);			//将我的收藏的数据添加到TYPE分类的第一项
	
	
	var allDataList = gDataList;
	if(config.client == 'ipworldtv'){		//所有频道显示订购的
		var allDataList = new Array();
		for(var i = 0;i<gDataList.length;i++){
			var ch = gDataList[i];
			if(!ch.isPay){
				allDataList.push(ch);
			}
		}
		
		type = {};
		type.id = 0;
		type.refresh = false;
		type.name = lang.live.allOrderType;
		type.dataList = allDataList;
		typeList.unshift(type);			//将的的收藏的数据添加到全部分类
	}else{
		type = {};
		type.id = 0;
		type.refresh = false;
		type.name = lang.live.allType;
		type.dataList = allDataList;
		typeList.unshift(type);			//将的的收藏的数据添加到全部分类
	}
	
	return true;
}

function initDataCollect(dataList,bo){
	var list =  db.getList();
	var data,obj;
	
	var collectList = new Array();
	for(var i = 0;i<dataList.length;i++){
		data = dataList[i];
		data.isCollect = 0;
		for(var j = 0;j<list.length;j++){
			obj = list[j];
			if(obj.id == data.id){
				data.isCollect = 1;
				if(bo && data.lock){
				
				}else{
					collectList.push(data);
				}
				break;
			}
		}
	}
	return collectList;
}

//初始化锁定频道
function formatLockDataList(){
	var list =lockDB.getList(); 
	var data,obj;
	for(var i = 0;i<gDataList.length;i++){
		var data = gDataList[i];
		for(var j = 0;j<list.length;j++){
			if(parseInt(data.id) == parseInt(list[j].id)){  $.log(data.name);
					data.isLock = true;
					break;
				}
		}
	}
	for(var i = 0;i<gRecordDataList.length;i++){
		var data = gRecordDataList[i];
		for(var j = 0;j<list.length;j++){
			if(parseInt(data.id) == parseInt(list[j].id)){  $.log(data.name);
				data.isLock = true;
				break;
			}
		}
	}
}


//根据频道,判断一个电视节目是否可以播放
function findTvCanWatch(tv,channelList){  
	var canWatch = true;
	var isShowFreeChannel = true; 
	
	
	if(tv.isFree==1)
	{
		isShowFreeChannel = config.isShowFreeChannel;
		if(isShowFreeChannel!=null)
		{
			return isShowFreeChannel;
		}
	}
	else if(tv.isFree==0){
		canWatch = false;
		if(channelList){
			for(var h=0;h<channelList.length;h++){
				if(tv.id==channelList[h]){
					canWatch = true;
					break;
				}
			}
		}
		
	}
	return canWatch;
}

function addVlive(data){
	if(config.isVoole){
		var playUrl = data.playUrl;
		return playUrl.indexOf('vlive')==0;
	}else{
		return true;
	}
	
	
	
	
}

function descByNumber(a,b){
	return a.displayId > b.displayId;
}

function descByAlphabetic(a,b){
	
	return a.name>b.name;
}

//将tv数据转换成页面格式的数据
function changeTvToData(tv){
	var dataObj={};
	dataObj.id = tv.id; 
	if(config.showChannelLock){dataObj.isLock = tv.isLock;}
	dataObj.isFree = tv.isFree;
	dataObj.name = tv.name;
	dataObj.adImage = tv.adImage;
	
	dataObj.image = tv.logo; 
	dataObj.bigImage = tv.logo;
	
	dataObj.fileId = tv.propMap.channel.channelId;
	dataObj.peerId = tv.propMap.channel.propMap.peerId;
	dataObj.ip = tv.propMap.channel.propMap.ip;
	dataObj.port = tv.propMap.channel.propMap.port;
	dataObj.channelId = tv.id;
	dataObj.propMap = tv.propMap;
	dataObj.type = tv.type;
	dataObj.typeId = tv.typeId;
	dataObj.playUrl = tv.playUrl;
	dataObj.bufferTime = tv.propMap.channel.bufferTime;
	dataObj.isP2p = tv.isP2p;
	dataObj.mode = tv.mode;
	dataObj.displayId = tv.sort;
	dataObj.isShowLogoOnBox  = tv.isShowLogoOnBox ;
	
	dataObj.typeIds = tv.typeIds;
	dataObj.typeIdList = tv.typeIdList;
	dataObj.accelerationIp = tv.propMap.channel.propMap.accelerationIp;
	dataObj.accelerationPort = tv.propMap.channel.propMap.accelerationPort;
	dataObj.accelerationKey = tv.propMap.channel.propMap.accelerationKey ;
	if(!dataObj.playUrl){
		dataObj.playUrl='';
	}
	return dataObj;
}


//根据频道,判断一个电视节目是否可以
function canPlay(data){
	
	var fileId = data.fileId;
	var peerId= data.peerId;
	var ip= data.ip;
	var port= data.port;
	var channelId = data.channelId;
	var playUrl = data.playUrl;
	
	var bo = true;
	if(data.isP2p){
		if(ip=="" || port=="" || fileId=="" || peerId=="" || ip==null || port==null || fileId==null || peerId==null || fileId=='undefined' || ip=='undefined' || port=='undefined')
		{
			bo = false;
		}
	}else{
		if(playUrl==null || playUrl==""){
			bo = false;
		}
	}
	
	return bo;
}

//刷新Channel
function refreshChannelData(jsonData){
	var TVLive = jsonData;
	var j = 0;
	var tv,dataObj,typeId;
	var map = new Object();
	for(var i = 0;i<jsonData.releaseList.length;i++){				//遍历节目,将节目单加载到gDataList
		tv = TVLive.releaseList[i];
		dataObj = changeTvToData(tv);
		map[dataObj.id] = 	dataObj;
	}
	return map;
}