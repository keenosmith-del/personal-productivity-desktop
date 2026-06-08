import GlassCard from "./GlassCard";

function ActiveTasks() {
  const tasks = [
    {
      title: "Finish Productivity Desktop",
      priority: "High",
    },
    {
      title: "Apply for Frontend Roles",
      priority: "Medium",
    },
    {
      title: "Complete AI Course Module",
      priority: "Low",
    },
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
        Active Tasks
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {tasks.map((task) => (
          <div
            key={task.title}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                "space-between",

              padding: "14px",

              background:
                "rgba(255,255,255,0.04)",

              border:
                "1px solid var(--glass-border)",

              borderRadius: "12px",
            }}
          >
            <span>
              {task.title}
            </span>

            <span
              style={{
                fontSize: "0.85rem",
                color:
                  "var(--text-secondary)",
              }}
            >
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

export default ActiveTasks;