// -----today--------//
const todayName = document.getElementById("todayName");
const todayNumder = document.getElementById("todayNumder");
const todayMonth = document.getElementById("todayMonth");
const todayLocation = document.getElementById("todayLocation");
const todayTemp = document.getElementById("todayTemp");
const todayIcone = document.getElementById("todayIcone");
const todayText = document.getElementById("todayText");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const windDirection = document.getElementById("windDirection");
//-------nextday--------//
const nextDay = document.getElementsByClassName("nextDay");
const nextIcon = document.getElementsByClassName("nextIcon");
const nextMaxTemp = document.getElementsByClassName("nextMaxTemp");
const nextMinTemp = document.getElementsByClassName("nextMinTemp");
const nextDayText = document.getElementsByClassName("nextDayText");
//console.log(nextDay,nextIcon,nextMaxTemp,nextMinTemp,nextDayText)
 const searchInput=document.getElementById("searchInput")
async function getWeather(cityName) {
  let weaterResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4bfd91a144fe473ea79143512241801&q=${cityName}&days=3` );
  let weatherData = await weaterResponse.json();
  console.log(weatherData);
  return weatherData;
}
function displayData(data) {
  let dataToday= new Date()
  todayNumder.innerHTML=dataToday.getDate()
  todayName.innerHTML= dataToday.toLocaleDateString('en-us',{ weekday:"long"})
  todayMonth.innerHTML= dataToday.toLocaleDateString('en-us',{ month:"long"})
  todayLocation.innerHTML = data.location.name;
  todayTemp.innerHTML = data.current.temp_c + "<sup>o</sup>C";
  todayIcone.setAttribute("src", data.current.condition.icon);
  todayText.innerHTML = data.current.condition.text;
  humidity.innerHTML = data.current.humidity + "%";
  wind.innerHTML = data.current.wind_kph + " km/h";
  windDirection.innerHTML = data.current.wind_dir;
}
function displayNextData(data){
  for(let i=0; i<2;i++){
    let nextDayData= new Date(data.forecast.forecastday[i+1].date)
    nextDay[i].innerHTML=nextDayData.toLocaleDateString('en-us',{weekday:"long"})
   nextIcon[i].setAttribute("src", data.forecast.forecastday[i+1].day.condition.icon)
  nextMaxTemp[i].innerHTML=  data.forecast.forecastday[i+1].day.maxtemp_c + "<sup>o</sup>C"
  nextMinTemp[i].innerHTML=  data.forecast.forecastday[i+1].day.mintemp_c + "<sup>o</sup>C"
  nextDayText[i].innerHTML=  data.forecast.forecastday[i+1].day.condition.text
  }
}

async function allColl(city="cairo") {
  let getWeatherData = await getWeather(city);
  displayData(getWeatherData);
  displayNextData(getWeatherData)
}
allColl();
searchInput.addEventListener('input',function(){
  allColl(searchInput.value)
})