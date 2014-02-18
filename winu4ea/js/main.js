loaded = 0;
window.onerror = function () {
    return false;
};
window.defaultStatus = "";

function makeZflag() {
    this.NS = document.layers ? 1 : 0;
    this.IE = document.all ? 1 : 0;
    this.gecko = document.getElementById ? 1 : 0;
    this.mac = (navigator.appVersion.indexOf("Mac") > -1) ? 1 : 0;
    this.opera = (navigator.appName.indexOf("Opera") > -1) ? 1 : 0;
};
Zflag = new makeZflag();

function makeZbrowse() {
    this.id = "Zbrowse";
};
makeZbrowse.prototype.width = function () {
    return Zflag.IE ? document.body.clientWidth : window.innerWidth;
};
makeZbrowse.prototype.height = function () {
    return Zflag.IE ? document.body.clientHeight : window.innerHeight;
};
makeZbrowse.prototype.scrollY = function () {
    return Zflag.IE ? document.body.scrollTop : pageYOffset;
};
makeZbrowse.prototype.scrollX = function () {
    return Zflag.IE ? document.body.scrollLeft : pageXOffset;
};
Zbrowse = new makeZbrowse();
if (Zflag.NS) {
    layerstart = "document.";
    layerstyle = "";
}
if (Zflag.gecko) {
    layerstart = "document.getElementById('";
    layerstyle = "').style";
}
if (Zflag.IE) {
    layerstart = "document.all.";
    layerstyle = ".style";
}
function makeZobject(ID, wrapper, top, left, height, width, zindex, visibility, topGoal, leftGoal) {
    this.ID = ID ? ID : "Zobject" + (Zobject.length);
    this.DHTML = (wrapper && Zflag.NS) ? eval(layerstart + wrapper + "." + layerstart + this.ID + layerstyle) : eval(layerstart + this.ID + layerstyle);
    this.top = top ? top : 0;
    this.left = left ? left : 0;
    this.height = height ? height : 0;
    this.width = width ? width : 0;
    this.zindex = zindex ? zindex : (Zobject.length + 1) * 1000;
    this.visibility = visibility ? visibility : "visible";
    this.topGoal = topGoal ? topGoal : top;
    this.leftGoal = leftGoal ? leftGoal : left;
};
makeZobject.prototype.setZall = function () {
    this.DHTML.top = this.top;
    this.DHTML.left = this.left;
    this.DHTML.zIndex = this.zindex;
    this.DHTML.height = this.height;
    this.DHTML.width = this.width;
    this.DHTML.visibility = this.visibility;
};

ZhideWindow = setTimeout('hideWin()', 60000);

function setDefaultVars() {
	numVisits = 1; 
	mDown = 0; 
	scrollDir = 0; 
	baseScroll = 9; 
	scrollActive = 0; 
	dragActive = 0; 
	Zlag = 4; 
	Ztravel = 0; 
	dragTime = 0; 
	dragOffset = 0; 
	dragOffsetX = 0; 
	dragOffsetY = 0; 
	numImages = 4; 
	whichClicked = 99; 
	which = 0; 
	sizeRatio = 1; 
	whichWin = 0; 
	lastWhichWin = 0; 
	Ypos = 0; 
	Xpos = 0; 
	sleeping = 0; 
	sleepTime = 30000; 
	windowOpen = 0; 
	Zjustify = 0; 
	replayFlag = 0; 
	tempSlide = 0; 
	scrollPercent = 0; 
	saveWindow = 120; 
	wasCookie = 0; 
	lastVisit = 0; 
	Zrefresh = 50; 
	baseZlag = 8; 
	debug = 0;
}

setDefaultVars();

function setNewInterval(num) {
    clearInterval(Zrefresh);
    Zrefresh = setInterval('fix()', num);
}

function setVariable(varName, value) {
    eval(varName + " = " + value);
    if (varName == "baseZlag") {
    	Zlag = Math.ceil(baseZlag * (711 / Zbrowse.width()));
    }
    if (Zlag < 2) Zlag = 2;
}

if (Zflag.IE) {
    document.attachEvent("mousedown", StartE, true);
	document.attachEvent("mousemove", moveHandler, true);
	document.attachEvent("mouseup", EndE, true);
} else {
    document.addEventListener("mousedown", StartE, true);
	document.addEventListener("mousemove", moveHandler, true);
	document.addEventListener("mouseup", EndE, true);
}

function debugStatus() {
    window.status = "dragActive=" + dragActive + ", dragTime=" + dragTime + ", scrollDir=" + scrollDir + ", whichWin=" + whichWin + ", scrollPercent=" + Math.round(scrollPercent * 100) + "%, Zrefresh=" + Zrefresh + ", Zlag=" + Zlag + ", mDown=" + mDown + " .";
}

