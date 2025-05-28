import React from "react";

const ForeCast = ({ forecast = [] }) => {
  // Compute unique daily forecasts (one per day)
  const dailyForecast = forecast.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    const alreadyExists = acc.some((f) => f.date === date);
    if (!alreadyExists) {
      acc.push({
        temperature: `${item.main?.temp ?? "N/A"}°C`,
        day: new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "long" }),
        date,
        icon: `https://openweathermap.org/img/wn/${item.weather?.[0]?.icon}@2x.png`,
      });
    }
    return acc;
  }, []).slice(0, 5);

  // Compute next 5 hourly entries
  const hourlyForecast = forecast.slice(0, 5).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    icon: `https://openweathermap.org/img/wn/${item.weather?.[0]?.icon}@2x.png`,
    temperature: `${item.main?.temp ?? "N/A"}°C`,
    windspeed: `${item.wind?.speed ?? "N/A"} m/s`,
  }));

  return (
    <div className="flex flex-col lg:flex-row gap-2 p-4 w-full max-w-7xl mx-auto">
      {/* 5-Day Forecast */}
      <div className="w-full lg:w-1/2 bg-white/20 backdrop-blur-lg rounded-lg shadow-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
        <div className="space-y-3">
          {dailyForecast.map((cast, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-[#1c0f4a]/80 p-4 rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <img src={cast.icon} alt={`Weather for ${cast.day}`} className="w-10 h-10" />
              <p className="font-bold">{cast.temperature}</p>
              <p>{cast.day}</p>
              <p className="hidden sm:block">{cast.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Forecast */}
      <div className="w-full lg:w-2/3 bg-white/20 backdrop-blur-lg rounded-lg shadow-2xl p-2 text-white">
        <h2 className="text-xl font-bold mb-1">Hourly Forecast</h2>
        <div className="space-y-1 ">
          {hourlyForecast.map((hourCast, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-[#1c0f4a]/80 p-1 mt-4 rounded-lg hover:scale-102 transition-transform duration-300 shadow-md"
            >
              <div>
                <p className="font-bold">{hourCast.time}</p>
                <p className="text-sm">{hourCast.windspeed}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{hourCast.temperature}</p>
                <img src={hourCast.icon} alt="Weather icon" className="w-10 h-10 ml-auto select-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForeCast;
