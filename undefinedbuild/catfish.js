var catfish=function(){function e(){Enabler.getParameter("varName")&&t(),g(h)}function t(){if(Enabler.getParameter("varName")){var e='var adDiv = document.getElementById("'+Enabler.getParameter("varName")+'.if");';e+="var Parent = adDiv.parentNode;",e+="var Grampa = adDiv.parentNode.parentNode;",e+='adDiv.width = "100%";',e+='adDiv.height = "300px";',e+='adDiv.style.width = "100%";',e+='adDiv.style.bottom = "0px";',e+='adDiv.style.position = "absolute";',e+='adDiv.style.left = "0px";',e+='Parent.style.position = "absolute";',e+='Parent.style.overflow = "hidden";',e+='Parent.style.bottom = "0px";',e+='Parent.style.clip = "rect('+catfish.heightOffset+"px 5200px "+catfish.expandedHeight+'px 0px)";',e+='Parent.width = "100%";',e+='Parent.style.width = "100%";',e+='Grampa.style.position = "fixed";',e+='Grampa.style.bottom = "0px";',e+='Grampa.width = "100%";',e+='Grampa.style.width = "100%";',e+='Grampa.style.clip = "rect('+catfish.heightOffset+"px 5200px "+catfish.expandedHeight+'px 0px)";',Enabler.invokeExternalJsFunction(e)}}function n(){if(Enabler.getParameter("varName")){var e='var adDiv = document.getElementById("'+Enabler.getParameter("varName")+'.if");';e+='var Parent = document.getElementById("'+Enabler.getParameter("varName")+'.if").parentNode;',e+='var Grampa = document.getElementById("'+Enabler.getParameter("varName")+'.if").parentNode.parentNode;',e+='adDiv.width = "100%";',e+='adDiv.style.width = "100%";',e+='adDiv.height = "'+catfish.expandedHeight+'px";',e+='adDiv.style.height = "'+catfish.expandedHeight+'px";',e+='adDiv.style.top = "auto";',e+='Parent.style.height = "'+catfish.expandedHeight+'px";',e+='Parent.style.top = "auto";',e+='Parent.position = "absolute";',e+='Parent.overflow = "hidden";',e+='Parent.style.clip = "rect(0px 5200px '+catfish.expandedHeight+'px 0px)";',e+='Grampa.height = "'+catfish.expandedHeight+'px";',e+='Grampa.style.height = "'+catfish.expandedHeight+'px";',e+='Grampa.style.clip = "rect(0px 5200px '+catfish.expandedHeight+'px 0px)";',Enabler.invokeExternalJsFunction(e)}}function i(e){var t,n=document.createElement("button");return n&&(void 0===typeof d||"null"==typeof d?(t="position:absolute;width:"+v.width+"px;height:"+v.height+"px;top:"+v.offsetY+"px;right:"+v.offsetX+"px;cursor:pointer;",t+="background: url("+v.url+") no-repeat;z-index:9999999;"):(t="position:absolute;z-index:9999999;cursor:pointer;background: url("+v.url+") no-repeat;",t+="width:"+v.width+"px;height:"+v.height+"px;top:"+v.offsetY+"px;right:"+v.offsetX+"px;"),n.setAttribute("id",e.id+"_close_btn"),n.setAttribute("style",t)),n.addEventListener("click",a,!1),e.appendChild(n),n}function a(t){g(E),t.target.parentElement===catfish.expanded&&Enabler.requestFullscreenCollapse(),e(),Enabler.reportManualClose(),Enabler.close()}function o(e){console.log("%c [catfish] "+e,"color:red;")}function s(e){return"undefined"!=typeof e&&"null"!=typeof e||void o(e+" cannot be null or undefined. Make sure to set all 5 catfish parameters.")}function r(e){return parseInt(e)%1===0&&!isNaN(e)||void o(e+" cannot be string. Integer Expected.")}var d,l={},h="CatFish.INIT",p="CatFish.EXPAND_START",u="CatFish.EXPAND_FINISH",f="CatFish.COLLAPSE_START",c="CatFish.COLLAPSE_FINISH",E="CatFish.CLOSE",v={url:"https://goo.gl/Ybf1rm",width:32,height:32,offsetX:5,offsetY:5},g=function(e){var t;if(l.hasOwnProperty(e)){t=t||{},t.currentTarget=catfish;for(var n in l[e])l[e][n](t)}},m=function(e,t){l.hasOwnProperty(e)||(l[e]=[]),l[e].push(t)},x=function(e,t){if(l.hasOwnProperty(e))for(var n in l[e])l[e][n]===t&&l[e].splice(n,1)},b=function(e){return s(e.url)?(v.url=e.url,r(e.width)?(v.width=e.width,r(e.height)?e.height>catfish.collapsedHeight?void o("close button height must fit within collapsed dimensions."):(v.height=e.height,r(e.offsetY)?e.offsetY>catfish.collapsedHeight?void o("close button top margin must fit within collapsed dimensions."):(v.offsetY=e.offsetY,r(e.offsetX)?void(v.offsetX=e.offsetX):void o("Close Button must contain a valid offsetX")):void o("Close Button must contain a valid offsetY")):void o("Close Button must contain a valid width")):void o("Close Button must contain a valid width")):void o("Close button must contain a valid URL")};return{initialize:function(a,r,d,l,h,E,v){void 0!==typeof Enabler?(s(document.getElementById(a))&&(this.element=document.getElementById(a)),s(document.getElementById(r))&&(this.collapsed=document.getElementById(r)),s(document.getElementById(d))&&(this.expanded=document.getElementById(d)),s(l)&&(this.collapsedHeight=parseInt(l)),s(h)&&(this.expandedHeight=parseInt(h)),s(E)&&(this.fixedWidth=parseInt(E)),this.heightOffset=this.expandedHeight-this.collapsedHeight,void 0!==v&&b(v),this.collapsed_close_btn=i(this.collapsed),this.expanded_close_btn=i(this.expanded),Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_START,function(e){g(p),n()},!1),Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_FINISH,function(e){g(u)},!1),Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_START,function(e){g(f)},!1),Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_FINISH,function(e){t(),g(c)},!1),Enabler.addEventListener(studio.events.StudioEvent.EXIT,function(e){t()},!1),e()):o("Enabler missing. Make sure to include the Enabler in your HTML.")},addEventListener:m,removeEventListener:x,INIT:h,EXPAND_START:p,EXPAND_FINISH:u,COLLAPSE_START:f,COLLAPSE_FINISH:c,CLOSE:E,requestExpand:function(){Enabler.requestFullscreenExpand(5e3,this.expandedHeight)},finishExpand:function(){Enabler.finishFullscreenExpand()},requestCollapse:function(){Enabler.requestFullscreenCollapse()},finishCollapse:function(){Enabler.finishFullscreenCollapse()}}}();