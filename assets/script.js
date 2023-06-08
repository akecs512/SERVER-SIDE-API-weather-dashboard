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
            cityInfo.innerHTML = currentDayString(city.name, "06/07/23", 100, 300, 400, "01d")

            let currentDay;
            
            //40 is the number of items in the list from openweathermap.org
            for (var i = 1; i < 40; i++) {
                const dayContainer = document.createElement("div")
                const header = document.createElement("h2")
                const temp = document.createElement("p")
                const day = dayjs(list[i].dt_txt).format("ddd")
                if (!currentDay || day != currentDay){
                    header.textContent = "Day " + i
                    currentDay = day
                    temp.textContent = list[i].main.temp
    
                    dayContainer.setAttribute(
                        "class",
                        "col card bg-info"
                    )
                    dayContainer.append(day)
                    forecast.append(dayContainer)
                    dayContainer.append(header)
                    dayContainer.append(temp)  
                }
                
            }
        })
}




