const city = document.querySelector('.city');
const icon = document.querySelector('.icon');
const description = document.querySelector('.description');
const temp = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const cityWeather = document.querySelector('.weather');
const searchBar = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-btn');

let weather = {
  "apiKey": "39a2922173caff994c7cf874897b3417",
  fetchWeather: function(city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" 
      + city + "&units=metric&appid=" 
      + this.apiKey
    )
    .then((response) => response.json())
    .then((data) => this.displayWeather(data));
  },
  displayWeather: function(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    city.innerText = "Weather in " + name;
    icon.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    description.innerText = description;
    temp.innerText = temp + '°c';
    humidity.innerText = 'Humidity: ' + humidity + '%';
    wind.innerText = 'Wind speed: ' + speed + 'km/h';
    cityWeather.classList.remove('loading');
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
  },
  search: function () {
    this.fetchWeather(searchBar.value);
  }
};

searchButton.addEventListener("click", function () {
  weather.search();
  searchBar.value = '';
});

document.querySelector('.search-bar').addEventListener("keyup", function (event) {
  if (event.key == 'Enter') {
    weather.search();
    searchBar.value = '';
  }
});

weather.fetchWeather('Lagos');