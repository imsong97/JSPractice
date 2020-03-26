const todoForm = document.querySelector(".js-todo"), 
	todoInput = todoForm.querySelector("input"), todoList = document.querySelector(".js-todoList");

const TODO_LS = "todo"

let todos = [];

function loadTodo(){
	const loadedTodo = localStorage.getItem(TODO_LS);
	if(loadedTodo !==null){
		const parsedTodo = JSON.parse(loadedTodo); //saveTodo에서 string으로 변환된 object를 다시 원래대로 바꿔줌
		parsedTodo.forEach(function(todo){ //라인56
			paintTodo(todo.text);
		})
	}
}

function paintTodo(text) {
	const li = document.createElement("li");
	const btnDelete = document.createElement("button"); //HTML에 버튼태그 추가
	const newId = todos.length+1;
	btnDelete.innerText = "X";
	btnDelete.addEventListener("click", deleteTodo); //삭제 기능
	const span = document.createElement("span"); //HTML에 span태그 추가
	span.innerText = text; //span태그로 리스트 작성
	li.appendChild(span); //li태그의 자식요소로 span태그
	li.appendChild(btnDelete); //li태그의 자식요소로 button태그
	li.id = newId; //li 삭제를 용이하게 하기 위해 id값을 할당
	todoList.appendChild(li); //todoList안에 리스트 작성

	const todoObj = {
		text: text,
		id: newId
	}
	todos.push(todoObj);
	saveTodo();
}

function handleSubmit(event) {
	event.preventDefault();
	const currentValue = todoInput.value;
	paintTodo(currentValue);
	todoInput.value = "";
}

function saveTodo(){ //로컬저장소에 저장하기 위한 함수, string만 저장가능
	localStorage.setItem(TODO_LS, JSON.stringify(todos));  //JSON.stringify -> object를 string으로 바꿔줌
}

function deleteTodo(){
	const btn = event.target;
	const li = btn.parentNode; //해당 li를 지우기 위해 id값을 변수에 저장
	todoList.removeChild(li); //해당 id를 가진 li를 삭제

	const cleanTodo = todos.filter(function(todo){ 
		//filter(function) & forEach(function) -> 리스트 또는 배열에 있는 모든 item들을 위한 함수(실행)
		//filter -> true값인 item만 return
		return todo.id !== parseInt(li.id);
	});
	todos = cleanTodo;
	saveTodo();
}

function init() {
	loadTodo();
	todoForm.addEventListener("submit", handleSubmit);
}

init();
