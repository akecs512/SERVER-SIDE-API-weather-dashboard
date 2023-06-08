var forecast = document.getElementById("forecast-cards")
var citySearchForm = document.getElementById("city-search")

if (citySearchForm) {
    citySearchForm.addEventListener("submit", fetchWeather)
}
function currentDayString(city, date, temp, wind, humidity, icon){
    console.log(icon)
    return `<h1>${city} ${date}</h1>
    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" height="50px" width="50px" alt="weather icon">
    <p>Temp: ${temp}&#176;F</p>
    <p>Wind: ${wind} MPH</p>
    <p>Humidity: ${humidity}%</p>
    `
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
            const currentDay = document.getElementById("city-info")
            const {list, city} = data
            const temp = list[0].main.temp
            console.log(currentDay)
            currentDay.innerHTML = currentDayString(city.name, "06/07/23", 100, 300, 400, "01d")
            
            for (var i = 1; i < 6; i++) {
                const dayContainer = document.createElement("div")
                const header = document.createElement("h2")
                const temp = document.createElement("p")

                header.textContent = "Day " + i
                temp.textContent = list[i].main.temp

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




