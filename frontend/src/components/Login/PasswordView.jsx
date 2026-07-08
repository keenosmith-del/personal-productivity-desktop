import { useAuth } from "../../context/AuthContext";
import { useState, useRef, } from "react";
import { useNavigate } from "react-router-dom";
import ResetPasswordModal from "./ResetPasswordModal";
import DeleteUserModal from "./DeleteUserModal";

import { loginUser } from "../../services/authService";

const API_BASE_URL =
  "http://localhost:5050";

function PasswordView({
  user,
  onBack,
}) {
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [isFocused, setIsFocused] =
    useState(false);

  const errorTimeoutRef =
    useRef(null);

  const [
    showResetModal,
    setShowResetModal,
  ] = useState(false);

  const [
    showDeleteModal,
    setShowDeleteModal,
  ] = useState(false);

  const handleSubmit = async () => {
    try {
      setError("");

      const loginData =
        await loginUser(
          user.email,
          password
        );

      login(
        loginData.user,
        loginData.token
      );

      navigate("/dashboard");
    } catch (error) {
      setError(
        "Incorrect password"
      );

      clearTimeout(
        errorTimeoutRef.current
      );

      errorTimeoutRef.current =
        setTimeout(() => {
          setError("");
        }, 3000);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div
      onClick={() => onBack()}
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

            // border: "1px solid rgba(255,255,255,0.12)",

            backdropFilter: "blur(20px)",

            fontSize: "2rem",
            fontWeight: "300",
          }}
        >
          {user?.avatar?.startsWith("/uploads/") ? (
            <img
              src={`${API_BASE_URL}${user.avatar}`}
              alt={user.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          ) : (
            user.initials
          )}
        </div>

        <h2
          style={{
            fontSize: "1.15rem",

            fontWeight: "300",

            color:
              "var(--text-primary)",
          }}
        >
          {user.name}
        </h2>
        {error && (
          <p
            style={{
              color: "#ff6b6b", // danger red

              fontSize: "0.8rem",

              fontWeight: "300",

              opacity: "0.65",
            }}
          >
            {error}
          </p>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",

            width: "320px",

            background: isFocused
              ? "rgba(255,255,255,0.06)"
              : "rgba(255,255,255,0.04)",

            border: isFocused
              ? "1px solid rgba(255,255,255,0.18)"
              : "1px solid rgba(255,255,255,0.06)",

            borderRadius: "999px",

            transition:
              "all 0.2s ease",

            padding: "10px 14px",
          }}
        >
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
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

              color: "var(--text-primary)",
              fontSize: "0.9rem",
              fontWeight: "300",

              transition: "all 0.2s ease",


            }}
            onFocus={() =>
              setIsFocused(true)
            }

            onBlur={() =>
              setIsFocused(false)
            }
          />

          <button
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            style={{
              background: "none",
              border: "none",

              color:
                "var(--text-secondary)",

              cursor: "pointer",

              fontSize: "0.9rem",

              opacity: 0.7,

              marginRight: "8px",
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>

          <button
            onClick={handleSubmit}
            style={{
              background: "none",
              border: "none",

              color:
                "var(--text-primary)",

              cursor: "pointer",

              fontSize: "1rem",

              opacity: 0.8,
            }}
          >
            →
          </button>
        </div>

        <button
          onClick={() => setShowResetModal(true)}
          style={{
            background: "none",

            border: "none",

            color:
              "var(--text-secondary)",

            fontSize: "0.85rem",

            fontWeight: "300",

            cursor: "pointer",

            opacity: 0.65,

            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity =
              "1";

            e.currentTarget.style.color =
              "var(--text-primary)";

            e.currentTarget.style.transform =
              "translateY(-1px)";
          }}

          onMouseLeave={(e) => {
            e.currentTarget.style.opacity =
              "0.65";

            e.currentTarget.style.color =
              "var(--text-secondary)";

            e.currentTarget.style.transform =
              "translateY(0)";
          }}
        >
          Forgot password?
        </button>

        <button
          onClick={() => setShowDeleteModal(true)}
          style={{
            background: "none",

            border: "none",

            color: "#ff6b6b",

            fontSize: "0.85rem",

            fontWeight: "300",

            cursor: "pointer",

            opacity: 0.65,

            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity =
              "1";

            e.currentTarget.style.color =
              "#ff6b6b";

            e.currentTarget.style.transform =
              "translateY(-1px)";
          }}

          onMouseLeave={(e) => {
            e.currentTarget.style.opacity =
              "0.65";

            e.currentTarget.style.color =
              "#ff6b6b";

            e.currentTarget.style.transform =
              "translateY(0)";
          }}
        >
          Delete user
        </button>
        {showResetModal && (
          <ResetPasswordModal
            user={user}
            onClose={(message) => {
              setShowResetModal(false);

              if (
                message ===
                "Password updated successfully"
              ) {
                onBack(message);
              }
            }}
          />
        )}

        {
          showDeleteModal && (
            <DeleteUserModal
              user={user}
              onClose={() =>
                setShowDeleteModal(false)
              }
              onDeleted={(message) => {
                setShowDeleteModal(false);

                onBack(message);
              }}
            />
          )
        }
      </div>
    </div>
  );
}

export default PasswordView;