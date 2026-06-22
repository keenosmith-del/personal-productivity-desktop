import GlassCard from "../GlassCard";
import { useEffect, useState } from "react";

function ClockWidget() {
  const [time, setTime] = useState(getTime());

  function getTime() {
    return new Date().toLocaleTimeString(
      "en-ZA",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
            {time}
          </h2>
        </div>
      </div>
    </GlassCard>
  );
}

export default ClockWidget;