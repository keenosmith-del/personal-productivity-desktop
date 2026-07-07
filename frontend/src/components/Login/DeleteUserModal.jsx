import { useState, useRef, useEffect } from "react";

import { deleteUser } from "../../services/authService";

const API_BASE_URL =
    "http://localhost:5050";

function DeleteUserModal({
    user,
    onClose,
    onDeleted,
}) {
    const passwordRef = useRef(null);

    const [password, setPassword] =
        useState("");

    const [message, setMessage] =
        useState(""); // need for toast

    const [error, setError] =
        useState("");

    const [passwordError, setPasswordError] =
        useState(false);

    const errorTimeoutRef =
        useRef(null);

    const [showPasswords, setShowPasswords] =
        useState(false);

    const [isFocused, setIsFocused] =
        useState(false);

    const handleDelete =
        async () => {
            try {
                setError("");

                await deleteUser(
                    user.email,
                    password
                );

                onDeleted?.(
                    "User deleted successfully"
                );

            } catch (error) {
                setError(
                    "Incorrect password"
                );

                setPasswordError(true);

                clearTimeout(
                    errorTimeoutRef.current
                );

                errorTimeoutRef.current =
                    setTimeout(() => {
                        setError("");
                        setPasswordError(false);
                    }, 3000);
            }
        };

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

    return (
        <div
            onClick={onClose}
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
                            Delete User
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
                            This action cannot be undone
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
                        Confirmation
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

                        background: isFocused
                            ? "rgba(255,255,255,0.06)"
                            : "rgba(255,255,255,0.04)",

                        border: passwordError
                            ? "1px solid rgba(214, 107, 107, 0.45)"
                            : isFocused
                                ? "1px solid rgba(255,255,255,0.18)"
                                : "1px solid rgba(255,255,255,0.06)",

                        borderRadius: "999px",

                        padding: "12px 16px",

                        transition:
                            "all 0.2s ease",
                    }}
                >
                    <input
                        ref={passwordRef}
                        type={
                            showPasswords
                                ? "text"
                                : "password"
                        }
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(
                                e.target.value
                            );

                            setError("");
                            setPasswordError(false);

                            clearTimeout(
                                errorTimeoutRef.current
                            );
                        }}
                        onFocus={() =>
                            setIsFocused(true)
                        }

                        onBlur={() =>
                            setIsFocused(false)
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
                        onClick={onClose}
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
                        Cancel
                    </button>

                    <button
                        onClick={
                            handleDelete
                        }
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
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteUserModal;