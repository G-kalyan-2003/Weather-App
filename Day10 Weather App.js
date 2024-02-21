const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

// Weather icon mapping
const weatherIcons = {
  'Clear': 'https://openweathermap.org/img/wn/01d.png', // Clear sky weather icon
  'Clouds': 'https://openweathermap.org/img/wn/03d.png', // Example icon for cloudy weather
  // Add more mappings as needed for different weather conditions
};


$(document).ready(function () {
  weatherFn('Pune');
});

async function weatherFn(cName) {
  const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
  try {
    const res = await fetch(temp);
    const data = await res.json();
    if (res.ok) {
      weatherShowFn(data);
    } else {
      alert('City not found. Please try again.');
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function weatherShowFn(data) {
  $('#city-name').text(data.name);
  $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
  $('#temperature').html(`${data.main.temp}°C`);
  $('#description').text(data.weather[0].description);
  $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
  // Set weather icon based on weather condition
  const weatherIcon = data.weather[0].main;
  if (weatherIcons[weatherIcon]) {
    $('#weather-icon').attr('src', weatherIcons[weatherIcon]);
  } else {
    $('#weather-icon').attr('src', ''); // Set empty src if no icon found
  }
  $('#weather-info').fadeIn();
}
