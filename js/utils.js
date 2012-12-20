// JavaScript Document
var _isAli = typeof(LOG)== 'object'; 

Date.prototype.format = function(format)  
{  
   var o = {  
     "M+" : this.getMonth()+1, //month  
     "d+" : this.getDate(),    //day  
     "h+" : this.getHours(),   //hour  
     "m+" : this.getMinutes(), //minute  
     "s+" : this.getSeconds(), //second  
     "q+" : Math.floor((this.getMonth()+3)/3), //quarter  
     "S" : this.getMilliseconds() //millisecond  
   }  
   if(/(y+)/.test(format)) format=format.replace(RegExp.$1,  
     (this.getFullYear()+"").substr(4 - RegExp.$1.length));  
   for(var k in o)if(new RegExp("("+ k +")").test(format))  
     format = format.replace(RegExp.$1,  
       RegExp.$1.length==1 ? o[k] :   
         ("00"+ o[k]).substr((""+ o[k]).length));  
   return format;  
}

/**
 * description : 得到字符串的字节长度;
 * @author yangzy;
 * @version 0.2;
 * @return 返回字符串的字节长度(eg:"一二12"的字节长度是6);
 */
String.prototype.getLength=function(){
 var text=this.replace(/[^\x00-\xff]/g,"**");
 return text.length;
}
/**
 * description : 按字节长度截取字符串,并添加后缀.
 * @author yangzy;
 * @version 0.3;
 * @param len 需要截取的长度,字符串长度不足返回本身;
 * @param alt 添加后缀(非必要),默认为"......";和 "javascript按字节长度截取字符串,并添加后缀. " 有关的java编程小帖士：

strong>Message.msg

指定消息表示符。

语法

public int msg;
 
 * @return 返回截取后的字符串;
 * @requires getlength;
 */
String.prototype.getShortForm=function(len,alt){
	
 var tempstr=this;

 if(this.getLength()>len)
 {
    if(!alt) 
	{
	   alt="...";

    }
    var i=0;

    for(var z=0;z<len;z++)
    {

      if(tempstr.charCodeAt(z)>255){
		  i=i+2;
		}
		else
		{
		   i=i+1;
		}
		if(i>=len)
		{
			tempstr=tempstr.slice(0,(z + 1))+alt;

			 break;
		}
	  }
   return tempstr;
 }else{

  return this+"";
 }
} 

String.prototype.trim = function()
{
    return this.replace(/(^[\\s]*)|([\\s]*$)/g, "");
}

 

