import GlassCard from "../GlassCard";

function ClockWidget() {
  return (
    <GlassCard minHeight="160px">
      <div
        style={{
          height: "100%",

          display: "flex",

          justifyContent: "center",

          alignItems: "center",

          textAlign: "center",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "300",
            }}
          >
            22:14
          </h2>
        </div>
      </div>
    </GlassCard>
  );
}

export default ClockWidget;