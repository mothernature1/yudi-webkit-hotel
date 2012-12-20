var ParserLyrics = function(opt){
	this.dataList = false;
	this.curItemId = 0;
}

ParserLyrics.prototype = {
	//TIME_FORMAT : /\[\d{1,2}:\d{1,2}.\d{1,2}\]/g,
	TIME_FORMAT : /\[\d{1,2}:\d{1,2}(.\d{1,2})?\]/g,
	parse:function(text){		//分析代码,true,解析成功
		try{
			var subList = new Array();
			
			var list;
			if(text.split('\r\n').length >= text.split('\n').length){
				list = text.split('\r\n');
			}else{
				list = text.split('\n');
			}
			for(var i = 0;i<list.length;i++){
				var s = list[i]; 
				if(s){
					var timeMatch = s.match(this.TIME_FORMAT);			//如果是时间
					if(timeMatch){
						var t = s.replace(this.TIME_FORMAT,'');
						for(var j = 0;j<timeMatch.length;j++){
							var timeArr = timeMatch[j].match(/\d{1,2}/g);
							var time = 0;
							if(timeArr.length==2){
								time = (parseInt(timeArr[0])*60+parseInt(timeArr[1])) * 1000;
							}else{
								time = (parseInt(timeArr[0])*60+parseInt(timeArr[1])) * 1000 + parseInt(timeArr[2])*10;
							}
							//var time = (parseInt(timeArr[0])*60+parseInt(timeArr[1])) * 1000 + parseInt(timeArr[2])*10;
							if(t){
								subList.push({
									time:time,
									text:t,
								});
							}
						}
					}
				}
			}
			subList.sort(this.descByTime); 			//对时间进行排序
			this.dataList = subList;
			return true;
		}catch(e){
			return false;
		}
	},
	descByTime:function(a,b){ 
		return a.time > b.time?1:-1;
	},
	clear:function(){
		this.dataList = false;
		this.curItemId = 0;
	},
	change:function(time){	//根据时间改变歌词
		if(!this.dataList || this.dataList.length == 0) return false;
		
		var id = -1,i=0;
		for(;i<this.dataList.length;i++){
			var d = this.dataList[i];
			if(d.time>=time-500 && d.time<=time+500){
				id = i+1;
				break;
			}
		}
		if(i== this.dataList.length){
		//	id = this.dataList.length ;
		}
		
		if(id > - 1 ){
			var curId = id ;
			if(curId == this.curItemId){
				return false;
			}else{
				this.curItemId = curId;
				var cur = this.dataList[curId - 1];
				var next = false;
				if(curId<this.dataList.length){
					next = this.dataList[curId];
				}
				return {
					id:curId,
					cur:cur.text,
					next:next.text,
				}
			}
		}else{
			return false;
		}
	}
}