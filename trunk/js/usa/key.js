
KEY.KEY_LEFT = function(key,keyName,a){
	if($('#listBox .list_con').is(":animated")){return}
	var idArr = a.id.split('-')
	var id=Number(idArr[2])-1;
	var type = idArr[0];
	if(type == 'nav'){
		var list_left=parseInt($("#listBox .list_con").css("left"));
		var a_length=$('#listBox .list_con a').length;

		var prevA=$(a).prev();
		if(list_left<0 && id+7<=a_length){
			var l_left=list_left+172;
			$('#listBox .list_con').animate({"left":l_left},function(){
				prevA.focus()	
			});		
		}else{
			prevA.focus()	
		}
	}
}

KEY.KEY_RIGHT = function(key,keyName,a){
	if($('#listBox .list_con').is(":animated")){return}
	var idArr = a.id.split('-');
	var id=Number(idArr[2])+1;
	var type = idArr[0];
	
	if(type == 'nav'){
		var	nextA=$(a).next();
		if(nextA.length > 0){
			if(id>7){
				var l_left=-172*(id-7);
				$('#listBox .list_con').animate({"left":l_left},function(){
					nextA.focus()	
				});	
			}else{
				nextA.focus()
			}
		}
		else{
	//	$('#listBox a').first().focus();
		}
	}
}

KEY.KEY_UP = function(key,keyName,a){
	var idArr = a.id.split('-');
	var type = idArr[0];
	if(type == 'nav'){
		
		$('#selBox').hide();
		$('#hotel_picA').focus();
	}
}

KEY.KEY_DOWN = function (key,keyName,a){
	
	if(a.id == 'hotel_picA'){
		$('#nav-a-' +lastFocusId).focus();
	}
}

KEY.KEY_RETURN = function(){ 
	//return false;
    $.gotoPage('./knj/index.html');
}