function moveHandler(e) {
    if (!loaded) return false;
    Xpos = (Zflag.IE) ? event.x : e.pageX;
    Ypos = (Zflag.IE) ? event.y : e.pageY;
    var timeout = setTimeout('hideWin()', 60000);
    clearTimeout(timeout);
    setTimeout('goSleep()', sleepTime);
    if (sleeping) goWake();
    if ((mDown) && dragActive) dragScroller();
    if ((mDown) && dragTime) dragWindow();
    if (debug) debugStatus();
    if ((Ypos < 24) || (Ypos > Zbrowse.height() - 24) || (Xpos < 24) || (Xpos > Zbrowse.width() - 24)) EndE();
}

function dragScroller() {
    scrollPercent = Math.abs((sliderObj.top - (Zobject[3].top + 14)) / 249);
    tempDrag = scrollPercent * 249;
    tempSliderTop = Ypos + dragOffset;
    if (tempSliderTop < Zobject[3].top + 14) tempSliderTop = Zobject[3].top + 14;
    if (tempSliderTop > Zobject[3].top + 14 + 249) tempSliderTop = Zobject[3].top + 14 + 249;
    tempSlide = tempSliderTop - (Zobject[3].top + 14);
    if ((scrollingText.top >= Ztravel) && (scrollingText.top <= 0)) {
        tempScrollTop = (Ztravel * scrollPercent);
        if (tempScrollTop > 0) tempScrollTop = 0;
        if (tempScrollTop < Ztravel) tempScrollTop = Ztravel;
        scrollingText.top = tempScrollTop;
        scrollingText.DHTML.top = tempScrollTop;
        sliderObj.top = tempSliderTop;
        sliderObj.DHTML.top = tempSliderTop;
    }
}

function StartE() {
    if (!loaded) return false;
    if (dragActive) {
        dragOffset = sliderObj.top - Ypos;
        mDown = 1;
        return false;
    }
    if (dragTime) {
        mDown = 1;
        dragOffsetY = Ypos - Zobject[3].top;
        dragOffsetX = Xpos - Zobject[3].left;
        return false;
    }
    if (scrollActive) {
        mDown = 1;
        return false;
    }
}

function EndE() {
    mDown = 0;
    scrollDir = 0;
    baseScroll = 9;
    scrollActive = 0;
    dragTime = 0;
    endDragSlider();
}

function scrollUp() {
    if (dragActive) return false;
    controlScrolling(1);
}

function scrollDown() {
    if (dragActive) return false;
    controlScrolling(2);
}

function pageUpDown() {
    if (!loaded) return false;
    if (dragActive) return false;
    if (Ypos < sliderObj.top) {
        controlScrolling(3);
    } else {
        controlScrolling(4);
    }
}

function dragSlider() {
    dragActive = 1;
}

function endDragSlider() {
    if (!loaded) return false;
    if (!mDown) {
        dragActive = 0;
        dragTime = 0;
    }
}

function stopScroll() {
    scrollDir = 0;
    baseScroll = 9;
    scrollActive = 0;
}

function goTop() {
    stopScroll();
    scrollingText.top = 0;
    tempSlide = 0;
    scrollingText.DHTML.top = 0;
    scrollPercent = 0;
}

function goSleep() {
    if (windowOpen) {
        winHideShow(0);
        sleeping = 1;
        ZcloseWindow = setTimeout('hideWin()', sleepTime * 4);
    }
}

function goWake() {
    if (windowOpen) {
        winHideShow(1);
        sleeping = 0;
        clearTimeout(ZcloseWindow);
    }
}

function controlScrolling(num) {
    if (num == 1) {
        scrollDir = (-1);
        baseScroll = 9;
    }
    if (num == 2) {
        scrollDir = 1;
        baseScroll = 9;
    }
    if (num == 3) {
        scrollDir = (-1);
        baseScroll = 36;
    }
    if (num == 4) {
        scrollDir = 1;
        baseScroll = 36;
    }
    scrollActive = 1;
    scrollDistance = Math.round(baseScroll * (Zbrowse.width() / 711));
}

var Zobject = new Array();

//copyLeft copyRight front winBKG scrollStuff textWrapper
var topGoals = new Array(476, 476, 6, 80, 84, 81, 401, 401, 401, 401, 401);

var buttonNames = new Array("aboutu4ea", "webclients", "funzone", "digitalimages", "interfacedesign", "btnleft", "btnright", "getcookie", "setpref", "reload", "debug");
var buttons = new Array();
var whichShown = new Array();
var whichShould = new Array();
var Zbuttons = new Array();

