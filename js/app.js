
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {		

}

$(function(){
	document.addEventListener("backbutton", backPress, true); //���ư �ν�
});

function backPress(){ 
	
	if($.mobile.activePage.is('#home')){
		var ans=confirm("�����Ͻðڽ��ϱ�?");
		if(ans) navigator.app.exitApp();		
	}else{
		history.back();
	}	
}

var appOff =function(){
	var ans=confirm("�����Ͻðڽ��ϱ�?");
	if(ans) navigator.app.exitApp();
}	

var goBack = function(){
	if($.mobile.activePage.is('#home')){
		var ans="�����Ͻðڽ��ϱ�?";
		if(ans) navigator.app.exitApp();		
	}else{
		history.back();
	}
}

