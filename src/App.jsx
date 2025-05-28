import React from "react";
import NavBar from "./components/NavBar";
import CityTime from "./components/cityTime";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [cityName, setCityName] = React.useState("");
  const [lat, setLat] = React.useState(null);
  const [lon, setLon] = React.useState(null);

  // Called when user searches for a city
  const handleCitySearch = (city) => {
    setCityName(city);
    setLat(null);
    setLon(null);
  };

  // Called when user clicks "Current Location"
  const handleLocationFetch = (latitude, longitude) => {
    setLat(latitude);
    setLon(longitude);
    setCityName("");
  };

  return (
    <div className="bg-gradient-to-br from-[#1a022e] to-[#1f50a4] text-white min-h-screen transition-colors">
      <ToastContainer />
      <NavBar onCitySearch={handleCitySearch} onLocationFetch={handleLocationFetch} />
      <main className="mx-auto px-4 py-4">
        <CityTime cityName={cityName} lat={lat} lon={lon} setLat={setLat} setLon={setLon} />
      </main>
    </div>
  );
}

export default App;
