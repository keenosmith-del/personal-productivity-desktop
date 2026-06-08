import GlassCard from "./GlassCard";

function ActiveGoals() {
  const goals = [
    "Become Full-Stack Developer",
    "Complete Generative AI Course",
    "Launch Portfolio Website",
  ];

  return (
    <GlassCard>
      <h2
        style={{
          marginBottom: "24px",
        }}
      >
        Active Goals
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {goals.map((goal) => (
          <div
            key={goal}
            style={{
              padding: "14px",

              background:
                "rgba(255,255,255,0.04)",

              border:
                "1px solid var(--glass-border)",

              borderRadius: "12px",
            }}
          >
            {goal}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

export default ActiveGoals;