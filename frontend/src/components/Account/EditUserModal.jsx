import {
    useState,
    useRef,
    useEffect,
} from "react";

import {
    X,
    Pencil,
} from "lucide-react";

import {
    updateProfile,
} from "../../services/authService";

const API_BASE_URL =
    "http://localhost:5050";

function EditUserModal({
    user,
    onClose,
    refreshUser,
}) {
    const [name, setName] =
        useState(user?.name || "");

    const [job, setJob] =
        useState(user?.job || "");

    const [email, setEmail] =
        useState(user?.email || "");

    const [error, setError] =
        useState("");

    const [nameError, setNameError] =
        useState(false);

    const [emailError, setEmailError] =
        useState(false);

    const errorTimeoutRef =
        useRef(null);

    const fileInputRef =
        useRef(null);

    const [avatar, setAvatar] =
        useState(null);

    const [showCloseButton, setShowCloseButton] =
        useState(false);

    const [avatarPreview, setAvatarPreview] =
        useState(
            user?.avatar
                ? `${API_BASE_URL}${user.avatar}`
                : ""
        );

    const [removeAvatar, setRemoveAvatar] =
        useState(false);

    const hasExistingAvatar =
        !!user?.avatar && !removeAvatar;

    useEffect(() => {
        if (removeAvatar) return;

        setAvatarPreview(
            user?.avatar
                ? `${API_BASE_URL}${user.avatar}`
                : ""
        );
    }, [user, removeAvatar]);

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

        transition:
            "all 0.2s ease",
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

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,

                background:
                    "rgba(20, 20, 20, 0)",

                backdropFilter:
                    "blur(15px)",

                display: "flex",
                justifyContent:
                    "center",
                alignItems: "center",

                zIndex: 1000,
            }}
        >
            <div
                onClick={(e) =>
                    e.stopPropagation()
                }
                style={{
                    width: "500px",

                    background:
                        "rgba(20, 20, 20, 0)",

                    backdropFilter:
                        "blur(12px)",

                    // like this border
                    border:
                        "1px solid rgba(27, 27, 27, 0.1)",

                    boxShadow:
                        "0 20px 50px rgba(0,0,0,0.35)",

                    borderRadius: "36px",

                    padding: "36px",

                    display: "flex",
                    flexDirection:
                        "column",

                    gap: "10px",
                }}
            >
                {/* HEADER */}

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

                                fontSize:
                                    "0.95rem",

                                fontWeight: "300",
                            }}
                        >
                            Edit Profile
                        </h2>

                        <p
                            style={{
                                marginTop: "4px",
                                marginBottom: "10px",

                                fontSize:
                                    "0.8rem",

                                fontWeight: "300",

                                opacity: 0.55,
                            }}
                        >
                            Update your account
                            information
                        </p>
                    </div>

                    {/* close x */}
                    <div
                        style={{
                            position: "relative",
                        }}
                        onMouseEnter={() =>
                            setShowCloseButton(true)
                        }
                        onMouseLeave={() =>
                            setShowCloseButton(false)
                        }
                    >
                        <button
                            onClick={() => {
                                onClose();
                            }}
                            style={{
                                width: "30px",
                                height: "30px",

                                borderRadius: "999px",

                                border: "none",

                                background:
                                    "rgba(255,255,255,0.04)",

                                color:
                                    "var(--text-secondary)",

                                cursor: "pointer",

                                fontSize: "0.8rem",

                                transition: "all 0.2s ease",

                                opacity: showCloseButton ? 1 : 0,

                                transition: "opacity 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    "rgb(33, 33, 33)";

                                e.currentTarget.style.transform =
                                    "translateY(-1px)";

                                e.currentTarget.style.color =
                                    "var(--text-primary)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    "rgb(33, 33, 33)";

                                e.currentTarget.style.transform =
                                    "translateY(0)";

                                e.currentTarget.style.color =
                                    "var(--text-secondary)";
                            }}
                        >
                            x
                        </button>
                    </div>
                </div>

                {/* AVATAR */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "20px",
                    }}
                >
                    <div
                        onClick={() =>
                            fileInputRef.current?.click()
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

                            const remove =
                                e.currentTarget.querySelector(
                                    ".avatar-remove"
                                );

                            if (remove) {
                                remove.style.opacity = 1;
                            }

                            const avatar =
                                e.currentTarget
                                    .children[0];

                            overlay.style.opacity = 1;

                            avatar.style.transform =
                                "scale(0.98)";

                            avatar.style.opacity =
                                0.55;

                            // avatar.style.border = "1px solid rgba(255,255,255,0.12)";
                        }}
                        onMouseLeave={(e) => {
                            const overlay =
                                e.currentTarget.querySelector(
                                    ".avatar-edit"
                                );

                            const remove =
                                e.currentTarget.querySelector(
                                    ".avatar-remove"
                                );

                            if (remove) {
                                remove.style.opacity = 0;
                            }

                            const avatar =
                                e.currentTarget
                                    .children[0];

                            overlay.style.opacity = 0;

                            avatar.style.transform =
                                "scale(1)";

                            avatar.style.opacity = 1;

                            // avatar.style.border = "1px solid rgba(255,255,255,0.08)";
                        }}
                    >
                        <div
                            style={{
                                width: "120px",
                                height: "120px",

                                borderRadius: "50%",

                                // background: "rgba(255,255,255,0.06)",

                                // border: "1px solid rgba(255,255,255,0.08)",

                                display: "flex",

                                alignItems: "center",

                                justifyContent: "center",

                                fontSize: "2rem",

                                fontWeight: "300",

                                transition:
                                    "all 0.2s ease",
                            }}
                        >
                            {avatarPreview ? (
                                <img
                                    src={avatarPreview}
                                    alt="Profile"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "50%",
                                    }}
                                />
                            ) : (
                                name
                                    .split(" ")
                                    .map((part) => part[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase() || "U"
                            )}
                        </div>

                        {hasExistingAvatar && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();

                                    setAvatar(null);
                                    setAvatarPreview("");
                                    setRemoveAvatar(true);
                                }}
                                style={{
                                    position: "absolute",
                                    top: "-2px",
                                    right: "-2px",

                                    width: "24px",
                                    height: "24px",

                                    borderRadius: "50%",

                                    border: "1px solid rgba(255,255,255,0.08)",

                                    background: "rgba(18,18,18,0.75)",

                                    backdropFilter: "blur(10px)",

                                    color: "rgba(255,255,255,0.75)",

                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",

                                    cursor: "pointer",

                                    opacity: 0,

                                    transition: "all 0.2s ease",

                                    zIndex: 5,
                                }}
                                className="avatar-remove"
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                        "rgba(170,60,60,0.85)";

                                    e.currentTarget.style.color =
                                        "white";

                                    e.currentTarget.style.transform =
                                        "scale(1.05)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                        "rgba(18,18,18,0.75)";

                                    e.currentTarget.style.color =
                                        "rgba(255,255,255,0.75)";

                                    e.currentTarget.style.transform =
                                        "scale(1)";
                                }}
                            >
                                x
                            </button>
                        )}

                        <div
                            className="avatar-edit"
                            style={{
                                position: "absolute",

                                inset: 0,

                                borderRadius: "50%",

                                background: "rgba(0,0,0,0.3)",

                                backdropFilter:
                                    "blur(1px)",

                                display: "flex",

                                alignItems:
                                    "center",

                                justifyContent:
                                    "center",

                                opacity: 0,

                                transition:
                                    "all 0.2s ease",

                                color: "white",

                                pointerEvents:
                                    "none",
                            }}
                        >
                            <Pencil size={18} />
                        </div>
                    </div>
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{
                        display: "none",
                    }}
                    onChange={(e) => {
                        const file =
                            e.target.files?.[0];

                        if (!file) return;

                        setRemoveAvatar(false);

                        setAvatar(file);

                        setAvatarPreview(
                            URL.createObjectURL(file)
                        );
                    }}
                />

                <div
                    style={{
                        textAlign: "center",

                        display: "flex",

                        flexDirection:
                            "column",

                        gap: "1px",

                        marginTop: "-10px",
                        marginBottom: "10px",
                    }}
                >
                    <span
                        style={{
                            fontSize:
                                "0.95rem",

                            fontWeight: "300",
                        }}
                    >
                        {name || "User"}
                    </span>

                    <span
                        style={{
                            fontSize:
                                "0.85rem",

                            opacity: 0.55,

                            fontWeight: "300",
                        }}
                    >
                        {job || "No title set"}
                    </span>
                </div>

                {/* TPG */}
                {/* NEED TO MAP REAL ITEMS */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",

                        marginTop: "-4px",
                    }}
                >
                    {["T", "P", "G"].map(
                        (item, index) => (
                            <div
                                key={item}
                                style={{
                                    ...linkedItemStyle,

                                    marginRight:
                                        "-6px",

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

                {/* PERSONAL */}

                <div>
                    <div
                        style={{
                            fontSize:
                                "0.65rem",

                            letterSpacing:
                                "0.15em",

                            textTransform:
                                "uppercase",

                            opacity: 0.45,

                            fontWeight: "300",
                        }}
                    >

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
                    value={name}
                    onChange={(e) => {

                        setName(
                            e.target.value
                        );

                        setError("");

                        setNameError(false);
                    }}
                    placeholder="Name"
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
                    value={job}
                    onChange={(e) =>
                        setJob(
                            e.target.value
                        )
                    }
                    placeholder="Job Title"
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

                <input
                    value={email}
                    onChange={(e) => {

                        setEmail(
                            e.target.value
                        );

                        setError("");

                        setEmailError(false);
                    }}
                    placeholder="Email"
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

                {/* FOOTER */}

                <div
                    style={{
                        display: "flex",

                        justifyContent:
                            "flex-end",

                        gap: "10px",

                        marginTop: "10px",
                    }}
                >
                    <button
                        onClick={() => onClose()}
                        style={{
                            padding:
                                "8px 14px",

                            borderRadius:
                                "999px",

                            background:
                                "rgba(255, 77, 77, 0.12)",

                            border:
                                "1px solid rgba(255, 77, 77, 0.25)",

                            color:
                                "var(--danger)",

                            fontSize:
                                "0.8rem",

                            fontWeight: "300",

                            cursor:
                                "pointer",
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

                            clearTimeout(
                                errorTimeoutRef.current
                            );

                            setError("");

                            setNameError(false);

                            setEmailError(false);

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
                                !/\S+@\S+\.\S+/.test(
                                    email
                                )
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

                            try {

                                await updateProfile({
                                    name,
                                    email,
                                    job,
                                    avatar,
                                    removeAvatar,
                                });

                                await refreshUser();

                                onClose(true);

                            } catch (error) {

                                if (
                                    error.message
                                        ?.toLowerCase()
                                        .includes("email")
                                ) {

                                    setEmailError(true);
                                }

                                setError(
                                    error.message
                                );

                                errorTimeoutRef.current =
                                    setTimeout(() => {

                                        setError("");

                                        setEmailError(false);

                                    }, 3000);
                            }
                        }}
                        style={{
                            padding:
                                "8px 14px",

                            borderRadius:
                                "999px",

                            background:
                                "rgba(255,255,255,0.08)",

                            border:
                                "1px solid rgba(255,255,255,0.10)",

                            color:
                                "var(--text-primary)",

                            fontSize:
                                "0.8rem",

                            fontWeight: "300",

                            cursor:
                                "pointer",
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
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditUserModal;