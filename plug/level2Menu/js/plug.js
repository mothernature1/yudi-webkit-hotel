var Level2MenuMap = new Object();
var gLevel2MenuObj = null;
var Level2Menu = function(opt){
	this.target = opt.target?opt.target:'level2Menu';
	this.id = '';			//div 对应的id
	this.focusType = opt.focusType?opt.focusType:false;		//焦点在导航上
	this.blurType = opt.blurType?opt.blurType:false;		//焦点在item上
	this.clickType = opt.clickType?opt.clickType:false;		//点击事件
	this.focusItem = opt.focusItem?opt.focusItem:false;		//焦点在导航上
	this.blurItem = opt.blurItem?opt.blurItem:false;		//焦点在item上
	this.clickItem = opt.clickItem?opt.clickItem:false;		//点击事件
	this.moveRight = opt.moveRight?opt.moveRight:false;		//离开事件
	this.moveUp = opt.moveUp?opt.moveUp:false;		//离开事件
	
	this.disTypeNum = 8;			//显示一级分类个数
	this.disItemNum = 6;			//显示二级分类个数
	this.typeHeight = 52;	
	this.itemHeight = 52;	
	
	this.opt=$.extend(this,opt);
	this.typeList = new Array();
	
	this.curTypeId = 0;
	this.focusTypeId = 0; 
	this.curTopTypeId = 0;
	this.curItemId = 0;
	this.focusItemId = 0;
	this.curTopItemId = 0;
	this.lastFocusId = false;
	this.level2Show = false;		//二级菜单是否显示
	this.init();
	Level2MenuMap[this.target] = this;
	KEY.TYPE[this.target] = this.keyRecv;
}

