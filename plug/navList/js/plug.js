var NavListMap = new Object();
var NavList = function(opt){
	this.target = opt.target?opt.target:'navList';
	this.id = '';			//div 对应的id
	
	this.onfocus = opt.onfocus?opt.onfocus:false;		//焦点在导航上
	this.onblur = opt.onblur?opt.onblur:false;		//焦点在item上
	this.onclick = opt.onclick?opt.onclick:false;		//点击事件
	this.moveRight = opt.moveRight?opt.moveRight:false;		//离开事件
	this.moveLeft = opt.moveLeft?opt.moveLeft:false;		//离开事件
	this.moveUp = opt.moveUp?opt.moveUp:false;		//离开事件
	this.moveDown = opt.moveDown?opt.moveDown:false;		//离开事件
	this.keyDone = opt.keyDone?opt.keyDone:false;		//离开事件
	this.beforeOnclick =  opt.beforeOnclick?opt.beforeOnclick:false;		//离开事件;
	this.disNum = 8;
	this.itemHeight = 52;
	
	$.extend(this,opt);				//
	this.curItemId = 0;
	this.focusItemId = 0;
	this.curTopItemId = 0;
	this.showSplit = false;
	this.splitAddValue = 0;
	this.dataList = null;
	if(opt.formatHtml){
		this.formatHtml = opt.formatHtml;
	}
	
	this.init();
	NavListMap[this.target] = this;
	KEY.TYPE[this.target] = this.keyRecv;		
}

