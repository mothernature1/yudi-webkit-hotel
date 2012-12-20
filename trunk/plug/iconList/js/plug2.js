var IconListMap = new Object();
var IconList = function(opt){
	this.target='iconList';
	this.id = '';			//div 对应的id
	this.disNum = 3;		//显示行数
	this.disRowNum =  4;	//每行显示个数
	this.itemHeight=163,
	this.splitHeight=469,
	this.onfocus = false;		//焦点在导航上
	this.onblur = false;		//焦点在item上
	this.onclick = false;		//点击事件
	this.moveRight = false;		//向右移动
	this.moveLeft = false;		//向左移动
	this.moveUp = false;		//向上移动
	this.moveDown = false;
	this.isAnimate = false;		//是否支持动画效果
	
	this.contentClass = '_iconListContent';
	this.contentClass2 = '_iconListContent2';
	this.iconListClass = '_icontListBox';
	this.splitBoxClass = '_iconListSplitBox';
	this.splitBarClass = '_iconListSplitBar';
	
	this.focusClass = '_iconListCurTd';
	this.normalClass = '_iconListTd';
	this.emptyClass = '_iconListTd0';
	this.trClass = '_iconListTr';
	
	this.opt=$.extend(this,opt);
	if(opt.formatHtml){
		this.formatHtml = opt.formatHtml;
	}
	
	this.curItemId = 0;
	this.focusItemId = 0;
	this.topItemId = 0;
	this.rowNum = 0;
	this.dataList = false;
	
	this.showSplit = false;
	
	
	this.init();
	IconListMap[this.target] = this;
	KEY.TYPE[this.target] = this.keyRecv;
}

