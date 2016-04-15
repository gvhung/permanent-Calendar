var starObj = function() {
	this.x;
	this.y;

	this.ySpd;

	this.picNo;

	this.timer;

	this.beta;
}
/*星星位置初始化*/
starObj.prototype.init = function() {
	this.x = Math.random() * bgWidth + padLeft;
	this.y = Math.random() * bgHeight + padTop;

    /*移动速度*/
	this.ySpd = Math.random() * 0.6 - 0.3; //[0,2) [-1, 1)
	this.xSpd = Math.random() * 0.2 - 0.1; //[0,2) [-1, 1)

	this.picNo = Math.floor(Math.random() * 7);
	this.timer = 0;

	this.beta = Math.random() * Math.PI * 0.5;
}
/*星星刷新*/
starObj.prototype.update = function() {
	this.xSpd = Math.random() * 0.2 - 0.1; //[0,2) [-1, 1)
	this.x += this.xSpd;
	this.y += this.ySpd;

	if (this.x > (padLeft + bgWidth) || this.x < (padLeft - 10))
		this.init();
	else if (this.y > (padTop + bgHeight) || this.y < (padTop - 10))
		this.init();

	this.timer += deltaTime;
	if (this.timer > 30) {
		this.picNo += 1;
		this.picNo %= 7;
		this.timer = 0;
	}
}
/*星星绘制*/
starObj.prototype.draw = function() {
	this.beta += deltaTime * 0.005;
    /*用来保存Canvas的状态。save之后，可以调用Canvas的平移、放缩、旋转、错切、裁剪等操作。*/
	ctx.save();
    // 调节透明度
	ctx.globalAlpha = Math.sin(this.beta) * alive;
	console.log(alive);
	console.log(ctx.globalAlpha);
	ctx.drawImage(starPic, this.picNo * 7, 0, 7, 7, this.x, this.y, 7, 7);
    /*用来恢复Canvas之前保存的状态。防止save后对Canvas执行的操作对后续的绘制有影响。*/
	ctx.restore();
}


/*星星绘制到画布上*/
function drawStars() {
	for (var i = 0; i < num; i++) {
		stars[i].update();
		stars[i].draw();
	}
}
/*星星移动*/
function aliveUpdate() {
	if (switchy) {
		alive += 0.03;
		if (alive > 0.7) {
			alive = 0.7;
		}
	} else {
		alive -= 0.03;
		if (alive < 0) {
			alive = 0;
		}
	}
}