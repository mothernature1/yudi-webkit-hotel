var typeList = false;		//全局分类函数

function initData(){
	var list = new Array();
	for(var i =1;i<5;i++){
		var type = {name:'type'+i,id:i};
		var dataList = new Array();
		for(var j = 1;j<i*9;j++){
			var channel = {
				id:j,
				name:'tv'+i+'_'+j,
				mode:4,
				url:'http://83.233.51.196:30080/Entry/AT-AljazeeraSport2',
				image:'',
			}
			dataList.push(channel);
		}
		type.dataList = dataList;
		list.push(type);
	}
	typeList = list;
	
}