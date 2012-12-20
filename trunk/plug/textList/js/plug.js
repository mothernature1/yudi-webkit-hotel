var TextListMap = new Object();
var TextList = function(opt){
	this.target='iconList';
	this.id = '';			//div 对应的id
	this.disNum = 8,		//显示行数
	this.splitHeight = 432;		//分割条高度
	
	this.contentClass = '_textListContent';
	this.listboxClass = '_textListBox';
	this.splitBoxClass = '_textListSplitBox';
	this.splitBarClass  = '_textListSplitBar';
	this.emptyClass = '_textListItem0';
	this.focusClass = '_textListCurItem';
	this.normalClass = '_textListItem';
	
	this.onfocus = false;		//焦点在导航上
	this.onblur = false;		//焦点在item上
	this.onclick = false;		//点击事件
	this.moveRight = false;		//向右移动
	this.moveLeft = false;		//向左移动
	this.moveUp = false;		//向上移动
	this.moveDown = false;		//向左
	
	
	this.opt=$.extend(this,opt);
	if(opt.formatHtml){
		this.formatHtml = opt.formatHtml;
	}
	this.curItemId = 0;
	this.focusItemId = 0;
	this.topItemId = 0;
	this.dataList = false;
	this.showSplit = false;
	
	this.init();
	TextListMap[this.target] = this;
	KEY.TYPE[this.target] = this.keyRecv;
}