function initZobjects() {
    // name, wrapper, top, left, height, width, zindex
    Zobject[0] = new makeZobject('copyLeft', null, 476, -2000, 54, 500, 2000);
    Zobject[1] = new makeZobject('copyRight', null, 476, -2000, 54, 500, 2000);
    Zobject[2] = new makeZobject('Zfront', null, 6, -2000, 472, 648, 100);
    Zobject[3] = new makeZobject('winBKG', null, 80, -2000, 304, 551, 3000, 'hidden');
    Zobject[4] = new makeZobject('scrollStuff', null, 84, -2000, 301, 8, 4000, 'hidden');
    Zobject[5] = new makeZobject('textWrapper', null, 81, -2000, 308, 548, 5000, 'hidden');
    Zobject[6] = new makeZobject('Zaboutu4ea', null, 401, -2000, 17, 115, 200);
    Zobject[7] = new makeZobject('Zwebclients', null, 401, -2000, 17, 115, 210);
    Zobject[8] = new makeZobject('Zfunzone', null, 401, -2000, 17, 115, 220);
    Zobject[9] = new makeZobject('Zdigitalimages', null, 401, -2000, 17, 115, 230);
    Zobject[10] = new makeZobject('Zinterfaces', null, 401, -2000, 17, 115, 240);
    sliderObj = new makeZobject('Zslider', null, 64, -2000, 32, 10, 20000, 'hidden');
    scrollingText = new makeZobject('loadedText', 'textWrapper', 6, -2000, 308, 548, 7000);
    for (var m = 0; m < buttonNames.length; m++) {
        whichShown[m] = 0;
        whichShould[m] = 0;
        Zbuttons[m] = document.getElementById(buttonNames[m], 'Zfront', 'setpref');
    }
}

for (var x = 0; x < numImages; x++) {
    for (var m = buttonNames.length * x; m < buttonNames.length * (x + 1); m++) {
        buttons[m] = new Image();
        if (x == 99) {
            buttons[m].src = "/images/buttons/" + buttonNames[m - (buttonNames.length * x)] + (x + 1) + ".gif";
        } else {
            buttons[m].src = "/images/buttons/" + buttonNames[m - (buttonNames.length * x)] + (x + 1) + ".gif";
        }
    }
}

function imageOn(num) {
    if (num != whichClicked) whichShould[num] = numImages - 1;
}

function imageOff(num) {
    if (num != whichClicked) whichShould[num] = 0;
}

function openClose(num) {
    if (whichClicked == num) {
        loaded = 1;
    } else {
        for (var m = 0; m < buttonNames.length; m++) {
            whichShould[m] = 0;
        }
        whichShould[num] = numImages - 1;
        whichClicked = num;
        showWin(num);
    }
}

function changeJustify() {
    if (Zjustify) {
        Zjustify = 0;
        imageOff(12, 0);
    } else {
        Zjustify = 1;
        imageOff(13, 0);
    }
    setLeftGoals();
}

function hideWin(num) {
    for (var m = 0; m <= 6; m++) {
        imageOff(m, 0);
    }
    winHideShow(0);
}

function winHideShow(num) {
	var visVar = (num) ? "visible" : "hidden";
    Zobject[5].visibility = visVar;
    Zobject[4].visibility = visVar;
    Zobject[3].visibility = visVar;
    sliderObj.visibility = visVar;
    for (var m = 3; m <= 5; m++) {
        Zobject[m].setZall();
    }
    sliderObj.setZall();
}

function showWin(num, which) {
    lastWhichWin = whichWin;
    whichWin = num;
    windowOpen = 1;
    imageOn(num, 1);
    if (!wasCookie) goTop();
    winHideShow(1);
    document.getElementById("loadedText").innerHTML = "Loading... <img src=/images/clock.gif width=7 height=7 border=0>";
	url = (which) ? "/templates/" + which + ".html" : "/templates/" + buttonNames[num] + ".html";
	document.getElementById('tempText').src = url;
}

function loadPage(num, which) {
    if (num > 6) {
        for (var m = 0; m < buttonNames.length; m++) {
            whichShould[m] = 0;
        }
        showWin(num, which);
    }
}

function getTextHeight() {
    scrollingText.height = document.getElementById('loadedText').offsetHeight;
    Ztravel = 0 - (scrollingText.height - 290);
}

function showPage() {
    setTimeout('showPageNow()', 300);
}

