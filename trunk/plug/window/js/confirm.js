var ConfirmMap = new Object();
var Confirm = function(opt){
	this.target = opt.target?opt.target:'confirm';
	this.click = opt.click?opt.click:false;		//点击事件
	this.beforeHide = opt.beforeHide?opt.beforeHide:false;		//隐藏事件
	this.title = opt.title?opt.title:lang.tip.warning,
	
	this.yes = opt.yes?opt.yes:lang.tip.sub,
	this.no = opt.no?opt.no:lang.tip.cancel,
	
	this.id = this.target+'ConfirmBox';
	this.focusA = null;
	this.init();
	ConfirmMap[this.target] = this;
	KEY.TYPE[this.target] = this.keyRecv;	
}

Confirm.prototype = {
	init:function(){
		var con = '';
		con += ' <div class="win-box" id="'+this.id+'">';
			con += '<div class="win-tit">'+this.title+'</div>';
			con += '<div class="win-content">&nbsp;</div>';
			con += '<div class="win-but"><a href="#" class="btn03" tar="yes">'+this.yes+'</a><a href="#" class="btn04" tar="no">'+this.no+'</a></div>';
		con += '</div>';
		$('body').append(con);
		
		var _this = this;
		$('#'+this.id+' a').focus(function(e) {
            KEY.CURTYPE = _this.target;
        }).blur(function(e) {
            
        }).click(function(e) {
            var tar = $(this).attr('tar');
			if(_this.beforeHide){
				_this.beforeHide();
			}
			_this.hide();
			
			if(_this.click){
				_this.click(tar == 'yes');
			}
			return false;
        });
	},
	show:function(tip,left,top){
		this.focusA = document.activeElement;
		$('#'+this.id+' .win-content').html(tip);
		if(left){
			$('#'+this.id).css('left',left);
		}
		if(top){
			$('#'+this.id).css('top',top);
		}
		$('#'+this.id).show();
		$('#'+this.id+' a').first().focus();
	},
	hide:function(){
		$(this.focusA).focus();
		$('#'+this.id).hide();
	},
	keyRecv:function(key,keyName,a){
		 if(keyName == 'KEY_RIGHT'){
			 $(a).next().focus();
		 }else if(keyName == 'KEY_LEFT'){
		 	$(a).prev().focus();
		 }
	},
}