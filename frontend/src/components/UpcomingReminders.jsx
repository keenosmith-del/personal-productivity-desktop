import GlassCard from "./GlassCard";

function UpcomingReminders() {
  const reminders = [
    {
      title:
        "Submit Course Assignment",
      date: "Tomorrow",
    },
    {
      title:
        "Portfolio Review",
      date: "Friday",
    },
    {
      title:
        "Apply For Jobs",
      date: "Sunday",
    },
  ];

  return (
    <GlassCard>
      <h2
        style={{
          marginBottom: "24px",
        }}
      >
        Upcoming Reminders
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {reminders.map(
          (reminder) => (
            <div
              key={
                reminder.title
              }
              style={{
                display: "flex",

                justifyContent:
                  "space-between",

                padding: "14px",

                background:
                  "rgba(255,255,255,0.04)",

                border:
                  "1px solid var(--glass-border)",

                borderRadius:
                  "12px",
              }}
            >
              <span>
                {
                  reminder.title
                }
              </span>

              <span
                style={{
                  color:
                    "var(--text-secondary)",
                }}
              >
                {
                  reminder.date
                }
              </span>
            </div>
          )
        )}
      </div>
    </GlassCard>
  );
}

export default UpcomingReminders;