import GlassCard from "../GlassCard";

function CalendarSidebar({
  selectedDay,
  events,
}) {
  // COMPONENT STATES
  const tasks =
    events.filter(
      (event) =>
        event.type === "task"
    );

  const goals =
    events.filter(
      (event) =>
        event.type === "goal"
    );

  const reminders =
    events.filter(
      (event) =>
        event.type ===
        "reminder"
    );

  const projects =
    events.filter(
      (event) =>
        event.type ===
        "project"
    );

  const MetaChip = ({
    label,
    color,
  }) => (
    <span
      style={{
        display: "inline-flex",

        alignItems: "center",

        padding: "4px 8px",

        borderRadius: "999px",

        fontSize: "0.7rem",

        marginTop: "6px",

        background:
          `${color}20`,

        border:
          `1px solid ${color}40`,

        color,
      }}
    >
      {label}
    </span>
  );

  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const dayName =
    dayNames[
    (selectedDay - 1) % 7
    ];

  // FUNCTIONS
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
          {dayName}
        </span>

        <span
          style={{
            fontWeight: "400",
            color:
              "var(--text-secondary)",
            marginLeft: "8px",
          }}
        >
          {selectedDay} June
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
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <p
              key={task.title}
              style={{
                color:
                  "var(--text-secondary)",
              }}
            >
              {task.title}

              <br />

              <MetaChip
                label={
                  task.priority
                }
                color="#72715c"
              />
            </p>
          ))
        ) : (
          <p
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            No tasks.
          </p>
        )}
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
          Goals
        </h3>

        {goals.length > 0 ? (
          goals.map((goal) => (
            <p
              key={goal.title}
              style={{
                color:
                  "var(--text-secondary)",
              }}
            >
              <>
                {goal.title}

                <br />

                <MetaChip
                  label={
                    goal.category
                  }
                  color="#c59c70"
                />
              </>
            </p>
          ))
        ) : (
          <p
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            No goals.
          </p>
        )}
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
        {reminders.length > 0 ? (
          reminders.map(
            (reminder) => (
              <p
                key={
                  reminder.title
                }
                style={{
                  color:
                    "var(--text-secondary)",
                }}
              >
                {reminder.title}

                <br />

                <MetaChip
                  label={
                    reminder.category
                  }
                  color="#83545c"
                />
              </p>
            )
          )
        ) : (
          <p
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            No reminders.
          </p>
        )}
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
          Projects
        </h3>

        {projects.length > 0 ? (
          projects.map(
            (project) => (
              <p
                key={project.title}
                style={{
                  color:
                    "var(--text-secondary)",
                }}
              >
                {project.title}

                <br />

                <MetaChip
                  label={
                    project.category
                  }
                  color="#854c49"
                />
              </p>
            )
          )
        ) : (
          <p
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            No projects.
          </p>
        )}
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