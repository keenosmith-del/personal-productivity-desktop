import GlassCard from "./GlassCard";

function ProductivityStats() {
  return (
    <GlassCard minHeight="300px">
      <h2
        style={{
          marginBottom: "32px",
        }}
      >
        Productivity Statistics
      </h2>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(4, 1fr)",

          gap: "24px",
        }}
      >
        <div>
          <p
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            Tasks Completed
          </p>

          <h1>48</h1>
        </div>

        <div>
          <p
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            Goals Achieved
          </p>

          <h1>12</h1>
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

          <h1>14</h1>
        </div>

        <div>
          <p
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            Productivity Score
          </p>

          <h1>82%</h1>
        </div>
      </div>
    </GlassCard>
  );
}

export default ProductivityStats;