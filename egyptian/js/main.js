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
}

Zflag = new makeZflag();

if (Zflag.NS) {
    location.href = "index.html";
    layerleft = ".left";
    layerstart = "document.";
    layerstyle = "";
}
if (Zflag.gecko) {
    layerstart = "document.getElementById('";
    layerleft = ".left";
    layerstyle = "').style";
}
if (Zflag.IE) {
    layerstart = "document.all.";
    layerleft = ".left";
    layerstyle = ".style";
}

function getZbrowser() {
    alert(navigator.appName + " - " + navigator.appVersion);
}

function makeZbrowse() {
    this.id = "Zbrowse";
}

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

function getZimage(name, wrapper, outerWrapper, outerOuterWrapper) {
    if (document.layers) {
        returnString = "";
        if (outerOuterWrapper) returnString = returnString + "document." + outerOuterWrapper + ".";
        if (outerWrapper) returnString = returnString + "document." + outerWrapper + ".";
        if (wrapper) returnString = returnString + "document." + wrapper + ".";
        returnString = returnString + "document." + name;
        return eval(returnString);
    } else if (document.all) {
        return eval("document.all." + name);
    } else if (document.getElementById) {
        return document.getElementById(name);
    } else {
        return false;
    }
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
}

makeZobject.prototype.setZall = function () {
    this.DHTML.top = this.top;
    this.DHTML.left = this.left;
    this.DHTML.zIndex = this.zindex;
    this.DHTML.height = this.height;
    this.DHTML.width = this.width;
    this.DHTML.visibility = this.visibility;
};

function setDefaultVars() {
    scrollPercent = 0;
    mDown = 0;
    Ypos = 0;
    Xpos = 0;
    whichClicked = 99;
    whichWin = 0;
    lastWhichWin = 0;
    Zlag = 4;
    dragTime = 0;
    dragOffset = 0;
    loaded = 0;
    windowOpen = 0;
    refreshed = 0;
    dragActive = 0;
    scrollDir = 0;
    baseScroll = 33;
    numImages = 1;
    launchNew = 0;
    whichClicked = 99;
    which = 0;
    moved = 1;
    gotthere = 0;
    count = 0;
    slidenumber = 1;
    firstTime = 0;
    beenthere = 0;
    oldactive = 0;
    active = 0;
    speed = 5;
    buttonpos = new Array(0, 1, 2, 3);
    buttontext = new Array("About U4EA And His Crazy Web Site!", "U4EA's: Crazy Graphic Images....", "U4EA'S: Intricate Super Hype Interface Designs!!!!", "U4EA'S: The Tutorial Files! :>!");



    Zrefresh = (Zflag.NS) ? 40 : 8;
    Zrefresh = ((Zflag.gecko && !Zflag.IE) || Zflag.opera) ? 40 : Zrefresh;
    baseZlag = 4;
    baseZlag = (Zflag.gecko && !Zflag.IE) ? 2 : baseZlag;
    baseZlag = (Zflag.opera) ? 12 : baseZlag;
    baseZlag = (Zflag.mac) ? 4 : baseZlag;
    onload = Zsetup;
    onresize = fixObjects;
    //window.onload=getTextHeight;
}

setDefaultVars();

Zobjects = new Array();
Zobject = new Array();
ZobjectNames = new Array("ZFace", "ZEgyptFace");

// SETUP FUNCTION! ID,wrapper,top,left,height,width,zindex,visibility
function Zsetup() {
    Xpos = Zbrowse.width() * .4;
    Ypos = 100;
    Zobject[0] = new makeZobject("ZFace", null, 1, (Zbrowse.width() - 497) / 2, 720, 478, 1000);
    Zobject[1] = new makeZobject("ZEgyptFace", "ZFace", 420, 0, 0, 478, 1000);
    Zobject[2] = new makeZobject("textWrapper", null, 0, 0, 240, 352, 1001, 'hidden');

    scrollingText = new makeZobject('loadedText', 'null', 0, 0, 240, 352, 10000);

    initAll();

    for (var m = 0; m < buttonNames.length; m++) {
        whichShown[m] = 0;
        whichShould[m] = 0;
        Zbuttons[m] = getZimage(buttonNames[m], 'Z' + buttonNames[m], 'ZFace', 'ZEgyptFace');
    }

    if (Zflag.NS) {
        window.captureEvents(Event.MOUSEMOVE | Event.MOUSEDOWN | Event.MOUSEUP | Event.CLICK);
        window.onMouseMove = moveHandler;
        window.onMouseDown = StartE;
        window.onMouseUp = EndE;
    } else if (Zflag.IE) {
        document.onmousemove = moveHandler;
        document.onmousedown = StartE;
        document.onmouseup = EndE;
        document.ondragstart = StartE;
        document.onselectstart = dontDoIt;
    } else if (Zflag.gecko && !Zflag.opera) {
        document.addEventListener("mousemove", moveHandler, true);
        document.addEventListener("mousedown", StartE, true);
        document.addEventListener("mouseup", EndE, true);
    }

    startInterval();
    loaded = 1;
}

