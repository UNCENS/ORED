window.addEventListener("load", drawScreen, false);
window.addEventListener("keydown", pDown, false);
window.addEventListener("keyup", pUp, false);
window.addEventListener("mousedown", mDown, false);
window.addEventListener("mousemove", mMove, false);
window.addEventListener("mouseup", mUp, false);

var eType = null;
var eValue = null;
var mC = false;
var mX = 480;
var mY = 300;
var mS = "READY...";
var Game_STATE_READY = 0;
var Game_STATE_GAME = 1;
var Game_STATE_OVER = 2;
var GameState = Game_STATE_READY;
var ball = new Image();

ball.src = "ball.png";

var tempBall1 = {x:0, y:0, go_x:1, go_y:1};
var tempBall2 = {x:800, y:0, go_x:-1, go_y:1};
var tempBall3 = {x:800, y:600, go_x:-1, go_y:-1};
var tempBall4 = {x:0, y:600, go_x:1, go_y:-1};

var imgBackground = new Image();
imgBackground.src="background.jpg";
var imgPlayer = new Image();
imgPlayer.src = "player2.png";
imgPlayer.addEventListener("load", drawScreen, false);

function drawScreen()
{
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	var ch = theCanvas.getContext("2d");
	var mCh = theCanvas.getContext("2d");

	if(GameState==Game_STATE_READY)
	Context.fillText("用意", 470, 250);
	else if(GameState==Game_STATE_GAME)
	{
		Context.fillText("Go!", 300, 200);
		Context.drawImage(imgBackground, 0, 0, 1000, 700);
		ch.fillStyle = "#5EFFA2";
		ch.font = "24px namugothic";
		ch.textBaseline="top"
		//ch.fillText("입력한 키는 : "+eValue, 5, 5);
		//ch.fillText("이벤트는 : "+eType, 5, 30);
		mCh.fillStyle = "#7FFFFC4";
		mCh.font = "24px Arial";
		mCh.drawImage(imgPlayer, mX, mY);
		//mCh.fillText("mouse Event Type that Detected : "+mS, 5, 55);
		//mCh.fillText("mX : "+mX+" mY : "+mY, 5, 80);
		Context.drawImage(ball, tempBall1.x, tempBall1.y, 60, 60);
		Context.drawImage(ball, tempBall2.x, tempBall2.y, 60, 60);
		Context.drawImage(ball, tempBall3.x, tempBall3.y, 60, 60);
		Context.drawImage(ball, tempBall4.x, tempBall4.y, 60, 60);
	}
	else if(GameState==Game_STATE_OVER)
	{
		Context.font = "60 NanumGothicCoding";
		Context.fillText("GAME OVER", 400, 300);
	}
}
function pDown(e)
{
	if(GameState == Game_STATE_READY)
	{
		if(e.keyCode == 13)
		{
			GameState = Game_STATE_GAME;
			onGameStart();
		}
	}
	else if(GameState == Game_STATE_GAME)
	{
		switch(e.keyCode)
		{
			case 37:
				mX = (mX<=-10)?880:mX-10;
				break;
			case 39:
				mX = (mX>=880)?-10:mX+10;
				break;
			case 38:
				mY = (mY<=0)?570:mY-10;
				break;
			case 40:
				mY = (mY>=570)?0:mY+10;
				break;
		}
	}
	else if(GameState == Game_STATE_OVER)
	{
		if(e.keyCode == 13) GameState = Game_STATE_READY;
	}
	drawScreen();
}
function pUp(e)
{
	/*eType = e.type;
	if(e.keyCode)eValue = e.keyCode;
	drawScreen();*/
}
function mDown(e)
{
	mS = "Clicked";
	var theCanvas = document.getElementById("GameCanvas");
	mC = true;
	mX = e.clientX - theCanvas.offsetLeft-42;
	mY = e.clientY - theCanvas.offsetTop-50;
	drawScreen();
}
function mUp(e)
{
	mS = "ENDED";
	mC = false;
	mX = 480;
	mY = 300;
	drawScreen();
}
function mMove(e)
{
	mS = "MOVING";
	if(mC)
	{
		var theCanvas = document.getElementById("GameCanvas");
		mX = e.clientX - theCanvas.offsetLeft - 42;
		mY = e.clientY - theCanvas.offsetTop - 50;
		drawScreen();
	}
}
function onGameStart()
{
	intervalID = setInterval(MoveBall, 100);
}
function MoveBall()
{
	tempBall1.x += tempBall1.go_x * 10;
	tempBall1.y += tempBall1.go_y * 10;
	tempBall2.x += tempBall1.go_x * 10;
	tempBall2.y += tempBall1.go_y * 10;
	tempBall3.x += tempBall1.go_x * 10;
	tempBall3.y += tempBall1.go_y * 10;
	tempBall4.x += tempBall1.go_x * 10;
	tempBall4.y += tempBall1.go_y * 10;
	
	drawScreen();
}