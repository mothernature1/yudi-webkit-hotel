KEY.KEY_RETURN = function(){
	if(curRegion == 'body'){
		navList.setFocus();
	}else{
		gDataList = false;
		$.gotoPage('./knj/index.html');
	}
}