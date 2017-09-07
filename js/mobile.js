
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