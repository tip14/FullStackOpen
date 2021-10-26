import axios from "axios";
import { useEffect, useState } from "react";

const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

const Weather = ({ city }) => {

    const [weather, setWeather] = useState({});

    const url = `http://api.weatherstack.com/current?access_key=${weatherApiKey}&query=${city}`;

    useEffect(() => {
        axios.get(url)
            .then(response => {
                if(response.data.success === false) {
                    return;
                }
                const data = response.data.current;
                console.log("current", response.data);
                const newWeather = {
                    temperature: data.temperature,
                    icon: data.weather_icons[0],
                    windSpeed: data.wind_speed,
                    windDirection: data.wind_dir
                }
                setWeather(newWeather);
            })
    })

    return (
        <>
            <h3>Weather in {city}</h3>
            <p><strong>temperature:</strong> {weather.temperature} Celsius</p>
            <img src={weather.icon} alt="weather icon" />
            <p><strong>wind:</strong> {weather.windSpeed} kmh direction {weather.windDirection}</p>
        </>
    )
}

export default Weather;