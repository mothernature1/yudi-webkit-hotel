var messageDB;

$(function(){
	messageDB = new DB({name:'message_db',});
	$(".mes").append('<span class="newmes_tip"></span>');
	var customerName = $.getLoginInfo("customerName");
	if(customerName){
		$('#mes-a-1 p').first().html('HI:'+customerName);
	}else{
		$('#mes-a-1 p').first().html('HI:'+_sn);
	}
	$('#mes-a-1 p').eq(1).html(lang.index.message+'(0)');
	
	$('#mes-a-1').focus(function(e) {
        KEY.CURTYPE = false;
    }).click(function(e) {
		$.gotoPage("message/index.html");
        return false;
    });
	
	var url = 	config.webUrl + '/channel/stb/getMessage.htm?sn='+_sn;
	var ll=0;
	$.ajax({
		url:url,
		dataType:"json",
		success:function(obj){
			var list = obj.messageList;
			var DBlist = messageDB.getList();
			var hasNewMessage = false;
			for(var i = 0;i<list.length;i++){		//查询数据库，将已经查看的信息加上标识
				var mes = list[i];
				mes.hasSee = messageDB.isExist(mes.id);
				if(!mes.hasSee){
					ll++;
				}
				$.log(ll)
			}
			
			for(var i = 0;i<list.length;i++){	//遍历信息列表，如果有还没有查看的信息，将hasNewMessage设true
				
				
				var mes = list[i];
				if(!mes.hasSee){
					hasNewMessage = true;break;
				}
				
			}
			if(hasNewMessage){
				$(".mes .newmes_tip").show();
			}else{
				
				$(".mes .newmes_tip").hide();
			}
			
			
			$.setSession("messageList",$.toJSON(list)); $.log($.getSession("messageList"));
			$('#mes-a-1 p').eq(1).html(lang.index.message+'('+ll+')');
		},error:function(){
			
		}
	});
	
	messageDB = new DB({name:'message_db',});
	

});
