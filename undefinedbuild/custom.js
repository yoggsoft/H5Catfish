var container,content,expandConten,bgExit,expandBtn,collapseBtn,closeBtn,isExpanded=!1;init=function(){content=document.getElementById("collapsed_content_dc"),expandConten=document.getElementById("expanded_content_dc"),bgExit=document.getElementById("background_exit_dc"),expandBtn=document.getElementById("expand_btn_dc"),collapseBtn=document.getElementById("collapse_btn_dc"),addListeners(),content.style.display="block"},enablerInitHandler=function(){init(),Enabler.setFloatingPixelDimensions(970,300),catfish.initialize("catfish","collapsed_content_dc","expanded_content_dc",90,300,970)},Enabler.isInitialized()?enablerInitHandler():Enabler.addEventListener(studio.events.StudioEvent.INIT,enablerInitHandler),addListeners=function(){bgExit.addEventListener("click",bgExitHandler,!1),expandBtn.addEventListener("click",expandAdHandler,!1),collapseBtn.addEventListener("click",collapseAdHandler,!1),catfish.addEventListener(catfish.CLOSE,closeHandler,!1),catfish.addEventListener(catfish.COLLAPSE_START,function(){catfish.finishCollapse(),Enabler.stopTimer("Panel_1 Expansion")}),catfish.addEventListener(catfish.COLLAPSE_FINISH,function(){expandConten.style.display="none",content.style.display="block"}),catfish.addEventListener(catfish.EXPAND_START,function(n){catfish.finishExpand(),Enabler.startTimer("Panel_1 Expansion")}),catfish.addEventListener(catfish.EXPAND_FINISH,function(n){expandConten.style.display="block",content.style.display="none",console.log()})},closeHandler=function(){isExpanded&&(Enabler.stopTimer("Panel_1 Expansion"),isExpanded=!1)},bgExitHandler=function(){isExpanded&&(catfish.requestCollapse(),Enabler.stopTimer("Panel_1 Expansion"),isExpanded=!1),Enabler.exit("HTML5_Background_Clickthrough","https://www.google.com")},expandAdHandler=function(n){isExpanded||(catfish.requestExpand(),isExpanded=!0)},collapseAdHandler=function(n){isExpanded&&(catfish.requestCollapse(),isExpanded=!1)};