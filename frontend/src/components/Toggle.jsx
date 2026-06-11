function Toggle({
    checked,
    onChange,
}) {
    return (
        <div
            onClick={onChange}
            style={{
                width: "44px",
                height: "24px",

                borderRadius:
                    "999px",

                background: checked
                    ? "#52677d"
                    : "rgba(255,255,255,0.12)",

                position:
                    "relative",

                cursor: "pointer",

                transition:
                    "all 0.2s ease",
            }}
        >
            <div
                style={{
                    width: "20px",
                    height: "20px",

                    borderRadius:
                        "50%",

                    background:
                        "white",

                    position:
                        "absolute",

                    top: "2px",

                    left: checked
                        ? "22px"
                        : "2px",

                    transition:
                        "all 0.2s ease",
                }}
            />
        </div>
    );
}

export default Toggle;