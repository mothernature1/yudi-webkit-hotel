var recordObj_ali = {
	db:'record_info',
	start:function(obj){ 	//开启录制,调用StartRecord
		var date = new Date();
		
		var r = IMPlayer.StartRecord (obj.channelName,obj.epgName,obj.url,obj.startTime,obj.endTime);
		return r;
	},
	stop:function(obj){		//停止录制
		IMPlayer.StopRecord(obj.ID);
	},
	delete:function(obj){ 
		IMPlayer.DeleteRecord(obj.ID);
	},
	deleteChannel:function(Channel){
		IMPlayer.DeleteChannel(Channel);
		alert("sada")
	},
	getRecordInfo:function(ch){ 
		var str = IMPlayer.GetRecordInfo (ch);
		eval("var obj = "+str);
		return obj;
	},
	getRecordingInfo :function(){
		var str = IMPlayer.GetRecordingInfo();
		eval("var obj = "+str);
		return obj;
	},
}

var recordObj_webkit = {
	db:'record_info',
	start:function(obj){
		var noDisk = false;
		if(!noDisk){
			var NotEnoughSpace = false;
			if(!NotEnoughSpace){		//如果有足够的存储空间
					var list = this.getRecordInfo(); 
					for(var i = 0;i<list.length;i++){
						var ch = list[i];
						for(var j = 0;j<ch.Record.length;j++){
							var r = ch.Record[j]; 
							if(r.endTime>obj.startTime && r.startTime<obj.endTime){
								return "Repeated";
							}
						}
					}
					this.save(obj);
					return 'Success';
			}else{
				return "NotEnoughSpace";
			}
		}else{
			return 'NoDisk';
		}
	},
	save:function(obj){
		var list = new Array();
		var str = $.getLocal(this.db);
		if(str){
			eval("var recordList="+str);
			
		}else{
			var recordList=new Array();
		}
		recordList.push(obj);
		$.setLocal(this.db,$.toJSON(recordList));
	},
	stop:function(obj){ //停止录制
	
	},
	delete:function(obj){
		var list = new Array();
		var str = $.getLocal(this.db);
		if(str){
			eval("var recordList="+str);
			for(var i =0;i<recordList.length;i++){
				var r = recordList[i];
				if(r.channelName == obj.Channel && r.epgName == obj.EPG){
					recordList.splice(i,1);
					break;
				}
			}
			$.setLocal(this.db,$.toJSON(recordList));
		}
		return false;
	},
	deleteChannel:function(channel){
		var list = new Array();
		var str = $.getLocal(this.db);
		if(str){
			eval("var recordList="+str);
			var time = new Date();
			var curTime = parseInt(time.getTime()/1000);
			for(var i =0;i<recordList.length;i++){
				var r = recordList[i];
				if(r.channelName == channel){
					recordList.splice(i--,1);
				}
			}
			$.setLocal(this.db,$.toJSON(recordList));
		}
	},
	getRecordInfo:function(){
		var list = new Array();
		var str = $.getLocal(this.db);
		if(str){
			eval("var recordList="+str);
			var time = new Date();
			var curTime = parseInt(time.getTime()/1000);
			for(var i =0;i<recordList.length;i++){
				var r = recordList[i];
				var j = 0;
				for(;j<list.length;j++){
					var d = list[j];
					if(d.Channel == r.channelName){
						break;
					}
				}
				var ch;
				if(j<list.length){ch = list[j];}
				else{ch ={Channel:r.channelName,URL:"",Record:new Array()}; list.push(ch);}
				
				
				
				r.ID=i;
				r.Channel=r.channelName;
				r.EPG = r.epgName;
				r.StartTime = r.startTime;
				r.EndTime = r.endTime;
				r.Path=[];
				
				
				if(r.startTime <= curTime && r.endTime>=curTime){
					r.State = 'Recording';
				}else if(r.startTime >= curTime){
					r.State = 'Wait';
				}else if(r.endTime<=curTime){
					r.State = 'Finish';
				}
				
				ch.Record.push(r);
			}
		}
		return list;
	},
	getRecordInfo :function(ch){ 
		var list = this.getRecordInfo(); 
		for(var i =0;i<list.length;i++){
			var r = list[i];
			if(r.Channel == ch){
				return r.Record;
			}
		}
		return new Array();
	},
	getRecordingInfo :function(){
		var list = new Array();
		var str = $.getLocal(this.db);
		if(str){
			eval("var recordList="+str);
			var time = new Date();
			var curTime = parseInt(time.getTime()/1000);
			for(var i =0;i<recordList.length;i++){
				var r = recordList[i];
				
				
				var o = {
					ID:i,
					Channel:r.channelName,
					EPG:r.epgName,
					StartTime:r.startTime,
					EndTime:r.endTime,
					Path:[]
				};
				
				if(r.startTime <= curTime && r.endTime>=curTime){
					o.State = 'Recording';
					list.push(o);
				}else if(r.startTime >= curTime){
					o.State = 'Wait';
					list.push(o);
				}
			}
		}
		list.sort(function(a,b){return a.StartTime>b.StartTime?1:-1});
		return list;
	}
}


var recordObj = _isAli?recordObj_ali:recordObj_webkit;
