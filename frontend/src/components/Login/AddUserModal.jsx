import {
  useRef,
  useEffect,
  useState,
} from "react";

import {
  registerUser,
  loginUser,
} from "../../services/authService";

function AddUserModal({
  onClose,
  setToast,
}) {

  const nameInputRef = useRef(null);

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

  const [showPasswords, setShowPasswords] =
    useState(false);

  const [error, setError] =
    useState("");

  const [nameError, setNameError] =
    useState(false);

  const [surnameError, setSurnameError] =
    useState(false);

  const [emailError, setEmailError] =
    useState(false);

  const [passwordError, setPasswordError] =
    useState(false);

  const [
    confirmPasswordError,
    setConfirmPasswordError,
  ] = useState(false);

  const errorTimeoutRef =
    useRef(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const inputStyle = {
    width: "100%",

    padding: "12px 16px",

    background: "rgba(255,255,255,0.04)",

    border: "1px solid rgba(255,255,255,0.06)",

    borderRadius: "999px",

    color: "var(--text-primary)",

    fontSize: "0.9rem",

    fontWeight: "300",

    outline: "none",

    transition: "all 0.2s ease",
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
          width: "460px",

          background:
            "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",

          border:
            "1px solid rgba(255,255,255,0.10)",

          borderRadius: "36px",

          backdropFilter: "blur(30px)",

          boxShadow:
            "0 16px 40px rgba(0,0,0,0.45)",

          padding: "36px",

          display: "flex",
          flexDirection: "column",

          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "0.95rem",
                fontWeight: "400",
              }}
            >
              Create User
            </h2>

            <p
              style={{
                marginTop: "4px",
                marginBottom: 0,
                fontSize: "0.8rem",
                fontWeight: "300",
                opacity: 0.55,
              }}
            >
              Invite a new team member
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              width: "32px",
              height: "32px",

              borderRadius: "999px",

              border:
                "1px solid rgba(255,255,255,0.08)",

              background:
                "rgba(255,255,255,0.04)",

              color:
                "var(--text-secondary)",

              cursor: "pointer",

              fontSize: "0.85rem",

              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "rgba(255,255,255,0.10)";

              e.currentTarget.style.transform =
                "scale(1.05)";
            }}

            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "rgba(255,255,255,0.04)";

              e.currentTarget.style.transform =
                "scale(1)";
            }}
          >
            x
          </button>
        </div>

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
              e.currentTarget.style.transform =
                "translateY(-2px) scale(1.02)";

              e.currentTarget.style.border =
                "1px solid rgba(255,255,255,0.20)";

              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(255,255,255,0.08)";
            }}

            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0) scale(1)";

              e.currentTarget.style.border =
                "1px solid rgba(255,255,255,0.12)";

              e.currentTarget.style.boxShadow =
                "none";
            }}
          >
            {name || surname
              ? `${name.charAt(0)}${surname.charAt(0)}`
                .toUpperCase()
              : "+"}
          </div>
        </div>

        <div
          style={{
            textAlign: "center",

            display: "flex",

            flexDirection: "column",

            gap: "4px",

            marginTop: "-10px",
          }}
        >
          <span
            style={{
              fontSize: "0.95rem",

              fontWeight: "400",
            }}
          >
            {name || surname
              ? `${name} ${surname}`
              : "New User"}
          </span>

          <span
            style={{
              fontSize: "0.9rem",

              opacity: 0.55,

              fontWeight: "300",
            }}
          >
            {title || "Job Title"}
          </span>
        </div>

        <div>
          <div
            style={{
              fontSize: "0.65rem",

              letterSpacing: "0.15em",

              textTransform: "uppercase",

              opacity: 0.45,

              fontWeight: "400",
            }}
          >
            Personal
          </div>

          <div
            style={{
              height: "1px",

              background:
                "rgba(255,255,255,0.06)",

              marginTop: "10px",
            }}
          />
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
            onChange={(e) => {
              setName(e.target.value);

              setError("");
              setNameError(false);
            }}
            style={{
              ...inputStyle,

              border: nameError
                ? "1px solid rgba(214,107,107,0.45)"
                : "1px solid rgba(255,255,255,0.06)",
            }}
            onFocus={(e) => {
              e.target.style.border =
                "1px solid rgba(255,255,255,0.18)";

              e.target.style.background =
                "rgba(255,255,255,0.06)";
            }}

            onBlur={(e) => {
              e.target.style.border =
                "1px solid rgba(255,255,255,0.06)";

              e.target.style.background =
                "rgba(255,255,255,0.04)";
            }}
          />

          <input
            placeholder="Surname"
            value={surname}
            onChange={(e) => {
              setSurname(e.target.value);

              setError("");
              setSurnameError(false);
            }}
            style={{
              ...inputStyle,

              border: surnameError
                ? "1px solid rgba(214,107,107,0.45)"
                : "1px solid rgba(255,255,255,0.06)",
            }}
            onFocus={(e) => {
              e.target.style.border =
                "1px solid rgba(255,255,255,0.18)";

              e.target.style.background =
                "rgba(255,255,255,0.06)";
            }}

            onBlur={(e) => {
              e.target.style.border =
                "1px solid rgba(255,255,255,0.06)";

              e.target.style.background =
                "rgba(255,255,255,0.04)";
            }}
          />
        </div>

        <input
          placeholder="Job Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.border =
              "1px solid rgba(255,255,255,0.18)";

            e.target.style.background =
              "rgba(255,255,255,0.06)";
          }}

          onBlur={(e) => {
            e.target.style.border =
              "1px solid rgba(255,255,255,0.06)";

            e.target.style.background =
              "rgba(255,255,255,0.04)";
          }}
        />

        <div
          style={{
            marginTop: "8px",
          }}
        >
          <div
            style={{
              fontSize: "0.65rem",

              letterSpacing: "0.15em",

              textTransform: "uppercase",

              opacity: 0.45,

              fontWeight: "500",
            }}
          >
            Account
          </div>

          <div
            style={{
              height: "1px",

              background:
                "rgba(255,255,255,0.06)",

              marginTop: "10px",
            }}
          />
        </div>

        <input
          placeholder="Email Address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);

            setError("");
            setEmailError(false);
          }}
          style={{
            ...inputStyle,

            border: emailError
              ? "1px solid rgba(214,107,107,0.45)"
              : "1px solid rgba(255,255,255,0.06)",
          }}
          onFocus={(e) => {
            e.target.style.border =
              "1px solid rgba(255,255,255,0.18)";

            e.target.style.background =
              "rgba(255,255,255,0.06)";
          }}

          onBlur={(e) => {
            e.target.style.border =
              "1px solid rgba(255,255,255,0.06)";

            e.target.style.background =
              "rgba(255,255,255,0.04)";
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",

            background: "rgba(255,255,255,0.04)",

            border: passwordError
              ? "1px solid rgba(214,107,107,0.45)"
              : "1px solid rgba(255,255,255,0.06)",

            borderRadius: "999px",

            padding: "12px 16px",

            transition: "all 0.2s ease",
          }}
        >
          <input
            type={
              showPasswords
                ? "text"
                : "password"
            }
            placeholder="Create Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);

              setError("");
              setPasswordError(false);
            }}
            style={{
              flex: 1,

              background: "transparent",

              border: "none",

              outline: "none",

              color:
                "var(--text-primary)",

              fontSize: "0.9rem",

              fontWeight: "300",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",

            background: "rgba(255,255,255,0.04)",

            border: confirmPasswordError
              ? "1px solid rgba(214,107,107,0.45)"
              : "1px solid rgba(255,255,255,0.06)",

            borderRadius: "999px",

            padding: "12px 16px",

            transition: "all 0.2s ease",
          }}
        >
          <input
            type={
              showPasswords
                ? "text"
                : "password"
            }
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(
                e.target.value
              );

              setError("");
              setConfirmPasswordError(false);
            }}
            style={{
              flex: 1,

              background: "transparent",

              border: "none",

              outline: "none",

              color:
                "var(--text-primary)",

              fontSize: "0.9rem",

              fontWeight: "300",
            }}
          />

          <button
            type="button"
            onClick={() =>
              setShowPasswords(
                !showPasswords
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
            }}
          >
            {showPasswords
              ? "Hide"
              : "Show"}
          </button>
        </div>

        {error && (
          <p
            style={{
              color: "#d66b6b",
              fontSize: "0.8rem",
              fontWeight: "300",
              opacity: 0.8,
              textAlign: "center",
              margin: 0,
            }}
          >
            {error}
          </p>
        )}

        <div
          style={{
            display: "flex",

            justifyContent: "flex-end",

            gap: "10px",

            marginTop: "10px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "11px 18px",

              borderRadius: "999px",

              background:
                "rgba(255, 77, 77, 0.12)",

              border:
                "1px solid rgba(255, 77, 77, 0.25)",

              color: "var(--danger)",

              fontSize: "0.8rem",

              fontWeight: "300",

              cursor: "pointer",

              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "rgba(255, 77, 77, 0.20)";

              e.currentTarget.style.transform =
                "translateY(-1px)";
            }}

            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "rgba(255, 77, 77, 0.12)";

              e.currentTarget.style.transform =
                "translateY(0)";
            }}
          >
            Cancel
          </button>

          <button
            onClick={async () => {
              try {
                clearTimeout(
                  errorTimeoutRef.current
                );

                setError("");

                setNameError(false);
                setSurnameError(false);
                setEmailError(false);
                setPasswordError(false);
                setConfirmPasswordError(false);

                if (!name.trim()) {
                  setError(
                    "Please enter a name"
                  );

                  setNameError(true);

                  errorTimeoutRef.current =
                    setTimeout(() => {
                      setError("");
                      setNameError(false);
                    }, 3000);

                  return;
                }

                if (!surname.trim()) {
                  setError(
                    "Please enter a surname"
                  );

                  setSurnameError(true);

                  errorTimeoutRef.current =
                    setTimeout(() => {
                      setError("");
                      setSurnameError(false);
                    }, 3000);

                  return;
                }

                if (!email.trim()) {
                  setError(
                    "Please enter an email address"
                  );

                  setEmailError(true);

                  errorTimeoutRef.current =
                    setTimeout(() => {
                      setError("");
                      setEmailError(false);
                    }, 3000);

                  return;
                }

                if (
                  !/\S+@\S+\.\S+/.test(email)
                ) {
                  setError(
                    "Please enter a valid email address"
                  );

                  setEmailError(true);

                  errorTimeoutRef.current =
                    setTimeout(() => {
                      setError("");
                      setEmailError(false);
                    }, 3000);

                  return;
                }

                if (password.length < 6) {
                  setError(
                    "Password must be at least 6 characters"
                  );

                  setPasswordError(true);

                  errorTimeoutRef.current =
                    setTimeout(() => {
                      setError("");
                      setPasswordError(false);
                    }, 3000);

                  return;
                }

                if (
                  password !==
                  confirmPassword
                ) {
                  setError(
                    "Passwords do not match"
                  );

                  setPasswordError(true);
                  setConfirmPasswordError(true);

                  errorTimeoutRef.current =
                    setTimeout(() => {
                      setError("");

                      setPasswordError(false);

                      setConfirmPasswordError(false);
                    }, 3000);

                  return;
                }

                await registerUser({
                  name: `${name} ${surname}`,
                  email,
                  password,
                  job: title,
                });

                setToast(
                  "User created successfully"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);

                onClose(true);

              } catch (error) {
                if (
                  error.message
                    ?.toLowerCase()
                    .includes("exists")
                ) {
                  setEmailError(true);
                }

                setError(error.message);

                errorTimeoutRef.current =
                  setTimeout(() => {
                    setError("");
                    setEmailError(false);
                  }, 3000);
              }
            }}
            style={{
              padding: "11px 18px",

              borderRadius: "999px",

              background:
                "rgba(255,255,255,0.08)",

              border:
                "1px solid rgba(255,255,255,0.10)",

              color:
                "var(--text-primary)",

              fontSize: "0.8rem",

              fontWeight: "300",

              cursor: "pointer",

              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "rgba(255,255,255,0.14)";

              e.currentTarget.style.transform =
                "translateY(-1px)";

              e.currentTarget.style.border =
                "1px solid rgba(255,255,255,0.18)";
            }}

            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "rgba(255,255,255,0.08)";

              e.currentTarget.style.transform =
                "translateY(0)";

              e.currentTarget.style.border =
                "1px solid rgba(255,255,255,0.10)";
            }}
          >
            Create User
          </button>
        </div>
      </div>
    </div >
  );
}

export default AddUserModal;