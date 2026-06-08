import GlassCard from "./GlassCard";

function ClockWidget() {
  return (
    <GlassCard minHeight="160px">
      <div
        style={{
          height: "100%",
          transition:
            "all 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.parentElement.style.background =
            "rgba(14,17,22,0.75)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.parentElement.style.background =
            "var(--glass-bg)";
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
    </GlassCard>
  );
}

export default ClockWidget;