function doNothing() {
    fooStuff = 0;
}

function moveHandler(e) {
    if (!loaded) return false;
    //if(!firstTime) clearTimeout(fooTime);
    fooTime = setTimeout('moved=0', 20000);
    Xpos = (Zflag.IE) ? event.x : e.pageX;
    Ypos = (Zflag.IE) ? event.y : e.pageY;
    if (dragActive && mDown) doDragging();

    Xpos2 = (Zflag.IE) ? event.x : e.pageX;
    Ypos2 = (Zflag.IE) ? event.y : e.pageY;

    if (Ypos2 > 950) {
        noslide();
    } /* Slider Control How Far Down The Page*/
    else {
        eval(layerstart + "slide" + layerstyle + ".visibility = 'visible'");
    }

    slidepos = Xpos2 - 100; /* 49 set grab position */

    if (slidepos < 200) {
        slidepos = 200;
    } /*  slide start 200 */
    if (slidepos > 510) {
        slidepos = 510;
    } /*  slide end 510 */

    if ((Xpos2 > (slidenumber * 95) + 200) && (Xpos2 < (slidenumber * 95) + 200)) {
        eval(layerstart + "slide" + layerstyle + layerleft + " = (slidenumber*95)+20");
    } else {
        eval(layerstart + "slide" + layerstyle + layerleft + " = slidepos");
    }

    if ((Xpos2 > (slidenumber * 95) + 200) && (Xpos2 < (slidenumber * 95) + 200)) {
        eval(layerstart + "sliderglass" + layerstyle + layerleft + " = (slidenumber*95)+200");
    } else {
        eval(layerstart + "sliderglass" + layerstyle + layerleft + " = slidepos");
    }
}

function initAll() {
    loaded = 1;
    eval(layerstart + "buttonhide" + layerstyle + ".visibility = 'visible'");
}

function slidebug(num) {
    if (loaded) {
        window.status = buttontext[buttonpos[num]];
        slidenumber = num;
        eval(layerstart + "slide" + layerstyle + ".visibility = 'visible'");
    }
}

function noslide() {
    if (loaded) {
        eval(layerstart + "slide" + layerstyle + ".visibility = 'hidden'");
    }
}
clicked = 0;

function dropdown(num) {
    if (loaded) {
        eval(layerstart + "slide" + layerstyle + layerleft + " = (num*78)+150");
        clicked = 1;
        holder = buttonpos[num];
        buttonpos[num] = buttonpos[0];
        buttonpos[0] = holder;
        active = buttonpos[0];
        oldactive = buttonpos[num];


        dropdown2(active);
        where = num;
        slidestart = where * 200;
        slider();
    }
}

function dropdown2(num) {
    if (loaded) {
        eval(layerstart + "scrollInfo" + layerstyle + ".visibility = 'hidden'");
        for (var j = 1; j <= 4; j++) {
            eval(layerstart + "button" + j + "drop" + layerstyle + ".visibility = 'hidden'");
        }
    }
}

function clickwho() {
    for (var checker = 0; checker <= 3; checker++) {
        if (buttonpos[checker] == 0) {
            dropdown(checker);
        }
    }
}

function slider() {
    if (loaded) {
        eval(layerstart + "button" + (oldactive + 1) + layerstyle + layerleft + " = 200 + (where*95)"); /* width of image */
        slidestart = slidestart - 200;

        if (slidestart < 200) {
            slidestart = 200;
        }
        eval(layerstart + "button" + (active + 1) + layerstyle + layerleft + " = slidestart");

        if (slidestart > 200) {
            setTimeout('slider()', 1);
        } else {
            eval(layerstart + "button" + (active + 1) + layerstyle + layerleft + " = 200");

            eval(layerstart + "button" + (active + 1) + layerstyle + ".zIndex = 4000");

            eval(layerstart + "button" + (active + 1) + "drop" + layerstyle + ".visibility = 'visible'");
            eval(layerstart + "scrollInfo" + layerstyle + ".visibility = 'visible'");
            window.status = 'Jumpin JiHosaphat Jiha!!!!';
        }
    }
}


