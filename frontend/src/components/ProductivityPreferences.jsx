import GlassCard from "./GlassCard";

function ProductivityPreferences() {
  return (
    <GlassCard minHeight="180px">
      <h2
        style={{
          marginBottom: "24px",
        }}
      >
        Productivity Preferences
      </h2>

      <p>
        Working Hours
      </p>

      <p>
        Focus Sessions
      </p>

      <p>
        Reminder Defaults
      </p>
    </GlassCard>
  );
}

export default ProductivityPreferences;