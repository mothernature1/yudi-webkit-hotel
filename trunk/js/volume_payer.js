var JP2 = {
	volume:15,
	getVolume:function(){return this.volume},
	setVolume:function(v){this.volume = v;},
	getCurTime:function(){return 152;},
	getDuration:function(){return 360;},
	seek:function(t){IMPlayer.Seek(t);},
	pause:function(){return false;},
	resure:function(){}
}

var JP = {
	volume:15,
	getVolume:function(){var v  = IMPlayer.GetVolume(); return v;},
	setVolume:function(v){
		IMPlayer.SetVolume(v);
		},
	getCurTime:function(){return  IMPlayer.GetCurrentPos(); },
	getDuration:function(){return IMPlayer.GetDuration();},
	seek:function(t){
		IMPlayer.Seek(t);
	},
	pause:function(){IMPlayer.Pause();},
	resure:function(){IMPlayer.Resure();}
}
if(typeof(LOG)!= 'object'){
	JP = JP2;	
}

var myPlayer = {
	valumeMax:30,		//声音最大值
	valumeMin:0,		//声音最小值
	mute:false,
	oldValumeValue:0,
	timer:null,
	state:'',
	run:function(type){
		if(type == 'left' || type=='right' || type=='mute'){
			this.volumeShow(type);
		}
	},
	volumeShow:function(type){
		
		if(type == 'mute'){
			if(!this.mute ){
				this.oldValumeValue = JP.getVolume();
				this.mute = true;
				JP.setVolume (0 );
			} else{
				JP.setVolume(this.oldValumeValue);
				this.mute = false;
			}
		}else if(type == 'right'){
			var v = JP.getVolume();
			if(v<this.valumeMax){
				v++;
				JP.setVolume(v);
			}
		}else if(type == 'left'){
			var v = JP.getVolume();
			if(v>this.valumeMin){
				v-- ;
				JP.setVolume(v);
			}
		}
		var v = JP.getVolume();
		if(v==0){
			//音量为0
			this.mute = true;
			$("#voluemBoxMute").removeClass("voluemBoxMute1").addClass("voluemBoxMute0");
		}else{
			$("#voluemBoxMute").removeClass("voluemBoxMute0").addClass("voluemBoxMute1");
			this.mute = false;
		}
		
		$('.volume').html(v);
		$('#doubanvolumeBox').html(v);	//douban音量
		$('#volumeBox').html(v);		//在线音乐音量
		this.initVolumeBox(v);
	},
	initVolumeBox:function(v){
	  $("#voluemBox").show();
	  $("#volumeBoxValue").html(v)
	  w=400/30*v
	  $("#voluemBoxPos").width(w)
	  if(this.timer){clearTimeout(this.timer);}
	  this.timer =setTimeout("myPlayer.hideVolume()",3000);

	},
	hideVolume:function(){
		$("#voluemBox").hide();
	},
}