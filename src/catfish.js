/* Catfish format */
var catfish = (function(){
	//  private
	var version = 'v1';
	var debug = true;
	var hasCollapsed = false;
	var hasExpanded = false;

	// required for initialize:

	var element = null;
	var collapsed = null;
	var expanded = null;
	var collapsedHeight = null;
	var expandedHeight = null;
	var minimumWidth = null;
	var fixedWidth = false;
	var heightOffset = null;
	var collapsed_close_btn = "";
	var expanded_close_btn = "";
	var closeButtonOffsetTop = 5;
	var closeButtonOffsetRight = 5;
	var isReady = false;
	var events = {};
	var fixedWidth = false;
	var closeButtonStringLang = 'en';
	var _roundCloseButton = false;
	var btn_asset;

	// Events
	var _I 	= 'CatFish.INIT';
	var _E_S = 'CatFish.EXPAND_START';
	var _E_F = 'CatFish.EXPAND_FINISH';
	var _C_S = 'CatFish.COLLAPSE_START';
	var _C_F = 'CatFish.COLLAPSE_FINISH';
	var _C = 'CatFish.CLOSE';


	var closeButton =
	{
		url:'https://goo.gl/Ybf1rm',
		width : 32,
		height : 32,
		offsetX:5,
		offsetY:5
	};

	/* private methods*/
	function setFloorDivs()/* catfish initial setup function*/
	{
		if (Enabler.getParameter('varName')){
			collapse();
		}
		dispatch(_I);
	}

	function topResizeHandler()
	{
		var command  = 'document.getElementById("'+Enabler.getParameter("varName")+'.if").parentNode.parentNode.style.top = auto;';
		Enabler.invokeExternalJsFunction(command);
	}

	function collapse()/* catfish native collapse function*/
	{
		if (Enabler.getParameter('varName'))
		{
			/*log('COLLAPSE_FUNCTION');*/
			var command  = 'var adDiv = document.getElementById("'+Enabler.getParameter("varName")+'.if");';
				command += 'var Parent = adDiv.parentNode;'
				command += 'var Grampa = adDiv.parentNode.parentNode;'
				/* 100% iframe */
				command += 'adDiv.width = "100%";';
				command += 'adDiv.height = "300px";';
				command += 'adDiv.style.width = "100%";';
				command += 'adDiv.style.bottom = "0px";';
				command += 'adDiv.style.position = "absolute";';
				command += 'adDiv.style.left = "0px";';
				// command += 'var adDiv_style = "border:0px; vertical-align:bottom;width:100%;height:300px;bottom:0px;position:absolute;left:0px;";';
				// command += 'adDiv.setAttribute("style",adDiv_style);';
				/* Style Parent Div Creative Layers*/
				command += 'Parent.style.position = "absolute";';
				command += 'Parent.style.overflow = "hidden";';
				command += 'Parent.style.bottom = "0px";';
				command += 'Parent.style.clip = "rect('+catfish.heightOffset+'px 5200px '+catfish.expandedHeight+'px 0px)";';
				command += 'Parent.width = "100%";';
				command += 'Parent.style.width = "100%";';
				// command += 'var Parent_style = "position:absolute; box-sizing:content-box; width:100%; height:300px; overflow:hidden; bottom:0px; clip:rect('+catfish.heightOffset+'px 5200px '+catfish.expandedHeight+'px 0px); top:auto;";';
				// command += 'Parent.setAttribute("style",Parent_style);';
				/* Style Grampa Div */
				command += 'Grampa.style.position = "fixed";';
				command += 'Grampa.style.bottom = "0px";';
				command += 'Grampa.width = "100%";';
				command += 'Grampa.style.width = "100%";';
				command += 'Grampa.style.clip = "rect('+catfish.heightOffset+'px 5200px '+catfish.expandedHeight+'px 0px)";';
				// command += 'var Grampa_style = "width:100%;height:300px;z-index:1000000;position:fixed;left:0;display:block;bottom:0px;clip:rect('+catfish.heightOffset+'px 5200px '+catfish.expandedHeight+'px 0px);-webkit-backface-visibility: hidden;-moz-backface-visibility: hidden;-ms-backface-visibility: hidden;backface-visibility: hidden;";';
				// command += 'Grampa.setAttribute("style",Grampa_style);';
			Enabler.invokeExternalJsFunction(command);
		}
	}

	function expand()/* catfish native expand function */
	{
		if (Enabler.getParameter('varName'))
		{
			/*log('EXPAND_FUNCTION');*/
			var command  = 'var adDiv = document.getElementById("'+Enabler.getParameter("varName")+'.if");';
				command += 'var Parent = document.getElementById("'+Enabler.getParameter("varName")+'.if").parentNode;'
				command += 'var Grampa = document.getElementById("'+Enabler.getParameter("varName")+'.if").parentNode.parentNode;'
				/* 100% iframe */
				command += 'adDiv.width = "100%";';
				command += 'adDiv.style.width = "100%";';
				command += 'adDiv.height = "'+catfish.expandedHeight+'px";';
				command += 'adDiv.style.height = "'+catfish.expandedHeight+'px";';
				command += 'adDiv.style.top = "auto";';
				//command += 'adDiv.style.-webkit-backface-visibility = "hidden";';
				/* Style Parent Div */
				command += 'Parent.style.height = "'+catfish.expandedHeight+'px";';
				command += 'Parent.style.top = "auto";';
				command += 'Parent.position = "absolute";';
				command += 'Parent.overflow = "hidden";';
				command += 'Parent.style.clip = "rect(0px 5200px '+catfish.expandedHeight+'px 0px)";';
				//command += 'Parent.style.-webkit-backface-visibility = "hidden";';
				/* Style Grampa Div */
				command += 'Grampa.height = "'+catfish.expandedHeight+'px";';
				command += 'Grampa.style.height = "'+catfish.expandedHeight+'px";';
				command += 'Grampa.style.clip = "rect(0px 5200px '+catfish.expandedHeight+'px 0px)";';
				//command += 'Grampa.style.-webkit-backface-visibility = "hidden";';
			Enabler.invokeExternalJsFunction(command);
		}
	}

	function appendCloseButtonTo(key)/* Attah close button in collapsed and expanded panel */
	{
		var cb = document.createElement('button');
		var style;
		if (cb)
		{

			if (typeof btn_asset === undefined || typeof btn_asset === 'null')
			{
				/*round close button used */
				style = 'position:absolute;width:'+closeButton.width+'px;height:'+closeButton.height+'px;top:'+closeButton.offsetY+'px;right:'+closeButton.offsetX+'px;cursor:pointer;';
				style+= 'background: url('+closeButton.url+') no-repeat;z-index:9999999;';
			}else{
				/* custom close button used */
				style = 'position:absolute;z-index:9999999;cursor:pointer;background: url('+closeButton.url+') no-repeat;';
				style+= 'width:'+closeButton.width+'px;height:'+closeButton.height+'px;top:'+closeButton.offsetY+'px;right:'+closeButton.offsetX+'px;';
			}
			cb.setAttribute("id",key.id+"_close_btn");
			cb.setAttribute("style",style);
		}
		cb.addEventListener('click',catfish_close,false);
		key.appendChild(cb);
		return cb;
	}

	function catfish_close(e)/* catfish native close button */
	{
		dispatch(_C);
		if (e.target.parentElement === catfish.expanded)
		{
			Enabler.requestFullscreenCollapse();
		}
		setFloorDivs();
		Enabler.reportManualClose();
		Enabler.close();
	}

	function error(msg)/* catfish exclusive error console log */
	{
		console.log("%c [catfish] " + msg, "color:" + "red" + ";");
	}

	function log(msg)/* catfish exclusive console log */
	{
		console.log("%c [catfish] " + msg, "color:" + "blue" + ";");
	}

	function validate(key)/* validates for undefined or null */
	{
		if(typeof key === 'undefined' || typeof key === 'null')
		{
			error(key+' cannot be null or undefined. Make sure to set all 5 catfish parameters.');
			return;
		}else return true;
	}

	function validateNum(key)/* validates number */
	{
		if (typeof Number(key) && parseInt(key) % 1 === 0 && !isNaN(key))
		{
			return true;
		}else{
			error(key+' cannot be string. Integer Expected.');
			return;
		}
	}

	var dispatch = function (key)
	{
		var dataObj;
		if (events.hasOwnProperty(key))
		{
			dataObj = dataObj || {};
			dataObj.currentTarget = catfish;
			for (var i in events[key])
			{
				events[key][i](dataObj);
			}
		}
	}

	 var _addEventListener = function (key,func)
	{
		if (!events.hasOwnProperty(key))
		{
        		events[key] = [];
		}

		events[key].push(func);
	}

	var _removeEventListener = function(key,func)/* removes listeners for the catfish */
	{
		if (events.hasOwnProperty(key))
		{
			for (var i in events[key])
			{
				if (events[key][i] === func)
				{
					events[key].splice(i, 1);
				}
			}
		}
	}

	var setCloseButtonOptions = function (_op)
	{
		if (validate(_op.url)) closeButton.url = _op.url; else {error('Close button must contain a valid URL');return;};
		if (validateNum(_op.width  )) closeButton.width = _op.width; else{ error('Close Button must contain a valid width');return;};
		if (validateNum(_op.height  )){
			if (_op.height > catfish.collapsedHeight){
				error('close button height must fit within collapsed dimensions.');
				return;
			}else{
				closeButton.height = _op.height;
			}
		}else{
			error('Close Button must contain a valid width');
			return;
		};
		if (validateNum(_op.offsetY)){
			if (_op.offsetY > catfish.collapsedHeight){
				error('close button top margin must fit within collapsed dimensions.');
				return;
			}else{
				closeButton.offsetY = _op.offsetY;
			}
		}else {
			error('Close Button must contain a valid offsetY');
			return;
		};
		if (validateNum(_op.offsetX)) closeButton.offsetX = _op.offsetX; else {error('Close Button must contain a valid offsetX');return;};
	}

	return {
		// Public interface - API

		// initializing function
		initialize : function(_el,_c,_e,_ch,_eh,_fw,_op)
		{
			if (typeof Enabler !== undefined)
			{
				// validate if element, collapsed and expanded containers exists
				if (validate(document.getElementById(_el))) this.element = document.getElementById(_el);
				if (validate(document.getElementById(_c))) this.collapsed = document.getElementById(_c);
				if (validate(document.getElementById(_e))) this.expanded = document.getElementById(_e);
				if (validate(_ch)) this.collapsedHeight = parseInt(_ch);
				if (validate(_eh)) this.expandedHeight = parseInt(_eh);
				if (validate(_fw)) this.fixedWidth = parseInt(_fw);
				this.heightOffset = this.expandedHeight - this.collapsedHeight;

				if (_op !== undefined) setCloseButtonOptions(_op);

				this.collapsed_close_btn = appendCloseButtonTo(this.collapsed);
				this.expanded_close_btn = appendCloseButtonTo(this.expanded);

				// Expanded Listeners
				Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_START,function(e){
					dispatch(_E_S);
					expand();
				},false);

				Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_FINISH,function(e){
					dispatch(_E_F);
				},false);
				/* Collapsed Listeners */
				Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_START,function(e){
					dispatch(_C_S);
				},false);

				Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_FINISH,function(e){
					collapse();
					dispatch(_C_F);
				},false);
				/* Exit Listeners */
				Enabler.addEventListener(studio.events.StudioEvent.EXIT,function(e){
					/*log('EXIT');*/
					collapse();
				},false);

				/* Setup Initial positions */
				setFloorDivs();
			}else{
				error('Enabler missing. Make sure to include the Enabler in your HTML.');
			}
		},

		// Events API
		addEventListener : _addEventListener,
		removeEventListener : _removeEventListener,
		INIT : _I,
		EXPAND_START : _E_S,
		EXPAND_FINISH : _E_F,
		COLLAPSE_START : _C_S,
		COLLAPSE_FINISH : _C_F,
		CLOSE : _C,

		// Enabler wrapper
		requestExpand : function ()
		{
			Enabler.requestFullscreenExpand(5000,this.expandedHeight);
		},

		finishExpand : function ()
		{
			Enabler.finishFullscreenExpand();
		},

		requestCollapse : function ()
		{
			Enabler.requestFullscreenCollapse();
		},

		finishCollapse : function ()
		{
			Enabler.finishFullscreenCollapse();
		},

	};
})();
