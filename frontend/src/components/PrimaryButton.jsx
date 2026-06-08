function PrimaryButton({
  children,
}) {
  return (
    <button
      style={{
        background:
          "rgba(255,255,255,0.08)",

        border:
          "1px solid var(--glass-border)",

        borderRadius: "14px",

        padding:
          "12px 20px",

        color:
          "var(--text-primary)",

        cursor: "pointer",

        fontSize: "0.95rem",

        fontWeight: "500",

        transition:
          "all 0.2s ease",
      }}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;