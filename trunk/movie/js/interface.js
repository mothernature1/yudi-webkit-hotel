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
			var movie = {
				actors:"彭于晏,柯宇纶,林辰唏",
				director:"林育贤",
				image:"/channel_resource/program/image/1334225583390.jpeg",
				region:"台湾",
				introduction:"阿信自出生便有惊人的天赋，但他患有轻微的小儿麻痺症，他的一只脚短于另一只脚。学校教练发现阿信在跳马的才能",
				name:'tv'+i+'_'+j,
				id:j,
				mode:4,
				playUrl:'rtmp://108.163.144.15/vod/media/mp4:hd2/fareha/fareha_22.mp4',
				
			}
			dataList.push(movie);
		}
		type.dataList = dataList;
		list.push(type);
	}
	typeList = list;
	
}

