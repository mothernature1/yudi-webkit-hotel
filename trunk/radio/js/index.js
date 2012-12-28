/*
* 
*/

var typeList = null;
var navList;
var textList;
var typeName = "";
var curPlayData;
$(function(){ 
	window.addEventListener("pagehide", pageHide, false);
	
	navList = new NavList({				//初始化左边导航
		id:'navBox',
		moveRight:function(){			//向右事件
			textList.setFocus();
		},
		onclick:function(data,id){
			$('#nav').html(data.name);
			if(data.dataList){
				typeName = data.name;
				textList.setDataList(data.dataList);
			}else{
				typeName = data.name;
				loadDataList(data,afterLoadDataList);
			}
		},
	});
	
	
	textList = new TextList({			//初始化右边导航
		id:'listBox',
		moveLeft:function(){
			navList.setFocus();
		},
		formatHtml:function(data,id){
			var con = '';
			var con =  '<div class="_textListNum">'+id+'</div><div class="_textListName"><a href="#" id="'+this.target+'-a-'+id+'">'+data.name+'</a></div>';
			return con;
		},
		onclick:function(data,id){
			$("#titleBox").html(data.name);
			$("#albumtBox").html(typeName);
			var imageUrl = $.getImageUrl(data.imgUrl,"http://img.v197.56.com/images/6/29/junda6i56olo56i56.com_127092371985hd.jpg");
			$("#radioBoxImg").attr("src",imageUrl);
			//$.log($.toJSON(data));
			curPlayData = data;
			play(data);
		}
	}); 
	
	initData();
	navList.setDataList(typeList,true);
	navList.Click(1);
});



function afterLoadDataList(data,list){
	data.dataList = list;
	textList.setDataList(data.dataList);
}




function pageHide(){
	
	IMPlayer.Stop();
}
