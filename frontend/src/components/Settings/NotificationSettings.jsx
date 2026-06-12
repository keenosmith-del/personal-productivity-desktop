import GlassCard from "../GlassCard";
import Toggle from "../Toggle";

import { useState } from "react";

function NotificationSettings() {
  // COMPONENT STATES
  const [dailySummary, setDailySummary] =
    useState(true);

  const [reminders, setReminders] =
    useState(true);

  const [goalUpdates, setGoalUpdates] =
    useState(false);

  // FUNCTIONS
  return (
    <GlassCard minHeight="180px">
      <h2
        style={{
          marginBottom: "24px",
          fontWeight: "400",
        }}
      >
        Notifications
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
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
            Daily Summary
          </p>

          <Toggle
            checked={dailySummary}
            onChange={() =>
              setDailySummary(
                !dailySummary
              )
            }
          />
        </div>

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
            Reminder Notifications
          </p>

          <Toggle
            checked={reminders}
            onChange={() =>
              setReminders(
                !reminders
              )
            }
          />
        </div>

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
            Goal Progress Updates
          </p>

          <Toggle
            checked={goalUpdates}
            onChange={() =>
              setGoalUpdates(
                !goalUpdates
              )
            }
          />
        </div>
      </div>

    </GlassCard>
  );
}

export default NotificationSettings;