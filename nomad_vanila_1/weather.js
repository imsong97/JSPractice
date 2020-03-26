const weatherCont = document.querySelector(".js-weather");
const API_KEY = "241051bf13976dd3ddf8b8d9f247255e";

const COORDS = 'coords';

function getWeather(lat, lon){
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
		).then(function(response){ //then(function) -> 데이터가 완전히 들어왔을 때 function실행
			return response.json();
		}).then(function(json){
			const temp = json.main.temp;
			const place = json.name;
			weatherCont.innerText = `${temp}℃ @ ${place}`;
		});
}

function handleSuccess(position){
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;

	const coordsObj = {
		latitude: latitude,
		longitude: longitude
		//객체안에 변수이름과 key이름이 같을경우 latitude, longitude 라고만 해도 됨
	};
	saveCoords(coordsObj);
	getWeather(latitude, longitude);
}

function handleError(){

}

function askForCoords(){
	navigator.geolocation.getCurrentPosition(handleSuccess, handleError); //api사용
}

function saveCoords(coordsObj){
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function loadCoords(){
	const loadCords = localStorage.getItem(COORDS);
	if(loadCords === null)
		askForCoords();
	else{
		const parseCoords = JSON.parse(loadCords);
		getWeather(parseCoords.latitude, parseCoords.longitude);
	}
}

function init(){
	loadCoords();
}

init();
