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
					{id:1,typeId:0,name:"Coba 1",image:"images/pause.png",
						playList:[{name:"song 1",path:"http://192.168.1.99:8080/music/1.mp3"},
								{name:"song 2",path:"http://192.168.1.99:8080/music/2.mp3"},
								{name:"song 3",path:"http://192.168.1.99:8080/music/3.mp3"}]},
					{id:2,typeId:1,name:"Coba 2",image:"images/pause.png",
						playList:[{name:"song 4",path:"http://192.168.1.99:8080/music/jean.mp3"},
								{name:"song 5",path:"http://192.168.1.99:8080/music/jean.mp3"},
								{name:"song 6",path:"http://192.168.1.99:8080/music/jean.mp3"}]},
					{id:3,typeId:1,name:"Coba 3",image:"images/pause.png",
						playList:[{name:"song 7",path:"http://192.168.1.99:8080/music/jean.mp3"},
								{name:"song 8",path:"http://192.168.1.99:8080/music/jean.mp3"},
								{name:"song 9",path:"http://192.168.1.99:8080/music/jean.mp3"}]},
					{id:4,typeId:1,name:"Coba 4",image:"images/pause.png",
						playList:[{name:"song 10",path:"http://192.168.1.99:8080/music/jean.mp3"},
								{name:"song 11",path:"http://192.168.1.99:8080/music/jean.mp3"},
								{name:"song 12",path:"http://192.168.1.99:8080/music/jean.mp3"}]},
					{id:5,typeId:2,name:"Coba 5",image:"images/pause.png",
						playList:[{name:"song 13",path:"http://192.168.1.99:8080/music/jean.mp3"},
								{name:"song 14",path:"http://192.168.1.99:8080/music/jean.mp3"},
								{name:"song 15",path:"http://192.168.1.99:8080/music/jean.mp3"}]},
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

