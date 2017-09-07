
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {		

}

$(function(){
	document.addEventListener("backbutton", backPress, true); //백버튼 인식
});

function backPress(){ 
	
	if($.mobile.activePage.is('#home')){
		var ans=confirm("종료하시겠습니까?");
		if(ans) navigator.app.exitApp();		
	}else{
		history.back();
	}	
}

var appOff =function(){
	var ans=confirm("종료하시겠습니까?");
	if(ans) navigator.app.exitApp();
}	

var goBack = function(){
	if($.mobile.activePage.is('#home')){
		var ans="종료하시겠습니까?";
		if(ans) navigator.app.exitApp();		
	}else{
		history.back();
	}
}

