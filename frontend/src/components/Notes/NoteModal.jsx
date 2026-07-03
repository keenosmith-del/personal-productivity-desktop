// create note ONLY (no edit)
// test

import {
    useState,
    useRef,
    useEffect
} from "react";

import {
    NotebookPen,
    Pause,
    Shield,
    LoaderCircle,
    Archive,
    X,
    Calendar,
} from "lucide-react";

function NoteModal({
    onClose,
    mode = "create",
    note = null,
    onSave,
}) {
    const noteInputRef = useRef(null);

    const categoryRef = useRef(null);

    const priorityRef = useRef(null);

    const statusRef = useRef(null);

    const [noteName,
        setNoteName] =
        useState(
            note?.title || ""
        );

    const [content,
        setContent] =
        useState(
            note?.content || ""
        );

    const [priority, setPriority] =
        useState(
            note?.priority ||
            "Medium"
        );

    const [category, setCategory] =
        useState(
            note?.category ||
            "Personal"
        );

    const [status, setStatus] =
        useState(
            note?.status ||
            "Active"
        );

    const [activeSelector, setActiveSelector] =
        useState(null);

    const [showCalendarModal, setShowCalendarModal] =
        useState(false);

    const [titleFocused,
        setTitleFocused] =
        useState(false);

    const [contentFocused,
        setContentFocused] =
        useState(false);

    const [titleError, setTitleError] =
        useState(false);


    const [selectedDate, setSelectedDate] =
        useState(
            note?.dueDate || new Date().toISOString()
        );

    const [linkedItems, setLinkedItems] =
        useState(
            note?.linkedItems?.length
                ? note.linkedItems
                : ["NL"]
        );

    useEffect(() => {
        noteInputRef.current?.focus();
    }, []);

    {/* outside-click of chip dropdown */ }
    useEffect(() => {
        const handleClickOutside = (
            event
        ) => {
            if (
                categoryRef.current &&
                categoryRef.current.contains(
                    event.target
                )
            ) {
                return;
            }

            if (
                priorityRef.current &&
                priorityRef.current.contains(
                    event.target
                )
            ) {
                return;
            }

            if (
                statusRef.current &&
                statusRef.current.contains(
                    event.target
                )
            ) {
                return;
            }

            setActiveSelector(null);
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const formattedCreatedDate =
        note?.createdAt
            ? new Date(
                note.createdAt
            ).toLocaleDateString(
                "en-US",
                {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                }
            )
            : null;

    const handleModalOverlayClick = () => {
        if (showCalendarModal) {
            return;
        }

        onClose();
    };

    const associationOptions = [
        "G",
        "P",
        "N",
        "R",
        "T",
        "NL",
    ];

    const handleSave = () => {
        if (!noteName.trim()) {
            setTitleError(true);

            noteInputRef.current?.focus();

            setTimeout(() => {
                setTitleError(false);
            }, 400);

            return;
        }

        onSave({
            id:
                note?.id ||
                Date.now(),

            title: noteName,

            content,

            priority,

            category,

            status,

            dueDate: selectedDate,

            linkedItems,
        });

        onClose();
    };

    const inputStyle = {
        width: "100%",

        padding: "14px 18px",

        background:
            "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",

        border:
            "1px solid rgba(255,255,255,0.12)",

        borderRadius: "16px",

        color:
            "var(--text-primary)",

        fontSize: "0.95rem",

        outline: "none",
    };

    const statusConfig = {
        Active: {
            icon: Shield,
            label: "Active",

            background: "#4d689333",
            border: "#4d689366",
            color: "#8faec0",
        },

        "In Progress": {
            icon: LoaderCircle,
            label: "In Progress",

            background: "#5d766233",
            border: "#5d766266",
            color: "#a8bf9f",
        },

        // paused takes priority over overdue
        Archived: {
            icon: Archive,
            label: "Archived",

            background: "#45575b33",
            border: "#45575b66",
            color: "#9ca9ad",
        },
    };

    const currentStatus =
        statusConfig[status];

    const StatusIcon =
        currentStatus.icon;

    return (
        <div
            onClick={handleModalOverlayClick}
            style={{
                position: "fixed",
                inset: 0,

                background: "rgba(0,0,0,0.35)",

                backdropFilter: "blur(20px)",

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

                    background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",

                    border: "1px solid rgba(255,255,255,0.10)",

                    borderRadius: "36px",

                    backdropFilter: "blur(30px)",

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
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "24px",
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
                            {mode === "edit"
                                ? "Edit Note"
                                : "New Note"}
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
                            {mode === "edit"
                                ? "Update note information"
                                : "Create a new note"}
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

                {/* icon */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "20px",
                        opacity: 0.55,
                    }}
                >
                    <NotebookPen
                        size={28}
                        strokeWidth={1.8}
                    />
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >

                    {mode === "edit" &&
                        formattedCreatedDate && (
                            <p
                                style={{
                                    marginTop: "12px",

                                    marginBottom: "10px",

                                    textAlign: "center",

                                    fontSize: "0.72rem",

                                    fontWeight: "300",

                                    opacity: 0.4,
                                }}
                            >
                                Created on {formattedCreatedDate}
                            </p>
                        )}

                    {/* CHIPS */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "8px",
                            flexWrap: "wrap",
                            marginBottom: "22px",
                            fontWeight: "300",
                            marginTop: "20px",
                        }}
                    >

                        {/* Start wrapper category dropdown and button */}
                        <div
                            ref={categoryRef}
                            style={{
                                position: "relative",
                            }}
                        >
                            <button
                                onClick={() =>
                                    setActiveSelector(
                                        activeSelector === "category"
                                            ? null
                                            : "category"
                                    )
                                }
                                style={{
                                    padding: "6px 12px",
                                    minWidth: "78px",
                                    textAlign: "center",

                                    fontWeight: "300",
                                    fontSize: "0.75rem",

                                    borderRadius: "999px",
                                    cursor: "pointer",

                                    background:
                                        category === "Work"
                                            ? "#466a6d33"
                                            : category === "Study"
                                                ? "#536b8333"
                                                : category === "Personal"
                                                    ? "#6f5f7a33"
                                                    : "#57707a33",

                                    border:
                                        category === "Work"
                                            ? "1px solid #466a6d66"
                                            : category === "Study"
                                                ? "1px solid #536b8366"
                                                : category === "Personal"
                                                    ? "1px solid #6f5f7a66"
                                                    : "1px solid #57707a66",

                                    color: "var(--text-primary)",
                                }}
                            >
                                {category}
                            </button>

                            {activeSelector === "category" && (
                                <div
                                    style={{
                                        width: "110px",

                                        position: "absolute",
                                        top: "calc(100% + 8px)",
                                        left: 0,

                                        background:
                                            "rgba(20,20,20,0.92)",

                                        backdropFilter:
                                            "blur(24px)",

                                        border:
                                            "1px solid rgba(255,255,255,0.10)",

                                        boxShadow:
                                            "0 20px 50px rgba(0,0,0,0.35)",

                                        borderRadius: "16px",

                                        padding: "8px",

                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "4px",

                                        zIndex: 20,
                                    }}
                                >
                                    {[
                                        "Work",
                                        "Study",
                                        "Personal",
                                        "Health",
                                    ].map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                setCategory(option);
                                                setActiveSelector(null);
                                            }}
                                            style={{
                                                background:
                                                    option === category
                                                        ? "rgba(255,255,255,0.08)"
                                                        : "transparent",

                                                border: "none",

                                                color:
                                                    "var(--text-primary)",

                                                padding: "8px 12px",

                                                borderRadius: "10px",

                                                cursor: "pointer",

                                                textAlign: "left",

                                                fontSize: "0.75rem",
                                            }}
                                            onMouseEnter={(e) => {
                                                if (
                                                    (activeSelector === "category" &&
                                                        option !== category) ||
                                                    (activeSelector === "priority" &&
                                                        option !== priority) ||
                                                    (activeSelector === "status" &&
                                                        option !== status)
                                                ) {
                                                    e.currentTarget.style.background =
                                                        "rgba(255,255,255,0.05)";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                const isSelected =
                                                    option === category ||
                                                    option === priority ||
                                                    option === status;

                                                e.currentTarget.style.background =
                                                    isSelected
                                                        ? "rgba(255,255,255,0.08)"
                                                        : "transparent";
                                            }}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* end category button and dropdown wrapper */}

                        {/* start wrapper priority button and dropdown */}
                        <div
                            ref={priorityRef}
                            style={{
                                position: "relative",
                            }}
                        >
                            <button
                                onClick={() =>
                                    setActiveSelector(
                                        activeSelector === "priority"
                                            ? null
                                            : "priority"
                                    )
                                }
                                style={{
                                    padding: "6px 12px",
                                    minWidth: "78px",
                                    textAlign: "center",

                                    fontSize: "0.75rem",
                                    fontWeight: "300",

                                    borderRadius: "999px",
                                    cursor: "pointer",

                                    background:
                                        priority === "Low"
                                            ? "#273c4133"
                                            : priority === "Medium"
                                                ? "#5e687433"
                                                : "#6b544733",

                                    border:
                                        priority === "Low"
                                            ? "1px solid #273c4166"
                                            : priority === "Medium"
                                                ? "1px solid #5e687466"
                                                : "1px solid #6b544766",

                                    color: "var(--text-primary)",
                                }}
                            >
                                {priority}
                            </button>

                            {activeSelector === "priority" && (
                                <div
                                    style={{
                                        width: "110px",

                                        position: "absolute",

                                        top: "calc(100% + 8px)",

                                        left: 0,

                                        background:
                                            "rgba(20,20,20,0.92)",

                                        backdropFilter:
                                            "blur(24px)",

                                        border:
                                            "1px solid rgba(255,255,255,0.10)",

                                        boxShadow:
                                            "0 20px 50px rgba(0,0,0,0.35)",

                                        borderRadius: "16px",

                                        padding: "8px",

                                        display: "flex",
                                        flexDirection: "column",

                                        gap: "4px",

                                        zIndex: 20,
                                    }}
                                >
                                    {[
                                        "Low",
                                        "Medium",
                                        "High",
                                    ].map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                setPriority(option);
                                                setActiveSelector(null);
                                            }}
                                            style={{
                                                background:
                                                    option === priority
                                                        ? "rgba(255,255,255,0.08)"
                                                        : "transparent",

                                                border: "none",

                                                color:
                                                    "var(--text-primary)",

                                                padding: "8px 12px",

                                                borderRadius: "10px",

                                                cursor: "pointer",

                                                textAlign: "left",

                                                fontSize: "0.75rem",
                                            }}
                                            onMouseEnter={(e) => {
                                                if (
                                                    (activeSelector === "category" &&
                                                        option !== category) ||
                                                    (activeSelector === "priority" &&
                                                        option !== priority) ||
                                                    (activeSelector === "status" &&
                                                        option !== status)
                                                ) {
                                                    e.currentTarget.style.background =
                                                        "rgba(255,255,255,0.05)";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                const isSelected =
                                                    option === category ||
                                                    option === priority ||
                                                    option === status;

                                                e.currentTarget.style.background =
                                                    isSelected
                                                        ? "rgba(255,255,255,0.08)"
                                                        : "transparent";
                                            }}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* end priority button and dropdown */}

                        {/* start status button and dropdown wrapper */}
                        {/* Notes don't have due date should just be active, in progress, and archived */}
                        <div
                            ref={statusRef}
                            style={{
                                position: "relative",
                            }}
                        >
                            <button
                                onClick={() =>
                                    setActiveSelector(
                                        activeSelector === "status"
                                            ? null
                                            : "status"
                                    )
                                }
                                style={{
                                    padding: "6px 12px",
                                    minWidth: "78px",
                                    textAlign: "center",

                                    fontSize: "0.75rem",
                                    fontWeight: "300",

                                    borderRadius: "999px",
                                    cursor: "pointer",

                                    background:
                                        currentStatus.background,

                                    border: `1px solid ${currentStatus.border}`,

                                    color:
                                        currentStatus.color,
                                }}
                            >
                                {currentStatus.label}
                            </button>

                            {activeSelector === "status" && (
                                <div
                                    style={{
                                        width: "110px",

                                        position: "absolute",

                                        top: "calc(100% + 8px)",

                                        left: 0,

                                        background:
                                            "rgba(20,20,20,0.92)",

                                        backdropFilter:
                                            "blur(24px)",

                                        border:
                                            "1px solid rgba(255,255,255,0.10)",

                                        boxShadow:
                                            "0 20px 50px rgba(0,0,0,0.35)",

                                        borderRadius: "16px",

                                        padding: "8px",

                                        display: "flex",
                                        flexDirection: "column",

                                        gap: "4px",

                                        zIndex: 20,
                                    }}
                                >
                                    {[
                                        "Active",
                                        "In Progress",
                                        "Archived",
                                    ].map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                setStatus(option);
                                                setActiveSelector(null);
                                            }}
                                            style={{
                                                background:
                                                    option === status
                                                        ? "rgba(255,255,255,0.08)"
                                                        : "transparent",

                                                border: "none",

                                                color:
                                                    "var(--text-primary)",

                                                padding: "8px 12px",

                                                borderRadius: "10px",

                                                cursor: "pointer",

                                                textAlign: "left",

                                                fontSize: "0.75rem",
                                            }}
                                            onMouseEnter={(e) => {
                                                if (
                                                    (activeSelector === "category" &&
                                                        option !== category) ||
                                                    (activeSelector === "priority" &&
                                                        option !== priority) ||
                                                    (activeSelector === "status" &&
                                                        option !== status)
                                                ) {
                                                    e.currentTarget.style.background =
                                                        "rgba(255,255,255,0.05)";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                const isSelected =
                                                    option === category ||
                                                    option === priority ||
                                                    option === status;

                                                e.currentTarget.style.background =
                                                    isSelected
                                                        ? "rgba(255,255,255,0.08)"
                                                        : "transparent";
                                            }}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* end wrapper status and dropdown */}
                    </div>

                    <div
                        style={{
                            display: "flex",

                            justifyContent: "center",

                            gap: "8px",

                            marginBottom: "22px",
                        }}
                    >
                        {associationOptions.map(
                            (item) => {
                                const selected =
                                    linkedItems.includes(
                                        item
                                    );

                                return (
                                    <button
                                        key={item}
                                        onClick={() => {
                                            setLinkedItems((prev) => {

                                                if (item === "NL") {
                                                    return ["NL"];
                                                }

                                                const filtered =
                                                    prev.filter(
                                                        (i) => i !== "NL"
                                                    );

                                                return selected
                                                    ? filtered.filter(
                                                        (i) => i !== item
                                                    )
                                                    : [...filtered, item];
                                            });
                                        }}
                                        style={{
                                            width: "34px",
                                            height: "34px",

                                            borderRadius:
                                                "999px",

                                            border: selected
                                                ? "1px solid rgba(255,255,255,0.14)"
                                                : "1px solid rgba(255,255,255,0.06)",

                                            background:
                                                selected
                                                    ? "rgba(255,255,255,0.08)"
                                                    : "rgba(255,255,255,0.03)",

                                            color:
                                                selected
                                                    ? "var(--text-primary)"
                                                    : "var(--text-secondary)",

                                            fontSize:
                                                "0.72rem",

                                            fontWeight:
                                                "300",

                                            cursor:
                                                "pointer",

                                            transition:
                                                "all 0.2s ease",
                                        }}
                                        onMouseEnter={(
                                            e
                                        ) => {
                                            if (
                                                !selected
                                            ) {
                                                e.currentTarget.style.background =
                                                    "rgba(255,255,255,0.05)";
                                            }
                                        }}
                                        onMouseLeave={(
                                            e
                                        ) => {
                                            if (
                                                !selected
                                            ) {
                                                e.currentTarget.style.background =
                                                    "rgba(255,255,255,0.03)";
                                            }
                                        }}
                                    >
                                        {item}
                                    </button>
                                );
                            }
                        )}
                    </div>

                    {/* STATUS */}
                    {mode === "edit" && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",

                                marginBottom: "24px",
                            }}
                        >
                            <button
                                style={{
                                    padding: "10px 18px",

                                    borderRadius: "999px",

                                    background:
                                        currentStatus.background,

                                    border:
                                        `1px solid ${currentStatus.border}`,

                                    color:
                                        currentStatus.color,

                                    fontSize: "0.8rem",

                                    fontWeight: "300",

                                    cursor: "default",

                                    display: "flex",

                                    alignItems: "center",

                                    gap: "8px",
                                }}
                            >
                                <StatusIcon
                                    size={14}
                                    strokeWidth={1.8}
                                />

                                {currentStatus.label}
                            </button>
                        </div>
                    )}


                    {/* Note NAME */}
                    <input
                        value={noteName}

                        onChange={(e) =>
                            setNoteName(
                                e.target.value
                            )
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSave();
                            }
                        }}
                        onFocus={() =>
                            setTitleFocused(true)
                        }

                        onBlur={() =>
                            setTitleFocused(false)
                        }
                        ref={noteInputRef}
                        placeholder="Note title"
                        style={{
                            width: "100%",

                            background: "transparent",

                            border: "none",

                            outline: "none",

                            color: "var(--text-primary)",

                            fontSize: "1.05rem",

                            fontWeight: "300",

                            letterSpacing: "-0.02em",

                            padding: "0 0 14px 0",

                            borderBottom:
                                titleFocused
                                    ? "1px solid rgba(255,255,255,0.18)"
                                    : "1px solid rgba(255,255,255,0.06)",

                            transition:
                                "all 0.2s ease",

                            marginBottom: "20px",
                        }}
                    />

                    {/* CONTENT */}
                    <div
                        style={{
                            marginBottom: "20px",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "0.8rem",

                                opacity: 0.45,

                                fontWeight: "300",

                                marginBottom: "8px",
                            }}
                        >
                            Notes
                        </p>

                        <textarea
                            value={content}

                            onChange={(e) =>
                                setContent(
                                    e.target.value
                                )
                            }
                            rows={3}
                            placeholder="Start writing..."
                            style={{
                                width: "100%",

                                minHeight: "280px",

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

                    {/* DIVIDER */}
                    <div
                        style={{
                            height: "1px",
                            background: "rgba(255,255,255,0.06)",
                            marginBottom: "20px",
                        }}
                    />

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
                            padding: "11px 18px",

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
                        {mode === "edit"
                            ? "Save"
                            : "Create"}
                    </button>
                </div>
            </div>
        </div >
    );
}

export default NoteModal;