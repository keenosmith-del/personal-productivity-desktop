import GlassCard from "./GlassCard";
import SegmentedControl from "./SegmentedControl";
import { useState } from "react";

function AppearanceSettings() {
  const [theme, setTheme] =
    useState("Dark");

  return (
    <GlassCard minHeight="180px">
      <h2
        style={{
          marginBottom: "24px",
        }}
      >
        Appearance
      </h2>

      <SegmentedControl
        options={[
          "Dark",
          "System",
          "Light",
        ]}
        selected={theme}
        onSelect={setTheme}
      />
    </GlassCard>
  );
}

export default AppearanceSettings;