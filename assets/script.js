
var citySearchForm = document.getElementById("city-search")
const handleForClickEvent = (event) => {
    event.preventDefault();
    fetchWeather(event.target.innerText)
}


const handleFormWeatherSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(citySearchForm)
    const cityName = data.get("city")
    storeCityToLocalStorage(cityName)
    displayListOfCities()
    fetchWeather(cityName)

}



if (citySearchForm) {
    citySearchForm.addEventListener("submit", handleFormWeatherSubmit)
}
function currentDayString(city, date, temp, wind, humidity, icon) {
    return `<h1>${city} ${date}</h1>
    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" height="50px" width="50px" alt="weather icon">
    <p>Temp: ${temp}&#176;F</p>
    <p>Wind: ${wind} MPH</p>
    <p>Humidity: ${humidity}%</p>
    `
}



function fetchWeather(cityName) {

    const APIKey = "6edb7b4c4ed6f470e643220fdd64ce9b"


    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${APIKey}`
    )
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            const cityInfo = document.getElementById("city-info")
            const { list, city } = data
            const { weather, wind, main, dt_txt } = list[0]
            const icon = weather[0].icon
            const day = dayjs(dt_txt).format("MM/DD/YY")

            cityInfo.innerHTML = currentDayString(city.name, day, main.temp, wind.speed, main.humidity, icon)

            let currentDay;
            const forecast = document.getElementById("forecast-cards")
            forecast.innerHTML = ""


            for (var i = 1; i < 40; i++) {
                const dayContainer = document.createElement("div")
                const { weather, wind, main, dt_txt } = list[i]
                const icon = weather[0].icon
                const day = dayjs(dt_txt).format("ddd")


                if (!currentDay || day != currentDay) {
                    currentDay = day
                    dayContainer.setAttribute(
                        "class",
                        "col card bg-info"
                    )
                    forecast.append(dayContainer)
                    dayContainer.innerHTML = currentDayString("Day ", day, main.temp, wind.speed, main.humidity, icon)

                }

            }
        })
}
const getCitiesFromLocalStorage = () => {
    const data = localStorage.getItem("cities")
    if (!data) return;
    return JSON.parse(data)
}

function displayListOfCities() {
    const cities = getCitiesFromLocalStorage()
    const citiesDiv = document.getElementById('list-of-cities');
    citiesDiv.innerHTML = ""
    for (index = 0; index < cities.length; index++) {
        const cityButton = document.createElement("button");
        cityButton.innerHTML = cities[index]
        citiesDiv.appendChild(cityButton);
        cityButton.addEventListener("click", handleForClickEvent)
    }
}


const storeCityToLocalStorage = (city) => {
    const data = localStorage.getItem("cities")
    const cities = JSON.parse(data) ?? []
    if (cities.find(c => c === city)) return
    cities.push(city)
    localStorage.setItem("cities", JSON.stringify(cities))

}

displayListOfCities()





