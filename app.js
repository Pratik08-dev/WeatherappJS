//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const weatherApi={
    key: "3d40a95e77153cd720c7b185d6ecc4c3",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox = document.getElementById('input-box');

//Event listener function on keypress
searchInputBox.addEventListener('keypress', (event) => 
{
    if(event.keyCode == 13 ){
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
    }
});

//Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

//Show Weather Report
function showWeatherReport(weather){
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil
    (weather.main.temp_max)}&deg;C (max)`;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText=dateManage(todayDate);

    if(weatherType.textContent == 'Clear'){
        document.body.style.backgroundImage = "url('img/Asunny.png')"; 
    }    
    else if(weatherType.textContent == "Clouds"){
        document.body.style.backgroundImage = "url('img/Acloud.png')";
    }
    else if(weatherType.textContent == "Rain"){
        document.body.style.backgroundImage = "url('img/Arain.png')";
    }
    else if(weatherType.textContent == "Snow"){
        document.body.style.backgroundImage = "url('img/Asnow.png')";
    }
    else if(weatherType.textContent == "Thunderstorm"){
        document.body.style.backgroundImage = "url('img/Athunderstorm.png')";
    }
    else if(weatherType.textContent == "Haze"){
        document.body.style.backgroundImage = "url('img/Ahaze.png')";
    }
}
//Date Usage
function dateManage(dateArg){

    let days = ["sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August",
    "Septmber", "Octomber", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    //let time= time[dateArg.getTime()];

    return `${date} ${month} ${day} , ${year}`;
}