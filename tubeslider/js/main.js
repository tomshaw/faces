window.onerror = function () {
    return true;
};

window.defaultStatus = "";

NS = (document.layers) ? 1 : 0;
IE = (document.all) ? 1 : 0;
gecko = (document.getElementById) ? 1 : 0;
loaded = 0;
layerstart = "";
layerleft = "";
layertop = "";
layerstyle = "";
if (NS) {
    layerstart = "document.";
    layerleft = ".left";
    layertop = ".top";
    layerstyle = "";
}
if (gecko || IE) {
    layerstart = "document.getElementById('";
    layerleft = ".left";
    layertop = ".top";
    layerstyle = "').style";
}
if (IE && !gecko) {
    layerstart = "document.all.";
    layerleft = ".left";
    layertop = ".top";
    layerstyle = ".style";
}

if (NS) {
    window.captureEvents(Event.MOUSEMOVE);
    window.onMouseMove = MoveHandler;
}
if (gecko || IE) {
    document.onmousemove = MoveHandler;
}
gotthere = 0;
count = 0;
slidenumber = 1;

Ypos2 = 72;
Xpos2 = 72;

beenthere = 0;
oldactive = 0;
active = 0;
buttonpos = new Array(0, 1, 2, 3);
buttontext = new Array("About U4EA And His Crazy Web Site!!!!", "U4EA's: The Crazy Fun Zone Interfaces!!!!", "U4EA'S: Intricate Super Hype Interface Designs!!!!", "U4EA'S: The Creative Portfolio!!!!! :>!");

function MoveHandler(e) {
    if (loaded) {
        if (NS || IE || gecko) {
            Xpos2 = (IE) ? event.x : e.pageX;
            Ypos2 = (IE) ? event.y : e.pageY;
            if (clicked && !beenthere) {
                if (Xpos2 < 264) {
                    beenthere = 1;
                }
            }
            if (clicked && beenthere) {
                if (Xpos2 > 264) {
                    beenthere = 0;
                    clicked = 0;
                    dropdown2(active);
                    eval(layerstart + "rip" + layerstyle + ".visibility = 'hidden'");
                }
            }
            if (Ypos2 > 450) {
                noslide();
            } else {
                eval(layerstart + "slide" + layerstyle + ".visibility = 'visible'");
            }
            slidepos = Xpos2 - 49; /* 49 Grabs slider close to center */
            if (slidepos < 107) {
                slidepos = 107;
            }
            if (slidepos > 403) {
                slidepos = 403;
            }
            if ((Xpos2 > (slidenumber * 95) + 107) && (Xpos2 < (slidenumber * 95) + 107)) {
                eval(layerstart + "slide" + layerstyle + layerleft + " = (slidenumber*95)+107");
            } else {
                eval(layerstart + "slide" + layerstyle + layerleft + " = slidepos");
            }
        }
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
        eval(layerstart + "slide" + layerstyle + layerleft + " = (num*78)+19");
        clicked = 1;
        holder = buttonpos[num];
        buttonpos[num] = buttonpos[0];
        buttonpos[0] = holder;
        active = buttonpos[0];
        oldactive = buttonpos[num];
        eval(layerstart + "button" + (oldactive + 1) + layerstyle + ".zIndex = 3000");
        eval(layerstart + "button" + (active + 1) + layerstyle + ".zIndex = 3000");
        eval(layerstart + "rip" + layerstyle + ".zIndex = 3500");
        dropdown2(active);
        where = num;
        slidestart = where * 87;
        slider();
    }
}

function dropdown2(num) {
    if (loaded) {
        eval(layerstart + "tvInfo" + layerstyle + ".visibility = 'hidden'");
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
        eval(layerstart + "button" + (oldactive + 1) + layerstyle + layerleft + " = 107 + (where*95)"); /* width of image */
        slidestart = slidestart - 107;
        eval(layerstart + "rip" + layerstyle + ".visibility = 'visible'");
        if (slidestart < 107) {
            slidestart = 107;
        }
        eval(layerstart + "button" + (active + 1) + layerstyle + layerleft + " = slidestart");
        eval(layerstart + "rip" + layerstyle + layerleft + " = slidestart");
        if (slidestart > 107) {
            setTimeout('slider()', 1);
        } else {
            eval(layerstart + "button" + (active + 1) + layerstyle + layerleft + " = 107");
            eval(layerstart + "rip" + layerstyle + layerleft + " = 107");
            eval(layerstart + "button" + (active + 1) + layerstyle + ".zIndex = 4000");
            eval(layerstart + "rip" + layerstyle + ".zIndex = 3500");
            eval(layerstart + "button" + (active + 1) + "drop" + layerstyle + ".visibility = 'visible'");
            eval(layerstart + "tvInfo" + layerstyle + ".visibility = 'visible'");
            window.status = 'Jumpin JiHosaphat Jiha!!!!';
        }
    }
}

function launchnow(url) {
    launch = window.open(url, "launch", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,copyhistory=no,width=420,height=480");
    launch.focus();
}