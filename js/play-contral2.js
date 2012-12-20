var JP2 = {
	volume:15,
	getVolume:function(){return this.volume},
	setVolume:function(v){this.volume = v;},
	getCurTime:function(){return 152;},
	getDuration:function(){return 360;},
	seek:function(t){IMPlayer.Seek(t);}
}

var JP = {
	volume:15,
	getVolume:function(){var v  = IMPlayer.GetVolume(); $.log(v);return v;},
	setVolume:function(v){
		IMPlayer.SetVolume(v);
		},
	getCurTime:function(){return  IMPlayer.GetCurrentPos(); },
	getDuration:function(){return IMPlayer.GetDuration();},
	seek:function(t){
		return seek(t);	
	},
	pause:function(){ $.log('IMPlayer.Pause');
		IMPlayer.Pause();
	},
	resume:function(){$.log('IMPlayer.Resume');
		IMPlayer.Resume();
	},
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
	downloadSpeed:0,
	clear:function(){
		this.playCurTime=0;		//播放的当前时间
		this.curTime=0;				//记录当前时间
		this.oldPlayCurTime=0;		//旧的播放时间
		this.playTotalTime=0;		//播放总时长
		this.seekAddValue=0;
	
		this.bufferPercent=0;
		this.lastSeekTime=0;
	},
	run:function(type){ 
		
		/*
		var playerState = this.state;   $.log("playerState:"+playerState);
		if(playerState != 'play' ){
			if(playerState == 'PAUSE' && type == 'pause'){
				this.changePauseOrPlay();
			}else{
				return false;
			}
		}
		*/
		$.log('type:'+type);
		if(type == 'pause'){
			this.changePauseOrPlay(); 	
		}else if(type == 'ok'){
			this.showContralBox();
		}else if(type == 'left' || type=='right' || type=='mute'){
			this.volumeShow(type);
		}else if(type == 'seek'){ 
			this.showSeekBox();
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
	
	isShowSeek:false,		
	hasInitSeekBox:false,
	playCurTime:0,			//播放的当前时间
	curTime:0,				//记录当前时间
	oldPlayCurTime:0,		//旧的播放时间
	playTotalTime:0,		//播放总时长
	seekAddValue:0,
	seekBoxWidth:640,		//缓冲宽度
	bufferPercent:0,
	lastSeekTime :0,
	hideSeekTimer:null,
	showSeekBox:function(bo){
		if(!this.hasInitSeekBox){
			this.initSeekBox();
			this.hasInitSeekBox = true;
		}
		this.isShowSeek = true;
		
		var cur = JP.getCurTime (); 
		var dur = JP.getDuration();
		this.seekAddValue = parseInt(dur/100);
		if(this.seekAddValue<1){this.seekAddValue = 1;}
		this.curTime = cur+this.lastSeekTime;
		this.oldPlayCurTime = cur+this.lastSeekTime; 
		if(this.playTotalTime == 0){
			this.playTotalTime = dur;
		}
		if(this.curTime > this.playTotalTime){
			this.curTime = this.playTotalTime;
		}
		
		var seekBoxTip = document.getElementById('seekBoxTip');
		seekBoxTip.innerHTML = '&nbsp;';
		this.changeSeekPos();
		var seekBox = document.getElementById('seekBox');
		seekBox.style.display = 'block';
		
		$('#playSeekA').focus();
		var date = new Date();
		if(!bo){
			KEY.PRESSTIME = date.getTime();		//
			this.isBufferSeek = false;
		}else{
			KEY.PRESSTIME =  0;
			this.isBufferSeek = true;
			var seekBoxTip = document.getElementById('seekBoxTip');
			seekBoxTip.innerHTML = 'Download:0';
		}
		myPlayer.seekTime = date.getTime();	//seek时间
		myPlayer.seekType = '';				//seek类型
		
		if(this.hideSeekTimer) {clearInterval(this.hideSeekTimer);this.hideSeekTimer = null;};
		this.hideSeekTimer = setInterval( "myPlayer.hideSeekAuto()",1*1000);
	},
	initSeekBox:function(){
		var seekBox = $('<div class="seekBox" id="seekBox"></div>');
		$('body').append(seekBox);
		var html = '';
		html += '<div class="seekBox2">';
			html += '<div class="seekBoxLeft">';
				html += '<div>&nbsp;</div>';
				html += '<div>&nbsp;</div>';
				html += '<div>&nbsp;</div>';
			html += ' </div>';
			html += '<div class="seekBoxMid">';
				html += '<div class="seekBoxPos" id="seekBoxPos"><a herf="#" id="playSeekA">&nbsp;</a></div>';
			html += '</div>';
			html += '<div class="seekBoxRight" id="seekTotalTimeBox">&nbsp;</div>';
		html += '</div>';
		html += '<div class="seekBoxTip" id="seekBoxTip">&nbsp;</div>';
		seekBox.html(html);
		
		$('#playSeekA').focus(function(event){KEY.CURTYPE = 'seekBox';});
		var w = $('body').width(); 
		if(w>1280){
			var left = (w - 1280)/2;
			seekBox.css('left',left);
		}
	},
	changeSeekPos:function(){
		var w = this.getSeekPosition(this.curTime);
		$('#seekBoxPos').width(w);
		
		var seekTotalTimeBox = document.getElementById('seekTotalTimeBox');
		seekTotalTimeBox.innerHTML = this.formatPlayTime(this.curTime)+' / '+this.formatPlayTime(this.playTotalTime);
	},
	getSeekPosition:function(val){
		var w = val*this.seekBoxWidth/(this.playTotalTime - 0);
		return parseInt(w);
	},
	formatPlayTime:function(t){
		var h = parseInt(t/(60*60));
		var tm = t - 60*60*h ;
		var m = parseInt( tm/60);
		var s = tm - m*60;
		var con = '';
		if(h>0){
			if(h>9){
				con+=h+':';
			}else{
				con+='0'+h+':';
			}
		}
		if(m>9){
			con+=m+':';
		}else{
			con+='0'+m+':';
		}
		if(s>9){
			con+=s;
		}else{
			con+='0'+s;
		}
		return con;
	},
	hideSeekAuto:function(){
		var date = new Date();
		var curTime = date.getTime();	
		if((curTime - KEY.PRESSTIME) >= 5000){ 
			if(this.oldPlayCurTime != this.curTime){
				this.setSeek();
			}else{
				if(this.state == 'play'){		//如果是播放状态
					this.hideSeekBox();	
				}else{
					var percent = this.bufferPercent;
					var speed = this.downloadSpeed;
					var seekBoxTip = document.getElementById('seekBoxTip');
					seekBoxTip.innerHTML = 'Download:'+ parseInt(percent)+'%&nbsp;&nbsp;';
				}
			}
		}
	},
	hideSeekBox:function(){ $.log('here');
		if(this.hideSeekTimer) {clearInterval(this.hideSeekTimer);this.hideSeekTimer = null;}$.log('here');
		KEY.CURTYPE = '';
		$('#justForA').focus();$.log('here');
		var seekBox = document.getElementById('seekBox');$.log('here');
		seekBox.style.display = 'none';
		this.isShowSeek = false;
	},
	changeSeekAdd:function(){
		myPlayer.isBufferSeek = false;
		var date = new Date();
		var curTime = date.getTime();
		var seek = parseInt(this.playTotalTime/100);
		
		
		if((curTime - this.seekTime) <= 500 && this.seekType == 'add'){ 
			this.seekAddValue += parseInt(seek/3);
		}else{
			this.seekAddValue = seek;
		}
		
		if(this.curTime < this.playTotalTime){
			this.curTime +=this.seekAddValue;
			if(this.curTime > this.playTotalTime){
				this.curTime = this.playTotalTime;
			}
			this.changeSeekPos();
		}	
		
	},
	changeSeekDec:function(){
		myPlayer.isBufferSeek = false;
		
		var date = new Date();
		var curTime = date.getTime();
		var seek = parseInt(this.playTotalTime/100);
		
		
		if((curTime - this.seekTime) <= 500 && this.seekType == 'dec'){ 
			this.seekAddValue += parseInt(seek/3);
		}else{
			this.seekAddValue = seek;
		}
		
		if(this.curTime > 0){
			this.curTime -=this.seekAddValue;
			if(this.curTime <0){
				this.curTime = 0;
			}
			this.changeSeekPos();
		}
	},
	setSeekOk:function(){
		var percent = 0;
		var speed = 0;
		var seekBoxTip = document.getElementById('seekBoxTip');
		seekBoxTip.innerHTML = 'Download:'+ parseInt(percent)+'%&nbsp;&nbsp;';
		this.setSeek();
	},
	setSeek:function(){
		var p_state = this.state;
		if(p_state == 'play' || true){
			KEY.PRESSTIME = 0;
			
			if(this.curTime >= this.playTotalTime - 12){
				this.curTime = this.playTotalTime - 12;
			}
			
			var r = JP.seek(this.curTime);
			if(r){
				this.oldPlayCurTime = this.curTime;
			}else{
				this.oldPlayCurTime = 0;
			}
			
			this.lastSeekTime = this.curTime;
			
			this.state = 'buffer';
			 
		}
	},
	
	contralMap:{
		scalerRatio:{
			minValue:0,
			maxValue:24,
			val:12,
			getRealValue:function(v){
				return  v;
			},	
			setDisplay:function(v){
				
			},	
			name:'拉伸',
		},
		brightness:{
			minValue:0,
			maxValue:100,
			//val:$.getConfigNumberValue("display_brightness",0),		//显示亮度,
			val:50,
			getRealValue:function(v){
				return this.val;
			},	
			setDisplay:function(v){
				
			},	
			name:'屏幕亮度',
		},
		contrast:{
			minValue:0,
			maxValue:100,
			//val:$.getConfigNumberValue("display_contrast",128),
			val:50,
			getRealValue:function(){
				return this.val;
			},	
			setDisplay:function(v){
				this.val = v;
			},	
			name:'对比度',
		},
		saturation:{
			name:'饱和度',
			minValue:0,
			maxValue:100,
			//val:$.getConfigNumberValue("display_blue_saturation",128),
			val:50,
			getRealValue:function(){
				return this.val;
			},	
			setDisplay:function(v){
				this.val = v;
			},	
			
		},
		sharpness:{
			name:'清晰度',
			minValue:0,
			maxValue:100,
			//val:$.getConfigNumberValue("display_blue_saturation",128),
			val:50,
			getRealValue:function(){
				return this.val;
			},	
			setDisplay:function(v){
				this.val = v;
			},	
			
		},
		hue:{
			name:'色调 ',
			minValue:0,
			maxValue:100,
			//val:$.getConfigNumberValue("display_red_saturation",128),
			val:50,
			getRealValue:function(){
				return this.val;
			},	
			setDisplay:function(v){
				this.val = v;
			},	
		},
	},
	contralBoxWidth:122,
	getContralItemWidth:function(obj){
		var w = parseInt((obj.val - obj.minValue)*this.contralBoxWidth/(obj.maxValue - obj.minValue));
		return w;
	},
	changeContralTime:function(){
		var cur = JP.getCurTime (); 
		var dur = JP.getDuration();
		this.curTime = cur+this.lastSeekTime;
		
		var con = this.formatPlayTime(cur)+'/'+this.formatPlayTime(dur);
		var contralTimeBox = document.getElementById('contralTimeBox');
		contralTimeBox.innerHTML = con;
	
	},
	hasInitContralBox:false,
	hideContralTimer:null,
	initContralBox:function(){
		var contralBox=$('<div class="contralBox" id="contralBox"></div>');
		$('body').append(contralBox);
		var html = '';
		html += '<div class="contralTitle" >';
				html += '屏幕设置';
		//	html += '<div class="contralTimeBox" id="contralTimeBox">&nbsp;</div>';
		//	html += ' <div class="contralTitleBox2" id="contralTitle"></div>';
		html += ' </div>';
		html += '<div class="contralBox2" id="contralBoxList">';
		html += '</div>';
		
		contralBox.html(html);
		
		this.contralMap.brightness.val = $.GetConfigNumberValue("display_brightness_play",50);		//显示亮度,
		this.contralMap.contrast.val = $.GetConfigNumberValue("display_contrast_play",50);			//jo
		this.contralMap.saturation.val = $.GetConfigNumberValue("display_saturation_play",50);			//jo
		this.contralMap.sharpness.val =  $.GetConfigNumberValue("display_sharpness_play",50);			//jo
		this.contralMap.hue.val =  $.GetConfigNumberValue("display_hue_play",50);			//jo
		
		var con = '',j=0;
		for(var m in this.contralMap){
			if(this.contralMap.hasOwnProperty(m)){ j ++;
				var obj = this.contralMap[m];
				var w = this.getContralItemWidth(obj);
				con +='<div class="contralItem">';
					con += '<div class="contarlItemTip"><a href="#" id="contral-a-'+j+'" tar="'+m+'">'+obj.name+':</a></div>';
					con += '<div class="contralItemBox2"><div class="contralItemBox"><div class="contralItemPos" id="contral-pos-'+m+'" style="width:'+w+'px;">&nbsp;</div></div></div>';
					con +='<div class="contarlItemVal" id="contral-val-'+m+'" >'+(obj.val)+'</div>';
					con+='</div>';
			}
		}
	//	con+='<div class="contralItem">'
	//	con+='<div class="contarlItemTip"><a href="#" id="contral-a-6">选择信号源:</a></div>'
	//	con+='<div class="contralItem-Source"><a href="#">1</a><a href="#">2</a><a href="#">3</a><a href="#">4</a><a href="#">5</a></div></div>'
		$('#contralBoxList').html(con);
		
		$('#contralBoxList a').focus(function(e) {
            KEY.CURTYPE = 'contralBox';
			$(this).parent().parent().removeClass('contralItem').addClass('contralCurItem');
        }).blur(function(e){
			$(this).parent().parent().removeClass('contralCurItem').addClass('contralItem');
		}).click(function(e) {
            return false;
        });;
	},
	showContralBox:function(){
		if(!this.hasInitContralBox){
			this.initContralBox();
			this.hasInitContralBox = true;
		}
		//$('#contralTitle').html(this.disName);
		$('#contralBox').show();
		$('#contralBoxList a').first().focus();
		
		var date = new Date();
		KEY.PRESSTIME = date.getTime();		//
		if(this.hideContralTimer) {clearInterval(this.hideContralTimer);this.hideContralTimer = null;}
		this.hideContralTimer = setInterval( "myPlayer.hideContralAuto()",1*1000);
	},
	hideContralAuto:function(){
		var date = new Date();
		var curTime = date.getTime();	
		//this.changeContralTime();
		if((curTime - KEY.PRESSTIME) >= 10000){
			this.hideContralBox();
		}
		
	},
	hideContralBox:function(){
		$('#justForA').focus();
		
		var contralBox = document.getElementById('contralBox');
		contralBox.style.display = 'none';
		KEY.CURTYPE = 'false';
		if(this.onHideContralBox){
			this.onHideContralBox();
		}
		if(this.hideContralTimer){
			clearInterval(this.hideContralTimer);
		}
		setTimeout('myPlayer.saveContarlData()',50);
		
	},
	saveContarlData:function(){
		$.setConfigValue("display_brightness_play",myPlayer.contralMap.brightness.val+"");
		$.setConfigValue("display_contrast_play",myPlayer.contralMap.contrast.val+"");
		$.setConfigValue("display_saturation_play",myPlayer.contralMap.saturation.val+"");
		$.setConfigValue("display_sharpness_play",myPlayer.contralMap.sharpness.val+"");
		$.setConfigValue("display_hue_play",myPlayer.contralMap.hue.val+"");
	},
	changeContralDec:function(){
		var a = document.activeElement;
		var tar = a.getAttribute('tar');
		var obj = this.contralMap[tar];
		if(obj.val > obj.minValue){
			obj.val --;
			var w = this.getContralItemWidth(obj);
			$('#contral-pos-'+tar).width(w);
			var val = document.getElementById('contral-val-'+tar);
			val.innerHTML = obj.val
		}
		if(tar == 'scalerRatio'){
			FB.VideoScaler(myPlayer.contralMap.scalerRatio.getRealValue(obj.val),1)
		}else if(tar == 'brightness'){
			FB.SetBrightness(myPlayer.contralMap.brightness.val,1);
		}else if(tar == 'contrast'){
			FB.SetContrast(myPlayer.contralMap.contrast.val,1);
		}else if(tar == 'saturation'){;
			FB.SetSaturation(myPlayer.contralMap.saturation.val,1);
		}else if(tar == 'sharpness'){
			FB.SetSharpness(myPlayer.contralMap.sharpness.val,1);
		}else if(tar == 'hue'){
			FB.SetHue(myPlayer.contralMap.hue.val,1);
		}
	},
	changeContralAdd:function(){
		var a = document.activeElement;
		var tar = a.getAttribute('tar');
		var obj = this.contralMap[tar];
		if(obj.val < obj.maxValue){
			obj.val ++;
			var w = this.getContralItemWidth(obj);  $.log(w);
			$('#contral-pos-'+tar).width(w);
			
			var val = document.getElementById('contral-val-'+tar);
			val.innerHTML = obj.val ;
		}
	
		if(tar == 'scalerRatio'){
			FB.VideoScaler(myPlayer.contralMap.scalerRatio.getRealValue(obj.val),1)
		}else if(tar == 'brightness'){
			FB.SetBrightness(myPlayer.contralMap.brightness.val,1);
		}else if(tar == 'contrast'){
			FB.SetContrast(myPlayer.contralMap.contrast.val,1);
		}else if(tar == 'saturation'){;
			FB.SetSaturation(myPlayer.contralMap.saturation.val,1);
		}else if(tar == 'sharpness'){
			FB.SetSharpness(myPlayer.contralMap.sharpness.val,1);
		}else if(tar == 'hue'){
			FB.SetHue(myPlayer.contralMap.hue.val,1);
		}
	},
	hasInitPauseOrPlay:false,
	initPauseOrPlay:function(){
		var pauseOrPlayBox=$('<div class="pauseOrPlayBox" id="pauseOrPlayBox"></div>');
		$('body').append(pauseOrPlayBox);
		var html = '';
		html += '<div class="pauseIcon"><a href="#" id="pauseOrPlayA">&nbsp;</a></div>';
		html += '<div class="buttom">';
			html += '<div class="left">&nbsp;</div>';
			html += '<div class="right">&nbsp;</div>';
		html += '</div>';
		
		pauseOrPlayBox.html(html);
		$('#pauseOrPlayBox a').focus(function(e) {
            KEY.CURTYPE = 'pauseOrPlayBox';
        }).blur(function(e){
		
		}).click(function(e) {
            return false;
        });;
	},
	changePauseOrPlay:function(){ 
		if(!this.hasInitPauseOrPlay){
			this.initPauseOrPlay();
			this.hasInitPauseOrPlay = true;
		}
		
		this.state = 'pause'
		var cur = JP.getCurTime (); 
		var dur = JP.getDuration();
		
		var con = '<div>'+this.disName+'</div>';$.log(1);
		con += '<div>'+this.formatPlayTime(cur)+'/'+this.formatPlayTime(dur)+'</div>'; $.log(con);
		
		$('#pauseOrPlayBox .left').html(con);
		$('#pauseOrPlayBox').show();
		$('#pauseOrPlayA').focus();
		
		JP.pause();
	},
	hidePauseOrPlayBox:function(){
		JP.resume();
		KEY.CURTYPE =false;
		$('#justForA').focus();
		$('#pauseOrPlayBox').hide();
	},
}


KEY.TYPE['volumeBox'] = keyRecvVolumeBox;

function keyRecvVolumeBox(key,keyName,a){
	var p_state = myPlayer.state;
	if(keyName == 'KEY_RETURN'){
		myPlayer.hideVolume();
		return false;
	}else if(keyName == 'KEY_LEFT'|| keyName == 'KEY_VOL_P'){		//向左
		myPlayer.changeVolumeDec();;
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

KEY.TYPE['seekBox'] = keyRecvSeekBox;

function keyRecvSeekBox(key,keyName,a){
	var p_state = myPlayer.state;
	if(keyName == 'KEY_RETURN'){
		if(myPlayer.isBufferSeek){
			KEY.KEY_RETURN();
		}else{
			myPlayer.hideSeekBox();
		}
		return false;
	}else if(keyName == 'KEY_SLOW_PLAY'){		//向左
			myPlayer.changeSeekDec();
			myPlayer.seekType = 'dec';
			var date = new Date();
			myPlayer.seekTime = date.getTime();	//seek时间
		return false;
	}else if(keyName == 'KEY_FAST_PLAY'){
			myPlayer.changeSeekAdd();
			myPlayer.seekType = 'add';
			var date = new Date();
			myPlayer.seekTime = date.getTime();	//seek时间
		return false;
	}else if(keyName == 'KEY_OK'){
		myPlayer.setSeekOk();
		return false;
	}else{
		if(!myPlayer.isBufferSeek){
			myPlayer.hideSeekBox();
			if(KEY[KEY.KEYBOARD ]){
				KEY[KEY.KEYBOARD ](key,KEY.KEYBOARD,a);
			}
		}
	}
}

KEY.TYPE['contralBox'] = keyRecvContralBox;

function keyRecvContralBox(key,keyName,a){
	
	if(keyName == 'KEY_RETURN'){		//返回
		myPlayer.hideContralBox();
		return false;
	}else if( keyName == 'KEY_LEFT'){		//向左
		myPlayer.changeContralDec();
		return false;
	}else if(keyName == 'KEY_RIGHT'){		//向右
		myPlayer.changeContralAdd();
		return false;
	}else if(keyName == 'KEY_DOWN'){
		var idArr = a.id.split('-');
		var id = parseInt(idArr[2]);
		id++;
		$('#'+idArr[0]+'-'+idArr[1]+'-'+id).focus();
	}else if(keyName == 'KEY_UP'){
		var idArr = a.id.split('-');
		var id = parseInt(idArr[2]);
		id--;
		if(id>0)
		$('#'+idArr[0]+'-'+idArr[1]+'-'+id).focus();
	}
	return true;
}

KEY.TYPE['pauseOrPlayBox'] = function(key,keyName,a){
	if(keyName == 'KEY_RETURN' || keyName == 'KEY_OK' || keyName == 'KEY_PLAY_STOP'){		//返回
		myPlayer.hidePauseOrPlayBox();
	}
	return false;
}