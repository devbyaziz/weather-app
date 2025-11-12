// API Configuration
// API key sekarang diambil dari config.js untuk keamanan
const API_KEY = CONFIG.API_KEY;
const API_BASE_URL = CONFIG.API_BASE_URL;

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const errorMessage = document.getElementById('errorMessage');
const weatherDisplay = document.getElementById('weatherDisplay');

// Weather icon mapping untuk Font Awesome
const weatherIcons = {
    '01d': '<i class="fas fa-sun" style="color: #f39c12;"></i>',
    '01n': '<i class="fas fa-moon" style="color: #f1c40f;"></i>',
    '02d': '<i class="fas fa-cloud-sun" style="color: #f39c12;"></i>',
    '02n': '<i class="fas fa-cloud-moon" style="color: #95a5a6;"></i>',
    '03d': '<i class="fas fa-cloud" style="color: #95a5a6;"></i>',
    '03n': '<i class="fas fa-cloud" style="color: #7f8c8d;"></i>',
    '04d': '<i class="fas fa-cloud" style="color: #7f8c8d;"></i>',
    '04n': '<i class="fas fa-cloud" style="color: #7f8c8d;"></i>',
    '09d': '<i class="fas fa-cloud-showers-heavy" style="color: #3498db;"></i>',
    '09n': '<i class="fas fa-cloud-showers-heavy" style="color: #2980b9;"></i>',
    '10d': '<i class="fas fa-cloud-sun-rain" style="color: #3498db;"></i>',
    '10n': '<i class="fas fa-cloud-moon-rain" style="color: #2980b9;"></i>',
    '11d': '<i class="fas fa-cloud-bolt" style="color: #f39c12;"></i>',
    '11n': '<i class="fas fa-cloud-bolt" style="color: #e67e22;"></i>',
    '13d': '<i class="fas fa-snowflake" style="color: #ecf0f1;"></i>',
    '13n': '<i class="fas fa-snowflake" style="color: #bdc3c7;"></i>',
    '50d': '<i class="fas fa-smog" style="color: #95a5a6;"></i>',
    '50n': '<i class="fas fa-smog" style="color: #7f8c8d;"></i>'
};

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});
locationBtn.addEventListener('click', getUserLocation);

// Initialize app dengan kota default
window.addEventListener('load', () => {
    // Coba gunakan lokasi pengguna saat pertama kali dibuka
    getUserLocation();
});

// Handle Search
function handleSearch() {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherByCity(city);
    } else {
        showError('Silakan masukkan nama kota');
    }
}

// Get User Location
function getUserLocation() {
    if (navigator.geolocation) {
        showLoading();
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                getWeatherByCoords(latitude, longitude);
            },
            error => {
                hideLoading();
                showError('Tidak dapat mengakses lokasi. Silakan cari kota secara manual.');
                // Fallback ke kota default
                getWeatherByCity('Jakarta');
            }
        );
    } else {
        showError('Browser Anda tidak mendukung geolocation');
        getWeatherByCity('Jakarta');
    }
}

// Get Weather by City Name
async function getWeatherByCity(city) {
    showLoading();
    try {
        // Get current weather
        const currentResponse = await fetch(
            `${API_BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=id`
        );

        if (!currentResponse.ok) {
            if (currentResponse.status === 404) {
                throw new Error('Kota tidak ditemukan');
            } else if (currentResponse.status === 401) {
                throw new Error('API key tidak valid. Silakan periksa konfigurasi API key Anda');
            } else {
                throw new Error('Terjadi kesalahan saat mengambil data');
            }
        }

        const currentData = await currentResponse.json();

        // Get forecast
        const forecastResponse = await fetch(
            `${API_BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=id`
        );
        const forecastData = await forecastResponse.json();

        hideLoading();
        displayWeather(currentData, forecastData);
    } catch (err) {
        hideLoading();
        showError(err.message);
    }
}

// Get Weather by Coordinates
async function getWeatherByCoords(lat, lon) {
    showLoading();
    try {
        // Get current weather
        const currentResponse = await fetch(
            `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=id`
        );

        if (!currentResponse.ok) {
            if (currentResponse.status === 401) {
                throw new Error('API key tidak valid. Silakan periksa konfigurasi API key Anda');
            } else {
                throw new Error('Terjadi kesalahan saat mengambil data');
            }
        }

        const currentData = await currentResponse.json();

        // Get forecast
        const forecastResponse = await fetch(
            `${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=id`
        );
        const forecastData = await forecastResponse.json();

        hideLoading();
        displayWeather(currentData, forecastData);
    } catch (err) {
        hideLoading();
        showError(err.message);
    }
}

// Display Weather Data
function displayWeather(current, forecast) {
    hideError();

    // Current Weather
    document.getElementById('cityName').innerHTML =
        `<i class="fas fa-map-marker-alt"></i> ${current.name}, ${current.sys.country}`;

    document.getElementById('date').textContent = formatDate(new Date());

    const iconCode = current.weather[0].icon;
    document.getElementById('weatherIcon').innerHTML = weatherIcons[iconCode] || weatherIcons['01d'];

    document.getElementById('temperature').textContent = `${Math.round(current.main.temp)}°C`;
    document.getElementById('feelsLike').textContent =
        `Terasa seperti ${Math.round(current.main.feels_like)}°C`;

    document.getElementById('description').textContent = current.weather[0].description;
    document.getElementById('tempMax').innerHTML =
        `<i class="fas fa-arrow-up"></i> ${Math.round(current.main.temp_max)}°C`;
    document.getElementById('tempMin').innerHTML =
        `<i class="fas fa-arrow-down"></i> ${Math.round(current.main.temp_min)}°C`;

    // Weather Details
    document.getElementById('windSpeed').textContent = `${current.wind.speed} m/s`;
    document.getElementById('humidity').textContent = `${current.main.humidity}%`;
    document.getElementById('pressure').textContent = `${current.main.pressure} hPa`;
    document.getElementById('visibility').textContent = `${(current.visibility / 1000).toFixed(1)} km`;
    document.getElementById('sunrise').textContent = formatTime(current.sys.sunrise);
    document.getElementById('sunset').textContent = formatTime(current.sys.sunset);

    // 5-Day Forecast
    displayForecast(forecast);

    // Show weather display
    weatherDisplay.classList.remove('hidden');
}

// Display 5-Day Forecast
function displayForecast(forecast) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';

    // Filter forecast untuk mendapatkan satu data per hari (sekitar jam 12:00)
    const dailyForecasts = forecast.list.filter(item => {
        return item.dt_txt.includes('12:00:00');
    }).slice(0, 5);

    dailyForecasts.forEach(day => {
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';

        const date = new Date(day.dt * 1000);
        const iconCode = day.weather[0].icon;

        forecastItem.innerHTML = `
            <div class="forecast-date">${formatDayName(date)}</div>
            <div class="forecast-icon">${weatherIcons[iconCode] || weatherIcons['01d']}</div>
            <div class="forecast-temp">${Math.round(day.main.temp)}°C</div>
            <div class="forecast-desc">${day.weather[0].description}</div>
        `;

        forecastContainer.appendChild(forecastItem);
    });
}

// Utility Functions
function formatDate(date) {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return date.toLocaleDateString('id-ID', options);
}

function formatDayName(date) {
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return date.toLocaleDateString('id-ID', options);
}

function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

function showLoading() {
    loading.classList.remove('hidden');
    weatherDisplay.classList.add('hidden');
    hideError();
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    error.classList.remove('hidden');
    weatherDisplay.classList.add('hidden');
}

function hideError() {
    error.classList.add('hidden');
}

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';