function startInterval() {
    ZrefreshID = setInterval("Zupdate()", Zrefresh);
    refreshed = 1;
}

function endInterval() {
    clearInterval(ZrefreshID);
    refreshed = 0;
}

function reFreshPage() {
    if (!refreshed) {
        ZrefreshID = setInterval("Zupdate()", Zrefresh);
        refreshed = 1;
    }
}

function setNewInterval(num) {
    clearInterval(ZrefreshID);
    Zrefresh = num;
    ZrefreshID = setInterval('Zupdate()', num);
}

function scrollUpDown(num) {
    scrollReady(num);
    baseScroll = 33;
    scrollDir = num;
}

function scrollReady(num) {
    stopScroll();
    if ((num == 1) && windowOpen) {
        getZimage('upRight', 'ZFace').src = "/images/scrolling/scrollUp2.jpg";
    }
    if ((num == -1) && windowOpen) {
        getZimage('downRight', 'ZFace').src = "/images/scrolling/scrollDown2.jpg";
    }
}

function stopScroll() {
    getZimage('upRight', 'ZFace').src = "/images/scrolling/scrollUp1.jpg";
    getZimage('downRight', 'ZFace').src = "/images/scrolling/scrollDown1.jpg";
}

function StartE() {
    if (!loaded) return false;
    mDown = 1;
    reFreshPage();
    return false;
}

function EndE() {
    window.focus();
    mDown = 0;
    baseScroll = 0;
    dragActive = 0;
    scrollDir = 0;
    stopScroll();
}

function dontDoIt() {
    return false;
}

function goTop() {
    stopScroll();
    scrollingText.top = 0;
    tempSlide = 0;
    scrollingText.DHTML.top = 0;
    scrollPercent = 0;
}


function movedown() {
    if (Zflag.IE && parseInt(crossobj.style.top) >= (loadedText * (-1) + 225)) crossobj.style.top = parseInt(crossobj.style.top) - speed + "px";
    else if (Zflag.NS && crossobj.top >= (loadedText * (-1) + 225)) crossobj.top -= speed;
    movedownvar = setTimeout("movedown()", 20);
}

function moveup() {
    if (Zflag.IE && parseInt(crossobj.style.top) <= 0) crossobj.style.top = parseInt(crossobj.style.top) + speed + "px";
    else if (Zflag.NS && crossobj.top <= 0) crossobj.top += speed;
    moveupvar = setTimeout("moveup()", 20);
}

function fixObjects() {
    maxWidth = 632;
    centerOffset = (Math.round((Zbrowse.width() - maxWidth) / 32) * 16);

    Zobject[0].left = centerOffset + 1;
    Zobject[0].top = 30 - Zobject[1].top;
    Zobject[2].top = Zobject[0].top + 465;
    Zobject[2].left = centerOffset + 243;

    for (var m = 0; m < Zobject.length; m++) Zobject[m].setZall();
    getTextHeight();
}

function Zupdate() {
    checkButtons();
    fixObjects();
    checkScroll();
}

function checkScroll() {
    if (mDown && (scrollDir != 0) && Ztravel) {
        scrollingText.top = scrollingText.top + (scrollDir * baseScroll);
        if (scrollingText.top >= 0) scrollingText.top = 0;
        if (scrollingText.top <= Ztravel) scrollingText.top = Ztravel;
        scrollingText.DHTML.top = scrollingText.top;
    }
    if ((Ztravel != 0) && !(dragActive && mDown)) {
        scrollPercent = Math.abs(scrollingText.top / Ztravel);
        if (scrollPercent > 1) scrollPercent = 1;
    }
    if (dragActive && mDown) {
        scrollingText.top = Math.round(scrollPercent * Ztravel);
        scrollingText.DHTML.top = scrollingText.top;
    }
}

