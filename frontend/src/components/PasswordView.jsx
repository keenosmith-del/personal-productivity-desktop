/**
 * Password entry screen.
 *
 * Temporary implementation.
 *
 * Later:
 * - Real authentication
 * - Password validation
 * - Error handling
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PasswordView({
  user,
  onBack,
}) {
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/analytics");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div
      onClick={onBack}
      style={{
        minHeight: "100vh",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            width: "140px",
            height: "140px",

            borderRadius: "50%",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            background:
              "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",

            border:
              "1px solid rgba(255,255,255,0.12)",

            backdropFilter: "blur(20px)",

            fontSize: "2.2rem",
            fontWeight: "400",
          }}
        >
          {user.initials}
        </div>

        <h2
          style={{
            fontSize: "1.1rem",

            fontWeight: "400",

            color:
              "var(--text-secondary)",
          }}
        >
          {user.name}
        </h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",

            width: "320px",

            background:
              "rgba(255,255,255,0.06)",

            border:
              "1px solid rgba(255,255,255,0.12)",

            borderRadius: "18px",

            padding: "6px 12px",
          }}
        >
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            onKeyDown={handleKeyDown}
            autoFocus
            style={{
              flex: 1,

              background: "transparent",
              border: "none",
              outline: "none",

              color: "white",
              fontSize: "1rem",
            }}
          />

          <button
            onClick={handleSubmit}
            style={{
              background: "none",
              border: "none",

              color: "white",

              cursor: "pointer",

              fontSize: "1.2rem",
            }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordView;