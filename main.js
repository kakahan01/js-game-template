var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var toDraw = []; // {type: "", x: , y: , width: , height: , stroke: , fill: , style: "", content: "", imageIndex}
var showLog = false;
var _log = [];
var asked_fps;
var controls = [];
var logControls = false;
var logCount;

document.onkeydown = function (e) {
    try {
        var exits = false;
        controls.forEach(control => {
            if (control == e.key) {
                exists = true;
            }
        })
    
        if (!exits) {
            controls.push(e.key);
        }
    } catch (error) {
        log("(onkeydown) Error " + error);
    }

}

var images = [];

document.onkeyup = function (e) {
    try {
        controls.forEach(control => {
            if (control == e.key) {
                controls.splice(controls.indexOf(control), controls.indexOf(control));
            }
        })
    } catch (error) {
        log("(onkeyup) Error " + error);
    }

}

function log(str) {
    _log.unshift(str);
}

function resetLog() {
    try {
        if (!showLog) return;

        if (_log.length > logCount) {
            _log.splice(logCount + 1, _log.length - (logCount + 1))
        }
    
        ctx.fillStyle = "black";
        
        for (let i = 0; i < _log.length; i++) {
            const e = _log[i];
            ctx.fillText(e, 5, (i * 7) + 15);
        }
    } catch (error) {
        log("(resetLog) Error " + error);
    }

}

function initializeImage(path, width, height) {
    try {
        log("(kickstart) initializeImage: Image " + path);
        var img = new Image(width, height);
        img.src = path;
    
        images.push(img);
    } catch (error) {
        log("(initializeImage) Error " + error);
    }

}

function initialize() {
    try {
        toDraw.push({
            type: "rectangle",
            x: 50,
            y: 100,
            width: 100,
            height: 150,
            stroke: true,
            fill: true,
            style: "green"
        });
    
        // FPS COUNTER
    
        toDraw.push({
            type:"text",
            x: 750,
            y: 10,
            fill: true,
            stroke: true,
            style: "black",
            content: FPS + " FPS"
        })
    } catch (error) {
        log("(initialize) Error " + error);
    }
    
}

var frames = 0;
var FPS = 0;

function calculateFPS(type) {
    if (type == "frame") {
        frames++;
    }

    if (type == "second") {
        FPS = frames;
        frames = 0;
    }
}

function draw() {
    try {
        calculateFPS("frame");

    if (logControls) {
        controls.forEach(control => {
            log("(draw) Detected key " + control);
        })
    }

    initialize();

    ctx.clearRect(0,0,canvas.width,canvas.height);

    for (let i = 0; i < toDraw.length; i++) {
        var element = toDraw.shift();

        log("(draw) Context 2D: Drawing element " + element.type + " " + i);

        ctx.fillStyle = element.style;
        ctx.strokeStyle = element.style;

        switch (element.type) {
            case "rectangle":
                if (element.fill) {
                    ctx.fillRect(element.x, element.y, element.width, element.height);
                } else {
                    ctx.strokeRect(element.x, element.y, element.width, element.height);
                }   
                break;
            case "text":
                if (element.fill) {
                    ctx.fillText(element.content, element.x, element.y);
                }

                if (element.stroke) {
                    ctx.strokeText(element.content, element.x, element.y);
                }
                break;
            case "image":
                if (!element.imageIndex) {
                    return log("(draw) Context 2D: Could not draw image. No index specified.");
                }

                var img = images[element.imageIndex];
                ctx.drawImage(img, element.x, element.y)
                break;
            default:
                break;
        }
    }   
    
    resetLog();
    } catch (error) {
        log("(draw) Error " + error);
    }
    
}

function settings(_FPS, _DEBUG, _CONTROLS, _COUNT) {
    asked_fps = 1000 / _FPS;
    showLog = _DEBUG;
    logControls = _CONTROLS;
    logCount = _COUNT;
}

function kickstart() {
    // Initialize

    //       FPS, DEBUG, LOG_CONTROLS, LOG_COUNT
    settings(30, true, false, 20);
    
    //                PATH WIDTH HEIGHT
    // initializeImage("", 000, 000);

    // START

    setInterval(draw, asked_fps);
    setInterval(function() {
        calculateFPS("second");
    }, 1000);
}

kickstart();
