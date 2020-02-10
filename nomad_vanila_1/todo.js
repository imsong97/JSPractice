const todoForm = document.querySelector(".js-todo"), 
	todoInput = todoForm.querySelector("input"), todoList = document.querySelector(".js-todoList");

const TODO_LS = "todo"

let todos = [];

function loadTodo(){
	const loadedTodo = localStorage.getItem(TODO_LS);
	if(loadedTodo !==null){
		const parsedTodo = JSON.parse(loadedTodo); //saveTodo에서 string으로 변환된 object를 다시 원래대로 바꿔줌
		parsedTodo.forEach(function(todo){
			paintTodo(todo.text);
		})
	}
}

function paintTodo(text) {
	const li = document.createElement("li");
	const btnDelete = document.createElement("button");
	const newId = todos.length+1;
	btnDelete.innerText = "X";
	btnDelete.addEventListener("click", deleteTodo);
	const span = document.createElement("span");
	span.innerText = text;
	li.appendChild(span);
	li.appendChild(btnDelete);
	li.id = newId;
	todoList.appendChild(li);

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
	const li = btn.parentNode;
	todoList.removeChild(li);

	const cleanTodo = todos.filter(function(todo){ //filter함수&forEach함수 -> 리스트에 있는 모든 item들을 위한 함수(실행)
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