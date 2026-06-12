import GlassCard from "../GlassCard";
import ProgressRing from "../ProgressRing";

function ProductivityStats() {
  return (
    <GlassCard minHeight="300px">
      <h2
        style={{
          marginBottom: "32px",
          fontWeight: "400",
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
        <div
          style={{
            display: "flex",

            flexDirection: "column",

            alignItems: "center",

            gap: "12px",
          }}
        >
          <ProgressRing value={75} />

          <p
            style={{
              color:
                "var(--text-secondary)",

              fontWeight: "300",
            }}
          >
            Tasks Completed
          </p>

          <h2
            style={{
              fontWeight: "400",
            }}
          >
            48
          </h2>
        </div>

        <div
          style={{
            display: "flex",

            flexDirection: "column",

            alignItems: "center",

            gap: "12px",
          }}
        >
          <ProgressRing value={60} />

          <p
            style={{
              color:
                "var(--text-secondary)",

              fontWeight: "300",
            }}
          >
            Goals Achieved
          </p>

          <h2
            style={{
              fontWeight: "400",
            }}
          >
            12
          </h2>
        </div>

        <div
          style={{
            display: "flex",

            flexDirection: "column",

            alignItems: "center",

            gap: "12px",
          }}
        >
          <ProgressRing value={82} />

          <p
            style={{
              color:
                "var(--text-secondary)",

              fontWeight: "300",
            }}
          >
            Current Streak
          </p>

          <h2
            style={{
              fontWeight: "400",
            }}
          >
            14
          </h2>
        </div>

        <div
          style={{
            display: "flex",

            flexDirection: "column",

            alignItems: "center",

            gap: "12px",
          }}
        >
          <ProgressRing value={82} />

          <p
            style={{
              color:
                "var(--text-secondary)",

              fontWeight: "300",
            }}
          >
            Productivity Score
          </p>

          <h2
            style={{
              fontWeight: "400",
            }}
          >
            82
          </h2>
        </div>
      </div>
    </GlassCard>
  );
}

export default ProductivityStats;