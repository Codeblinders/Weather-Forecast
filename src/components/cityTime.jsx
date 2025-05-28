import React, { useState, useEffect } from "react";
import Clock from "./CLock";
import ForeCast from "./ForeCast";
import axios from "axios";
import { toast } from "react-toastify";

const CityTime = ({ cityName, lat, lon, setLat, setLon }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [uvIndex, setUvIndex] = useState(null);

  // Fetch weather & forecast
  const fetchData = async (latitude, longitude) => {
    try {
      // Reset data for loading state
      setWeatherData(null);
      setForecastData(null);
      setUvIndex(null);

      let url;
      if (cityName) {
        const encodeCity = encodeURIComponent(cityName);
        url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeCity}&units=metric&appid=2cedd3803298b6baadae2e859a5571de`;
      } else if (latitude != null && longitude != null) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=2cedd3803298b6baadae2e859a5571de`;
      } else {
        toast.error("Missing city name or coordinates");
        return;
      }

      const currentWeather = await axios.get(url);
      const data = currentWeather.data;
      setWeatherData(data);

      // Update coordinates in state (clears cityName if using coordinates)
      setLat(data.coord.lat);
      setLon(data.coord.lon);

      // Fetch 5-day forecast
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=2cedd3803298b6baadae2e859a5571de`
      );
      setForecastData(forecastRes.data);

      // Fetch UV index (legacy API)
      const uvRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=2cedd3803298b6baadae2e859a5571de`
      );
      setUvIndex(uvRes.data.value);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response && error.response.status === 404) {
        toast.error("City not found.");
      } else {
        toast.error("Failed to fetch weather data.");
      }
    }
  };

  // On mount: get user location if no city or coords yet
  useEffect(() => {
    if (!cityName && lat == null && lon == null) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLat(latitude);
            setLon(longitude);
            fetchData(latitude, longitude);
          },
          (error) => {
            console.error("Error getting location:", error);
            toast.error("Unable to retrieve location. Please search manually.");
          }
        );
      } else {
        toast.error("Geolocation not supported.");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  // On cityName change: fetch weather by city
  useEffect(() => {
    if (cityName) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityName]);

  // On lat/lon change: fetch weather by coordinates (only if not searching city)
  useEffect(() => {
    if (!cityName && lat != null && lon != null) {
      fetchData(lat, lon);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

  // Show spinner while loading
  if (!weatherData || !forecastData) {
    return (
      <div className="flex items-center justify-center text-white h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <span className="ml-4 text-2xl">Loading...</span>
      </div>
    );
  }

  const { main, weather, sys, wind } = weatherData;
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <>
      <div className="flex flex-col xl:flex-row gap-6 m-4">
        {/* Time Card */}
        <div className="w-full bg-white/20 backdrop-blur-lg shadow-lg rounded-xl text-white p-6 flex flex-col justify-center items-center min-h-[200px] transition-transform duration-300 hover:scale-105">
          <h1 className="text-2xl md:text-3xl font-bold text-center break-words">
            {cityName || weatherData.name}
          </h1>
          <img
            src="https://img.icons8.com/?size=100&id=15352&format=png&color=ffffff"
            className="w-24 select-none mt-2"
            alt="Clock Icon"
          />
          <Clock />
        </div>

        {/* Weather Card */}
        <div className="w-full bg-white/20 backdrop-blur-lg shadow-2xl rounded-xl text-white p-4 flex flex-col md:flex-row items-center gap-6 transition-transform duration-300 hover:scale-105">
          <div className="flex flex-col items-center justify-between gap-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold">
              {main.temp}&#8451;
            </h1>
            <p className="text-sm md:text-base">
              Feels Like: <span className="font-semibold">{main.feels_like}&#8451;</span>
            </p>
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center">
                <img
                  src="https://img.icons8.com/?size=100&id=s51JxxE1J6OO&format=png&color=ffffff"
                  alt="Sunrise Icon"
                  className="h-8 md:h-10 select-none"
                />
                <p className="text-xs">Sunrise</p>
                <p className="text-sm">
                  {new Date(sys.sunrise * 1000).toLocaleTimeString()}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="https://img.icons8.com/?size=100&id=58978&format=png&color=ffffff"
                  alt="Sunset Icon"
                  className="h-8 md:h-10 select-none"
                />
                <p className="text-xs">Sunset</p>
                <p className="text-sm">
                  {new Date(sys.sunset * 1000).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>

          {/* Weather Icon and Description */}
          <div className="flex flex-col items-center justify-center text-center">
            <img
              src={weatherIconUrl}
              alt="Weather Icon"
              className="h-32 w-32 md:h-40 md:w-40 select-none"
            />
            <p className="text-xl md:text-2xl font-bold mt-2 break-words">
              {weather[0].description}
            </p>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="w-full bg-white/20 backdrop-blur-lg shadow-lg rounded-xl text-white p-4 grid grid-cols-1 md:grid-cols-4 gap-4 text-center transition-transform duration-300 hover:scale-105">
          {/* Humidity */}
          <div className="flex flex-col items-center gap-2">
            <img
              src="https://img.icons8.com/?size=100&id=XHXRA2Hx9TTR&format=png&color=ffffff"
              alt="Humidity Icon"
              className="h-8 md:h-10 select-none"
            />
            <p>{main.humidity}%</p>
            <h6>Humidity</h6>
          </div>
          {/* Wind Speed */}
          <div className="flex flex-col items-center gap-2">
            <img
              src="https://img.icons8.com/?size=100&id=cDS9eWi5wzBP&format=png&color=ffffff"
              alt="Wind Icon"
              className="h-8 md:h-10 select-none"
            />
            <p>{wind.speed} Km/h</p>
            <h6>Wind Speed</h6>
          </div>
          {/* Pressure */}
          <div className="flex flex-col items-center gap-2">
            <img
              src="https://img.icons8.com/?size=100&id=7WPzyvChnfO4&format=png&color=ffffff"
              alt="Pressure Icon"
              className="h-8 md:h-10 select-none"
            />
            <p>{main.pressure} hPa</p>
            <h6>Pressure</h6>
          </div>
          {/* UV Index */}
          <div className="flex flex-col items-center gap-2">
            <img
              src="https://img.icons8.com/?size=100&id=b2BsGWVGiDvr&format=png&color=ffffff"
              alt="UV Index Icon"
              className="h-8 md:h-10 select-none"
            />
            <p>{uvIndex !== null ? uvIndex : "N/A"}</p>
            <h6>UV Index</h6>
          </div>
        </div>
      </div>

      {/* Forecast Component */}
      <ForeCast forecast={forecastData.list || []} />
    </>
  );
};

export default CityTime;
