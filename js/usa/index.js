var dataList = null;
var _sn = false;
var lastFocusId = false;



$(function(){ 

	
	dataList = initData();
	var data,con='',j;
	for(var i = 0;i<dataList.length;i++){
		data = dataList[i]; j = i + 1;
		con +='<a href="#" id="nav-a-'+j+'"><img src="'+data.image+'"/><p>'+data.name+'</p> </a>';
	}
	
	$('#listBox .list_con').html(con);
	$('#listBox a').click(function(e) {
		
		var data = dataList[$(this).index()];
		var l = $(this).position().left+26;
		
		if(data.tar == 'setting'){
			$.Location('/yudiHotel/setting/index.html');
		}else{
			if(data.tar == 'tv' || data.tar =='movie'|| data.tar =='radio'|| data.tar =='music'|| data.tar =='weather' || data.tar=='signage' || data.tar=='digitalSignage'){
			$.go(config.project+'/'+data.url,data.url);
		}
			
		}
		return false;
    }).focus(function(e) {
		var idArr = this.id.split('-');
		var id = parseInt(idArr[2]);
		var data = dataList[id - 1];
		lastFocusId = id;
		var list_left=parseInt($("#listBox .list_con").css("left"));
		var a_length=$("#listBox a").length;
		
		var l = $(this).position().left+26+list_left;		
	
		var l2 = l -26;
		$('#selBox').show();
		
		$('#selBox').css('left',l); 
		$('#navTip').css('left',l2).html('+&nbsp;'+data.disName);
		$.log(id)
		
		
    }).blur(function(e) {
       
    });
	$('#listBox a').first().focus();

	window.addEventListener("pageshow", pageshow, false);
});

function pageshow(){
	initWeather();
}