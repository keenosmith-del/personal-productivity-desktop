import MainLayout from "../layouts/MainLayout";

import EditUserModal from "../components/Account/EditUserModal";
import Toast from "../components/Toast";
import ChangePasswordModal from "../components/Account/ChangePasswordModal";
import DeleteUserModal from "../components/Account/DeleteUserModal";
import ClearWorkspaceModal from "../components/Account/ClearWorkspaceModal";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
    exportData,
} from "../services/authService";

const API_BASE_URL =
    "http://localhost:5050";

function Account() {
    const {
        user,
        refreshUser,
        logout,
    } = useAuth();

    const [showEditUser, setShowEditUser] =
        useState(false);

    const [toast, setToast] =
        useState("");

    const [settings, setSettings] =
        useState({
            theme: "Dark",

            dailySummary: true,

            goalNotifications: true,

            reminderNotifications: true,
        });

    const [
        showChangePassword,
        setShowChangePassword,
    ] = useState(false);

    const [
        showClearWorkspace,
        setShowClearWorkspace,
    ] = useState(false);

    const [
        showDeleteAccount,
        setShowDeleteAccount,
    ] = useState(false);

    const navigate = useNavigate();

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

                        height: "780px",
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
                                {settings.theme} Mode
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
                                onClick={() =>
                                    setShowEditUser(true)
                                }
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
                                            .toUpperCase() || "U"
                                    )}
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
                            onClick={() => {
                                logout();

                                navigate("/");
                            }}
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
                            onClick={() =>
                                setShowEditUser(true)
                            }
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
                            "0.45fr 0.55fr 0.55fr",

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

                                marginBottom: "20px",

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
                            Personalize your workspace experience.
                        </p>

                        {/* needs to be redesigned */}
                        <div
                            style={{
                                position: "relative",

                                display: "flex",

                                width: "90px",

                                padding: "4px",

                                background:
                                    "rgba(36, 36, 36, 0.03)",

                                border:
                                    "1px solid rgba(255,255,255,0.06)",

                                borderRadius: "999px",

                                overflow: "hidden",

                                backdropFilter: "blur(20px)",
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",

                                    top: "4px",

                                    left:
                                        settings.theme === "Light"
                                            ? "4px"
                                            : "30px",

                                    width: "30px",

                                    height: "30px",

                                    borderRadius: "999px",

                                    background:
                                        "rgba(255,255,255,0.08)",

                                    border:
                                        "1px solid rgba(255,255,255,0.08)",

                                    backdropFilter: "blur(30px)",

                                    transition:
                                        "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                                }}
                            />

                            <button
                                onClick={() =>
                                    updateSetting(
                                        "theme",
                                        "Light"
                                    )
                                }
                                style={{
                                    flex: 1,

                                    height: "30px",

                                    display: "flex",

                                    alignItems: "center",

                                    justifyContent: "center",

                                    gap: "4px",

                                    background: "transparent",

                                    border: "none",

                                    color:
                                        settings.theme === "Light"
                                            ? "var(--text-primary)"
                                            : "var(--text-secondary)",

                                    cursor: "pointer",

                                    zIndex: 1,

                                    fontWeight: "300",

                                    transition: "all 0.2s ease",
                                }}
                            >
                                <Sun size={14} />
                            </button>

                            <button
                                onClick={() =>
                                    updateSetting(
                                        "theme",
                                        "Dark"
                                    )
                                }
                                style={{
                                    flex: 1,

                                    height: "30px",

                                    display: "flex",

                                    alignItems: "center",

                                    justifyContent: "center",

                                    gap: "4px",

                                    background: "transparent",

                                    border: "none",

                                    color:
                                        settings.theme === "Dark"
                                            ? "var(--text-primary)"
                                            : "var(--text-secondary)",

                                    cursor: "pointer",

                                    zIndex: 1,

                                    fontWeight: "300",

                                    transition: "all 0.2s ease",
                                }}
                            >
                                <Moon size={14} />
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
                            {
                                label: "Change Password",
                                action: () =>
                                    setShowChangePassword(
                                        true
                                    ),
                            },

                            {
                                label: "Export Data",

                                action: async () => {

                                    const data =
                                        await exportData();

                                    const blob =
                                        new Blob(
                                            [
                                                JSON.stringify(
                                                    data,
                                                    null,
                                                    2
                                                ),
                                            ],
                                            {
                                                type:
                                                    "application/json",
                                            }
                                        );

                                    const url =
                                        URL.createObjectURL(
                                            blob
                                        );

                                    const link =
                                        document.createElement(
                                            "a"
                                        );

                                    link.href = url;

                                    link.download =
                                        `workspace-export-${new Date()
                                            .toISOString()
                                            .slice(0, 10)}.json`;

                                    link.click();

                                    URL.revokeObjectURL(
                                        url
                                    );

                                    setToast(
                                        "Workspace exported"
                                    );

                                    setTimeout(() => {
                                        setToast("");
                                    }, 3000);
                                },
                            },

                            {
                                label: "Clear Workspace",
                                action: () =>
                                    setShowClearWorkspace(
                                        true
                                    ),
                            },

                            {
                                label: "Delete Account",
                                action: () =>
                                    setShowDeleteAccount(
                                        true
                                    ),
                            },
                        ].map(
                            (item) => (
                                <div
                                    onClick={item.action}
                                    key={item.label}
                                    style={{
                                        ...rowStyle,

                                        padding: "8px 12px",
                                        borderRadius: "12px",
                                        transition: "all 0.2s ease",

                                        color:
                                            item.label ===
                                                "Delete Account"
                                                ? "#ff6b6b"
                                                : "inherit",

                                        borderBottom:
                                            item.label ===
                                                "Delete Account"
                                                ? "none"
                                                : rowStyle.borderBottom,

                                        cursor:
                                            "pointer",

                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                            item.label === "Delete Account"
                                                ? "rgba(255,107,107,0.08)"
                                                : "rgba(255,255,255,0.04)";
                                    }}

                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                            "transparent";
                                    }}
                                >
                                    <span>
                                        {item.label}
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
            {showEditUser && (
                <EditUserModal
                    user={user}
                    refreshUser={refreshUser}
                    onClose={(success = false) => {
                        setShowEditUser(false);

                        if (success) {
                            setToast(
                                "Profile updated"
                            );

                            setTimeout(() => {
                                setToast("");
                            }, 3000);
                        }
                    }}
                />
            )}
            {showChangePassword && (
                <ChangePasswordModal
                    user={user}
                    onClose={(success = false) => {

                        setShowChangePassword(
                            false
                        );

                        if (success) {

                            setToast(
                                "Password updated"
                            );

                            setTimeout(() => {
                                setToast("");
                            }, 3000);
                        }
                    }}
                />
            )}
            {showClearWorkspace && (
                <ClearWorkspaceModal
                    user={user}
                    onClose={(success = false) => {

                        setShowClearWorkspace(
                            false
                        );

                        if (success) {

                            setToast(
                                "Workspace cleared"
                            );

                            setTimeout(() => {
                                setToast("");
                            }, 3000);
                        }
                    }}
                />
            )}
            {showDeleteAccount && (
                <DeleteUserModal
                    user={user}
                    onClose={(success = false) => {

                        setShowDeleteAccount(
                            false
                        );

                        if (success) {

                            setToast(
                                "Account deleted"
                            );

                            setTimeout(() => {
                                setToast("");
                            }, 3000);

                            logout();

                            navigate("/");
                        }
                    }}
                />
            )}
            <Toast
                message={toast}
            />
        </MainLayout>
    );
}

export default Account;