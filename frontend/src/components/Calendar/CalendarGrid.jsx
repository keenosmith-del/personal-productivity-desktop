function CalendarGrid() {
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

  return (
    <div
      style={{
        flex: 1,

        background:
          "var(--glass-bg)",

        border:
          "1px solid var(--glass-border)",

        borderRadius:
          "var(--radius-large)",

        padding: "24px",

        display: "flex",

        flexDirection: "column",
      }}
    >
      <div
        style={{
          marginBottom: "24px",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "500",
          }}
        >
          June 2026
        </h1>
      </div>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(7, 1fr)",

          gap: "12px",

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

          flex: 1,
        }}
      >
        {days.map((day) => (
          <div
            key={day}
            style={{
              minHeight: "90px",

              border:
                "1px solid rgba(255,255,255,0.04)",

              borderRadius: "12px",

              padding: "12px",

              background:
                day === 8
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(255,255,255,0.02)",

              cursor: "pointer",

              transition:
                "all 0.2s ease",
            }}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarGrid;