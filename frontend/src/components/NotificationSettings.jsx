import GlassCard from "./GlassCard";
import { useState } from "react";
import Toggle from "./Toggle";

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
          justifyContent:
            "space-between",
          alignItems: "center",
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
          alignItems: "center",
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
          alignItems: "center",
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

    </GlassCard>
  );
}

export default NotificationSettings;