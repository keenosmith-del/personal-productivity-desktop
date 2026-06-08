import GlassCard from "./GlassCard";

function ReminderTimeline() {
  return (
    <GlassCard minHeight="220px">
      <h2
        style={{
          marginBottom: "24px",
        }}
      >
        Reminder Timeline
      </h2>

      <div
        style={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",

          marginTop: "40px",
        }}
      >
        <span>Today</span>

        <span>Tomorrow</span>

        <span>Friday</span>

        <span>Weekend</span>
      </div>
    </GlassCard>
  );
}

export default ReminderTimeline;