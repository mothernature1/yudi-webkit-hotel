var typeList = false;		//全局分类函数
var PAGESIZE = 20;
var SN =$.GetSN();
var INDEX_DATA_URL = '/channel_resource/gen/indexData.html';
var gTypeName = '';
var gTypeList = null;
var LockMap = {};

function initData(){
	var list = new Array();
	for(var i =1;i<5;i++){
		var type = {name:'type'+i,id:i};
		var dataList = new Array();
		for(var j = 1;j<i*9;j++){
			var muisc = {
				
				list:[{name:"111",path:"http://169.254.42.250/mod/jean.mp3"},
					  {name:"222",path:"http://169.254.42.250/mod/bad.mp3"},
					  {name:"3333",path:"http://169.254.42.250/mod/heal.mp3"}] ,
				image:"/channel_resource/program/image/1334225583390.jpeg",
				name:'tv'+i+'_'+j,
				id:j,
			}
			dataList.push(muisc);
		}
		type.dataList = dataList;
		list.push(type);
	}
	typeList = list;
	
}

