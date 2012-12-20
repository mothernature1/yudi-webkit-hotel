var IndexBoxMap = new Object();
var IndexBox = function(opt){
	this.target = opt.target?opt.target:'indexBox';
	this.id = '';			//div 对应的id
	this.onfocus = false;		//焦点在导航上
	this.onblur = false;		//焦点在item上
	this.onclick = false;		//点击事件
	this.moveRight = false;		//向右移动
	this.moveLeft = false;		//向左移动
	this.moveUp = false;		//向上移动
	this.moveDown = false;
	this.dataMap = null;
	
	this.opt=$.extend(this,opt);
	
	this.init();
	IndexBoxMap[this.target] = this;
	KEY.TYPE[this.target] = this.keyRecv;
}

IndexBox.prototype = {
	init:function(){
		var con = '<div class="_indexBox">';
			con += '<div class="hitItem1" id="'+this.target+'1"></div>';
			con += '<div class="hitItem2">';
				con += ' <div class="hitItem2Top" id="'+this.target+'2"></div>';
				con += ' <div class="hitItem2Bottom" id="'+this.target+'3"></div>';
			con += '</div>';
			con += '<div class="hitItem3" id="'+this.target+'4"></div>';
		con += '</div>';
		
		$('#'+this.id).html(con);
	},
	setData:function(dataMap){
		if(!dataMap) dataMap = new Object();
		this.dataMap = dataMap;
		
		for(var i in dataMap){
			var list = dataMap[i].list;
			var con='',data,m;
			for(var j = 0;j<list.length;j++){
				con += '<div>';
				data = list[j]; m = j + 1;
				var img = $.getImageUrl(data.image);
				con += '<img src="'+img+'"/>';
				con += '<a href="#" id="'+this.target+'-'+i+'-'+m+'">&nbsp;</a>';
				con += '</div>';
			}
			$('#'+this.target+i).html(con);
		}
		var _this = this;
		$('#'+this.id+' a').focus(function(e) {
            KEY.CURTYPE = _this.target;
        }).click(function(e) {
            _this.doClick(this);
			return false;
        });
	},
	doClick:function(a){
		var id = a.id;
		var idArray = id.split('-');
		var col = parseInt(idArray[1]);	//行数
		var row = parseInt(idArray[2]);;	//列数
		
		
		var list = this.dataMap[col].list;
		var data = list[row-1]; 
		if(this.onclick){
			this.onclick(data,this.dataMap[col].tar);
		}
	},
	setFocus:function(){
		var a = $('#'+this.id +' a').first();
		if(a){
			a.focus();
			return true;
		}else{
			return false;
		}
	},
	doBlur:function(a){
		var a2 = document.activeElement;
		if(a2!=a && KEY.CURTYPE == this.target){
			KEY.CURTYPE = false;
		}
	},
	keyRecv:function(key,keyName,a){
		var id = a.id;
		var idArray = id.split('-');
		var _this = IndexBoxMap[idArray[0]];
		var col = parseInt(idArray[1]);	//行数
		var row = parseInt(idArray[2]);;	//列数
		
		$.log(col);$.log(row); $.log(keyName);
		if(keyName == 'KEY_DOWN'){			//向下按
			if(col==1 || col==3){
				if(_this.moveDown ){
					_this.moveDown ();
					_this.doBlur(a);
				}
			}else if(col ==2){
				if(_this.dataMap[3] && _this.dataMap[3].list.length > 0){
					var list  = _this.dataMap[3].list;
					var r = 1;if(list.length == 3 && row==2){r = 2}
					$('#'+_this.target+'-3-'+r).focus()
				}
			}else if(col ==4){
				if(row ==2){
					if(_this.moveDown ){
						_this.moveDown ();
						_this.doBlur(a);
					}
				}else{
					var list  = _this.dataMap[4].list;
					if(list.length > 1){
						$('#'+_this.target+'-4-'+2).focus()
					}else{
						if(_this.moveDown ){
							_this.moveDown ();
							_this.doBlur(a);
						}
					}
				}
			}
		}else if(keyName == 'KEY_LEFT'){
			if(col == 2 || col == 3){
				row--;
				if(row == 0){
					if(_this.dataMap[1] && _this.dataMap[1].list.length > 0){$('#'+_this.target+'-1-1').focus()}
				}else{$('#'+_this.target+'-'+col+'-'+row).focus()}
			}else if(col == 4){
				if(row == 1){
					if(_this.dataMap[2] && _this.dataMap[2].list.length > 0){$('#'+_this.target+'-2-'+_this.dataMap[2].list.length).focus()}
					else if(_this.dataMap[3] && _this.dataMap[3].list.length > 0){$('#'+_this.target+'-3-'+_this.dataMap[3].list.length).focus()}
					else if(_this.dataMap[1] && _this.dataMap[1].list.length > 0){$('#'+_this.target+'-1-'+_this.dataMap[2].list.length).focus()}
				}else if(row ==2){
					if(_this.dataMap[3] && _this.dataMap[3].list.length > 0){$('#'+_this.target+'-3-'+_this.dataMap[3].list.length).focus()}
					else if(_this.dataMap[2] && _this.dataMap[2].list.length > 0){$('#'+_this.target+'-2-'+_this.dataMap[2].list.length).focus()}
					else if(_this.dataMap[1] && _this.dataMap[1].list.length > 0){$('#'+_this.target+'-1-'+_this.dataMap[2].list.length).focus()}
				}
			}
		}else if(keyName == 'KEY_RIGHT'){		//向右移
			if(col == 1){
				if(_this.dataMap[2] && _this.dataMap[2].list.length > 0){$('#'+_this.target+'-2-1').focus()}
				else if(_this.dataMap[3] && _this.dataMap[3].list.length > 0){$('#'+_this.target+'-3-1').focus()}
				else if(_this.dataMap[4] && _this.dataMap[4].list.length > 0){$('#'+_this.target+'-4-1').focus()}
			}else if(col == 2 || col == 3){
				var list  = _this.dataMap[col].list;
				row ++;
				if(row <=  list.length){$('#'+_this.target+'-'+col+'-'+row).focus()}
				else{
					if(_this.dataMap[4] && _this.dataMap[4].list.length > 0){
						var list = _this.dataMap[4].list;
						if(col == 2){
							$('#'+_this.target+'-4-1').focus()
						}else {
							$('#'+_this.target+'-4-'+list.length).focus()
						}
					}
				}
			}
		}else if(keyName == 'KEY_UP'){
			if(col == 3){
				if(_this.dataMap[2] && _this.dataMap[2].list.length > 0){
					var list  = _this.dataMap[2].list;
					if(row <3){
						$('#'+_this.target+'-2-1').focus()
					}else{$.log('list::'+list.length);
						if(list.length > 1){ 
							$('#'+_this.target+'-2-2').focus()
						}else{
							$('#'+_this.target+'-2-1').focus()
						}
					}
				}
			}else if(col == 4){
				if(row ==2){
					$('#'+_this.target+'-4-1').focus();
				}
			}
		}
	}
}