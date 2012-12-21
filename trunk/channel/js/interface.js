var typeList = {
		type:
		[
		{name:'LOKAL TV', id:1},
		]
}

var chList = {
	ch:[
		{id:1,typeId:1,name:'TRANS TV',url:'udp://225.0.0.1:1234',image:'images/transtv.png'},
		{id:2,typeId:1,name:'RCTI',url:'udp://225.0.0.2:1234',image:'images/rcti.png'},
		{id:3,typeId:1,name:'SCTV',url:'udp://225.0.0.3:1234',image:'images/sctv.png'},
		{id:4,typeId:1,name:'TVRI',url:'udp://225.0.0.4:1234',image:'images/tvri.png'},
	]
}

var category,tv;
function initData(){
    category = typeList.type;
	tv = chList.ch;
	
	for(var i = 0;i<category.length;i++){
		category[i].arrayId = i + 1;
		category[i].displayId = i + 1;
	}
	
	var list = new Array();
	for(var i =0;i<category.length;i++){
		var type = category[i];
        list.push(type);
		
	var dataList = new Array();
	for(var j = 0;j<tv.length;j++){
		var channel = tv[j];
            if(channel.typeId==type.id){
                dataList.push(channel);
            }
		}
			type.dataList = dataList;
		}
		typeList = list;
	}

