$(function(){
	/* 입력양식 */
	$(".onlyNum").live("keyup", function(e){ checkNumber($(this)); }); //숫자
	$(".telForm").live("keyup", function(e){ checkNumber($(this)); makeTelForm($(this)); }); //전화번호
	$(".juminCheck").live("keyup", function(e){ checkNumber($(this)); juminCheck($(this)); }); //전화번호
	$(".numCheckComma").live("keyup", function(e){ numCheckComma($(this)); });	// 천단위 콤마
	$(".url").live("click", function(e){ window.open($(this).text(), "url") ; });
	
	/* 달력 */
	$(".calendar").live("click", function(e){ 
		calendar(e, $(this).attr("id"), "", this); 
	}); 	

	/* 언어변경 */
	$("#lang").live("change", function(event){
		var lang = $("#lang").val();
		location.href=location.pathname+"?ch_lang=Y&lang="+lang;	
	});
});

/* 검색버튼 */
var pageSeek=function(){
	$("#pageNo").val("1");
	document.f.method = "get";
	document.f.submit();
}

/* 페이징버튼 */
var pageMove=function(pageNo, dir, res){
	$("#pageNo").val(pageNo);
	document.f.method = "get";
	document.f.submit();
}

/* 보기 */
var pageAdvm=function(mode, uid, lockYn, table){
	if((mode!="11")&&(lockYn=="Y")){ //게시판 비밀번호 루틴
		popPassword(mode, uid, lockYn, table);
		return; 
	}
	$("#mode").val(mode);
	$("#uid").val(uid);
	document.f.method = "get";
	document.f.submit();
}

/* 패스워드 */
var popPassword=function(mode, uid, lockYn, table){
	lightBackShow();
	lightFrontShow();
	var html="<span class='red'>* </span>"+MSG_7+" : ";
	html+="<input type='password' name='tempPw' id='tempPw' size='20' />";
	html+="<div class='div_btn_bottom'>";
	html+="<input type='button' value='"+MSG_8+"' class='btnInner' onclick='lightBoxClose()' />";
	html+="&nbsp;";
	html+="<input type='button' value='"+MSG_9+"' class='btnInner' onclick=\"popPasswordCheck('"+mode+"', '"+uid+"', '"+lockYn+"', '"+table+"')\" />";
	html+="</div>";
	$("#ajaxFront").html(html);
	var w=parseInt($("#divLightFront").css("width"));
	var h=parseInt($("#divLightFront").css("height"));	
	$("#divLightFront").css({marginTop:$(window).height()/2-h/2, marginLeft:-w/2});
}
var popPasswordCheck=function(mode, uid, lockYn, table){
	
	if($("#tempPw").val()==""){
		alert(MSG_5);
		$("#tempPw").focus();
		return;
	}
	$("#work").val("BOARD_PW");  
	$("#uid").val(uid); 
	$("#useTable").val(table);
	$("#temp").val(($("#tempPw").val()));
	$("#ajaxPage").val("config/configAjax.html");	
	var paras=$("#f").serialize();
	$.ajax({
		url: "../ajaxPage.html", data: paras, type: "post", dataType: "html", cache: false, timeout: 5000,		
		success: function(res){ 
			if(res=="Y"){
				pageAdvm(mode, uid, "N", table);
			}else{
				alert(USER_1);
				lightBoxClose();				
			}
		}, 
		error: function(res){
			//location.reload();
		}	
	});	
}

/* 읽기 */
var hitReadAjax=function(table, uid){
	$("#work").val("HIT_READ");  
	$("#uid").val(uid); 
	$("#useTable").val(table);
	$("#ajaxPage").val("config/configAjax.html");	
	var paras=$("#f").serialize();
	$.ajax({
		url: "../ajaxPage.html", data: paras, type: "post", dataType: "html", cache: false, timeout: 5000,		
		success: function(res){ 
			//alert(res);
		}, 
		error: function(res){
			//location.reload();
		}	
	});			
}

/* 라이트박스 관련 */
var lightBackShow=function(){ 
	$("#divLightBack").fadeTo(0, 0.38).css({width:$(document).width(), height:$(document).height()}).show(); 
}
var lightBoxClose=function(){ 	 
	$("#divLightFront").slideUp(300, function(){ 
		$("#divLightBack").hide(); 
	}); 
}

/* 주소검색 */
var popupPost=function(task, baseName){
	var task		= "428";
	var popupPost   = window.open("http://210.122.0.17/~etra/popupPage.html?popPage=postSeek&task="+task+"&baseName="+baseName, "popupPost", "scrollbars=yes, width=500px, height=600px");
}


/* 라이트박스 관련 */
var lightBackShow=function(){ 
	$("#divLightBack").fadeTo(0, 0.38).css({width:$(document).width(), height:$(document).height()}).show(); 
}
var lightFrontShow=function(){ $("#divLightFront").css({top:$(window).scrollTop(), left:$(window).width()/2}).fadeIn(300); }
var lightBoxClose=function(){ 	 
	$("#divLightFront").slideUp(300, function(){ 
		$("#ajaxFront").html(""); 
		$("#divLightBack").hide(); 
	}); 
}

