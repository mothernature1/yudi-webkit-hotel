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
		{name:'Rock', 	id:0},
        {name:'Clasic', id:1},
        {name:'POP', 	id:2},
		]
}

var musiclist = {
	judul:	[
					{id:1,typeId:0,name:"Coba 1",path:"http://192.168.0.117/mod/jean.mp3",image:"images/pause.png"},
					{id:2,typeId:1,name:"Coba 2",path:"http://192.168.0.117/mod/bad.mp3",image:"images/pause.png"},
					{id:3,typeId:1,name:"Coba 2",path:"http://192.168.0.117/mod/bad.mp3",image:"images/pause.png"},
					{id:4,typeId:1,name:"Coba 2",path:"http://192.168.0.117/mod/bad.mp3",image:"images/pause.png"},
					{id:5,typeId:2,name:"Coba 3",path:"http://192.168.0.117/mod/heal.mp3",image:"images/pause.png"},
			]

}

var category,music;

function initData(){
    category = typeList.type;
	music = musiclist.judul;
    for(var i = 0;i<category.length;i++){
		category[i].arrayId = i + 1;
		category[i].displayId = i + 1;
	}
	var list = new Array();
    
	for(var i =0;i<category.length;i++){
		var type = category[i];
        list.push(type);
        
		var dataList = new Array();
		for(var j = 0;j<music.length;j++){
			var muisc = music[j];
            if(muisc.typeId==type.id){
                dataList.push(muisc);
            }
            
		}
		type.dataList = dataList;
	}
	typeList = list;
	
}

