var myPlayer = {
	valumeMax:30,		//声音最大值
	valumeMin:0,		//声音最小值
	oldVolume:0,		//上一次声音值
	volumeBoxWidth:400,	//声音滑块的宽度
	hasInitVolume:false,	//是否已经存初化声音
	hideVolumeTimer:false,	//自动隐藏声音定时器
	state:'PLAY',          //状态
	isPause:false,
	mute:false,			//静音
	run:function(type){
		
		var playerState = this.state;  LOG.INFO("playerState:::"+playerState);
		if(playerState != 'play' ){
			if(playerState == 'pause' && type == 'pause'){
			}else{
				return false;
			}
		}
		if(type == 'ok'){
			this.showContralBox();
		}else if(type == 'left' || type=='right' || type=='mute'){
			this.volumeShow(type);
		}
	},
	volumeShow:function(type){
		if(!this.hasInitVolume){
			this.initVolumeBox();
			this.hasInitVolume = true;
		}
		if(type == 'mute'){
			this.changeVolumeMute();
		}
		this.changeVolumePos();
		var voluemBox = document.getElementById('voluemBox');
		voluemBox.style.display = 'block';
		$('#playVolumeA').focus();
		
		var date = new Date();
		KEY.PRESSTIME = date.getTime();		$.log(KEY.PRESSTIME );
		if(this.hideVolumeTimer) {clearInterval(this.hideVolumeTimer);this.hideVolumeTimer = null;}
		this.hideVolumeTimer = setInterval( "myPlayer.hideVolumeAuto()",1*1000);	
	},
	initVolumeBox:function(){
		var voluemBox = $('<div class="voluemBox" id="voluemBox">&nbsp;</div>');
		$('body').append(voluemBox);
		var con = '<div class="voluemBox2">';
			con += '<div class="voluemBoxLeft"><div class="voluemBoxMute0" id="voluemBoxMute">&nbsp;</div></div>';
			con += '<div class="voluemBoxMid">';
				con += '<div class="voluemBoxPos" id="voluemBoxPos"><a herf="#" id="playVolumeA">&nbsp;</a></div>';
			con += '</div>';
			con += '<div class="voluemBoxRight" id="volumeBoxValue">&nbsp;</div>';
		con += '</div>';
		voluemBox.html(con);
		
		$('#playVolumeA').focus(function(event){KEY.CURTYPE = 'volumeBox';});
		var w = $('body').width();
		if(w>1280){
			var left = (w - 1280)/2;
			voluemBox.css('left',left);
		}
	},
	changeVolumePos:function(){
		var val = IMPlayer.GetVolume();
		var w = this.getVoluemPosition(val);
		$('#voluemBoxPos').width(w);
		var volumeBoxValue = document.getElementById('volumeBoxValue');
		volumeBoxValue.innerHTML = val;
		
		var voluemBoxMute = document.getElementById('voluemBoxMute');
		if(val == this.valumeMin){
			voluemBoxMute.className = 'voluemBoxMute0';
		}else{
			voluemBoxMute.className = 'voluemBoxMute1';
		}
		
	},
	getVoluemPosition:function(val){
		var w = val*this.volumeBoxWidth/(this.valumeMax - this.valumeMin);
		return parseInt(w);
	},
	hideVolumeAuto:function(){
		var date = new Date();
		var curTime = date.getTime();	
		if((curTime - KEY.PRESSTIME) >= 5000){
			this.hideVolume();
		}
	},
	hideVolume:function(){
		if(this.hideVolumeTimer) {clearInterval(this.hideVolumeTimer);this.hideVolumeTimer = null;}
		KEY.CURTYPE = false;
		$.log('clear volume');
		var voluemBox = document.getElementById('voluemBox');
		voluemBox.style.display = 'none';
		
	},
	changeVolumeAdd:function(){
		var val = IMPlayer.GetVolume();
		if(val < this.valumeMax){
			val++;
			IMPlayer.SetVolume(val);
			this.changeVolumePos();
		}
	},
	changeVolumeDec:function(){
		var val = IMPlayer.GetVolume();
		if(val > this.valumeMin){
			val--;
			IMPlayer.SetVolume(val);
			this.changeVolumePos();
		}
	},
	changeVolumeMute:function(){
		var v = IMPlayer.GetVolume();
		if(v == this.valumeMin){
			IMPlayer.SetVolume(this.oldVolume);
		}else{
			this.oldVolume = v;
			IMPlayer.SetVolume(this.valumeMin);
		}
		
		this.changeVolumePos();
	},
	
}


KEY.TYPE['volumeBox'] = keyRecvVolumeBox;

function keyRecvVolumeBox(key,keyName,a){$.log(keyName);
	var p_state = myPlayer.state;
	if(keyName == 'KEY_LEFT'){		//向左
		myPlayer.changeVolumeDec();;
		return false;
	}else if(keyName == 'KEY_RIGHT'){
		myPlayer.changeVolumeAdd();
		return false;
	}else if(keyName == 'KEY_RETURN'){	//返回键
		myPlayer.hideVolume();
		return false;
	}else if(keyName == 'KEY_DOWN'){
		myPlayer.hideVolume();
		if(KEY.KEY_DOWN ){KEY.KEY_DOWN (key,keyName,a);}
	}else if(keyName == 'KEY_UP'){
		myPlayer.hideVolume();
		if(KEY.KEY_UP ){KEY.KEY_UP (key,keyName,a);}
	}else if(keyName == 'KEY_OK'){
		myPlayer.hideVolume();
		if(KEY.KEY_OK ){KEY.KEY_OK (key,keyName,a);}
	}
	
}