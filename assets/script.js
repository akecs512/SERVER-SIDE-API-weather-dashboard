var forecast = document.getElementById("forecast-cards")
var citySearchForm = document.getElementById("city-search")

if (citySearchForm) {
    citySearchForm.addEventListener("submit", fetchWeather)
}
function currentDayString(city, date, temp, wind, humidity, icon){
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
            const cityInfo = document.getElementById("city-info")
            const {list, city} = data
            const temp = list[0].main.temp
            const wind = list[0].wind.speed
            const humidity = list[0].main.humidity
            cityInfo.innerHTML = currentDayString(city.name, "06/07/23", temp, wind, humidity, "01d")
            console.log(list)

            let currentDay;
            
            //40 is the number of items in the list from openweathermap.org
            for (var i = 1; i < 40; i++) {
                const dayContainer = document.createElement("div")
                const {weather, wind, main, dt_txt} = list[i]
                const icon = weather[0].icon 
                const day = dayjs(dt_txt).format("ddd")
           

                if (!currentDay || day != currentDay){
                    currentDay = day
                    dayContainer.setAttribute(
                        "class",
                        "col card bg-info"
                    )
                    forecast.append(dayContainer)
                    dayContainer.innerHTML = currentDayString("Day ",  day, main.temp, wind.speed, main.humidity, icon)
                    
                }
                
            }
        })
}




