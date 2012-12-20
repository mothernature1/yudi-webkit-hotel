var LatticeBoxMap = new Object();
var gLatticeObj = null;
var LatticeBox = function(opt){
	this.target = opt.target?opt.target:'lattice';
	this.id = '';			//div 对应的id
	this.onfocus = false;		//焦点在导航上
	this.onblur = false;		//焦点在item上
	this.onclick = false;		//点击事件
	this.moveRight = false;		//向右移动
	this.moveLeft = false;		//向左移动
	this.moveUp = false;		//向上移动
	this.moveDown = false;
	
	this.defaultImg = '';
	this.opt=$.extend(this,opt);
	if(opt.formatHtml){
		this.formatHtml = opt.formatHtml;
	}
	this.dataList = null;
	this.lastFocusId = false;
	this.init();
	LatticeBoxMap[this.target] = this;
	KEY.TYPE[this.target] = this.keyRecv;
}

LatticeBox.prototype = {
	init:function(){
		var html = '';
		html += '<div class="_latticeBox" id="'+this.id+'Box">';
		html += '</div>';
		
		$('#'+this.id).html(html);
	},
	setDataList:function(list){
		this.dataList = list;
		this.refreshContent();
	},
	setFocus:function(){
		$('#'+this.target+'-a-1-1').focus();
	},
	setFocusUp:function(){
		if(this.dataList.length > 0){
			$('#'+this.target+'-a-'+this.dataList.length+'-1').focus();
			return true;
		}
		return false;
	},
	refreshContent:function(){
		var con = '',ii,jj,map,data,list;
		for(var i=0;i< this.dataList.length;i++){
			ii = i+1;
			map = this.dataList[i];
			list = map.list;
			con += ' <div class="tr">';
			for(var j =0;j<list.length;j++){
				jj = j + 1;
				data = list[j];
				con += '<div class="td'+ii+jj+'">';
					con += this.formatHTML(data,ii,jj,map);
				con += '</div>';
			}
			con += '</div>';
		} 
		$('#'+this.id+'Box').html(con);
		var _this = this;
		$('#'+this.id+'Box a').focus(function(e) {
              _this.focus(this);
        }).blur(function(e){
			_this.blur(this);
			
		}).click(function(e){
			_this.click(this);
			return false;
		});
	},
	formatHTML:function(data,i,j,map){
		var con = '';
		var img = $.getImageUrl(data.image);
		con += '<div class="tleft"><img class="'+map.cls+'" onerror="javascript:this.src=\''+this.defaultImg+'\'" src="'+img+'"/></div>';
		con += '<div class="tright">';
			con += '<div class="tname">'+data.name+'</div>';
			
		con += '</div>';
		con += '<a href="#" id="'+this.target+'-a-'+i+'-'+j+'">&nbsp;</a>';
		return con;
	},
	focus:function(a){
		KEY.CURTYPE = this.target;
		var par = $(a).parent();
		par.find('img').css('opacity',1);
		if(this.onfocus){
			var idArr = a.id.split('-');
			var i = parseInt(idArr[2]);
			var j = parseInt(idArr[3]);
			var type = this.dataList[i - 1]; 
			var data = type.list[j - 1];
			this.onfocus(data,i,j);
		}
	}
	,blur:function(a){
		var par = $(a).parent();
		par.find('img').css('opacity',0.5);
		if(this.onblur){
			var idArr = a.id.split('-');
			var i = parseInt(idArr[2]);
			var j = parseInt(idArr[3]);
			var type = this.dataList[i - 1];
			var data = type.dataList[j - 1];
			this.onblur(data,i,j);
		}
	}
	,click:function(a){
		if(this.onclick){
			var idArr = a.id.split('-');
			var i = parseInt(idArr[2]); $.log(i);
			var j = parseInt(idArr[3]); $.log(j);
			var type = this.dataList[i - 1];  
			var data = type.list[j - 1];
			this.onclick(data,type.tar);
		}
	}
	,doBlur:function(a){
		var a2 = document.activeElement;
		if(a2!=a && KEY.CURTYPE == this.target){
			KEY.CURTYPE = false;
		}
	}
	,keyRecv:function(key,keyName,a){
		var id = a.id;
		var idArray = id.split('-');
		var _this = LatticeBoxMap[idArray[0]];
		
		_this.lastFocusId = id;
		
		var col = parseInt(idArray[2]);	//行数
		var row = parseInt(idArray[3]);;	//列数
		
		if(keyName == 'KEY_DOWN'){			//向下按
			var next_col = col +1;
			var nextId=0;
			if(next_col <=_this.dataList.length ){
				var type = _this.dataList[next_col - 1];
				if(row>type.list.length){
					nextId = type.list.length;
				}else{
					nextId = row;
				}
			}
			
			if(nextId>0){
				$('#'+_this.target+'-a-'+next_col+'-'+nextId).focus();
			}else{
				if(_this.moveDown){
					_this.moveDown();
					_this.doBlur(a);
				}
			}
		}else if(keyName == 'KEY_UP'){		//向上按
			var prev_col = col - 1;
			var prev_id = 0;
			if(prev_col > 0){
				var type = _this.dataList[prev_col - 1];
				if(row>type.list.length){
					prev_id = type.list.length;
				}else{
					prev_id = row;
				}
			}
			if(prev_id>0){
				$('#'+_this.target+'-a-'+prev_col+'-'+prev_id).focus();
			}else{
				if(_this.moveUp){_this.moveUp();}
			}
		}else if(keyName == 'KEY_RIGHT'){
			var next_row = row+ 1;
			var type = _this.dataList[col - 1];
			if(next_row<= type.list.length){
				$('#'+_this.target+'-a-'+col+'-'+next_row).focus();
			}else{
				if(_this.moveRight){_this.moveRight();}
			}
		}else if(keyName == 'KEY_LEFT'){
			var prev_row = row -1;
			if(prev_row > 0){
				$('#'+_this.target+'-a-'+col+'-'+prev_row).focus();
			}else{
				if(_this.moveLeft){_this.moveLeft();}
			}
		}else{
			if(KEY[keyName]){
				KEY[keyName](key,KEY.KEYBOARD,a);
				return ;
			}
		}
	},
}