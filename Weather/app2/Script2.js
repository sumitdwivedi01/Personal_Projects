const apiKey ="63f7153fcc60f312254910ef0514046d";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
let input = document.getElementById("cityInput");
let city;
let weathericon=document.querySelector(".Weather-icon");


async function checkWeather(city) {
    const response = await fetch(apiUrl + city +`&appid=${apiKey}`);
    var data = await response.json();
    if(response.status==404){
        weathericon.src="/images/error.svg";
        document.querySelector(".error").style.display = `block`;
        document.querySelector(".city").innerHTML=`unavailable`;
        document.querySelector(".temp").innerHTML=`-- °C`;
        document.querySelector(".humidity").innerHTML=`-- %`;
        document.querySelector(".wind").innerHTML=`-- Km/h`;
    }
    else{

        document.querySelector(".error").style.display = `none`;
        console.log(data);
        
        document.querySelector(".city").innerHTML=data.name;
        document.querySelector(".temp").innerHTML=`${Math.round(data.main.temp)}°C`;
        document.querySelector(".humidity").innerHTML=`${Math.round(data.main.humidity)}%`;
        document.querySelector(".wind").innerHTML=`${Math.round(data.wind.speed)}Km/h`;
        
        if(data.weather[0].main=="Clear"){
            weathericon.src="/images/clear.png";
        }
        else if(data.weather[0].main=="Clouds"){
            weathericon.src="/images/clouds.png";
            
        }
        else if(data.weather[0].main=="Rain"){
            weathericon.src="/images/rain.png";
        }
        else if(data.weather[0].main=="Drizzel"){
            weathericon.src="/images/drizzel.png";
        }
        else if(data.weather[0].main=="Mist"){
            weathericon.src="/images/mist.png";
        }
        else if(data.weather[0].main=="Snow"){
            weathericon.src="/images/snow.png";
        }
        
    }
    
    
}
// main->temp
//wind ->speed
//main->humidity
//weather -> main : clear couldy rain etc

document.getElementById("searchBtn").addEventListener("click", ()=>{
    city=input.value.trim();
        if(city){
            try {
                checkWeather(city);
            } catch (error) {
                console.log(error);
            }
        }
        else{
            alert("please fill the city name first");
        }
    });