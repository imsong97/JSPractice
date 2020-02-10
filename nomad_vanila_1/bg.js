const body = document.querySelector("body");

const imgNum = 3;

function paintImg(imageNum){
	const image = new Image();
	image.src = `${imageNum+1}.jpg`;
	image.classList.add('bgImage'); //css에서 제어
	body.prepend(image);
}

function genRandom(){
	const num = Math.floor(Math.random()*3); //floor -> 내림 / ceil -> 올림
	return num;
}

function init(){
	const randomNum = genRandom();
	paintImg(randomNum);
}

init();