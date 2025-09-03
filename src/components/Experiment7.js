import React, { useState, useEffect, useCallback } from "react";
import "./Experiment7.css";

export default function Experiment7() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("London");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API = "3bd64d8c6bca06f1e9f960acacd4819e"; // Your OpenWeather API Key
  const URL = "https://api.openweathermap.org/data/2.5";

  // Correct weather icon function
  const icon = (code) => {
    if (code >= 200 && code < 300) return "⛈️"; // Thunderstorm
    if (code >= 300 && code < 400) return "🌦️"; // Drizzle
    if (code >= 500 && code < 600) return "🌧️"; // Rain
    if (code >= 600 && code < 700) return "❄️"; // Snow
    if (code >= 700 && code < 800) return "🌫️"; // Mist/Fog
    if (code === 800) return "☀️"; // Clear
    if (code > 800 && code < 900) return "☁️"; // Clouds
    return "🌤️"; // Default
  };

  // Fetch weather data
  const getWeather = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [c, f] = await Promise.all([
        fetch(`${URL}/weather?q=${city}&appid=${API}&units=metric`).then((r) => r.json()),
        fetch(`${URL}/forecast?q=${city}&appid=${API}&units=metric`).then((r) => r.json()),
      ]);

      if (c.cod !== 200) throw new Error("City not found");

      setWeather({
        current: {
          temp: Math.round(c.main.temp),
          cond: c.weather[0].main,
          desc: c.weather[0].description,
          humidity: c.main.humidity,
          wind: Math.round(c.wind.speed * 3.6),
          code: c.weather[0].id,
        },
        forecast: f.list
          .filter((_, i) => i % 8 === 0)
          .slice(1, 6)
          .map((d) => ({
            day: new Date(d.dt * 1000).toLocaleDateString("en", { weekday: "long" }),
            temp: Math.round(d.main.temp),
            cond: d.weather[0].main,
            code: d.weather[0].id,
          })),
      });
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }, [city]);

  useEffect(() => {
    getWeather();
  }, [getWeather]);

  return (
    <div className="weather-container">
      <h1>Weather Forecast</h1>

      {/* Search Section */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (search) {
            setCity(search);
            setSearch("");
          }
        }}
        className="search"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Search</button>
        <button type="button" onClick={getWeather} disabled={loading}>
          {loading ? "Loading..." : "Refresh"}
        </button>
      </form>

      {/* Quick Cities */}
      <div className="quick-cities">
        {["London", "New York", "Tokyo", "Paris", "Mumbai", "Sydney"].map((c) => (
          <button key={c} className={city === c ? "active" : ""} onClick={() => setCity(c)}>
            {c}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* Weather Display */}
      {weather && !loading && (
        <>
          <div className="current">
            <h2>
              {city} - {weather.current.temp}°C {icon(weather.current.code)}
            </h2>
            <p>{weather.current.cond} | {weather.current.desc}</p>
            <p>Humidity: {weather.current.humidity}% | Wind: {weather.current.wind} km/h</p>
          </div>

          <div className="forecast">
            {weather.forecast.map((d, i) => (
              <div key={i} className="card">
                <h4>{d.day}</h4>
                <div>{icon(d.code)}</div>
                <p>{d.temp}°C</p>
                <small>{d.cond}</small>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
