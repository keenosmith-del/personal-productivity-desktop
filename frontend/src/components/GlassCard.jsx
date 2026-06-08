function GlassCard({
  children,
  minHeight = "320px",
}) {
  return (
    <div
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

        minHeight,
      }}
    >
      {children}
    </div>
  );
}

export default GlassCard;