function checkButtons() {
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

buttonNames = new Array("kingtut", "nefertiti", "kingramsys", "spartacus", "nero", "spartans", "piramids", "gladiators", "egyptology");

buttons = new Array();
whichShown = new Array();
whichShould = new Array();
Zbuttons = new Array();

for (var x = 0; x < numImages; x++) {
    for (var m = buttonNames.length * x; m < buttonNames.length * (x + 1); m++) {
        buttons[m] = new Image();
        if (x == 99) {
            buttons[m].src = "/images/face/" + buttonNames[m - (buttonNames.length * x)] + (x + 1) + ".jpg";
        } else {
            buttons[m].src = "/images/face/" + buttonNames[m - (buttonNames.length * x)] + (x + 1) + ".jpg";
        }
    }
}

function ImgOn(num) {
    if (num != whichClicked) whichShould[num] = numImages - 1;
}

function ImgOff(num) {
    if (num != whichClicked) whichShould[num] = 0;
}

function openClose(num) {
    if (whichClicked == num) {
        Zobject[2].visibility = "visible";
    } else if (whichClicked == num) {
        windowOpen = 1;
    } else {
        window.status = buttonNames[num];
        for (var m = 0; m < buttonNames.length; m++) {
            whichShould[m] = 0;
        }
        whichShould[num] = numImages - 1;
        whichClicked = num;
        Zobject[2].visibility = "visible";
        showWin(num);
        scrollingText.top = 0;
        scrollingText.DHTML.top = 0;
        scrollPercent = 0;
    }
}

function loadPage(num, which) {
    if (num > 5) {
        for (var m = 0; m < buttonNames.length; m++) {
            whichShould[m] = 0;
        }
        showWin(num, which);
    } else openClose(num);
}

function closeWin(num, which) {
    Zobject[2].visibility = "hidden";
    Zobject[2].setZall();
}

waitingText = "Loading... <img src=/images/clock.gif width=7 height=7 border=0>";
id = "loadedText";
nestref = "textWrapper";

function showWin(num, which) {
    lastWhichWin = whichWin;
    whichWin = num;
    windowOpen = 1;
    ImgOn(num, 1);
    if (Zflag.IE) {
        document.all[id].innerHTML = waitingText;
    } else if (Zflag.gecko || Zflag.opera) {
        document.getElementById(id).innerHTML = waitingText;
    }
    if (which) url = "/templates/" + which + ".html";
    else url = "/templates/" + buttonNames[num] + ".html";
    if (Zflag.NS) {
        lyr = (nestref) ? eval('document.' + nestref + '.document.' + id) : document.layers[id];
        lyr.load(url, 465);
        lyr.onLoad = getTextHeight;
    } else if (Zflag.IE) {
        document.tempText.location = url;
    } else if (Zflag.gecko || Zflag.opera) {
        document.getElementById('tempText').src = url;
    }
}

function showPage() {
    setTimeout('showPageNow()', 300);
}

goTopString = "<a href='javascript:goTop()' class='topc'>&nbsp;top of page </a><span class='topc'>|</span><a href='javascript:closeWin()' class='topc'> close </a>";

function showPageNow() {
    if (Zflag.IE) {
        document.all[id].innerHTML = document.tempText.document.body.innerHTML + goTopString;
    } else if (Zflag.gecko) {
        document.getElementById(id).innerHTML = window.frames['tempText'].document.getElementById('theBody').innerHTML + goTopString;
    }
    getTextHeight();
}

function foo() {
    fooBar = 0;
}

function goLink(where) {
    if (launchNew) {
        window.open(where, '_blank', 'menubar=yes,toolbar=yes,location=yes,directories=yes,titlebar=yes,status=yes,scrollbars=yes,resizable=yes');
    } else location.href = where;
}

function getTextHeight() {
    if (Zflag.NS) {
        scrollingText.height = document.textWrapper.document.loadedText.document.height;
    }
    if (Zflag.Opera) {
        scrollingText.height = document.getElementById('loadedText').style.pixelHeight;
    }
    if (Zflag.IE) {
        loadedText = crossobj.offsetHeight;
    }
    if (Zflag.gecko) {
        scrollingText.height = document.getElementById('loadedText').offsetHeight;
    }
    Ztravel = 0 - (scrollingText.height - 225);
}


if (navigator.userAgent.indexOf("MSIE 6") > -1) {
    document.onmousewheel = wheelHandler;
}

fooEvent = setTimeout('foo=0', 0);

function wheelHandler() {
    clearTimeout(fooEvent);
    if (!loaded) return false;
    if (windowOpen) {
        if (event.wheelDelta >= 1) {
            StartE();
            scrollUpDown(1);
            fooEvent = setTimeout('EndE()', 100);
        } else if (event.wheelDelta <= -1) {
            StartE();
            scrollUpDown(-1);
            fooEvent = setTimeout('EndE()', 100);
        }
    }
}