var key = 'b42693947f9bba2dda33a9ecde3fe7a9'

let cities = JSON.parse(localStorage.getItem('cities')) || []
cities.forEach(city => {
    document.getElementById('cities').innerHTML += `
    <button>${city}</button>
    `
})

document.getElementById('cities').onclick = function (e) {
    var city = e.target.innerHTML;
    document.getElementById('future').innerHTML = '';
    fetchWeather(city);
}

document.getElementById('btn').onclick = function () {
    var city = document.getElementById('city').value;
    cities.push(city);
    document.getElementById('future').innerHTML = '';
    localStorage.setItem('cities', JSON.stringify(cities));
    fetchWeather(city);
}

function fetchWeather(city) {
    var url =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`

    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.getElementById('current').innerHTML = `
        
        <h3>${data.city.name}</h3>
        <img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png"/>
        <p>Weather Condition: ${data.list[0].weather[0].description}</p>
        <p>Temperature: ${data.list[0].main.temp}°C</p>
        <p>Humidity: ${data.list[0].main.humidity}%</p>
        <p>Wind Speed: ${data.list[0].wind.speed} MPH</p>
        `

            for (let i = 6; i < data.list.length; i += 8) {
                document.getElementById('future').innerHTML += `
                
                
                <div>
                <h3>Date: ${data.list[i].dt_txt.substring(0, 10)}</h3>
                <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"/>
                <p>Weather Condition: ${data.list[i].weather[0].description}</p>
                <p>Temperature: ${data.list[i].main.temp}°C</p>
                <p>Humidity: ${data.list[i].main.humidity}%</p>
                <p>Wind Speed: ${data.list[i].wind.speed} MPH</p>
            
                `
            }
    })
}