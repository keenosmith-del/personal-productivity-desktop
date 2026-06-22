import { useState } from "react";

import { X, Pen } from "lucide-react";

import {
    updateProfile,
} from "../../services/authService";

function EditProfileModal({
    user,
    onClose,
    onSaved,
}) {
    const [name, setName] =
        useState(user?.name || "");

    const [job, setJob] =
        useState(user?.job || "");

    const handleSave =
        async () => {
            try {
                await updateProfile({
                    name,
                    job,
                });

                if (onSaved) {
                    onSaved();
                }

                onClose();

            } catch (error) {
                console.error(error);
            }
        };

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
                    width: "560px",

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

                    gap: "24px",
                }}
            >
                {/* HEADER */}
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
                        Edit Profile
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

                {/* AVATAR */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
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
                                width: "110px",
                                height: "110px",

                                borderRadius: "50%",

                                background:
                                    "rgba(255,255,255,0.08)",

                                display: "flex",

                                alignItems: "center",

                                justifyContent: "center",

                                fontSize: "1.8rem",

                                fontWeight: "500",

                                transition: "all 0.2s ease",
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

                                display: "flex",

                                alignItems: "center",

                                justifyContent: "center",

                                opacity: 0,

                                transition:
                                    "all 0.2s ease",

                                color: "white",
                            }}
                        >
                            <Pen size={18} />
                        </div>
                    </div>
                </div>

                {/* FORM */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                    }}
                >
                    <div>
                        <p
                            style={{
                                marginBottom: "8px",

                                color:
                                    "var(--text-secondary)",

                                fontSize: "0.85rem",
                            }}
                        >
                            Name
                        </p>

                        <input
                            value={name}
                            onChange={(e) =>
                                setName(
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
                            Job Title
                        </p>

                        <input
                            value={job}
                            onChange={(e) =>
                                setJob(
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
                            Email
                        </p>

                        <input
                            value={
                                user?.email || ""
                            }
                            disabled
                            style={{
                                ...inputStyle,
                                opacity: 0.6,
                                cursor:
                                    "not-allowed",
                            }}
                        />
                    </div>
                </div>

                {/* FOOTER */}
                <div
                    style={{
                        display: "flex",

                        justifyContent:
                            "flex-end",

                        gap: "12px",
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

                            color: "#ff6b6b",

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
                        onClick={handleSave}
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
        </div>
    );
}

export default EditProfileModal;