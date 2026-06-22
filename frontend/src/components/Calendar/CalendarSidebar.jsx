import GlassCard from "../GlassCard";

function CalendarSidebar({
  selectedDate,
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

  const visibleTasks =
    tasks.slice(0, 2);

  const visibleGoals =
    goals.slice(0, 2);

  const visibleReminders =
    reminders.slice(0, 2);

  const visibleProjects =
    projects.slice(0, 2);

  const remainingTasks =
    tasks.length - 2;

  const remainingGoals =
    goals.length - 2;

  const remainingReminders =
    reminders.length - 2;

  const remainingProjects =
    projects.length - 2;

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

  const selectedDateObject =
    new Date(
      selectedDate.year,
      selectedDate.month,
      selectedDate.day
    );

  const dayName =
    selectedDateObject.toLocaleDateString(
      "default",
      {
        weekday: "long",
      }
    );

  const monthName =
    selectedDateObject.toLocaleDateString(
      "default",
      {
        month: "long",
      }
    );

  // FUNCTIONS
  return (
    <GlassCard
      minHeight="850px"
      style={{
        height: "100%",
        overflowY: "auto",
      }}
    >
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
          {selectedDate.day} {monthName}
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
            fontWeight: "300",
          }}
        >
          Tasks ({tasks.length})
        </h3>
        {tasks.length > 0 ? (
          visibleTasks.map((task) => (
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
        {remainingTasks > 0 && (
          <p
            style={{
              fontSize: "0.72rem",
              opacity: 0.7,
              color:
                "var(--text-secondary)",
              marginTop: "8px",
            }}
          >
            +{remainingTasks} more
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
            fontWeight: "300",
          }}
        >
          Goals ({goals.length})
        </h3>

        {goals.length > 0 ? (
          visibleGoals.map((goal) => (
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
        {remainingGoals > 0 && (
          <p
            style={{
              fontSize: "0.72rem",
              opacity: 0.7,
              color:
                "var(--text-secondary)",
              marginTop: "8px",
            }}
          >
            +{remainingGoals} more
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
            fontWeight: "300",
          }}
        >
          Reminders ({reminders.length})
        </h3>
        {reminders.length > 0 ? (
          visibleReminders.map(
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
        {remainingReminders > 0 && (
          <p
            style={{
              fontSize: "0.72rem",
              opacity: 0.7,
              color:
                "var(--text-secondary)",
              marginTop: "8px",
            }}
          >
            +{remainingReminders} more
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
            fontWeight: "300",
          }}
        >
          Projects ({projects.length})
        </h3>

        {projects.length > 0 ? (
          visibleProjects.map(
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
        {remainingProjects > 0 && (
          <p
            style={{
              fontSize: "0.72rem",
              opacity: 0.7,
              color:
                "var(--text-secondary)",
              marginTop: "8px",
            }}
          >
            +{remainingProjects} more
          </p>
        )}
      </div>
    </GlassCard >
  );
}

export default CalendarSidebar;