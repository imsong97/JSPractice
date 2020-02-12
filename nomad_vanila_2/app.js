const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

canvas.width=700;
canvas.height = 700;

//캔버스 배경색 초기설정
ctx.fillStyle="white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle="#2c2c2c";
ctx.lineWidth= 2.5;

let painting = false;
let fill = false;

function onMouseMove(event){
	const x = event.offsetX;
	const y = event.offsetY;
	if(!painting){
		ctx.beginPath();
		ctx.moveTo(x,y);
	}
	else{
		ctx.lineTo(x,y);
		ctx.stroke();
	}
}

function onMouseDown(event){
	painting = true; 
}

function startPainting(){
	painting = true;
}

function stopPainting(){
	painting = false;
}

function canvasClick(){
	if(fill)
		ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function handleCM(event){ //우클릭 방지
	event.preventDefault();
}

if(canvas){
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mouseleave", stopPainting);
	canvas.addEventListener("click", canvasClick);
	canvas.addEventListener("contextmenu", handleCM);
}

function colorClick(event){
	const color = event.target.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}

Array.from(colors).forEach(color => color.addEventListener("click", colorClick));

function rangeChange(event){
	const size = event.target.value;
	ctx.lineWidth = size;
}

if(range)
	range.addEventListener("input", rangeChange);

function modeClick(event){
	if(fill === true){
		fill = false;
		mode.innerText = "Fill";
	}
	else{
		fill = true;
		mode.innerText = "Paint";
	}
}

if(mode)
	mode.addEventListener("click", modeClick);

function handleSave(){
	const img = canvas.toDataURL();
	const link = document.createElement("a");
	link.href = img;
	link.download = "PaintJS";
	link.click();
}

if(saveBtn)
	saveBtn.addEventListener("click", handleSave);