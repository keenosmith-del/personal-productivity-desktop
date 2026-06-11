
function PrimaryButton({
  children,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
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

        fontWeight: "400",

        transition:
          "all 0.2s ease",

        transform: "translateY(0)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background =
          "rgba(255,255,255,0.12)";

        e.currentTarget.style.transform =
          "translateY(-2px)";
      }}

      onMouseLeave={(e) => {
        e.currentTarget.style.background =
          "rgba(255,255,255,0.08)";

        e.currentTarget.style.transform =
          "translateY(0)";
      }}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;