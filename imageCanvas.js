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
	Context.drawImage(imgBackground, 0, 0, 1000, 700);
	ch.fillStyle = "#5EFFA2";
	ch.font = "24px namugothic";
	ch.textBaseline="top"
	ch.fillText("입력한 키는 : "+eValue, 5, 5);
	ch.fillText("이벤트는 : "+eType, 5, 30);
	mCh.fillStyle = "#7FFFFC4";
	mCh.font = "24px Arial";
	mCh.drawImage(imgPlayer, mX, mY);
	mCh.fillText("mouse Event Type that Detected : "+mS, 5, 55);
	mCh.fillText("mX : "+mX+" mY : "+mY, 5, 80);
}
function pDown(e)
{
	eType = e.type;
	if(e.keyCode)eValue = e.keyCode;
	eValue = String.fromCharCode(eValue);
	drawScreen();
}
function pUp(e)
{
	eType = e.type;
	if(e.keyCode)eValue = e.keyCode;
	drawScreen();
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