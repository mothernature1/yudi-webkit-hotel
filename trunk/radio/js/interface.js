var typeList = false;		//全局分类函数

function initData(){
	var list = new Array();
	for(var i =1;i<5;i++){
		var type = {name:'type'+i,id:i};
		var dataList = new Array();
		for(var j = 1;j<i*9;j++){
			var channel = {name:'Septu'+i+'_'+j,path:'http://169.254.42.250/mod/jean.mp3/',mode:4,imgUrl:'',}
			dataList.push(channel);
		}
		type.dataList = dataList;
		list.push(type);
	}
	typeList = list;
	
}