//control start
document.onkeydown = function (e){
	var key;
	if (e) {
        key = e.keyCode;
    }else{
        key = window.event.keyCode;
    }
	//if(!KEY.key.hasOwnProperty(key)){return ;}
	

	if(key>=96 && key<=105){key = key - 48;}			//将数字转化成key值
	
	if(typeof(LOG)== 'object')
	{
		KEY.KEYBOARD = KEY.key[key];
	}
	else
	{
		KEY.KEYBOARD = KEY.pcKey[key];
	}
	if(KEY.PRESSTIME){
		var date = new Date();
		KEY.PRESSTIME = date.getTime();
	}
	
	$.log(key+":"+KEY.KEYBOARD+":"+KEY.CURTYPE);
	
	if(!KEY.PRESS && key!=27){return false;}
	

	//if(key == 74){KEY.KEY_RECORD(key,KEY.KEYBOARD,a);}
	
	
	if(KEY.KEYBOARD == 'KEY_POWER'){
		if(config.shutdownTip){
			KEY.shutDown();
		}else{
			return  $.gotoPage(PAGE_PATH+'shutdown.html');
		}
	} 
	/*
	else if(KEY.KEYBOARD == 'KEY_EPG'){
		$.ScreenShot();
		return false;
	}
	*/
	var a = document.activeElement;    
	if(KEY.CURTYPE && KEY.TYPE[KEY.CURTYPE]){		//当前键盘类型不为空,使用对应的键函数
		return KEY.TYPE[KEY.CURTYPE](key,KEY.KEYBOARD,a);
	}
	
	
	
	if(key == 27){
		if(KEY.KEY_RETURN){
			var bo = KEY.KEY_RETURN(key,KEY.KEYBOARD,a);
			
			return ;
		}
	}
	
	
	if(KEY[KEY.KEYBOARD ]){
		var  bo = KEY[KEY.KEYBOARD ](key,KEY.KEYBOARD,a); 
		if(a.tagName.toLowerCase() =='input'&&  bo===false){
			return false;
		}
	}
	return ;

	
}
/*
*	定义key
*/
// 33 pageUp,34,pageDown
var KEY = {
	key : {
		33:'PAGE_UP',
		34:'PAGE_DOWN',
		48:'KEY_0',
		49:'KEY_1',
		50:'KEY_2',
		51:'KEY_3',
		52:'KEY_4',
		53:'KEY_5',
		54:'KEY_6',
		55:'KEY_7',
		56:'KEY_8',
		57:'KEY_9',
		13:'KEY_OK',
		27:'KEY_RETURN',
		37:'KEY_LEFT',
		38:'KEY_UP',
		39:'KEY_RIGHT',
		40:'KEY_DOWN',
		65:'KEY_POWER',			//关机
		66:'KEY_SLOW_PLAY',
		68:'KEY_DEL',
		70:'KEY_MUTE',			//静音
		71:'KEY_CH_P',		//频道减
		72:'KEY_CH_A',		//频道加
		74:'KEY_RECORD',
		75:'KEY_EPG',        //epg
		76:'KEY_VOL_A',		//频道加
		77:'KEY_STOP',
		78:'KEY_PLAY_STOP',
		88:'KEY_REFRESH',
		90:'KEY_VOL_P',			//音量减
		112:'KEY_BTN_RED',		
		113:'KEY_BTN_GREEN',	
		114:'KEY_BTN_YELLOW',	
		115:'KEY_BTN_BLUE',		
		190:'KEY_FAST_PLAY',
		191:'KEY_NEXT',
		
	},
	pcKey: {
		33:'PAGE_UP',           //Page Up
		34:'PAGE_DOWN',         //Page Down
		48:'KEY_0',             //0
		49:'KEY_1',             //1
		50:'KEY_2',             //2
		51:'KEY_3',             //3
		52:'KEY_4',             //4
		53:'KEY_5',             //5
		54:'KEY_6',             //6
		55:'KEY_7',             //7
		56:'KEY_8',             //8
		57:'KEY_9',             //9
		13:'KEY_OK',            //Enter
		27:'KEY_RETURN',        //Esc
		37:'KEY_LEFT',          //←
		38:'KEY_UP',            //↑
		39:'KEY_RIGHT',         //→
		40:'KEY_DOWN',          //↓
		113:'KEY_POWER',		//关机 F2
		188:'KEY_SLOW_PLAY',    // <
		46:'KEY_DEL',			//Del
		35:'KEY_CH_P',		    //频道减 END
		36:'KEY_CH_A',		    //频道加 END
		67:'KEY_RECORD',        //C
		45:'KEY_EPG',           //Insert
		107:'KEY_VOL_A',		//音量加 +
		83:'KEY_STOP',          //S 
		80:'KEY_PLAY_STOP',     //P
		109:'KEY_VOL_P',		//音量减 +
		82:'KEY_BTN_RED',		//R
		71:'KEY_BTN_GREEN',		//G
		89:'KEY_BTN_YELLOW',	//Y
		66:'KEY_BTN_BLUE',		//B
		190:'KEY_FAST_PLAY',    //>
		78:'KEY_NEXT',          //N
		73:'KEY_REFRESH',		//i 刷新
		
	},
	PRESS:true,				//可以用来设置是否屏蔽掉事件,如正在请求外部页面的时候,在页面请求完成前,这段时间内不希望用户操作,可以将其设成false,对返回键不起作用
	CURTYPE:'',				//当前键盘的控制类型
	KEYBOARD:'',			//当前按键对应的名称,如按了0x14,KEYBOARD的值为,KEY_FAST
	PRESSTIME:0,			//按键触发时间
	TYPE:{},				//函数集
}


KEY.TYPE['ipbox'] = function(key,keyName,a){
	if(key == 27){
		if(KEY.KEY_RETURN){
			KEY.KEY_RETURN(key,KEY.KEYBOARD,a);
			return ;
		}
	}
	switch (key){
		case 38:    //向上
			if(KEY.TYPE['ipbox'].KEY_UP){KEY.TYPE['ipbox'].KEY_UP(key,KEY.KEYBOARD,a);}
			break;
		case 39:  //向右
			var pos=$(a).attr('pos');
			if(pos<4){
				pos ++;
				var idArray = a.id.split('-');
				var id = idArray[0]+'-'+idArray[1]+'-'+pos;
				$('#'+id).focus();
			}else{
				if(KEY.TYPE['ipbox'].KEY_RIGHT){KEY.TYPE['ipbox'].KEY_RIGHT(key,KEY.KEYBOARD,a);}
			}
			break;
		case 40:	//向下
			if(KEY.TYPE['ipbox'].KEY_DOWN){KEY.TYPE['ipbox'].KEY_DOWN(key,KEY.KEYBOARD,a);}
			break;
		case 37:		//向左
			var pos=$(a).attr('pos');
			if(pos>1){
				pos --;
				var idArray = a.id.split('-');
				var id = idArray[0]+'-'+idArray[1]+'-'+pos;
				$('#'+id).focus();
			}else{
				if(KEY.TYPE['ipbox'].KEY_LEFT){KEY.TYPE['ipbox'].KEY_LEFT(key,KEY.KEYBOARD,a);}
			}
			break;
		default:console.log(key);
			if( key>=48 && key<=57){			//如果是数字键
				$.setIpAValue(a,key-48);
			}
		break;
	}
}


var lastActiveA = null;
KEY.shutDown = function(){
	if(KEY.CURTYPE!="shutdown"){
		showShutDownWindow();
	}else{
		var a = document.getElementById('shutdownButton');
		a.click();
	}
	return true;
}

