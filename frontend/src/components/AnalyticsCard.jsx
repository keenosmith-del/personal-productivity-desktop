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
  clickable = false,
  onClick,
}) {
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
        }}
        onMouseEnter={(e) => {
          if (!clickable) return;

          e.currentTarget.parentElement.style.background =
            "rgba(14,17,22,0.75)";
        }}

        onMouseLeave={(e) => {
          if (!clickable) return;

          e.currentTarget.parentElement.style.background =
            "var(--glass-bg)";
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
        </div>
      </div>
    </GlassCard>
  );
}

export default AnalyticsCard;