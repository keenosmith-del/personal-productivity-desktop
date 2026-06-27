import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function CalendarGrid({
  selectedDate,
  setSelectedDate,
  calendarEvents,
  displayDate,
  setDisplayDate,
}) {
  const currentDay =
    new Date().getDate();

  const weekDays = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  const today = new Date();

  const currentMonth =
    displayDate.getMonth();

  const currentYear =
    displayDate.getFullYear();

  const daysInMonth =
    new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();

  const days = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  const previousMonth =
    () => {
      setDisplayDate(
        new Date(
          currentYear,
          currentMonth - 1,
          1
        )
      );
    };

  const nextMonth =
    () => {
      setDisplayDate(
        new Date(
          currentYear,
          currentMonth + 1,
          1
        )
      );
    };

  const goToToday =
    () => {
      setDisplayDate(
        new Date()
      );

      setSelectedDate({
        day: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      });
    };

  return (
    <div
      style={{
        flex: "1",

        background: "var(--glass-bg)",

        border: "1px solid var(--glass-border)",

        borderRadius: "var(--radius-large)",

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
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems:
                "center",
              gap: "12px",
            }}
          >
            <ChevronLeft
              size={18}
              style={{
                cursor: "pointer",
              }}
              onClick={
                previousMonth
              }
            />

            <h1
              style={{
                fontSize:
                  "1.8rem",
                letterSpacing:
                  "-0.02em",
              }}
            >
              <span
                style={{
                  fontWeight:
                    "400",
                }}
              >
                {displayDate.toLocaleString(
                  "default",
                  {
                    month:
                      "long",
                  }
                )}
              </span>

              <span
                style={{
                  fontWeight:
                    "300",
                  color:
                    "var(--text-secondary)",
                  marginLeft:
                    "8px",
                }}
              >
                {currentYear}
              </span>
            </h1>

            <ChevronRight
              size={18}
              style={{
                cursor: "pointer",
              }}
              onClick={nextMonth}
            />
          </div>

          <button
            onClick={goToToday}
            style={{
              background:
                "rgba(255,255,255,0.05)",
              border:
                "1px solid rgba(255,255,255,0.08)",
              borderRadius:
                "999px",
              padding:
                "6px 12px",
              color:
                "var(--text-primary)",
              cursor:
                "pointer",
            }}
          >
            Today
          </button>
        </div>
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
          const eventKey =
            `${currentYear}-${currentMonth}-${day}`;

          const events =
            calendarEvents[
            eventKey
            ] || [];

          const isToday =
            day ===
            today.getDate() &&
            currentMonth ===
            today.getMonth() &&
            currentYear ===
            today.getFullYear();

          const isSelected =
            selectedDate?.day === day &&
            selectedDate?.month ===
            currentMonth &&
            selectedDate?.year ===
            currentYear;

          const visibleEvents =
            events.slice(0, 2);

          const remainingCount =
            events.length - 2;

          return (
            <div
              onClick={() =>
                setSelectedDate({
                  day,
                  month: currentMonth,
                  year: currentYear,
                })
              }
              key={day}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
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
                  isSelected
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


                  color:
                    isToday
                      ? "#4d6893cc"
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
                  gap: "4px",
                  marginTop: "8px",
                  height: "52px",
                  overflow: "hidden",
                }}
              >
                {visibleEvents.map(
                  (event) => (
                    <div
                      key={event.title}
                      style={{
                        height: "18px",

                        display: "flex",
                        alignItems:
                          "center",

                        padding:
                          "0 6px",

                        borderRadius:
                          "8px",

                        fontSize:
                          "0.65rem",

                        overflow:
                          "hidden",

                        whiteSpace:
                          "nowrap",

                        textOverflow:
                          "ellipsis",

                        minWidth: 0,

                        flexShrink: 1,

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
                      fontSize: "0.6rem",

                      color: "var(--text-secondary)",

                      paddingLeft: "4px",

                      opacity: 0.7,
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