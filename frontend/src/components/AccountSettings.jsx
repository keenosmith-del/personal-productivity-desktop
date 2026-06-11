import GlassCard from "./GlassCard";
import { ChevronRight } from "lucide-react";

function AccountSettings() {
  return (
    <GlassCard minHeight="180px">
      <h2
        style={{
          marginBottom: "24px",
          fontWeight: "400",
        }}
      >
        Account
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
            cursor: "pointer",
          }}
        >
          <p
            style={{
              fontWeight: "300",
            }}
          >
            Logout
          </p>

          <ChevronRight
            size={16}
            color="rgba(255,255,255,0.4)"
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
            cursor: "pointer",
          }}
        >
          <p
            style={{
              color: "#d97c7c",
              fontWeight: "300",
            }}
          >
            Delete Account
          </p>

          <ChevronRight
            size={16}
            color="#d97c7c"
          />
        </div>
      </div>
    </GlassCard>
  );
}

export default AccountSettings;