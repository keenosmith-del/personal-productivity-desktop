import GlassCard from "./GlassCard";
import Toggle from "./Toggle";
import { ChevronRight } from "lucide-react";

function ProductivityPreferences() {
  return (
    <GlassCard minHeight="220px">
      <h2
        style={{
          marginBottom: "24px",
          fontWeight: "400",
        }}
      >
        Productivity Preferences
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
          }}
        >
          <p
            style={{
              fontWeight: "300",
            }}
          >
            Focus Sessions
          </p>

          <Toggle
            checked={true}
            onChange={() => { }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
          }}
        >
          <p
            style={{
              fontWeight: "300",
            }}
          >
            Working Hours
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "0.9rem",
                color:
                  "rgba(255,255,255,0.5)",
                fontWeight: "300",
              }}
            >
              09:00 - 17:00
            </span>

            <ChevronRight
              size={16}
              color="rgba(255,255,255,0.4)"
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
          }}
        >
          <p
            style={{
              fontWeight: "300",
            }}
          >
            Default Reminder
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "0.9rem",
                color:
                  "rgba(255,255,255,0.5)",
                fontWeight: "300",
              }}
            >
              15 min
            </span>

            <ChevronRight
              size={16}
              color="rgba(255,255,255,0.4)"
            />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

export default ProductivityPreferences;