/**
 * Add User Modal
 *
 * Frontend prototype version.
 *
 * Future:
 * - Image upload
 * - Validation
 * - Database integration
 */

import {
  useRef,
  useEffect,
  useState,
} from "react";

import {
  registerUser,
  loginUser,
} from "../../services/authService";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AddUserModal({ onClose }) {
  const { login } = useAuth();

  const nameInputRef = useRef(null);

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [surname, setSurname] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",

    background: "rgba(255,255,255,0.05)",

    border: "1px solid rgba(255,255,255,0.08)",

    borderRadius: "16px",

    color: "var(--text-primary)",

    fontSize: "0.95rem",

    outline: "none",
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,

        background: "rgba(0,0,0,0.55)",

        backdropFilter: "blur(12px)",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        zIndex: 1000,
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          width: "500px",

          background:
            "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",

          border:
            "1px solid rgba(255,255,255,0.10)",

          borderRadius: "32px",

          backdropFilter: "blur(30px)",

          boxShadow:
            "0 20px 60px rgba(0,0,0,0.35)",

          padding: "36px",

          display: "flex",
          flexDirection: "column",

          gap: "20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          Add User
        </h2>

        {/* Avatar Placeholder */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "110px",
              height: "110px",

              borderRadius: "50%",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              background:
                "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",

              border:
                "1px solid rgba(255,255,255,0.12)",

              fontSize: "2rem",

              fontWeight: "300",

              cursor: "pointer",

              marginBottom: "20px",

              transition:
                "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "rgba(255,255,255,0.10)";

              e.currentTarget.style.transform =
                "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))";

              e.currentTarget.style.transform =
                "scale(1)";
            }}
          >
            +
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <input
            ref={nameInputRef}
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={inputStyle}
          />

          <input
            placeholder="Surname"
            value={surname}
            onChange={(e) =>
              setSurname(e.target.value)
            }
            style={inputStyle}
          />
        </div>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          style={inputStyle}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <button
          onClick={async () => {
            try {
              if (
                password !==
                confirmPassword
              ) {
                alert(
                  "Passwords do not match"
                );

                return;
              }

              await registerUser({
                name: `${name} ${surname}`,
                email,
                password,
                job: title,
              });

              const loginData =
                await loginUser(
                  email,
                  password
                );

              login(
                loginData.user,
                loginData.token
              );

              navigate("/analytics");
            } catch (error) {
              alert(error.message);
            }
          }}
          style={{
            marginTop: "10px",

            padding: "16px",

            background:
              "var(--glass-bg)",

            border:
              "1px solid var(--glass-border)",

            borderRadius:
              "var(--radius-small)",

            color:
              "var(--text-primary)",

            cursor: "pointer",

            fontSize: "0.95rem",

            fontWeight: "400",

            transition:
              "var(--transition)",
          }}

          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "var(--glass-hover)";
          }}

          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "var(--glass-bg)";
          }}
        >
          Create User
        </button>
      </div>
    </div>
  );
}

export default AddUserModal;