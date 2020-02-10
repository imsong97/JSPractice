const form = document.querySelector(".js-form"),
	input = form.querySelector("input"), greeting = document.querySelector(".js-greeting");
const USER_LS = "currentUser", SHOWING = "showing"; //css에서 제어

function paintGreeting(text) {
	form.classList.remove(SHOWING);
	greeting.classList.add(SHOWING);
	greeting.innerText = `Hello ${text}`;
}

function handleSubmit(event){
	event.preventDefault();
	const currentValue = input.value;
	paintGreeting(currentValue);
	saveName(currentValue);
}

function askName(){
	form.classList.add(SHOWING);
	form.addEventListener("submit", handleSubmit);
}

function saveName(text){
	localStorage.setItem(USER_LS,text);
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