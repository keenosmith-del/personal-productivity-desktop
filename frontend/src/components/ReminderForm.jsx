import GlassCard from "./GlassCard";

function ReminderForm() {
  return (
    <GlassCard>
      <h2
        style={{
          marginBottom: "24px",
        }}
      >
        Create Reminder
      </h2>

      <p
        style={{
          color:
            "var(--text-secondary)",
        }}
      >
        Reminder creation will be
        added later.
      </p>
    </GlassCard>
  );
}

export default ReminderForm;