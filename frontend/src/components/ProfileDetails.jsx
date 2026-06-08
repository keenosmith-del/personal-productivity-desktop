import GlassCard from "./GlassCard";

function ProfileDetails() {
  return (
    <GlassCard minHeight="260px">
      <div
        style={{
          display: "flex",
          gap: "24px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "120px",
            height: "120px",

            borderRadius: "50%",

            background:
              "rgba(255,255,255,0.08)",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            fontSize: "2rem",
            fontWeight: "500",
          }}
        >
          KS
        </div>

        <div>
          <h2
            style={{
              marginBottom: "16px",
            }}
          >
            Keeno Smith
          </h2>

          <p
            style={{
              color:
                "var(--text-secondary)",
              marginBottom: "8px",
            }}
          >
            Software Engineer
          </p>

          <p
            style={{
              color:
                "var(--text-secondary)",
              marginBottom: "8px",
            }}
          >
            keeno@example.com
          </p>

          <p
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            Member since June 2026
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

export default ProfileDetails;