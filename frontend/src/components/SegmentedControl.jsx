function SegmentedControl({
  options,
  selected,
  onSelect,
}) {
  return (
    <div
      style={{
        display: "flex",

        background: "transparent",

        border: "1px solid rgba(255,255,255,0.08)",

        borderRadius: "999px",

        padding: "8px 12px",

        color: "var(--text-secondary)",

        fontSize: "0.8rem",

        fontWeight: "300",

        cursor: "pointer",

        transition: "all 0.2s ease",

        width: "fit-content",
      }}
    >
      {options.map((option) => (
        <button
          key={option}
          onClick={() =>
            onSelect(option)
          }
          onMouseEnter={(e) => {
            if (selected !== option) {
              e.currentTarget.style.background =
                "rgba(255,255,255,0.06)";
            }
          }}

          onMouseLeave={(e) => {
            if (selected !== option) {
              e.currentTarget.style.background =
                "transparent";
            }
          }}
          style={{
            border: "none",

            background:
              selected === option
                ? "rgba(255,255,255,0.10)"
                : "transparent",

            color:
              "var(--text-primary)",

            borderRadius: "999px",

            padding: "8px 14px",

            cursor: "pointer",

            fontSize: "0.85rem",

            fontWeight: "300",

            transition: "all 0.2s ease",
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default SegmentedControl;