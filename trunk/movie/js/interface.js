//var typeList = false;		//全局分类函数
var PAGESIZE = 20;
var SN =$.GetSN();
var INDEX_DATA_URL = '/channel_resource/gen/indexData.html';
var gTypeName = '';
var gTypeList = null;
var LockMap = {};
var typeList = {
		type:
		[
		{name:'Action', id:0},
        {name:'Drama', id:1},
        {name:'Horror', id:2},
		]
}

var filmList = {
	judul:[
		{id:1,typeId:0,name:'Bali',playUrl:'http://172.10.10.10/vod/bali.mkv',image:'http://172.10.10.10/knj/movie/images/m1.png',actors:"Stalone,Statham",director:"Nolan",region:"Indonesia",introduction:"Sinopsis",mode:4},
        {id:2,typeId:1,name:'Bunaken',playUrl:'http://172.10.10.10/vod/bunaken.mkv',image:'http://172.10.10.10/knj/movie/images/m2.png',actors:"Stalone,Statham",director:"Nolan",region:"Indonesia",introduction:"Sinopsis",mode:4},
        {id:3,typeId:1,name:'Bangkirai',playUrl:'http://172.10.10.10/vod/bangkirai.mkv',image:'http://172.10.10.10/knj/movie/images/m3.png',actors:"Stalone,Statham",director:"Nolan",region:"Indonesia",introduction:"Sinopsis",mode:4},
        {id:4,typeId:2,name:'Bromo',playUrl:'http://172.10.10.10/vod/bromo.mkv',image:'http://172.10.10.10/knj/movie/images/m1.png',actors:"Stalone,Statham",director:"Nolan",region:"Indonesia",introduction:"Sinopsis",mode:4},
        {id:5,typeId:2,name:'Nias',playUrl:'http://172.10.10.10/vod/nias.mkv',image:'http://172.10.10.10/knj/movie/images/m2.png',actors:"Stalone,Statham",director:"Nolan",region:"Indonesia",introduction:"Sinopsis",mode:4},
        {id:6,typeId:2,name:'Prambanan',playUrl:'http://172.10.10.10/vod/prambanan.mkv',image:'http://172.10.10.10/knj/movie/images/m2.png',actors:"Stalone,Statham",director:"Nolan",region:"Indonesia",introduction:"Sinopsis",mode:4},
		{id:7,typeId:2,name:'Prambanan',playUrl:'http://123.202.122.30/103.mkv',image:'',actors:"Stalone,Statham",director:"Nolan",region:"Indonesia",introduction:"Sinopsis",mode:4},
		{id:8,typeId:2,name:'Sam',playUrl:'http://flv-origin.alarab.net//flv/34849.flv?start=0',image:'',actors:"Stalone,Statham",director:"Nolan",region:"Indonesia",introduction:"Sinopsis",mode:4},
		{id:9,typeId:2,name:'fire_demo',playUrl:'http://192.168.1.20:8080/Movie/mp4/lab2.mp4',image:'',actors:"Stalone,Statham",director:"Nolan",region:"Indonesia",introduction:"Sinopsis",mode:4},
	]
}
var category,film;
function initData(){
    category = typeList.type;
	film = filmList.judul;
    for(var i = 0;i<category.length;i++){
		category[i].arrayId = i + 1;
		category[i].displayId = i + 1;
	}
	var list = new Array();
    
	for(var i =0;i<category.length;i++){
		var type = category[i];
        list.push(type);
        
		var dataList = new Array();
		for(var j = 0;j<film.length;j++){
			var channel = film[j];
            if(channel.typeId==type.id){
                dataList.push(channel);
            }
            
		}
		type.dataList = dataList;
	}
	typeList = list;
	
}

