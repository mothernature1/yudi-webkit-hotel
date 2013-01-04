var DEFAULT_IMG = 'images/tv_default.png';
var navList;
var iconList;
var curRegion = '';
$(function(){
	
	navList = new NavList({				//初始化左边导航
		id:'navBox',
		onfocus:function(type,tar){
			curRegion = 'nav';
			$('#infoBox').hide();
		},
		moveRight:function(){			//向右事件
			iconList.setFocus();
		},
		onclick:function(data,id){
			$('#nav').html(data.name);
			if(data.dataList){
				iconList.setDataList(data.dataList);
			}else{
				loadDataList(data,afterLoadDataList);
			}
		}
	});
	
	
	iconList = new IconList({			//初始化右边导航
		id:'iconList',
		disNum:3,
			disRowNum:5,
			itemHeight:158,
			splitHeight:474,
		moveLeft:function(){
			navList.setFocus();
		},
		formatHtml:function(i,row,data){
			var img = $.getImageUrl(data.image,DEFAULT_IMG); 
			var con = '<div class="icon">';
				con += '<img src="'+img+'" />';
				con += '<a href="#" id="'+this.target+'-a-'+i+'" tar="'+i+'" row="'+row+'"></a>';
			con += '</div>';
			return con;
			
		},
		onfocus:function(data,id){
			if(curRegion!='body'){
				//$('#infoBox').show();
			}
			curRegion = 'body';
			var img = $.getImageUrl(data.image,DEFAULT_IMG); 
			$('#tvIcon').html('<img src="'+img+'"/>');
			$('#tvTitle').html(data.id+'&nbsp;'+data.name);
		},
		onclick:function(data,id){
			var curTypeId =  navList.curItemId;
			gotoPlayPage(data,curTypeId,id);
		}
	}); 
	
	initData();
	navList.setDataList(typeList,true);
	navList.Click(1);
});


function gotoPlayPage(data,typeId,itemId){

	$.setSession('dataList',$.toJSON(data.list));
	$.gotoPage('play/index.html');
	

}