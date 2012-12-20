/*
*	输入整数弹出一个选择窗口
*/
var numberInput = {
	a:false,
	min:0,
	max:100,
	val:50,
	hasInit:false,
	init:function(){},
	show:function(a){
		if(!this.hasInit){
			this.init();this.hasInit = true;
		}
		this.a = a;
		this.min = parseInt($(a).attr('min'));
		this.max = parseInt($(a).attr('max'));
		this.val = parseInt($(a).val());
		
		var left = $(a).position().left; $.log(left);
		var top = $(a).position().top; $.log(top);
		$('#inputList').css({left:left,top:top});
		$('#inputList').show();
		
	},
}