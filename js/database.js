var DB = function(opt){
	this.name = 'database_test';
	this.id = 'id';
	this.max = 100;
	$.extend(this,opt);
	this.init();		
}

DB.prototype = {
	str:false,
	clear:function(){					//清除数据
		$.removeLocal(this.name);
	},
	init:function(){
		if($.getLocal){
			this.str = $.getLocal(this.name);
		}
	},
	isChange:function(){
		var str = $.getLocal(this.name); 
		if(str == this.str){
			return false;
		}else{
			this.str = str;
			return true;
		}
	},
	getData:function(id){
		var list = this.getList();
		if(list){
			for(var i = 0;i<list.length;i++){
				if(list[i][this.id] == id){
					
					return list[i];
				}
			}
		}
		return false;
	},
	getList:function(){				//获取数据列表
		var str = $.getLocal(this.name);
		var list = false;;
		if(str){
			eval("list="+str);
		}
		return list;
	},
	getId:function(obj){					//获取id
		var id;
		if(typeof(obj) == 'object'){
			id = obj[this.id];
		}else {
			id = obj;
		}
		return id;
	},
	isExist:function(obj){				//判断是否存在数据中
		var id = this.getId(obj); 
		var list = this.getList();
		if(list){
			for(var i = 0;i<list.length;i++){
				if(list[i][this.id] == id){
					return true;
				}
			}
		}
		return false;
	},
	del:function(obj){						//删除数据
		var id = this.getId(obj);
		var list = this.getList();
		if(list){
			for(var i = 0;i<list.length;i++){
				if(list[i][this.id] == id){
					list.splice(i,1);	
					$.setLocal(this.name,$.toJSON(list));
					return true;
				}
			}
		}
		return false;
	},
	insert:function(obj,fos){			//插入对象，是否强制插入,强制插入到最前面
		var bo = this.isExist(obj);		//是否已经存在
		
		if(bo){
			if(fos){
				this.del(obj);
				var list = this.getList();
				list.unshift(obj);
				$.setLocal(this.name,$.toJSON(list));
			}else{
				return false;
			}
		}else{
			var str = $.getLocal(this.name);
			var list;
			if(str){
				eval("list="+str);
			}else{
				list = new Array();
			}
			if(fos){
				list.unshift(obj);
				if(list.length > this.max){
					list.pop();	
				}
			}else{
				list.push(obj);
			}
			$.setLocal(this.name,$.toJSON(list));
			return ;
		}
	}
}