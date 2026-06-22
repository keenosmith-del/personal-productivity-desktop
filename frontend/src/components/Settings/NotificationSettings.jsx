import GlassCard from "../GlassCard";
import Toggle from "../Toggle";

function NotificationSettings({
  preferences,
  savePreferences,
}) {
  const dailySummary =
    preferences?.dailySummary ??
    true;

  const reminders =
    preferences?.reminderNotifications ??
    true;

  const goalUpdates =
    preferences?.goalUpdates ??
    false;
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
              savePreferences({
                dailySummary:
                  !dailySummary,
              })
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
              savePreferences({
                reminderNotifications:
                  !reminders,
              })
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
              savePreferences({
                goalUpdates:
                  !goalUpdates,
              })
            }
          />
        </div>
      </div>

    </GlassCard>
  );
}

export default NotificationSettings;