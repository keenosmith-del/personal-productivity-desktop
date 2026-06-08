import GlassCard from "./GlassCard";

function TaskAnalytics() {
  return (
    <GlassCard
      style={{
        background: "var(--glass-bg)",
        border:
          "1px solid var(--glass-border)",
        borderRadius:
          "var(--radius-large)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter:
          "blur(20px)",
        padding: "24px",
        minHeight: "320px",
      }}
    >
      <h2
        style={{
          marginBottom: "24px",
        }}
      >
        Task Analytics
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
            Active Tasks
          </p>

          <h1>3</h1>
        </div>

        <div>
          <p
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            Completed
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
            Completion Rate
          </p>

          <h1>80%</h1>
        </div>
      </div>
    </GlassCard>
  );
}

export default TaskAnalytics;