$(function(){

	/* 주메뉴 네비게이션 */
	$("#main_navi>li").live("mouseenter", mainNaviEnter);
	$("#main_navi>li").live("mouseleave", mainNaviLeave);
	$(".main_nav_sub").live("mouseenter", mainNaviSubEnter);
	$(".main_nav_sub").live("mouseleave", mainNaviSubLeave);

	/* 언어선택 */
	$("#lang").live("change", function(event){
		var lang = $("#lang").val();
		location.href=location.pathname+"?ch_lang=Y&lang="+lang;	
	});

});

/* 주메뉴 네비게이션 */
var mainNaviEnter=function(){
	$(".main_nav_sub").hide();
	var arrId=$(this).attr("id").split("_");
	var ele=$("#sub_"+arrId[1]);
	ele.css("left", $(this).offset().left).slideDown();
}
var mainNaviLeave=function(){
	$(".main_nav_sub").hide();
}
var mainNaviSubEnter=function(){
	$(this).show();
}
var mainNaviSubLeave=function(){
	$(".main_nav_sub").slideUp();
}



