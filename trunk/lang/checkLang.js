



var msg = "";


function start(){

	var src = lang_en;
	var tar1 = lang_cn;
	var tar2 = lang_tw;
	
	
	checkPage(src,tar1,"中文简体");
	checkPage(src,tar2,"中文繁体");
	
	if(msg!="")
	{
		msg+="请尽快补全!!!!";
		alert(msg);
		$.log(msg);
	}

}


function checkPage(src,tar,lang)
{
	
	for(var p in src)
	{
		if(typeof(src[p])!="function"){  
				if(tar[p]==null)
				{
					msg += '语言"'+lang+'页面"'+p+'"没有值\r\n';
				} 
				else{
					checkPrpos(lang,p,src[p],tar[p]);
				}
			}
		
	}
}

function checkPrpos(lang,page,src,tar) { 
    // 用来保存所有的属性名称和值 
    var props = ""; 
    // 开始遍历 
    for(var o in src){  
        // 方法 
        if(typeof(src[o])!="function"){  
            // p 为属性名称，obj[p]为对应属性的值 
            //props+= p + "=" + obj[p] + "\t"; 
			
			if(tar[o]==null)
			{
				msg += '语言"'+lang+'"页面"'+page+'"的属性"'+o+'"没有值\r\n';
			}
        }
    }  
    // 最后显示所有的属性 
    //console.log($.toJSON(props));
} 















