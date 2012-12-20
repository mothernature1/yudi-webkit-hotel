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
	seekBoxWidth:727,		//缓冲宽度
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
		this.curTime = cur;
		this.oldPlayCurTime = cur; 
	
		this.playTotalTime = dur;
		
		if(this.curTime > this.playTotalTime){
			this.curTime = this.playTotalTime;
		}
		
		$('.seekBoxLeft div').html(this.disName);
		
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
				this.oldPlayCurTime = this.curTime;
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
	hideSeekBox:function(){ 
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
		
		if(seek<1){
			seek = 1;
		}
		if((curTime - this.seekTime) <= 500 && this.seekType == 'add'){ 
			var s = parseInt(seek/3);
			if(s<1){s = 1;}
			this.seekAddValue += s;
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
		
		if(seek<1){
			seek = 1;
		}
		if((curTime - this.seekTime) <= 500 && this.seekType == 'dec'){ 
			var s = parseInt(seek/3);
			if(s<1){s = 1;}
			this.seekAddValue += s;
		}else{
			this.seekAddValue = seek;
		}
		
		if(this.seekAddValue <1){this.seekAddValue = 1;}
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
		if(p_state == 'play' || p_state == 'buffer' || p_state == 'pause'){
			KEY.PRESSTIME = 0;
			
			if(this.curTime >= this.playTotalTime - 12){
				this.curTime = this.playTotalTime - 12;
			}
			
			var r = JP.seek(this.curTime);
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
			name:lang.setting.setVideo.scaler,
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
			name:lang.setting.setVideo.brightness,
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
			name:lang.setting.setVideo.contrast,
		},
		saturation:{
			name:lang.setting.setVideo.saturation,
			minValue:0,
			maxValue:100,
			//val:$.getConfigNumberValue("display_blue_saturation",128),
			val:75,
			getRealValue:function(){
				return this.val;
			},	
			setDisplay:function(v){
				this.val = v;
			},	
			
		},
		sharpness:{
			name:lang.setting.setVideo.sharpness,
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
			name:lang.setting.setVideo.hue,
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
	contralBoxWidth:150,
	getContralItemWidth:function(obj){
		var w = parseInt((obj.val - obj.minValue)*this.contralBoxWidth/(obj.maxValue - obj.minValue));
		return w;
	},
	changeContralTime:function(){
		var cur = JP.getCurTime (); 
		var dur = JP.getDuration();
		
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
			html += '<div class="contralTimeBox" id="contralTimeBox">&nbsp;</div>';
			html += ' <div class="contralTitleBox2" id="contralTitle"></div>';
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
		$('#contralTitle').html(lang.local.Setting);
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
		this.changeContralTime();
		if((curTime - KEY.PRESSTIME) >= 10000){
			this.hideContralBox();
		}
		
	},
	hideContralBox:function(){
		$('#justForA').focus();
		
		var contralBox = document.getElementById('contralBox');
		contralBox.style.display = 'none';
		KEY.CURTYPE = false;
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
			html += '<div class="right"></div>';
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
		
		this.state = 'pause';
		var cur = JP.getCurTime (); 
		var dur = JP.getDuration();
		$.log("---------------cur:"+cur+" "+dur);
		var con = '<div>'+this.disName+'</div>';
		var	rightcon = '<div class="play-voluemBoxMid"><div class="play-voluemBoxPos"  id="pauseBoxPos"><a herf="#" id="playSeekA"></a></div></div>'
			rightcon +='<div class="play-time">'+this.formatPlayTime(cur)+'/'+this.formatPlayTime(dur)+'</div>'; $.log(con);
		
		//计算暂停位置
		var w = cur*this.seekBoxWidth/(dur - 0);
		
		$('#pauseOrPlayBox .left').html(con);
		$('#pauseOrPlayBox .right').html(rightcon);
		$('#pauseBoxPos').width(w);
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
	hasInitAudio:false,
	initAudioBox:function(){
		var AudioSetting = $('<div class="AudioSubtitle" id="AudioSetting"></div>');
		$('body').append(AudioSetting);
		var con = '';
		con += '<div class="AudioSubtitle_list">';
			con += '<h1>&nbsp;</h1>';
			con += '<div id="AudioSettingList">';
			con += '</div>';
		con += '</div> '; 
		AudioSetting.html(con);
		
	},
	audioList:false,
	showAudioBox:function(){			//显示多音轨
		if(!this.hasInitAudio){
			this.initAudioBox();
			this.hasInitAudio = true;
		}
		var list = JP.GetTrackList();
		if(list && list.length > 1){
			this.audioList = list;
			$('#AudioSetting h1').html(lang.local.video_Audio);
			$('#AudioSetting').show();
			var con = '';curItemId=0,j=0;
			for(var i = 0;i<list.length;i++){
				var data = list[i];j= i + 1;
				
				var name ;
				if(!data.Lang){
					name = lang.play.audio+j;
				}else{
					name = data.Lang;
				}
				
				con += '<a href="#" id="play-audio-'+j+'"><span>'+name+'</span></a>';
				if(data.CurAudio=="true"){
					curItemId = j;
				}
			}
			$('#AudioSettingList').html(con);
			if(curItemId == 0){curItemId = 1}; 
			
			$("#AudioSettingList a").focus(function(e) {
                KEY.CURTYPE = 'playAudio';
            }).click(function(e) {
               var idArr = this.id.split('-'); 
			   var i = parseInt(idArr[2]);
			   var data = myPlayer.audioList[i - 1 ];
			  
			   JP.SetTrack(parseInt(data.Id));
			   
			   myPlayer.hideAudioBox();
			   return false;
            });
			$("#AudioSettingList a:eq("+(curItemId - 1)+")").find('span').addClass('cur-as');
			$('#play-audio-'+curItemId).focus();
		}
	},
	hideAudioBox:function(){
		KEY.CURTYPE =false;
		$('#justForA').focus();
		$('#AudioSetting').hide();
	},
	hasInitSubtitle:false,
	initSubtitleBox:function(){
		var SubtitleSetting = $('<div class="AudioSubtitle" id="SubtitleSetting"></div>');
		$('body').append(SubtitleSetting);
		var con = '';
		con += '<div class="AudioSubtitle_list">';
			con += '<h1>&nbsp;</h1>';
			con += '<div id="SubtitleSettingList">';
			con += '</div>';
		con += '</div> '; 
		SubtitleSetting.html(con);
		
	},
	addPlayerSubtitle:function(){
		var list = JP.GetSubtitleList();
		if(!this.subtitleList){
			this.subtitleList = new Array();
		}
		if(list && list.length > 0){
			for(var i = 0;i<list.length;i++){
				var data = list[i];
				data.isOut = false;			//内置字幕
				this.subtitleList.push(data);
			}
		}
	},
	addSubtitle:function(data){ 
		data.CurSubtitle = false;
		
		if(!this.subtitleList){
			this.subtitleList = new Array();
		}
		this.subtitleList.push(data);
	},
	startSubtitle:function(){		//开启字幕
		if(this.subtitleList && this.subtitleList.length > 0){
			var sub = this.subtitleList[this.subtitleList.length - 1];
			if(sub.Id != -1){
				this.subtitleList.push({Id:-1,Lang:lang.play.hideSubtitle});
			}
			var curItemId=0;
			for(var i = 0;i<this.subtitleList.length;i++){
				var data = this.subtitleList[i];
				if(data.CurSubtitle=="true"){
					curItemId = i+1;
				}
			}
			if(curItemId == 0){			//没有正在使用的字幕
				this.changeSubtitle(this.subtitleList[0]);
			}
		}
	},
	changeSubtitle:function(data){
		for(var i = 0;i<this.subtitleList.length;i++){
			var d = this.subtitleList[i];
			d.CurSubtitle="false";
		}
		data.CurSubtitle = "true";
		
		if(this.runSubtitleTimer){clearInterval(this.runSubtitleTimer);this.runSubtitleTimer = null;}
		if(!data.isOut || data.Id == -1){		//如果不是外围字幕
			 JP.SetSubtitle(parseInt(data.Id)); 
		}else{
			JP.SetSubtitle(-1);
			this.curSubtitle = data;
			if(!data.subtitleList){
				if(data.url){	//如果是外部连接
					var url = $.getImageUrl(data.url);
					$.ajax({
						url:url,
						type:'GET',
						dataType:"html",
						success:function(text){
							var list = myPlayer.formatSubtitle(text);
							data.subtitleList = list;
							if(data.CurSubtitle == "true"){		//如果字幕还是正在使用
								myPlayer.runSubtitle();
							}
						}
					});
				}else if(data.path){			//如果是本地文件
					
					var text = $.ReadFile(data.path); 
					var list = myPlayer.formatSubtitle(text);  $.log("list:::"+list.length);
					data.subtitleList = list;
					myPlayer.runSubtitle();
				}
			}else{
				myPlayer.runSubtitle();
			}
		}
	},
	runSubtitleTimer:null,
	runSubtitle:function(){
		
		if(this.runSubtitleTimer){clearInterval(this.runSubtitleTimer);this.runSubtitleTimer = null;}		//删除字幕定时器
		this.runSubtitleTimer = setInterval("myPlayer.runSubtitleText()",200);
	},
	runSubtitleText:function(){		//定时显示字幕
		var subtitle = this.curSubtitle;
		var curTime = JP.getCurTime ()*1000; 
		var list = subtitle.subtitleList; $.log(list.length);
		var curItemId = 0;
		for(var i = 0;i<list.length;i++){
			var d = list[i];
			if(d.start<=curTime && d.end>curTime){
				curItemId = i + 1;
				break;
			}else if(d.start > curTime){
				break;
			}
		}
		
		if(curItemId > 0){		//找到匹配的字幕
			if(subtitle.curItemId != curItemId){
				var d = list[curItemId-1];
				myPlayer.showSubtitleText(d.list,d.end - d.start);
				subtitle.curItemId = curItemId;
			}
		}
	},
	getSubTime:function(timeMatch){
		var t1 = timeMatch.split(',');
		var t11 = t1[0].split(':');
		var t11v = parseInt(t11[0],10)*3600 + parseInt(t11[1],10)*60 + parseInt(t11[2],10);
		var t12v = parseInt(t1[1],10);
		
		return t11v*1000 + t12v;
	},
	formatSubtitle:function(text){
		var subList = new Array();
		var list = text.split('\r\n');
		if(list.length == 1){
			list = text.split('\n');
		}
		for(var i = 0;i<list.length;){
			var s = list[i];
			if(s.match(/^[0-9]+$/)){  //如果是整数
				i++;
				var time = list[i];
				var timeMatch = time.match(TIME_FORMAT);			//如果是时间
				if(timeMatch){
					var startTime = this.getSubTime(timeMatch[0]);
					var endTime = this.getSubTime(timeMatch[1]);
					i++;
					s = list[i];
					var textList = new Array();
					while(!s.match(/^[0-9]+$/)){
						if(s){
							textList.push(s);
						}
						i++;
						if(i>=list.length)break;
						s = list[i];
					}
					if(textList.length > 0){
						subList.push({
							start:startTime,
							end:endTime,
							list:textList,
						});
					}
				}
			}else{
				i++;
			}
		}
		return subList;
	},
	subtitleList:false,
	showSubtitleBox:function(){
		if(!this.hasInitSubtitle){
			this.initSubtitleBox();
			this.hasInitSubtitle = true;
		}
		var list=this.subtitleList
		if(list && list.length > 1){
			
			$('#SubtitleSetting h1').html(lang.local.video_Subtitle);
			$('#SubtitleSetting').show();
			var con = '';curItemId=0,j=0;
			
			for(var i = 0;i<list.length;i++){
				var data = list[i];j= i + 1;
				con += '<a href="#" id="play-subtitle-'+j+'"><span>'+data.Lang+'</span></a>';
				if(data.CurSubtitle=="true"){
					curItemId = j;
				}
			}
			


			$('#SubtitleSettingList').html(con);
			if(curItemId == 0){curItemId = this.subtitleList.length}; 
			
			$("#SubtitleSettingList a").focus(function(e) {
                KEY.CURTYPE = 'playSubtitle';
            }).click(function(e) {
               var idArr = this.id.split('-'); 
			   var i = parseInt(idArr[2]);
			   var data = myPlayer.subtitleList[i - 1 ];
			  
			  	myPlayer.changeSubtitle(data);
			  
			   myPlayer.hideSubtitleBox();
			   return false;
            });
			$("#SubtitleSettingList a:eq("+(curItemId - 1)+")").find('span').addClass('cur-as');
			$('#play-subtitle-'+curItemId).focus();
			
		}
	},
	hideSubtitleBox:function(){
		KEY.CURTYPE =false;
		$('#justForA').focus();
		$('#SubtitleSetting').hide();
	},
	subtitleTimer:null,
	showSubtitleText:function(text,duration){  
		var subtitleText = $('#subtitleText');
		if(subtitleText.length == 0){
			subtitleText = $('<div id="subtitleText"></div>');
			$('body').append(subtitleText);
		}
		var con = '';
		if(typeof(text)=='string'){
			var textArr = text.split('\n');
			for(var i = 0;i<textArr.length;i++){
				con += '<div>'+textArr[i]+'</div>';
			}
		}else{
			for(var i = 0;i<text.length;i++){
				con += '<div>'+text[i]+'</div>';
			}
		}
		$.log(con);
		subtitleText.html(con);
		subtitleText.show();
			
		
		if(this.subtitleTimer){
			clearTimeout(this.subtitleTimer);this.subtitleTimer = null;
		}
		this.subtitleTimer = setTimeout("myPlayer.hideSubtitleText()",duration);
	},
	hideSubtitleText:function(){
		var subtitleText = $('#subtitleText');
		subtitleText.hide();
	},
	showASTipTimer:null,
	showASTip:function(){
		var asPlayerTipBox = $('#asPlayerTipBox');
		if(asPlayerTipBox.length == 0){
			asPlayerTipBox = $('<div class="AS-TIP" id="asPlayerTipBox"></div>');
			$('body').append(asPlayerTipBox);
			var html = '';
			html += '<div id="aPlayerTipBox"><p class="but_red"></p>'+lang.play.tracks+'</div>';
			html += '<div id="sPlayerTipBox"><p class="but_gr"></p>'+lang.play.subtitle+'</div>';
			asPlayerTipBox.html(html);
		}
		var bo = false;
		if(this.subtitleList && this.subtitleList.length > 0){
			$("#sPlayerTipBox").show();
			bo = true;
		}else{
			$("#sPlayerTipBox").hide();
		}
		var list = JP.GetTrackList();   $.log("list:::::::::::::::::::"+list.length);
		if(list && list.length > 1){
			$("#aPlayerTipBox").show();
			bo = true;
		}else{ $.log('here...');
			$("#aPlayerTipBox").hide();
		}
		if(this.showASTipTimer){clearTimeout(this.showASTipTimer);this.showASTipTimer = null;}
		if(bo){
			asPlayerTipBox.show();
			this.showASTipTimer = setTimeout("myPlayer.hideASTip()",5000);
		}else{
			asPlayerTipBox.hide();
		}
	},
	hideASTip:function(){
		$('#asPlayerTipBox').hide();
		clearTimeout(this.showASTipTimer);this.showASTipTimer = null;
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
	}else if(keyName == 'KEY_OK' || keyName == 'KEY_PLAY_STOP'){
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
	}else if(keyName == 'KEY_FAST_PLAY' || keyName == 'KEY_SLOW_PLAY'){
		//KEY.CURTYPE =false;
		//$('#justForA').focus();
		$('#pauseOrPlayBox').hide();
		KEY.CURTYPE = 'seekBox';
		myPlayer.run('seek');
		//KEY.CURTYPE = 'seekBox';
	}
	return false;
}

KEY.TYPE['playAudio'] = function(key,keyName,a){
	if(keyName == 'KEY_RETURN'){		//返回
		myPlayer.hideAudioBox();
	}else if(keyName == 'KEY_DOWN'){
		$(a).next().focus();
	}else if(keyName == 'KEY_UP'){
		$(a).prev().focus();
	}else if(keyName == 'KEY_OK'){
		return true;
	}
	return false;
}

KEY.TYPE['playSubtitle'] = function(key,keyName,a){
	if(keyName == 'KEY_RETURN'){		//返回
		myPlayer.hideSubtitleBox();
	}else if(keyName == 'KEY_DOWN'){
		$(a).next().focus();
	}else if(keyName == 'KEY_UP'){
		$(a).prev().focus();
	}else if(keyName == 'KEY_OK'){
		return true;
	}
	return false;
}

