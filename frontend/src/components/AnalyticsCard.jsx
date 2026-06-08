/**
 * Universal dashboard card.
 *
 * Used throughout the application.
 */
import GlassCard from "./GlassCard";

function AnalyticsCard({
  title,
  value,
  subtitle,
  wide = false,
}) {
  return (
    <GlassCard
      minHeight={
        wide ? "180px" : "160px"
      }
    >
      <div
        style={{
          height: "100%",
          transition:
            "all 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.parentElement.style.background =
            "rgba(14,17,22,0.75)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.parentElement.style.background =
            "var(--glass-bg)";
        }}
      >
        <p
          style={{
            color:
              "var(--text-secondary)",

            fontSize: "0.9rem",
          }}
        >
          {title}
        </p>

        <div>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "600",
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
        </div>
      </div>
    </GlassCard>
  );
}

export default AnalyticsCard;