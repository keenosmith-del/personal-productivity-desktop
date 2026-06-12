import GlassCard from "../GlassCard";
import { Pen } from "lucide-react";

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
            position: "relative",
            cursor: "pointer",
            transition:
              "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            const overlay =
              e.currentTarget.querySelector(
                ".avatar-edit"
              );

            const avatar =
              e.currentTarget.children[0];

            overlay.style.opacity = 1;

            avatar.style.transform =
              "scale(0.98)";

            avatar.style.opacity = 0.55;
          }}

          onMouseLeave={(e) => {
            const overlay =
              e.currentTarget.querySelector(
                ".avatar-edit"
              );

            const avatar =
              e.currentTarget.children[0];

            overlay.style.opacity = 0;
            avatar.style.transform =
              "scale(1)";
            avatar.style.opacity = 1;
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

              transition:
                "all 0.2s ease",
            }}
          >
            KS
          </div>

          <div
            className="avatar-edit"
            style={{
              position: "absolute",

              top: 0,
              left: 0,

              width: "100%",
              height: "100%",

              borderRadius: "50%",

              background:
                "transparent",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              opacity: 0,

              transition:
                "all 0.2s ease",

              fontSize: "1.2rem",

              color: "white",
            }}
          >
            <Pen size={18} />
          </div>
        </div>

        <div>
          <h2
            style={{
              marginBottom: "10px",

              fontWeight: "400",
            }}
          >
            Keeno Smith
          </h2>

          <p
            style={{
              color:
                "var(--text-secondary)",
              marginBottom: "4px",
              fontWeight: "300",
              letterSpacing: "-0.01em",
            }}
          >
            Software Engineer
          </p>

          <p
            style={{
              color:
                "var(--text-secondary)",
              marginBottom: "4px",
              fontWeight: "300",
              letterSpacing: "-0.01em",
            }}
          >
            keeno@example.com
          </p>

          <p
            style={{
              color:
                "rgba(255,255,255,0.35)",

              fontSize: "0.9rem",

              fontWeight: "300",
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