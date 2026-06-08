import GlassCard from "./GlassCard";

function WeatherWidget() {
  return (
    <GlassCard minHeight="160px">
      <div
        style={{
          height: "100%",
          transition:
            "all 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.parentElement.style.background =
            "rgba(14,17,22,0.75)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.parentElement.style.background =
            "var(--glass-bg)";
        }}
      >
        <p
          style={{
            color:
              "var(--text-secondary)",
          }}
        >
          Weather
        </p>

        <div>
          <h2
            style={{
              fontSize: "2rem",
            }}
          >
            18°
          </h2>

          <p>
            Johannesburg
          </p>

          <p
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            Partly Cloudy
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

export default WeatherWidget;