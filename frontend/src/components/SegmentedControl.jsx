function SegmentedControl({
  options,
  selected,
  onSelect,
}) {
  return (
    <div
      style={{
        display: "flex",

        background:
          "rgba(255,255,255,0.04)",

        border:
          "1px solid var(--glass-border)",

        borderRadius: "14px",

        padding: "4px",

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

            padding:
              "10px 18px",

            borderRadius:
              "10px",

            cursor: "pointer",

            fontSize: "0.9rem",

            fontWeight: "500",

            transition:
              "all 0.2s ease",
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default SegmentedControl;