/* 파일관련 */
$("#liFileAdd").live("click", function(e){
	$(this).parent().append("<li><input type='file' name='fileArr[]'  /><input type='button' class='red3 border1 buttonInner liRemove' value='"+CANCEL+"' /></li>"); 
});
$("#liAlbumAdd").live("click", function(e){ 
	$(this).parent().append("<li><input type='file' name='albumArr[]'  />"
	+"<input type='button' class='red3 border1 buttonInner liRemove' value='"+CANCEL+"' />"
	+"&nbsp;&bull;&nbsp;"+MEMO+" : <input type='text' name='memo[]' size='40' />"
	+"</li>"); 
});
$(".liRemove").live("click", function(e){ $(this).parent().remove(); });



/* 모바일구분 */

function isMobile() {
	var isMobile = false;
	var mobileKeyWords = new Array('iPhone', 'iPod', 'BlackBerry', 'Android', 'Windows CE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson');
	for (var word in mobileKeyWords){
	    if (navigator.userAgent.match(mobileKeyWords[word]) != null){
	        isMobile = true;
	    }
	}
	return isMobile;
}

function isApple() {
	var isApple = false;
	var mobileKeyWords = new Array('iPhone', 'iPod', 'iPad');
	for (var word in mobileKeyWords){
		if(!(navigator.userAgent.indexOf("iPhone OS 5") > -1)) {
			if (navigator.userAgent.match(mobileKeyWords[word]) != null){
	    		isApple = true;
	    	}
		}
	}
	return isApple;	
}

function isAndroid() {
	var isAndroid = false;
	var mobileKeyWords = new Array('Android');
	for (var word in mobileKeyWords){
	    if (navigator.userAgent.match(mobileKeyWords[word]) != null){
	    	isAndroid = true;
	    }
	}
	return isAndroid;	
}


/* 천단위 콤마 붙이기 */
var comma=function(num){
	num = num.replace(/,/g, "");
	var first	= num.slice(0, 1);
	var len		= num.length;
	var tempNum;
	if(first == "-")	tempNum = num.slice(1, len);
	else				tempNum = num;

	var num_str = tempNum.toString();
	var result = "";
	for(var i=0; i<num_str.length; i++){
		var tmp = num_str.length-(i+1)
		if(i%3==0 && i!=0) result = "," + result
		result = num_str.charAt(tmp) + result
	}
	
	if(first == "-")	result = "-"+result;
	return result;
}

/* 천단위 콤마 자르기 */
var commaTrim=function(num){
	return num.replace(/,/g, "");
}


var numCheckComma=function(obj){
	var thisVal = obj.val();
	var thisCnt = thisVal.length;	
	for(var i = 0; i < thisCnt; i++){
		var thisChar    =  thisVal.charAt(i)
		var charValue   = thisChar.charCodeAt(0);
		if((charValue < 43) || (charValue > 57) || (charValue == 47)){
			obj.val(obj.val().slice(0, -1));
			obj.focus();
			return false;
		}
	}
	obj.val(comma(obj.val()));	
}

