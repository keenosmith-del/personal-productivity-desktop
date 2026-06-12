import GlassCard from "../GlassCard";

function CalendarSidebar() {
  return (
    <GlassCard minHeight="100%">
      <h2
        style={{
          marginBottom: "24px",
        }}
      >
        Monday, 8 June
      </h2>

      <div
        style={{
          marginBottom: "32px",
        }}
      >
        <h3
          style={{
            marginBottom: "12px",
          }}
        >
          Tasks
        </h3>

        <p>
          Finish Productivity Desktop
        </p>

        <p>
          Apply for Jobs
        </p>
      </div>

      <div
        style={{
          marginBottom: "32px",
        }}
      >
        <h3
          style={{
            marginBottom: "12px",
          }}
        >
          Reminders
        </h3>

        <p>
          Portfolio Review
        </p>
      </div>

      <div>
        <h3
          style={{
            marginBottom: "12px",
          }}
        >
          Notes
        </h3>

        <p
          style={{
            color:
              "var(--text-secondary)",
          }}
        >
          Calendar events and notes
          will appear here.
        </p>
      </div>
    </GlassCard>
  );
}

export default CalendarSidebar;