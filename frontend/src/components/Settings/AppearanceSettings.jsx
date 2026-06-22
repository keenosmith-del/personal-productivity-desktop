import GlassCard from "../GlassCard";
import SegmentedControl from "../SegmentedControl";

function AppearanceSettings({
  preferences,
  savePreferences,
}) {
  const currentTheme =
    preferences?.theme ||
    "Dark";
  return (
    <GlassCard minHeight="180px">
      <h2
        style={{
          marginBottom: "6px",
          fontWeight: "400",
        }}
      >
        Appearance
      </h2>

      <p
        style={{
          color:
            "var(--text-secondary)",

          fontWeight: "300",

          fontSize: "0.9rem",

          marginBottom: "24px",
        }}
      >
        Choose how the application appears.
      </p>

      <SegmentedControl
        options={[
          "Dark",
          "System",
          "Light",
        ]}
        selected={currentTheme}
        onSelect={(value) =>
          savePreferences({
            theme: value,
          })
        }
      />
    </GlassCard>
  );
}

export default AppearanceSettings;