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

import { useRef, useEffect } from "react";

function AddUserModal({ onClose }) {
  const nameInputRef = useRef(null);

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
            style={inputStyle}
          />

          <input
            placeholder="Surname"
            style={inputStyle}
          />
        </div>

        <input
          placeholder="Title"
          style={inputStyle}
        />

        <input
          placeholder="Email"
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          style={inputStyle}
        />

        <button
          onClick={() =>
            console.log("Create User")
          }
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