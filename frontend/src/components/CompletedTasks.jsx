import GlassCard from "./GlassCard";

function CompletedTasks() {
  const completedTasks = [
    "Build Login Page",
    "Create Dashboard",
    "Setup GitHub Repository",
  ];

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
        Completed Tasks
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {completedTasks.map((task) => (
          <div
            key={task}
            style={{
              padding: "14px",

              background:
                "rgba(255,255,255,0.04)",

              border:
                "1px solid var(--glass-border)",

              borderRadius: "12px",

              opacity: 0.75,
            }}
          >
            {task}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

export default CompletedTasks;