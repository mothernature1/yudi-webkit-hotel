var appList = null;
var hasInitApp = false;
var appNum = 6;
function showApps(){
	$('#appBox').show();
	$('#selBox').hide();
	if(!hasInitApp){
		initApps();
		hasInitApp = true;
	}
	$('#app-a-1').focus();
}

function hideApps(){
	KEY.CURTYPE = false;
	$('#appBox').hide();
	$('#nav-a-' +lastFocusId).focus();
}

function initApps(){
	appList = getAppList();
	var con = '',app,j;
	con += '<div class="appList">';
	for(var i = 0;i<appList.length;i++){
		app = appList[i];j = i + 1;
		con += '<div><img src="'+app.logo+'"/><a href="#" id="app-a-'+j+'">&nbsp;</a><p>'+app.name+'</p></div>';
	}
	con += '</div>'; $.log(con);
	$('#appBox').html(con);
	
	$('#appBox a').focus(function(e) { $.log(12);
         KEY.CURTYPE = 'apps';
    }).click(function(e) {
        var idArr = this.id.split('-'); 
	    var id = parseInt(idArr[2]);
		var data = appList[id - 1];
	   
	    if(data.tar!="account"&&data.tar!="weather"){
			var globalData = $.getSession("globalData",""); 
			if(globalData){
				if(!planId){
					showGTip(lang.tip.expiredTip,5);
					return false;
				}
			}else{
				var networkCheck = $.getSession("networkCheck","");
				if(networkCheck == "true"){
					showGTip(lang.tip.autoFailTip,5);
				}else{
					showGTip(lang.tip.networkFailsTip,5);
				}
				return false;
			}
		}

				
	   /*
	   if(!planId && id!=appList.length){
			showGTip(lang.tip.expiredTip,5);
			return false;
		}*/
	   $.go(config.project+'/'+data.url,data.url);
	   return false;
    });
}

KEY.TYPE['apps'] = function(key,keyName,a){
	var idArr = a.id.split('-');
	var id = parseInt(idArr[2]);
	if(keyName == 'KEY_RETURN'){			//向下按
		hideApps();
		return false;
	}else if(keyName == 'KEY_LEFT'){
		id--;
		$('#app-a-'+id).focus();
	}else if(keyName == 'KEY_RIGHT'){		//向右移
		id++;
		$('#app-a-'+id).focus();
	}else if(keyName == 'KEY_UP'){
		var len = parseInt((id - 1)/appNum) + 1;
		if(len > 1){
			var i = id - appNum;
			$('#app-a-'+i).focus();
		}
	}else if(keyName == 'KEY_DOWN'){			//向下按
		var len = parseInt((appList.length - 1)/appNum) + 1;
		var len2 = parseInt((id - 1)/appNum) + 1;
		if(len2 < len){
			var i = id + appNum;
			if(i>appList.length ){
				i = appList.length ;
			}
			$('#app-a-'+i).focus();
		}
	}
}