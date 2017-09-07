(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

$.event.special.mousewheel = {
	setup: function() {
		if ( this.addEventListener )
			for ( var i=types.length; i; )
				this.addEventListener( types[--i], handler, false );
		else
			this.onmousewheel = handler;
	},
	
	teardown: function() {
		if ( this.removeEventListener )
			for ( var i=types.length; i; )
				this.removeEventListener( types[--i], handler, false );
		else
			this.onmousewheel = null;
	}
};

$.fn.extend({
	mousewheel: function(fn) {
		return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
	},
	
	unmousewheel: function(fn) {
		return this.unbind("mousewheel", fn);
	}
});


function handler(event) {
	var args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true;
	
	event = $.event.fix(event || window.event);
	event.type = "mousewheel";
	
	if ( event.wheelDelta ) delta = event.wheelDelta/120;
	if ( event.detail     ) delta = -event.detail/3;
	
	// Add events and delta to the front of the arguments
	args.unshift(event, delta);

	return $.event.handle.apply(this, args);
}

})(jQuery);

/*-------------*/

(function ($)
{
    jQuery.fn.boutique = function (bA)
    {
        var ba = $.extend(
        {
            starter : 1, speed : 600, behind_opac : 0.4, back_opac : 0.15, behind_size : 0.7, back_size : 0.4, 
            autoplay : false, autointerval : 3000, freescroll : true, hovergrowth : 0.08, easing : 'easeInOutQuad', 
            move_twice_easein : 'easeInCirc', move_twice_easeout : 'easeOutCirc', text_front_only : true
        }, bA);
        $(this).each(function ()
        {
            var c, easingplugin, header, hoverspeed, $newitem1, $newitem2, $newitem3, $newitem4, $newitem5, 
            eazing, zpeed, next, iegrow, container_width, container_height, front_img_width, front_img_height, 
            text_opacity;
            var d = $(this).attr('id');
            var e = d + '_item1';
            var f = d + '_item2';
            var g = d + '_item3';
            var h = d + '_item4';
            var i = d + '_item5';
            var j = false;
            var k = ba.starter;
            var l = $(this).find(' li').length;
            var m = false;
            var n = false;
            if ($.browser.msie) {
                m = true;
                if ($.browser.version == '6.0') {
                    n = true;
                }
            }
            if (ba.hoverspeed) {
                hoverspeed = ba.hoverspeed
            }
            else {
                hoverspeed = (ba.speed / 4)
            }
            if (ba.starter > l) {
                ba.starter = l
            }
            if ($.easing.def) {
                easingplugin = true;
                $.easing.def = ba.easing
            }
            else {
                easingplugin = false
            }
            var o = $(this);
            var p = $('li', o);
            var x = 1;
            var q = new Array();
            p.each(function ()
            {
                $(this).addClass('li' + x);
                header = $(this).find('img').attr('alt');
                if (!$(this).find('span').length)
                {
                    if ($(this).find('a').length) {
                        $(this).children('a').append('<span/>')
                    }
                    else {
                        $(this).append('<span/>')
                    }
                    if (header == '') {
                        $(this).find('span').hide()
                    }
                }
                $(this).find('span').prepend('<h6>' + header + '</h6>');
                if (header == '') {
                    $(this).find('h6').hide()
                }
                q[x] = $('.li' + x, o);
                x++
            });
            if (l == 1) {
                q[1].clone().attr('id', e).prependTo(o);
                q[1].clone().attr('id', f).prependTo(o)
            }
            else if (ba.starter == 2) {
                q[1].clone().attr('id', f).prependTo(o);
                q[l].clone().attr('id', e).prependTo(o)
            }
            else if (ba.starter == 1) {
                q[l - 1].clone().attr('id', e).prependTo(o);
                q[l].clone().attr('id', f).prependTo(o)
            }
            else
            {
                q[ba.starter - 1].clone().attr('id', f).prependTo(o);
                q[ba.starter - 2].clone().attr('id', e).prependTo(o)
            }
            q[ba.starter].clone().attr('id', g).prependTo(o);
            if (l == 1) {
                q[1].clone().attr('id', h).prependTo(o);
                q[1].clone().attr('id', i).prependTo(o)
            }
            else if (ba.starter == (l - 1)) {
                q[l].clone().attr('id', h).prependTo(o);
                q[1].clone().attr('id', i).prependTo(o)
            }
            else if (ba.starter == l) {
                q[1].clone().attr('id', h).prependTo(o);
                q[2].clone().attr('id', i).prependTo(o)
            }
            else
            {
                q[ba.starter + 1].clone().attr('id', h).prependTo(o);
                q[ba.starter + 2].clone().attr('id', i).prependTo(o)
            }
            var r = $('#' + e);
            var s = $('#' + f);
            var t = $('#' + g);
            var u = $('#' + h);
            var v = $('#' + i);
            r.show().animate({
                opacity : 0
            }, 0).addClass('back');
            s.show().animate({
                opacity : 0
            }, 0).addClass('behind');
            t.show().animate({
                opacity : 0
            }, 0).addClass('front');
            u.show().animate({
                opacity : 0
            }, 0).addClass('behind');
            v.show().animate({
                opacity : 0
            }, 0).addClass('back');
            var w = $('.back', o);
            var y = $('.behind', o);
            var z = $('.front', o);
            if (ba.container_width) {
                container_width = ba.container_width
            }
            else {
                container_width = parseInt(o.css('width'))
            }
            if (ba.front_img_width) {
                front_img_width = ba.front_img_width
            }
            else {
                front_img_width = parseInt($('img', z).css('width'))
            }
            if (ba.front_img_height) {
                front_img_height = ba.front_img_height
            }
            else {
                front_img_height = parseInt($('img', z).css('height'))
            }
            if (ba.text_opacity) {
                text_opacity = ba.text_opacity
            }
            else {
                text_opacity = parseFloat($('span', o).css('opacity'))
            }
            var A = parseInt(p.css('borderLeftWidth'));
            var B = parseInt(p.css('padding-left'));
            var C = $('h6', z).css('font-size');
            var D = $('span', z).css('font-size');
            var E = z.css('margin-top');
            var F = parseInt($('img', z).css('margin-left'));
            var G = Math.round(front_img_width + (F * 2) + (B * 2) + (A * 2));
            var H = Math.round(front_img_height + (F * 2) + (B * 2) + (A * 2));
            var I = Math.round(front_img_width * ba.behind_size);
            var J = Math.round(front_img_height * ba.behind_size);
            var K = $('h6', y).css('font-size');
            var L = $('span', y).css('font-size');
            var M = y.css('margin-top');
            var N = parseInt($('img', y).css('margin-left'));
            var O = Math.round(I + (N * 2) + (B * 2) + (A * 2));
            var P = Math.round(J + (N * 2) + (B * 2) + (A * 2));
            var Q = Math.round(front_img_width * ba.back_size);
            var R = Math.round(front_img_height * ba.back_size);
            var S = $('h6', w).css('font-size');
            var T = $('span', w).css('font-size');
            var U = w.css('margin-top');
            var V = parseInt($('img', w).css('margin-left'));
            var W = Math.round(Q + (V * 2) + (B * 2) + (A * 2));
            var X = Math.round(R + (V * 2) + (B * 2) + (A * 2));
            var Y = Math.round((container_width / 4) - (O / 2));
            var Z = Math.round((container_width / 2) - (G / 2));
            var bb = (container_width - Y - O);
            var bc = (container_width - W);
				w.removeClass('back');
				y.removeClass('behind');
				z.removeClass('front');
            var bd = $('span', p).css('padding-top');
            var be = $('span', p).css('padding-right');
            var bf = $('span', p).css('padding-bottom');
            var bg = $('span', p).css('padding-left');
            var bh = Math.round(parseInt(bd) * 0.8) + 'px';
            var bi = Math.round(parseInt(be) * 0.8) + 'px';
            var bj = Math.round(parseInt(bf) * 0.8) + 'px';
            var bk = Math.round(parseInt(bg) * 0.8) + 'px';
            var bl = Math.round(parseInt(bd) * 0.6) + 'px';
            var bm = Math.round(parseInt(be) * 0.6) + 'px';
            var bn = Math.round(parseInt(bf) * 0.6) + 'px';
            var bo = Math.round(parseInt(bg) * 0.6) + 'px';
            var bp = 
            {
                'font-size' : D, 'padding-top' : bd, 'padding-right' : be, 'padding-bottom' : bf, 'padding-left' : bg
            };
            var bq = 
            {
                'font-size' : L, 'padding-top' : bh, 'padding-right' : bi, 'padding-bottom' : bj, 'padding-left' : bk
            };
            var br = 
            {
                'font-size' : T, 'padding-top' : bl, 'padding-right' : bm, 'padding-bottom' : bn, 'padding-left' : bo
            };
            if (ba.text_front_only)
            {
                bp = $.extend({
                    'opacity' : text_opacity
                }, bp);
                bq = $.extend({
                    'opacity' : 0
                }, bq);
                br = $.extend({
                    'opacity' : 0
                }, br)
            }
            if (n)
            {
                var bs = (parseInt($('span:visible', z).css('margin-left')) + parseInt($('span:visible', 
                z).css('margin-right')));
                var bt = (parseInt($('span:visible', y).css('margin-left')) + parseInt($('span:visible', 
                y).css('margin-right')));
                var bu = (parseInt($('span:visible', w).css('margin-left')) + parseInt($('span:visible', 
                w).css('margin-right')));
                var bv = $.extend({
                    width : G - parseInt(be) - parseInt(bg) - bs - (A * 2)
                }, bp);
                var bw = $.extend({
                    width : O - parseInt(bi) - parseInt(bk) - bt - (A * 2)
                }, bq);
                var bx = $.extend({
                    width : W - parseInt(bm) - parseInt(bo) - bu - (A * 2)
                }, br)
            }
            var by = (H + parseInt(E));
            var bz = (P + parseInt(M));
            var bB = (X + parseInt(U));
            if (by > bz && by > bB) {
                container_height = by
            }
            else if (bz > by && bz > bB) {
                container_height = bz
            }
            else {
                container_height = bB
            }
            o.width(container_width).height(container_height);
            r.css({
                left : 0, top : U
            }).animate({
                opacity : ba.back_opac
            }, 0).find('img').animate({
                width : Q + 'px', height : R + 'px', margin : V + 'px', opacity : 1
            }, 0).siblings('span:visible').css(br).children('h6:visible').css({
                'font-size' : S
            });
            s.css({
                left : Y + 'px', top : M, 'z-index' : 2
            }).animate({
                opacity : ba.behind_opac
            }, 0).find('img').animate({
                width : I + 'px', height : J + 'px', margin : N + 'px', opacity : 1
            }, 0).siblings('span:visible').css(bq).children('h6:visible').css({
                'font-size' : K
            });
            t.css({
                left : Z + 'px', top : E, 'z-index' : 3
            }).animate({
                opacity : 1
            }, 0).find('a *').css({
                cursor : 'pointer'
            }).end().find('img').animate({
                width : front_img_width + 'px', height : front_img_height + 'px', margin : F + 'px', opacity : 1
            }, 0).siblings('span:visible').css(bp).children('h6:visible').css({
                'font-size' : C
            });
            u.css({
                left : bb + 'px', top : M, 'z-index' : 2
            }).animate({
                opacity : ba.behind_opac
            }, 0).find('img').animate({
                width : I + 'px', height : J + 'px', margin : N + 'px', opacity : 1
            }, 0).siblings('span:visible').css(bq).children('h6:visible').css({
                'font-size' : K
            });
            v.css({
                left : bc + 'px', top : U
            }).animate({
                opacity : ba.back_opac
            }, 0).find('img').animate({
                width : Q + 'px', height : R + 'px', margin : V + 'px', opacity : 1
            }, 0).siblings('span:visible').css(br).children('h6:visible').css({
                'font-size' : S
            });
            if (n)
            {
                $('span:visible', w).css(bx);
                $('span:visible', y).css(bw);
                $('span:visible', z).css(bv)
            }
            function stopInterval()
            {
                if (c) {
                    clearInterval(c);
                    c = false;
                }
            }
            function startInterval()
            {
                if (c) {
                    stopInterval()
                }
                c = setInterval("$('#" + h + "').click()", ba.autointerval)
            }
            function moveRight(b)
            {
                j = true;
                eazing = '';
                zpeed = ba.speed;
                if (easingplugin)
                {
                    if (b == 'twice') {
                        eazing = ba.move_twice_easein;
                        zpeed = Math.round(ba.speed * 0.5)
                    }
                    else if (b == 'twice_end') {
                        eazing = ba.move_twice_easeout
                    }
                    else {
                        eazing = ba.easing;
                    }
                }
                if (ba.autoplay) {
                    stopInterval()
                }
                if (k == (l - 2)) {
                    next = 1
                }
                else if (k == (l - 1)) {
                    next = 2;
                    if (next > l) {
                        next = 1;
                    }
                }
                else if (k == l) {
                    next = 3;
                    if (next > l) {
                        next = 1;
                    }
                }
                else {
                    next = (k + 3)
                }
                $('#' + e).removeAttr('id', '').addClass('remove').css('z-index', - 1);
                $newitem1 = $('#' + f);
                $newitem1.attr('id', e).stop().animate({
                    opacity : ba.back_opac, left : 0, top : U
                }, zpeed, eazing).find('img').stop().animate({
                    width : Q + 'px', height : R + 'px', margin : V + 'px', opacity : 1
                }, zpeed, eazing).end().find('h6:visible').stop().animate({
                    'font-size' : S
                }, zpeed, eazing);
                if (n) {
                    $newitem1.find('span:visible').stop().animate(bx, zpeed, eazing)
                }
                else {
                    $newitem1.find('span').stop().animate(br, zpeed, eazing)
                }
                setTimeout(function ()
                {
                    $newitem1.css('z-index', 1)
                },
                (zpeed / 4));
                $newitem2 = $('#' + g);
                $newitem2.attr('id', f).stop().animate({
                    opacity : ba.behind_opac, left : Y + 'px', top : M
                }, zpeed, eazing).find('img').stop().animate({
                    width : I + 'px', height : J + 'px', margin : N + 'px', opacity : 1
                }, zpeed, eazing).end().find('h6:visible').stop().animate({
                    'font-size' : K
                }, zpeed, eazing);
                if (n) {
                    $newitem2.find('span:visible').stop().animate(bw, zpeed, eazing)
                }
                else {
                    $newitem2.find('span').stop().animate(bq, zpeed, eazing)
                }
                setTimeout(function ()
                {
                    $newitem2.css('z-index', 2)
                },
                (zpeed / 4));
                $newitem3 = $('#' + h);
                $newitem3.attr('id', g).stop().animate({
                    opacity : 1, left : Z + 'px', top : E
                }, zpeed, eazing).find('img').stop().animate({
                    width : front_img_width + 'px', height : front_img_height + 'px', margin : F + 'px', 
                    opacity : 1
                }, zpeed, eazing).end().find('h6:visible').stop().animate({
                    'font-size' : C
                }, zpeed, eazing);
                if (n) {
                    $newitem3.find('span:visible').stop().animate(bv, zpeed, eazing)
                }
                else {
                    $newitem3.find('span').stop().animate(bp, zpeed, eazing)
                }
                setTimeout(function ()
                {
                    $newitem3.css('z-index', 3)
                },
                (zpeed / 4));
                $newitem4 = $('#' + i);
                $newitem4.attr('id', h).stop().animate({
                    opacity : ba.behind_opac, left : bb + 'px', top : M
                }, zpeed, eazing).find('img').stop().animate({
                    width : I + 'px', height : J + 'px', margin : N + 'px', opacity : 1
                }, zpeed, eazing).end().find('h6:visible').stop().animate({
                    'font-size' : K
                }, zpeed, eazing);
                if (n) {
                    $newitem4.find('span:visible').stop().animate(bw, zpeed, eazing)
                }
                else {
                    $newitem4.find('span').stop().animate(bq, zpeed, eazing)
                }
                setTimeout(function ()
                {
                    $newitem4.css('z-index', 2)
                },
                (zpeed / 4));
                q[next].clone().attr('id', i).prependTo(o).show().animate({
                    opacity : 0, left : bc + 'px', top : U
                }, 0).animate({
                    opacity : ba.back_opac
                },
                zpeed, function ()
                {
                    $('#' + f + ' a *').css({
                        cursor : 'default'
                    });
                    if (ba.autoplay) {
                        startInterval()
                    }
                    if (b == 'twice') {
                        moveRight('twice_end')
                    }
                    else {
                        $('#' + g + ' a *').css({
                            cursor : 'pointer'
                        })
                    }
                    if (!$('#' + g).is(":animated"))
                    {
                        j = false;
                        $('.remove').stop().fadeOut(zpeed, function ()
                        {
                            $(this).remove()
                        });
                        if (typeof move_callback == 'function')
                        {
                            var a = $('#' + g).find('a').attr('href');
                            if (a != undefined && a != '') {
                                move_callback(a)
                            }
                        }
                    }
                }).find('img').animate({
                    width : Q + 'px', height : R + 'px', margin : V + 'px', opacity : 1
                }, 0).end().find('h6:visible').css({
                    'font-size' : S
                });
                if (n) {
                    $('#' + i).find('span:visible').animate(bx, 0)
                }
                else {
                    $('#' + i).find('span').animate(br, 0)
                }
                $('.remove').fadeOut(zpeed, function ()
                {
                    $(this).remove()
                });
                if (k == l) {
                    k = 1
                }
                else {
                    k = (k + 1)
                }
            }
            function moveLeft(b)
            {
                j = true;
                eazing = '';
                zpeed = ba.speed;
                if (easingplugin)
                {
                    if (b == 'twice') {
                        eazing = ba.move_twice_easein;
                        zpeed = Math.round(ba.speed * 0.5)
                    }
                    else if (b == 'twice_end') {
                        eazing = ba.move_twice_easeout
                    }
                    else {
                        eazing = ba.easing;
                    }
                }
                if (ba.autoplay) {
                    stopInterval()
                }
                if (k == 3) {
                    next = l
                }
                else if (k == 2) {
                    next = (l - 1);
                    if (next < 1) {
                        next = l;
                    }
                }
                else if (k == 1) {
                    next = (l - 2);
                    if (next < 1) {
                        next = l;
                    }
                }
                else {
                    next = (k - 3)
                }
                $('#' + i).removeAttr('id').addClass('remove').css('z-index', - 1);
                $newitem5 = $('#' + h);
                $newitem5.attr('id', i).stop().animate({
                    opacity : ba.back_opac, left : bc + 'px', top : U
                }, zpeed, eazing).find('img').stop().animate({
                    width : Q + 'px', height : R + 'px', margin : V + 'px', opacity : 1
                }, zpeed, eazing).end().find('h6:visible').stop().animate({
                    'font-size' : S
                }, zpeed, eazing);
                if (n) {
                    $newitem5.find('span:visible').stop().animate(bx, zpeed, eazing)
                }
                else {
                    $newitem5.find('span').stop().animate(br, zpeed, eazing)
                }
                setTimeout(function ()
                {
                    $newitem5.css('z-index', 1)
                },
                (zpeed / 4));
                $newitem4 = $('#' + g);
                $newitem4.attr('id', h).stop().animate({
                    opacity : ba.behind_opac, left : bb + 'px', top : M
                }, zpeed, eazing).find('img').stop().animate({
                    width : I + 'px', height : J + 'px', margin : N + 'px', opacity : 1
                }, zpeed, eazing).end().find('h6:visible').stop().animate({
                    'font-size' : K
                }, zpeed, eazing);
                if (n) {
                    $newitem4.find('span:visible').stop().animate(bw, zpeed, eazing)
                }
                else {
                    $newitem4.find('span').stop().animate(bq, zpeed, eazing)
                }
                setTimeout(function ()
                {
                    $newitem4.css('z-index', 2)
                },
                (zpeed / 4));
                $newitem3 = $('#' + f);
                $newitem3.attr('id', g).stop().animate({
                    opacity : 1, left : Z + 'px', top : E
                }, zpeed, eazing).find('img').stop().animate({
                    width : front_img_width + 'px', height : front_img_height + 'px', margin : F + 'px', 
                    opacity : 1
                }, zpeed, eazing).end().find('h6:visible').stop().animate({
                    'font-size' : C
                }, zpeed, eazing);
                if (n) {
                    $newitem3.find('span:visible').stop().animate(bv, zpeed, eazing)
                }
                else {
                    $newitem3.find('span').stop().animate(bp, zpeed, eazing)
                }
                setTimeout(function ()
                {
                    $newitem3.css('z-index', 3)
                },
                (zpeed / 4));
                $newitem2 = $('#' + e);
                $newitem2.attr('id', f).stop().animate({
                    opacity : ba.behind_opac, left : Y + 'px', top : M
                }, zpeed, eazing).find('img').stop().animate({
                    width : I + 'px', height : J + 'px', margin : N + 'px', opacity : 1
                }, zpeed, eazing).end().find('h6:visible').stop().animate({
                    'font-size' : K
                }, zpeed, eazing);
                if (n) {
                    $newitem2.find('span:visible').stop().animate(bw, zpeed, eazing)
                }
                else {
                    $newitem2.find('span').stop().animate(bq, zpeed, eazing)
                }
                setTimeout(function ()
                {
                    $newitem2.css('z-index', 2)
                },
                (zpeed / 4));
                q[next].clone().attr('id', e).prependTo(o).show().animate({
                    opacity : 0, left : 0, top : U
                }, 0).animate({
                    opacity : ba.back_opac
                },
                zpeed, function ()
                {
                    $('#' + h + ' a *').css({
                        cursor : 'default'
                    });
                    if (ba.autoplay) {
                        startInterval()
                    }
                    if (b == 'twice') {
                        moveLeft('twice_end')
                    }
                    else {
                        $('#' + g + ' a *').css({
                            cursor : 'pointer'
                        })
                    }
                    if (!$('#' + g).is(":animated"))
                    {
                        j = false;
                        $('.remove').stop().fadeOut(zpeed, function ()
                        {
                            $(this).remove()
                        });
                        if (typeof move_callback == 'function')
                        {
                            var a = $('#' + g).find('a').attr('href');
                            if (a != undefined && a != '') {
                                move_callback(a)
                            }
                        }
                    }
                }).find('img').animate({
                    width : Q + 'px', height : R + 'px', margin : V + 'px', opacity : 1
                }, 0).end().find('h6:visible').css({
                    'font-size' : S
                });
                if (n) {
                    $('#' + e).find('span:visible').animate(bx, 0)
                }
                else {
                    $('#' + e).find('span').animate(br, 0)
                }
                $('.remove').fadeOut(zpeed, function ()
                {
                    $(this).remove()
                });
                if (k == 1) {
                    k = l
                }
                else {
                    k = (k - 1)
                }
            }
            window[d + '_ext_prev'] = Function('', '$("#' + f + '").click();');
            window[d + '_ext_next'] = Function('', '$("#' + h + '").click();');
            $('#' + e).live('click', function ()
            {
                if (ba.freescroll || !j) {
                    moveLeft('twice')
                }
            });
            $('#' + f).live('click', function ()
            {
                if (ba.freescroll || !j) {
                    moveLeft()
                }
            });
            $('#' + h).live('click', function ()
            {
                if (ba.freescroll || !j) {
                    moveRight()
                }
            });
            $('#' + i).live('click', function ()
            {
                if (ba.freescroll || !j) {
                    moveRight('twice')
                }
            });
            $('#' + g).live('hover', function (a)
            {
                if (a.type == 'mouseover' && !j)
                {
                    if (ba.autoplay) {
                        stopInterval()
                    }
                    $(this).addClass('zoomed').stop(true, true).animate(
                    {
                        left : '-=' + (front_img_width * (ba.hovergrowth / 2)) + 'px', top : '-=' + (front_img_height * ba.hovergrowth) + 'px'
                    }, hoverspeed).find('img').stop().animate(
                    {
                        width : (front_img_width * (1 + ba.hovergrowth)) + 'px', height : (front_img_height * (1 + ba.hovergrowth)) + 'px'
                    }, hoverspeed);
                    $('#' + f).stop(true, true).animate({
                        left : '-=' + (I * ba.hovergrowth) + 'px'
                    }, hoverspeed);
                    $('#' + h).stop(true, true).animate({
                        left : '+=' + (I * ba.hovergrowth) + 'px'
                    }, hoverspeed);
                    if (n)
                    {
                        iegrow = Math.round(ba.hovergrowth * front_img_width);
                        $(this).find('span:visible').animate({
                            width : '+=' + iegrow
                        }, hoverspeed)
                    }
                }
                else if (!j)
                {
                    if (ba.autoplay) {
                        startInterval()
                    }
                    $(this).stop().animate({
                        left : Z + 'px', top : E
                    }, hoverspeed).find('img').stop().animate({
                        width : front_img_width + 'px', height : front_img_height + 'px'
                    },
                    hoverspeed, function ()
                    {
                        $('#' + g).removeClass('zoomed')
                    });
                    $('#' + f).stop().animate({
                        left : Y
                    }, hoverspeed);
                    $('#' + h).stop().animate({
                        left : bb
                    }, hoverspeed);
                    if (n)
                    {
                        iegrow = Math.round(ba.hovergrowth * front_img_width);
                        o.find('.zoomed span:visible').animate({
                            width : '-=' + iegrow
                        }, hoverspeed)
                    }
                }
            });
            if (!m) {
                $('#' + g + ':not(.zoomed)').live('mousemove', function ()
                {
                    $('#' + g).mouseover()
                })
            }
            $('#' + e + ' a, #' + f + ' a, #' + h + ' a, #' + i + ' a').live('click', function (a)
            {
                a.preventDefault()
            });
            $('#' + g + ' a').live('click', function ()
            {
                if (typeof link_callback == 'function')
                {
                    link_callback($(this).attr('href'))
                }
            });
            $(document).keydown(function (a)
            {
//                if (a.keyCode == 13) {
//                    $('#' + h).click()
//                }
//                if (a.keyCode == 32) {
//                    a.preventDefault();
//                    $('#' + h).click()
//                }
                if (a.keyCode == 37) {
                    a.preventDefault();
                    $('#' + f).click()
                }
                if (a.keyCode == 39) {
                    a.preventDefault();
                    $('#' + h).click()
                }
            });

			//¸¶¿ì½º ÈÙ
			$('#rolling').bind('mousewheel',this,function(event,delta) {
				if(delta > 0) {
					$('#' + h).click();
				}
				else if(delta < 0) {
					$('#' + f).click()
				}
				return false;
			});
            if (ba.autoplay) {
                startInterval()
            }
        })
    }

})(jQuery);


