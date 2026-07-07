import { useState, useRef, useEffect } from "react";

import { changePassword } from "../../services/authService";

const API_BASE_URL =
    "http://localhost:5050";

function ChangePasswordModal({
    user,
    onClose,
}) {
    const passwordRef = useRef(null);

    const errorTimeoutRef =
        useRef(null)

    const [
        newPassword,
        setNewPassword,
    ] = useState("");

    const [
        currentPassword,
        setCurrentPassword,
    ] = useState("");

    const [
        confirmPassword,
        setConfirmPassword,
    ] = useState("");

    const [error, setError] =
        useState("");

    const [
        passwordError,
        setPasswordError,
    ] = useState(false);

    const [
        confirmPasswordError,
        setConfirmPasswordError,
    ] = useState(false);

    const [
        confirmFocused,
        setConfirmFocused,
    ] = useState(false);

    const [showPasswords, setShowPasswords] =
        useState(false);

    useEffect(() => {
        passwordRef.current?.focus();
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

    const handleReset =
        async () => {
            try {
                clearTimeout(
                    errorTimeoutRef.current
                );

                setError("");

                setPasswordError(false);
                setConfirmPasswordError(false);

                if (!currentPassword.trim()) {

                    setError(
                        "Please enter your current password"
                    );

                    return;
                }

                if (
                    newPassword.length < 6 &&
                    newPassword !== confirmPassword
                ) {
                    setError(
                        "Password must be at least 6 characters and passwords must match"
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

                if (newPassword.length < 6) {
                    setError(
                        "Password must be at least 6 characters"
                    );

                    setPasswordError(true);

                    errorTimeoutRef.current =
                        setTimeout(() => {
                            setError("");
                            setPasswordError(false);
                            setConfirmPasswordError(false);
                        }, 3000);

                    return;
                }

                if (
                    newPassword !==
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

                clearTimeout(
                    errorTimeoutRef.current
                );

                await changePassword({
                    currentPassword,
                    newPassword,
                });

                onClose(true);

            } catch (error) {
                setError(error.message);
            }
        };

    return (
        <div
            onClick={() => onClose(false)}
            style={{
                position: "fixed",
                inset: 0,

                background:
                    "rgba(0,0,0,0.55)",

                backdropFilter:
                    "blur(12px)",

                display: "flex",

                justifyContent:
                    "center",

                alignItems:
                    "center",

                zIndex: 2000,
            }}
        >
            <div
                onClick={(event) =>
                    event.stopPropagation()
                }
                style={{
                    width: "460px",

                    background:
                        "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",

                    border:
                        "1px solid rgba(255,255,255,0.10)",

                    borderRadius: "36px",

                    backdropFilter:
                        "blur(30px)",

                    boxShadow:
                        "0 20px 60px rgba(0,0,0,0.35)",

                    padding: "36px",

                    display: "flex",

                    flexDirection:
                        "column",

                    gap: "20px",
                }}
            >
                {/* Header */}

                <div
                    style={{
                        display: "flex",

                        justifyContent:
                            "space-between",

                        alignItems:
                            "flex-start",
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
                            Change Password
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
                            Verify your current password first
                        </p>
                    </div>

                    <button
                        onClick={() => onClose(false)}
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
                        ×
                    </button>
                </div>

                {/* Avatar */}
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

                            borderRadius:
                                "50%",

                            display: "flex",

                            justifyContent:
                                "center",

                            alignItems:
                                "center",

                            background:
                                "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",

                            border:
                                "1px solid rgba(255,255,255,0.12)",

                            fontSize: "1.8rem",

                            fontWeight: "300",
                        }}
                    >
                        {user?.avatar ? (
                            <img
                                src={`${API_BASE_URL}${user.avatar}`}
                                alt="Profile"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                }}
                            />
                        ) : (
                            user?.name
                                ?.split(" ")
                                .map((part) => part[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()
                        )}
                    </div>
                </div>

                <div
                    style={{
                        textAlign: "center",

                        marginTop: "-10px",
                    }}
                >
                    <div
                        style={{
                            fontSize: "0.95rem",

                            fontWeight: "400px",
                        }}
                    >
                        {user.name}
                    </div>

                    <div
                        style={{
                            fontSize: "0.9rem",

                            fontWeight: "300",

                            opacity: 0.55,

                            marginTop: "4px",
                        }}
                    >
                        {user.email}
                    </div>
                </div>

                {/* Section */}

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
                        Account
                    </div>

                    <div
                        style={{
                            height: "1px",

                            background:
                                "rgba(255,255,255,0.06)",

                            marginTop:
                                "10px",
                        }}
                    />
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",

                        background:
                            "rgba(255,255,255,0.04)",

                        border:
                            "1px solid rgba(255,255,255,0.06)",

                        borderRadius: "999px",

                        padding: "12px 16px",
                    }}
                >
                    <input
                        ref={passwordRef}
                        type={
                            showPasswords
                                ? "text"
                                : "password"
                        }
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => {
                            setCurrentPassword(
                                e.target.value
                            );

                            setError("");
                        }}
                        style={{
                            flex: 1,

                            background:
                                "transparent",

                            border: "none",

                            outline: "none",

                            color:
                                "var(--text-primary)",

                            fontSize: "0.9rem",

                            fontWeight: "300",
                        }}
                        onFocus={(e) => {
                            e.target.parentElement.style.border =
                                "1px solid rgba(255,255,255,0.18)";

                            e.target.parentElement.style.background =
                                "rgba(255,255,255,0.06)";
                        }}

                        onBlur={(e) => {
                            e.target.parentElement.style.border =
                                "1px solid rgba(255,255,255,0.06)";

                            e.target.parentElement.style.background =
                                "rgba(255,255,255,0.04)";
                        }}
                    />
                </div>

                <input
                    type={
                        showPasswords
                            ? "text"
                            : "password"
                    }
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => {
                        setNewPassword(
                            e.target.value
                        );

                        setError("");
                        setPasswordError(false);
                    }}
                    style={{
                        ...inputStyle,

                        border: passwordError
                            ? "1px solid rgba(214, 107, 107, 0.45)"
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

                        background:
                            "rgba(255,255,255,0.04)",

                        border: passwordError
                            ? "1px solid rgba(214,107,107,0.45)"
                            : "1px solid rgba(255,255,255,0.06)",

                        borderRadius: "999px",

                        padding: "12px 16px",

                        transition:
                            "all 0.2s ease",
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
                        onFocus={() =>
                            setConfirmFocused(true)
                        }

                        onBlur={() =>
                            setConfirmFocused(false)
                        }
                        style={{
                            flex: 1,

                            background:
                                "transparent",

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
                    <span
                        style={{
                            color: "#d66b6b",

                            fontSize:
                                "0.85rem",
                        }}
                    >
                        {error}
                    </span>
                )}

                {/* Buttons */}

                <div
                    style={{
                        display: "flex",

                        justifyContent:
                            "flex-end",

                        gap: "10px",
                    }}
                >
                    <button
                        onClick={() => onClose(false)}
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
                        onClick={
                            handleReset
                        }
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
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChangePasswordModal;