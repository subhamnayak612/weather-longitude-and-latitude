const API_KEY = "931d70d34a0a44cfbb5111903260302";

function getWeather() {
    let location = document.getElementById("locationInput").value.trim();

    if (!location) {
        alert("Please enter a city name or latitude,longitude");
        return;
    }

    // 👉 IMPORTANT: encode location (city OR lat,long)
    const query = encodeURIComponent(location);

    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}&aqi=yes`)
        .then(res => res.json())
        .then(data => {

            // 👉 API error handling
            if (data.error) {
                alert("Location not found. Try: Soro, India or Lat,Long");
                return;
            }

            document.getElementById("weatherCard").style.display = "block";
            document.getElementById("city").innerText =
                `${data.location.name}, ${data.location.country}`;
            document.getElementById("temp").innerText =
                `${data.current.temp_c}°C`;
            document.getElementById("condition").innerText =
                data.current.condition.text;
            document.getElementById("icon").src =
                "https:" + data.current.condition.icon;
            document.getElementById("humidity").innerText =
                data.current.humidity + "%";
            document.getElementById("wind").innerText =
                data.current.wind_kph + " km/h";
        })
        .catch(() => alert("Network error"));
}
