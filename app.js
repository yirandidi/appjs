/*
*
*	手机端组件
*	文档地址: https://www.showdoc.cc/805612872705921?page_id=4429881966920245
* 	
*	当前版本信息:0.0.4
* 	...
* 	0.0.3 :
* 		优化除了picker之外的所有事件与template
* 		加入PhotoSwipe
* 		添加notifi消息提示
*   0.0.4 : 
* 		修复notifi排序问题
*		
* 	修改备注：picker代码优化留着下次吧~ 完成后如果没有使用到PhotoSwipe,picker记得删除。体积有点大 好困好困好困！
*	
*/
rem();
$(window).resize(function(){rem()})
function rem() {
	var cw = $(window).width();
	cw = cw / 7.5;
	if(cw < 20) 
	{cw = 20;}
	if(cw > 100) 
	{cw = 100;}
	$('html').css("font-size", cw + 'px');
}
//层级
var zindex = 2501314;
//遮罩层
var yr_mack = '<div class="yr_mack hide" style="z-index:'+zindex+'"></div>';
//总框架
var yr_app = '<div class="yr_app yr_app_layout yrani yrzoomIn"></div>';
//标题
var yr_app_title = '<div class="yr_app_title">{{text}}</div>';
//内容
var yr_app_content = '<div class="yr_app_content">{{text}}</div>';
//按钮
var yr_app_btnbox = "<div class='yr_app_btnBox'></div>";
//按钮1样式
var yr_app_btnstyle1 = '<button class="yr_btnStyle1">{{text}}</button>'
//按钮2样式
var yr_app_btnstyle2 = '<button class="yr_btnStyle2">{{text}}</button>'
//透明遮罩层
var loadMack = '<div class="loadMack"></div>'
//toast
var yr_toast = '<div class="yr_app yr_app_showToast yrani yrfadeIn"></div>';
//打钩
var yr_success = '<div class="app_icon" style="color:rgb(76, 175, 80)">&#xe60a;</div>'
//打叉
var yr_error = '<div class="app_icon" style="color:#f03434">&#xe613;</div>'
//toast标题
var yr_toast_title = '<div class="yr_showToast_title">{{text}}</div>';
//加载图标
var yr_load = '<svg version="1.1" id="loader-1" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"><path fill="#0164DE" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" transform="rotate(157.453 25 25)"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform></path></svg>'
//加载框
var yr_showLoading = '<div class="yr_showLoading"></div>'
//图片预览框
var $html = ['<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">', '<div class="pswp__bg"></div>',
	'<div class="pswp__scroll-wrap">', '<div class="pswp__container">', '<div class="pswp__item"></div>',
	'<div class="pswp__item"></div>', '<div class="pswp__item"></div>', "</div>",
	'<div class="pswp__ui pswp__ui--hidden">', '<div class="pswp__top-bar">', '<div class="pswp__counter"></div>',
	'<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>', '<div class="pswp__preloader">',
	'<div class="pswp__preloader__icn">', ' <div class="pswp__preloader__cut">',
	'<div class="pswp__preloader__donut"></div>', "</div>", "</div>", "</div>", "</div>",
	'<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">',
	'<div class="pswp__share-tooltip"></div> ', "</div>",
	'<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">', "</button>",
	'<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">', "</button>",
	'<div class="pswp__caption">', '<div class="pswp__caption__center"></div>', "</div>", "</div>", "</div>", "</div>"
].join("");
//notifi 优先级比其他层低一级
var yr_notifi = '<div style="z-index:'+(zindex-1)+'" class="yr_notifi yrani1 fadeInRight_qs100"></div>'
//notifi padding
var yr_notifi_body = '<div class="yr_notifi_body"></div>'
// notifi title
var yr_notifi_title = '<div class="yr_notifi_title"></div>'
// notifi text
var yr_notifi_text = '<div class="yr_notifi_text"></div>'
// notifi icon
var yr_notifi_icon = '<div class="yr_notifi_icon app_icon">&#xe622;</div>'
var app = {
	init:function(){
		if($(".yr_mack").length<=0){$("body").append(yr_mack)}
		this.hideMack();
		$(".yr_app").remove();
		this.options = {
			title:"提示",//标题
			btn:['取消','确定'],//按钮
			content:"content", //内容
			duration:2000,//toast消失事件
			icon:"success",
			success:function(msg){},//成功回调
			fail:function(msg){}//失败回调
		}
	},
	//弹窗提示
	alert:function(e){
		try{
			this.init();
			if(typeof e == "string"){e = {content:e};}
			Object.assign(this.options,e);
			this.createElem("alert");
		}
		catch(err){
			console.log(err)
			this.options.fail(err)
		}
	},
	//带有确定取消按钮的对话框
	confirm:function(e){
		try{
			this.init();
			e = typeof e == "object" ? e : {};
			Object.assign(this.options,e);
			this.createElem("confirm");
		}
		catch(err){
			console.log(err)
			this.options.fail(err)
		}
	},
	//自动消失的提示框
	showToast:function(e){
		try{
			this.init();
			e = typeof e == "object" ? e : {};
			Object.assign(this.options,e);
			this.createElem("toast");
		}
		catch(err){
			console.log(err)
			this.options.fail(err)
		}
	},
	//加载框
	showLoading:function(e){
		try{
			this.init();
			e = typeof e == "object" ? e : {};
			Object.assign(this.options,e);
			this.createElem("loading");
		}
		catch(err){
			console.log(err)
			this.options.fail(err)
		}
	},
	//销毁加载
	hideLoading:function(){
		if($(".yr_showLoading").length>=1){this.init();$(".yr_showLoading").remove()}
	},
	//图片预览
	previewImage: function(e){
		app.showLoading({title:"加载中..."});
		if($(".pswp").length<=0){
			$("body").append($html);
			setTimeout(function(){
				app.previewImage(e)
			})
			return ;
		}
		var pswpElement = document.querySelectorAll('.pswp')[0];
		var items = [];
		var options = {};
		for(var i in e.urls){
			if(e.current == e.urls[i]){
				options = {
					index: Number(i)
				};
			}
			new getImage(e.urls[i],function(c,j){
				items[j] = c;
				if(items.length==e.urls.length){
					var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items,options);
					gallery.init();
					app.hideLoading();
				}
			},i)
		}
	},
	//右上角消息通知
	notifi:function(e){
		try{
			this.init();
			e = typeof e == "object" ? e : {};
			Object.assign(this.options,e);
			this.createElem("notifi");
			this.notifiSort();
		}
		catch(err){
			console.log(err)
			this.options.fail(err)
		}
	},
	notifiSort:function(){
		$(".yr_notifi").each(function(index){
			if(index>0){
				var _self = this;
				var top = Number($(_self).prev().attr("top")) + $(_self).prev().height() +10;
				$(_self).css({"top":top}).attr("top",top)
			}else{
				$(this).css({"top":10}).attr("top",10)
			}
		})
	},
	//创建节点并绑定事件 重点！！！
	createElem:function(type){
		let _this = this;
		switch (type){
			case "alert":
				var app = $(yr_app);
				var content = $(yr_app_content.replace("{{text}}",this.options.content));
				var btn = $(yr_app_btnstyle2.replace("{{text}}",this.options.btn[1]));
				var btnbox = $(yr_app_btnbox).append(btn);
				app.append(content);
				app.append(btnbox);
				$(".yr_mack").removeClass("hide").addClass("show");
				$("body").append(app);
				app.css({top:this.getCenterY(app.height()),"z-index":zindex});
				(function(_this){
					btn.bind('click',function(){
						_this.destory(app);
						_this.options.success(true);
					});
				})(_this);
				break;
			case "confirm":
				var app = $(yr_app);
				var title = $(yr_app_title.replace("{{text}}",this.options.title));
				var content = $(yr_app_content.replace("{{text}}",this.options.content));
				var btn1 = $(yr_app_btnstyle1.replace("{{text}}",this.options.btn[0]));
				var btn2 = $(yr_app_btnstyle2.replace("{{text}}",this.options.btn[1]));
				var btnbox = $(yr_app_btnbox).append(btn1).append(btn2);
				app.append(title);
				app.append(content);
				app.append(btnbox);
				$(".yr_mack").removeClass("hide").addClass("show");
				$("body").append(app);
				app.css({top:this.getCenterY(app.height()),"z-index":zindex});
				(function(_this){
					btn1.bind('click',function(){
						_this.destory(app);
						_this.options.success(false);
					});
					btn2.bind('click',function(){
						_this.destory(app);
						_this.options.success(true);
					});
				})(_this);
				break;
			case "toast":
				var app = $(yr_toast);
				var icon = ""
				if(this.options.icon == "success"){
					icon = yr_success;
				}
				if(this.options.icon == "error"){
					icon = yr_error;
				}
				if(this.options.icon == "none"){
					icon = "";
				}
				var title = $(yr_toast_title.replace("{{text}}",this.options.title))
				app.append(icon).append(title).append(loadMack);
				$("body").append(app);
				app.css({top:this.getCenterY(app.height()),left:this.getCenterX(app.width()),"z-index":zindex});
				(function(_this,app){
					setTimeout(function(){
						app.remove();
						_this.options.success(true);
					},_this.options.duration)
				})(_this,app);
				break;
			case "loading":
				var app = $(yr_showLoading);
				var title = $(yr_toast_title.replace("{{text}}",this.options.title))
				app.append(yr_load).append(title).append(loadMack);
				$("body").append(app);
				app.css({top:this.getCenterY(app.height()),left:this.getCenterX(app.width()),"z-index":zindex});
				break;
			case "notifi":
				var app = $(yr_notifi);
				var body = $(yr_notifi_body);
				var icon = "";
				var title = $(yr_notifi_title).html(this.options.title);
				var text = $(yr_notifi_text).html(this.options.content);
				var clostbtn = $(yr_notifi_icon);
				app.addClass(this.options.icon+"icon")
				body.append(title).append(text).append(clostbtn);
				app.append(body);
				$("body").append(app);
				this.notifiSort();
				(function(_this,app){
					clostbtn.bind('click',function(){
						app.removeClass("fadeInRight_qs100").addClass("yrfadeOut");
						setTimeout(function(){
							$.when(app.remove()).then(_this.notifiSort());
						},300)
					});
					setTimeout(function(){
						if(app){
							app.removeClass("fadeInRight_qs100").addClass("yrfadeOut");
							setTimeout(function(){
								$.when(app.remove()).then(_this.notifiSort());
							},300)
						}
					},_this.options.duration)
				})(_this,app);
				break;
			default:
				this.options.fail("还没有这个组件哦!");
				throw new Error('还没有这个组件哦!');
				break;
		}
	},
	//销毁事件
	destory:function(e){
		let _this = this;
		e.removeClass("yrzoomIn").addClass("yrzoomOut");
		(function(e){
		    setTimeout(function(){
		        e.remove();
				_this.hideMack();
		    },300)
		})(e);
	},
	//隐藏遮罩层
	hideMack:function(){
		$(".yr_mack").removeClass("show").addClass("hide");
	},
	//计算Y轴中心点位置
	getCenterY:function(height){
		var Winheight = $(window).height();
		return (Winheight - height) / 2;
	},
	//计算X轴中心点位置
	getCenterX:function(width){
		var Winwidth = $(window).width();
		return (Winwidth - width) / 2;
	}
}
// 重新定义alert
function alert(text){
	if(typeof text == "number"){text = text.toString()}
	app.alert(text);
}
function toast(text) {
	app.showToast({
		icon: "none",
		duration: 2000,
		title: text.toString(),
	});
}
function isArray(o){return Object.prototype.toString.call(o)== '[object Array]';}
function getImage(src,fn,i){
	var img = new Image();
	img.src = src;
	img.onload = function(){
		let item = {src:src,w:img.width,h:img.height}
		fn(item,i)
	}
}
/*! PhotoSwipe - v4.1.0 - 2015-07-11
* http://photoswipe.com
* Copyright (c) 2015 Dmitry Semenov; */
!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.PhotoSwipe=b()}(this,function(){"use strict";var a=function(a,b,c,d){var e={features:null,bind:function(a,b,c,d){var e=(d?"remove":"add")+"EventListener";b=b.split(" ");for(var f=0;f<b.length;f++)b[f]&&a[e](b[f],c,!1)},isArray:function(a){return a instanceof Array},createEl:function(a,b){var c=document.createElement(b||"div");return a&&(c.className=a),c},getScrollY:function(){var a=window.pageYOffset;return void 0!==a?a:document.documentElement.scrollTop},unbind:function(a,b,c){e.bind(a,b,c,!0)},removeClass:function(a,b){var c=new RegExp("(\\s|^)"+b+"(\\s|$)");a.className=a.className.replace(c," ").replace(/^\s\s*/,"").replace(/\s\s*$/,"")},addClass:function(a,b){e.hasClass(a,b)||(a.className+=(a.className?" ":"")+b)},hasClass:function(a,b){return a.className&&new RegExp("(^|\\s)"+b+"(\\s|$)").test(a.className)},getChildByClass:function(a,b){for(var c=a.firstChild;c;){if(e.hasClass(c,b))return c;c=c.nextSibling}},arraySearch:function(a,b,c){for(var d=a.length;d--;)if(a[d][c]===b)return d;return-1},extend:function(a,b,c){for(var d in b)if(b.hasOwnProperty(d)){if(c&&a.hasOwnProperty(d))continue;a[d]=b[d]}},easing:{sine:{out:function(a){return Math.sin(a*(Math.PI/2))},inOut:function(a){return-(Math.cos(Math.PI*a)-1)/2}},cubic:{out:function(a){return--a*a*a+1}}},detectFeatures:function(){if(e.features)return e.features;var a=e.createEl(),b=a.style,c="",d={};if(d.oldIE=document.all&&!document.addEventListener,d.touch="ontouchstart"in window,window.requestAnimationFrame&&(d.raf=window.requestAnimationFrame,d.caf=window.cancelAnimationFrame),d.pointerEvent=navigator.pointerEnabled||navigator.msPointerEnabled,!d.pointerEvent){var f=navigator.userAgent;if(/iP(hone|od)/.test(navigator.platform)){var g=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);g&&g.length>0&&(g=parseInt(g[1],10),g>=1&&8>g&&(d.isOldIOSPhone=!0))}var h=f.match(/Android\s([0-9\.]*)/),i=h?h[1]:0;i=parseFloat(i),i>=1&&(4.4>i&&(d.isOldAndroid=!0),d.androidVersion=i),d.isMobileOpera=/opera mini|opera mobi/i.test(f)}for(var j,k,l=["transform","perspective","animationName"],m=["","webkit","Moz","ms","O"],n=0;4>n;n++){c=m[n];for(var o=0;3>o;o++)j=l[o],k=c+(c?j.charAt(0).toUpperCase()+j.slice(1):j),!d[j]&&k in b&&(d[j]=k);c&&!d.raf&&(c=c.toLowerCase(),d.raf=window[c+"RequestAnimationFrame"],d.raf&&(d.caf=window[c+"CancelAnimationFrame"]||window[c+"CancelRequestAnimationFrame"]))}if(!d.raf){var p=0;d.raf=function(a){var b=(new Date).getTime(),c=Math.max(0,16-(b-p)),d=window.setTimeout(function(){a(b+c)},c);return p=b+c,d},d.caf=function(a){clearTimeout(a)}}return d.svg=!!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,e.features=d,d}};e.detectFeatures(),e.features.oldIE&&(e.bind=function(a,b,c,d){b=b.split(" ");for(var e,f=(d?"detach":"attach")+"Event",g=function(){c.handleEvent.call(c)},h=0;h<b.length;h++)if(e=b[h])if("object"==typeof c&&c.handleEvent){if(d){if(!c["oldIE"+e])return!1}else c["oldIE"+e]=g;a[f]("on"+e,c["oldIE"+e])}else a[f]("on"+e,c)});var f=this,g=25,h=3,i={allowPanToNext:!0,spacing:.12,bgOpacity:1,mouseUsed:!1,loop:!0,pinchToClose:!0,closeOnScroll:!0,closeOnVerticalDrag:!0,verticalDragRange:.75,hideAnimationDuration:333,showAnimationDuration:333,showHideOpacity:!1,focus:!0,escKey:!0,arrowKeys:!0,mainScrollEndFriction:.35,panEndFriction:.35,isClickableElement:function(a){return"A"===a.tagName},getDoubleTapZoom:function(a,b){return a?1:b.initialZoomLevel<.7?1:1.33},maxSpreadZoom:1.33,modal:!0,scaleMode:"fit",alwaysFadeIn:!1};e.extend(i,d);var j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,aa,ba,ca,da,ea,fa,ga,ha,ia,ja,ka,la=function(){return{x:0,y:0}},ma=la(),na=la(),oa=la(),pa={},qa=0,ra={},sa=la(),ta=0,ua=!0,va=[],wa={},xa=!1,ya=function(a,b){e.extend(f,b.publicMethods),va.push(a)},za=function(a){var b=_b();return a>b-1?a-b:0>a?b+a:a},Aa={},Ba=function(a,b){return Aa[a]||(Aa[a]=[]),Aa[a].push(b)},Ca=function(a){var b=Aa[a];if(b){var c=Array.prototype.slice.call(arguments);c.shift();for(var d=0;d<b.length;d++)b[d].apply(f,c)}},Da=function(){return(new Date).getTime()},Ea=function(a){ia=a,f.bg.style.opacity=a*i.bgOpacity},Fa=function(a,b,c,d,e){(!xa||e&&e!==f.currItem)&&(d/=e?e.fitRatio:f.currItem.fitRatio),a[E]=u+b+"px, "+c+"px"+v+" scale("+d+")"},Ga=function(a){da&&(a&&(s>f.currItem.fitRatio?xa||(lc(f.currItem,!1,!0),xa=!0):xa&&(lc(f.currItem),xa=!1)),Fa(da,oa.x,oa.y,s))},Ha=function(a){a.container&&Fa(a.container.style,a.initialPosition.x,a.initialPosition.y,a.initialZoomLevel,a)},Ia=function(a,b){b[E]=u+a+"px, 0px"+v},Ja=function(a,b){if(!i.loop&&b){var c=m+(sa.x*qa-a)/sa.x,d=Math.round(a-sb.x);(0>c&&d>0||c>=_b()-1&&0>d)&&(a=sb.x+d*i.mainScrollEndFriction)}sb.x=a,Ia(a,n)},Ka=function(a,b){var c=tb[a]-ra[a];return na[a]+ma[a]+c-c*(b/t)},La=function(a,b){a.x=b.x,a.y=b.y,b.id&&(a.id=b.id)},Ma=function(a){a.x=Math.round(a.x),a.y=Math.round(a.y)},Na=null,Oa=function(){Na&&(e.unbind(document,"mousemove",Oa),e.addClass(a,"pswp--has_mouse"),i.mouseUsed=!0,Ca("mouseUsed")),Na=setTimeout(function(){Na=null},100)},Pa=function(){e.bind(document,"keydown",f),N.transform&&e.bind(f.scrollWrap,"click",f),i.mouseUsed||e.bind(document,"mousemove",Oa),e.bind(window,"resize scroll",f),Ca("bindEvents")},Qa=function(){e.unbind(window,"resize",f),e.unbind(window,"scroll",r.scroll),e.unbind(document,"keydown",f),e.unbind(document,"mousemove",Oa),N.transform&&e.unbind(f.scrollWrap,"click",f),U&&e.unbind(window,p,f),Ca("unbindEvents")},Ra=function(a,b){var c=hc(f.currItem,pa,a);return b&&(ca=c),c},Sa=function(a){return a||(a=f.currItem),a.initialZoomLevel},Ta=function(a){return a||(a=f.currItem),a.w>0?i.maxSpreadZoom:1},Ua=function(a,b,c,d){return d===f.currItem.initialZoomLevel?(c[a]=f.currItem.initialPosition[a],!0):(c[a]=Ka(a,d),c[a]>b.min[a]?(c[a]=b.min[a],!0):c[a]<b.max[a]?(c[a]=b.max[a],!0):!1)},Va=function(){if(E){var b=N.perspective&&!G;return u="translate"+(b?"3d(":"("),void(v=N.perspective?", 0px)":")")}E="left",e.addClass(a,"pswp--ie"),Ia=function(a,b){b.left=a+"px"},Ha=function(a){var b=a.fitRatio>1?1:a.fitRatio,c=a.container.style,d=b*a.w,e=b*a.h;c.width=d+"px",c.height=e+"px",c.left=a.initialPosition.x+"px",c.top=a.initialPosition.y+"px"},Ga=function(){if(da){var a=da,b=f.currItem,c=b.fitRatio>1?1:b.fitRatio,d=c*b.w,e=c*b.h;a.width=d+"px",a.height=e+"px",a.left=oa.x+"px",a.top=oa.y+"px"}}},Wa=function(a){var b="";i.escKey&&27===a.keyCode?b="close":i.arrowKeys&&(37===a.keyCode?b="prev":39===a.keyCode&&(b="next")),b&&(a.ctrlKey||a.altKey||a.shiftKey||a.metaKey||(a.preventDefault?a.preventDefault():a.returnValue=!1,f[b]()))},Xa=function(a){a&&(X||W||ea||S)&&(a.preventDefault(),a.stopPropagation())},Ya=function(){f.setScrollOffset(0,e.getScrollY())},Za={},$a=0,_a=function(a){Za[a]&&(Za[a].raf&&I(Za[a].raf),$a--,delete Za[a])},ab=function(a){Za[a]&&_a(a),Za[a]||($a++,Za[a]={})},bb=function(){for(var a in Za)Za.hasOwnProperty(a)&&_a(a)},cb=function(a,b,c,d,e,f,g){var h,i=Da();ab(a);var j=function(){if(Za[a]){if(h=Da()-i,h>=d)return _a(a),f(c),void(g&&g());f((c-b)*e(h/d)+b),Za[a].raf=H(j)}};j()},db={shout:Ca,listen:Ba,viewportSize:pa,options:i,isMainScrollAnimating:function(){return ea},getZoomLevel:function(){return s},getCurrentIndex:function(){return m},isDragging:function(){return U},isZooming:function(){return _},setScrollOffset:function(a,b){ra.x=a,M=ra.y=b,Ca("updateScrollOffset",ra)},applyZoomPan:function(a,b,c,d){oa.x=b,oa.y=c,s=a,Ga(d)},init:function(){if(!j&&!k){var c;f.framework=e,f.template=a,f.bg=e.getChildByClass(a,"pswp__bg"),J=a.className,j=!0,N=e.detectFeatures(),H=N.raf,I=N.caf,E=N.transform,L=N.oldIE,f.scrollWrap=e.getChildByClass(a,"pswp__scroll-wrap"),f.container=e.getChildByClass(f.scrollWrap,"pswp__container"),n=f.container.style,f.itemHolders=y=[{el:f.container.children[0],wrap:0,index:-1},{el:f.container.children[1],wrap:0,index:-1},{el:f.container.children[2],wrap:0,index:-1}],y[0].el.style.display=y[2].el.style.display="none",Va(),r={resize:f.updateSize,scroll:Ya,keydown:Wa,click:Xa};var d=N.isOldIOSPhone||N.isOldAndroid||N.isMobileOpera;for(N.animationName&&N.transform&&!d||(i.showAnimationDuration=i.hideAnimationDuration=0),c=0;c<va.length;c++)f["init"+va[c]]();if(b){var g=f.ui=new b(f,e);g.init()}Ca("firstUpdate"),m=m||i.index||0,(isNaN(m)||0>m||m>=_b())&&(m=0),f.currItem=$b(m),(N.isOldIOSPhone||N.isOldAndroid)&&(ua=!1),a.setAttribute("aria-hidden","false"),i.modal&&(ua?a.style.position="fixed":(a.style.position="absolute",a.style.top=e.getScrollY()+"px")),void 0===M&&(Ca("initialLayout"),M=K=e.getScrollY());var l="pswp--open ";for(i.mainClass&&(l+=i.mainClass+" "),i.showHideOpacity&&(l+="pswp--animate_opacity "),l+=G?"pswp--touch":"pswp--notouch",l+=N.animationName?" pswp--css_animation":"",l+=N.svg?" pswp--svg":"",e.addClass(a,l),f.updateSize(),o=-1,ta=null,c=0;h>c;c++)Ia((c+o)*sa.x,y[c].el.style);L||e.bind(f.scrollWrap,q,f),Ba("initialZoomInEnd",function(){f.setContent(y[0],m-1),f.setContent(y[2],m+1),y[0].el.style.display=y[2].el.style.display="block",i.focus&&a.focus(),Pa()}),f.setContent(y[1],m),f.updateCurrItem(),Ca("afterInit"),ua||(w=setInterval(function(){$a||U||_||s!==f.currItem.initialZoomLevel||f.updateSize()},1e3)),e.addClass(a,"pswp--visible")}},close:function(){j&&(j=!1,k=!0,Ca("close"),Qa(),bc(f.currItem,null,!0,f.destroy))},destroy:function(){Ca("destroy"),Wb&&clearTimeout(Wb),a.setAttribute("aria-hidden","true"),a.className=J,w&&clearInterval(w),e.unbind(f.scrollWrap,q,f),e.unbind(window,"scroll",f),yb(),bb(),Aa=null},panTo:function(a,b,c){c||(a>ca.min.x?a=ca.min.x:a<ca.max.x&&(a=ca.max.x),b>ca.min.y?b=ca.min.y:b<ca.max.y&&(b=ca.max.y)),oa.x=a,oa.y=b,Ga()},handleEvent:function(a){a=a||window.event,r[a.type]&&r[a.type](a)},goTo:function(a){a=za(a);var b=a-m;ta=b,m=a,f.currItem=$b(m),qa-=b,Ja(sa.x*qa),bb(),ea=!1,f.updateCurrItem()},next:function(){f.goTo(m+1)},prev:function(){f.goTo(m-1)},updateCurrZoomItem:function(a){if(a&&Ca("beforeChange",0),y[1].el.children.length){var b=y[1].el.children[0];da=e.hasClass(b,"pswp__zoom-wrap")?b.style:null}else da=null;ca=f.currItem.bounds,t=s=f.currItem.initialZoomLevel,oa.x=ca.center.x,oa.y=ca.center.y,a&&Ca("afterChange")},invalidateCurrItems:function(){x=!0;for(var a=0;h>a;a++)y[a].item&&(y[a].item.needsUpdate=!0)},updateCurrItem:function(a){if(0!==ta){var b,c=Math.abs(ta);if(!(a&&2>c)){f.currItem=$b(m),xa=!1,Ca("beforeChange",ta),c>=h&&(o+=ta+(ta>0?-h:h),c=h);for(var d=0;c>d;d++)ta>0?(b=y.shift(),y[h-1]=b,o++,Ia((o+2)*sa.x,b.el.style),f.setContent(b,m-c+d+1+1)):(b=y.pop(),y.unshift(b),o--,Ia(o*sa.x,b.el.style),f.setContent(b,m+c-d-1-1));if(da&&1===Math.abs(ta)){var e=$b(z);e.initialZoomLevel!==s&&(hc(e,pa),lc(e),Ha(e))}ta=0,f.updateCurrZoomItem(),z=m,Ca("afterChange")}}},updateSize:function(b){if(!ua&&i.modal){var c=e.getScrollY();if(M!==c&&(a.style.top=c+"px",M=c),!b&&wa.x===window.innerWidth&&wa.y===window.innerHeight)return;wa.x=window.innerWidth,wa.y=window.innerHeight,a.style.height=wa.y+"px"}if(pa.x=f.scrollWrap.clientWidth,pa.y=f.scrollWrap.clientHeight,Ya(),sa.x=pa.x+Math.round(pa.x*i.spacing),sa.y=pa.y,Ja(sa.x*qa),Ca("beforeResize"),void 0!==o){for(var d,g,j,k=0;h>k;k++)d=y[k],Ia((k+o)*sa.x,d.el.style),j=m+k-1,i.loop&&_b()>2&&(j=za(j)),g=$b(j),g&&(x||g.needsUpdate||!g.bounds)?(f.cleanSlide(g),f.setContent(d,j),1===k&&(f.currItem=g,f.updateCurrZoomItem(!0)),g.needsUpdate=!1):-1===d.index&&j>=0&&f.setContent(d,j),g&&g.container&&(hc(g,pa),lc(g),Ha(g));x=!1}t=s=f.currItem.initialZoomLevel,ca=f.currItem.bounds,ca&&(oa.x=ca.center.x,oa.y=ca.center.y,Ga(!0)),Ca("resize")},zoomTo:function(a,b,c,d,f){b&&(t=s,tb.x=Math.abs(b.x)-oa.x,tb.y=Math.abs(b.y)-oa.y,La(na,oa));var g=Ra(a,!1),h={};Ua("x",g,h,a),Ua("y",g,h,a);var i=s,j={x:oa.x,y:oa.y};Ma(h);var k=function(b){1===b?(s=a,oa.x=h.x,oa.y=h.y):(s=(a-i)*b+i,oa.x=(h.x-j.x)*b+j.x,oa.y=(h.y-j.y)*b+j.y),f&&f(b),Ga(1===b)};c?cb("customZoomTo",0,1,c,d||e.easing.sine.inOut,k):k(1)}},eb=30,fb=10,gb={},hb={},ib={},jb={},kb={},lb=[],mb={},nb=[],ob={},pb=0,qb=la(),rb=0,sb=la(),tb=la(),ub=la(),vb=function(a,b){return a.x===b.x&&a.y===b.y},wb=function(a,b){return Math.abs(a.x-b.x)<g&&Math.abs(a.y-b.y)<g},xb=function(a,b){return ob.x=Math.abs(a.x-b.x),ob.y=Math.abs(a.y-b.y),Math.sqrt(ob.x*ob.x+ob.y*ob.y)},yb=function(){Y&&(I(Y),Y=null)},zb=function(){U&&(Y=H(zb),Pb())},Ab=function(){return!("fit"===i.scaleMode&&s===f.currItem.initialZoomLevel)},Bb=function(a,b){return a?a.className&&a.className.indexOf("pswp__scroll-wrap")>-1?!1:b(a)?a:Bb(a.parentNode,b):!1},Cb={},Db=function(a,b){return Cb.prevent=!Bb(a.target,i.isClickableElement),Ca("preventDragEvent",a,b,Cb),Cb.prevent},Eb=function(a,b){return b.x=a.pageX,b.y=a.pageY,b.id=a.identifier,b},Fb=function(a,b,c){c.x=.5*(a.x+b.x),c.y=.5*(a.y+b.y)},Gb=function(a,b,c){if(a-P>50){var d=nb.length>2?nb.shift():{};d.x=b,d.y=c,nb.push(d),P=a}},Hb=function(){var a=oa.y-f.currItem.initialPosition.y;return 1-Math.abs(a/(pa.y/2))},Ib={},Jb={},Kb=[],Lb=function(a){for(;Kb.length>0;)Kb.pop();return F?(ka=0,lb.forEach(function(a){0===ka?Kb[0]=a:1===ka&&(Kb[1]=a),ka++})):a.type.indexOf("touch")>-1?a.touches&&a.touches.length>0&&(Kb[0]=Eb(a.touches[0],Ib),a.touches.length>1&&(Kb[1]=Eb(a.touches[1],Jb))):(Ib.x=a.pageX,Ib.y=a.pageY,Ib.id="",Kb[0]=Ib),Kb},Mb=function(a,b){var c,d,e,g,h=0,j=oa[a]+b[a],k=b[a]>0,l=sb.x+b.x,m=sb.x-mb.x;return c=j>ca.min[a]||j<ca.max[a]?i.panEndFriction:1,j=oa[a]+b[a]*c,!i.allowPanToNext&&s!==f.currItem.initialZoomLevel||(da?"h"!==fa||"x"!==a||W||(k?(j>ca.min[a]&&(c=i.panEndFriction,h=ca.min[a]-j,d=ca.min[a]-na[a]),(0>=d||0>m)&&_b()>1?(g=l,0>m&&l>mb.x&&(g=mb.x)):ca.min.x!==ca.max.x&&(e=j)):(j<ca.max[a]&&(c=i.panEndFriction,h=j-ca.max[a],d=na[a]-ca.max[a]),(0>=d||m>0)&&_b()>1?(g=l,m>0&&l<mb.x&&(g=mb.x)):ca.min.x!==ca.max.x&&(e=j))):g=l,"x"!==a)?void(ea||Z||s>f.currItem.fitRatio&&(oa[a]+=b[a]*c)):(void 0!==g&&(Ja(g,!0),Z=g===mb.x?!1:!0),ca.min.x!==ca.max.x&&(void 0!==e?oa.x=e:Z||(oa.x+=b.x*c)),void 0!==g)},Nb=function(a){if(!("mousedown"===a.type&&a.button>0)){if(Zb)return void a.preventDefault();if(!T||"mousedown"!==a.type){if(Db(a,!0)&&a.preventDefault(),Ca("pointerDown"),F){var b=e.arraySearch(lb,a.pointerId,"id");0>b&&(b=lb.length),lb[b]={x:a.pageX,y:a.pageY,id:a.pointerId}}var c=Lb(a),d=c.length;$=null,bb(),U&&1!==d||(U=ga=!0,e.bind(window,p,f),R=ja=ha=S=Z=X=V=W=!1,fa=null,Ca("firstTouchStart",c),La(na,oa),ma.x=ma.y=0,La(jb,c[0]),La(kb,jb),mb.x=sa.x*qa,nb=[{x:jb.x,y:jb.y}],P=O=Da(),Ra(s,!0),yb(),zb()),!_&&d>1&&!ea&&!Z&&(t=s,W=!1,_=V=!0,ma.y=ma.x=0,La(na,oa),La(gb,c[0]),La(hb,c[1]),Fb(gb,hb,ub),tb.x=Math.abs(ub.x)-oa.x,tb.y=Math.abs(ub.y)-oa.y,aa=ba=xb(gb,hb))}}},Ob=function(a){if(a.preventDefault(),F){var b=e.arraySearch(lb,a.pointerId,"id");if(b>-1){var c=lb[b];c.x=a.pageX,c.y=a.pageY}}if(U){var d=Lb(a);if(fa||X||_)$=d;else if(sb.x!==sa.x*qa)fa="h";else{var f=Math.abs(d[0].x-jb.x)-Math.abs(d[0].y-jb.y);Math.abs(f)>=fb&&(fa=f>0?"h":"v",$=d)}}},Pb=function(){if($){var a=$.length;if(0!==a)if(La(gb,$[0]),ib.x=gb.x-jb.x,ib.y=gb.y-jb.y,_&&a>1){if(jb.x=gb.x,jb.y=gb.y,!ib.x&&!ib.y&&vb($[1],hb))return;La(hb,$[1]),W||(W=!0,Ca("zoomGestureStarted"));var b=xb(gb,hb),c=Ub(b);c>f.currItem.initialZoomLevel+f.currItem.initialZoomLevel/15&&(ja=!0);var d=1,e=Sa(),g=Ta();if(e>c)if(i.pinchToClose&&!ja&&t<=f.currItem.initialZoomLevel){var h=e-c,j=1-h/(e/1.2);Ea(j),Ca("onPinchClose",j),ha=!0}else d=(e-c)/e,d>1&&(d=1),c=e-d*(e/3);else c>g&&(d=(c-g)/(6*e),d>1&&(d=1),c=g+d*e);0>d&&(d=0),aa=b,Fb(gb,hb,qb),ma.x+=qb.x-ub.x,ma.y+=qb.y-ub.y,La(ub,qb),oa.x=Ka("x",c),oa.y=Ka("y",c),R=c>s,s=c,Ga()}else{if(!fa)return;if(ga&&(ga=!1,Math.abs(ib.x)>=fb&&(ib.x-=$[0].x-kb.x),Math.abs(ib.y)>=fb&&(ib.y-=$[0].y-kb.y)),jb.x=gb.x,jb.y=gb.y,0===ib.x&&0===ib.y)return;if("v"===fa&&i.closeOnVerticalDrag&&!Ab()){ma.y+=ib.y,oa.y+=ib.y;var k=Hb();return S=!0,Ca("onVerticalDrag",k),Ea(k),void Ga()}Gb(Da(),gb.x,gb.y),X=!0,ca=f.currItem.bounds;var l=Mb("x",ib);l||(Mb("y",ib),Ma(oa),Ga())}}},Qb=function(a){if(N.isOldAndroid){if(T&&"mouseup"===a.type)return;a.type.indexOf("touch")>-1&&(clearTimeout(T),T=setTimeout(function(){T=0},600))}Ca("pointerUp"),Db(a,!1)&&a.preventDefault();var b;if(F){var c=e.arraySearch(lb,a.pointerId,"id");if(c>-1)if(b=lb.splice(c,1)[0],navigator.pointerEnabled)b.type=a.pointerType||"mouse";else{var d={4:"mouse",2:"touch",3:"pen"};b.type=d[a.pointerType],b.type||(b.type=a.pointerType||"mouse")}}var g,h=Lb(a),j=h.length;if("mouseup"===a.type&&(j=0),2===j)return $=null,!0;1===j&&La(kb,h[0]),0!==j||fa||ea||(b||("mouseup"===a.type?b={x:a.pageX,y:a.pageY,type:"mouse"}:a.changedTouches&&a.changedTouches[0]&&(b={x:a.changedTouches[0].pageX,y:a.changedTouches[0].pageY,type:"touch"})),Ca("touchRelease",a,b));var k=-1;if(0===j&&(U=!1,e.unbind(window,p,f),yb(),_?k=0:-1!==rb&&(k=Da()-rb)),rb=1===j?Da():-1,g=-1!==k&&150>k?"zoom":"swipe",_&&2>j&&(_=!1,1===j&&(g="zoomPointerUp"),Ca("zoomGestureEnded")),$=null,X||W||ea||S)if(bb(),Q||(Q=Rb()),Q.calculateSwipeSpeed("x"),S){var l=Hb();if(l<i.verticalDragRange)f.close();else{var m=oa.y,n=ia;cb("verticalDrag",0,1,300,e.easing.cubic.out,function(a){oa.y=(f.currItem.initialPosition.y-m)*a+m,Ea((1-n)*a+n),Ga()}),Ca("onVerticalDrag",1)}}else{if((Z||ea)&&0===j){var o=Tb(g,Q);if(o)return;g="zoomPointerUp"}if(!ea)return"swipe"!==g?void Vb():void(!Z&&s>f.currItem.fitRatio&&Sb(Q))}},Rb=function(){var a,b,c={lastFlickOffset:{},lastFlickDist:{},lastFlickSpeed:{},slowDownRatio:{},slowDownRatioReverse:{},speedDecelerationRatio:{},speedDecelerationRatioAbs:{},distanceOffset:{},backAnimDestination:{},backAnimStarted:{},calculateSwipeSpeed:function(d){nb.length>1?(a=Da()-P+50,b=nb[nb.length-2][d]):(a=Da()-O,b=kb[d]),c.lastFlickOffset[d]=jb[d]-b,c.lastFlickDist[d]=Math.abs(c.lastFlickOffset[d]),c.lastFlickDist[d]>20?c.lastFlickSpeed[d]=c.lastFlickOffset[d]/a:c.lastFlickSpeed[d]=0,Math.abs(c.lastFlickSpeed[d])<.1&&(c.lastFlickSpeed[d]=0),c.slowDownRatio[d]=.95,c.slowDownRatioReverse[d]=1-c.slowDownRatio[d],c.speedDecelerationRatio[d]=1},calculateOverBoundsAnimOffset:function(a,b){c.backAnimStarted[a]||(oa[a]>ca.min[a]?c.backAnimDestination[a]=ca.min[a]:oa[a]<ca.max[a]&&(c.backAnimDestination[a]=ca.max[a]),void 0!==c.backAnimDestination[a]&&(c.slowDownRatio[a]=.7,c.slowDownRatioReverse[a]=1-c.slowDownRatio[a],c.speedDecelerationRatioAbs[a]<.05&&(c.lastFlickSpeed[a]=0,c.backAnimStarted[a]=!0,cb("bounceZoomPan"+a,oa[a],c.backAnimDestination[a],b||300,e.easing.sine.out,function(b){oa[a]=b,Ga()}))))},calculateAnimOffset:function(a){c.backAnimStarted[a]||(c.speedDecelerationRatio[a]=c.speedDecelerationRatio[a]*(c.slowDownRatio[a]+c.slowDownRatioReverse[a]-c.slowDownRatioReverse[a]*c.timeDiff/10),c.speedDecelerationRatioAbs[a]=Math.abs(c.lastFlickSpeed[a]*c.speedDecelerationRatio[a]),c.distanceOffset[a]=c.lastFlickSpeed[a]*c.speedDecelerationRatio[a]*c.timeDiff,oa[a]+=c.distanceOffset[a])},panAnimLoop:function(){return Za.zoomPan&&(Za.zoomPan.raf=H(c.panAnimLoop),c.now=Da(),c.timeDiff=c.now-c.lastNow,c.lastNow=c.now,c.calculateAnimOffset("x"),c.calculateAnimOffset("y"),Ga(),c.calculateOverBoundsAnimOffset("x"),c.calculateOverBoundsAnimOffset("y"),c.speedDecelerationRatioAbs.x<.05&&c.speedDecelerationRatioAbs.y<.05)?(oa.x=Math.round(oa.x),oa.y=Math.round(oa.y),Ga(),void _a("zoomPan")):void 0}};return c},Sb=function(a){return a.calculateSwipeSpeed("y"),ca=f.currItem.bounds,a.backAnimDestination={},a.backAnimStarted={},Math.abs(a.lastFlickSpeed.x)<=.05&&Math.abs(a.lastFlickSpeed.y)<=.05?(a.speedDecelerationRatioAbs.x=a.speedDecelerationRatioAbs.y=0,a.calculateOverBoundsAnimOffset("x"),a.calculateOverBoundsAnimOffset("y"),!0):(ab("zoomPan"),a.lastNow=Da(),void a.panAnimLoop())},Tb=function(a,b){var c;ea||(pb=m);var d;if("swipe"===a){var g=jb.x-kb.x,h=b.lastFlickDist.x<10;g>eb&&(h||b.lastFlickOffset.x>20)?d=-1:-eb>g&&(h||b.lastFlickOffset.x<-20)&&(d=1)}var j;d&&(m+=d,0>m?(m=i.loop?_b()-1:0,j=!0):m>=_b()&&(m=i.loop?0:_b()-1,j=!0),(!j||i.loop)&&(ta+=d,qa-=d,c=!0));var k,l=sa.x*qa,n=Math.abs(l-sb.x);return c||l>sb.x==b.lastFlickSpeed.x>0?(k=Math.abs(b.lastFlickSpeed.x)>0?n/Math.abs(b.lastFlickSpeed.x):333,k=Math.min(k,400),k=Math.max(k,250)):k=333,pb===m&&(c=!1),ea=!0,Ca("mainScrollAnimStart"),cb("mainScroll",sb.x,l,k,e.easing.cubic.out,Ja,function(){bb(),ea=!1,pb=-1,(c||pb!==m)&&f.updateCurrItem(),Ca("mainScrollAnimComplete")}),c&&f.updateCurrItem(!0),c},Ub=function(a){return 1/ba*a*t},Vb=function(){var a=s,b=Sa(),c=Ta();b>s?a=b:s>c&&(a=c);var d,g=1,h=ia;return ha&&!R&&!ja&&b>s?(f.close(),!0):(ha&&(d=function(a){Ea((g-h)*a+h)}),f.zoomTo(a,0,200,e.easing.cubic.out,d),!0)};ya("Gestures",{publicMethods:{initGestures:function(){var a=function(a,b,c,d,e){A=a+b,B=a+c,C=a+d,D=e?a+e:""};F=N.pointerEvent,F&&N.touch&&(N.touch=!1),F?navigator.pointerEnabled?a("pointer","down","move","up","cancel"):a("MSPointer","Down","Move","Up","Cancel"):N.touch?(a("touch","start","move","end","cancel"),G=!0):a("mouse","down","move","up"),p=B+" "+C+" "+D,q=A,F&&!G&&(G=navigator.maxTouchPoints>1||navigator.msMaxTouchPoints>1),f.likelyTouchDevice=G,r[A]=Nb,r[B]=Ob,r[C]=Qb,D&&(r[D]=r[C]),N.touch&&(q+=" mousedown",p+=" mousemove mouseup",r.mousedown=r[A],r.mousemove=r[B],r.mouseup=r[C]),G||(i.allowPanToNext=!1)}}});var Wb,Xb,Yb,Zb,$b,_b,ac,bc=function(b,c,d,g){Wb&&clearTimeout(Wb),Zb=!0,Yb=!0;var h;b.initialLayout?(h=b.initialLayout,b.initialLayout=null):h=i.getThumbBoundsFn&&i.getThumbBoundsFn(m);var j=d?i.hideAnimationDuration:i.showAnimationDuration,k=function(){_a("initialZoom"),d?(f.template.removeAttribute("style"),f.bg.removeAttribute("style")):(Ea(1),c&&(c.style.display="block"),e.addClass(a,"pswp--animated-in"),Ca("initialZoom"+(d?"OutEnd":"InEnd"))),g&&g(),Zb=!1};if(!j||!h||void 0===h.x){var n=function(){Ca("initialZoom"+(d?"Out":"In")),s=b.initialZoomLevel,La(oa,b.initialPosition),Ga(),a.style.opacity=d?0:1,Ea(1),k()};return void n()}var o=function(){var c=l,g=!f.currItem.src||f.currItem.loadError||i.showHideOpacity;b.miniImg&&(b.miniImg.style.webkitBackfaceVisibility="hidden"),d||(s=h.w/b.w,oa.x=h.x,oa.y=h.y-K,f[g?"template":"bg"].style.opacity=.001,Ga()),ab("initialZoom"),d&&!c&&e.removeClass(a,"pswp--animated-in"),g&&(d?e[(c?"remove":"add")+"Class"](a,"pswp--animate_opacity"):setTimeout(function(){e.addClass(a,"pswp--animate_opacity")},30)),Wb=setTimeout(function(){if(Ca("initialZoom"+(d?"Out":"In")),d){var f=h.w/b.w,i={x:oa.x,y:oa.y},l=s,m=ia,n=function(b){1===b?(s=f,oa.x=h.x,oa.y=h.y-M):(s=(f-l)*b+l,oa.x=(h.x-i.x)*b+i.x,oa.y=(h.y-M-i.y)*b+i.y),Ga(),g?a.style.opacity=1-b:Ea(m-b*m)};c?cb("initialZoom",0,1,j,e.easing.cubic.out,n,k):(n(1),Wb=setTimeout(k,j+20))}else s=b.initialZoomLevel,La(oa,b.initialPosition),Ga(),Ea(1),g?a.style.opacity=1:Ea(1),Wb=setTimeout(k,j+20)},d?25:90)};o()},cc={},dc=[],ec={index:0,errorMsg:'<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',forceProgressiveLoading:!1,preload:[1,1],getNumItemsFn:function(){return Xb.length}},fc=function(){return{center:{x:0,y:0},max:{x:0,y:0},min:{x:0,y:0}}},gc=function(a,b,c){var d=a.bounds;d.center.x=Math.round((cc.x-b)/2),d.center.y=Math.round((cc.y-c)/2)+a.vGap.top,d.max.x=b>cc.x?Math.round(cc.x-b):d.center.x,d.max.y=c>cc.y?Math.round(cc.y-c)+a.vGap.top:d.center.y,d.min.x=b>cc.x?0:d.center.x,d.min.y=c>cc.y?a.vGap.top:d.center.y},hc=function(a,b,c){if(a.src&&!a.loadError){var d=!c;if(d&&(a.vGap||(a.vGap={top:0,bottom:0}),Ca("parseVerticalMargin",a)),cc.x=b.x,cc.y=b.y-a.vGap.top-a.vGap.bottom,d){var e=cc.x/a.w,f=cc.y/a.h;a.fitRatio=f>e?e:f;var g=i.scaleMode;"orig"===g?c=1:"fit"===g&&(c=a.fitRatio),c>1&&(c=1),a.initialZoomLevel=c,a.bounds||(a.bounds=fc())}if(!c)return;return gc(a,a.w*c,a.h*c),d&&c===a.initialZoomLevel&&(a.initialPosition=a.bounds.center),a.bounds}return a.w=a.h=0,a.initialZoomLevel=a.fitRatio=1,a.bounds=fc(),a.initialPosition=a.bounds.center,a.bounds},ic=function(a,b,c,d,e,f){b.loadError||d&&(b.imageAppended=!0,lc(b,d),c.appendChild(d),f&&setTimeout(function(){b&&b.loaded&&b.placeholder&&(b.placeholder.style.display="none",b.placeholder=null)},500))},jc=function(a){a.loading=!0,a.loaded=!1;var b=a.img=e.createEl("pswp__img","img"),c=function(){a.loading=!1,a.loaded=!0,a.loadComplete?a.loadComplete(a):a.img=null,b.onload=b.onerror=null,b=null};return b.onload=c,b.onerror=function(){a.loadError=!0,c()},b.src=a.src,b},kc=function(a,b){return a.src&&a.loadError&&a.container?(b&&(a.container.innerHTML=""),a.container.innerHTML=i.errorMsg.replace("%url%",a.src),!0):void 0},lc=function(a,b,c){if(a.src){b||(b=a.container.lastChild);var d=c?a.w:Math.round(a.w*a.fitRatio),e=c?a.h:Math.round(a.h*a.fitRatio);a.placeholder&&!a.loaded&&(a.placeholder.style.width=d+"px",a.placeholder.style.height=e+"px"),b.style.width=d+"px",b.style.height=e+"px"}},mc=function(){if(dc.length){for(var a,b=0;b<dc.length;b++)a=dc[b],a.holder.index===a.index&&ic(a.index,a.item,a.baseDiv,a.img,!1,a.clearPlaceholder);dc=[]}};ya("Controller",{publicMethods:{lazyLoadItem:function(a){a=za(a);var b=$b(a);!b||b.loaded||b.loading||(Ca("gettingData",a,b),b.src&&jc(b))},initController:function(){e.extend(i,ec,!0),f.items=Xb=c,$b=f.getItemAt,_b=i.getNumItemsFn,ac=i.loop,_b()<3&&(i.loop=!1),Ba("beforeChange",function(a){var b,c=i.preload,d=null===a?!0:a>0,e=Math.min(c[0],_b()),g=Math.min(c[1],_b());for(b=1;(d?g:e)>=b;b++)f.lazyLoadItem(m+b);for(b=1;(d?e:g)>=b;b++)f.lazyLoadItem(m-b)}),Ba("initialLayout",function(){f.currItem.initialLayout=i.getThumbBoundsFn&&i.getThumbBoundsFn(m)}),Ba("mainScrollAnimComplete",mc),Ba("initialZoomInEnd",mc),Ba("destroy",function(){for(var a,b=0;b<Xb.length;b++)a=Xb[b],a.container&&(a.container=null),a.placeholder&&(a.placeholder=null),a.img&&(a.img=null),a.preloader&&(a.preloader=null),a.loadError&&(a.loaded=a.loadError=!1);dc=null})},getItemAt:function(a){return a>=0&&void 0!==Xb[a]?Xb[a]:!1},allowProgressiveImg:function(){return i.forceProgressiveLoading||!G||i.mouseUsed||screen.width>1200},setContent:function(a,b){i.loop&&(b=za(b));var c=f.getItemAt(a.index);c&&(c.container=null);var d,g=f.getItemAt(b);if(!g)return void(a.el.innerHTML="");Ca("gettingData",b,g),a.index=b,a.item=g;var h=g.container=e.createEl("pswp__zoom-wrap");if(!g.src&&g.html&&(g.html.tagName?h.appendChild(g.html):h.innerHTML=g.html),kc(g),hc(g,pa),!g.src||g.loadError||g.loaded)g.src&&!g.loadError&&(d=e.createEl("pswp__img","img"),d.style.opacity=1,d.src=g.src,lc(g,d),ic(b,g,h,d,!0));else{if(g.loadComplete=function(c){if(j){if(a&&a.index===b){if(kc(c,!0))return c.loadComplete=c.img=null,hc(c,pa),Ha(c),void(a.index===m&&f.updateCurrZoomItem());c.imageAppended?!Zb&&c.placeholder&&(c.placeholder.style.display="none",c.placeholder=null):N.transform&&(ea||Zb)?dc.push({item:c,baseDiv:h,img:c.img,index:b,holder:a,clearPlaceholder:!0}):ic(b,c,h,c.img,ea||Zb,!0)}c.loadComplete=null,c.img=null,Ca("imageLoadComplete",b,c)}},e.features.transform){var k="pswp__img pswp__img--placeholder";k+=g.msrc?"":" pswp__img--placeholder--blank";var l=e.createEl(k,g.msrc?"img":"");g.msrc&&(l.src=g.msrc),lc(g,l),h.appendChild(l),g.placeholder=l}g.loading||jc(g),f.allowProgressiveImg()&&(!Yb&&N.transform?dc.push({item:g,baseDiv:h,img:g.img,index:b,holder:a}):ic(b,g,h,g.img,!0,!0))}Yb||b!==m?Ha(g):(da=h.style,bc(g,d||g.img)),a.el.innerHTML="",a.el.appendChild(h)},cleanSlide:function(a){a.img&&(a.img.onload=a.img.onerror=null),a.loaded=a.loading=a.img=a.imageAppended=!1}}});var nc,oc={},pc=function(a,b,c){var d=document.createEvent("CustomEvent"),e={origEvent:a,target:a.target,releasePoint:b,pointerType:c||"touch"};d.initCustomEvent("pswpTap",!0,!0,e),a.target.dispatchEvent(d)};ya("Tap",{publicMethods:{initTap:function(){Ba("firstTouchStart",f.onTapStart),Ba("touchRelease",f.onTapRelease),Ba("destroy",function(){oc={},nc=null})},onTapStart:function(a){a.length>1&&(clearTimeout(nc),nc=null)},onTapRelease:function(a,b){if(b&&!X&&!V&&!$a){var c=b;if(nc&&(clearTimeout(nc),nc=null,wb(c,oc)))return void Ca("doubleTap",c);if("mouse"===b.type)return void pc(a,b,"mouse");var d=a.target.tagName.toUpperCase();if("BUTTON"===d||e.hasClass(a.target,"pswp__single-tap"))return void pc(a,b);La(oc,c),nc=setTimeout(function(){pc(a,b),nc=null},300)}}}});var qc;ya("DesktopZoom",{publicMethods:{initDesktopZoom:function(){L||(G?Ba("mouseUsed",function(){f.setupDesktopZoom()}):f.setupDesktopZoom(!0))},setupDesktopZoom:function(b){qc={};var c="wheel mousewheel DOMMouseScroll";Ba("bindEvents",function(){e.bind(a,c,f.handleMouseWheel)}),Ba("unbindEvents",function(){qc&&e.unbind(a,c,f.handleMouseWheel)}),f.mouseZoomedIn=!1;var d,g=function(){f.mouseZoomedIn&&(e.removeClass(a,"pswp--zoomed-in"),f.mouseZoomedIn=!1),1>s?e.addClass(a,"pswp--zoom-allowed"):e.removeClass(a,"pswp--zoom-allowed"),h()},h=function(){d&&(e.removeClass(a,"pswp--dragging"),d=!1)};Ba("resize",g),Ba("afterChange",g),Ba("pointerDown",function(){f.mouseZoomedIn&&(d=!0,e.addClass(a,"pswp--dragging"))}),Ba("pointerUp",h),b||g()},handleMouseWheel:function(a){if(s<=f.currItem.fitRatio)return i.modal&&(!i.closeOnScroll||$a||U?a.preventDefault():E&&Math.abs(a.deltaY)>2&&(l=!0,f.close())),!0;if(a.stopPropagation(),qc.x=0,"deltaX"in a)1===a.deltaMode?(qc.x=18*a.deltaX,qc.y=18*a.deltaY):(qc.x=a.deltaX,qc.y=a.deltaY);else if("wheelDelta"in a)a.wheelDeltaX&&(qc.x=-.16*a.wheelDeltaX),a.wheelDeltaY?qc.y=-.16*a.wheelDeltaY:qc.y=-.16*a.wheelDelta;else{if(!("detail"in a))return;qc.y=a.detail}Ra(s,!0);var b=oa.x-qc.x,c=oa.y-qc.y;(i.modal||b<=ca.min.x&&b>=ca.max.x&&c<=ca.min.y&&c>=ca.max.y)&&a.preventDefault(),f.panTo(b,c)},toggleDesktopZoom:function(b){b=b||{x:pa.x/2+ra.x,y:pa.y/2+ra.y};var c=i.getDoubleTapZoom(!0,f.currItem),d=s===c;f.mouseZoomedIn=!d,f.zoomTo(d?f.currItem.initialZoomLevel:c,b,333),e[(d?"remove":"add")+"Class"](a,"pswp--zoomed-in")}}});var rc,sc,tc,uc,vc,wc,xc,yc,zc,Ac,Bc,Cc,Dc={history:!0,galleryUID:1},Ec=function(){return Bc.hash.substring(1)},Fc=function(){rc&&clearTimeout(rc),tc&&clearTimeout(tc)},Gc=function(){var a=Ec(),b={};if(a.length<5)return b;var c,d=a.split("&");for(c=0;c<d.length;c++)if(d[c]){var e=d[c].split("=");e.length<2||(b[e[0]]=e[1])}if(i.galleryPIDs){var f=b.pid;for(b.pid=0,c=0;c<Xb.length;c++)if(Xb[c].pid===f){b.pid=c;break}}else b.pid=parseInt(b.pid,10)-1;return b.pid<0&&(b.pid=0),b},Hc=function(){if(tc&&clearTimeout(tc),$a||U)return void(tc=setTimeout(Hc,500));uc?clearTimeout(sc):uc=!0;var a=m+1,b=$b(m);b.hasOwnProperty("pid")&&(a=b.pid);var c=xc+"&gid="+i.galleryUID+"&pid="+a;yc||-1===Bc.hash.indexOf(c)&&(Ac=!0);var d=Bc.href.split("#")[0]+"#"+c;Cc?"#"+c!==window.location.hash&&history[yc?"replaceState":"pushState"]("",document.title,d):yc?Bc.replace(d):Bc.hash=c,yc=!0,sc=setTimeout(function(){uc=!1},60)};ya("History",{publicMethods:{initHistory:function(){if(e.extend(i,Dc,!0),i.history){Bc=window.location,Ac=!1,zc=!1,yc=!1,xc=Ec(),Cc="pushState"in history,xc.indexOf("gid=")>-1&&(xc=xc.split("&gid=")[0],xc=xc.split("?gid=")[0]),Ba("afterChange",f.updateURL),Ba("unbindEvents",function(){e.unbind(window,"hashchange",f.onHashChange)});var a=function(){wc=!0,zc||(Ac?history.back():xc?Bc.hash=xc:Cc?history.pushState("",document.title,Bc.pathname+Bc.search):Bc.hash=""),Fc()};Ba("unbindEvents",function(){l&&a()}),Ba("destroy",function(){wc||a()}),Ba("firstUpdate",function(){m=Gc().pid});var b=xc.indexOf("pid=");b>-1&&(xc=xc.substring(0,b),"&"===xc.slice(-1)&&(xc=xc.slice(0,-1))),setTimeout(function(){j&&e.bind(window,"hashchange",f.onHashChange)},40)}},onHashChange:function(){return Ec()===xc?(zc=!0,void f.close()):void(uc||(vc=!0,f.goTo(Gc().pid),vc=!1))},updateURL:function(){Fc(),vc||(yc?rc=setTimeout(Hc,800):Hc())}}}),e.extend(f,db)};return a});
/*! PhotoSwipe Default UI - 4.1.0 - 2015-07-11
* http://photoswipe.com
* Copyright (c) 2015 Dmitry Semenov; */
!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.PhotoSwipeUI_Default=b()}(this,function(){"use strict";var a=function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v=this,w=!1,x=!0,y=!0,z={barsSize:{top:44,bottom:"auto"},closeElClasses:["item","caption","zoom-wrap","ui","top-bar"],timeToIdle:4e3,timeToIdleOutside:1e3,loadingIndicatorDelay:1e3,addCaptionHTMLFn:function(a,b){return a.title?(b.children[0].innerHTML=a.title,!0):(b.children[0].innerHTML="",!1)},closeEl:!0,captionEl:!0,fullscreenEl:!0,zoomEl:!0,shareEl:!0,counterEl:!0,arrowEl:!0,preloaderEl:!0,tapToClose:!1,tapToToggleControls:!0,clickToCloseNonZoomable:!0,shareButtons:[{id:"download",label:"Download image",url:"{{raw_image_url}}",download:!0}],getImageURLForShare:function(){return a.currItem.src||""},getPageURLForShare:function(){return window.location.href},getTextForShare:function(){return a.currItem.title||""},indexIndicatorSep:" / "},A=function(a){if(r)return!0;a=a||window.event,q.timeToIdle&&q.mouseUsed&&!k&&K();for(var c,d,e=a.target||a.srcElement,f=e.className,g=0;g<S.length;g++)c=S[g],c.onTap&&f.indexOf("pswp__"+c.name)>-1&&(c.onTap(),d=!0);if(d){a.stopPropagation&&a.stopPropagation(),r=!0;var h=b.features.isOldAndroid?600:30;s=setTimeout(function(){r=!1},h)}},B=function(){return!a.likelyTouchDevice||q.mouseUsed||screen.width>1200},C=function(a,c,d){b[(d?"add":"remove")+"Class"](a,"pswp__"+c)},D=function(){var a=1===q.getNumItemsFn();a!==p&&(C(d,"ui--one-slide",a),p=a)},E=function(){C(i,"share-modal--hidden",y)},F=function(){return y=!y,y?(b.removeClass(i,"pswp__share-modal--fade-in"),setTimeout(function(){y&&E()},300)):(E(),setTimeout(function(){y||b.addClass(i,"pswp__share-modal--fade-in")},30)),y||H(),!1},G=function(b){b=b||window.event;var c=b.target||b.srcElement;return a.shout("shareLinkClick",b,c),c.href?c.hasAttribute("download")?!0:(window.open(c.href,"pswp_share","scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left="+(window.screen?Math.round(screen.width/2-275):100)),y||F(),!1):!1},H=function(){for(var a,b,c,d,e,f="",g=0;g<q.shareButtons.length;g++)a=q.shareButtons[g],c=q.getImageURLForShare(a),d=q.getPageURLForShare(a),e=q.getTextForShare(a),b=a.url.replace("{{url}}",encodeURIComponent(d)).replace("{{image_url}}",encodeURIComponent(c)).replace("{{raw_image_url}}",c).replace("{{text}}",encodeURIComponent(e)),f+='<a href="'+b+'" target="_blank" class="pswp__share--'+a.id+'"'+(a.download?"download":"")+">"+a.label+"</a>",q.parseShareButtonOut&&(f=q.parseShareButtonOut(a,f));i.children[0].innerHTML=f,i.children[0].onclick=G},I=function(a){for(var c=0;c<q.closeElClasses.length;c++)if(b.hasClass(a,"pswp__"+q.closeElClasses[c]))return!0},J=0,K=function(){clearTimeout(u),J=0,k&&v.setIdle(!1)},L=function(a){a=a?a:window.event;var b=a.relatedTarget||a.toElement;b&&"HTML"!==b.nodeName||(clearTimeout(u),u=setTimeout(function(){v.setIdle(!0)},q.timeToIdleOutside))},M=function(){q.fullscreenEl&&(c||(c=v.getFullscreenAPI()),c?(b.bind(document,c.eventK,v.updateFullscreen),v.updateFullscreen(),b.addClass(a.template,"pswp--supports-fs")):b.removeClass(a.template,"pswp--supports-fs"))},N=function(){q.preloaderEl&&(O(!0),l("beforeChange",function(){clearTimeout(o),o=setTimeout(function(){a.currItem&&a.currItem.loading?(!a.allowProgressiveImg()||a.currItem.img&&!a.currItem.img.naturalWidth)&&O(!1):O(!0)},q.loadingIndicatorDelay)}),l("imageLoadComplete",function(b,c){a.currItem===c&&O(!0)}))},O=function(a){n!==a&&(C(m,"preloader--active",!a),n=a)},P=function(a){var c=a.vGap;if(B()){var g=q.barsSize;if(q.captionEl&&"auto"===g.bottom)if(f||(f=b.createEl("pswp__caption pswp__caption--fake"),f.appendChild(b.createEl("pswp__caption__center")),d.insertBefore(f,e),b.addClass(d,"pswp__ui--fit")),q.addCaptionHTMLFn(a,f,!0)){var h=f.clientHeight;c.bottom=parseInt(h,10)||44}else c.bottom=g.top;else c.bottom="auto"===g.bottom?0:g.bottom;c.top=g.top}else c.top=c.bottom=0},Q=function(){q.timeToIdle&&l("mouseUsed",function(){b.bind(document,"mousemove",K),b.bind(document,"mouseout",L),t=setInterval(function(){J++,2===J&&v.setIdle(!0)},q.timeToIdle/2)})},R=function(){l("onVerticalDrag",function(a){x&&.95>a?v.hideControls():!x&&a>=.95&&v.showControls()});var a;l("onPinchClose",function(b){x&&.9>b?(v.hideControls(),a=!0):a&&!x&&b>.9&&v.showControls()}),l("zoomGestureEnded",function(){a=!1,a&&!x&&v.showControls()})},S=[{name:"caption",option:"captionEl",onInit:function(a){e=a}},{name:"share-modal",option:"shareEl",onInit:function(a){i=a},onTap:function(){F()}},{name:"button--share",option:"shareEl",onInit:function(a){h=a},onTap:function(){F()}},{name:"button--zoom",option:"zoomEl",onTap:a.toggleDesktopZoom},{name:"counter",option:"counterEl",onInit:function(a){g=a}},{name:"button--close",option:"closeEl",onTap:a.close},{name:"button--arrow--left",option:"arrowEl",onTap:a.prev},{name:"button--arrow--right",option:"arrowEl",onTap:a.next},{name:"button--fs",option:"fullscreenEl",onTap:function(){c.isFullscreen()?c.exit():c.enter()}},{name:"preloader",option:"preloaderEl",onInit:function(a){m=a}}],T=function(){var a,c,e,f=function(d){if(d)for(var f=d.length,g=0;f>g;g++){a=d[g],c=a.className;for(var h=0;h<S.length;h++)e=S[h],c.indexOf("pswp__"+e.name)>-1&&(q[e.option]?(b.removeClass(a,"pswp__element--disabled"),e.onInit&&e.onInit(a)):b.addClass(a,"pswp__element--disabled"))}};f(d.children);var g=b.getChildByClass(d,"pswp__top-bar");g&&f(g.children)};v.init=function(){b.extend(a.options,z,!0),q=a.options,d=b.getChildByClass(a.scrollWrap,"pswp__ui"),l=a.listen,R(),l("beforeChange",v.update),l("doubleTap",function(b){var c=a.currItem.initialZoomLevel;a.getZoomLevel()!==c?a.zoomTo(c,b,333):a.zoomTo(q.getDoubleTapZoom(!1,a.currItem),b,333)}),l("preventDragEvent",function(a,b,c){var d=a.target||a.srcElement;d&&d.className&&a.type.indexOf("mouse")>-1&&(d.className.indexOf("__caption")>0||/(SMALL|STRONG|EM)/i.test(d.tagName))&&(c.prevent=!1)}),l("bindEvents",function(){b.bind(d,"pswpTap click",A),b.bind(a.scrollWrap,"pswpTap",v.onGlobalTap),a.likelyTouchDevice||b.bind(a.scrollWrap,"mouseover",v.onMouseOver)}),l("unbindEvents",function(){y||F(),t&&clearInterval(t),b.unbind(document,"mouseout",L),b.unbind(document,"mousemove",K),b.unbind(d,"pswpTap click",A),b.unbind(a.scrollWrap,"pswpTap",v.onGlobalTap),b.unbind(a.scrollWrap,"mouseover",v.onMouseOver),c&&(b.unbind(document,c.eventK,v.updateFullscreen),c.isFullscreen()&&(q.hideAnimationDuration=0,c.exit()),c=null)}),l("destroy",function(){q.captionEl&&(f&&d.removeChild(f),b.removeClass(e,"pswp__caption--empty")),i&&(i.children[0].onclick=null),b.removeClass(d,"pswp__ui--over-close"),b.addClass(d,"pswp__ui--hidden"),v.setIdle(!1)}),q.showAnimationDuration||b.removeClass(d,"pswp__ui--hidden"),l("initialZoomIn",function(){q.showAnimationDuration&&b.removeClass(d,"pswp__ui--hidden")}),l("initialZoomOut",function(){b.addClass(d,"pswp__ui--hidden")}),l("parseVerticalMargin",P),T(),q.shareEl&&h&&i&&(y=!0),D(),Q(),M(),N()},v.setIdle=function(a){k=a,C(d,"ui--idle",a)},v.update=function(){x&&a.currItem?(v.updateIndexIndicator(),q.captionEl&&(q.addCaptionHTMLFn(a.currItem,e),C(e,"caption--empty",!a.currItem.title)),w=!0):w=!1,y||F(),D()},v.updateFullscreen=function(d){d&&setTimeout(function(){a.setScrollOffset(0,b.getScrollY())},50),b[(c.isFullscreen()?"add":"remove")+"Class"](a.template,"pswp--fs")},v.updateIndexIndicator=function(){q.counterEl&&(g.innerHTML=a.getCurrentIndex()+1+q.indexIndicatorSep+q.getNumItemsFn())},v.onGlobalTap=function(c){c=c||window.event;var d=c.target||c.srcElement;if(!r)if(c.detail&&"mouse"===c.detail.pointerType){if(I(d))return void a.close();b.hasClass(d,"pswp__img")&&(1===a.getZoomLevel()&&a.getZoomLevel()<=a.currItem.fitRatio?q.clickToCloseNonZoomable&&a.close():a.toggleDesktopZoom(c.detail.releasePoint))}else if(q.tapToToggleControls&&(x?v.hideControls():v.showControls()),q.tapToClose&&(b.hasClass(d,"pswp__img")||I(d)))return void a.close()},v.onMouseOver=function(a){a=a||window.event;var b=a.target||a.srcElement;C(d,"ui--over-close",I(b))},v.hideControls=function(){b.addClass(d,"pswp__ui--hidden"),x=!1},v.showControls=function(){x=!0,w||v.update(),b.removeClass(d,"pswp__ui--hidden")},v.supportsFullscreen=function(){var a=document;return!!(a.exitFullscreen||a.mozCancelFullScreen||a.webkitExitFullscreen||a.msExitFullscreen)},v.getFullscreenAPI=function(){var b,c=document.documentElement,d="fullscreenchange";return c.requestFullscreen?b={enterK:"requestFullscreen",exitK:"exitFullscreen",elementK:"fullscreenElement",eventK:d}:c.mozRequestFullScreen?b={enterK:"mozRequestFullScreen",exitK:"mozCancelFullScreen",elementK:"mozFullScreenElement",eventK:"moz"+d}:c.webkitRequestFullscreen?b={enterK:"webkitRequestFullscreen",exitK:"webkitExitFullscreen",elementK:"webkitFullscreenElement",eventK:"webkit"+d}:c.msRequestFullscreen&&(b={enterK:"msRequestFullscreen",exitK:"msExitFullscreen",elementK:"msFullscreenElement",eventK:"MSFullscreenChange"}),b&&(b.enter=function(){return j=q.closeOnScroll,q.closeOnScroll=!1,"webkitRequestFullscreen"!==this.enterK?a.template[this.enterK]():void a.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)},b.exit=function(){return q.closeOnScroll=j,document[this.exitK]()},b.isFullscreen=function(){return document[this.elementK]}),b}};return a});
var yr_picker = [
	'<div class="yr_picker_header"><div class="yr_picker_close">取消</div> <div class="yr_picker_title">{title}</div> <div class="yr_picker_ok">确定</div></div>',
	'<div class="yr_picker_content">{content}</div>',
].join("");
var slide = '<div class="swiper-slide">{text}</div>';
var yr_picker_swiper = ['<div class="yr_picker_content_after" style="height:{height}px"></div>',
	'<div class="swiper-container" col="{col}">', '<div class="swiper-wrapper">', "{content}", "</div>", "</div>"
].join("");
var picker = function(e) {
	this.version = '0.0.1'; //版本信息
	this.pickerId = "picker"; //唯一id
	this.value = "";
	this.callback = function(e) {};
	this.MD = "1970-01-01"
	this.XD = "2106-01-01"
	this.dvv = new Date()
	this.dom = ".picker"
	this.yi = 0;
	this.mi = 0;
	this.di = 0;
	this.mdy = "";
	this.mdm = "";
	this.mdd = "";
	this.xdy = "";
	this.xdm = "";
	this.xdd = "";
	this.dd = "";
	this.dyy = "";
	this.dmm = "";
	this.ddd = "";
	this.pconfig = {
		title: "请选择",
		cols: 5,
		height: 100 * ($(window).width() / 750),
		swiper: {
			observer: true,
			observeParents: true,
			speed: 0,
			direction: 'vertical',
			height: 0,
			slidesPerView: 0,
			centeredSlides: true,
			// freeMode : true,
			// freeModeSticky : true,
			type: 'date',
			runCallbacksOnInit: false
		}
	}
	if (e.minDate) {
		this.MD = e.minDate
	}
	if (e.maxDate) {
		this.XD = e.maxDate
	}
	if (e.defaultValue) {
		this.dvv = e.defaultValue
	}
	if (e.dom) {
		this.dom = e.dom
	}
	this.getCols = function(config) {
		this.initDate(config.swiper);
		var template = document.createElement("div");
		template.innerHTML = this.getYear(config);
		template.innerHTML += this.getMonth(config, this.dyy);
		template.innerHTML += this.getData(config, this.dyy, this.dmm);
		return template
	};
	this.getYear = function(config) {
		var yearHtml = "";
		var i = this.mdy;
		var j = this.xdy;
		for (var idx = 0; i <= j; i++, idx++) {
			this.yi = i == this.dyy ? idx : this.yi;
			yearHtml += slide.replace("{text}", i)
		}
		var y = yr_picker_swiper.replace("{content}", yearHtml);
		y = y.replace("{height}", config.height);
		y = y.replace("{col}", "year");
		return y
	};
	this.getMonth = function(config, year) {
		var monthHtml = "";
		var m = this.mdm <= 9 ? "0" + this.mdm : this.mdm + "";
		var mm = this.xdm <= 9 ? "0" + this.xdm : this.xdm + "";
		var i = 0;
		for (var idx = 1; idx <= 12; idx++) {
			var ym = idx <= 9 ? "0" + idx : "" + idx;
			if (year + ym >= this.mdy + m && year + ym <= this.xdy + mm) {
				i++;
				this.mi = idx == this.dmm ? i - 1 : this.mi;
				monthHtml += slide.replace("{text}", idx <= 9 ? "0" + idx : idx)
			}
		}
		var m = yr_picker_swiper.replace("{content}", monthHtml);
		m = m.replace("{height}", config.height);
		m = m.replace("{col}", "month");
		return m
	};
	this.getMonth1 = function(config, year) {
		var monthHtml = "";
		var m = this.mdm <= 9 ? "0" + this.mdm : this.mdm + "";
		var mm = this.xdm <= 9 ? "0" + this.xdm : this.xdm + "";
		var i = 0;
		for (var idx = 1; idx <= 12; idx++) {
			var ym = idx <= 9 ? "0" + idx : "" + idx;
			if (year + ym >= this.mdy + m && year + ym <= this.xdy + mm) {
				i++;
				this.mi = idx == this.dmm ? i - 1 : this.mi;
				monthHtml += slide.replace("{text}", idx <= 9 ? "0" + idx : idx)
			}
		}
		return monthHtml
	};
	this.getData = function(config, year, month) {
		var date = new Date(year, month, 0);
		var dayHtml = "";
		var j = 0;
		month = month <= 9 ? "0" + month : month.toString();
		var m = this.mdm <= 9 ? "0" + this.mdm : this.mdm + "";
		var d = this.mdd <= 9 ? "0" + this.mdd : this.mdd + "";
		var mm = this.xdm <= 9 ? "0" + this.xdm : this.xdm + "";
		var dd = this.xdd <= 9 ? "0" + this.xdd : this.xdd + "";
		for (var i = 1; i <= date.getDate(); i++) {
			j++;
			var yi = i <= 9 ? "0" + i : "" + i;
			if (year + month + yi >= this.mdy + m + d && year + month + yi <= this.xdy + mm + dd) {
				this.di = j == this.ddd ? j - 1 : this.di;
				dayHtml += slide.replace("{text}", i <= 9 ? "0" + i : i)
			}
		}
		var m = yr_picker_swiper.replace("{content}", dayHtml);
		m = m.replace("{height}", config.height);
		m = m.replace("{col}", "day");
		return m
	};
	this.getData1 = function(config, year, month) {
		var date = new Date(year, month, 0);
		var dayHtml = "";
		var j = 0;
		month = month <= 9 ? "0" + month : month.toString();
		var m = this.mdm <= 9 ? "0" + this.mdm : this.mdm + "";
		var d = this.mdd <= 9 ? "0" + this.mdd : this.mdd + "";
		var mm = this.xdm <= 9 ? "0" + this.xdm : this.xdm + "";
		var dd = this.xdd <= 9 ? "0" + this.xdd : this.xdd + "";
		for (var i = 1; i <= date.getDate(); i++) {
			j++;
			var yi = i <= 9 ? "0" + i : "" + i;
			if (year + month + yi >= this.mdy + m + d && year + month + yi <= this.xdy + mm + dd) {
				this.di = j == this.ddd ? j - 1 : this.di;
				dayHtml += slide.replace("{text}", i <= 9 ? "0" + i : i)
			}
		}
		return dayHtml
	};
	this.initDate = function(config) {
		this.MD = new Date(this.MD);
		this.mdy = this.MD.getFullYear();
		this.mdm = this.MD.getMonth() + 1;
		this.mdd = this.MD.getDate();
		this.XD = new Date(this.XD);
		this.xdy = this.XD.getFullYear();
		this.xdm = this.XD.getMonth() + 1;
		this.xdd = this.XD.getDate();
		this.dd = new Date(this.dvv) <= this.MD ? this.MD : new Date(this.dvv);
		this.dyy = this.dd.getFullYear();
		this.dmm = this.dd.getMonth() + 1;
		this.ddd = this.dd.getDate()
	};
	this.initDom = function() {
		var _this = this;
		$(".yr_picker_ok,.yr_picker_close").click(function() {});
		$("body").off("click", _this.dom, function() {});
		$("body").off("click", ".yr_picker_close", function() {});
		$("body").off("click", ".yr_picker_ok", function() {});
		$("body").off("click", ".mack", function() {});
		$("body").on("click", _this.dom, function() {
			_this.show()
		});
		$("body").on("click", "." + this.pickerId + " .yr_picker_close", function() {
			_this.hide()
		});
		$("body").on("click", "." + this.pickerId + " .yr_picker_ok", function() {
			_this.select()
		});
		$("body").on("click", ".mack" + this.pickerId, function() {
			_this.hide()
		})
	};
	this.show = function() {
		$(".mack" + this.pickerId).show();
		$("." + this.pickerId).addClass("open")
	};
	this.hide = function() {
		$(".mack" + this.pickerId).hide();
		$("." + this.pickerId).removeClass("open");
		if (!this.value) {
			this.update()
		} else {
			this.dvv = this.value;
			this.update()
		}
	};
	this.change = function(callback) {
		this.callback = callback
	};
	this.select = function() {
		this.value = [$("." + this.pickerId + " div[col = 'year'] .swiper-slide-active").text(), $("." + this.pickerId +
			" div[col = 'month'] .swiper-slide-active").text(), $("." + this.pickerId +
			" div[col = 'day'] .swiper-slide-active").text()];
		this.callback(this.value)
		$(this.dom + "[pickerid = " + this.pickerId + "]").val(this.value.join('/'))
		$(".mack" + this.pickerId).hide();
		$("." + this.pickerId).removeClass("open")
	}
	try {
		var config = this.pconfig;
		this.pickerId = this.pickerId + Math.ceil(Math.random() * 99999) + Math.ceil(Math.random() * 99999);
		var app = document.createDocumentFragment();
		$(this.dom).attr("pickerId", this.pickerId);
		var template = document.createElement('div');
		var mack = document.createElement('div');
		mack.classList = "mack" + this.pickerId + " mack";
		template.classList = "yr_picker " + this.pickerId;
		var html = yr_picker.replace('{title}', config.title);
		html = html.replace('{content}', this.getCols(config).innerHTML)
		template.innerHTML = html;
		app.appendChild(template)
		document.body.appendChild(app);
		document.body.appendChild(mack);
		config.swiper.height = config.height * config.cols;
		config.swiper.slidesPerView = config.cols;
		config.swiper.pickerId = this.pickerId;
		var swiper = config.swiper;
		this.pconfig['YS'] = swiper;
		this.pconfig['MS'] = swiper;
		this.pconfig['DS'] = swiper;
		var YS = new Swiper("." + this.pickerId + " .swiper-container[col=year]", this.pconfig['YS']);
		var MS = new Swiper("." + this.pickerId + " .swiper-container[col=month]", this.pconfig['MS']);
		var DS = new Swiper("." + this.pickerId + " .swiper-container[col=day]", this.pconfig['DS']);
		this.YS = YS;
		this.MS = MS;
		this.DS = DS;
		$("." + this.pickerId + " .swiper-slide").css({
			"line-height": config.height + "px"
		});
		YS.slideTo(this.yi, 0, false);
		MS.slideTo(this.mi, 0, false);
		DS.slideTo(this.di, 0, false);
		var _this = this;
		YS.onTransitionStart = function() {
			setTimeout(function() {
				var y = $("." + _this.pickerId + " .swiper-container[col=year]").find(".swiper-slide-active").text();
				MS.removeAllSlides();
				MS.slideTo(0, 0, false);
				$("." + _this.pickerId + " .swiper-container[col=month] .swiper-wrapper").html(_this.getMonth1(_this, y))
				var m = $("." + _this.pickerId + " .swiper-container[col=month] .swiper-wrapper .swiper-slide").eq(0).text();
				$("." + _this.pickerId + " .swiper-container[col=day] .swiper-wrapper").html(_this.getData1(_this, y, parseInt(
					m)))
				$("." + _this.pickerId + " .swiper-slide").css({
					"line-height": _this.pconfig.height + "px"
				});
			}, 50)
		}
		MS.onTransitionStart = function() {
			setTimeout(function() {
				var y = $("." + _this.pickerId + " .swiper-container[col=year]").find(".swiper-slide-active").text();
				var m = $("." + _this.pickerId + " .swiper-container[col=month] .swiper-wrapper").find(".swiper-slide-active").text();
				$("." + _this.pickerId + " .swiper-container[col=day] .swiper-wrapper").html(_this.getData1(_this, y, parseInt(
					m)))
				$("." + _this.pickerId + " .swiper-slide").css({
					"line-height": _this.pconfig.height + "px"
				});
			}, 50)
		}
		this.initDom();
	} catch (err) {
		console.log(err)
	}
	this.update = function(e) {
		e = typeof e == "object" ? e : {};
		if (e.minDate) {
			this.MD = e.minDate
		}
		if (e.maxDate) {
			this.XD = e.maxDate
		}
		if (e.defaultValue) {
			this.dvv = e.defaultValue
		}
		if (e.dom) {
			this.dom = e.dom
		}
		var obj = $(this.getCols(config));
		$("." + this.pickerId + " .swiper-container[col=year] .swiper-wrapper").html(obj.find(
			".swiper-container[col=year] .swiper-wrapper").html())
		$("." + this.pickerId + " .swiper-container[col=month] .swiper-wrapper").html(obj.find(
			".swiper-container[col=month] .swiper-wrapper").html())
		$("." + this.pickerId + " .swiper-container[col=day] .swiper-wrapper").html(obj.find(
			".swiper-container[col=day] .swiper-wrapper").html())
		$("." + this.pickerId + " .swiper-slide").css({
			"line-height": this.pconfig.height + "px"
		});
		this.YS.slideTo(this.yi, 0, false);
		this.MS.slideTo(this.mi, 0, false);
		this.di = this.di > this.ddd ? this.di : 0
		this.DS.slideTo(this.di, 0, false);
	}
}