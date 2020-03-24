var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var toDraw = []; // {type: "", x: , y: , width: , height: , stroke: , fill: , style: , content: }
var showLog = false;
var _log = [];
var asked_fps;
var controls = [];
var logControls = false;

document.onkeydown = function (e) {
    var exits = false;
    controls.forEach(control => {
        if (control == e.key) {
            exists = true;
        }
    })

    if (!exits) {
        controls.push(e.key);
    }

    /*switch (e.key) {
        case "F10": {
            canvas.requestFullscreen();
            break;
        }
        case "ArrowRight": {
            controls[0] = true;
            break;
        }
        case "ArrowLeft": {
            controls[1] = true;
            break;
        }
        case "ArrowUp": {
            controls[2] = true;
            break;
        }
        case "ArrowDown": {
            controls[3] = true;
            break;
        }
    }*/
}

document.onkeyup = function (e) {
    controls.forEach(control => {
        if (control == e.key) {
            controls.splice(controls.indexOf(control), controls.indexOf(control));
        }
    })
    /*switch (e.key) {
        case "ArrowRight": {
            controls[0] = false;
            break;
        }
        case "ArrowLeft": {
            controls[1] = false;
            break;
        }
        case "ArrowUp": {
            controls[2] = false;
            break;
        }
        case "ArrowDown": {
            controls[3] = false;
            break;
        }
    }*/
}

function log(str) {
    _log.unshift(str);
}

function resetLog() {
    if (!showLog) return;

    if (_log.length > 20) {
        _log.splice(21, _log.length - 21)
    }

    ctx.fillStyle = "black";
    
    for (let i = 0; i < _log.length; i++) {
        const e = _log[i];
        ctx.fillText(e, 5, (i * 7) + 15);
    }
}

function initializeImage(path) {
    log("(kickstart) initializeImage: Image " + path);
    var img = new Image();
    img.src = path;
}

function initialize() {
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
                console.log("text");
                if (element.fill) {
                    ctx.fillText(element.content, element.x, element.y);
                }

                if (element.stroke) {
                    ctx.strokeText(element.content, element.x, element.y);
                }
            default:
                break;
        }
    }   
    
    resetLog();
}

function settings(_FPS, _DEBUG, _CONTROLS) {
    asked_fps = 1000 / _FPS;
    showLog = _DEBUG;
    logControls = _CONTROLS;
}

function kickstart() {
    // Initialize

    //       FPS DEBUG LOG_CONTROLS
    settings(30, true, false);
    
    //                PATH
    // initializeImage("");

    // START

    setInterval(draw, asked_fps);
    setInterval(function() {
        calculateFPS("second");
    }, 1000);
}

kickstart();
