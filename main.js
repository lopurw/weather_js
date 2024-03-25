document.querySelector('.more-info-btn').addEventListener('click', function() {
    const moreInfo = document.querySelector('.more-info');
    if (moreInfo.style.display === 'none') {
        moreInfo.style.display = 'block';
    } else {
        moreInfo.style.display = 'none';
    }
});

async function getCurrent() {
    let latitude, longitude;
    const citySelect = document.querySelector('.city-select');
    const selectedCity = citySelect.value;

    if (selectedCity === 'Minsk') {
        latitude = 53.893009;
        longitude = 27.567444;
    } else if (selectedCity === 'Brest') {
        latitude = 52.0975;
        longitude = 23.6877;
    }

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,rain,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=`);
    const data = await response.json();

    console.log(data);
    const temperature = data.current.temperature_2m.toFixed(0);
    console.log(temperature);

    const windDirection = data.current.wind_direction_10m;
    const windSpeed = data.current.wind_speed_10m;
    const windGusts = data.current.wind_gusts_10m;

    document.querySelector('.temperature').textContent = temperature + '°C';
    document.getElementById('wind-direction').textContent = windDirection;
    document.getElementById('wind-speed').textContent = windSpeed + ' м/с';
    document.getElementById('wind-gusts').textContent = windGusts + ' м/с';
}

document.querySelector('.city-select').addEventListener('change', getCurrent);

getCurrent();
