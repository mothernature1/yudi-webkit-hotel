//根据链接获取播放地址

function loadPlayURL(obj,callback){
	//data.url 为ajax要请求的连接
	$.log("播放地址url："+obj.url);
	$.ajax({
	
			url:obj.url,
			dataType:"html",
			success:function(data){
				
				
				var swfConfigIndex = data.indexOf('swfConfig');
				var playUrl = null;
				var str = false;
				if(swfConfigIndex>-1){
					var last = data.indexOf('};',swfConfigIndex);
					if(last > -1){
						str = data.substring(swfConfigIndex,last+2);
					}
				}
				
				if(!str){
					swfConfigIndex = data.indexOf("'PLAYER_CONFIG':");
					
					if(swfConfigIndex>-1){
						var last = data.indexOf('});',swfConfigIndex);
						if(last > -1){
							str = "swfConfig= "+data.substring(swfConfigIndex+16,last);
						}
					}
				}
				
				if(!str){
					swfConfigIndex = data.indexOf("playerConfig");
					
					if(swfConfigIndex>-1){
						var last = data.indexOf('};',swfConfigIndex);
						if(last > -1){
							var first = data.indexOf('{',swfConfigIndex);
							str = "swfConfig= "+data.substring(first,last+2);
						}
					}
				}
				
				
				//mShowLogToFile(str);
				if(str){
					
						eval('var '+str);
						//mShowLogToFile(swfConfig.args.fmt_url_map);
						var fmt_stream_array = swfConfig.args.url_encoded_fmt_stream_map.split(',');
						
						var fmt_list_array = swfConfig.args.fmt_list.split(',');
						
						var list = new Array();var num = 0;
						for(var i = 0;i<fmt_stream_array.length;i++){
							var stream = fmt_stream_array[i];
							var streamObj = parse_youtube_map(fmt_stream_array[i].split("&")); 
							
							var type = streamObj.type;
							
							var codescIndex = stream.indexOf("codecs");
							var codesc = 0;
							if(codescIndex>0){
								var codescVal = unescape(stream.substring(codescIndex+6));
								if(codescVal.indexOf("avc")>-1){
									codesc = 1;
								}else{
									codesc = -1;
								}
							}
							
						
							var stream_url = streamObj.url+'&signature='+streamObj.sig;
							var fmt = fmt_list_array[i].split("/")[1];
							
							var fmtArray = fmt.split('x');
							var frmLeave = parseInt(fmtArray[0]);
							var leave = 1;
							if(frmLeave > 800){
								leave = 3;
							}else if(frmLeave > 480){
								leave = 2;
							}
							
							//stream_url = unescape(stream_url); 
							if(type.indexOf('x-flv')>-1){
								leave = -1;
							}
							
							if(codesc > -1){
								num++;
								list.push({num:num,playUrl:stream_url+'&bp=0',fmt:fmt,codesc:codesc,leave:leave});
							}
						}
						list.sort(descByCodesc);
						
						playUrlList = list;
			
						playUrl =  playUrlList[0].playUrl;
						
						
				}
				$.log("播放地址:"+playUrl);
				callback(obj,playUrl);
				
				
				
				
	
			},error:function(e){
				$.log($.toJSON(e));
				callback(false);
			}
		});
}

function parse_youtube_map(a) {
	var o = {};
	for (var i = 0; i < a.length; ++i) {
		var j = a[i].indexOf("=");  
		o[a[i].substring(0, j)] = unescape(a[i].substring(j + 1));
	}
	return o;
}


//根据链接获取相关视频
function loadRelateList(data,callback){
	//data.url 为ajax要请求的连接
  /*
	var list = new Array();
	for(var i = 0;i<10;i++){
		list.push({
			title:'vod:::'+i,
			img:'images/bw.jpg',
		});
	}*/
	
	downloadRelate(data,callback);
	
}



//下载页面
function downloadRelate(data,callback){
	$.ajax({
		url:data.url,
		type:'GET',
		dataType:'html',
		code:'utf8',
		success:function(html){
			
			var dom=$(html);
			var list = new Array();
			
			  dom.find("#watch-related").find(".video-list-item").each(function(){
				  
				    
				      var title=$(this).find("span[class=title]").html();
					 
					  var url="http://www.youtube.com"+$(this).find("a").attr("href")
					  
					  var image="http:"+$(this).find("span[class=yt-thumb-clip-inner]").find("img").attr("data-thumb");
					   //showGTip(image);
					   list.push({
					    'title':title,
						'img':image,
						'url':url
					  });
				  })

				  callback(data,list);
			}
		
		})
	}



function descByCodesc(a,b){
	if(b.codesc == a.codesc){
		return b.leave - a.leave;
	}else{
		return b.codesc - a.codesc;
	}
	
}
