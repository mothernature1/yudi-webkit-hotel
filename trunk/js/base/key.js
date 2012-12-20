KEY.KEY_DOWN = function(key,keyName,a){
	var idArr = a.id.split('-');
	var tar = parseInt(idArr[2]);
	tar ++;
	$('#nav-a-'+tar).focus();
}

KEY.KEY_UP = function(key,keyName,a){
	var idArr = a.id.split('-');
	var tar = parseInt(idArr[2]);
	tar --;
	$('#nav-a-'+tar).focus();
}