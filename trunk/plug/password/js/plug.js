var PasswordBoxMap = new Object();
var PasswordBox = function(opt){
	this.target='passwordBox';
	
	this.topTip = lang.tip.systemTip;
	this.tip = lang.tip.passwordTip;
	this.back = lang.tip.back;
	this.sub = lang.tip.sub;
	
	this.onfocus = false;		//焦点在导航上
	this.onblur = false;		//焦点在item上
	this.password = false;		
	this.lastFocus = null;
	
	this.clickListener = null;
	this.opt=$.extend(this,opt);
	
	this.init();
	PasswordBoxMap[this.target] = this;
	KEY.TYPE[this.target] = this.keyRecv;
}

PasswordBox.prototype = {
	init:function(){
		var html = '';
		html += '<div id="passwordBox">';
			html += '<div class="passwordTop"><div class="passwordTitle">'+this.topTip+'</div> </div>';
			html += '<div class="passwordTip">'+this.tip+':	</div>';
			html += ' <div class="passwordInput"><input type="password" value="" id="'+this.target+'-input"/></div>';
			html += '<div class="passwordBtn">';
				html += '<div><a class="btn05" tar="back" id="'+this.target+'-back" href="#">'+this.back+'</a></div>';
				html += '<div><a class="btn06" tar="sub" id="'+this.target+'-sub" href="#">'+this.sub+'</a></div>';
			html += '</div>';
		html += '</div>';
		$('body').append(html);
		
		var _this = this;
		$('#passwordBox input').focus(function(e) {
            KEY.CURTYPE = _this.target;
        }).click(function(e){
			var val = $('#'+this.target+'-input').val();
			if(val == _this.password){
				_this.hide();
				if(_this.clickListener){_this.clickListener()}
			}else{
				showGTip(lang.tip.passwordError,5);
			}
		});
		$('#passwordBox a').focus(function(e) { 
			
            KEY.CURTYPE = _this.target;
        }).click(function(e) {
            var tar = $(this).attr('tar'); 
			if(tar == 'back'){
				_this.hide();
			}else{
				var val =$('#'+_this.target+'-input').val();
				if(val == _this.password){
					_this.hide();
					if(_this.clickListener){_this.clickListener()}
				}else{
					showGTip(lang.tip.passwordError,5);
				}
			}
			return false;
        });
		
		$.log($('#passwordBox a').length);
	},
	show:function(){
		this.lastFocus = document.activeElement;
		$('#passwordBox').show();
		$('#'+this.target+'-input').val('').focus();
	},
	doBlur:function(a){
		var a2 = document.activeElement;
		if(a2!=a && KEY.CURTYPE == this.target){
			KEY.CURTYPE = false;
		}
	},
	hide:function(){
		$(this.lastFocus).focus();
		this.doBlur();
		$('#passwordBox').hide();
	},
	keyRecv:function(key,keyName,a){
		var id = a.id;
		var idArray = id.split('-');
		var _this = PasswordBoxMap[idArray[0]];
		var tar = idArray[1];
		if(keyName == 'KEY_RETURN'){		//返回键
			_this.hide();
		}else if(keyName == 'KEY_DOWN'){
			if(tar == 'input'){
				$('#'+_this.target+'-back').focus();
			}
		}else if(keyName == 'KEY_UP'){
			if(tar == 'back' || tar == 'sub'){
				$('#'+_this.target+'-input').focus();
			}
		}else if(keyName == 'KEY_RIGHT'){
			if(tar == 'back' ){
				$('#'+_this.target+'-sub').focus();
			}
		}else if(keyName == 'KEY_LEFT'){
			if(tar == 'sub' ){
				$('#'+_this.target+'-back').focus();
			}else if(tar == 'input'){ 
				var input = $('#'+_this.target+'-input'); $.log(input);
				var val = input.val();
				if(val.length > 0){
					input.val(val.substring(0,val.length - 1));
				}
				return false;
			}
		}
		return true;
	},
}