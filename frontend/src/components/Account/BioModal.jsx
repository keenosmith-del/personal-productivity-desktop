import {
    useState,
    useRef,
    useEffect
} from "react";

import { useAuth } from "../../context/AuthContext";

function BioModal({
    onClose,
    bio = "",
    onSave,
}) {
    const { user } = useAuth();

    const bioInputRef = useRef(null);

    const [bioText, setBioText] =
        useState(bio);

    const [showCloseButton, setShowCloseButton] =
        useState(false);

    useEffect(() => {
        bioInputRef.current?.focus();
    }, []);

    const handleSave = () => {

        onSave(bioText);

        onClose();

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
                    "blur(20px)",

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
                    width: "500px",

                    background:
                        "rgba(20, 20, 20, 0)",

                    backdropFilter:
                        "blur(12px)",

                    border:
                        "1px solid rgba(27, 27, 27, 0.1)",

                    boxShadow:
                        "0 20px 50px rgba(0,0,0,0.35)",

                    borderRadius: "36px",

                    padding: "36px",

                    display: "flex",

                    flexDirection: "column",

                    // gap: "10px",
                }}
            >
                {/*TOP ROW*/}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-start",
                        marginBottom: "24px",
                    }}
                >

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

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >

                    {/* BIO */}
                    <div
                        style={{
                            background: "transparent",

                            border: "none",

                            outline: "none",

                            textAlign: "center",

                            color:
                                "var(--text-primary)",

                            fontSize: "2rem",

                            fontWeight: "300",

                            letterSpacing: "-0.04em",

                            marginBottom: "16px",
                        }}
                    >
                        Bio
                    </ div>

                    {/* DESCRITION */}
                    <textarea
                        value={bioText}
                        ref={bioInputRef}
                        onChange={(e) =>
                            setBioText(
                                e.target.value
                            )
                        }

                        placeholder="Add bio..."

                        rows={4}

                        style={{
                            background: "transparent",

                            border: "none",

                            outline: "none",

                            resize: "none",

                            textAlign: "center",

                            color:
                                "var(--text-secondary)",

                            fontSize: "0.9rem",

                            fontWeight: "300",

                            lineHeight: 1.5,

                            marginBottom: "28px",
                        }}
                    />

                    <div
                        style={{
                            display: "flex",

                            justifyContent: "center",

                            gap: "8px",

                            marginBottom: "28px",
                        }}
                    >
                    </div>

                    <div
                        style={{
                            display: "flex",

                            justifyContent:
                                "space-between",

                            alignItems: "center",

                            cursor: "pointer",

                            padding: "10px 0",

                            marginBottom: "2px",
                        }}
                    >
                    </div>

                    {/* MEMBER SINCE */}
                    <div
                        style={{
                            fontSize: "0.72rem",

                            opacity: 0.35,

                            // marginBottom: "8px",

                            textAlign: "center",

                            marginBottom: 0,
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
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "10px",
                        marginTop: "24px",
                    }}
                >

                    <button
                        onClick={onClose}
                        style={{
                            padding: "8px 14px",

                            borderRadius: "999px",

                            background:
                                "rgba(255,77,77,0.12)",

                            border:
                                "1px solid rgba(255,77,77,0.25)",

                            color: "var(--danger)",

                            fontSize: "0.8rem",

                            fontWeight: "300",

                            cursor: "pointer",

                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,77,77,0.20)";

                            e.currentTarget.style.transform =
                                "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,77,77,0.12)";

                            e.currentTarget.style.transform =
                                "translateY(0)";
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        style={{
                            padding: "8px 14px",

                            borderRadius: "999px",

                            background: "rgba(255,255,255,0.08)",

                            border: "1px solid rgba(255,255,255,0.10)",

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
                        Save
                    </button>
                </div>
            </div>
        </div >
    );
}

export default BioModal;