KEY.TYPE['shutdown'] = function(key,keyName,a){
	if(keyName == 'KEY_RETURN'){			//返回键
		$('#backButton').click();
		return false;
	}else if(keyName == 'KEY_LEFT'){	
		var id = a.id;
		if(id == 'sleepButton'){$('#backButton').focus();}
		else if(id == 'shutdownButton'){$('#sleepButton').focus();}
		else if(id== 'backButton'){$('#shutdownButton').focus();};
	}else if(keyName == 'KEY_RIGHT'){
		var id = a.id;
		if(id == 'sleepButton'){$('#shutdownButton').focus();}
		else if(id == 'shutdownButton'){$('#backButton').focus();}
		else if(id== 'backButton'){$('#sleepButton').focus();};
	}
}


//初始化关机
function initShutDownWindow(){
	var box = $('<div id="shutDownWindow"></div>');
	$('body').append(box);
	
	var html = '';
	
	html += '<div class="item"><a href="#" tar="sleep" class="reboot" id="sleepButton">&nbsp;</a> <p>'+lang.tip.reboot+'</p></div>';
	html += '<div class="item"><a href="#" tar="off" class="shutdown" id="shutdownButton">&nbsp;</a> <p>'+lang.tip.shutdown+'</p></div>';
	html += '<div class="item"><a href="#" tar="back" class="back" id="backButton">&nbsp;</a> <p>'+lang.tip.back+'</p></div>';
	
	
	box.html(html);
	
	$('a',box).focus(function(e) {
		KEY.CURTYPE = 'shutdown';
		
	}).blur(function(){
		
	}).click(function(e){
		var tar  = $(this).attr('tar');
		if(tar == 'sleep'){STB.Reboot();}
		else if(tar == 'off'){ $.gotoPage(PAGE_PATH+'shutdown.html');}// STB.Shutdown();}
		else if(tar == 'back'){KEY.CURTYPE = false;$(lastActiveA).focus();$('#shutDownWindow').hide();}
		
		return false;
	});
}

function showShutDownWindow(){
	if(!this.hasInit){
		initShutDownWindow();
		this.hasInit = true;
	}
	lastActiveA = document.activeElement;
	$('#shutDownWindow').show();
	$('#shutdownButton').focus();
}


