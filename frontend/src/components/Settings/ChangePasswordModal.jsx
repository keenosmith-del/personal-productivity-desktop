import { useState } from "react";

import { X } from "lucide-react";

import {
    changePassword,
} from "../../services/authService";

function ChangePasswordModal({
    onClose,
}) {
    const [
        currentPassword,
        setCurrentPassword,
    ] = useState("");

    const [
        newPassword,
        setNewPassword,
    ] = useState("");

    const [
        confirmPassword,
        setConfirmPassword,
    ] = useState("");

    const inputStyle = {
        width: "100%",


        padding: "14px 18px",

        background:
            "rgba(255,255,255,0.05)",

        border:
            "1px solid rgba(255,255,255,0.08)",

        borderRadius: "12px",

        color:
            "var(--text-primary)",

        fontSize: "0.95rem",

        fontWeight: "300",

        outline: "none",

    };

    const handleSave =
        async () => {
            try {
                if (
                    !currentPassword ||
                    !newPassword ||
                    !confirmPassword
                ) {
                    alert(
                        "Please complete all fields."
                    );
                    return;
                }
                if (
                    newPassword !==
                    confirmPassword
                ) {
                    alert(
                        "Passwords do not match."
                    );
                    return;
                }

                await changePassword({
                    currentPassword,
                    newPassword,
                });

                onClose();

            } catch (error) {
                console.error(error);

                alert(
                    error.message
                );
            }
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

                justifyContent: "center",

                alignItems: "center",

                zIndex: 1000,
            }}
        >
            <div
                onClick={(e) =>
                    e.stopPropagation()
                }
                style={{
                    width: "520px",

                    background:
                        "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",

                    border:
                        "1px solid rgba(255,255,255,0.10)",

                    borderRadius: "32px",

                    backdropFilter:
                        "blur(30px)",

                    boxShadow:
                        "0 20px 60px rgba(0,0,0,0.35)",

                    padding: "36px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "20px",
                }}
            >
                <div
                    style={{
                        display: "flex",

                        justifyContent:
                            "space-between",

                        alignItems: "center",
                    }}
                >
                    <h2
                        style={{
                            fontWeight: "400",
                        }}
                    >
                        Change Password
                    </h2>

                    <X
                        size={18}
                        strokeWidth={1.5}
                        style={{
                            cursor: "pointer",
                        }}
                        onClick={onClose}
                    />
                </div>

                <div>
                    <p
                        style={{
                            marginBottom: "8px",

                            color:
                                "var(--text-secondary)",

                            fontSize: "0.85rem",
                        }}
                    >
                        Current Password
                    </p>

                    <input
                        type="password"
                        value={
                            currentPassword
                        }
                        onChange={(e) =>
                            setCurrentPassword(
                                e.target.value
                            )
                        }
                        style={inputStyle}
                    />
                </div>

                <div>
                    <p
                        style={{
                            marginBottom: "8px",

                            color:
                                "var(--text-secondary)",

                            fontSize: "0.85rem",
                        }}
                    >
                        New Password
                    </p>

                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) =>
                            setNewPassword(
                                e.target.value
                            )
                        }
                        style={inputStyle}
                    />
                </div>

                <div>
                    <p
                        style={{
                            marginBottom: "8px",

                            color:
                                "var(--text-secondary)",

                            fontSize: "0.85rem",
                        }}
                    >
                        Confirm Password
                    </p>

                    <input
                        type="password"
                        value={
                            confirmPassword
                        }
                        onChange={(e) =>
                            setConfirmPassword(
                                e.target.value
                            )
                        }
                        style={inputStyle}
                    />
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "flex-end",
                        gap: "12px",
                        marginTop: "8px",
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            background:
                                "transparent",

                            border:
                                "1px solid rgba(255,255,255,0.08)",

                            borderRadius:
                                "999px",

                            padding:
                                "8px 14px",

                            color:
                                "#ff6b6b",

                            fontSize:
                                "0.8rem",

                            fontWeight:
                                "300",

                            cursor:
                                "pointer",
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={
                            handleSave
                        }
                        style={{
                            background:
                                "transparent",

                            border:
                                "1px solid rgba(255,255,255,0.08)",

                            borderRadius:
                                "999px",

                            padding:
                                "8px 14px",

                            color:
                                "var(--text-secondary)",

                            fontSize:
                                "0.8rem",

                            fontWeight:
                                "300",

                            cursor:
                                "pointer",
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div >


    );
}

export default ChangePasswordModal;
