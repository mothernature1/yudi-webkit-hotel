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
	this.appendListener = false;
	
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
	this.dataInfo = false;
	this.loadData = false;
	
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
	getFocusData:function (){
		if(this.dataList.length > 0){
			return this.dataList[this.focusItemId - 1]
		}
		return false;
	},
	init:function(){
		var html = '<div class="'+this.contentClass+'">';
			
			html += '<div class="'+this.iconListClass+'" id="'+this.target+'ListBox">';
			html += '</div>';
			
			html += '<div class="'+this.splitBoxClass+'"><div class="'+this.splitBarClass+'">&nbsp;</div></div>';	
		html += '</div>';
		
		$('#'+this.id).html(html);
	},
	
	setDataList:function(list,onfocus){
		if(!list) list = new Array();
		this.dataList = list;
		this.format();
		this.curItemId = 1;
		this.topItemId = 0;
		this.focusItemId = 1;
		
		var listBox = $('#'+this.target+'ListBox');
		this.refreshContent();
		if(onfocus){
			$('#'+this.target+'-a-'+this.focusItemId).focus();
		}
	},
	loadDataList:function(data){
		this.dataObj = data;
		if(this.dataObj.dataInfo){
			this.setDataInfo(this.dataObj.dataInfo);
		}else{
			var _this = this;		//如果还没有加载失败
			var _oldDataObj = this.dataObj;
			this.loadDataListListener(this.dataObj,1,function(dataInfo){
				if(_this.dataObj != _oldDataObj) return ;
				_this.dataObj.dataInfo = dataInfo;
				_this.setDataInfo(dataInfo);
			});
		}
	},
	setDataInfo:function(dataInfo,onfocus){
		this.dataInfo = dataInfo; 
		this.setDataList(this.dataInfo.dataList,onfocus);
		this.loadData = false;
	},
	appendDataInfo:function(dataInfo,obj){
		hideGTip();  
		this.loadData = false;
		if(this.dataInfo != dataInfo) return ;
		
		var rowNum = this.rowNum;
		
		this.dataInfo.totalPage= obj.totalPage;
		this.dataInfo.count = obj.count;
		this.dataInfo.page = obj.page;
		for(var i = 0;i<obj.dataList.length;i++){				//将数据追加到type.dataInfo里面
			this.dataInfo.dataList.push(obj.dataList[i]);
		}
		$.log(this.dataInfo.dataList.length);
		this.format();$.log(this.splitAddValue);
		this.showSplitBox();
		this.changeSplit();
		
		var curRow = parseInt((this.focusItemId - 1)/this.disRowNum) + 1; 
		var listBox = $('#'+this.target+'ListBox');
		if(rowNum == curRow){				//如果在最后一行
			listBox.children().first().remove();
			listBox.children().last().remove();
			listBox.css('top',0);
			listBox.animate({top:-this.itemHeight});
			var nId = rowNum+ 1;;
			this.appendDiv(nId,listBox,true);
			var nId = rowNum+ 2;;
			this.appendDiv(nId,listBox,true);
			this.topItemId++;
		}else if(rowNum  == curRow + 1){
			listBox.children().last().remove();
			var nId = rowNum+ 2;
			this.appendDiv(nId,listBox,true);
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
			var start = this.topItemId;
			var end = start + this.disNum + 1;
			
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
		
		this.focusItemId  = tar;
		
		if(this.dataInfo ){			//如果支持翻页
			if(row == this.rowNum && this.dataInfo.page < this.dataInfo.totalPage && !this.loadData){
				this.loadData = true;
				showGTip(lang.tip.loadData,5);
				var page = this.dataInfo.page+1; $.log(page);
				
				
				var _this = this;		//如果还没有加载失败
				var _oldDataObj = this.dataObj;
				this.loadDataListListener(this.dataObj,page,function(dataInfo){ 
					if(_this.dataObj != _oldDataObj) return ;
					_this.appendDataInfo(_this.dataObj.dataInfo,dataInfo);
				});

				
				
			}
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
		if(nId>totalNum  || nId < 1){
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
		if (row == curRow) { this.changeSplit();return ;}
		
		var listBox = $('#'+this.target+'ListBox'); 
		if (row > curRow) { //向下
			if(row == this.topItemId + this.disNum  && row!=this.rowNum){		//当焦点不是在最下面的时候
				listBox.children().first().remove();
				listBox.css('top',0);
				listBox.animate({top:-this.itemHeight});
				var nId = row+parseInt((this.disNum+1)/2);
				this.appendDiv(nId,listBox,true);
				this.topItemId++;
			}
		}else if(row < curRow){		//向上
			if(row == this.topItemId + 1 && row!=1){ 
				listBox.children().last().remove(); 
				listBox.css('top',0-2 * this.itemHeight);
				listBox.animate({top:-this.itemHeight});
				var pId = row-parseInt((this.disNum+1)/2);
				this.appendDiv(pId,listBox,false);
				this.topItemId--;
			}
		}
		
		this.changeSplit();
		return false;
		
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

