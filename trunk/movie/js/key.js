KEY.KEY_RETURN = function(){
	if(curRegion == 'body'){
		navList.setFocus();
	}else{
		gDataList = false;
		$.goIndex();
	}
}