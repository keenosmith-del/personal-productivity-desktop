import GlassCard from "./GlassCard";

function GoalOverview() {
  return (
    <GlassCard minHeight="220px">
      <h2
        style={{
          marginBottom: "24px",
        }}
      >
        Goal Overview
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
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
            Completion Rate
          </p>

          <h1>72%</h1>
        </div>

        <div>
          <p
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            Current Streak
          </p>

          <h1>14 Days</h1>
        </div>
      </div>
    </GlassCard>
  );
}

export default GoalOverview;