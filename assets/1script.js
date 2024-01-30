document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('city-input');
    const searchButton = document.getElementById('search-button');
    const currentWeatherSection = document.getElementById('current-weather');
    const forecastSection = document.getElementById('forecast');
    const searchHistorySection = document.getElementById('search-history');

    // Function to fetch weather data from the API
    function fetchWeatherData(cityName) {
        const apiKey = 'b42693947f9bba2dda33a9ecde3fe7a9';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                // Update the current weather section and search history with the retrieved data
                updateCurrentWeather(data);
                updateSearchHistory(cityName);
            })
            .catch(error => {
                console.error(`Error fetching weather data: ${error.message}`);
            });
    }

    // Function to update current weather section
    function updateCurrentWeather(data) {
        // Update the currentWeatherSection with the provided data
        const temperature = Math.round(data.main.temp - 273.15); // Convert temperature to Celsius
        const weatherDescription = data.weather[0].description;
        const cityName = data.name;
        const country = data.sys.country;

        currentWeatherSection.innerHTML = `
            <h2>${cityName}, ${country}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Description: ${weatherDescription}</p>
        `;
    }

    // Function to update search history section
    function updateSearchHistory(cityName) {
        // Update the searchHistorySection with the provided city name
        const listItem = document.createElement('li');
        listItem.textContent = cityName;
        searchHistorySection.appendChild(listItem);
    }

    // Function to fetch 5-day forecast data from the API
    function fetchForecastData(cityName) {
        const apiKey = 'b42693947f9bba2dda33a9ecde3fe7a9';
        const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

        fetch(forecastApiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                // Update the forecast section with the retrieved data
                updateForecast(data);
            })
            .catch(error => {
                console.error(`Error fetching forecast data: ${error.message}`);
            });
    }

    // Function to update the forecast section
    // ... Your existing code ...

// Function to update the forecast section
function updateForecast(data) {
    // Clear existing content in the forecast section
    forecastSection.innerHTML = '';

    // Initialize a variable to store the current day
    let currentDay = null;

    // Loop through the forecast data and update the HTML
    for (let i = 0; i < data.list.length; i += 8) { // Retrieve data for every 8 hours (1 day)
        const forecastItem = data.list[i];
        const date = new Date(forecastItem.dt * 1000); // Convert timestamp to Date object
        const day = date.toLocaleDateString('en-US', { weekday: 'long' }); // Get the day of the week
        const temperature = Math.round(forecastItem.main.temp - 273.15); // Convert temperature to Celsius
        const weatherDescription = forecastItem.weather[0].description;

        // Check if it's a new day, create a new row
        if (day !== currentDay) {
            currentDay = day;
            // Create and append day header
            const dayHeader = document.createElement('h3');
            dayHeader.textContent = day;
            forecastSection.appendChild(dayHeader);

            // Create and append row div
            const rowDiv = document.createElement('div');
            rowDiv.className = 'forecast-row';
            forecastSection.appendChild(rowDiv);
        }

        // Create and append forecast HTML to the current row
        const forecastItemHTML = `
            <div class="forecast-item">
                <p>${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}</p>
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${weatherDescription}</p>
            </div>
        `;
        forecastSection.lastChild.appendChild(document.createRange().createContextualFragment(forecastItemHTML));
    }
}

// ... Your existing code ...


    // Event listener for search button
    searchButton.addEventListener('click', function () {
        const cityName = searchInput.value.trim();

        // Check if cityName is not empty
        if (cityName !== '') {
            fetchWeatherData(cityName);
            fetchForecastData(cityName); // Fetch forecast data along with weather data
        } else {
            console.error('City name is empty. Please enter a valid city name.');
            // You may choose to display an error message to the user
        }
    });

    // Event listener for clicking on a city in the search history
    searchHistorySection.addEventListener('click', function (event) {
        if (event.target.tagName === 'LI') {
            const cityName = event.target.textContent;
            // Call a function to fetch weather data for the selected city
            fetchWeatherData(cityName);
            fetchForecastData(cityName); // Fetch forecast data along with weather data
        }
    });
});