/* 공통 폼체크 */
var makeTelForm=function(o){ // 숫자 , . 체크 0->48, 9->57, 뒤부터 해야 연속적인 값등록 도 없앤다
	o.val($.trim(o.val()));
	var temp;
	if(event.keyCode!=8){ // 지우기, <- 37		
		var firstLetter=o.val().substring(0, 1);
		if(firstLetter!="0") o.val("");
		if(o.val().length==2){
			if(o.val()=="02") o.val(o.val()+"-");			
		}else if(o.val().length==3){
			if(o.val().substring(0, 2)!="02") o.val(o.val()+"-");	
		}else if(o.val().length==7){
			if(o.val().substring(0, 2)=="02") o.val(o.val()+"-");
		}else if(o.val().length==8){
			if(o.val().substring(0, 2)!="02") o.val(o.val()+"-");
		}		
		if(o.val().substr(0, 2)=="02"){
			if(o.val().length==11){	
				temp=o.val().replace(new RegExp("-", "g"), "");		// g 모든 문자열, i 맨처음		
				o.val(temp.substr(0, 2)+"-"+temp.substr(2, 3)+"-"+temp.substr(5, 4));
			}else if(o.val().length==12){
				temp=o.val().replace(new RegExp("-", "g"), "");				
				o.val(temp.substr(0, 2)+"-"+temp.substr(2, 4)+"-"+temp.substr(6, 4));				
			}
		}else{
			if(o.val().length==12){	
				temp=o.val().replace(new RegExp("-", "g"), "");				
				o.val(temp.substr(0, 3)+"-"+temp.substr(3, 3)+"-"+temp.substr(6, 4));
			}else if(o.val().length==13){
				temp=o.val().replace(new RegExp("-", "g"), "");			
				o.val(temp.substr(0, 3)+"-"+temp.substr(3, 4)+"-"+temp.substr(7, 4));				
			}
		}
	}
}
var juminCheck=function(o){ // 숫자 , . 체크 0->48, 9->57, 뒤부터 해야 연속적인 값등록 도 없앤다
	o.val($.trim(o.val()));
	var temp;
	if(event.keyCode!=8){ // 지우기, <- 37		
		if(o.val().length>=6){
			temp=o.val().replace(new RegExp("-", "g"), "");
			o.val(temp.substr(0, 6)+"-"+temp.substr(6, 7));
		}
	}	
} 
var checkNumber=function(o){ // 숫자 , . - 체크 0->48, 9->57, 뒤부터 해야 연속적인 값등록 도 없앤다
	
	var val;
	for(var i=(o.val().length)-1;i>-1; i--){
		val=o.val().charCodeAt(i);
		if(val){		
			if(!(((val>47)&&(val<58))||(val==44)||(val==46)||(val==45))){ 
				alert(POP_11); // 숫자만 입력하십시오
				o.val( $.trim(o.val().slice(0, -1)) ).focus(); 
			}
		}
	}
}
var checkEnNum=function(o){ // 영문, 숫자만 체크 a97, z122
	var val;
	for(var i=(o.val().length)-1;i>-1; i--){		
		val=o.val().charAt(i).charCodeAt(0);
		if(!(((val>=97)&&(val<=122))||((val>=48)&&(val<=57)))){ o.val(o.val().slice(0, -1)).focus(); o.val($.trim(o.val())); }
	}
	o.val($.trim(o.val()));
}
var checkFirstEn=function(o){ //첫글자 영문
	var val;
	for(var i=(o.val().length)-1;i>-1; i--){		
		val=o.val().charAt(i).charCodeAt(0);
		if(i==0){//alert(val);
			if(!((val>=97)&&(val<=122))){ o.val("").focus(); o.val($.trim(o.val())); 	}
		}
	}
	o.val($.trim(o.val()));
}
var checkNull=function(arr){ // 빈값 체크
	var j=0; 
	var cnt=0; 
	var o;

	for(var i in arr){	
		o=objByName(arr[i]);
		if($.trim(o.val())==""){ // trim으로 앞뒤 공백 제거			
			$(".valiText", o.parent()).remove();
			o.parent().append(" <span class='valiText red3'><br />*"+POP_1+"</span>");
			if(j==0) o.focus(); 
			cnt++; j++;
		}else{
			$(".valiText", o.parent()).remove();
		}
	}
	return cnt;
	//return (cnt) ? false : true;
}
var checkZero=function(arr){ // 빈값 체크
	var j=0; 
	var cnt=0; 
	var o;

	for(var i in arr){	
		o=objByName(arr[i]);
		if($.trim(o.val())=="0"){ // trim으로 앞뒤 공백 제거			
			o.after(" <span class='valiText red3'>*"+POP_1+"</span>");
			if(j==0) o.focus(); 
			cnt++; j++;
		}
	}
	return cnt;
	//return (cnt) ? false : true;
}
var checkNullAlert=function(arr){ // 빈값 체크
	var j=0; 
	var cnt=0; 
	var o;
	for(var i in arr){	
		o=objByName(arr[i]);
		if($.trim(o.val())==""){ // trim으로 앞뒤 공백 제거			
			alert(POP_1);
			if(j==0) o.focus(); 
			cnt++; j++;
		}
	}
	return cnt;
	//return (cnt) ? false : true;
}
var checkLength=function(obj){	// 길이 체크
	var j=0; var cnt=0; var o;
	for(var key in obj){	
		o=objByName(key);
		if(o.val().length < obj[key]){	
			$(".valiText", o.parent()).remove();
			o.parent().append("<span class='valiText red3'><br />*"+obj[key]+" "+POP_2+"</span>");
			if(j==0) o.focus(); 
			cnt++; j++;
		}else{
			$(".valiText", o.parent()).remove();
		}
	}
	return cnt;
	//return (cnt) ? false : true;
}
var checkEmail=function(arr){	// 메일체크
	var j=0; var cnt=0; var o;
	for(var i in arr){	
		o=objByName(arr[i]);
		//if(o.val()!=""){
			if(o.val().search(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/)==-1){			
				o.parent().append(" <span class='valiText red3'><br />*"+POP_3+"</span>");
				if(j==0) o.focus(); 
				cnt++; j++;
			}
		//}
	}
	return cnt;
	//return (cnt) ? false : true;
}
var checkUrl=function(arr){	// url 체크
	var j=0; var cnt=0; var o;
	for(var i in arr){	
		o=objByName(arr[i]);
		if(o.val().search(/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/)==-1){			
			o.parent().append(" <span class='valiText red3'>*"+POP_4+"</span>");
			if(j==0) o.focus(); 
			cnt++; j++;
		}
	}
	return cnt;
	//return (cnt) ? false : true;
}
var objByName=function(name){ // 객체 반환
	var obj;
	if($("input[name="+name+"]").size())			obj=$("input[name="+name+"]");
	else if($("select[name="+name+"]").size())		obj=$("select[name="+name+"]");
	else if($("textarea[name="+name+"]").size())	obj=$("textarea[name="+name+"]");
	else if($("password[name="+name+"]").size())	obj=$("password[name="+name+"]");	
	else if($("textarea[name="+name+"]").size())	obj=$("textarea[name="+name+"]");	
	return obj; 
}