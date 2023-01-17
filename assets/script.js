
var form = document.querySelector("#citysearchform")
var formInput = document.querySelector("#citysearchinput")
var formButton = document.querySelector("#citysearchbutton")

function saveinput() {
    localStorage.setItem("SearchedCity",formInput.val);
}

addEventListener("click",formButton); {
    saveinput();
}


// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}