$(function(){
	//对jQuery对象进行扩展.理解为增加静态方法
	jQuery.extend({ 
		type:function(o){
			 var _toS = Object.prototype.toString;   
			var _types = {   
				'undefined': 'undefined',   
				'number': 'number',   
				'boolean': 'boolean',   
				'string': 'string',   
				'[object Function]': 'function',   
				'[object RegExp]': 'regexp',   
				'[object Array]': 'array',   
				'[object Date]': 'date',   
				'[object Error]': 'error'   
			};   
			return _types[typeof o] || _types[_toS.call(o)] || (o ? 'object' : 'null'); 
		}, 
		toJSON:function(o){
			 var s = [];   
			switch ($.type(o)) {   
				case 'undefined':   
					return 'undefined';   
					break;   
				case 'null':   
					return 'null';   
					break;   
				case 'number':   
				case 'boolean':   
				case 'date':   
				case 'function':   
					return o.toString();   
					break;   
				case 'string':   
					return '"' + o.replace(/[\x00-\x1f\\"]/g, function(chr){
						 var $specialChars = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' };   
						 return $specialChars[chr] || '\\u00' + Math.floor(chr.charCodeAt() / 16).toString(16) + (chr.charCodeAt() % 16).toString(16); 	
					}) + '"';   
					break;   
				case 'array':   
					for (var i = 0, l = o.length; i < l; i++) {   
						s.push($.toJSON(o[i]));   
					}   
					return '[' + s.join(',') + ']';   
					break;   
				case 'error':   
				case 'object':   
					for (var p in o) {   
						s.push(p + ':' + $.toJSON(o[p]));   
					}   
					return '{' + s.join(',') + '}';   
					break;   
				default:   
					return '';   
					break;   
			}   
		},
		log:function(str){
			if(typeof(LOG)== 'object'){
				LOG.INFO('##############################################'+str);
			}else {
				console.log('###########################'+str);
			}
		},
		template:function(divId,templateId,data){
			var result = TrimPath.processDOMTemplate(templateId, data);
			
			document.getElementById(divId).innerHTML= result;
		},
		getConfigNumberValue:function(key,defaultValue){ 
			return parseInt($.getConfigValue(key,defaultValue));
		},
		getConfigValue:function(key,defaultValue){
			return this.getConfigPathValue(config.configPath,key,defaultValue);
		},
		getConfigPathValue:function(path,key,defaultValue){	
			var value = CONFIG.GetValue(path,key);
			if(!value){
				if(defaultValue==null){
					value = "";
				}else{
					value = defaultValue;
				}
			}
			return value;
		},
		setConfigValue:function(key,value){
			this.setConfigPathValue(config.configPath,key,value);
		},
		setConfigPathValue:function(path,key,value){ 
			CONFIG.SetValue(path,key,value);
		},
		getParameter:function(paras){
			var url = location.href;  
			var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
			var paraObj = {} 
			for (i=0; j=paraString[i]; i++){ 
				paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
			} 
			var returnValue = paraObj[paras.toLowerCase()];
			if(typeof(returnValue)=="undefined"){ 
				return ""; 
			}else{  
				return returnValue; 
			} 
		},
		gotoPage:function(url){
			setTimeout(function(){
				window.location.href= url;
			},50);
		},
		initIpBox:function(boxId,value,focus){
			var con = '';
			var ipExits = false;
			var ipArray;
			var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
			if(value && value.match(reg)){
				ipExits = true;
				ipArray = value.split('.');
			}
			con +='<div class="_ipContentBox"><div class="_ipContent">';
			for(var i=0;i<4;i++){
				var j = i + 1;
				if(ipExits){
					con+='<div class="_ipBox"><a id="'+boxId+'-a-'+j+'" href="#" pos="'+j+'" val="'+ipArray[i]+'">'+ipArray[i]+'</a></div>';
				}else{
					con+='<div class="_ipBox"><a id="'+boxId+'-a-'+j+'" href="#" pos="'+j+'" val="">&nbsp;</a></div>';
				}
			}
			con += '</div></div>';
			$('#'+boxId).html(con);
			
			$('#'+boxId+' a').focus(function(e) {
				var par = $(this).parent();
				par.removeClass('_ipBox').addClass('_ipCurBox');
				KEY.CURTYPE = 'ipbox';
			}).blur(function(e){
				var par = $(this).parent();
				par.removeClass('_ipCurBox').addClass('_ipBox');
			});
			
			if(focus){
				$('#'+boxId+'-a-1').focus();
			}
		},
		setIpAValue:function(a,v){
			var val = $(a).attr('val');
			if(val.length<3){
				val +=''+v;
			}else{
				val = ''+v;
			}
			var rv = parseInt(val,10);
			if(rv<0 ||rv >255){
				val = '';
				a.innerHTML = '&nbsp;';
			}else{
				a.innerHTML = val;
			}
			
			a.setAttribute('val',val);
		},
		setIpFocus:function(boxId,id){
			if(!id){id = 1;}
			$('#'+boxId+'-a-'+id).focus();
		},
		getIpAValueFromBox:function(boxId){
			var val = '';
			$('#'+boxId+' a').each(function(i, element) {
                if(i>0){
					val +='.';
				}
				val += $(this).attr('val');
            });
			if(val =='...'){
				val = '';
			}
			return val;
		},
		checkIp:function(ip){
			var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
			if(ip && ip.match(reg)){
				return true;
			}else{
				return false;
			}
		},
		setIPFocusFromBox:function(boxId){
			$('#'+boxId+' a:first').focus();
		},
		getImageUrl:function(url,defaultUrl){
			if(url && url.indexOf('http') > -1){
				return url;
			}else{
				if(!url && defaultUrl){
					return defaultUrl;
				}else if(url){
					if(url.indexOf('/') == 0){
						return config.webUrl+url;
					}else{
						return url;
					}
				}else{
					return "";
				}
			}
		},
		go:function(url,pageUrl){ 
			if(_isAli){
				var bo = history.go(url); 
			}else{
				var bo = false;
			}
			if(!bo){
				if(!pageUrl){
					var i = url.indexOf('/');
					pageUrl = PAGE_PATH + url.substring(i+1); 
				}
				$.gotoPage(pageUrl);
			}
		},
		goIndex:function(){  $.log(config.project+'/'+config.index+'.html');
			if(_isAli){
				var bo = history.go(config.project+'/'+config.index+'.html');
			}else{
				bo = false;
			}
			if(!bo){ 
				$.gotoPage(PAGE_PATH+config.index+'.html');
			}
		},getIP:function(){
			var ip = NETWORK.GetIP('eth0');
			if(!ip){
				ip = NETWORK.GetIP('ppp0');
			}
			if(!ip){
				ip = NETWORK.GetIP('ra0');
			}
			return ip;
		}
		,paramObj:false
		,setParam:function(key,val){			//设置参数,js对象
			if(!$.paramObj){
				$.paramObj = {};
			}
			$.paramObj[key] = val;
			$.setSession("_page_param",$.toJSON($.paramObj));
			
		},getParam:function(key,defaultValue){			//返回对数对象
			if(!$.paramObj){
				var str = $.getSession("_page_param"); 
				if(str){
					eval("var obj = "+str);
					$.paramObj = obj;
				}else{
					$.paramObj = {};
				}
			}
			if($.paramObj.hasOwnProperty(key)){
				return  $.paramObj[key];
			}else{
				return defaultValue;
			}
		},setSession:function(key,val){		//获取/设置sessionStorage
			var sessionStorage = window.sessionStorage;
			sessionStorage.setItem(key,val);
		},getSession:function(key,defaultValue){
			var sessionStorage = window.sessionStorage;
			var val = sessionStorage.getItem(key); if(val=='undefined'){val = '';}
			if(!val && defaultValue){
				val = defaultValue;
			}
			return val;
		},removeSession:function(key){
			var sessionStorage = window.sessionStorage;
			sessionStorage.removeItem(key);
		},setLocal:function(key,val){		//获取/设置sessionStorage
			if(_isAli){
				var path = '/usr/data/database/'+key;
				$.WriteFile(path,val);
			}else{
				var localStorage = window.localStorage;
				localStorage.setItem(key,val);
			}
		},getLocal:function(key,defaultValue){
			if(_isAli){
				var path = '/usr/data/database/'+key;
				var val = $.ReadFile(path);
				if(!val && defaultValue){
					val = defaultValue;
				}
				return val;
			}else{
				var localStorage = window.localStorage;
				var val = localStorage.getItem(key); 
				if(!val && defaultValue){
					val = defaultValue;
				}
				return val;
			}
		},removeLocal:function(key){
			var localStorage = window.localStorage;
			localStorage.removeItem(key);
		},getLoginInfo:function(key,def){
			var globalData = $.getSession("globalData",""); 
			if(globalData){
				try{
					eval("var data = "+globalData);
					return data[key];
				}catch(e){
					return null;
				}
			}
			return null;
		},
		
		
	});
	//对jQuery方法进行扩展
	jQuery.fn.extend({
		selectRange :function(start, end){		//设置input标签在
			 return this.each(function(){
				if(isNaN(start) ){start = 0;}
				if(isNaN(end)){end = this.value.length;}
			
				if (this.setSelectionRange) {
					//this.setSelectionRange(start, end);
					var that = this;
					setTimeout(function () {
						that.setSelectionRange(start,end);
						$(that).focus();
					}, 0);
				} else if (this.createTextRange) {
					var range = this.createTextRange();
					range.collapse(true);
					range.moveEnd('character', end);
					range.moveStart('character', start);
					range.select();
				}
			})
		}
	})
	
});