function showPageNow() {
    document.getElementById("loadedText").innerHTML = window.frames['tempText'].document.getElementById('theBody').innerHTML + "<a href='javascript:goTop()' class='topc'>&nbsp;top of page </a><span class='topc'>|</span><a href='javascript:hideWin()' class='topc'> close </a>";
    getTextHeight();
    tempSlide = Math.round(scrollPercent * 249);
    tempScrollTop = Math.floor(Ztravel * scrollPercent);
    scrollingText.top = tempScrollTop;
    scrollingText.DHTML.top = tempScrollTop;
}

function setLeftGoals() {
    if (Zjustify) {
    	// copyLeft copyRight front winBKG scrollStuff textWrapper
        leftGoals = new Array(Zbrowse.width() - 0, Zbrowse.width() - 539, Zbrowse.width() - 670, Zbrowse.width() - 609, Zbrowse.width() - 51, Zbrowse.width() - 609); //textWrapper
        for (var m = 6; m <= 10; m++) {
            leftGoals[m] = Zbrowse.width() + 252 + ((m - 14) * 108);
        }
        widthGoal = Zbrowse.width() - 492;
        if (widthGoal < 262) {
            widthGoal = 262;
        }
    } else {
        leftGoals = new Array(28, -1716, 0, 60, 618, 63);
        for (m = 6; m <= 10; m++) {
            leftGoals[m] = + 922 + ((m - 14) * 108);
        }
        widthGoal = Zbrowse.width() - 464;
        if (widthGoal < 262) {
            widthGoal = 262;
        }
    }
    for (m = 0; m < Zobject.length; m++) {
        Zobject[m].leftGoal = leftGoals[m];
    }
}

function replayIntro() {
    imageOn(whichWin, 0);
    replayFlag = 1;
    initZobjects();
    sliderObj.setZall();
    for (var m = 0; m < Zobject.length; m++) {
        Zobject[m].setZall();
    }
    hideWin();
    setTimeout('setup();', 2000);
}

function fix() {
    if (!loaded) return false;
    if ((Zbrowse.scrollX() != 0) || (Zbrowse.scrollY() != 0)) {
        scrollTo(0, 0);
    }
    if (dragActive || scrollActive) {
        if ((Ypos < Zobject[4].top) || (Ypos > Zobject[4].top + Zobject[4].height)) {
            scrollDir = 0;
        } else if (Ypos < sliderObj.top) {
            scrollDir = (scrollDir > (-1)) ? 0 : (-1);
        } else if (Ypos > sliderObj.top + 14) {
            scrollDir = (scrollDir < 1) ? 0 : 1;
        } else {
            scrollDir = 0;
        }
        if ((mDown) && scrollActive) {
            if ((scrollingText.top >= Ztravel) && (scrollingText.top <= 0)) {
                tempScrollTop = scrollingText.top - (scrollDistance * scrollDir);
                if (tempScrollTop > 0) tempScrollTop = 0;
                if (tempScrollTop < Ztravel) tempScrollTop = Ztravel;
                scrollingText.top = tempScrollTop;
                scrollingText.DHTML.top = tempScrollTop;
                if (scrollingText.height > 290) {
                    scrollPercent = Math.abs(scrollingText.top) / (scrollingText.height - 290);
                    tempSlide = Math.round(scrollPercent * 249);
                }
            }
        }
    }
    if (widthGoal != Zobject[4].width) {
        tempWidth = widthGoal - Zobject[3].width;
        if (Math.floor(Math.abs(tempWidth)) > 0) {
            tempWidth = (Math.abs(tempWidth) < 72) ? Math.round(tempWidth / (Zlag / 2)) : Math.round(tempWidth / (Zlag));
            Zobject[3].width = Zobject[3].width;
            Zobject[5].width = Zobject[3].width;
            getTextHeight();
            tempScrollTop = Math.floor(Ztravel * scrollPercent);
            scrollingText.top = tempScrollTop;
            scrollingText.DHTML.top = tempScrollTop;
        }
    }
    if (!dragTime || !mDown) {
        for (var m = 0; m <= 10; m++) {
            if ((Zobject[m].topGoal != Zobject[m].top) || (Zobject[m].leftGoal != Zobject[m].left)) {
                tempLeft = Zobject[m].leftGoal - Zobject[m].left;
                if (Math.abs(tempLeft) > 0) {
                    tempLeft = (Math.abs(tempLeft) < 72) ? Math.round(tempLeft / (Zlag / 2)) : Math.round(tempLeft / Zlag);
                    Zobject[m].left = Zobject[m].left + tempLeft;
                }
                tempTop = Zobject[m].topGoal - Zobject[m].top;
                if (Math.abs(tempTop) > 0) {
                    tempTop = Math.round((Zobject[m].topGoal - Zobject[m].top) / Zlag);
                    Zobject[m].top = Zobject[m].top + tempTop;
                }
                if (Math.abs(tempLeft) < .5) {
                    Zobject[m].left = Zobject[m].leftGoal;
                }
                Zobject[m].setZall();
            }
        }
        for (var m = 0; m < Zbuttons.length; m++) {
            if (whichShould[m] < whichShown[m]) {
                whichShown[m]--;
                Zbuttons[m].src = buttons[m + (whichShown[m] * Zbuttons.length)].src;
            } else if (whichShould[m] > whichShown[m]) {
                whichShown[m]++;
                Zbuttons[m].src = buttons[m + (whichShown[m] * Zbuttons.length)].src;
            }
        }
    }
    sliderObj.top = Zobject[3].top + 14 + tempSlide;
    sliderObj.left = Zobject[3].left + Zobject[3].width + 6;
    sliderObj.setZall();
}

