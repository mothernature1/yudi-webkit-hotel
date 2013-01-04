var dataList = null;
var curItemId = 1;
$(function(){ 
	//dataList = new Array();
	//dataList.push({name:'img1',path:'images/1.png'});
	//dataList.push({name:'img2',path:'images/2.jpg'});
	//dataList.push({name:'img3',path:'images/3.png'});
	
	var dataListText = $.getParam("dataList","");
	$.log("pic list" + dataListText);
	eval('dataList = '+ dataListText)
	curItemId = parseInt($.getParam("curId","1"));//当前播放ak
	
	$.log("当前第几个：" + curItemId);

	
	var con = '',data,j;
	for(var i = curItemId-1;i<=curItemId+1;i++){
		if(i>dataList.length){
			j = 1;
		}else if(i<1){
			j = dataList.length;
		}else{
			j = i;
		}
		var picRect = FILE.GetPicRect(dataList[j-1].path);
		if(picRect!=""){
			var picItem = picRect.split(",");
			if(parseInt(picItem[0])>=2000 || parseInt(picItem[1])>=2000){
				dataList[j-1].show = "false";
				con += '<div>图片太大，无法显示</div>';
			}else{
				dataList[j-1].show = "true";
				con += '<div><img  src="'+dataList[j-1].path+'"/></div>';
			}
		}else{
			dataList[j-1].show = "true";
			con += '<div><img  src="'+dataList[j-1].path+'"/></div>';
		}
		
		//con += '<div><img src="'+dataList[j-1].path+'"/></div>';
	}
	$('#imgList').html(con);
});