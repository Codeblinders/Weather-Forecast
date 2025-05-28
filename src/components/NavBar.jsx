import React, { useState } from "react";
import { toast } from "react-toastify";

const NavBar = ({ onCitySearch, onLocationFetch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onCitySearch(searchQuery.trim());
      setSearchQuery("");
    } else {
      toast.warn("Please enter a city name to search.");
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationFetch(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Failed to fetch current location. Please enable location services.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-teal-400 shadow-md px-6 py-4">
      <div className="flex flex-col gap-4 items-center justify-between lg:flex-row">
        {/* Logo Section */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="https://img.icons8.com/?size=100&id=111603&format=png&color=000000"
            alt="Weather App Logo"
            className="h-12 lg:h-16 w-auto select-none"
          />
          <span className="text-2xl font-bold text-gray-800">Weather App</span>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="flex items-center bg-white rounded-full px-4 py-2 w-full max-w-md shadow-sm mt-4 lg:mt-0 cursor-pointer">
          <label htmlFor="citySearch" className="sr-only">Enter city name</label>
          <img
            src="https://img.icons8.com/ios-filled/24/000000/search.png"
            alt="Search Icon"
            className="w-5 h-5 mr-2"
          />
          <input
            id="citySearch"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-full text-sm text-black"
          />
          <button
            type="submit"
            className="ml-2 cursor-pointer text-white bg-blue-600 px-5 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Search
          </button>
        </form>

        {/* Current Location Button */}
        <button
          onClick={handleLocationClick}
          type="button"
          className="flex items-center cursor-pointer gap-2 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 mt-2 lg:mt-0"
        >
          <img
            src="https://img.icons8.com/ios-filled/24/ffffff/marker.png"
            alt="Location Icon"
            className="w-5 h-5 select-none"
          />
          <span className="text-sm font-medium">Current Location</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
