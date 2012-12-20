var dataList = false;
$(function(){ 
 $.log("navigator.userAgent:"+navigator.userAgent);
	initData(afterInitData) ;
	
	
});


function afterInitData(list){
	dataList = list;
	
	var con = '',i,j,data,a;
	for(var i = 0;i<dataList.length;i++){
		j = i + 1;
		data = dataList[i];
		con +='<div class="li">'+formatItemHtml(data,j)+'</div>';
	}
	$('#content').html(con);
	$('#content a').focus(function(e){
		$(this).parent().removeClass('li').addClass('curLi');
	}).blur(function(e){
		$(this).parent().removeClass('curLi').addClass('li');
	}).click(function(e){
		var idArr = this.id.split('-');
		var tar = parseInt(idArr[2]);
		doClick(dataList[tar - 1]);
		return false;
	});
	$('#nav-a-1').focus();
}

function formatItemHtml(data,j){
	var con = '';
	con +='<div class="text"><a href="#" id="nav-a-'+j+'">'+data.name+'</a></div>'; 
	return con;
}

function doClick(data){
	$.go(config.project+'/'+data.url,data.url);
}

function ajax(){
	
	var url = config.webUrl+"/channel/stb/getProgramType2.htmlll?category="+1;
	$.ajax({
		url:url,
		type:'GET',
		dataType:"json",
       	async: false, 
		timeout: 5000,
		success:function(list){//客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数
			$.log('aaa');
		},
		error:function(e){
			$.log('error');
		}
	});
	
	$.log('finish');
}