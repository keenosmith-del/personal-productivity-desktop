import GlassCard from "../GlassCard";
import Toggle from "../Toggle";

import { ChevronRight } from "lucide-react";

function ProductivityPreferences({
  preferences,
  savePreferences,
  onWorkingHoursClick,
  onReminderClick,
}) {
  const focusSessions =
    preferences?.focusSessions ??
    true;

  const workingHours =
    preferences?.workingHours ||
    "09:00 - 17:00";

  const defaultReminder =
    preferences?.defaultReminder ||
    "15 mins";
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
          gap: "12px",
        }}
      >
        <div
          style={{
            display: "flex",

            justifyContent:
              "space-between",

            alignItems:
              "center",

            cursor: "default",

            padding: "8px 12px",

            borderRadius: "12px",

            transition:
              "all 0.2s ease",
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
            checked={focusSessions}
            onChange={() =>
              savePreferences({
                focusSessions:
                  !focusSessions,
              })
            }
          />
        </div>

        <div
          onClick={onWorkingHoursClick}
          style={{
            display: "flex",

            justifyContent:
              "space-between",

            alignItems:
              "center",

            cursor: "pointer",

            padding: "8px 12px",

            borderRadius: "12px",

            transition:
              "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "rgba(255,255,255,0.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "transparent";
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
              {workingHours}
            </span>

            <ChevronRight
              size={16}
              color="rgba(255,255,255,0.4)"
            />
          </div>
        </div>

        <div
          onClick={onReminderClick}
          style={{
            display: "flex",

            justifyContent:
              "space-between",

            alignItems:
              "center",

            cursor: "pointer",

            padding: "8px 12px",

            borderRadius: "12px",

            transition:
              "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "rgba(255,255,255,0.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "transparent";
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
              {defaultReminder}
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