TextList.prototype = {
	init:function(){
		var html = '<div class="'+this.contentClass+'">';
			html += '<div class="'+this.listboxClass+'" id="'+this.target+'ListBox">';
				
			html += '</div>';
			html += '<div class="'+this.splitBoxClass+'"><div class="'+this.splitBarClass+'" id="'+this.target+'SplitBox">&nbsp;</div></div>';	
		html += '</div>';
		
		$('#'+this.id).html(html);
	},
	clear:function(){
		this.focusItemId = 1;
		this.curItemId = 1;
		this.topItemId = 0;
		this.showSplit = false;
		this.hideSplitBox();
		
		var listBox = $('#'+this.target+'ListBox');
		listBox.html('');
	},
	setFocus:function(id){  
		var a = false; 
		if(id){
			$('#'+this.target+'-a-'+id).focus();
		}else{
			$('#'+this.target+'-a-'+this.focusItemId).focus();
		}
	},
	setDataList:function(list,onfocus){
		if(!list) list = new Array();
		this.dataList = list;
		this.format();
		this.focusItemId = 1;
		this.curItemId = 1;
		this.topItemId = 0;
		this.refreshContent();

		if(onfocus){
			this.setFocus();
		}
	},
	setType:function(type,onfocus){
		this.focusItemId = type.focusItemId;
		this.curItemId = type.curItemId;
		this.topItemId = type.topItemId;
		this.dataList = type.dataList;
		this.refreshContent();

		if(onfocus){
			this.setFocus();
		}
	},
	getData:function(id){
		if(id){
			return this.dataList[id - 1];
		}else{
			return this.dataList[this.curItemId - 1];
		}
	},
	getType:function(){
		var type = {
			focusItemId:this.focusItemId,
			curItemId:this.curItemId,
			topItemId:this.topItemId,
			dataList:this.dataList,
		}
		return type;
	},
	format:function(){
		var length = this.dataList.length;
		if(length > this.disNum){
			this.showSplit = true;
			this.splitAddValue = (this.splitHeight - 50)/(length  - this.disNum);
		}else{
			this.showSplit = false;
		}
	},
	refreshContent:function(){
		var dataList = this.dataList;
		var start = this.topItemId;
		var end = start + this.disNum + 2;
		var length = dataList.length; 
		var j,data;
		var con = ''; 
		if(dataList.length > 0){
			for(var i = start;i<end;i++){
				j = i;
				if(j<1 || j>length){
					con+='<div class="'+this.emptyClass+'">';
					con+='&nbsp;';
				}else{
					con+='<div class="'+this.normalClass+'">';
					data =dataList[j-1];
					con+=this.formatHtml(data,j);
				}
				con+='</div>';
			}
		}else{
		}
		var listBox = $('#'+this.target+'ListBox');
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
	hideSplitBox:function(){
		var splitBox = $('#'+this.target+ 'SplitBox'); 
		splitBox.parent().hide();
	},
	showSplitBox:function(){
		var splitBox = $('#'+this.target+ 'SplitBox'); 
		if(this.showSplit){
			splitBox.parent().show();
			this.changeSplit();
			return true;
		}else{
			splitBox.parent().hide();
			return false;
		}
	},
	changeSplit:function(){
		if (this.showSplit) {
			var topItemId = this.topItemId;
			var max = this.dataList.length - this.disNum;
			if(topItemId>max){
				topItemId = max;
			}
					
			var top = topItemId * this.splitAddValue;
			var splitBox = $('#'+this.target+ 'SplitBox'); 
			splitBox.css('top',top);
		}
	},
	focus:function(a){
		KEY.CURTYPE = this.target;
		var id = a.id;
		var idArray = id.split('-');
		var tar = parseInt(idArray[2]);
		var data = this.dataList[tar -1];
		if(this.showSplit){
			this.moveItem(tar);
		}
		this.focusItemId = tar;
		
		var par = $(a).parent().parent();
		par.removeClass(this.normalClass).addClass(this.focusClass);
		if(this.onfocus){
			this.onfocus(data,tar);
		}
	},
	blur:function(a){
		var id = a.id;
		var idArray = id.split('-');
		var tar = parseInt(idArray[2]);
		var data = this.dataList[tar -1];
		
		var par = $(a).parent().parent();
		par.removeClass(this.focusClass).addClass(this.normalClass);
		
		if(this.onblur){
			this.onblur(data,tar);
		}
	},
	click:function(a){
		var id = a.id;
		var idArray = id.split('-');
		var tar = parseInt(idArray[2]);
		var data = this.dataList[tar -1];
		if(this.onclick){
			this.onclick(data,tar);
		}
	},
	appendDiv:function(nId,listBox,bo){
		var totalNum = this.dataList.length;
		var div = $('<div></div>')
		if(nId>totalNum || nId < 1){
			div.addClass(this.emptyClass);
			div.html('&nbsp;');
			if(bo){
				$(listBox).append(div);			//追加
			}else{		
				$(listBox).prepend(div);		//前插
			}
		}else{
			div.addClass(this.normalClass);
			var data = this.dataList[nId - 1];
			div.html( this.formatHtml(data,nId)); 
			if(bo){
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
	moveItem:function(tar){
		if (tar == this.focusItemId) { this.changeSplit();return ;}
		var listBox = document.getElementById(this.target+'ListBox');
		var childNodes = listBox.childNodes;
		var dataList = this.dataList;
		var totalNum = dataList.length;
		if (tar > this.focusItemId) { //向下
			var bo = 0;
			if(tar - this.topItemId == this.disNum && tar != totalNum){		//当焦点不是在最上面的时候
				bo = 1;
			}else if(tar == this.topItemId + this.disNum + 1){			//当焦点是第一个时
				bo = 2;
			}
			if (bo>0) { //
				if( childNodes.length  >= this.disNum + 2 ){
					listBox.removeChild(childNodes[0]);		//删除第一个节点
				}
				var dis = 2;
				if(bo==2){dis =1;};
				var nId = tar+dis;
				this.appendDiv(nId,listBox,true);
				this.topItemId++;
				this.changeSplit();
			}
		}else if(tar<this.focusItemId){ //向上
			this.focusItemId = tar;
			
			var bo = 0;
			if(tar - this.topItemId == 1 && tar!= 1){		//当焦点不是在最上面的时候
				bo = 1;
			}else if(tar == this.topItemId){			//当焦点是第一个时
				bo = 2;
			}
			if(bo>0){
				if( childNodes.length  >= this.disNum + 2){
					listBox.removeChild(childNodes[childNodes.length - 1]);		//删除最后一个节点
				}
				
				var dis = 2;
				if(bo==2){dis =1;};
				
				var pId = tar-dis;
				this.appendDiv(pId,listBox,false);
				this.topItemId--;
				this.changeSplit();
			}
		}
	},
	keyRecv:function(key,keyName,a){
		var id = a.id;
		var idArray = id.split('-');
		var _this = TextListMap[idArray[0]];
		var tar = parseInt(idArray[2]);
		
		if(keyName == 'KEY_RETURN'){
			if(KEY.KEY_RETURN){
				KEY.KEY_RETURN(key,KEY.KEYBOARD,a);
				return ;
			}
		}
		
		switch(key){
			case 38:    //向上
				tar--;
				if(tar>0){
					$('#'+idArray[0]+'-a-'+tar).focus();
				}else{
					if(_this.moveUp){
						_this.moveUp(_this);
					}
				}
			break;
			case 39:  //向右
				if(_this.moveRight){
					_this.moveRight(_this);
				}
			break;
			case 40:	//向下
				var maxCol =_this.dataList.length;	//最大行数
				tar++;
				if(tar <= maxCol){
					$('#'+idArray[0]+'-a-'+tar).focus();
				}else if(_this.moveDown){
					_this.moveDown(_this);
				}
			break;
			case 37:		//向左
				if(_this.moveLeft){
					_this.moveLeft(_this);
				}
			break;
			case 13:		//回车
			
			break;
		}
	}
}