````markdown
# 🌤️ Weather App

A modern, responsive weather dashboard built with **React** and **Tailwind CSS**, featuring **real-time weather**, **hourly and 5-day forecasts**, and **location-based search**. The UI includes smooth animations, glassmorphism, and neumorphism effects for a sleek user experience.

---

## 🚀 Features

- 🌍 **Current Weather**: Shows real-time temperature, humidity, pressure, wind speed, UV index, sunrise/sunset.
- ⏰ **Live Clock**: Displays current time and date.
- 🔎 **City Search**: Enter any city name to fetch weather data.
- 📍 **Geolocation Support**: Automatically fetch weather for your current location.
- 🌤️ **5-Day Forecast**: Daily summary with temperature, weather condition, and icons.
- 🕐 **Hourly Forecast**: View upcoming weather for the next few hours.
- 💎 **Stylish UI**: Built with Tailwind CSS, glassmorphism, neumorphism, and smooth hover animations.

---

## 📸 Screenshots

![Weather App Screenshot](https://img.icons8.com/?size=100&id=111603&format=png&color=000000)

---

## 🛠️ Tech Stack

- **React** – Frontend library
- **Tailwind CSS** – Utility-first CSS framework
- **OpenWeatherMap API** – For weather and forecast data
- **React Toastify** – For user notifications and alerts

---

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up your OpenWeatherMap API Key**

   Replace the API key string (`appid=...`) in `CityTime.jsx` with your own:

   ```js
   const API_KEY = "your_api_key_here";
   ```

   Or, for better security, store it in an `.env` file:

   ```env
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

   And use it via:

   ```js
   import.meta.env.VITE_WEATHER_API_KEY;
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── App.jsx
│   ├── NavBar.jsx
│   ├── CityTime.jsx
│   ├── Clock.jsx
│   └── ForeCast.jsx
├── index.js
└── styles/
```

---

## 🧠 Tips

* Check your browser's location permissions for geolocation to work properly.
* The hourly forecast is based on the next 5 time slots from the API.
* Data is fetched from the free tier of OpenWeatherMap, so rate limits apply.

---

## 🤝 Contributing

1. Fork this repository
2. Create a new branch:

   ```bash
   git checkout -b feature/cool-feature
   ```
3. Make your changes
4. Commit your changes:

   ```bash
   git commit -m "Add cool feature"
   ```
5. Push to your fork:

   ```bash
   git push origin feature/cool-feature
   ```
6. Create a pull request

---

## 📄 License

MIT License. Feel free to use and modify.

---

## 🙋‍♂️ Author

Made with ❤️ by \[Vivek Yadav]

---

```

```
