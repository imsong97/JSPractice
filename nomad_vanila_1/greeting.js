const form = document.querySelector(".js-form"),
	input = form.querySelector("input"), greeting = document.querySelector(".js-greeting");
const USER_LS = "currentUser", SHOWING = "showing"; //css에서 제어

function paintGreeting(text) {
	//classList -> add, remove, contains등의 함수를 제어
	form.classList.remove(SHOWING); //form을 가지고있는 HTML태그에 css의 showing을 적용, form태그 삭제
	greeting.classList.add(SHOWING); //greeting을 가지고있는 HTML태그에 ~ , h4태그 활성화
	greeting.innerText = `Hello ${text}`;
}

function handleSubmit(event){
	event.preventDefault(); // 엔터키를 누르면 input값이 사라지는 기본속성을 막음
	const currentValue = input.value; //변수에 input값이 저장
	paintGreeting(currentValue);
	saveName(currentValue);
}

function askName(){
	form.classList.add(SHOWING);
	form.addEventListener("submit", handleSubmit); //엔터키를 누르면 이벤트 발생
}

function saveName(text){
	localStorage.setItem(USER_LS,text); //새로고침을 하면 사라지므로 로컬스토리지에 저장
}

function loadName(){
	const currentUser = localStorage.getItem(USER_LS);
	if(currentUser === null)	
		askName();
	else
		paintGreeting(currentUser);
}

function init(){
	loadName();
}

init();
