import GlassCard from "../GlassCard";
import { CloudSun, Cloud, Sun } from "lucide-react";
import { useEffect, useState } from "react";

function WeatherWidget() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    loadWeather();
  }, []);

  async function loadWeather() {
    try {
      // Johannesburg coordinates
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=-26.2041&longitude=28.0473&current_weather=true"
      );

      const data = await res.json();
      setWeather(data.current_weather);
    } catch (error) {
      console.error("Weather error:", error);
    }
  }

  function getIcon(code) {
    if (code === 0) return <Sun size={28} />;
    if (code <= 2) return <CloudSun size={28} />;
    return <Cloud size={28} />;
  }

  return (
    <GlassCard minHeight="160px">
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p style={{ color: "var(--text-secondary)" }}>
          Johannesburg
        </p>

        {!weather ? (
          <p style={{ color: "var(--text-secondary)" }}>
            Loading...
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              {getIcon(weather.weathercode)}

              <h2
                style={{
                  fontSize: "2.2rem",
                  fontWeight: "400",
                }}
              >
                {Math.round(weather.temperature)}°
              </h2>
            </div>

            <p style={{ color: "var(--text-secondary)" }}>
              {getWeatherLabel(weather.weathercode)}
            </p>
          </div>
        )}
      </div>
    </GlassCard>
  );
}

function getWeatherLabel(code) {
  if (code === 0) return "Clear sky";
  if (code <= 2) return "Partly cloudy";
  if (code <= 3) return "Cloudy";
  return "Overcast";
}

export default WeatherWidget;