var gTipTimer = null;
function showGTip(tip,time,title,pos){
	var gTipBox = $('#gTipBox');
	if(gTipBox.length == 0){
		gTipBox = $('<div id="gTipBox"></div>');
		$('body').append(gTipBox);
		gTipBox.html('<div class="gTipContent"><div id="gTipTop">&nbsp;</div><div id="gTipContent">&nbsp;</div><div id="gTipBottom">&nbsp;</div></div>');
	}
	if(!tip){
		gTipBox.hide();
		return ;
	}
	$('#gTipContent').html(tip);
	
	if(pos){
		gTipBox.css("top",pos);
	}
	
	gTipBox.show();
	if(time){
		if(time <100){time = 1000 * time;}
		if(gTipTimer){clearTimeout(gTipTimer);}
		gTipTimer = setTimeout("hideGTip()",time);
	}
}

function hideGTip(){
	$.log("===============================hideGTip========================");
	var gTipBox = $('#gTipBox');
	var gtip = $('#gTipContent');
	if(gTipBox.length>0){
		gTipBox.hide();
		gtip.html('');
	}
}


//显示加载点点点
var gPointLoadingTimer = null;
var gPointLoadingTimers = 0;
var gPointLoadingText = '●●●●●●●●●●';
function showGPointLoading(dom,top){
	var gPointLoadingBox = $('#gPointLoadingBox');
	if(gPointLoadingBox.length ==0){
		gPointLoadingBox = $('<div id="gPointLoadingBox"></div>');
		$('body').append(gPointLoadingBox);
	}
	if(gPointLoadingTimer){clearInterval(gPointLoadingTimer);gPointLoadingTimer = null;}
	
	gPointLoadingTimers = 0;
	gPointLoadingBox.html('');
	gPointLoadingBox.show();
	var l,t;
	if(typeof(dom) =='object'){
		l = dom.positionLeft;
		t = dom.positionTop + dom.offsetHeight/2 - 10;
	}else{
		l = dom;
		t = top;
	}
	
	gPointLoadingBox.css({
		left:l,
		top:t,
	});
	gPointLoadingTimer = setInterval("showGPointLoadingText()",300);
	
}

function hideGPointLoading(){
	if(gPointLoadingTimer){clearInterval(gPointLoadingTimer);gPointLoadingTimer = null;}
	var gPointLoadingBox = document.getElementById('gPointLoadingBox');
	if(gPointLoadingBox){
		gPointLoadingBox.style.display = 'none';
	}
}

function showGPointLoadingText(){
	var str = gPointLoadingText.substring(0,gPointLoadingTimers);
	var gPointLoadingBox = document.getElementById('gPointLoadingBox');
	gPointLoadingBox.innerHTML = ''+str;
	gPointLoadingTimers++;
	if(gPointLoadingTimers>10){
		gPointLoadingTimers = 0;
	}
}






