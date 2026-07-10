// create folder (create button at bottom)
// edit folder (delete and save buttons at bottom)

import {
    useState,
    useRef,
    useEffect
} from "react";

import DeleteConfirmModal from "../DeleteConfirmModal";

import {
    NotebookPen,
} from "lucide-react";

function NoteFolderCreateModal({
    mode = "create",
    folder = null,

    onCreate,
    onUpdate,
    onDelete,
    onClose,
}) {
    const [title, setTitle] =
        useState(folder?.title || "");

    const [description, setDescription] =
        useState(folder?.description || "");

    const [contentFocused, setContentFocused] =
        useState(false);

    const [showCloseButton, setShowCloseButton] =
        useState(false);

    const [showDeleteConfirm, setShowDeleteConfirm] =
        useState(false);

    useEffect(() => {
        if (folder) {
            setTitle(folder.title || "");
            setDescription(folder.description || "");
        }
    }, [folder]);

    const handleSave = async () => {

        if (!title.trim()) return;

        const folderData = {
            title: title.trim(),
            description: description.trim(),
        };

        if (mode === "edit") {
            await onUpdate(
                folder._id,
                folderData
            );
        } else {
            await onCreate(folderData);
        }

        onClose();
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,

                background:
                    "rgba(20, 20, 20, 0)",

                backdropFilter:
                    "blur(12px)",

                border:
                    "1px solid rgba(255,255,255,0.10)",

                boxShadow:
                    "0 20px 50px rgba(0,0,0,0.35)",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                zIndex: 1000,
            }}
        >
            {!showDeleteConfirm && (
                <div
                    onClick={(e) =>
                        e.stopPropagation()
                    }
                    style={{
                        width: "500px",
                        height: "300px",

                        background:
                            "rgba(0, 0, 0, 0.15)",

                        border:
                            "1px solid rgba(255,255,255,0.08)",

                        borderRadius:
                            "36px",

                        backdropFilter:
                            "blur(30px)",

                        boxShadow:
                            "0 30px 80px rgba(0,0,0,0.45)",

                        padding: "36px",

                        display: "flex",

                        flexDirection: "column",

                        // gap: "10px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                            marginBottom: "1px",
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

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >

                        {/* TITLE */}
                        <input
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            placeholder="Folder Title"
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

                                marginBottom: "24px",
                            }}
                        />

                        {/* OPTIONAL DESCRIPTION */}
                        <div
                            style={{
                                marginBottom: "20px",
                            }}
                        >
                            <textarea
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                rows={1}
                                placeholder="Optional Description..."
                                style={{
                                    width: "100%",

                                    height: "80px",

                                    background:
                                        contentFocused
                                            ? "rgba(255,255,255,0.02)"
                                            : "transparent",

                                    borderRadius: "12px",

                                    padding: "10px 12px",

                                    transition:
                                        "all 0.2s ease",

                                    border: "none",

                                    outline: "none",

                                    resize: "none",

                                    color: "var(--text-primary)",

                                    fontFamily: "inherit",

                                    fontSize: "0.9rem",

                                    fontWeight: "300",
                                }}
                                onFocus={() =>
                                    setContentFocused(true)
                                }

                                onBlur={() =>
                                    setContentFocused(false)
                                }
                            />
                        </div>

                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "10px",
                            marginTop: "1px",
                        }}
                    >
                        {mode === "edit" && (
                            <button
                                onClick={() =>
                                    setShowDeleteConfirm(true)
                                }
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
                                Delete
                            </button>
                        )}

                        <button
                            onClick={handleSave}
                            style={{
                                padding: "8px 14px",

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
                            {mode === "edit"
                                ? "Save"
                                : "Create"}
                        </button>
                    </div>
                </div>
            )}
            {showDeleteConfirm && (
                <DeleteConfirmModal
                    title="Delete folder?"
                    message="This action cannot be undone."

                    onCancel={() => {
                        setShowDeleteConfirm(false);
                    }}

                    onConfirm={async () => {
                        await onDelete(folder._id);

                        setShowDeleteConfirm(false);

                        onClose();
                    }}
                />
            )}
        </div>
    );
}

export default NoteFolderCreateModal;