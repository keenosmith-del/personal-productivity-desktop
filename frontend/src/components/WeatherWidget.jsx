import GlassCard from "./GlassCard";
import { CloudSun } from "lucide-react";

function WeatherWidget() {
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

          transition:
            "all 0.25s ease",
        }}
      >
        <p
          style={{
            color:
              "var(--text-secondary)",
          }}
        >
          Johannesburg
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "2px",
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            <CloudSun
              size={28}
              strokeWidth={1.5}
            />

            <h2
              style={{
                fontSize: "2.2rem",
                fontWeight: "400",
              }}
            >
              18°
            </h2>
          </div>

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