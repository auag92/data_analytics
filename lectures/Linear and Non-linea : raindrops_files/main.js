function publish_to_wall(e,t){FB.ui({method:"feed",link:e,caption:t,description:"Raindrops ~ Easy way to save your ideas and share.",name:"Check this raindrop on "},function(e){e&&e.post_id&&$("#fb_publish").html("<img id='fb_publogo' src='"+this.model.get("server")+"/assets/images/fb_logo.png'/>Done!")})}var App={Viewer:""};App.Viewer={Models:{},Collections:{},Views:{},Routers:{},init:function(){"use strict";return rd.embed===!0?new App.Viewer.Views.EmbedView:"scroll"===rd.type?new App.Viewer.Views.ScrollView:"slide"===rd.type?new App.Viewer.Views.ScrollView:"study"===rd.type?new App.Viewer.Views.StudyView:"notes"===rd.type?new App.Viewer.Views.ScrollView:void 0}},$(document).ready(function(){document.title=rd.name.substring(0,20).trim()+" : raindrops",$(document).foundation({offcanvas:{open_method:"move",close_on_click:!0}},"abide","reflow","accordion"),App.Viewer.init(),$("base").attr("href",window.location.href)}),App.Viewer.Utils={fitTitle:function(e){var t;t=e?$(e).find("#title-container"):$("#title-container"),t?(t.textfill({maxFontPixels:63,changeLineHeight:!0}),t.find("p").css({visibility:"visible"})):console.log("find")},checkMath:function(){function e(){i.model.set("math",!0)}function t(){window.status="done"}var i=this;MathJax.Hub.Queue(["Typeset",MathJax.Hub,"pages"]),MathJax.Hub.Queue(e),MathJax.Hub.Queue(t)},shareButtons:function(){var e=$("#sharePlugin"),t=$("#shareme"),i=$("#fb_publish"),s={share:{googlePlus:!0,facebook:!0,twitter:!0},buttons:{googlePlus:{size:"medium",annotation:"bubble"},facebook:{size:"medium",layout:"button_count"},twitter:{count:"horizontal"}},urlCurl:"rest/sharrre.php",text:document.title+" by "+this.model.get("user"),enableHover:!1,enableCounter:!1,enableTracking:!1};e.show(),e.data({url:document.location.href}),t.sharrre(s),i.data("link",document.location.href),i.data("caption",document.title+" by "+this.model.get("user")),i.show()},showAuthors:function(e,t){var i=this,s="../../rest/name",n={url:s,type:"GET",data:{users:this.model.get("authors")},dataType:"json"},r=function(s){var n="",r=void 0;for(var o in s)r=s[o],n+='<a target="_blank" class="user username" href="'+o+'"> '+r+"</a>,";n=n.substring(0,n.length-1),$(".author").html(n),e.hide(),t||i.fullScreenOverlay()},o=function(){return e.hide(),!1};return $.ajax(n).success(r).error(o)},fbPublish:function(e){function t(e,t){FB.ui({method:"feed",link:e,caption:t,description:"Raindrops ~ Easy way to save your ideas and share.",name:"Check this raindrop on "},function(e){e&&e.post_id&&$("#fb_publish").html("<img id='fb_publogo' src='"+this.model.get("server")+"/assets/images/fb_logo.png'/>Done!")})}e||(window.fbAsyncInit=function(){FB.init({appId:303281363147508,status:!0,cookie:!0,xfbml:!0})},function(){var e=document.createElement("script");e.async=!0,e.src=document.location.protocol+"//connect.facebook.net/en_US/all.js",document.getElementById("fb-root").appendChild(e)}(),$("#popup_content").on("click","#fb_publish",function(){t($(this).data("link"),$(this).data("caption"))}),$(".main-section").on("click","#fb_publish",function(){t($(this).data("link"),$(this).data("caption"))}))},answerClickHandler:function(e){var t=$(e.currentTarget);$("#ans-"+t.data("id")).css({visibility:"visible",marginTop:0}),t.hide()},fullScreenOverlay:function(){function e(){$(".reveal-modal-bg").height("auto"),$("#fullscreen").foundation("reveal","close")}function t(){e(),$("#open-fullscreen").trigger("click")}this.model.get("fullscreen")&&($("body").scrollTop(0),$("#fullscreen").foundation("reveal","open"),$(".reveal-modal-bg").height($(window).height()),$("span#go-fullscreen").click(t))},openSinglePage:function(e){e.preventDefault(),window.open(this.model.get("server")+"/view?id="+this.model.get("id")+"&view=notes","_self")},openScrollMode:function(e){e.preventDefault(),window.open(this.model.get("server")+"/view?id="+this.model.get("id")+"&view=scroll","_self")},openSlideMode:function(e){e.preventDefault(),window.open(this.model.get("server")+"/view?id="+this.model.get("id")+"&view=slide","_self")},openStudyMode:function(e){e.preventDefault(),window.open(this.model.get("server")+"/view?id="+this.model.get("id")+"&view=study","_self")},openPDF:function(e){e.preventDefault(),"notes"===this.model.get("mode")?window.open(this.model.get("server")+"/print?id="+this.model.get("id")+"&p=1","_blank"):window.open(this.model.get("server")+"/print?id="+this.model.get("id"),"_blank")},hex2rgb:function(e,t){var i,s,n;return e?("#"==e.charAt(0)&&(e=e.substr(1)),6==e.length?(i=e.charAt(0)+e.charAt(1),s=e.charAt(2)+e.charAt(3),n=e.charAt(4)+e.charAt(5)):3==e.length&&(i=e.charAt(0)+"f",s=e.charAt(1)+"f",n=e.charAt(2)+"f"),i=parseInt(i,16),s=parseInt(s,16),n=parseInt(n,16),"none"!==e?"rgba("+i+","+s+","+n+","+t+")":"rgba(0,0,0,0)"):"rgba(0,0,0,0)"}},App.Viewer.Models.raindrop=Backbone.Model.extend({defaults:{currentPage:1,math:!1,fullscreen:!1,frontPage:!0,pages:1,canvasColor:"#000",canvasLineWidth:2,pinPage:void 0},initialize:function(){},changeLike:function(e){var t=this.get("user"),i=this;if(""!==t.trim()){var s={url:"rest/"+t+"/subscriptions",type:"POST",dataType:"json",data:{pid:i.get("id"),collect:!i.get("liked")}},n=function(t){if(0===t.Stat){var s=t.Res.likecount;i.set("likes",s),i.set("liked",!i.get("liked")),e()}return!0},r=function(){return e(),!1};return $.ajax(s).success(n).error(r)}}}),App.Viewer.Views.ShareView=Backbone.View.extend({el:"#popupDialog",setupDOM:function(){this.fb=this.$el.find("#fb_publish"),this.tw=this.$el.find("#tweet_anchor"),this.input=this.$el.find("#popuptext"),this.input.focus(function(){$(this).select()}),this.input.click(function(){$(this).select()})},events:{"click #fb_publish":"publishToFB"},publishToFB:function(){var e=this.data;FB.ui({method:"feed",link:e.link,caption:e.caption,description:"Raindrops ~ Easy way to save your ideas and share.",name:"Check this raindrop on "},function(e){e&&e.post_id&&$("#fb_publish").html("<img id='fb_publogo' src='"+this.model.get("server")+"/assets/images/fb_logo.png'/>Done!")})},openPopup:function(e){this.data=e,this.fb.data("link",e.link),this.fb.data("caption",e.caption),$("#tweet").html(""),$("#tweet").html('<a id="tweet_anchor" data-size="large" data-count="none" data-lang="en" href="https://twitter.com/share" class="twitter-share-button" data-url="'+e.link+'" data-text="'+e.caption+'">Tweet</a>'),this.input.val(e.link),twttr.widgets.load(),$(this.$el).foundation("reveal","open")},initialize:function(e){window.fbAsyncInit=function(){FB.init({appId:303281363147508,status:!0,cookie:!0,xfbml:!0})},function(){var e=document.createElement("script");e.async=!0,e.src=document.location.protocol+"//connect.facebook.net/en_US/all.js",document.getElementById("fb-root").appendChild(e)}(),void 0===window.twttr&&(window.twttr=function(e,t,i){var s,n=e.getElementsByTagName(t)[0];e.getElementById(i)||(s=e.createElement(t),s.id=i,s.src="https://platform.twitter.com/widgets.js",n.parentNode.insertBefore(s,n))}(document,"script","twitter-wjs")),this.vent=e.vent,_.bindAll(this,"openPopup"),this.vent.bind("openPopup",this.openPopup),this.setupDOM()}}),function(e){e.fn.extend({resizeCanvas:function(t,i){var s=e(this)[0];s.width=t,s.height=i}})}(jQuery),App.Viewer.Views.ScrollView=Backbone.View.extend({el:"body",events:{"click #open-embed":"showEmbed","click #backlight":"toggleBackLight","click #open-fullscreen":"goFullscreen","click .menu-icon":"goTop","click input.answer-button":"answerClickHandler","click .popupbutton":"changeEmbed","click #toggle-doodle":"toggleDoodle","click #open-scroll":"openScrollMode","click #open-slide":"openSlideMode","click #open-study":"openStudyMode","click #open-print":"openPDF","click #like":"changeLike","click #share":"shareRaindrop","click #open-notes":"openSinglePage"},shareRaindrop:function(e){e.preventDefault();var t={link:this.model.get("server")+"/view?id="+this.model.get("_id"),caption:this.model.get("name")+" by "+this.model.get("user")};this.vent.trigger("openPopup",t)},goTop:function(){this.$el.scrollTop(0)},toggleBackLight:function(e){e.preventDefault();var t=$(e.currentTarget);t.find("i").toggleClass("on").toggleClass("off"),this.$el.toggleClass("dark"),t.find("span").text(this.$el.hasClass("dark")?"Bright":"Dark")},toggleDoodle:function(e){e.preventDefault(),$(".draw").toggle()},changeLike:function(e){function t(){i.find("i").toggleClass("loading")}var i=this.$el.find("#like");i.find("i").toggleClass("loading"),e.preventDefault(),this.model.changeLike(t)},getEmbedTemplate:function(){var e='<iframe src="{{src}}" width="{{width}}" height="{{height}}" ';e+='allowfullscreen seamless="seamless" frameBorder="0" ></iframe>';var t=this.model.get("server")+"/embed?id="+this.model.get("id");return e=e.replace("{{src}}",t)},changeEmbed:function(e){var t,i=$(e.currentTarget),s=this.getEmbedTemplate(),n=$("#popuptext"),r=$(".popupbutton");switch(r.removeClass("selected"),i.addClass("selected"),i.prop("id")){case"small-embed":t=s.replace("{{width}}",560).replace("{{height}}",315);break;case"medium-embed":t=s.replace("{{width}}",640).replace("{{height}}",360);break;default:t=s.replace("{{width}}",853).replace("{{height}}",480)}return n.val(t),n.select()},showEmbed:function(e){e.preventDefault(),$("#embed").foundation("reveal","open"),setTimeout(function(){return $("#popuptext").select()},500)},goFullscreen:function(e){if(e.preventDefault(),Modernizr.Touch){var t=navigator.userAgent.toLowerCase(),i=t.indexOf("android")>-1;i&&this.fullscreenHandler(!0)}this.fullscreenHandler(!0)},fullscreenHandler:function(e){if("notes"!==this.model.get("mode")){var t=$("#pages").get(0);if(e)this.model.set("currentPage",0);else if(Modernizr.touch)this.model.set("currentPage",0);else if(null!=document.getBoxObjectFor||null!=window.mozInnerScreenX)this.model.set("currentPage",0);else{var i=document.elementFromPoint($(window).width()/2,$(window).height()/2);for(i=$(i);!i.hasClass("slide")&&"BODY"!==i.prop("tagName");)i=i.parent();this.model.set("currentPage",i?$(i).index():0)}this.model.get("myFullscreen")||(this.model.set("myFullscreen",!0),this.model.get("frontPage")||(this.removedPage=$("#filename").clone(!0,!0),this.removedPageHt=$("#filename").height(),$("#filename").remove(),this.model.get("currentPage")>0&&this.model.set("currentPage",this.model.get("currentPage")-1)),this.model.set("pages",$(".slide").length),$(".slide").eq(this.model.get("currentPage")).addClass("current"),screenfull.toggle(t))}},setToFullscreen:function(){function e(){t.model.set("math",!0)}if("notes"!==this.model.get("mode")&&!this.model.get("print")){var t=this;screenfull.isFullscreen&&this.model.get("myFullscreen")?(this.model.get("math")||(MathJax.Hub.Queue(["Reprocess",MathJax.Hub,"pages"]),MathJax.Hub.Queue(e)),this.enterFullScreen()):($(".page-no").show(),$(".page-no").toggleClass("fs"),$(".page-no").show(),this.exitFullScreen())}},enterFullScreen:function(){function e(){$(".slide").eq(a).find(".page-no.fs").toggle()}var t=this;this.model.set("myFullscreen",!0);var i=window.screen.width,s=window.screen.height,n=1,r=0,o=$(".slide").width(),l=$(".slide").height();n=i/s>16/9?s/l:i/o,r=(s-n*l)/2,this.model.get("math")||MathJax.Hub.Queue(["Reprocess",MathJax.Hub,"printarea"]),$(".page-no").toggleClass("fs");var a=t.model.get("currentPage");setTimeout(e,2e3),$(".slide").swipe(this.swipeOptions),this.style.innerHTML="body,body.dark{background:black;}.section{margin:0px;position:absolute;top:0px;left:0px;background:rgba(0,0,0,0);} .page-no{z-index:10000} .left-slide{ display:none}#sharePlugin{display:none} .slide{position:fixed;top:0px;left:0px;} .slide:not(.current){display:none;}  .current{-webkit-transform:scale("+n+","+n+");-o-transform:scale("+n+","+n+");-moz-transform:scale("+n+","+n+");transform:scale("+n+","+n+");margin:0px;position:absolute;top:"+Math.floor(r)+"px; transform-origin: top left}",this.goToPage(this.model.get("currentPage"))},exitFullScreen:function(){this.model.set("myFullscreen",!1),this.style.innerHTML=".current{-webkit-transform:scale(1,1);-o-transform:scale(1,1);-moz-transform:scale(1,1);transform:scale(1,1);}",this.model.get("frontPage")||($(this.removedPage).insertBefore($(".slide").eq(0)),this.model.set("currentPage",this.model.get("currentPage")+1));var e=$(".slide").eq(this.model.get("currentPage")).position(),t=this.removedPageHt;"slide"===this.model.get("mode")?$(window).scrollLeft(e.left+t):$(window).scrollTop(e.top+t)},goToPage:function(e){function t(){$(".slide").eq(e).find(".page-no.fs").toggle()}if(e<this.model.get("pages")){$(".slide").removeClass("current"),$(".slide").eq(e).addClass("current").fadeIn();var i=$(".slide").eq(e).find(".page-no.fs");i.is(":visible")?setTimeout(t,1e3):(t(),setTimeout(t,1e3)),this.model.get("frontPage")&&0===e&&this.fitTitle($("#filename")),this.model.set("currentPage",e)}},keyHandler:function(e){switch(e.which){case 13:if(e.ctrlKey||e.metaKey){if($("#fullscreen").is(":visible"))return;if(!this.model.get("myFullscreen"))return this.fullscreenHandler()}break;case 35:if(screenfull.isFullscreen)return this.goToPage(this.model.get("pages")-1);break;case 36:if(screenfull.isFullscreen)return this.goToPage(0);break;case 37:if(screenfull.isFullscreen&&this.model.get("currentPage")>0)return this.goToPage(this.model.get("currentPage")-1);break;case 39:case 32:if(screenfull.isFullscreen)return e.preventDefault(),this.model.get("currentPage")+1===this.model.get("pages")?screenfull.toggle($("#pages")[0]):this.goToPage(this.model.get("currentPage")+1);break;case 38:if(screenfull.isFullscreen&&e.metaKey)return this.goToPage(0);break;case 40:if(screenfull.isFullscreen&&e.metaKey)return this.goToPage(this.model.get("pages")-1);break;case 68:$("#toggle-doodle").trigger("click")}},drawCanvas:function(){function e(e){var t=e.canvas.height,i=e.canvas.width;e.clearRect(0,0,i,t)}function t(e,t){return this.color=e,this.linewidth=t,this.points=[],this}function i(e,t){return{x:(e.x+t.x)/2,y:(e.y+t.y)/2}}function s(e,t){var i={};if(i.x=e.pageX-t.left,i.y=e.pageY-t.top,l.model.get("myFullscreen")){var s=document.querySelector(".current"),n=s.getBoundingClientRect().width/s.offsetWidth;isNaN(n)||(i.x/=n,i.y/=n)}return i}function n(e,t){var s,n,r,o;if(t.lineWidth=e.linewidth,t.lineJoin="round",t.lineCap="round",t.strokeStyle=e.color,t.beginPath(),o=e.getPoints(),o.length&&o[0]&&o[1]){for(n=0,to$=o.length-2;n<=to$;++n)s=n,r=i(o[s],o[s+1]),t.quadraticCurveTo(o[s].x,o[s].y,r.x,r.y);t.stroke()}}function r(e,t){for(var i=0,s=e.length;s>i;i++)n(e[i],t)}function o(i){var o=$(i).find(".base"),a=$(i).find(".overlay"),c=o[0].getContext("2d"),d=a[0].getContext("2d"),h=!1,u={},g=new Array,p={x:null,y:null},f={x:null,y:null};return a.on("touchstart mousedown",function(e){h=!0,$(".draw.overlay").removeClass("active"),$(this).addClass("active"),f=$(this).parent().offset(),"touchstart"===e.type&&(e=e.originalEvent.touches[0]),p=s(e,f),u=new t(l.model.get("canvasColor"),l.model.get("canvasLineWidth"))}),a.on("touchmove mousemove",function(t){t.stopPropagation(),t.preventDefault(),h&&("touchstart"===t.type&&(t=t.originalEvent.touches[0]),p=s(t,f),u.pushPoint(p),e(d),n(u,d))}),a.on("touchend mouseup",function(t){t.stopPropagation(),t.preventDefault(),h&&(h=!1,g.push(u),e(d),e(c),r(g,c))}),a.on("mouseleave",function(){h&&(h=!1,g.push(u),e(d),e(c),r(g,c))}),$(document).keydown(function(t){switch(t.stopPropagation(),t.which){case 67:e(d),e(c),g=new Array,r(g,c);break;case 87:l.model.set("canvasColor",l.hex2rgb("#ffcc00",1)),l.model.set("canvasLineWidth",2);break;case 89:l.model.set("canvasColor",l.hex2rgb("#ffcc00",.5)),l.model.set("canvasLineWidth",21);break;case 79:l.model.set("canvasColor",l.hex2rgb("#ff9900",.5)),l.model.set("canvasLineWidth",21);break;case 82:l.model.set("canvasColor",l.hex2rgb("#ff0000",1)),l.model.set("canvasLineWidth",8);break;case 66:t.shiftKey?(l.model.set("canvasColor",l.hex2rgb("#0000ff",1)),l.model.set("canvasLineWidth",2)):(l.model.set("canvasColor",l.hex2rgb("#000000",1)),l.model.set("canvasLineWidth",2));break;case 77:l.model.set("canvasColor",l.hex2rgb("#ff00ff",1)),l.model.set("canvasLineWidth",2);break;case 71:l.model.set("canvasColor",l.hex2rgb("#2c6700",.5)),l.model.set("canvasLineWidth",21)}}),this}var l=this;t.prototype={pushPoint:function(e){return this.points.push(e)},getPoints:function(){return this.points}},$.each($(".slide").has(".draw"),function(e,t){new o($(t))})},resizecanvas:function(){$.each($(".draw"),function(e,t){$(t).resizeCanvas($(".slide").width(),$(".slide").height())})},toggleLike:function(){var e=this.$el.find("#like");this.model.get("liked")?(e.find("i").removeClass("icon-star-empty").addClass("icon-star"),e.find("span").text("Unlike")):(e.find("i").addClass("icon-star-empty").removeClass("icon-star"),e.find("span").text("Like")),$("span#likes").text(this.model.get("likes"))},initialize:function(){this.model=new App.Viewer.Models.raindrop,this.model.set("frontPage",!0),this.model.set("myFullscreen",!1),this.model.set("liked",1===rd.liked?!0:!1),this.model.set("fullscreen",1===rd.fs?!0:!1),this.model.set("user",rd.user),this.model.set("id",rd.id),this.model.set("server",rd.server),this.model.set("mode",rd.type),this.model.set("likes",rd.likes),this.model.set("name",rd.name),this.model.set("author",rd.author),this.model.set("print",rd.print);var e=_.extend({},Backbone.Events);this.vent=e,this.removedPage="",this.listenTo(this.model,"change:liked",this.toggleLike),"notes"===this.model.get("mode")||this.model.get("print")||(this.swipeOptions={allowPageScroll:"vertical",swipe:function(e,i){var s,n;if(s=$(this),s.hasClass("current"))if("left"===i){if(screenfull.isFullscreen)return n=jQuery(".all_pages"),t.model.get("currentPage")+1===t.model.get("pages")?(t.model.set("currentPage",0),screenfull.toggle(n[0])):t.goToPage(t.model.get("currentPage")+1)}else{if("right"!==i)return!0;if(screenfull.isFullscreen&&t.model.get("currentPage")>0)return t.goToPage(t.model.get("currentPage")-1)}},threshold:0});var t=this;this.style=document.createElement("style"),document.head.appendChild(this.style),this.fitTitle($("#filename")),this.checkMath(),this.model.get("print")||(new App.Viewer.Views.ShareView({model:this.model,vent:this.vent}),_.bindAll(this,"keyHandler"),$(document).bind("keydown",this.keyHandler),this.shareButtons(),this.fbPublish(!1),this.toggleLike(),$("#popuptext").val(this.getEmbedTemplate().replace("{{width}}",560).replace("{{height}}",315))),"notes"===this.model.get("mode")||this.model.get("print")||(this.resizecanvas(),this.drawCanvas()),screenfull.onchange=function(){t.setToFullscreen()},$(window).on("orientationchange",function(){screenfull.isFullscreen&&setTimeout(function(){t.enterFullScreen()},500)}),$(window).resize(function(){t.fitTitle($("#filename"))}),$(window).on("orientationchange resize",function(){t.checkMath()}),$("#banner").hide()}}),_.extend(App.Viewer.Views.ScrollView.prototype,App.Viewer.Utils),App.Viewer.Views.EmbedView=Backbone.View.extend({el:"body",events:{"click #slide-prev":"prevPage","click #slide-next":"nextPage","click #open-fullscreen":"goFullscreen"},prevPage:function(){this.showPage(this.model.get("currentPage")-1)},nextPage:function(){this.showPage(this.model.get("currentPage")+1)},goFullscreen:function(e){if(e.preventDefault(),Modernizr.Touch){var t=navigator.userAgent.toLowerCase(),i=t.indexOf("android")>-1;i&&this.fullscreenHandler(!0)}this.fullscreenHandler(!0)},setToFullscreen:function(){function e(){t.model.set("math",!0)}var t=this;screenfull.isFullscreen&&this.model.get("myFullscreen")?(this.model.get("math")||(MathJax.Hub.Queue(["Reprocess",MathJax.Hub,"pages"]),MathJax.Hub.Queue(e)),this.enterFullScreen()):this.exitFullScreen()},fullscreenHandler:function(){this.model.get("myFullscreen")||(this.model.set("myFullscreen",!0),screenfull.toggle($("#current")[0]))},enterFullScreen:function(){this.model.set("myFullscreen",!0);{var e=window.screen.width,t=window.screen.height,i=1,s=0;$("#current").width(),$("#current").height()}$("#current").toggleClass("border"),i=e/t>16/9?t/396:e/704,s=(t-396*i)/2,this.model.get("math")||MathJax.Hub.Queue(["Reprocess",MathJax.Hub,"pages"]),$(".page").swipe(this.swipeOptions),this.style.innerHTML="body,body.dark{background:black;}.section{margin:0px;position:absolute;top:0px;left:0px;background:rgba(0,0,0,0);} .page-no{z-index:10000} .left-slide{ display:none}#sharePlugin{display:none} .slide{position:fixed;top:0px;left:0px;} .slide:not(.current){display:none;}  #current{-webkit-transform:scale("+i+","+i+");-o-transform:scale("+i+","+i+");-moz-transform:scale("+i+","+i+");transform:scale("+i+","+i+");margin:0px;position:absolute;top:"+Math.floor(s)+"px; transform-origin: top left;z-index:999;}",this.scaler(i)},exitFullScreen:function(){this.model.set("myFullscreen",!1),this.style.innerHTML=".current{-webkit-transform:scale(1,1);-o-transform:scale(1,1);-moz-transform:scale(1,1);transform:scale(1,1);}",this.scaler(this.ratio)},showPage:function(e){function t(e,t){screenfull.isFullscreen?t.html(e):t.hide().html(e).fadeIn()}0>e||e>this.pages.length||(t($(".page").eq(e).html(),this.current.find("div")),0===e?(this.prevSlide.prop("disabled",!0),this.prevSlide.addClass("disabled")):(this.prevSlide.prop("disabled",!1),this.prevSlide.removeClass("disabled")),3>e&&(this.fitTitle(this.prev1),this.fitTitle(this.prev2),this.fitTitle(this.current)),e===this.model.get("pages")-1?(this.nextSlide.prop("disabled",!0),this.nextSlide.addClass("disabled")):(this.nextSlide.prop("disabled",!1),this.nextSlide.removeClass("disabled")),this.model.set("currentPage",e),this.current=this.$el.find("#current"))},scaler:function(e){this.current.css("-webkit-transform","scale("+e+")"),this.current.css("-moz-transform","scale("+e+")"),this.current.css("-ms-transform","scale("+e+")"),this.current.css("-o-transform","scale("+e+")"),this.current.css("transform","scale("+e+")")},keyHandler:function(e){switch(e.which){case 13:if(e.ctrlKey||e.metaKey){if($("#fullscreen").is(":visible"))return;if(!this.model.get("myFullscreen"))return this.fullscreenHandler()}break;case 35:return this.showPage(this.model.get("pages")-1);case 36:return this.showPage(0);case 37:if(this.model.get("currentPage")>0)return this.showPage(this.model.get("currentPage")-1);break;case 39:case 32:if(e.preventDefault(),this.model.get("currentPage")<this.model.get("pages")-1)return this.showPage(this.model.get("currentPage")+1);if(this.model.get("myFullscreen"))return screenfull.toggle($("#current")[0]);break;case 38:if(e.metaKey)return this.showPage(0);break;case 40:if(e.metaKey)return this.showPage(this.model.get("pages")-1)}},initialize:function(){this.model=new App.Viewer.Models.raindrop,this.model.set("fullscreen",1===rd.fs?!0:!1),this.model.set("frontPage",1===rd.fp?!0:!1),this.model.set("myFullscreen",!1),this.model.set("id",rd.id),this.model.set("server",rd.server),this.model.set("mode",rd.type),this.model.set("embed",rd.embed),this.removedPage="",this.swipeOptions={allowPageScroll:"vertical",swipe:function(t,i){var s,n;if(s=$(this),s.hasClass("current"))if("left"===i){if(screenfull.isFullscreen)return n=jQuery(".all_pages"),e.model.get("currentPage")+1===e.model.get("pages")?(e.model.set("currentPage",0),screenfull.toggle(n[0])):e.goToPage(e.model.get("currentPage")+1)}else{if("right"!==i)return!0;if(screenfull.isFullscreen&&e.model.get("currentPage")>0)return e.goToPage(e.model.get("currentPage")-1)}},threshold:0};var e=this;this.style=document.createElement("style"),document.head.appendChild(this.style),_.bindAll(this,"keyHandler"),$(document).bind("keydown",this.keyHandler),this.checkMath(),screenfull.onchange=function(){e.setToFullscreen()},$(window).on("orientationchange",function(){screenfull.isFullscreen&&setTimeout(function(){e.enterFullScreen()},500)}),$(window).on("orientationchange resize",function(){e.checkMath()}),this.pages=$(".page"),this.model.set("pages",this.pages.length),this.current=this.$el.find("#current"),this.prevSlide=this.$el.find("#slide-prev"),this.nextSlide=this.$el.find("#slide-next"),this.showPage(0),"notes"===this.model.get("mode")&&(this.current.css("height","auto"),this.prevSlide.hide(),this.nextSlide.hide(),$("#open-fullscreen").hide());var t=$(window).width(),i=9*t/16;window.resizeTo(t,i),i=9*t/16,this.ratio=t/704,$("#banner").hide(),this.scaler(this.ratio)}}),_.extend(App.Viewer.Views.EmbedView.prototype,App.Viewer.Utils),App.Viewer.Views.StudyView=Backbone.View.extend({el:"body",events:{"click #slide-prev":"prevPage","click #slide-next":"nextPage","click #slide-num":"goPage","keypress #current-page-number":"goToPage","blur #current-page-number":"blurPageNo","click #backlight":"toggleBackLight","click #open-fullscreen":"goFullscreen","click #scroll":"openScrollMode","click .bm":"swapBookmark"},bookmarkPage:function(e){if(e=parseInt(e),!isNaN(e)&&!(e>2||1>e)){var t="";1===e?t=$("#bm1"):2===e&&(t=$("#bm2"));var i=this.model.get("currentPage");t.data("page",i),t.html($(".page").eq(i).html())}},swapBookmark:function(e){var t=$(e.currentTarget),i=t.data("page");i&&(t.html($(".page").eq(this.model.get("currentPage")).html()),t.data("page",this.model.get("currentPage")),this.showPage(i))},toggleBackLight:function(e){e.preventDefault();var t=$(e.currentTarget);t.toggleClass("on").toggleClass("off"),this.$el.toggleClass("dark")},prevPage:function(){this.showPage(this.model.get("currentPage")-1)},nextPage:function(){this.showPage(this.model.get("currentPage")+1)},goToPage:function(e){var t=$(e.currentTarget);if(t.prop("contenteditable")&&13===e.which){e.preventDefault(),t.prop("contenteditable",!1);var i=parseInt(t.html());if(isNaN(i))return this.showPage(this.model.get("currentPage"));if(i>this.pages.length-1)return this.showPage(this.model.get("currentPage"));if(i!==this.model.get("currentPage"))return this.showPage(i)}},blurPageNo:function(e){var t=$(e.currentTarget);if(e.stopPropagation(),t.prop("contenteditable")){t.prop("contenteditable",!1);var i=parseInt(t.html());return isNaN(i)?this.showPage(this.model.get("currentPage")):i>this.pages.length-1?this.showPage(this.model.get("currentPage")):i!==this.model.get("currentPage")?this.showPage(i):void 0}},goPage:function(){this.currentPageSpan.prop("contenteditable",!0),this.currentPageSpan.focus(),this.currentPageSpan.select()},goFullscreen:function(e){if(e.preventDefault(),Modernizr.Touch){var t=navigator.userAgent.toLowerCase(),i=t.indexOf("android")>-1;i&&this.fullscreenHandler(!0)}this.fullscreenHandler(!0)},setToFullscreen:function(){function e(){t.model.set("math",!0)}var t=this;screenfull.isFullscreen&&this.model.get("myFullscreen")?(this.model.get("math")||(MathJax.Hub.Queue(["Reprocess",MathJax.Hub,"pages"]),MathJax.Hub.Queue(e)),this.enterFullScreen()):this.exitFullScreen()},fullscreenHandler:function(){this.model.get("myFullscreen")||(this.model.set("myFullscreen",!0),screenfull.toggle($("#current")[0]))},enterFullScreen:function(){this.model.set("myFullscreen",!0);var e=window.screen.width,t=window.screen.height,i=1,s=0,n=$("#current").width(),r=$("#current").height();$("#current").toggleClass("border"),i=e/t>16/9?t/r:e/n,s=(t-i*r)/2,this.model.get("math")||MathJax.Hub.Queue(["Reprocess",MathJax.Hub,"pages"]),$(".page").swipe(this.swipeOptions),this.style.innerHTML="body,body.dark{background:black;}.section{margin:0px;position:absolute;top:0px;left:0px;background:rgba(0,0,0,0);} .page-no{z-index:10000} .left-slide{ display:none}#sharePlugin{display:none} .slide{position:fixed;top:0px;left:0px;} .slide:not(.current){display:none;}  #current{-webkit-transform:scale("+i+","+i+");-o-transform:scale("+i+","+i+");-moz-transform:scale("+i+","+i+");transform:scale("+i+","+i+");margin:0px;position:absolute;top:"+Math.floor(s)+"px; transform-origin: top left;}#pages #current{padding:0}",this.goToPage(this.model.get("currentPage"))},exitFullScreen:function(){this.model.set("myFullscreen",!1),$("#current").toggleClass("border"),this.style.innerHTML=".current{-webkit-transform:scale(1,1);-o-transform:scale(1,1);-moz-transform:scale(1,1);transform:scale(1,1);}"},showPage:function(e){function t(e,t){screenfull.isFullscreen?t.html(e):t.hide().html(e).fadeIn()}0>e||e>this.pages.length||(e>0?t($(".page").eq(e-1).html(),this.prev2):t("",this.prev2),e>1?t($(".page").eq(e-2).html(),this.prev1):t("",this.prev1),t($(".page").eq(e).html(),this.current.find("div")),0===e?(this.prevSlide.prop("disabled",!0),this.prevSlide.addClass("disabled")):(this.prevSlide.prop("disabled",!1),this.prevSlide.removeClass("disabled")),3>e&&(this.fitTitle(this.prev1),this.fitTitle(this.prev2),this.fitTitle(this.current)),e===this.model.get("pages")-1?(this.nextSlide.prop("disabled",!0),this.nextSlide.addClass("disabled")):(this.nextSlide.prop("disabled",!1),this.nextSlide.removeClass("disabled")),this.model.set("currentPage",e),this.currentPageSpan.text(e))},pinPage:function(){this.model.get("pinPage")?(this.showPage(this.model.get("pinPage")),this.model.set("pinPage",void 0),$("#pin").hide()):(this.model.set("pinPage",this.model.get("currentPage")),$("#pin").show())},keyHandler:function(e){switch(e.which){case 13:if(e.ctrlKey||e.metaKey){if($("#fullscreen").is(":visible"))return;if(!this.model.get("myFullscreen"))return this.fullscreenHandler()}break;case 35:return this.showPage(this.model.get("pages")-1);case 36:return this.showPage(0);case 37:if(this.model.get("currentPage")>0)return this.showPage(this.model.get("currentPage")-1);break;case 39:case 32:if(e.preventDefault(),this.model.get("currentPage")<this.model.get("pages")-1)return this.showPage(this.model.get("currentPage")+1);if(this.model.get("myFullscreen"))return screenfull.toggle($("#current")[0]);break;case 38:if(e.metaKey)return this.showPage(0);break;case 40:if(e.metaKey)return this.showPage(this.model.get("pages")-1);break;case 49:return e.ctrlKey?this.bookmarkPage(1):!0;case 50:return e.ctrlKey?this.bookmarkPage(2):!0;case 80:return this.pinPage()}},initialize:function(){this.model=new App.Viewer.Models.raindrop,this.model.set("fullscreen",1===rd.fs?!0:!1),this.model.set("frontPage",1===rd.fp?!0:!1),this.model.set("myFullscreen",!1),this.model.set("authors",rd.authors),this.model.set("id",rd.id),this.model.set("server",rd.server),this.model.set("mode",rd.type),this.removedPage="",this.swipeOptions={allowPageScroll:"vertical",swipe:function(t,i){var s,n;if(s=$(this),s.hasClass("current"))if("left"===i){if(screenfull.isFullscreen)return n=jQuery(".all_pages"),e.model.get("currentPage")+1===e.model.get("pages")?(e.model.set("currentPage",0),screenfull.toggle(n[0])):e.goToPage(e.model.get("currentPage")+1)}else{if("right"!==i)return!0;if(screenfull.isFullscreen&&e.model.get("currentPage")>0)return e.goToPage(e.model.get("currentPage")-1)}},threshold:0};var e=this;this.style=document.createElement("style"),document.head.appendChild(this.style),_.bindAll(this,"keyHandler"),$(document).bind("keydown",this.keyHandler),this.checkMath(),this.shareButtons(),this.fbPublish(),screenfull.onchange=function(){e.setToFullscreen()},$(window).on("orientationchange",function(){screenfull.isFullscreen&&setTimeout(function(){e.enterFullScreen()},500)}),$(window).on("orientationchange resize",function(){e.checkMath()}),this.pages=$(".page"),this.model.set("pages",this.pages.length),this.listenTo(this.model,"change:currentPage",this.changePageNo),this.current=this.$el.find("#current"),this.prev1=this.$el.find("#prev1"),this.prev2=this.$el.find("#prev2"),this.prevSlide=this.$el.find("#slide-prev"),this.nextSlide=this.$el.find("#slide-next"),this.totalPageSpan=this.$el.find("#total-page-number"),this.currentPageSpan=this.$el.find("#current-page-number"),this.currentPageSpan.text(0),this.totalPageSpan.text(this.pages.length-1),this.showPage(0),$("#help").click(function(){var e,t;e=$(".subhelp"),e.slideDown(500),0!==$("#help:hover").length?$(this).on("mouseleave",function(){e.slideUp(500,function(){$(this).on("mouseenter",!0)})}):(t=function(){e.slideUp(500,function(){$(this).on("mouseenter",!0)})},self.setTimeout(t,600))}),$("#banner").hide()},changePageNo:function(){this.currentPageSpan.text(this.model.get("currentPage"))
}}),_.extend(App.Viewer.Views.StudyView.prototype,App.Viewer.Utils);