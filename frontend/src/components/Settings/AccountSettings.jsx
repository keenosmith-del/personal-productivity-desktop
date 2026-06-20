import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import GlassCard from "../GlassCard";
import { ChevronRight } from "lucide-react";

function AccountSettings() {
  const navigate = useNavigate();

  const { logout } =
    useAuth();
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
          gap: "2px",
        }}
      >
        <div
          onClick={() => {
            logout();

            navigate("/");
          }}
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",

            cursor: "pointer",

            padding: "8px 12px",

            borderRadius: "12px",

            transition:
              "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "rgba(255,255,255,0.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "transparent";
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

            padding: "8px 12px",

            borderRadius: "12px",

            transition:
              "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "rgba(255,107,107,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "transparent";
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