const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

//css에서 설정한 캔버스 사이즈에 맞게 값 설정
canvas.width=700;
canvas.height = 700;

//캔버스 배경색 초기설정
ctx.fillStyle="white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//brunch color (Painting mode) 초기값
ctx.strokeStyle = "#2c2c2c";

//Fill mode 초기값
ctx.fillStyle="#2c2c2c";

//brunch sie 초기값
ctx.lineWidth= 2.5;

let painting = false; //마우스 클릭 여부
let fill = false; //mode

function onMouseMove(event){
	const x = event.offsetX;
	const y = event.offsetY;
	
	if(!painting){
		ctx.beginPath();
		ctx.moveTo(x,y); //path의 이전 위치 (라인37)
	}
	else{
		ctx.lineTo(x,y); //lineTo() -> path의 이전 위치에서 현재가리키고 있는 위치까지 선을 만들어줌
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

function colorClick(event){ //color설정
	const color = event.target.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}

Array.from(colors).forEach(color => color.addEventListener("click", colorClick)); //Array.from() -> Object를 array로 만듬

function rangeChange(event){ //brunch size설정
	const size = event.target.value;
	ctx.lineWidth = size;
}

if(range)
	range.addEventListener("input", rangeChange);

function modeClick(event){ // mode설정
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
	const img = canvas.toDataURL(); //toDataURL("image/확장자") -> 공백이면 default값인 png파일로 저장됨
	
	//JS에서 파일 save방법
	const link = document.createElement("a");
	link.href = img;
	link.download = "PaintJS";
	link.click();
}

if(saveBtn)
	saveBtn.addEventListener("click", handleSave);
