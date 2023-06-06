var forecast = document.getElementById("5-day-forecast")

function featchWeather(){
    var cityName = document.getElementById("search-city").value
    var APIKey = "6edb7b4c4ed6f470e643220fdd64ce9b"

fetch(       
    'https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=6edb7b4c4ed6f470e643220fdd64ce9b'
)
.then(function (response) {
    return response.json()
})    
.then(function (data) {
    console.log(data)
    for (var i = 0; i < 5; i++) {
        var dayContainer = document.createElement("div")
        var header = document.createElement("h2")
        var temp = document.createElement("p")

        header.textContent = "Day " + i
        temp.textContent = data.list[i].main.temp
        console.log(data.list[i].main.temp)

        dayContainer.setAttribute(
            "style",
            "background-color: purple; margin: 10px"
        )
            forecast.append(dayContainer)
            dayContainer.append(header)
            dayContainer.append(temp)
        }
})
}

document.querySelector("button").addEventListener("click", featchWeather)


