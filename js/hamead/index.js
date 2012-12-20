var ulBox = false;
var typeList = false;

$(function(){

	bannerulBox = new ULBox({
		id:'bannerulBox',
		moveDown:function(){
			menulBox.setFocus();	
		},
		moveUp:function(){
			$('#messagebox').focus();	
			},
		onclick:function(data,id){
			$.gotoPage(data.url);
		},
		formatHtml:function(data,id){
			return '<a id="'+this.target+'-a-'+id+'" href="###"><span></span><img src="'+data.image+'"><p>'+data.name+'</p></a>';		
		}
	});
	
	menulBox = new ULBox({
		id:'menulBox',
		itemWidth: 173,
		target:'menulBox',
		moveDown:function(){
		},
		moveUp:function(){	
			bannerulBox.setFocus();
			},
		onclick:function(data,id){
			$.gotoPage(data.url);
		},
		formatHtml:function(data,id){
			return '<a id="'+this.target+'-a-'+id+'" href="###"><span></span><img src="'+data.image+'"><p>'+data.name+'</p></a>';
		}
	});
	
	
	var list =[{name:"Avatar1",image:"images/hamead/pic_1.png",url:'###'},
			   {name:"Avatar2",image:"images/hamead/pic_2.png",url:'###'},
			   {name:"Avatar3",image:"images/hamead/pic_3.png",url:'###'},
			   {name:"Avatar4",image:"images/hamead/pic_4.png",url:'###'},
			   {name:"Avatar5",image:"images/hamead/pic_5.png",url:'###'},
			   {name:"Avatar1",image:"images/hamead/pic_2.png",url:'###'},
			   {name:"Avatar",image:"images/hamead/pic_3.png",url:'###'},
			   {name:"Avatar2",image:"images/hamead/pic_2.png",url:'###'},
			   {name:"Avatar3",image:"images/hamead/pic_3.png",url:'###'},
			   {name:"Avatar4",image:"images/hamead/pic_4.png",url:'###'},
			   {name:"Avatar5",image:"images/hamead/pic_5.png",url:'###'},
			   {name:"Avatar1",image:"images/hamead/pic_2.png",url:'###'},
			   {name:"Avatar",image:"images/hamead/pic_3.png",url:'###'},]
	
	bannerulBox.setDataList(list);
	bannerulBox.setFocus(3);
	
	typeList = initData();
	menulBox.setDataList(typeList);
	
})

function initData(){
	var list = new Array();
	list.push({name:lang.index.tv,tar:'tv',url:'channel/index.html',image:'images/hamead/ico1.png'});
	list.push({name:'Movie',tar:'movie',url:'youtube/index.html',image:'images/hamead/ico2.png'});
	list.push({name:'Drama',tar:'drama',url:'movie/index.html?category=1',image:'images/hamead/ico3.png'});
	list.push({name:'PVR',tar:'pvr',url:'pvr/index.html',image:'images/hamead/ico5.png'});
	list.push({name:'Music',tar:'music',url:'music/index.html',image:'images/hamead/ico4.png'});
	list.push({name:lang.index.weather,tar:'weather',url:'weather/index.html',image:'images/hamead/ico8.png'});
	list.push({name:lang.index.file,tar:'files',url:'local/index.html',image:'images/hamead/ico6.png'});
	list.push({name:lang.index.setting,tar:'files',url:'setting/index.html',image:'images/hamead/ico7.png'});
	return list;
}