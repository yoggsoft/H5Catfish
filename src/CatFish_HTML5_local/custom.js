// JavaScript Document
//HTML5 Ad Template JS from DoubleClick by Google

//Declaring elements from the HTML i.e. Giving them Instance Names like in Flash - makes it easier
var container;
var content;
var expandConten;
var bgExit;
var expandBtn;
var collapseBtn;
var closeBtn;
var isExpanded = false; // toggle if auto-Expand, false is default - unless the creative will be auto-expanded.

// Function to run with any animations starting on load, or bringing in images etc
init = function()
{
	//Assign All the elements to the element on the page
	content = document.getElementById('collapsed_content_dc');
	expandConten = document.getElementById('expanded_content_dc');
	bgExit = document.getElementById('background_exit_dc');
	expandBtn = document.getElementById('expand_btn_dc');
	collapseBtn = document.getElementById('collapse_btn_dc');
	//Bring in listeners i.e. if a user clicks or rollsover
	addListeners();
	// Display the ad
	content.style.display = "block";
}

enablerInitHandler = function ()
{
	// Start ad, initialize animation,
	// load in your image assets, call Enabler methods,
	// and/or include other Studio modules.
	init();
	// Set the minimum floating dimension
	Enabler.setFloatingPixelDimensions(970,300);
	// Set Close Button shape
	catfish.initialize("catfish","collapsed_content_dc","expanded_content_dc",90,300,970/*,{
		url : 'close_btn.png',
		width : 51,
		height : 16,
		offsetX : 5,
		offsetY : 5
	}*/);
}

// If true, start function. If false, listen for INIT.
if (Enabler.isInitialized())
{
	enablerInitHandler();
} else {
	Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
	//catfish.addEventListener(catfish.INIT,function(e){alert('comence');})
}

//Add Event Listeners
addListeners = function()
{
	bgExit.addEventListener('click', bgExitHandler, false);
	// Expand and Collapse button listeners
	expandBtn.addEventListener('click', expandAdHandler, false);
	collapseBtn.addEventListener('click', collapseAdHandler, false);
	// Listeners when the Creative is closed
	//Enabler.addEventListener(studio.events.StudioEvent.EXIT,closeHandler,false);

	catfish.addEventListener(catfish.CLOSE,closeHandler,false);

	catfish.addEventListener(catfish.COLLAPSE_START, function() {
		// Add desired collapsing animation
		catfish.finishCollapse();
		// custom actions
		Enabler.stopTimer("Panel_1 Expansion");

	});

	catfish.addEventListener(catfish.COLLAPSE_FINISH, function() {
		// Show collapsed panel
		// Add any additional functionalities
		// or animation on the collapsed panel
		//Hide Expand
		expandConten.style.display = "none";
		content.style.display = "block";
	});

	catfish.addEventListener(catfish.EXPAND_START,function(e){
		// Add desired expansion animation
		catfish.finishExpand();
		// custom actions
		Enabler.startTimer("Panel_1 Expansion");
	});

	catfish.addEventListener(catfish.EXPAND_FINISH,function(e){
		// Show expanded panel
		// Add any additional functionalities
		// or animation on the expanded panel
		//Hide Expand
		expandConten.style.display = "block";
		content.style.display = "none";
		console.log();
	});
}

closeHandler = function()
{
	// Ad desired actions when creative is closed
	// note: Rest of close events will be performed by catfish
	if (isExpanded)
	{
		Enabler.stopTimer("Panel_1 Expansion");
		isExpanded = false;
	}
}

bgExitHandler = function()
{
	if (isExpanded)
	{
		//collapse the add	if Expanded
		catfish.requestCollapse();
		Enabler.stopTimer("Panel_1 Expansion");
		// custom actions
		isExpanded = false;

	}
	//Call Exits
	Enabler.exit('HTML5_Background_Clickthrough','https://www.google.com');
}

expandAdHandler = function(e)
{
	if (!isExpanded)
	{
		catfish.requestExpand();
		isExpanded= true;
	}
}

collapseAdHandler = function(e)
{
	if (isExpanded)
	{
		catfish.requestCollapse();
		isExpanded = false;
	}
}