//weatherBox
var dateTimer = null;
var dateTimeInt = 10 *1000;
var weekList = ["Sun","Mon",'Tue','Wed','Thu','Fri','Sat'];
var monthList = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var weatherImg = "";	//天气图片
var weatherCity = "";	//天气城市
//右上角更新时间-----------
function changeDateTime(){ 
	var d = new Date();
	var year = d.getFullYear();
	//if(year<2012){return ;}
	
	var dateStr = d.toDateString();
	var dateArray = dateStr.split(' ');
	
	var timeStr = d.toTimeString();
	var timeArray = timeStr.split(':');
	
	var html ='';
	html +='<div class="time">'+timeArray[0]+':'+timeArray[1]+'</div>';
	html += '<img src="'+PAGE_PATH+weatherImg+'"/>';
	html += '<div class="temperature">'+monthList[ d.getMonth()]+' '+dateArray[2]+','+dateArray[3]+'</div>';
	html += '<div class="city">'+weatherCity+'</div>';
			
	$('#weatherBox').html(html);
}
//首页更新时间----
function changeIndexDateTime(){
	var time = new Date();
	var h = time.getHours();
	var m = time.getMinutes();
	var t = (h>9?h:'0'+h)+':' + (m>9?m:'0'+m);
	$('#infoBox .time').html(t);
	var timeArr = time.toString().split(' ');
	var tc = timeArr[0]+' '+timeArr[1]+' '+timeArr[2]+','+timeArr[3];
	$('#infoBox .date').html(tc);
}

$(function(){ 
	var date = $('#weatherBox');
	if(date.length>0){
		//右上角定时器
		weatherImg = $.GetConfigValue("weather_img","images/weather/weather.png");
		weatherCity = $.GetConfigValue("weather_city","");
		changeDateTime();
		dateTimer = setInterval("changeDateTime()",dateTimeInt);
	}else if($('#infoBox .date').length>0){
		//首页定时器
		changeIndexDateTime();
		dateTimer = setInterval("changeIndexDateTime()",dateTimeInt);
	}

});


/*
var dateTimer = null;
var dateTimeInt = 10 *1000;
var weatherImg = "";	//天气图片
function changeDateTime(){ 
	var time = new Date();
	if(time.getFullYear()<2012){return ;}
	
	var h = time.getHours();
	var m = time.getMinutes();
	var t = (h>9?h:'0'+h)+':' + (m>9?m:'0'+m);
	$('#infoBox .time').html(t);
	var timeArr = time.toString().split(' ');
	var tc = timeArr[0]+' '+timeArr[1]+' '+timeArr[2]+','+timeArr[3];
	$('#infoBox .date').html(tc);

}
$(function(){ 
	var date = $('#infoBox .time');
	if(date.length>0){
		weatherImg = $.GetConfigValue("weather_img","images/weather/sunny.png");
		//weatherImg = weatherImg.replace("d00","28");
		changeDateTime();
		dateTimer = setInterval("changeDateTime()",dateTimeInt);
	}

});
*/

