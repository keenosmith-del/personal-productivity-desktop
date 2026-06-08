/**
 * Universal dashboard card.
 *
 * Used throughout the application.
 */

function AnalyticsCard({
  title,
  value,
  subtitle,
  wide = false,
}) {
  return (
    <div
      style={{
        background:
          "var(--glass-bg)",

        border:
          "1px solid var(--glass-border)",

        borderRadius:
          "var(--radius-large)",

        backdropFilter: "blur(20px)",

        WebkitBackdropFilter:
          "blur(20px)",

        boxShadow:
          "var(--shadow-glass)",

        padding: "24px",

        minHeight: wide
          ? "180px"
          : "160px",

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
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
  );
}

export default AnalyticsCard;