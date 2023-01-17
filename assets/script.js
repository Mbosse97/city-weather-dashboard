// take data from search and run it thourhgn open weather API                   DONE
// take output of weather api and display it on the page on a large icon              DONE
// take output and give a 5 day weather reading                 DONE
// save searched cities in local storage
// create searchhistory under searchbar from cities saved in local storage
var form = document.querySelector("#citysearchform")
var formInput = document.querySelector("#citysearchinput")
var formButton = document.querySelector("#citysearchbutton")

form.addEventListener("submit", function(event){
    event.preventDefault()
    getcoords(formInput.value)
})

formButton.addEventListener("click", function(event){
    event.preventDefault()
    getcoords(formInput.value)
})

// takes latitude and longitude from weather api
var getcoords = function(cityname){
    apiurl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&appid=a9b4868a25a742d459f16afd1c7dc03b`
    fetch(apiurl)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        var lat = data[0].lat
        var lon = data[0].lon
        generateWeather(lat, lon)
    })
    .catch(function(){
        console.log("bad input")
    })
}


var generateWeather = function(lat, lon){
    apiurl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=a9b4868a25a742d459f16afd1c7dc03b&units=metric`
    fetch(apiurl)
    .then(function(response){
        return response.json()
    })

    // this section will clear the existing weather data on the page
    .then(function(data){
        var clearWeatherCard = document.querySelector(".largeWeatherCard")
        if(clearWeatherCard !== null){
            clearWeatherCard.remove()
        }

        var clearWeather = document.querySelector(".weather")
        if(clearWeather !== null){
            clearWeather.remove()
        }

        var clearFiveDay = document.querySelector(".fiveDayWeather")
        if(clearFiveDay !== null){
            clearFiveDay.remove()
        }

    //following code will add the weather cards
        var dataDisplay = document.querySelector(".weatherdata")

        var largeCard = document.createElement("div")
        largeCard.classList.add("card", "largeWeatherCard")
        largeCard.setAttribute("style", " margin-bottom: 2% ; margin-top: 2%")
        dataDisplay.appendChild(largeCard)

        var largeCardDetails = document.createElement("div")
        largeCardDetails.classList.add("card-body")
        largeCardDetails.setAttribute("style", "padding-bottom: 0 ; margin-right: 0% ; width: 100%")
        largeCard.appendChild(largeCardDetails)

        var dateSymbol = document.createElement("div")
        dateSymbol.setAttribute("style", "width: 100% ; padding-bottom: 2% ; display: flex")
        dateSymbol.classList.add("align-items-center")
        largeCardDetails.appendChild(dateSymbol)

        var weatherDate = document.createElement("h3")
        weatherDate.textContent = `${data.city.name} (${data.list[0].dt_txt.substring(8, 10)}/${data.list[0].dt_txt.substring(5, 7)}/${data.list[0].dt_txt.substring(0, 4)})`
        weatherDate.setAttribute("style", "margin: 0")
        dateSymbol.appendChild(weatherDate)

        var icon = document.createElement("img")
        icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`)
        icon.setAttribute("style", "width: 3rem ; height: 3rem")
        icon.alt = "weather-icon"
        dateSymbol.appendChild(icon)

        var weatherinfo = document.createElement("p")
        weatherinfo.textContent = `Temp: ${data.list[0].main.temp}°`
        largeCardDetails.appendChild(weatherinfo)

        var weatherinfo = document.createElement("p")
        weatherinfo.textContent = `Humidity: ${data.list[0].main.humidity}%`
        largeCardDetails.appendChild(weatherinfo)

        var weatherinfo = document.createElement("p")
        weatherinfo.textContent = `Wind speed: ${data.list[0].wind.speed}kmph`
        largeCardDetails.appendChild(weatherinfo)

        var fivedayforecast = document.createElement("h4")
        fivedayforecast.classList.add("fiveDayWeather")
        fivedayforecast.textContent = "5-Day Forecast:"
        dataDisplay.appendChild(fivedayforecast)

        var weather = document.createElement("div")
        weather.classList.add("weather")
        weather.setAttribute("style", "display: flex ; justify-content: space-between ; margin-top: 1%")
        dataDisplay.appendChild(weather)

        for (var i=8; i<=40 ; i= i+8){ 
            if (i === 40){
                i = 39
            }
            
            var weatherCard = document.createElement("div")
            weatherCard.classList.add("card", "smallcard")
            weatherCard.setAttribute("style", "width: 17.5%")
            weather.appendChild(weatherCard)

            var weatherCardBody = document.createElement("div")
            weatherCardBody.classList.add("card-body", "smallcard")
            weatherCardBody.setAttribute("style", "padding-bottom: 0 ; margin-right: 0%")
            weatherCard.appendChild(weatherCardBody)

            var weatherDate = document.createElement("h5")
            weatherDate.textContent = `${data.list[i].dt_txt.substring(8, 10)}/${data.list[i].dt_txt.substring(5, 7)}/${data.list[i].dt_txt.substring(0, 4)}`
            weatherCardBody.appendChild(weatherDate)

            var icon = document.createElement("img")
            icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`)
            icon.setAttribute("style", "width: 4rem ; height: 4rem")
            icon.alt = "weather-icon"
            weatherCardBody.appendChild(icon)

            for (prop in data.list[i].main){
                if (prop === "temp"){
                    var weatherinfo = document.createElement("p")
                    weatherinfo.textContent = `Temp: ${data.list[i].main[prop]}°`
                    weatherCardBody.appendChild(weatherinfo)
                }
                if (prop === "humidity"){
                    var weatherinfo = document.createElement("p")
                    weatherinfo.textContent = `Humidity: ${data.list[i].main[prop]}%`
                    weatherCardBody.appendChild(weatherinfo)
                }
            }
            var weatherinfo = document.createElement("p")
            weatherinfo.textContent = `Wind speed: ${data.list[i].wind.speed}kmph`
            weatherCardBody.appendChild(weatherinfo)
        
            if (i === 39){
                i = 41
            }
        }  
        saveCity(data.city.name)
        generateHistory()
    })
    .catch(function(){
        console.log("bad input")
    })
}