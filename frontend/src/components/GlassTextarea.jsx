function GlassTextarea({
  placeholder,
  rows = 4,
}) {
  return (
    <textarea
      placeholder={placeholder}
      rows={rows}
      style={{
        width: "100%",

        resize: "none",

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

export default GlassTextarea;