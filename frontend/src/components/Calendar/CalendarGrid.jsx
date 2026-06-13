function CalendarGrid({
  selectedDay,
  setSelectedDay,
}) {
  const currentDay = 8;

  const weekDays = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  const days = Array.from(
    { length: 30 },
    (_, index) => index + 1
  );

  const calendarEvents = {
    3: [
      {
        title: "Gym",
        type: "goal",
      },
    ],

    5: [
      {
        title: "Dashboard",
        type: "task",
      },
    ],

    8: [
      {
        title: "Portfolio",
        type: "goal",
      },

      {
        title: "Review",
        type: "reminder",
      },

      {
        title: "Desktop",
        type: "project",
      },

      {
        title: "Jobs",
        type: "task",
      },
    ],

    14: [
      {
        title: "Checkup",
        type: "reminder",
      },
    ],

    21: [
      {
        title: "Submission",
        type: "project",
      },
    ],
  };

  return (
    <div
      style={{
        flex: "1",

        background:
          "var(--glass-bg)",

        border:
          "1px solid var(--glass-border)",

        borderRadius:
          "var(--radius-large)",

        padding: "24px",

        display: "flex",

        flexDirection: "column",

        minHeight: "850px",
      }}
    >
      <div
        style={{
          marginBottom: "24px",
        }}
      >
        <h1
          style={{
            fontSize: "1.8rem",
            letterSpacing: "-0.02em",
          }}
        >
          <span
            style={{
              fontWeight: "600",
            }}
          >
            June
          </span>

          <span
            style={{
              fontWeight: "400",
              color:
                "var(--text-secondary)",
              marginLeft: "8px",
            }}
          >
            2026
          </span>
        </h1>
      </div>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(7, 1fr)",

          gap: "8px",

          marginBottom: "16px",
        }}
      >
        {weekDays.map((day) => (
          <div
            key={day}
            style={{
              textAlign: "center",

              color:
                "var(--text-secondary)",

              fontSize: "0.9rem",
            }}
          >
            {day}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(7, 1fr)",

          gap: "12px",

        }}
      >
        {days.map((day) => {
          const events =
            calendarEvents[day] || [];

          const visibleEvents =
            events.slice(0, 2);

          const remainingCount =
            events.length - 2;

          return (
            <div
              onClick={() =>
                setSelectedDay(day)
              }
              key={day}
              onMouseEnter={(e) => {
                if (day !== selectedDay) {
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (day !== selectedDay) {
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.02)";
                }
              }}
              style={{
                height: "130px",

                border:
                  "1px solid rgba(255,255,255,0.04)",

                borderRadius: "12px",

                padding: "12px",

                background:
                  day === selectedDay
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(255,255,255,0.02)",

                cursor: "pointer",

                transition:
                  "all 0.2s ease",

                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",

                  borderRadius: "50%",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  background:
                    day === currentDay
                      ? "#52677d"
                      : "transparent",

                  color:
                    day === currentDay
                      ? "#ffffff"
                      : "var(--text-primary)",

                  fontSize: "0.9rem",
                  fontWeight: "400",
                }}
              >
                {day}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  marginTop: "10px",
                }}
              >
                {visibleEvents.map(
                  (event) => (
                    <div
                      key={event.title}
                      style={{
                        height: "22px",

                        display: "flex",
                        alignItems:
                          "center",

                        padding:
                          "0 8px",

                        borderRadius:
                          "8px",

                        fontSize:
                          "0.72rem",

                        overflow:
                          "hidden",

                        whiteSpace:
                          "nowrap",

                        textOverflow:
                          "ellipsis",

                        background:
                          event.type ===
                            "goal"
                            ? "#c59c70"
                            : event.type ===
                              "task"
                              ? "#72715c"
                              : event.type ===
                                "reminder"
                                ? "#83545c"
                                : "#854c49",

                        color: "#fff",
                      }}
                    >
                      {event.title}
                    </div>
                  )
                )}

                {remainingCount > 0 && (
                  <div
                    style={{
                      fontSize:
                        "0.72rem",

                      color:
                        "var(--text-secondary)",

                      paddingLeft:
                        "4px",
                    }}
                  >
                    +{remainingCount} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarGrid;