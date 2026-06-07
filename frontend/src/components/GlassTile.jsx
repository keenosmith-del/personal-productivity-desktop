function GlassTile({ children }) {
  return (
    <div
      style={{
        background: "var(--glass-bg)",
        border: "1px solid var(--glass-border)",
        borderRadius: "24px",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "var(--shadow-glass)",
        padding: "24px",
      }}
    >
      {children}
    </div>
  );
}

export default GlassTile;