function setup() {
    if (!loaded) {
        getCookie();
        initZobjects();
        if (Zbrowse.width() < 711) {
            window.resizeBy(711 - Zbrowse.width(), 0);
        }
        setNewInterval(Zrefresh);
    }
    
    if (Zbrowse.width() > 711) {
        Zlag = Math.ceil(baseZlag * (711 / Zbrowse.width()));
        if (Zlag < 2) Zlag = 2;
        scrollDistance = Math.round(11 * sizeRatio);
    }
    topOffset = (Zbrowse.height() - 460) / 2.8;
    if (topOffset < 2) {
        topOffset = -20;
    } else if (topOffset < 8) {
        topOffset = -14;
    }
    for (var m = 0; m < Zobject.length; m++) {
        Zobject[m].topGoal = topGoals[m] + topOffset;
    }
    sliderObj.topGoal = 14 + topOffset;
    Zobject[6].width = Zbrowse.width();
    setLeftGoals();
    loaded = 1;
    if (Zjustify) {
        imageOff(13, 0);
    } else {
        imageOff(12, 0);
    }
    replayFlag = 0;
}

function resetDefaults() {
    setDefaultVars();
    Zlag = Math.ceil(baseZlag * (711 / Zbrowse.width()));
    if (Zlag < 2) Zlag = 2;
    top.replayIntro();
}

function delayedSetup() { 
    if (document.layers) { 
        fooString = "(none)";
        if (fooString != "") { 
    	    setup(); 
        } else { 
    	    location.href=self.location.href + "?nsreload"; 
        }
    } else {
    	setup(); 
    }
}

onload = setup;
delayedSetup;
onresize = setup;
onunload = setCookie;

function getCookie() {
    now = new Date();
    myCookie = unescape(document.cookie);
    if (myCookie.length <= 0) {
        wasCookie = 0;
        return false;
    }
    wasCookie = 1;
    startWhere = myCookie.indexOf("foo=") + 4;
    myCookie = myCookie.substring(startWhere, myCookie.length) + ";";
    tempBrowseWide = (document.all) ? document.body.clientWidth : window.innerWidth;
    Zlag = Math.ceil(baseZlag * (711 / tempBrowseWide));
    if (Zlag < 2) Zlag = 2;
    if ((now.getTime() - lastVisit) < (saveWindow * 60 * 1000)) {
        if (windowOpen) {
            setTimeout('showWin(whichWin);imgOn(whichWin,1)', 1500);
        } else {
            windowOpen = 0;
            scrollPercent = 0;
            numVisits = numVisits + 1;
        }
    }
    setTimeout('wasCookie=0', 3000);
}

function setCookie() {
    now = new Date();
    fooStuff = "lastVisit=" + now.getTime() + ";numVisits=" + numVisits + ";windowOpen=" + windowOpen + ";Zrefresh=" + Zrefresh + ";baseZlag=" + baseZlag + ";debug=" + debug + ";sleepTime=" + sleepTime + ";saveWindow=" + saveWindow + ";Zjustify=" + Zjustify;
    if (windowOpen) fooStuff = fooStuff + ";scrollPercent=" + scrollPercent + ";whichWin=" + whichWin;
    fooStuff = escape(fooStuff);
    dateWhen = new Date();
    dateWhen.setTime(now.getTime() + (365 * 24 * 60 * 60 * 1000)); //<-- one year save cookie; 
	document.cookie = "foo=" + fooStuff + "; expires=" + dateWhen.toGMTString();
} 

function killCookie() { 
	dateWhen = new Date(); 
	dateWhen.setTime(now.getTime() - (365 * 24 * 60 * 60 * 1000)); 
	document.cookie = "foo=;expires=" + dateWhen.toGMTString();
} 