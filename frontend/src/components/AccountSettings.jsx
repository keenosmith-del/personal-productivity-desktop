import GlassCard from "./GlassCard";
import PrimaryButton from "./PrimaryButton";

function AccountSettings() {
  return (
    <GlassCard minHeight="180px">
      <h2
        style={{
          marginBottom: "24px",
        }}
      >
        Account
      </h2>

      <div
        style={{
          display: "flex",
          gap: "12px",
        }}
      >
        <PrimaryButton>
          Logout
        </PrimaryButton>

        <PrimaryButton>
          Delete Account
        </PrimaryButton>
      </div>
    </GlassCard>
  );
}

export default AccountSettings;