
KEY.KEY_LEFT = function(key,keyName,a){
	var row = parseInt($(a).attr('row'));
	var col = parseInt($(a).attr('col'));
	col--;
	if(col > 0){
		var id = (row-1)*rowNum + col ;
		$('#li-a-'+id).focus();
	}
}

KEY.KEY_RIGHT = function(key,keyName,a){
	var row = parseInt($(a).attr('row'));
	var col = parseInt($(a).attr('col'));
	col++; 
	if(col <=rowNum){
		var id = (row-1)*rowNum + col ;
		$('#li-a-'+id).focus();
	}
}

KEY.KEY_UP = function(key,keyName,a){
	var row = parseInt($(a).attr('row'));
	var col = parseInt($(a).attr('col'));
	row--; 
	if(row > 0){
		var id = (row-1)*rowNum + col ;
		$('#li-a-'+id).focus();
	}
}

KEY.KEY_DOWN = function(key,keyName,a){
	var row = parseInt($(a).attr('row'));
	var col = parseInt($(a).attr('col'));
	row++; 
	if(row <=2){
		var id = (row-1)*rowNum + col ;
		$('#li-a-'+id).focus();
	}
}