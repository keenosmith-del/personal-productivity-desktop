import GlassCard from "../GlassCard";
import { Pen } from "lucide-react";

function ProfileDetails({
  user,
  counts,
}) {
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
            {user?.name
              ?.split(" ")
              .map(
                (part) => part[0]
              )
              .join("")
              .slice(0, 2)
              .toUpperCase() || "U"}
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
            {user?.name || "Loading..."}
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
            {user?.job || "No Job Title"}
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
            {user?.email || ""}
          </p>

          <p
            style={{
              color:
                "rgba(255,255,255,0.35)",

              fontSize: "0.9rem",

              fontWeight: "300",
            }}
          >
            Member since{" "}
            {user?.createdAt
              ? new Date(
                user.createdAt
              ).toLocaleDateString(
                "default",
                {
                  month: "long",
                  year: "numeric",
                }
              )
              : ""}
          </p>

          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginTop: "16px",
            }}
          >
            <span
              style={{
                padding: "4px 8px",
                borderRadius: "999px",
                fontSize: "0.68rem",
                background: "#72715c33",
                border: "1px solid #72715c66",
              }}
            >
              {counts?.tasks || 0} Tasks
            </span>

            <span
              style={{
                padding: "4px 8px",
                borderRadius: "999px",
                fontSize: "0.68rem",
                background: "#c59c7033",
                border: "1px solid #c59c7066",
              }}
            >
              {counts?.goals || 0} Goals
            </span>

            <span
              style={{
                padding: "4px 8px",
                borderRadius: "999px",
                fontSize: "0.68rem",
                background: "#854c4933",
                border: "1px solid #854c4966",
              }}
            >
              {counts?.projects || 0} Projects
            </span>

            <span
              style={{
                padding: "4px 8px",
                borderRadius: "999px",
                fontSize: "0.68rem",
                background: "#52677d33",
                border: "1px solid #52677d66",
              }}
            >
              {counts?.notes || 0} Notes
            </span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

export default ProfileDetails;