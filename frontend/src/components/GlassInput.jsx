function GlassInput({
  placeholder,
  type = "text",
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      style={{
        width: "100%",

        background:
          "rgba(255,255,255,0.04)",

        border:
          "1px solid var(--glass-border)",

        borderRadius: "14px",

        padding: "14px 16px",

        color:
          "var(--text-primary)",

        outline: "none",

        fontSize: "0.95rem",
      }}
    />
  );
}

export default GlassInput;