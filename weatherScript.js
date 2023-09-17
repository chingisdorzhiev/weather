const cityElement = document.getElementById("city");
const searchBtn = document.getElementById("search-btn");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const temp = document.getElementById("temp");
const mainPicture = document.getElementById("main-picture");
const cityName = document.getElementById("cityName");
const description = document.getElementById("description");
const errorMessage = document.getElementById("error-message");

const apiKey = "b0b85f0f94663a80556cc6c3ec5dd1e9";
let city = "London";
let weather;

async function getWeather(city) {
  let responce = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`
  );
  weather = await responce.json();

  if (responce.status == 404) {
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");
  }

  temp.innerHTML = `${Math.round(weather.main.temp)}°C`;
  cityName.innerHTML = weather.name;
  humidity.innerHTML = `${weather.main.humidity}%`;
  wind.innerHTML = `${weather.wind.speed} km/h`;
  description.innerHTML = weather.weather[0].description;

  changePicture(weather);
  console.log(weather);
}

function changePicture(weather) {
  switch (weather.weather[0].main) {
    case "Clear":
      mainPicture.src = "icons/sun.png";
      break;
    case "Clouds":
      mainPicture.src = "icons/cloud.png";
      break;
    case "Rain":
      mainPicture.src = "icons/raining.png";
      break;
    case "Drizzle":
      mainPicture.src = "icons/rain-drops.png";
      break;
    case "Extreme":
      mainPicture.src = "storm/raining.png";
      break;
    default:
      mainPicture.src = "icons/sun.png";
      break;
  }
}

searchBtn.onclick = () => {
  city = cityElement.value;
  getWeather(city);
};

getWeather(city);