$(function(){});
	//对jQuery对象进行扩展.理解为增加静态方法
	
	jQuery.extend({ 
		GetSN:function(){	//获取sn号
			if(_isAli){return STB.GetSN();}
			else{
				var localStorage = window.localStorage;
				var sn = localStorage.getItem('sn');
				if(!sn){sn="288779348"}
				return sn;
			}
		},
		GetIP:function(){		//获取IP
			if(_isAli){return $.getIP();}
			else{return "192.168.1.243";}
		},
		GetGateway:function(){		//获取网关
			if(_isAli){return NETWORK.GetGateway();}
			else{return "255.255.255.0";}
		},
		GetDNS:function(){		//获取DNS
			if(_isAli){return NETWORK.GetDNS();}
			else{return "255.255.255.0";}
		},
		GetMAC:function(){
			if(_isAli){return STB.GetMAC();}
			else{return "255.255.255.0";}
		},
		GetNetInterface:function(){
			if(_isAli){return NETWORK.GetNetInterface();}
			else{return "Cable";}
		},
		GetConfigNumberValue:function(key,defaultValue){
			if(_isAli){
				return $.getConfigNumberValue(key,defaultValue);
			}else{
				return defaultValue;
			}
		},
		GetConfigPathValue:function(path,key,defaultValue){
			if(_isAli){
				return 	$.getConfigPathValue(path,key,defaultValue);
			}else{
				var v = $.getLocal('config_'+key);
				if(!v){v = 'http://114.142.153.146:8080';}
				
				return v;
			}
		},
		GetConfigValue:function(key,defaultValue){ 
			if(_isAli){
				return 	$.getConfigValue(key,defaultValue);
			}else { 
				var v = $.getLocal('config_'+key);
				if(!v){v = defaultValue;}
				
				return v;
			}
		},
		SetConfigValue:function(key,value){
			if(_isAli){
				$.setConfigValue(key,value);
			}else { 
				$.setLocal('config_'+key,value);
			}
		},
		SetBrightness:function(val,type){		//设置透明度
			if(_isAli){
				FB.SetBrightness(val,type);
			}else { return false;}
		},
		SetContrast:function(val,type){		//设置透明度
			if(_isAli){
				FB.SetContrast(val,type);
			}else { return false;}
		},
		SetSaturation:function(val,type){		//设置饱和度
			if(_isAli){
				FB.SetSaturation(val,type);
			}else { return false;}
		},
		SetSharpness:function(val,type){
			if(_isAli){
				FB.SetSharpness(val,type);
			}else { return false;}
		}
		,SetHue:function(val,type){		//设置色深
			if(_isAli){
				FB.SetHue(val,type);
			}else { return false;}
		}
		,SetVideoWin:function(left,top,scaler,type){	//设置缩放
			if(_isAli){
				var val = scaler - 12;   
				var width,height;
				
				left = parseInt(left +26.66666666666666*val);top = parseInt(top+15*val); 
				width = parseInt(1280 - 53.33333333333*val);height = parseInt(720 - 30*val); 
				FB.SetVideoWin(left,top,width,height); 
			}else { return false;}
		}
		,SetAspectMode2:function(val,type){
			if(_isAli){
				FB.SetAspectMode(val,type);
			}else { return false;}
		}
		
		,SetOutMode:function(val,type){
			if(_isAli){ 
				FB.SetOutMode(val);
			}else{
				return false;
			}
		}
		,WriteFile:function(path,con){		//读写文件接口
			if(_isAli){
				FILE.WriteFile(path,con);
			}else{
				if ('localStorage' in window && window['localStorage'] !== null) {///检查浏览器是否支持File Api提供的所有功能
					var storage = window.localStorage;
					storage[path] = con;
				}
			}
		}
		,ReadFile:function(path,defaultValue){
			if(_isAli){
				var val = FILE.ReadFile(path);
				if(!val && defaultValue){
					val = defaultValue;
				}
				return val;
			}else{
				if ('localStorage' in window && window['localStorage'] !== null) {///检查浏览器是否支持File Api提供的所有功能
					var storage = window.localStorage;
					return storage[path];
				}
			}
		}
		,GetCheckExpiredInfo:function(){
			if(_isAli)
			{
				$.log("SN::"+ STB.GetSN())
				$.log( "mGetCheckExpiredInfo::"+GLOBAL.mGetCheckExpiredInfo());
				
				return GLOBAL.mGetCheckExpiredInfo();
			}else{
				var localStorage = window.localStorage;
				var checkInfo = localStorage.getItem('checkInfo');
				if(!checkInfo){
					checkInfo = 'FLLKKMGHL>EGHHGGJFGG>LFY]TRJS[M[FOGKNES\IGOQRLPRTH[F';
				}
				return checkInfo;
				//return "FMHIEGEKI>EGHGDDIHDD>YPFHKERV[[K[W\^XNUVRZWIWVNPMPJ]";
			}
		}
		,GetTVMode:function(){
			if(_isAli){
				return STB.GetTVMode();
			}else{
				return "HDMI";
			}
		}
		,RecoverVersion:function(){
			if(_isAli){
				return VERSION.RecoverVersion();
			}else{
				return "0";
			}
		}
		,ProductID:function(){
			if(_isAli){
				return VERSION.ProductID();
			}else{
				return "0";
			}
		}
		,PagesVersion:function(){
			if(_isAli){
				return VERSION.PagesVersion();
			}else{
				return "0";
			}
		}
		,RootfsVersion:function(){
			if(_isAli){
				return VERSION.RootfsVersion();
			}else{
				return "0";
			}
		}
		,ShowLogToFile:function(str){ 
			if(_isAli){ $.log('mShowLogToFile.............'+str);
				GLOBAL.mShowLogToFile(str);
			}
		}
		,CleanLogFile:function(){ 
			if(_isAli){
				GLOBAL.mCleanLogFile();
			}
		}
		,GetIsExpired:function(str){
			if(_isAli){
				return GLOBAL.mGetIsExpired(str);
			}else{
				return true;
			}
		},
		ClearPageInMemory:function(){		//消除页面缓存
			if(_isAli){
				BROWSER.SetMaximumPagesInCache(0);
				BROWSER.SetMaximumPagesInCache(5);
			}else{
				return false;
			}
		},
		SetUserAgent:function(userAgent){
			if(_isAli){
				BROWSER.SetUserAgent(userAgent);
			}else{
				return true;
			}
		},
		SetProxy:function(){
			if(_isAli){
				var youtubeProxy = $.getLoginInfo("youtubeProxy");
				if(youtubeProxy && youtubeProxy.ip && youtubeProxy.port && youtubeProxy.ip!="" && youtubeProxy.port!=""){
					$.log("=======================youtubeProxy ip port:"+youtubeProxy.ip+":"+youtubeProxy.port);
					//BROWSER.SetProxy("192.168.1.123", 8087);
					BROWSER.SetProxy(youtubeProxy.ip, youtubeProxy.port);
				}
			}
		},
		SetNoProxy:function(){
			if(_isAli){
				BROWSER.SetNoProxy("");
			}
		},
		IsUsbInsert:function(){		//判断U盘是否插入
			if(_isAli){
				var bo = STB.isUsbInsert();	
				return bo;
			}else{
				return false;
			}
		},
		IsScanningUsb:function(){		//判断usb媒体库是否正在检索磁盘文件
			if(_isAli){
				var bo = STB.IsScanningUsb();	
				return bo;
			}else{
				return false;
			}
		},
		GetMaxFile:function(path){		//文件夹里最大的文件名（蓝光用到）
			if(_isAli){
				var bo = STB.GetMaxFile(path);
				return bo;
			}else{
				return false;
			}
		},
		GetUsbCapacity:function(){		//U盘剩余空间
			if(_isAli){
				return STB.GetUsbCapacity();
			}else{
				return 0;
			}
		},
		GetUsbUsed:function(){			//U盘已用空间
			if(_isAli){
				return STB.GetUsbUsed();
			}else{
				return 0;
			}
		},
		LoadFile:function(path,type){		//根据要目录获取所有文件
			if(_isAli){
				
				var bo = STB.isUsbInsert();			//如果U盘不存在
				if(!bo){
					$.log("U盘不存在");
					return false;
				}
			}
			
			if(_isAli){
				var bo = STB.setWorkingDir(path);		//路径不存在
				if(!bo){ $.log("路径不存在"); return false;}
				
				STB.setListFilesExts (type);	//设置文件类型
				var  dataList = STB.ListFiles();	//获取文件列表
				$.log("api列表："+$.toJSON(dataList));
				list = new Array();
				if(dataList){
					for(var i = 0;i<dataList.length;i++){
						var d = dataList[i];
						list.push({
							name:d.fileName ,
							isFolder:d.type=="dir",
							size:d.size,
							playName:d.orgFileName
						});
					}
				}
				return list;
			}else{
				if(path.split('/').length > 6){
					return new Array();
				}else{
					var  list = new Array();
					for(var i = 0;i<15;i++){
						var t ='.mkv';
						if(i>10&t<=12){t = '.mp3';}
						else if(i>12){t = '.bmp';}
						if(i<5){
							list.push({
								name:'file'+i,
								isFolder:i<5,
								size:12500,
							});
						}else{
							list.push({
								name:'file'+i+t,
								isFolder:i>5,
								isFolder:false,
								size:12500,
							});
						}
						
					}
					return list;
				}
			}
		},
	LoadTypeFile:function(type){
		if(_isAli){
		
			var list = STB.EnumerateUSBFiles(type);
		
			var arr = new Array();
			if(list){
				for(var i = 0;i<list.length;i++){
					arr.push({
						name:list[i].FileName,
						isFolder:false,
						path:list[i].FilePath+'/'+list[i].FileName,
					});
				}
			}
			$.log($.toJSON(arr));
			return arr;
		}else{
			 var fileType = '';
			 if(type == 'video'){
				 fileType = '.mp4';
			 }else if(type == 'audio'){
				 fileType = '.mp3';
			 }else if(type == 'picture'){
				 fileType = '.png';
			 }
			 var  list = new Array();
			 for(var i = 1;i<20;i++){
				list.push({name:'a'+i+fileType});
			 }
			 return list;
		}
	},
	ScanUsb:function(){
		if(_isAli){
			STB.ScanUsb ();
		}else{
		
		}
	},
	ShowLoading:function(keyFocus){
		if(keyFocus){
			KEY.PRESS = false;
		}
		if(!_isAli){
			var box = $('#loadingBox');
			if(box.length == 0){
				$('body').append('<div id="loadingBox"><div class="loading">&nbsp;</div></div>');
				box = $('#loadingBox');
			}
			box.show();
		}else{ 
			$.log('LoadingShow.....................');
			BROWSER.LoadingShow(true);
		}
	},
	HideLoading:function(){
		KEY.PRESS = true;
		if(!_isAli){
			var box = $('#loadingBox');
			box.hide();
		}else{
			BROWSER.LoadingShow(false);
		}
	},	
	GetPY:function(py){
		if(!py){
			return new Array();
		}
		if(_isAli){
			var text = GLOBAL.GetTextByPinyin(py); 
			var list = text.split(',');
			return list;
		}else{
			var text = '每,年,暑,假,都,是,一,波,装,机,升,级,的,高,峰,期,原,本,是,为,学,生,族,群,准,备';
			var list = text.split(',');
			
			return list;
		}
	},
	SetAspectMode :function(mode,aspect,style){
		if(_isAli){
			FB.SetAspectMode(mode,aspect,style);
		}
	},
	IsFileExist:function(path){
		if(_isAli){
			return STB.IsFileExist(path);
		}else{
			return false;
		}
	},
	RemoveDir:function(path){
		if(_isAli){
			return FILE.RemoveDir(path);
		}else{
			return false;
		}
	},
	GetSpeed:function(){		//获取网络下载速度
		if(_isAli){
			return NETWORK.GetSpeed();
		}else{
			return '45';
		}
	},
	ScreenShot:function(){
		var bo = $.IsUsbInsert();
		if(!bo){
			showGTip('请插入U盘'); return ;
		}
		//showGTip('截图中...');
		setTimeout(function(){
			var time = new Date();
			var name = time.getTime() + '.png';
			STB.ScreenShot(name);
			showGTip('截图成功...',3); 
		},1);
		
		
	},
	Location:function(url){
		BROWSER.Location(url);
	},
})




KEY.KEY_RETURN = function(){ 
	$.goIndex();
	return false;
}







