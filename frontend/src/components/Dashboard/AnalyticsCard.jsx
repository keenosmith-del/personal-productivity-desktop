
import GlassCard from "../GlassCard";

function AnalyticsCard({
  title,
  value,
  subtitle,
  chips = [],
  activityLines = [],
  wide = false,
  clickable = false,
  onClick,
}) {
  const hasData =
    chips.length > 0 ||
    activityLines.length > 0;
  return (
    <GlassCard
      minHeight={
        wide ? "180px" : "160px"
      }
    >
      <div
        onClick={onClick}
        style={{
          height: "100%",

          display: "flex",

          flexDirection: "column",

          justifyContent: "center",

          alignItems: "center",

          textAlign: "center",

          gap: "10px",

          transition:
            "all 0.25s ease",

          cursor:
            clickable
              ? "pointer"
              : "default",

          background: "transparent",

          borderRadius: "24px",
        }}
        onMouseEnter={(e) => {
          if (!clickable) return;

          e.currentTarget.style.background =
            "rgba(255,255,255,0.04)";
        }}

        onMouseLeave={(e) => {
          if (!clickable) return;

          e.currentTarget.style.background =
            "transparent";
        }}
      >
        <p
          style={{
            color:
              "var(--text-secondary)",

            fontSize: "0.85rem",
            fontWeight: "400",
          }}
        >
          {title}
        </p>

        <div>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "400",
            }}
          >
            {value}
          </h2>

          <p
            style={{
              marginTop: "8px",

              color:
                "var(--text-secondary)",
            }}
          >
            {subtitle}
          </p>

          {chips.length > 0 && (
            <div
              style={{
                display: "flex",

                gap: "8px",

                justifyContent: "center",

                flexWrap: "wrap",

                marginTop: "12px",
              }}
            >
              {chips.map((chip) => (
                <span
                  key={chip.label}
                  style={{
                    padding: "4px 8px",

                    borderRadius: "999px",

                    fontSize: "0.7rem",

                    background: `${chip.color}33`,

                    border: `1px solid ${chip.color}66`,

                    color:
                      "var(--text-secondary)",
                  }}
                >
                  {chip.label}
                </span>
              ))}
            </div>
          )}
          {activityLines.length > 0 && (
            <div
              style={{
                marginTop: "12px",

                fontSize: "0.72rem",

                color:
                  "var(--text-secondary)",

                lineHeight: 1.5,
              }}
            >
              {activityLines.map(
                (line) => (
                  <div key={line}>
                    {line}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}

export default AnalyticsCard;