Level2Menu.prototype = {
	init:function(){
		var html = '';
		html += '<div class="_level2MenuBox">';
			html += '<div class="top">&nbsp;</div>';
			html += '<div class="top2">&nbsp;</div>';
			html += '<div class="content">';
				html += '<div class="list" id="'+this.id+'Box">';
				html += '</div>';
			html += '</div>';
			html += ' <div class="bottom">&nbsp;</div>';
			html += '<div class="bottom2">&nbsp;</div>';
		html += '</div>';
		$('#'+this.id).html(html);
	}
	,setFocus:function(){
		$('#'+this.lastFocusId).focus();
	},
	Click:function(id){
		if(this.typeList.length > 0){
			if(id){
				$('#'+this.target+'-type-'+id).click();
			}else{
				$('#'+this.target+'-type-'+1).click();
			}
		}
	}
	,getType:function(){
		return this.typeList[this.curTypeId - 1];	
	}
	,getData:function(){
		var type = this.getType();
		if(type.dataList && type.dataList.length > 0){ 
			var data = type.dataList[this.curItemId - 1];
			return data;
		}
		return false;
	}
	,getCurType:function(){
		return this.typeList[this.curTypeId - 1];	
	}
	,setDataList:function(list,onfocus){ if(!list) list = new Array();
		this.typeList = list;
		this.curTypeId = -1;
		this.focusTypeId = 1;
		this.curTopTypeId = 0;
		
		$('#'+this.id+'Box').css('top',0);
		$('#'+this.id+' .top').hide();
		$('#'+this.id+' .top2').hide();
		$('#'+this.id+' .bottom').hide();
		$('#'+this.id+' .bottom2').hide();
		
		this.refreshTypeContent();
		if(onfocus){
			$('#'+this.target+'-type-'+this.focusTypeId).focus();
		}
	}
	,refreshTypeContent:function(){
		var con = '',type,ii,jj,data;
		for(var i=0;i<this.typeList.length;i++){
			ii = i+1;
			type = this.typeList[i];
			if(type.dataList && type.dataList.length > 0){
				con += ' <div class="item"><span><a href="#" id="'+this.target+'-type-'+ii+'">'+type.name+'</a></span><span class="down">&nbsp;</span></div>';
				var dataList = type.dataList;
				con += '<div class="content2">';
					con += '<div class="list2">';
					for(var j =0;j<dataList.length;j++){
						data = dataList[j];jj=j+1;
						con += '<div class="item2"><span><a href="#" id="'+this.target+'-item-'+ii+'-'+jj+'">'+data.name+'</a></span></div>';
					}
					con += '</div>';
				con += '</div>';
			}else{
				con += '<div class="item"><span><a href="#" id="'+this.target+'-type-'+ii+'">'+type.name+'</a></span></div>';
			}
		}
		var _this = this;
		$('#'+this.id+'Box').html(con);
		$('#'+this.id+'Box a').focus(function(e) {
			KEY.CURTYPE = _this.target;
			if(this.id.indexOf('type') > 0){
           	 	_this.onfocusType(this);
			}else{
			 	_this.onfocusItem(this);
			}
			
        }).blur(function(e){
			if(this.id.indexOf('type') > 0){
           	 	_this.onblurType(this);
			}else{
			 	_this.onblurItem(this);
			}
		}).click(function(e){
			if(this.id.indexOf('type') > 0){
           	 	_this.onclickType(this);
			}else{
			 	_this.onclickItem(this);
			}
			return false;
		});
	},
	onfocusType:function(a){
		var par = a.parentNode.parentNode;
		var id = a.id;
		var idArray = id.split('-');
		var tar = parseInt(idArray[2]); 
		var type = this.typeList[tar - 1]; 
		
		$(par).removeClass('item').removeClass('clickItem').addClass('curItem');
		this.changeTypePos(tar);
		
		if(this.focusType){
			this.focusType(type,tar);
		}
	},
	onblurType:function(a){
		var par = a.parentNode.parentNode;
		var id = a.id;
		var idArray = id.split('-');
		var tar = parseInt(idArray[2]); 
		var type = this.typeList[tar - 1];
		
		if(tar == this.curTypeId){
			$(par).removeClass('curItem').addClass('clickItem');
		}else{
			$(par).removeClass('curItem').addClass('item');
		}
		
	},
	onclickType:function(a){
		var par = a.parentNode.parentNode;
		var id = a.id;
		var idArray = id.split('-');
		var tar = parseInt(idArray[2]); 
		var type = this.typeList[tar - 1];
		if(type.dataList && type.dataList.length > 0){ 
			if(this.isAnimated()) return ;
			if(!this.level2Show){
				$('#'+this.id+'Box').stop().animate({top:0 - (tar-1) * this.typeHeight});
				$(par).next().slideDown();
				this.level2Show = true;
				this.curItemId = 0;
				this.curTopItemId = 0;
				this.focusItemId = 1;
				$(a).parent().next().removeClass('down').addClass('up');
				
				
				$('#'+this.id+' .bottom').hide();
				$('#'+this.id+' .top').hide();
			}else{
				$('#'+this.id+'Box').stop().animate({top:0 - this.curTopTypeId * this.typeHeight});
				$(par).next().slideUp();
				$(par).next().find('.list2').css('top',0);
				this.level2Show = false;
				$(a).parent().next().removeClass('up').addClass('down');
				this.changeTypeBtn(this.curTypeId);
			}
		}else{
			if(this.clickType){this.clickType(type,tar);}
			this.changeType(tar);
		}
		
	},
	changeTypePos:function(tar){ 
		if(this.disTypeNum >= this.typeList.length)  return ;
		if(tar != this.focusTypeId ){
			if(tar - this.curTopTypeId == this.disTypeNum && tar!=this.typeList.length){
				this.curTopTypeId ++;
				$('#'+this.id+'Box').stop().animate({top:0 - this.curTopTypeId * this.typeHeight});
			}else if(tar - 1 == this.curTopTypeId && tar != 1){
				this.curTopTypeId --;
				$('#'+this.id+'Box').stop().animate({top:0 - this.curTopTypeId * this.typeHeight});
			}
			this.changeTypeBtn(tar);
			
		}
	},
	changeTypeBtn:function(tar){
		if(this.level2Show){ return false;}
		if(tar - this.curTopTypeId >= this.disTypeNum-1 && tar != this.typeList.length){
			$('#'+this.id+' .bottom').show();
		}else{
			$('#'+this.id+' .bottom').hide();
		}
		if(tar-this.curTopTypeId == 2 && this.curTopTypeId > 0){
			$('#'+this.id+' .top').show();
		}else{
			$('#'+this.id+' .top').hide();
		}
	},
	onfocusItem:function(a){
		var par = a.parentNode.parentNode;
		var id = a.id;
		var idArray = id.split('-');
		var tar = parseInt(idArray[3]); 
		var typeId = parseInt(idArray[2]);
		
		$(par).removeClass('item2').removeClass('clickItem2').addClass('curItem2');
		this.changeItemPos(tar,this.typeList[typeId - 1],par);
		this.focusItemId = tar;
		
		if(this.focusItem){
			this.focusItem();
		}
	},
	onblurItem:function(a){
		var par = a.parentNode.parentNode;
		var id = a.id;
		var idArray = id.split('-');
		var tar = parseInt(idArray[3]); 
		var type = this.typeList[tar - 1];
		
		if(tar == this.curItemId){
			$(par).removeClass('curItem2').addClass('clickItem2');
		}else{
			$(par).removeClass('curItem2').addClass('item2');
		}
	},
	onclickItem:function(a){
		var id = a.id;
		var idArray = id.split('-');
		var typeId = parseInt(idArray[2]); 
		var type = this.typeList[typeId - 1];
		var tar = parseInt(idArray[3]);
		var data = type.dataList[tar - 1];
		
		if(this.clickItem){this.clickItem(data,type,tar);}
		
		var oldA = $('#'+idArray[0]+'-'+idArray[1]+'-'+idArray[2]+'-'+this.curItemId); $.log('#'+idArray[0]+'-'+idArray[1]+'-'+idArray[2]+'-'+this.curItemId);
		oldA.parent().parent().removeClass('clickItem2').addClass('item2');
		
		this.changeType(typeId);
		this.curItemId = tar;
	},
	changeType:function(tar){ $.log(this.curTypeId);
		if(this.curTypeId !=tar){ 
			if(this.curTypeId >0){
				var oldA = $('#'+this.target+'-type-'+this.curTypeId);
				$(oldA).parent().parent().removeClass('clickItem').addClass('item');
			}
			var newA = $('#'+this.target+'-type-'+tar); $.log(newA.text())
			$(newA).parent().parent().removeClass('clickItem').addClass('item');
			this.curTypeId  = tar;
		}
	},
	changeItemPos:function(tar,type,dom){ 
		if(this.disItemNum >= type.dataList.length)  return ;
		if(tar != this.focusItemId ){ 
			if(tar - this.curTopItemId == this.disItemNum && tar!=type.dataList.length){
				this.curTopItemId ++;
				$(dom).parent().stop().animate({top:0 - this.curTopItemId * this.itemHeight});
			}else if(tar - 1 == this.curTopItemId && tar != 1){
				this.curTopItemId --;
				$(dom).parent().stop().animate({top:0 - this.curTopItemId * this.itemHeight});
			}
			
			if(tar - this.curTopItemId >= this.disItemNum-1 && tar != type.dataList.length){
				$('#'+this.id+' .bottom2').show();
			}else{
				$('#'+this.id+' .bottom2').hide();
			}
			if(tar-this.curTopItemId == 2 && this.curTopItemId > 0){
				$('#'+this.id+' .top2').show();
			}else{
				$('#'+this.id+' .top2').hide();
			}
		}
	},
	isAnimated:function(){
		return $(":animated").length > 0;
	},
	keyRecv:function(key,keyName,a){
		var idArray = a.id.split('-');
		var type = idArray[1];
		var tar = parseInt(idArray[2]);
		var _this = Level2MenuMap[idArray[0]]
		var bo = _this.isAnimated();
		if(bo) return false;
		
		_this.lastFocusId = a.id;
		if(type == 'type'){			//如果是分类
			if(keyName == 'KEY_DOWN'){			//向下按
				if(_this.level2Show){
					$('#'+_this.target+'-item-'+tar+'-'+_this.focusItemId).focus();
				}else{
					tar ++;
					if(tar<=_this.typeList.length){
						$('#'+_this.target+'-type-'+tar).focus();
					}
				}
			}else if(keyName == 'KEY_UP'){		//向上按
				if(_this.level2Show) return false;
				tar --;
				if(tar >0){
					$('#'+_this.target+'-type-'+tar).focus();
				}else{
					if(_this.moveUp){_this.moveUp();}
				}
			}else if(keyName == 'KEY_RETURN'){
				if(KEY.KEY_RETURN){
					KEY.KEY_RETURN();
					return ;
				}
			}else if(keyName == 'KEY_RIGHT'){
				if(_this.moveRight){_this.moveRight();}
			}
		}else if(type == 'item'){
			var i = parseInt(idArray[3]);
			var _type = _this.typeList[tar -1];  
			if(keyName == 'KEY_DOWN'){			//向下按
				i++;
				if(i <= _type.dataList.length){
					$('#'+_this.target+'-item-'+tar+'-'+i).focus();
				}
			}else if(keyName == 'KEY_UP'){			//向下按
				i--;
				if(i>0){
					$('#'+_this.target+'-item-'+tar+'-'+i).focus();
				}else{
					$('#'+_this.target+'-type-'+tar).focus();
				}
			}else if(keyName == 'KEY_RETURN'){
				$('#'+_this.target+'-type-'+tar).focus();
			}else if(keyName == 'KEY_RIGHT'){
				
				if(_this.moveRight){_this.moveRight();}
			}
		}
	}
};