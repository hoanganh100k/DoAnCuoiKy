const width = 1000;
const height = 600;
var posY = height - 150 - 50;
var posX = 100;
var gravity = 100;
const backgroundPos = posY + 50;
var IdleAmin;
var sprIdle;
var keyCheck = 0;
var checkStart = false;


function preload() {
    // loads all the image files
    IdleAmin = loadAnimation('./img/Idle (1).png', './img/Idle (2).png', './img/Idle (3).png', './img/Idle (4).png', './img/Idle (5).png', './img/Idle (6).png', './img/Idle (7).png', './img/Idle (8).png', './img/Idle (9).png', './img/Idle (10).png');
    RunAmin = loadAnimation('./img/Run (1).png', './img/Run (2).png', './img/Run (3).png', './img/Run (4).png', './img/Run (5).png', './img/Run (6).png', './img/Run (7).png', './img/Run (8).png');
    JumpAmin = loadAnimation('./img/Jump (1).png', './img/Jump (2).png', './img/Jump (3).png', './img/Jump (4).png', './img/Jump (5).png', './img/Jump (6).png', './img/Jump (7).png', './img/Jump (8).png', './img/Jump (9).png', './img/Jump (10).png', './img/Jump (11).png', './img/Jump (12).png');
    bgDonw = loadImage('./img/background.jpg');
    imgBgDown = loadImage('./img/base.png');
}

function setup() {
    createCanvas(width, height);
    //Idle animation
    IdleAmin.frameDelay = 2;
    sprIdle = createSprite(posX, posY)
    sprIdle.scale = 0.3;
    sprIdle.debug = true;
    sprIdle.addAnimation('Idle', IdleAmin);
    //Run animation
    sprRun = createSprite(posX, posY)
    sprRun.scale = 0.3;
    sprRun.debug = true;
    sprRun.addAnimation('Run', RunAmin);
    //Jump animation
    sprJump = createSprite(posX, posY)
    sprJump.scale = 0.3;
    sprJump.debug = true;
    sprJump.addAnimation('Jump', JumpAmin);

}

function draw() {
    background(bgDonw);
    
    image(imgBgDown, 0, backgroundPos, width, 150);
    if (keyCheck != 38 && checkStart == true) {
        sprRun.position.y = posY;
        sprRun.position.x = posX;
        drawSprite(sprRun)

    } else if (keyCheck == 38 && checkStart == true) {
        sprJump.position.y = posY;
        sprJump.position.x = posX;
        drawSprite(sprJump);
    } else {
        sprIdle.position.y = posY;
        sprIdle.position.x = posX;
        drawSprite(sprIdle);
    }
}

document.onkeydown = checkKey;
var flag = true;
function checkKey(e) {
    e = e || window.event;
    const temp = posY;
    keyCheck = e.keyCode;
    if (e.keyCode == '38' && flag == true) {
        // up arrow
        flag = false;
        checkStart = true;
        const JumpUp = setInterval(() => {
            if (posY > temp - 100) {
                posY -= 15;
            } else {
                const JumpDown = setInterval(() => {
                    if (posY < temp) {
                        posY += 15;
                    } else {
                        posY = temp;
                        flag = true;
                        clearInterval(JumpDown);
                    }
                    clearInterval(JumpUp);
                }, gravity)
            }
        }, gravity)
    }else{
        checkStart = true;
    }
}
document.onkeyup = function () {
    keyCheck = -1;
}

