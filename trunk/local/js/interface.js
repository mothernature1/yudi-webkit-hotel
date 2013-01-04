
var FILE_TYPE = ".flv .mkv .asf  .avi  .wm  .wmp  .ram  .rm  .rmvb  .rp  .rpm  .rt  .smi  .smil  .dat  .m1v  .m2p  .m2t  .m2ts  .m2v  .mp2v  .mpe  .mpeg  .mpg  .mpv2  .pss  .pva  .tp  .tpr  .ts  .m4b  .m4p  .m4v  .mp4  .3g2  .3gp  .3gp2  .3gpp  .mov  .qt  .f4v   .hlv  .swf  .ifo  .vob  .amv  .bik  .csf  .divx  .evo  .ivm  .mkv  .mod  .mts  .ogm  .pmp  .scm  .tod  .vp6  .webm  .aac  .ac3  .amr  .ape  .cda  .dts  .flac  .m1a  .m2a  .m4a  .mid  .midi  .mka  .mp2  .mp3  .mpa  .ogg  .ra  .tta  .wav  .wma  .wv .wmv .gif .jpeg .png .wbmp .bmp .jpg .bdmv .app";

var MP3_FILE_TYPE = ".aac .ac3 .amr .ape .cda .dts .flac .m1a .m2a .m4a .mid .midi .mka .mp2 .mp3 .mpa .ogg .ra .tak .tta .wav .wma .wv";
var MP3_FILE_ARRAY = MP3_FILE_TYPE.split(' ');
var VIDEO_FILE_TYPE = ".avi .rm .rmvb .mov .wmv .navi .3gp .mkv .flv .f4v .rmvb .webm .mp4 .ts .mpg .m2v .asf .bdmv .m2ts";
var VIDEO_FILE_ARRAY = VIDEO_FILE_TYPE.split(' ');
var PIC_FILE_TYPE=".gif .jpeg .png .wbmp .bmp .jpg";
var PIC_FILE_ARRAY = PIC_FILE_TYPE.split(' ');


function loadFile(path,callback){
	var obj = {path:path};
	var list = $.LoadFile(path,FILE_TYPE);
	//$.log($.toJSON(list));
	
	if(list==false&&list.length==null)
	{
		$.log("请插入U盘");
		showGTip(lang.local.insertDisk,30);
	}
	else
	{
		callback(path,list);
	}
}



function initNav(){
	var list = new Array();
	list.push({name:"Folder",tar:'folder'});
	return list ;
}








//判断是否是mp3文件
function isMp3File(url){
	var last_point_index = url.lastIndexOf('.');
	var type = url.substring(last_point_index);
	for(var i = 0;i<MP3_FILE_ARRAY.length;i++){
		if(type == MP3_FILE_ARRAY[i]){
			return true;
		}
	}
	return false;
}
//判断是否是图片文件
function isPicFile(url){
	var last_point_index = url.lastIndexOf('.');
	var type = url.substring(last_point_index);
	for(var i = 0;i<PIC_FILE_ARRAY.length;i++){
		if(type.toLowerCase() == PIC_FILE_ARRAY[i]){
			return true;
		}
	}
	return false;
}


//判断是否是视频文件
function isVideoFile(url){
	var last_point_index = url.lastIndexOf('.');
	var type = url.substring(last_point_index);
	for(var i = 0;i<VIDEO_FILE_ARRAY.length;i++){
		if(type.toLowerCase() == VIDEO_FILE_ARRAY[i]){
			return true;
		}
	}
	return false;
}

//判断是否app
function isAppFile(url){
	var last_point_index = url.lastIndexOf('.');
	var type = url.substring(last_point_index);
	if(type.toLowerCase() == ".app"){
		return true;
	}else{
		return false;
	}
}

//排序-----------
function sortList(dataList){
	var arr_t = [];
	for(i=0;i<dataList.length;i++){
		arr_t[i]=[getSpell(dataList[i].name), dataList[i]];
	}
	arr_t=arr_t.sort();
	for(i=0;i<dataList.length;i++){
		dataList[i] = arr_t[i][1];
	}
	return dataList;
}