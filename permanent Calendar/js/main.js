var can;
var ctx;

var w;
var h;

var padLeft = 0;
var padTop = 0;

var bgWidth = document.getElementById("canvas").width;
var bgHeight = document.getElementById("canvas").height;

var deltaTime;
var lastTime;

var bgPic = new Image();
var starPic = new Image();

var stars = [];
var num = 30;

var alive = 0;

var switchy = false;
/*初始化画布*/
function init() {
	can = document.getElementById("canvas");
	ctx = can.getContext("2d");

	w = can.width;
	h = can.height;

    /*注册鼠标移动事件*/
	document.addEventListener('mousemove', mousemove, false);

	bgPic.src = "src/c.jpg";
	starPic.src = "src/star.png";

	for (var i = 0; i < num; i++) {
		stars[i] = new starObj();
		stars[i].init();
	}

	lastTime = Date.now();
	gameLoop();
}
/*动画刷新*/
function gameLoop() {
	window.requestAnimFrame(gameLoop);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;

	fillCanvas();
	drawGirl();

	drawStars();

	aliveUpdate();
}
/*绘制Canva画布样式*/
function fillCanvas() {
	ctx.fillStyle = "#393550";
	ctx.fillRect(0, 0, w, h);
}

/*将背景图片绘制到画布上*/
function drawGirl() {
	ctx.drawImage(bgPic, padLeft, padTop, bgWidth, bgHeight);
}
/*鼠标事件函数*/
function mousemove(e) {
	if (e.offsetX || e.layerX) {

		var px = e.offsetX == undefined ? e.layerX : e.offsetX;
		var py = e.offsetY == undefined ? e.layerY : e.offsetY;

		if (px > padLeft && px < (padLeft + bgWidth) && py > padTop && py < (padTop + bgHeight)) {
			switchy = true;
		} else {
			switchy = false;
		}
	}
}