IconList.prototype = {
	setFocus:function(id){
		var a = false; 
		if(id){
			$('#'+this.target+'-a-'+id).focus();
		}else{
			$('#'+this.target+'-a-'+this.focusItemId).focus();
		}
		a = document.activeElement;
		
	},
	init:function(){
		var html = '<div class="'+this.contentClass+'">';
			
			html += '<div class="'+this.iconListClass+'" id="'+this.target+'ListBox">';
			html += '</div>';
			
			html += '<div class="'+this.splitBoxClass+'"><div class="'+this.splitBarClass+'">&nbsp;</div></div>';	
		html += '</div>';
		
		$('#'+this.id).html(html);
	},
	appendDataList:function(list){
		if(list && list.length > 0){
			var num = this.rowNum;
			var len = this.dataList.length;
			for(var i = 0;i<list.length;i++){
				this.dataList.push(list[i]);
			}
			
			this.format();
			var con = '';
			var start = num + 1;
			var end =  parseInt((list.length -1)/this.disRowNum)+1+start;
			for(var i = start;i<end;i++){
				con+='<div class="'+this.trClass+'">';
				if(i<1 || i>this.rowNum){
					con+='&nbsp;';
				}else{
					con+=this.formatTrHtml(i);
				}
				con+='</div>';
			}
			var _this = this;
			var listBox = $('#'+this.target+'ListBox');
			listBox.append(con);
			$('a:gt('+length+')',listBox).focus(function(e) {
				_this.focus(this);
				
			}).blur(function(e){
				_this.blur(this);
				
			}).click(function(e){
				_this.click(this);
				return false;
			});
			this.topItemId  ++;
			listBox.stop().animate({top:0 - this.topItemId * this.itemHeight});
			this.changeSplit();
		}
	},
	setDataList:function(list,onfocus){
		if(!list) list = new Array();
		this.dataList = list;
		this.format();
		this.curItemId = 1;
		this.topItemId = 0;
		this.focusItemId = 1;
		
		var listBox = $('#'+this.target+'ListBox');
		listBox.css('top',0); 
		this.refreshContent();
		if(onfocus){
			$('#'+this.target+'-a-'+this.focusItemId).focus();
		}
	},
	format:function(){
		var length = this.dataList.length;
		this.rowNum = parseInt((length -1)/this.disRowNum)+1;
		if(this.rowNum > this.disNum){
			this.showSplit = true;
			this.splitAddValue = (this.splitHeight - 50)/(this.rowNum  - this.disNum);
			//this.splitBarHeight = this.splitHeight- (this.rowNum  - this.disNum)*this.splitAddValue;
		}else{
			this.showSplit = false;
		}
	},
	refreshContent:function(){
		var dataList = this.dataList; 
		var listBox = $('#'+this.target+'ListBox');
		var con = '';
		if(dataList && dataList.length > 0){
			var start = 1;
			var end = this.rowNum;
			
			for(var i = start;i<=end;i++){
				con+='<div class="'+this.trClass+'">';
				if(i<1 || i>this.rowNum){
					con+='&nbsp;';
				}else{
					con+=this.formatTrHtml(i);
				}
				con+='</div>';
			}
		}
		listBox.html(con);
		this.showSplitBox();
		
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
	formatTrHtml:function(id){
		var dataList = this.dataList;
		var start = (id-1)*this.disRowNum + 1;
		var end = start + this.disRowNum;
		var con = '';
		for(var i = start;i<end;i++){
			
			if(i<1 || i>dataList.length){
				con+='<div class="'+this.emptyClass+'">';
				con+='&nbsp;';
			}else{
				con+='<div class="'+this.normalClass+'">';
				con+=this.formatHtml(i,id,dataList[i-1]);
			}
			con+='</div>';
		}
		return con;
	},
	formatHtml:function(i,row,data){
		var con = '';
		con += '<div class="_iconListIcon"><a href="#" id="'+this.target+'-a-'+i+'" row="'+row+'"><img src="'+data.img+'"/></a></div>';
		return con;
	},
	showSplitBox:function(){
		var splitBox = $('#'+this.id+ ' .'+this.splitBoxClass); 
		if(this.showSplit){
			splitBox.show();
			this.changeSplit();
			return true;
		}else{
			splitBox.hide();
			return false;
		}
	},
	changeSplit:function(){
		if (this.showSplit) {
			$('#'+this.id+' .' + this.splitBarClass).css('top',this.splitAddValue * this.topItemId);
		}
	},
	focus:function(a){
		KEY.CURTYPE = this.target;
		var id = a.id;
		var idArray = id.split('-');
		var tar = parseInt(idArray[2]);
		var data = this.dataList[tar -1];
		var row = parseInt(a.getAttribute('row'));
		if(this.showSplit){
			this.moveItem(row,tar);
		}
		
		this.focusItemId = tar;
		this.changeSplit();
		
		if(this.isAnimate){
			hideIconListAnimate(a);
		}
		
		if(this.onfocus){
			this.onfocus(data,tar);
		}
		
	},
	blur:function(a){
		if(this.isAnimate){
			stopIconListAnimate(a);
		}
		if(this.onblur){
			this.onblur(this);
		}
	},
	click:function(a){
		if(this.onclick){
			var id = a.id;
			var idArray = id.split('-');
			var tar = parseInt(idArray[2]);
			var data = this.dataList[tar -1];
			this.onclick(data,tar);
		}
	},
	appendDiv:function(nId,listBox,pos){
		var totalNum = this.rowNum;
		var div = $('<div></div>').addClass(this.trClass);
		if(nId>totalNum){
			div.html('&nbsp;');
			if(pos){
				$(listBox).append(div);			//追加
			}else{		
				$(listBox).prepend(div);		//前插
			}
		}else{
			div.html(this.formatTrHtml(nId));
			if(pos){
				$(listBox).append(div);			//追加
			}else{		
				$(listBox).prepend(div);		//前插
			}
			var _this = this;
			$('a',div).focus(function(e) {
					_this.focus(this);
					
				}).blur(function(e){
					_this.blur(this);
					
				}).click(function(e){
					_this.click(this);
					return false;
				});
			}
	},
	noMove:function(){
		var listBox = $('#'+this.target+'ListBox');
		if(!listBox.is(":animated")){
			return true;
		}
		else{
			return false;
		};
	},
	moveItem:function(row,tar){
		var curRow = parseInt((this.focusItemId - 1)/this.disRowNum) + 1; 
		if (row == curRow ) {
			 this.changeSplit();return ;
		}
		
		var listBox = $('#'+this.target+'ListBox');
		if (row > curRow) { //向下
			if(row < this.rowNum && (row - this.topItemId == this.disNum)){
				this.topItemId  ++;
				listBox.stop().animate({top:0 - this.topItemId * this.itemHeight});
			}
		}else if(row<curRow){		//向上
			if(row>1 && (row - this.topItemId ==1)){
				this.topItemId  --;
				listBox.stop().animate({top:0 - this.topItemId * this.itemHeight});
			}
		}
		return ;
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
		var _this = IconListMap[idArray[0]];
		var tar = parseInt(idArray[2]);
		
		
		var col = $(a).attr('row');	//行数
		var row = parseInt((tar - 1)%_this.disRowNum) + 1;	//列数
		
		
		switch(key){
			case 38:    //向上
				var bo = _this.noMove();
				if(!bo) return false;
				col--;
				if(col>0){
					var id = (col - 1)*_this.disRowNum + row;
					$('#'+idArray[0]+'-a-'+id).focus();
				}else{
					if(_this.moveUp){
						_this.moveUp(_this);
						_this.doBlur(a);
					}
				}
			break;
			case 39:  //向右
				row++;
				if(row <= _this.disRowNum){
					var id = (col - 1)*_this.disRowNum + row;
					var a = $('#'+idArray[0]+'-a-'+id);
					if(a.length > 0){
						a.focus();
					}else{
						if(_this.moveRight){
							_this.moveRight(_this);
							_this.doBlur(a);
						}
					}
				}else{
					if(_this.moveRight){
						_this.moveRight(_this);
						_this.doBlur(a);
					}
				}
			break;
			case 40:	//向下
				var bo = _this.noMove();
				if(!bo) return false;
				var maxCol =_this.rowNum;	//最大行数
				col++;
				if(col <= maxCol){
					var id = (col - 1)*_this.disRowNum + row;
					if(id>_this.dataList.length){ id = _this.dataList.length;}
					$('#'+idArray[0]+'-a-'+id).focus();
				}else if(_this.moveDown){
					_this.moveDown(_this);
					_this.doBlur(a);
				}
			break;
			case 37:		//向左
				row--;
				if(row>0){
					var id = (col - 1)*_this.disRowNum + row;
					$('#'+idArray[0]+'-a-'+id).focus();
				}else{
					if(_this.moveLeft){
						_this.moveLeft(_this);
						_this.doBlur(a);
					}
				}
			break;
			case 13:		//回车
			break;
			case 27:
				if(KEY.KEY_RETURN){
					KEY.KEY_RETURN();
					return ;
				}
			default:
				if(KEY[keyName]){
					KEY[keyName](key,KEY.KEYBOARD,a);
					return ;
				}
			break;
		}
	}
}

function stopIconListAnimate(obj){
	$(obj).stop().fadeTo(0,1);
}

function showIconListAnimate(obj){
	$(obj).fadeTo("slow",1,function(){
			hideIconListAnimate(obj);});
}
function hideIconListAnimate(obj){
	$(obj).fadeTo("slow",0,function(){
			showIconListAnimate(obj);});
}