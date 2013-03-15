var TIME_FORMAT = /\d{1,2}:\d{1,2}:\d{1,2},\d{3}/g;
var JP2 = {
	volume:15,
	getVolume:function(){return this.volume},
	setVolume:function(v){this.volume = v;},
	getCurTime:function(){return 152;},
	getDuration:function(){return 360;},
	seek:function(t){IMPlayer.Seek(t);},
	pause:function(){
		this.state = 'pause';
	},
	resume:function(){
		this.state = 'play';
	},
	GetTrackList:function(){
		var list = new Array();
		for(var i = 1;i<=5;i++){
			list.push({
				Id:i,
				SampleRate:'采样率1',
				Channel:'声道数1',
				Bps:'采样微滤1',
				Bitrate:'码率1',
				Tag:'编码缩写1',
				Lang:'语言1',
				Desc:'编码的详细描述1',
				CurAudio:i==3,
			});
		}
		return list;
	},
	SetTrack:function(id){
		return true;
	},
	GetSubtitleList:function(){
		var list = new Array();
		for(var i = 1;i<=5;i++){
			list.push({
				id:i,
				Name:'采样率1',
			});
		}
		return list;
	},
	SetSubtitle:function(id){
		if(id == -1){
		}else{
		}
	}
}

var JP = {
	volume:15,
	getVolume:function(){var v  = IMPlayer.GetVolume();return v;},
	setVolume:function(v){
		IMPlayer.SetVolume(v);
		},
	getCurTime:function(){return  IMPlayer.GetCurrentPos(); },
	getDuration:function(){return IMPlayer.GetDuration();},
	seek:function(t){
		IMPlayer.Seek(t);
	},
	pause:function(){ $.log('IMPlayer.Pause');
		IMPlayer.Pause();
	},
	resume:function(){$.log('IMPlayer.Resume');
		IMPlayer.Resume();
	},
	GetTrackList:function(){ 
		var str = IMPlayer.GetTrackList();
		var list = new Array();
		if(str){ $.log(str);
			eval("list="+str);
		}
		return list;
	},
	SetTrack:function(id){ 
		
		return IMPlayer.SetTrack(id);
	},
	GetSubtitleList:function(){
		var str = IMPlayer.GetSubtitleList();   
		var list = new Array();
		if(str){
			eval("list="+str);
		}
		return list;
	},
	SetSubtitle:function(id){
		if(id == -1){
			IMPlayer.HideSubtitle();
		}else{
			IMPlayer.SetSubtitle(id);
		}
	}
}
if(typeof(LOG)!= 'object'){
	JP = JP2;	
}

var myPlayer = {
	valumeMax:30,		//声音最大值
	valumeMin:0,		//声音最小值
	oldVolume:0,		//上一次声音值
	volumeBoxWidth:400,	//声音滑块的宽度
	hasInitVolume:false,	//是否已经存初化声音
	hideVolumeTimer:false,	//自动隐藏声音定时器
	state:'play',          //状态
	isPause:false,
	mute:false,			//静音
	lastA:false,
	clear:function(){
		this.playCurTime=0;		//播放的当前时间
		this.curTime=0;				//记录当前时间
		this.oldPlayCurTime=0;		//旧的播放时间
		this.playTotalTime=0;		//播放总时长
		this.seekAddValue=0;
	
		this.bufferPercent=0;
		this.lastSeekTime=0;
		
		this.subtitleList = false;
		$('#subtitleText').hide();			//隐藏字幕
		if(this.runSubtitleTimer){clearInterval(this.runSubtitleTimer);this.runSubtitleTimer = null;}		//删除字幕定时器
	},
	run:function(type){ 
		if(type == 'left' || type=='right' || type=='mute'){
			this.lastA = document.activeElement;
			this.volumeShow(type);
		}
		/*
		if(type == 'pause'){
			this.changePauseOrPlay();
		}else if(type == 'ok'){
			if(this.state == 'play'){
				this.showContralBox();
			}
		}else if(type == 'left' || type=='right' || type=='mute'){
			this.volumeShow(type);
		}else if(type == 'seek'){ 
			this.showSeekBox();
		}else if(type == 'audio' && this.state == 'play'){  //显示多音轨
			this.showAudioBox();
		}else if(type == 'subtitle' && this.state == 'play'){		//显示多字幕
			this.showSubtitleBox();
		}
		*/
		return false;
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
		KEY.PRESSTIME = date.getTime();		//
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
		var val = JP.getVolume();
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
		$(this.lastA).focus();
		var voluemBox = document.getElementById('voluemBox');
		voluemBox.style.display = 'none';
	},
	changeVolumeAdd:function(){
		var val = JP.getVolume();
		if(val < this.valumeMax){
			val++;
			JP.setVolume(val);
			this.changeVolumePos();
		}
	},
	changeVolumeDec:function(){
		var val = JP.getVolume();
		if(val > this.valumeMin){
			val--;
			JP.setVolume(val);
			this.changeVolumePos();
		}
	},
	changeVolumeMute:function(){
		var v = JP.getVolume();
		if(v == this.valumeMin){
			JP.setVolume(this.oldVolume);
		}else{
			this.oldVolume = v;
			JP.setVolume(this.valumeMin);
		}
		
		this.changeVolumePos();
	},
	
}


KEY.TYPE['volumeBox'] = keyRecvVolumeBox;

function keyRecvVolumeBox(key,keyName,a){ $.log('keyName:::::::'+keyName);
	var p_state = myPlayer.state;
	if(keyName == 'KEY_RETURN'){
		myPlayer.hideVolume();
		return false;
	}else if(keyName == 'KEY_LEFT' || keyName == 'KEY_VOL_P'){		//向左
		myPlayer.changeVolumeDec();
		return false;
	}else if(keyName == 'KEY_RIGHT'|| keyName == 'KEY_VOL_A'){
		myPlayer.changeVolumeAdd();
		return false;
	}else{
		myPlayer.hideVolume();
		if(KEY[KEY.KEYBOARD ]){
			KEY[KEY.KEYBOARD ](key,KEY.KEYBOARD,a);
		}
	}
}

