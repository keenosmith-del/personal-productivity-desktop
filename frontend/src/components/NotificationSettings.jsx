import GlassCard from "./GlassCard";

function NotificationSettings() {
  return (
    <GlassCard minHeight="180px">
      <h2
        style={{
          marginBottom: "24px",
        }}
      >
        Notifications
      </h2>

      <p>
        Daily Summary
      </p>

      <p>
        Reminder Notifications
      </p>

      <p>
        Goal Progress Updates
      </p>
    </GlassCard>
  );
}

export default NotificationSettings;