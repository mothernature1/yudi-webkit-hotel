var FormMap = new Object();
var Form = function(opt){
	this.target = opt.target?opt.target:'form';
	this.id = '';			//div 对应的id
	this.inputList = new Array();
	this.btnList = new Array();
	this.moveRight = opt.moveRight?opt.moveRight:false;		//离开事件
	this.moveLeft = opt.moveLeft?opt.moveLeft:false;		//离开事件
	this.moveUp = opt.moveUp?opt.moveUp:false;		//离开事件
	this.moveDown = opt.moveDown?opt.moveDown:false;		//离开事件// JavaScript Document
	this.inputLength  = 0;

	$.extend(this,opt);		
	this.init();
	FormMap[this.target] = this;
	KEY.TYPE[this.target] = this.keyRecv;	
}

Form.prototype = {
	init:function(){
		var inputList = this.inputList;
		var btnList = this.btnList;
		var con = '',input,btn,j;
		con += '<div class="_form">';
		
		var inputLength = 0;
		for(var i = 0;i<inputList.length;i++){
			input = inputList[i]; j = i+1;
			con += '<div class="item">';
				con += '<div class="il">'+input.name+':</div>';
				var val = input.value?input.value:'';
				if(input.type == 'tip'){
					con += '<div class="ir" tar="'+input.id+'">'+val+'</div>';
				}else{
					inputLength ++;
					con += '<div class="ir"><input value="'+val+'" class="input" type="'+this.type+'" tid="'+j+'" id="'+this.target+'-input-'+inputLength+'" tar="'+input.id+'"/></div>';
				}
			con += '</div>';
		}
		this.inputLength = inputLength;
		
		var ml = 10;
		if(btnList.length == 1){
			ml = 240;
		}else if(btnList.length == 2){
			ml = 135;
		}else if(btnList.length == 3){
			ml = 10;
		}
			con += '<div class="btn" style="margin-left:'+ml+'px">';
			for(var i = 0;i<btnList.length;i++){
				btn = btnList[i];j = i +1;
				con +='<div><a class="'+btn.cls+'" id="'+this.target+'-btn-'+j+'"  href="#">'+btn.name+'</a></div>';
			}
			con += '</div>';
		con += '</div>';
		
		$('#'+this.id).html(con);
		var _this = this;
		$('#'+this.id+' input,a').focus(function(e) {  
			if(this.id.indexOf(_this.target) == 0){
           	 KEY.CURTYPE = _this.target;
			}
        });
	},
	setFocus:function(){
		$('#'+this.target+'-input-1').focus();
	},
	getValue:function(id){
		var input = $('#'+this.id +' input[tar="'+id+'"]');
		if(input.length > 0){
			return input.val();
		}
		return v;
	},
	setValue:function(id,val){
		var input = $('#'+this.id +' input[tar="'+id+'"]');
		if(input.length > 0){
			input.val(val)
		}else{
			$('#'+this.id +' div[tar="'+id+'"]').html(val);
		}
	},
	keyRecv:function(key,keyName,a){
		var id = a.id;
		var idArray = id.split('-');
		var _this = FormMap[idArray[0]];
		var type = idArray[1]
		var tar = parseInt(idArray[2]);
		
		
		
		if(keyName == 'KEY_RETURN'){		//返回键
			if(KEY.KEY_RETURN){
				KEY.KEY_RETURN(key,KEY.KEYBOARD,a);
				return ;
			}
		}else if(keyName == 'KEY_DOWN'){			//向下按
			if(type == 'input'){		//如果是社会秩序窗口
				if(tar < _this.inputLength){
					tar ++;
					$('#' + _this.target+'-input-'+tar).focus();
				}else{
					var id = parseInt((_this.btnList.length - 1)/2)+1;
					$('#' + _this.target+'-btn-'+id).focus();
				}
			}
		}else if(keyName == 'KEY_UP'){		//向上按
			if(type == 'input'){		//如果是社会秩序窗口
				if(tar > 1){
					tar --;
					$('#' + _this.target+'-input-'+tar).focus();
				}else{
				}
			}else if(type == 'btn'){
				$('#' + _this.target+'-input-'+_this.inputLength).focus();
			}
		}else if(keyName == 'KEY_RIGHT'){
			if(type == 'btn'){
				if(tar < _this.btnList.length){
					tar++;
					$('#' + _this.target+'-btn-'+tar).focus();
				}else{
				}
			}
		}else if(keyName == 'KEY_LEFT'){
			if(type == 'btn'){
				if(tar >1){
					tar--;
					$('#' + _this.target+'-btn-'+tar).focus();
				}else{
					_this.moveLeft();
					var a2 = document.activeElement;
					if(a2!=a && KEY.CURTYPE == _this.target){
						KEY.CURTYPE = false;
					}
				}
			}else if(type == 'input'){
				_this.moveLeft();
				var a2 = document.activeElement;
				if(a2!=a && KEY.CURTYPE == _this.target){
					KEY.CURTYPE = false;
				}
			}
		}else if(keyName == 'KEY_OK'){
			if(type == 'input'){
				var input = _this.inputList[tar - 1];
				if(input.type != 'int'){
					KEYBOARD.show({
						id:a.id,
					});
				}
			}else if(type=='btn'){
				var map = {},input;
				var inputLength = 0;
				for(var i=1;i<=_this.inputList.length;i++){
					input = _this.inputList[i -1];
					if(input.type == 'tip'){
						map[input.id] = input.value;
					}else{
						inputLength++;
						map[input.id] = $('#' + _this.target+'-input-'+inputLength).val();
					}
					
				}
				var btn = _this.btnList[tar - 1];
				btn.onclick(map);
			}
		}
	}
}