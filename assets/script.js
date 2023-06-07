var forecast = document.getElementById("forecast-cards")
var citySearchForm = document.getElementById("city-search")

if (citySearchForm) {
    citySearchForm.addEventListener("submit", fetchWeather)
}

function fetchWeather(event) {
    event.preventDefault()
    const APIKey = "6edb7b4c4ed6f470e643220fdd64ce9b"
    const data = new FormData(citySearchForm)
    const cityName = data.get("city")

    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${APIKey}`
    )
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            for (var i = 1; i < 6; i++) {
                var dayContainer = document.createElement("div")
                var header = document.createElement("h2")
                var temp = document.createElement("p")

                header.textContent = "Day " + i
                temp.textContent = data.list[i].main.temp

                dayContainer.setAttribute(
                    "class",
                    "col card bg-info"
                )
                forecast.append(dayContainer)
                dayContainer.append(header)
                dayContainer.append(temp)
            }
        })
}




