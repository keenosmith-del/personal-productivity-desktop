function ClockWidget() {
  return (
    <div
      style={{
        background:
          "var(--glass-bg)",

        border:
          "1px solid var(--glass-border)",

        borderRadius:
          "var(--radius-large)",

        backdropFilter:
          "blur(20px)",

        padding: "24px",

        minHeight: "160px",

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <p
        style={{
          color:
            "var(--text-secondary)",
        }}
      >
        Time
      </p>

      <div>
        <h2
          style={{
            fontSize: "2rem",
          }}
        >
          22:14
        </h2>

        <p
          style={{
            color:
              "var(--text-secondary)",
          }}
        >
          Sunday
        </p>
      </div>
    </div>
  );
}

export default ClockWidget;