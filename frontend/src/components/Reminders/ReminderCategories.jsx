import GlassCard from "../GlassCard";

function ReminderCategories() {
  const categories = [
    {
      name: "Work",
      count: 5,
      color: "#1a1d29",
    },
    {
      name: "Study",
      count: 4,
      color: "#3d3f4a",
    },
    {
      name: "Personal",
      count: 3,
      color: "#52677d",
    },
    {
      name: "Health",
      count: 2,
      color: "#7d8491",
    },
  ];

  return (
    <GlassCard>
      <h2
        style={{
          marginBottom: "24px",

          fontWeight: "400",

          letterSpacing: "-0.02em",
        }}
      >
        Categories
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {categories.map(
          (category) => (
            <div
              key={category.name}
              style={{
                display: "flex",

                justifyContent:
                  "space-between",

                alignItems: "center",

                paddingBottom:
                  "12px",

                borderBottom:
                  "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",

                    borderRadius: "50%",

                    background:
                      category.color,
                  }}
                />

                <span
                  style={{
                    fontWeight: "300",

                    letterSpacing:
                      "-0.015em",
                  }}
                >
                  {category.name}
                </span>
              </div>

              <span
                style={{
                  color:
                    "var(--text-secondary)",
                }}
              >
                {category.count}
              </span>
            </div>
          )
        )}
      </div>
    </GlassCard>
  );
}

export default ReminderCategories;