NavList.prototype = {
	init:function(){
		var html = '';
		html += '<div class="_navBox">';
			html += '<div class="_navBox2">';
				html += '<div class="_navList" id="'+this.target+'List">';
				html += '</div>';
			html += '</div>';
			html += '<div class="_navTop">&nbsp;</div>';
			html += '<div class="_navBottom">&nbsp;</div>';
		html += '</div>';
		$('#'+this.id).html(html);
	},
	setDataList:function(list,onfocus){
		if(!list) list = new Array();
		this.dataList = list;
		this.focusItemId = 1;
		this.curItemId = 0;
		this.topItemId = 0;
		
		$('#'+this.target+'List').css('top',0);
		$('#'+this.id+' ._navTop').hide();
		$('#'+this.id+' ._navBottom').hide();
		
		this.refreshContent();
		if(onfocus){
			$('#'+this.target+'-a-'+this.focusItemId).focus();
		}
	},
	setFocus:function(id){
		if(this.dataList.length > 0){
			if(id){
				$('#'+this.target+'-a-'+id).focus();
			}else{
				$('#'+this.target+'-a-'+this.focusItemId).focus();
			}
		}
	},
	Click:function(id){
		if(this.dataList.length > 0){
			if(id){
				$('#'+this.target+'-a-'+id).click();
			}else{
				$('#'+this.target+'-a-'+this.focusItemId).click();
			}
		}
	},
	getData:function(id){
		if(this.dataList.length > 0){
			if(id){
				return this.dataList[id];
			}else{
				return this.dataList[this.curItemId-1];
			}
		}
	},
	refreshContent:function(){
		var con = '';
		if(this.dataList){
			for(var i=0;i<this.dataList.length;i++){
				con +='<div class="_navLi">'+this.formatHtml(this.dataList[i],i+1)+'</div>';
			}
		}
		
		var listBox = $('#'+this.target+'List');
		listBox.html(con);
		var _this = this;
		$('a',listBox).focus(function(e) {
            _this.focus(this);
			
        }).blur(function(e){
			_this.blur(this);
			
		}).click(function(e){
			_this.click(this);
			return false;
		});
	},
	formatHtml:function(data,j){
		return '<div><a id="'+this.target+'-a-'+j+'" href="#">'+data.name+'</a></div>';
	},
	focus:function(a){
		KEY.CURTYPE = this.target;
		
		var par = a.parentNode.parentNode;
		var id = a.id;
		var idArray = id.split('-');
		var tar = parseInt(idArray[2]);
		var data = this.dataList[tar -1];
		
		$(par).removeClass('_navLi').removeClass('_navClickLi').addClass('_navCurLi');
		this.changePos(tar);
		this.focusItemId = tar;
		
		if(this.onfocus){
			this.onfocus(data,tar);
		}
	},
	blur:function(a){
		var par = a.parentNode.parentNode;
		var id = a.id;
		var idArray = id.split('-');
		var tar = parseInt(idArray[2]);
		
		var data = this.dataList[tar - 1];
		if(tar == this.curItemId){
			$(par).removeClass('_navCurLi').addClass('_navClickLi');
		}else{
			$(par).removeClass('_navCurLi').addClass('_navLi');
		}
		if(this.onblur){
			this.onblur(data,tar);
		}
	},
	click:function(a){
		var id = a.id;
		var idArray = id.split('-');
		var tar = parseInt(idArray[2]);
		var data = this.dataList[tar -1];
		
		if(this.beforeOnclick){		//如果点击事件之前触发
			var bo = this.beforeOnclick(data);
			if(!bo){
				return false;
			}
		}
		
		if(this.curItemId != tar){
			var a= $('#'+this.target+'-a-'+this.curItemId);
			if(a.length > 0){
				a.parent().parent().removeClass('_navClickLi').addClass('_navLi');
			}
		}
		this.curItemId  = tar;
		if(this.onclick){
			this.onclick(data,tar);
		}
	},
	changePos:function(tar){
		if(this.disNum >= this.dataList.length)  return ;
		
		if(tar != this.focusItemId ){
			var listBox = $('#'+this.target+'List');
			
			if(tar - this.curTopItemId == this.disNum && tar!=this.dataList.length){
				this.curTopItemId ++;
				listBox.stop().animate({top:0 - this.curTopItemId * this.itemHeight});
			}else if(tar - 1 == this.curTopItemId && tar != 1){
				this.curTopItemId --;
				listBox.stop().animate({top:0 - this.curTopItemId * this.itemHeight});
			}
			
			if(tar - this.curTopItemId >= this.disNum-1 && this.curTopItemId != this.dataList.length - this.disNum){
				$('#'+this.id+' ._navBottom').show();
			}else{
				$('#'+this.id+' ._navBottom').hide();
			}
			if(tar-this.curTopItemId == 2 && this.curTopItemId > 0){
				$('#'+this.id+' ._navTop').show();
			}else{
				$('#'+this.id+' ._navTop').hide();
			}
		}
	},
	isAnimate:function(){
		var listBox = $('#'+this.target+'List');
		return listBox.is(":animated");
	},
	keyRecv:function(key,keyName,a){
		var id = a.id;
		var idArray = id.split('-');
		var _this = NavListMap[idArray[0]];
		var tar = parseInt(idArray[2]);
		
		if(keyName == 'KEY_RETURN'){		//返回键
			if(KEY.KEY_RETURN){
				KEY.KEY_RETURN(key,KEY.KEYBOARD,a);
				return ;
			}
		}
		if(keyName == 'KEY_DOWN'){			//向下按
			if(_this.isAnimate()){return ;}
			tar ++;
			if(tar<=_this.dataList.length){
				$('#'+_this.target+'-a-'+tar).focus();
			}else{
				if(_this.moveDown){
					KEY.CURTYPE = false;
					_this.moveDown();
				}
			}
		}else if(keyName == 'KEY_UP'){		//向上按
			
			if(_this.isAnimate()){return ;}
			tar --;
			if(tar >0){
				$('#'+_this.target+'-a-'+tar).focus();
			}else{
				if(_this.moveUp){
					
					_this.moveUp();
				}
			}
		}else if(keyName == 'KEY_RIGHT'){
			if(_this.moveRight){
				_this.moveRight();
				var a2 = document.activeElement;
				if(a2!=a && KEY.CURTYPE == _this.target){
					KEY.CURTYPE = false;
				}
			}
		}else if(keyName == 'KEY_LEFT'){
			if(_this.moveLeft){
				_this.moveLeft();
			}
		}else{    
			if(KEY[keyName]){
				KEY[keyName](key,KEY.KEYBOARD,a);
				return ;
			}
		}
	},
}