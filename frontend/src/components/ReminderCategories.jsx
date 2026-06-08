import GlassCard from "./GlassCard";

function ReminderCategories() {
  const categories = [
    {
      name: "Work",
      count: 5,
    },
    {
      name: "Study",
      count: 4,
    },
    {
      name: "Personal",
      count: 3,
    },
    {
      name: "Health",
      count: 2,
    },
  ];

  return (
    <GlassCard>
      <h2
        style={{
          marginBottom: "24px",
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
              <span>
                {category.name}
              </span>

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