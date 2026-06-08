import GlassCard from "./GlassCard";

function GoalAnalytics() {
  return (
    <GlassCard>
      <h2
        style={{
          marginBottom: "24px",
        }}
      >
        Goal Analytics
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div>
          <p
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            Goals Achieved
          </p>

          <h1>8</h1>
        </div>

        <div>
          <p
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            Active Goals
          </p>

          <h1>4</h1>
        </div>

        <div>
          <p
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            Progress
          </p>

          <h1>72%</h1>
        </div>
      </div>
    </GlassCard>
  );
}

export default GoalAnalytics;