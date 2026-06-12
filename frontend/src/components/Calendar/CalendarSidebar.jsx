import GlassCard from "../GlassCard";

function CalendarSidebar() {
  return (
    <GlassCard minHeight="100%">
      <h2
        style={{
          marginBottom: "24px",
          fontSize: "1.4rem",
        }}
      >
        <span
          style={{
            fontWeight: "500",
          }}
        >
          Monday
        </span>

        <span
          style={{
            fontWeight: "400",
            color:
              "var(--text-secondary)",
            marginLeft: "8px",
          }}
        >
          8 June
        </span>
      </h2>

      <div
        style={{
          marginBottom: "32px",
        }}
      >
        <h3
          style={{
            marginBottom: "12px",
            fontWeight: "400",
          }}
        >
          Tasks
        </h3>

        <p
          style={{
            color:
              "var(--text-secondary)",
          }}>
          Finish Productivity Desktop
        </p>

        <p
          style={{
            color:
              "var(--text-secondary)",
          }}
        >
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
            fontWeight: "400",
          }}
        >
          Reminders
        </h3>

        <p
          style={{
            color:
              "var(--text-secondary)",
          }}
        >
          Portfolio Review
        </p>
      </div>

      <div>
        <h3
          style={{
            marginBottom: "12px",
            fontWeight: "400",
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
          Calendar events and notes will appear here.
        </p>
      </div>
    </GlassCard >
  );
}

export default CalendarSidebar;