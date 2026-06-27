import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";

import {
    Palette,
    Bell,
    Shield,
    ChevronRight,
    Pencil,
    Moon,
    Sun,
} from "lucide-react";

import { useState, useEffect } from "react";

import {
    updatePreferences,
} from "../services/authService";

function Account() {
    const { user } = useAuth();

    const [settings, setSettings] =
        useState({
            theme: "Dark",

            dailySummary: true,

            goalNotifications: true,

            reminderNotifications: true,
        });

    useEffect(() => {
        if (!user) return;

        setSettings({
            theme:
                user.theme || "Dark",

            dailySummary:
                user.dailySummary,

            goalNotifications:
                user.goalNotifications,

            reminderNotifications:
                user.reminderNotifications,
        });
    }, [user]);

    const toggleStyle = (active) => ({
        width: "46px",
        height: "26px",

        borderRadius: "999px",

        background: active
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0.03)",

        border: active
            ? "1px solid rgba(255,255,255,0.12)"
            : "1px solid rgba(255,255,255,0.06)",

        position: "relative",

        cursor: "pointer",

        transition: "all 0.25s ease",

        backdropFilter: "blur(20px)",
    });

    const sectionStyle = {
        background: "var(--glass-bg)",

        border:
            "1px solid var(--glass-border)",

        borderRadius: "32px",

        backdropFilter: "blur(20px)",

        WebkitBackdropFilter:
            "blur(20px)",

        padding: "28px",
    };

    const rowStyle = {
        display: "flex",

        justifyContent:
            "space-between",

        alignItems: "center",

        padding: "8px 12px",
        borderRadius: "12px",

        borderBottom:
            "1px solid rgba(255,255,255,0.04)",

        fontWeight: "300",

        fontSize: "0.82rem",
    };

    const linkedItemStyle = {
        width: "35px",
        height: "35px",

        borderRadius: "50%",

        background:
            "linear-gradient(135deg, rgba(87,112,122,0.35), rgba(39,60,65,0.15))",

        border:
            "1px solid rgba(255,255,255,0.06)",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        fontSize: "0.68rem",

        color:
            "var(--text-secondary)",

        transition:
            "all 0.2s ease",
    };

    // HELPER
    const updateSetting = async (
        key,
        value
    ) => {
        const updated = {
            ...settings,

            [key]: value,
        };

        setSettings(updated);

        try {
            await updatePreferences(
                updated
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <MainLayout>
            <div
                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "380px 1fr",

                    gap: "24px",

                    height:
                        "calc(100vh - 100px)",
                }}
            >
                {/* LEFT */}

                <div
                    style={{
                        ...sectionStyle,

                        display: "flex",

                        flexDirection:
                            "column",

                        justifyContent:
                            "space-between",
                    }}
                >
                    <div>
                        <div
                            style={{
                                display: "flex",

                                justifyContent:
                                    "flex-end",

                                marginBottom: "20px",
                            }}
                        >
                            <span
                                style={{
                                    padding:
                                        "5px 10px",

                                    borderRadius:
                                        "999px",

                                    fontSize:
                                        "0.68rem",

                                    background:
                                        "#52677d33",

                                    border:
                                        "1px solid #52677d66",

                                    fontWeight: "300",
                                }}
                            >
                                {user?.theme || "Dark"} Mode
                            </span>
                        </div>

                        <div
                            style={{
                                display: "flex",

                                justifyContent:
                                    "center",

                                marginBottom: "22px",
                            }}
                        >
                            <div
                                style={{
                                    position: "relative",

                                    cursor: "pointer",

                                    transition: "all 0.2s ease",
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

                                    avatar.style.border =
                                        "1px solid rgba(255,255,255,0.12)";
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

                                    avatar.style.border =
                                        "1px solid rgba(255,255,255,0.08)";
                                }}
                            >
                                <div
                                    style={{
                                        width: "130px",
                                        height: "130px",

                                        borderRadius: "50%",

                                        background:
                                            "rgba(255,255,255,0.06)",

                                        border:
                                            "1px solid rgba(255,255,255,0.08)",

                                        display: "flex",

                                        alignItems: "center",

                                        justifyContent: "center",

                                        fontSize: "2rem",

                                        fontWeight: "300",

                                        transition:
                                            "all 0.2s ease",
                                    }}
                                >
                                    {user?.name
                                        ?.split(" ")
                                        .map((part) => part[0])
                                        .join("")
                                        .slice(0, 2)
                                        .toUpperCase() || "U"}
                                </div>
                                <div
                                    className="avatar-edit"
                                    style={{
                                        position: "absolute",

                                        inset: 0,

                                        borderRadius: "50%",

                                        background:
                                            "rgba(0,0,0,0.3)",

                                        backdropFilter:
                                            "blur(1px)",

                                        display: "flex",

                                        alignItems: "center",

                                        justifyContent: "center",

                                        opacity: 0,

                                        transition:
                                            "all 0.2s ease",

                                        color: "white",

                                        pointerEvents: "none",
                                    }}
                                >
                                    <Pencil size={18} />
                                </div>
                            </div>
                        </div>

                        <div
                            style={{
                                textAlign:
                                    "center",
                            }}
                        >
                            <h2
                                style={{
                                    margin: 0,

                                    fontWeight:
                                        "320",

                                    letterSpacing:
                                        "-0.03em",
                                }}
                            >
                                {user?.name || "User"}
                            </h2>

                            <p
                                style={{
                                    marginTop: "10px",

                                    opacity: 0.55,

                                    fontWeight:
                                        "300",
                                }}
                            >
                                {user?.job || "No title set"}
                            </p>

                            <p
                                style={{
                                    marginTop: "8px",

                                    opacity: 0.45,

                                    fontSize:
                                        "0.8rem",
                                }}
                            >
                                {user?.email}
                            </p>

                            <p
                                style={{
                                    marginTop: "10px",

                                    opacity: 0.25,

                                    fontSize:
                                        "0.7rem",

                                    fontWeight: "200",
                                }}
                            >
                                Member since{" "}
                                {user?.createdAt
                                    ? new Date(
                                        user.createdAt
                                    ).toLocaleDateString(
                                        "en-US",
                                        {
                                            month: "long",
                                            year: "numeric",
                                        }
                                    )
                                    : "Recently"}
                            </p>
                        </div>
                    </div>

                    <div>
                        <div
                            style={{
                                display: "flex",

                                marginBottom: "28px",
                            }}
                        >
                            {["T", "P", "+2"].map(
                                (
                                    item,
                                    index
                                ) => (
                                    <div
                                        key={item}
                                        style={{
                                            ...linkedItemStyle,

                                            marginRight: "-6px",

                                            zIndex: index + 1,
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform =
                                                "translateY(-1px) scale(1.08)";

                                            e.currentTarget.style.border =
                                                "1px solid rgba(255,255,255,0.12)";

                                            e.currentTarget.style.boxShadow =
                                                "0 8px 20px rgba(0,0,0,0.25)";

                                            e.currentTarget.style.color =
                                                "var(--text-primary)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform =
                                                "translateY(0) scale(1)";

                                            e.currentTarget.style.border =
                                                "1px solid rgba(255,255,255,0.06)";

                                            e.currentTarget.style.boxShadow =
                                                "none";

                                            e.currentTarget.style.color =
                                                "var(--text-secondary)";
                                        }}
                                    >
                                        {item}
                                    </div>
                                )
                            )}
                        </div>

                        <button
                            style={{
                                width: "100%",

                                padding:
                                    "14px",

                                borderRadius:
                                    "999px",

                                border:
                                    "1px solid rgba(255,255,255,0.08)",

                                background:
                                    "transparent",

                                color:
                                    "var(--text-secondary)",

                                cursor:
                                    "pointer",

                                fontWeight:
                                    "300",

                                marginBottom: "10px",

                                transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(255,255,255,0.04)";

                                e.currentTarget.style.color =
                                    "var(--text-primary)";

                                e.currentTarget.style.transform =
                                    "translateY(-1px)";
                            }}

                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    "transparent";

                                e.currentTarget.style.color =
                                    "var(--text-secondary)";

                                e.currentTarget.style.transform =
                                    "translateY(0)";
                            }}
                        >
                            Logout
                        </button>

                        <button
                            style={{
                                width: "100%",

                                padding:
                                    "14px",

                                borderRadius:
                                    "999px",

                                border:
                                    "1px solid rgba(255,255,255,0.08)",

                                background:
                                    "transparent",

                                color:
                                    "var(--text-secondary)",

                                cursor:
                                    "pointer",

                                fontWeight:
                                    "300",

                                transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(255,255,255,0.04)";

                                e.currentTarget.style.color =
                                    "var(--text-primary)";

                                e.currentTarget.style.transform =
                                    "translateY(-1px)";
                            }}

                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    "transparent";

                                e.currentTarget.style.color =
                                    "var(--text-secondary)";

                                e.currentTarget.style.transform =
                                    "translateY(0)";
                            }}
                        >
                            Edit Profile
                        </button>

                        <div
                            style={{
                                marginTop: "20px",

                                fontSize: "0.64rem",

                                opacity: 0.2,

                                lineHeight: 1.5,

                                textAlign: "center",

                                fontWeight: "200",
                            }}
                        >
                            <div>TaskFlow v1.0.0</div>

                            <div>Built with React & Express © 2026 Keeno Smith ♡ j</div>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}

                <div
                    style={{
                        display: "grid",

                        gridTemplateRows:
                            "0.65fr 0.9fr 0.9fr",

                        gap: "20px",
                    }}
                >
                    {/* APPEARANCE */}

                    <div style={sectionStyle}>
                        <div
                            style={{
                                display: "flex",

                                alignItems:
                                    "center",

                                gap: "10px",

                                marginBottom: "24px",

                                opacity: "0.6",
                            }}
                        >
                            <Palette
                                size={15}
                                opacity={0.6}
                            />

                            <span>
                                Appearance
                            </span>
                        </div>

                        <p
                            style={{
                                opacity: 0.5,

                                fontSize:
                                    "0.82rem",

                                marginBottom:
                                    "20px",

                            }}
                        >
                            Personalize your
                            workspace experience.
                        </p>

                        <div
                            style={{
                                display: "flex",

                                gap: "8px",

                                padding: "6px",

                                width: "fit-content",

                                background:
                                    "rgba(255,255,255,0.03)",

                                border:
                                    "1px solid rgba(255,255,255,0.06)",

                                borderRadius: "999px",
                            }}
                        >
                            <button
                                onClick={() =>
                                    updateSetting(
                                        "theme",
                                        "Light"
                                    )
                                }
                                style={{
                                    display: "flex",

                                    alignItems: "center",

                                    gap: "8px",

                                    padding: "10px 16px",

                                    border: "none",

                                    borderRadius: "999px",

                                    background:
                                        settings.theme === "Light"
                                            ? "rgba(255,255,255,0.08)"
                                            : "transparent",

                                    color:
                                        settings.theme === "Light"
                                            ? "var(--text-primary)"
                                            : "var(--text-secondary)",

                                    cursor: "pointer",

                                    transition:
                                        "all 0.25s ease",

                                    fontWeight: "300",
                                }}
                            >
                                <Sun size={14} />

                                Light
                            </button>

                            <button
                                onClick={() =>
                                    updateSetting(
                                        "theme",
                                        "Dark"
                                    )
                                }
                                style={{
                                    display: "flex",

                                    alignItems: "center",

                                    gap: "8px",

                                    padding: "10px 16px",

                                    border: "none",

                                    borderRadius: "999px",

                                    background:
                                        settings.theme === "Dark"
                                            ? "rgba(255,255,255,0.08)"
                                            : "transparent",

                                    color:
                                        settings.theme === "Dark"
                                            ? "var(--text-primary)"
                                            : "var(--text-secondary)",

                                    cursor: "pointer",

                                    transition:
                                        "all 0.25s ease",

                                    fontWeight: "300",
                                }}
                            >
                                <Moon size={14} />

                                Dark
                            </button>
                        </div>
                    </div>

                    {/* NOTIFICATIONS */}

                    <div style={sectionStyle}>
                        <div
                            style={{
                                display: "flex",

                                gap: "10px",

                                alignItems:
                                    "center",

                                marginBottom:
                                    "20px",

                                opacity: "0.6",
                            }}
                        >
                            <Bell
                                size={15}
                                opacity={0.6}
                            />

                            Notifications
                        </div>

                        <div style={rowStyle}>
                            <span>
                                Push Notifications
                            </span>

                            <div
                                onClick={() =>
                                    updateSetting(
                                        "goalNotifications",
                                        !settings.goalNotifications
                                    )
                                }
                                style={toggleStyle(
                                    settings.goalNotifications
                                )}
                            >
                                <div
                                    style={{
                                        width: "18px",
                                        height: "18px",

                                        borderRadius: "50%",

                                        background:
                                            "rgba(255,255,255,0.9)",

                                        position: "absolute",

                                        top: "3px",

                                        left:
                                            settings.goalNotifications
                                                ? "23px"
                                                : "3px",

                                        transition:
                                            "all 0.25s ease",

                                        boxShadow:
                                            "0 4px 12px rgba(0,0,0,0.25)",
                                    }}
                                />
                            </div>
                        </div>

                        <div style={rowStyle}>
                            <span>
                                Reminder Alerts
                            </span>

                            <div
                                onClick={() =>
                                    updateSetting(
                                        "reminderNotifications",
                                        !settings.reminderNotifications
                                    )
                                }
                                style={toggleStyle(
                                    settings.reminderNotifications
                                )}
                            >
                                <div
                                    style={{
                                        width: "18px",
                                        height: "18px",

                                        borderRadius: "50%",

                                        background:
                                            "rgba(255,255,255,0.9)",

                                        position: "absolute",

                                        top: "3px",

                                        left:
                                            settings.reminderNotifications
                                                ? "23px"
                                                : "3px",

                                        transition:
                                            "all 0.25s ease",

                                        boxShadow:
                                            "0 4px 12px rgba(0,0,0,0.25)",
                                    }}
                                />
                            </div>
                        </div>

                        <div
                            style={{
                                ...rowStyle,

                                borderBottom:
                                    "none",
                            }}
                        >
                            <span>
                                Weekly Summary
                            </span>

                            <div
                                onClick={() =>
                                    updateSetting(
                                        "dailySummary",
                                        !settings.dailySummary
                                    )
                                }
                                style={toggleStyle(
                                    settings.dailySummary
                                )}
                            >
                                <div
                                    style={{
                                        width: "18px",
                                        height: "18px",

                                        borderRadius: "50%",

                                        background:
                                            "rgba(255,255,255,0.9)",

                                        position: "absolute",

                                        top: "3px",

                                        left:
                                            settings.dailySummary
                                                ? "23px"
                                                : "3px",

                                        transition:
                                            "all 0.25s ease",

                                        boxShadow:
                                            "0 4px 12px rgba(0,0,0,0.25)",
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* SECURITY */}

                    <div style={sectionStyle}>
                        <div
                            style={{
                                display: "flex",

                                gap: "10px",

                                alignItems:
                                    "center",

                                marginBottom:
                                    "20px",

                                opacity: "0.6",
                            }}
                        >
                            <Shield
                                size={15}
                                opacity={0.6}
                            />

                            Account & Security
                        </div>

                        {[
                            "Change Password",
                            "Export Data",
                            "Clear Workspace",
                            "Delete Account",
                        ].map(
                            (item) => (
                                <div
                                    key={item}
                                    style={{
                                        ...rowStyle,

                                        padding: "8px 12px",
                                        borderRadius: "12px",
                                        transition: "all 0.2s ease",

                                        color:
                                            item ===
                                                "Delete Account"
                                                ? "#ff6b6b"
                                                : "inherit",

                                        borderBottom:
                                            item ===
                                                "Delete Account"
                                                ? "none"
                                                : rowStyle.borderBottom,

                                        cursor:
                                            "pointer",

                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                            item === "Delete Account"
                                                ? "rgba(255,107,107,0.08)"
                                                : "rgba(255,255,255,0.04)";
                                    }}

                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                            "transparent";
                                    }}
                                >
                                    <span>
                                        {item}
                                    </span>

                                    <ChevronRight
                                        size={16}
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default Account;