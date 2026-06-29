import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function CalendarGrid({
  selectedDate,
  setSelectedDate,
  setShowCalendarModal,
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

  const eventStyles = {
    task: {
      bg: "#4d689333",
      border: "#4d689366",
    },

    goal: {
      bg: "#bf877633",
      border: "#bf877666",
    },

    reminder: {
      bg: "#5d766233",
      border: "#5d766266",
    },

    project: {
      bg: "#72515c33",
      border: "#72515c66",
    },
  };

  return (
    <div
      style={{
        flex: "1",

        background: "var(--glass-bg)",

        border: "1px solid var(--glass-border)",

        borderRadius: "var(--radius-large)",

        padding: "20px",
        height: "calc(100vh - 100px)",
        minHeight: "800px",

        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",

        overflowY: "auto",
        overflowX: "hidden",

        display: "flex",

        flexDirection: "column",
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
                margin: 0,

                fontSize: "1.35rem",

                letterSpacing: "-0.03em",

                display: "flex",

                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontWeight:
                    "350",
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

              fontSize: "0.75rem",
              fontWeight: "300",
              opacity: 0.55,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
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

          gap: "8px",

          alignContent: "start",
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
              onClick={() => {
                setSelectedDate({
                  day,
                  month: currentMonth,
                  year: currentYear,
                });

                setShowCalendarModal(true);
              }}
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
                height: "120px",

                borderRadius: "18px",

                padding: "10px",

                background:
                  isSelected
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(255,255,255,0.02)",

                border:
                  isSelected
                    ? "1px solid rgba(255,255,255,0.10)"
                    : "1px solid rgba(255,255,255,0.04)",

                cursor: "pointer",

                transition:
                  "all 0.2s ease",

                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",

                  fontSize: "0.78rem",

                  fontWeight: "300",

                  opacity: isToday ? 1 : 0.85,

                  background: isToday
                    ? "rgba(77,104,147,0.12)"
                    : "transparent",

                  border: isToday
                    ? "1px solid rgba(77,104,147,0.25)"
                    : "none",

                  borderRadius: "50%",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",


                  color:
                    isToday
                      ? "#4d6893cc"
                      : "var(--text-primary)",

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
                  height: "60px",
                  overflow: "hidden",
                }}
              >
                {visibleEvents.map((event) => {
                  const eventStyle =
                    eventStyles[event.type] ||
                    eventStyles.task;

                  return (
                    <div
                      key={event.title}
                      style={{
                        height: "16px",

                        padding: "0 5px",

                        fontSize: "0.58rem",

                        fontWeight: "300",

                        borderRadius: "6px",

                        background: eventStyle.bg,

                        border: `1px solid ${eventStyle.border}`,

                        color: "var(--text-primary)",

                        display: "flex",

                        alignItems: "center",

                        overflow: "hidden",

                        whiteSpace: "nowrap",

                        textOverflow: "ellipsis",

                        minWidth: 0,

                        flexShrink: 1,
                      }}
                    >
                      {event.title}
                    </div>
                  );
                })}

                {remainingCount > 0 && (
                  <div
                    style={{
                      fontSize: "0.58rem",

                      fontWeight: "300",

                      opacity: 0.45,

                      letterSpacing: "0.01em",

                      color: "var(--text-secondary)",

                      paddingLeft: "4px",
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